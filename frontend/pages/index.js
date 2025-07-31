import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import Link from 'next/link';

// Inline HomeBanner for now (or you can move it to components/HomeBanner.js)
function HomeBanner({ title, subtitle, image, bg, link }) {
  return (
    <Link href={link}>
      <div className={`rounded-lg p-4 shadow-md ${bg} cursor-pointer transition-transform hover:scale-105`}>
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-md mb-3"
        />
        <h3 className="text-lg font-semibold">{title}</h3>
        {subtitle && <p className="text-sm">{subtitle}</p>}
      </div>
    </Link>
  );
}

export default function HomePage() {
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        const sorted = data.products.sort((a, b) => b.ecoScore - a.ecoScore);
        setRecommended(sorted.slice(0, 8)); // Top 8 products
      })
      .catch(err => console.error("❌ Failed to fetch products:", err));
  }, []);

  return (
    <Layout>
      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 mb-10 -mt-px">
        <div className="bg-[#f0f9ff] rounded-b-lg p-4 flex justify-center items-center shadow-md">
          <img
            src="https://res.cloudinary.com/dqb4rgzpq/image/upload/v1751967763/upscalemedia-transformed_oxptvj.jpg"
            alt="Promo"
            className="w-[98%] max-w-6xl h-96 object-cover rounded-lg mx-auto"
          />
        </div>
      </div>

      {/* Promo Grid */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <HomeBanner
            title="Shop deals"
            subtitle="Buy Now"
            image="https://res.cloudinary.com/dqb4rgzpq/image/upload/v1752170114/Screenshot_2025-07-10_232456_ndr45f.png"
            bg="bg-white-400"
            link="#"
          />
          <HomeBanner
            title="Up to 55% off"
            subtitle="Daily Savings"
            image="https://res.cloudinary.com/dqb4rgzpq/image/upload/v1752170482/Screenshot_2025-07-10_233004_fqqtho.png"
            bg="bg-off-white text-black"
            link="#"
          />
          <HomeBanner
            title="Premium Beauty"
            subtitle="Best in Soaps"
            image="https://res.cloudinary.com/dqb4rgzpq/image/upload/v1751615043/61Yd8KqDMlL._SL1500__ziuxe5.jpg"
            bg="bg-white  -100 text-black"
            link="#"
          />
        </div>
      </div>

      {/* Bottom Promo Image */}
      <div className="max-w-7xl mx-auto px-4 mb-10 -mt-px">
        <div className="bg-[#f0f9ff] rounded-b-lg p-4 flex justify-center items-center shadow-md">
          <img
            src="https://aicdn.picsart.com/27925924-b5e3-4f4a-9123-690430fcc8c9.png"
            alt="Promo"
            className="w-[98%] max-w-6xl h-96 object-cover rounded-lg mx-auto"
          />
        </div>
      </div>

      {/* Recommended Products */}
      <div className="max-w-6xl mx-auto px-4 mb-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🌟 Recommended for You</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {recommended.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
