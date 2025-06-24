import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.message || 'Registration failed');
    } else {
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => router.push('/auth/login'), 1500);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200 hover:shadow-2xl transition">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700 drop-shadow">Register</h2>
        {error && <div className="mb-4 text-red-500 font-semibold">{error}</div>}
        {success && <div className="mb-4 text-green-600 font-semibold">{success}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input type="text" className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none transition" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input type="email" className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none transition" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <input type="password" className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none transition" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Register</button>
        <p className="mt-4 text-center text-sm">Already have an account? <Link href="/auth/login" className="text-blue-600 hover:underline hover:text-blue-800 transition">Login</Link></p>
      </form>
    </div>
  );
}
