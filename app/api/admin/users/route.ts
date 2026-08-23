import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import crypto from 'crypto';
import { requireAdmin } from '@/app/lib/server/auth';
import { Resend } from 'resend';

/**
 * GET  /api/admin/users
 *   Returns a list of all users (id, email, name, role, active).
 * POST /api/admin/users
 *   Creates an invitation for a new user (ADMIN or EDITOR).
 *   Body must be JSON: { email: string, role: "ADMIN" | "EDITOR" }
 */

export async function GET() {
  try {
    await requireAdmin();
  } catch (e) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, active: true },
    orderBy: { email: 'asc' },
  });
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch (e) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const { email, role } = body as { email?: string; role?: string };

  if (!email || !role || !['ADMIN', 'EDITOR'].includes(role)) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // generate token
  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
  const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48h

  const invitation = await prisma.invitation.create({
    data: { email, role, tokenHash, expiresAt },
  });

  // construct invitation URL
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const inviteUrl = `${baseUrl}/admin/invite?token=${rawToken}`;

  // send email via Resend if configured
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    const resend = new Resend(resendApiKey);
    const from = process.env.RESEND_FROM || undefined;
    try {
      await resend.emails.send({
        from: from || 'no-reply@seoulite.dev',
        to: email,
        subject: 'Seoulite Invitation',
        html: `<p>You have been invited to join Seoulite as <strong>${role}</strong>.</p>` +
              `<p>Click the link below to set your password and complete registration:</p>` +
              `<p><a href="${inviteUrl}">${inviteUrl}</a></p>` +
              `<p>This link expires in 48 hours.</p>`,
      });
    } catch (err) {
      // If email fails, we still consider the invitation created but return an error so admin knows.
      return NextResponse.json({ error: 'Invitation created but email sending failed', invitationId: invitation.id }, { status: 500 });
    }
    return NextResponse.json({ message: 'Invitation sent', invitationId: invitation.id, inviteUrl });
  } else {
    // No email configuration – inform the admin.
    return NextResponse.json({ error: 'RESEND_API_KEY not configured – invitation not emailed', invitationId: invitation.id, inviteUrl }, { status: 400 });
  }
}
