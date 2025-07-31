import { useRouter } from 'next/router';
import ProductCard from '../../components/ProductCard';
import products from '../../data/products';

export default function CategoryPage() {
  const { slug } = useRouter().query;

  const filtered = products.filter(p => p.category === slug);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold capitalize">{slug}</h1>

      {filtered.length === 0 ? (
        <p className="mt-4 text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {filtered.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
}
