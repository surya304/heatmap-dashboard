import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session]);

  const validateForm = () => {
    if (!form.email || !form.password) {
      setError('Email and password are required.');
      return false;
    }
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Invalid email format.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res.ok) {
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } else {
      if (res.error === 'No user found with this email') {
        setError('No user found with this email.');
      } else if (res.error === 'Please wait until your admin grants you login privilege') {
        setError('Please wait until your admin grants you login privilege.');
      } else if (res.error === 'Incorrect password') {
        setError('Incorrect password.');
      } else {
        setError('Invalid email or password.');
      }
    }
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen flex items-center justify-center shadow-inner text-black">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
        <h1 className="text-2xl mb-4">Login</h1>
        {error && <div className="bg-red-500 text-white p-2 mb-4">{error}</div>}
        {success && <div className="bg-green-500 text-white p-2 mb-4">{success}</div>}
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
        <button className="bg-blue-500 text-white p-2 w-full">Login</button>
        <p className="mt-4">
          Dont have an account?{' '}
          <a
            className="text-blue-500"
            onClick={() => router.push('/signup')}
            style={{ cursor: 'pointer' }}
          >
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}