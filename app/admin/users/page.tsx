import { auth } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/app/lib/prisma';
import UserManagementClient from './UserManagementClient';


/**
 * Admin Users management page.
 * Only accessible to active ADMIN users.
 */
export default async function UsersPage() {
  // Server‑side auth check
  const session = await auth();
  if (!session?.user?.role || session.user.role !== 'ADMIN' || !session.user?.id) {
    return <p className="text-center mt-8">Access denied</p>;
  }

  // Fetch users (server‑side)
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, active: true },
    orderBy: { email: 'asc' },
  });

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <UserManagementClient initialUsers={users} />
    </div>
  );
}

