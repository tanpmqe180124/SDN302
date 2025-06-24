import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      setError(res.error);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200 hover:shadow-2xl transition">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700 drop-shadow">Login</h2>
        {error && <div className="mb-4 text-red-500 font-semibold">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input type="email" className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none transition" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <input type="password" className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none transition" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Login</button>
        <p className="mt-4 text-center text-sm">Don&apos;t have an account? <Link href="/auth/register" className="text-blue-600 hover:underline hover:text-blue-800 transition">Register</Link></p>
      </form>
    </div>
  );
}
