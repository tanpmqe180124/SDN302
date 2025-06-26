import { useEffect, useState } from 'react';

interface OrderProduct {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  _id: string;
  userId: string;
  products: OrderProduct[];
  totalAmount: number;
  status: 'unpaid' | 'paid';
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/orders')
      .then(res => {
        if (!res.ok) throw new Error('Not authenticated or failed to fetch');
        return res.json();
      })
      .then(data => setOrders(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-8">
          {orders.map(order => (
            <div key={order._id} className="border rounded-lg p-4 shadow">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Order ID: {order._id}</span>
                <span className={order.status === 'paid' ? 'text-green-600' : 'text-yellow-600'}>
                  {order.status.toUpperCase()}
                </span>
              </div>
              <div className="mb-2 text-gray-600 text-sm">Placed: {new Date(order.createdAt).toLocaleString()}</div>
              <ul className="mb-2">
                {order.products.map(p => (
                  <li key={p.productId} className="flex justify-between">
                    <span>{p.name} x {p.quantity}</span>
                    <span>${p.price * p.quantity}</span>
                  </li>
                ))}
              </ul>
              <div className="font-bold">Total: ${order.totalAmount}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
