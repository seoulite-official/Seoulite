import { auth } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/lib/prisma";

/**
 * Helper that ensures the current request is made by an ACTIVE ADMIN.
 * Throws an Error with message "Forbidden" if the check fails.
 */
export async function requireAdmin() {
  // Use the new `auth` helper provided by next-auth v5 for server components
  const session = await auth();
  if (!session?.user?.role || session.user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }
  // Also ensure the admin user is active (lookup in DB)
  const admin = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { active: true },
  });
  if (!admin?.active) throw new Error("Forbidden");
  return session;
}
