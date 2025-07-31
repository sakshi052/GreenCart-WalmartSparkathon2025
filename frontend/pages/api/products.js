import dbConnect from '../../lib/db';
import Product from '../../models/Product';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  await dbConnect();
  const { id, alternatives, page = 1, limit = 20, q } = req.query;

  if (req.method === 'POST') {
    try {
      const product = new Product(req.body);
      await product.save();
      return res.status(200).json({ message: 'Product saved' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to save product' });
    }
  }

  else if (req.method === 'GET') {
    try {
      if (id) {
        const objectId = new mongoose.Types.ObjectId(id);
        const product = await Product.findById(objectId);

        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }

        if (alternatives === 'true') {
          const ecoAlternatives = await Product.find({
            category: product.category,
            ecoScore: { $gt: product.ecoScore },
            _id: { $ne: product._id }
          })
            .sort({ ecoScore: -1 })
            .limit(5);

          return res.status(200).json({ alternatives: ecoAlternatives });
        }

        return res.status(200).json({ product });
      }

      // 🧠 Search & pagination
      const query = {};
      if (q) {
        query.$or = [
          { name: { $regex: q, $options: 'i' } },
          { category: { $regex: q, $options: 'i' } }
        ];
      }

      const pageNumber = parseInt(page, 20) || 1;
      const limitNumber = limit === 'all' ? 0 : parseInt(limit, 20) || 20;
      const skip = (pageNumber - 1) * (limitNumber || 0);

      let productQuery = Product.find(query).skip(skip);
      if (limitNumber > 0) {
        productQuery = productQuery.limit(limitNumber);
      }

      const [products, total] = await Promise.all([
        productQuery,
        Product.countDocuments(query)
      ]);

      return res.status(200).json({ products, total });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch product(s)' });
    }
  }

  res.setHeader('Allow', ['POST', 'GET']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
