import { signOut, useSession } from 'next-auth/react';
import router from 'next/router';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-[#4A4A8A] p-4 font-oswald">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Heatmap</div>
        {session ? (
          <div className="flex items-center">
            <span className="text-white mr-4">Welcome, {session.user.name}!</span>
            {session.user.role == 'owner' && (
              <button
                onClick={() => router.push('/ownerDashboard')}
                className="bg-[#8A4A6A] text-white px-4 py-2 rounded mr-4"
              >
                User access
              </button>
            )}
            <button
              onClick={() => signOut()}
              className="bg-[#8A4A6A] text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="text-white">log in</div>
        )}
      </div>
    </nav>
  );
}