import React from 'react';
import useCart from '../lib/useCart';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total, checkout } = useCart();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <table className="w-full mb-6 border rounded overflow-hidden">
            <thead>
              <tr className="bg-blue-50">
                <th className="py-2 px-3 text-left">Product</th>
                <th className="py-2 px-3 text-left">Price</th>
                <th className="py-2 px-3 text-left">Quantity</th>
                <th className="py-2 px-3 text-left">Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.productId} className="border-t">
                  <td className="py-2 px-3">{item.name}</td>
                  <td className="py-2 px-3">${item.price}</td>
                  <td className="py-2 px-3">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={e => updateQuantity(item.productId, Number(e.target.value))}
                      className="w-16 border rounded px-2 py-1"
                    />
                  </td>
                  <td className="py-2 px-3">${item.price * item.quantity}</td>
                  <td className="py-2 px-3">
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Total: <span className="text-blue-700">${total}</span></h3>
            <button
              onClick={checkout}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
