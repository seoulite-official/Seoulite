export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Seoulite Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Signed in as Editor (session data would appear here)
              </span>
              <form action="/api/auth/signout" method="POST" className="mt-2">
                <button
                  type="submit"
                  className="text-sm font-medium text-red-600 hover:text-red-500"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl py-12 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-200 rounded-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Admin Dashboard</h2>
          <p className="text-gray-600 mb-4">
            Welcome to the Seoulite administration panel. This is a placeholder for the admin interface.
          </p>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-50 p-4 border rounded-md">
              <h3 className="font-medium text-gray-900">User Information</h3>
              <p className="mt-2 text-sm text-gray-600">
                <strong>Email:</strong> editor@example.com (example)
              </p>
              <p className="mt-1 text-sm text-gray-600">
                <strong>Role:</strong> EDITOR
              </p>
              <p className="mt-1 text-sm text-gray-600">
                <strong>ID:</strong> [user-id-would-appear-here]
              </p>
            </div>

            <div className="bg-gray-50 p-4 border rounded-md">
              <h3 className="font-medium text-gray-900">System Status</h3>
              <p className="mt-2 text-sm text-gray-600">
                Authentication: <span className="font-medium text-green-600">Active</span>
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Session Strategy: <span className="font-medium text-blue-600">JWT</span>
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Database: <span className="font-medium text-blue-600">Prisma/SQLite</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}