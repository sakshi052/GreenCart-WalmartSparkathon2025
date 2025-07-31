// frontend/models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  ecoScore: Number,
  price: Number,
  description: String,
  imageUrl: String
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);
