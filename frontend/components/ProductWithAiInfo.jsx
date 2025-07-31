import { useState } from 'react';
import ProductCard from './ProductCard';

export default function ProductWithAiInfo({
  product,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  getAiInfo,
  replaceWithAlternative,
  alternatives = []
}) {
  const [aiInfo, setAiInfo] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [open, setOpen] = useState(false);

  const fetchInsights = async () => {
    setLoadingAi(true);
    const info = await getAiInfo(product.name, product.category, product.ecoScore);
    setAiInfo(info);
    setLoadingAi(false);
    setOpen(true);
  };

  return (
    <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
      {/* Product Header */}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <img
          src={product.imageUrl || '/images/default.jpg'}
          alt={product.name}
          className="w-28 h-28 object-contain rounded bg-gray-50 border"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-600">
            🌱 <strong>Eco Score:</strong> {product.ecoScore}
          </p>
          <p className="text-sm text-gray-800">
            💰 <strong>Price:</strong> ₹{product.price} × {product.quantity} = ₹
            {(product.price * product.quantity).toFixed(2)}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => decrementQuantity(product._id)}
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
            >
              ➖
            </button>
            <span className="font-medium">{product.quantity}</span>
            <button
              onClick={() => incrementQuantity(product._id)}
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
            >
              ➕
            </button>
          </div>
        </div>
        <button
          onClick={() => removeFromCart(product._id)}
          className="text-red-500 hover:text-red-700"
        >
          ❌
        </button>
      </div>

      {/* Eco AI Insights */}
      <div className="mt-4">
        <button
          onClick={() => (aiInfo ? setOpen(!open) : fetchInsights())}
          disabled={loadingAi}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {loadingAi
            ? '🔄 Loading…'
            : aiInfo
            ? (open ? '▼ Hide Eco AI Insights' : '▶ Show Eco AI Insights')
            : '▶ Show Eco AI Insights'}
        </button>

        {open && aiInfo && (
          <div className="mt-3 bg-blue-50 border border-blue-200 p-4 rounded space-y-2 text-sm text-gray-800">
            <p>♻️ <strong>Carbon Footprint:</strong> {aiInfo.carbonFootprint}</p>
            <p>🗑️ <strong>Disposal:</strong> {aiInfo.disposal}</p>
            <p>🔋 <strong>Plus Points:</strong> {aiInfo.plusPoints}</p>
          </div>
        )}
      </div>

      {/* Alternatives */}
      {alternatives.length > 0 && (
        <div className="mt-6 bg-gray-50 p-4 rounded">
          <h4 className="font-semibold text-gray-700 mb-2">♻️ Better Eco-Friendly Alternatives:</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {alternatives.map(alt => (
              <div key={alt._id} className="w-36">
                <ProductCard product={alt} compact />
                <button
                  onClick={() => replaceWithAlternative(product._id, alt)}
                  className="mt-2 w-full text-xs bg-green-600 text-white py-1 rounded hover:bg-green-700"
                >
                  ✅ Choose This
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
