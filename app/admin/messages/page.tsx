import { getContactMessages } from '@/app/lib/server/contactMessages';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminMessagesPage() {
  const messages = await getContactMessages();

  if (!messages) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-2xl font-semibold text-gray-900">Contact Messages</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Email</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Message</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Submitted</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Read</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {messages.map((msg) => (
            <tr key={msg.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-sm text-gray-700">{msg.name}</td>
              <td className="px-4 py-2 text-sm text-gray-700"><a href={`mailto:${msg.email}`} className="text-blue-600 underline">{msg.email}</a></td>
              <td className="px-4 py-2 text-sm text-gray-700 break-all">{msg.message}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{new Date(msg.createdAt).toLocaleString()}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{msg.read ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href="/admin" className="text-blue-600 hover:underline">← Back to Admin Dashboard</Link>
    </div>
  );
}
