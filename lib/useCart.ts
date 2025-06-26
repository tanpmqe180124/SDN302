import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export interface CartProduct {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function useCart() {
  const [cart, setCart] = useState<CartProduct[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product: CartProduct) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.productId === product.productId);
      if (existing) {
        return prev.map((p) =>
          p.productId === product.productId
            ? { ...p, quantity: p.quantity + product.quantity }
            : p
        );
      }
      return [...prev, product];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((p) => p.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((p) =>
        p.productId === productId ? { ...p, quantity } : p
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
  };

  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

  const checkout = async () => {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ products: cart, totalAmount: total }),
    });
    if (res.ok) {
      clearCart();
      router.push('/orders');
    } else {
      alert('Checkout failed');
    }
  };

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart, total, checkout };
}
