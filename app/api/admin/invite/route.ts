import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

/**
 * POST /api/admin/invite
 *   Body: { token: string, password: string, name?: string }
 *   Validates the invitation token, creates a new User with the role specified in the invitation,
 *   hashes the password, marks the invitation as used.
 */
export async function POST(request: Request) {
  const { token, password, name } = (await request.json()) as {
    token?: string;
    password?: string;
    name?: string;
  };

  if (!token || !password) {
    return NextResponse.json({ error: 'Missing token or password' }, { status: 400 });
  }

  // Hash the token exactly as it was stored
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

  const invitation = await prisma.invitation.findFirst({
    where: { tokenHash },
  });

  if (!invitation) {
    return NextResponse.json({ error: 'Invalid invitation token' }, { status: 400 });
  }

  if (invitation.usedAt) {
    return NextResponse.json({ error: 'Invitation already used' }, { status: 400 });
  }

  if (new Date() > invitation.expiresAt) {
    return NextResponse.json({ error: 'Invitation has expired' }, { status: 400 });
  }

  // Create the user
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await prisma.user.create({
    data: {
      email: invitation.email,
      name: name ?? null,
      password: hashedPassword,
      role: invitation.role,
      active: true,
    },
    select: { id: true, email: true, name: true, role: true },
  });

  // Mark invitation as used
  await prisma.invitation.update({
    where: { id: invitation.id },
    data: { usedAt: new Date() },
  });

  return NextResponse.json({
    message: 'Account created successfully',
    user: newUser,
  });
}
