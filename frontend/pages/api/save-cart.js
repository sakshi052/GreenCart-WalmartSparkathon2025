// pages/api/save-cart.js

import dbConnect from '../../lib/db';
import Product from '../../models/Product';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { cart, userEmail } = req.body;

  if (!cart || !userEmail) {
    return res.status(400).json({ message: 'Missing cart or userEmail' });
  }

  try {
    await dbConnect();
    await Promise.all(
      cart.map((item) => Product.create({ ...item, userEmail }))
    );

    res.status(200).json({ message: 'Cart saved successfully' });
  } catch (err) {
    console.error('Save cart error:', err);
    res.status(500).json({ message: 'Failed to save cart' });
  }
}
