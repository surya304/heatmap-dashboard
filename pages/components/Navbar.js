import { signOut, useSession } from 'next-auth/react';
import router from 'next/router';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white p-4 " style={{"borderBottom":"1px solid lightgray"}}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-lg font-bold">Heatmap</div>
        {session ? (
          <div className="flex items-center">
            <span className="text-black mr-4">Welcome, {session.user.name}!</span>
            {session.user.role == 'owner' && (
             <button
             onClick={() => router.push('/ownerDashboard')}
             className="bg-white text-purple-500 border border-blue-500 px-4 py-2 rounded mr-4 hover:bg-blue-500 hover:text-white"
           >
             User access
           </button>
            )}
            <button
              onClick={() => signOut()}
              className="bg-white text-purple-500 border border-purple-900 px-4 py-2 rounded mr-4 hover:bg-purple-500 hover:text-white"
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