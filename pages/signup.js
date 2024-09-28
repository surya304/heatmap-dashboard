import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSuccess('Signup successful! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else {
      const data = await res.json();
      setError(data.message || 'Something went wrong!');
    }
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen flex items-center justify-center text-black">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
        <h1 className="text-2xl mb-4">Sign Up</h1>
        {error && <div className="bg-red-500 text-white p-2 mb-4">{error}</div>}
        {success && <div className="bg-green-500 text-white p-2 mb-4">{success}</div>}
        <input
          className="border p-2 w-full mb-4 text-black"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="border p-2 w-full mb-4 text-black"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="border p-2 w-full mb-4 text-black"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="bg-blue-500 text-white p-2 w-full">Sign Up</button>
        <p className="mt-4">
          Already have an account?{' '}
          <a
            className="text-blue-500"
            onClick={() => router.push('/login')}
            style={{ cursor: 'pointer' }}
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
}