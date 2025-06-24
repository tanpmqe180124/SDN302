import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Product from '../../../models/Product';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    // List all products
    const products = await Product.find({}).sort({ createdAt: -1 });
    return res.status(200).json(products);
  }

  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { name, description, price, image } = req.body;
    if (!name || !description || !price) {
      return res.status(400).json({ message: 'All fields except image are required' });
    }
    const product = new Product({ name, description, price, image });
    await product.save();
    return res.status(201).json(product);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
