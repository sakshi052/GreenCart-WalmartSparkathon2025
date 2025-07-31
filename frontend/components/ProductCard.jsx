import { useCart } from './CartContext';
import Link from 'next/link';

export default function ProductCard({ product, compact = false }) {
  const { addToCart } = useCart();

  // adjust sizes when in compact mode
  const imgHeight = compact ? 'h-24' : 'h-44';
  const padding   = compact ? 'p-2'  : 'p-4';
  const titleSize = compact ? 'text-sm' : 'text-base';
  const priceSize = compact ? 'text-sm' : 'text-base';
  const ecoSize   = compact ? 'text-xs' : 'text-sm';
  const btnSize   = compact ? 'py-1 text-xs' : 'py-2 text-sm';

  return (
    <div className={`border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition duration-200 ${padding}`}>
      <Link href={`/product/${product._id || product.id}`}>
        <div className="cursor-pointer">
          <img
            src={product.imageUrl}
            alt={product.name}
            className={`w-full object-contain mb-2 ${imgHeight}`}
          />
          <h3 className={`font-medium text-gray-900 line-clamp-2 hover:text-blue-600 transition ${titleSize}`}>
            {product.name}
          </h3>
        </div>
      </Link>

      <div className={`mt-2 space-y-1 text-gray-700`}>
        {product.price && (
          <p className={`font-semibold text-black ${priceSize}`}>
            ₹{product.price.toFixed(2)}
          </p>
        )}
        <p className={`${ecoSize}`}>
          🌱 Eco Score: <b>{product.ecoScore}</b>
        </p>
      </div>

      <button
        onClick={() => addToCart(product)}
        className={`w-full bg-[#0071dc] hover:bg-blue-700 text-white rounded font-medium ${btnSize} mt-3`}
      >
        Add to Cart
      </button>
    </div>
  );
}
