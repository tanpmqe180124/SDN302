
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import useCart from '../../lib/useCart';

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
};

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const { data: session } = useSession();
  const [error, setError] = useState('');
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      fetch(`/api/products/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data));
    }
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (res.ok) {
      router.push('/');
    } else {
      const data = await res.json();
      setError(data.message || 'Failed to delete');
    }
  };


  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    });
    alert('Added to cart!');
  };

  if (!product) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      {error && <div className="mb-4 text-red-500 font-semibold">{error}</div>}
      {product.image && (
        <Image src={product.image} alt={product.name} width={600} height={256} className="w-full h-64 object-cover mb-4 rounded-lg hover:scale-105 transition-transform duration-200" />
      )}
      <h1 className="text-3xl font-extrabold mb-2 text-blue-700 drop-shadow">{product.name}</h1>
      <p className="mb-2 text-gray-700 text-lg">{product.description}</p>
      <p className="font-bold mb-4 text-blue-700 text-xl">${product.price}</p>
      <div className="flex gap-4 items-center mb-4">
        <Link href="/" className="text-blue-600 hover:underline hover:text-blue-800 transition">Back to products</Link>
        {session && (
          <>
            <Link href={`/products/${product._id}/edit`} className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition">Edit</Link>
            <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition">Delete</button>
          </>
        )}
      </div>
      <div className="flex gap-2 items-center mb-6">
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
          className="border rounded px-2 py-1 w-20"
        />
        <button
          onClick={handleAddToCart}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
