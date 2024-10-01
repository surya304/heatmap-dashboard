// pages/admin.js
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AdminPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([
    { id: 1, name: "Team Member 1", role: "team" },
    { id: 2, name: "Team Member 2", role: "team" },
  ]);

  const toggleRole = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, role: user.role === "owner" ? "team" : "owner" }
          : user
      )
    );
  };

  if (!session || session.user.role !== "owner") {
    return <p>Access Denied</p>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Role</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={user.role === "owner"}
                    onChange={() => toggleRole(user.id)}
                  />
                  <span className="slider round"></span>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { AdminPage };