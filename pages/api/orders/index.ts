
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import dbConnect from '../../../lib/mongodb';
import Order from '../../../models/Order';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    // Place a new order
    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user?.email) return res.status(401).json({ message: 'Not authenticated' });
    const { products, totalAmount } = req.body;
    if (!products || !totalAmount) return res.status(400).json({ message: 'Missing fields' });
    try {
      // Use email as userId, or you can fetch the user from DB to get _id if needed
      const order = await Order.create({
        userId: session.user.email,
        products,
        totalAmount,
        status: 'unpaid',
      });
      return res.status(201).json(order);
    } catch (err) {
      return res.status(500).json({ message: 'Failed to create order', error: err });
    }
  }

  if (req.method === 'GET') {
    // Get all orders for the logged-in user
    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user?.email) return res.status(401).json({ message: 'Not authenticated' });
    try {
      const orders = await Order.find({ userId: session.user.email }).sort({ createdAt: -1 });
      return res.status(200).json(orders);
    } catch (err) {
      return res.status(500).json({ message: 'Failed to fetch orders', error: err });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
