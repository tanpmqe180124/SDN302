import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-blue-800 drop-shadow">
          Clothing Store
        </h1>
        {session && (
          <Link
            href="/products/new"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
          >
            + Add Product
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.length === 0 && (
          <div className="col-span-full text-center text-gray-500 text-lg">
            No products found.
          </div>
        )}
        {products.map((product: any) => (
          <Link
            key={product._id}
            href={`/products/${product._id}`}
            className="group block border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-lg transition relative overflow-hidden"
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-3 rounded-lg group-hover:scale-105 transition-transform duration-200"
              />
            )}
            <h2 className="text-xl font-bold mb-1 text-gray-900 group-hover:text-blue-700 transition">
              {product.name}
            </h2>
            <p className="text-gray-600 mb-2 line-clamp-2 min-h-[40px]">
              {product.description}
            </p>
            <p className="font-bold text-blue-700 text-lg">
              ${product.price}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
