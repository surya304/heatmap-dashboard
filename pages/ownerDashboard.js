// pages/ownerDashboard.js
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from './components/Navbar'; // Import the Navbar component

export default function OwnerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session || session.user.role !== 'owner') {
      router.push('/404'); // Redirect if not owner
    } else {
      fetchUsers();
    }
  }, [session, status]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data.users);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError('Failed to fetch users.');
    }
  };

  const toggleActiveStatus = async (id, isActive) => {
    try {
      await axios.patch(`/api/users/${id}/toggle-active`, { isActive });
      fetchUsers(); // Refresh the user list
      setError(null); // Clear any previous errors
    } catch (error) {
      setError('Failed to update user active status.');
    }
  };

  if (status === 'loading' || !session) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar /> {/* Add the Navbar component */}
      <div className="container mx-auto flex flex-col justify-center items-center flex-grow bg-[#F3F4F6]">
        <div className="w-4/5 bg-white p-6 rounded-lg shadow-xl">
          <h1 className="text-2xl font-bold mb-4 text-black">Owner Dashboard</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <table className="w-full bg-white text-black">
            <thead>
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Role</th>
                <th className="py-2">Active</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                  <td className="border px-4 py-2">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={user.is_active}
                        onChange={() => toggleActiveStatus(user._id, !user.is_active)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}