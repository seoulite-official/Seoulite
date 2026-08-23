import prisma from '@/app/lib/prisma';

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: Date;
};

export async function getContactMessages(): Promise<ContactMessage[]> {
  return await prisma.contactMessage.findMany({
    orderBy: [{ createdAt: 'desc' }],
  });
}

export async function createContactMessage(data: {
  name: string;
  email: string;
  message: string;
}): Promise<ContactMessage> {
  return await prisma.contactMessage.create({ data });
}

export async function markMessageRead(id: string): Promise<ContactMessage> {
  return await prisma.contactMessage.update({
    where: { id },
    data: { read: true },
  });
}
