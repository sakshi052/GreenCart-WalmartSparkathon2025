import dbConnect from '../../lib/db';
import Product from '../../models/Product';

export default async function handler(req, res) {
  await dbConnect();

  try {
    const products = await Product.find({});
    let updated = 0;

    for (let product of products) {
      if (product.imageUrl?.includes('/file/d/')) {
        const match = product.imageUrl.match(/\/file\/d\/([^/]+)\//);
        if (match) {
          const driveId = match[1];
          const fixedUrl = `https://drive.google.com/uc?export=view&id=${driveId}`;
          await Product.updateOne({ _id: product._id }, { imageUrl: fixedUrl });
          updated++;
        }
      }
    }

    return res.status(200).json({ message: `✅ Updated ${updated} images` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: '❌ Failed to update images' });
  }
}
