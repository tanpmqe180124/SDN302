import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function NewProduct() {
  const { data: session, status } = useSession();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  if (status === 'loading') return <div className="p-8">Loading...</div>;
  if (!session) return <div className="p-8">You must be logged in to add a product.</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price: Number(price), image }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.message || 'Failed to create product');
    } else {
      setSuccess('Product created! Redirecting...');
      setTimeout(() => router.push(`/products/${data._id}`), 1500);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700 drop-shadow">Add New Product</h2>
        {error && <div className="mb-4 text-red-500 font-semibold">{error}</div>}
        {success && <div className="mb-4 text-green-600 font-semibold">{success}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input type="text" className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none transition" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Description</label>
          <textarea className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none transition" value={description} onChange={e => setDescription(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Price</label>
          <input type="number" className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none transition" value={price} onChange={e => setPrice(e.target.value)} required min="0" step="0.01" />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Image URL (optional)</label>
          <input type="text" className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none transition" value={image} onChange={e => setImage(e.target.value)} />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Create Product</button>
      </form>
    </div>
  );
}
