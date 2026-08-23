'use client'

import { useState, FormEvent } from 'react'

type AdminUser = { id: string; email: string; name: string | null; role: string; active: boolean }

/**
 * Client‑side component handling user list UI and invitation form.
 * Receives the initial list from the server component.
 */
export default function UserManagementClient({ initialUsers }: { initialUsers: AdminUser[] }) {
  const [users, setUsers] = useState(initialUsers)

  const toggleActive = async (id: string, current: boolean) => {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !current }),
    })
    if (res.ok) {
      const updated = await res.json()
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, active: updated.active } : u)),
      )
    } else {
      const err = await res.json()
      alert(err.error || 'Failed to update')
    }
  }

  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'ADMIN' | 'EDITOR'>('EDITOR')
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setMessage(null)
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role }),
    })
    const data = await res.json()
    if (res.ok) {
      setMessage(`Invitation created. URL: ${data.inviteUrl}`)
    } else {
      setMessage(data.error || 'Error creating invitation')
    }
  }

  return (
    <>
      {/* User table */}
      <table className="min-w-full border mb-8">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.name ?? ''}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2">{u.active ? 'Active' : 'Inactive'}</td>
              <td className="p-2 text-center">
                <button
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => toggleActive(u.id, u.active)}
                >
                  {u.active ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Invite form */}
      <form onSubmit={handleSubmit} className="border p-4 rounded max-w-md">
        <h2 className="text-lg font-semibold mb-4">Invite New User</h2>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-1"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as 'ADMIN' | 'EDITOR')}
            className="w-full border rounded p-1"
          >
            <option value="EDITOR">EDITOR</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
        >
          Send Invitation
        </button>
        {message && <p className="mt-2 text-sm">{message}</p>}
      </form>
    </>
  )
}
