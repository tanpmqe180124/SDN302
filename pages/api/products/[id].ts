import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Product from '../../../models/Product';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const {
    query: { id },
    method,
  } = req;

  if (method === 'GET') {
    // Get single product
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(product);
  }

  if (method === 'PUT') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // Update product
    const { name, description, price, image } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price, image },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(product);
  }

  if (method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // Delete product
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json({ message: 'Product deleted' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
