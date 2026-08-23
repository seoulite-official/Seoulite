import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { requireAdmin } from '@/app/lib/server/auth';

/**
 * PATCH /api/admin/users/[id]
 *   Body: { active: boolean }
 *   Only ADMINs can toggle a user's active status.
 *   Prevent deactivating the last active ADMIN.
 */
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  const { active } = (await request.json()) as { active?: boolean };

  if (typeof active !== 'boolean') {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // fetch target user
  const targetUser = await prisma.user.findUnique({ where: { id } });
  if (!targetUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // if deactivating an ADMIN, ensure at least one other active ADMIN remains
  if (targetUser.role === 'ADMIN' && targetUser.active && !active) {
    const activeAdminCount = await prisma.user.count({
      where: { role: 'ADMIN', active: true },
    });
    if (activeAdminCount <= 1) {
      return NextResponse.json({ error: 'Cannot deactivate the last active ADMIN' }, { status: 400 });
    }
  }

  const updated = await prisma.user.update({
    where: { id },
    data: { active },
    select: { id: true, email: true, name: true, role: true, active: true },
  });

  return NextResponse.json(updated);
}
