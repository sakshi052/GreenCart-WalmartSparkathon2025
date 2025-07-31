import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;

  const [results, setResults] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    if (!q) return;

    fetch(`/api/products?q=${encodeURIComponent(q)}`)
      .then(res => res.json())
      .then(data => {
        setResults(data.products || []);

        // get alternatives for top result
        if (data.products && data.products.length > 0) {
          const topProduct = data.products[0];
          fetch(`/api/products?id=${topProduct._id}&alternatives=true`)
            .then(res => res.json())
            .then(alt => {
              setRecommended(alt.alternatives || []);
            });
        }
      });
  }, [q]);

  return (
    <div className="pt-20 max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">
        🔍 Search Results for: <span className="text-blue-600">"{q}"</span>
      </h1>

      {results.length === 0 ? (
        <p className="text-gray-500">No matching products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {results.map(p => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}

      {recommended.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-2">🌿 You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recommended.map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
