import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCart } from '../../components/CartContext';
import ProductCard from '../../components/ProductCard';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [alternatives, setAlternatives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        const res = await fetch(`/api/products?id=${id}`);
        const data = await res.json();
        setProduct(data.product);

        const altRes = await fetch(`/api/products?id=${id}&alternatives=true`);
        const altData = await altRes.json();
        setAlternatives(altData.alternatives || []);
      } catch (err) {
        console.error('❌ Error loading product or alternatives:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) return <div className="mt-36 text-center">Loading...</div>;
  if (!product) return <div className="mt-36 text-center text-red-500">Product not found.</div>;

  return (
    <div className="max-w-6xl mx-auto pt-32 md:pt-0 p-20 font-['Roboto']">

      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-8">
        {/* Left: Product Image */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full md:w-72 h-72 object-contain border rounded"
        />

        {/* Right: Product Info */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-600 mt-2 text-sm">📦 Category: {product.category}</p>
          <p className="mt-2 text-green-600 text-sm font-semibold">🌱 Eco Score: {product.ecoScore}</p>
          <p className="mt-2 text-gray-800 font-semibold text-lg">💰 ₹{product.price}</p>
          <p className="text-sm mt-2 text-gray-500">
            🚚 Delivery: <span className="font-medium text-black">Tomorrow</span>
          </p>

          <p className="text-gray-700 text-sm mt-4">{product.description}</p>

          <button
            onClick={() => addToCart(product)}
            className="mt-6 bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded-full font-bold text-sm"
          >
            ➕ Add to Cart
          </button>
        </div>
      </div>

      {/* Alternatives */}
      {alternatives.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4 text-gray-800">♻️ Better Eco-Friendly Alternatives</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {alternatives.map((alt) => (
              <ProductCard key={alt._id} product={alt} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
