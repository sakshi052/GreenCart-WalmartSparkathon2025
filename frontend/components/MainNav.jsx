import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import categories from '../data/categories';
import { useCart } from './CartContext';

export default function MainNav() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const { cart, averageEcoScore } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const handleCategorySelect = (category) => {
    router.push(`/search?q=${encodeURIComponent(category)}`);
    setShowDropdown(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="relative">
        {/* Navbar */}
        <div className="bg-[#0071dc] text-white shadow-md py-5">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            {/* 🔹 Left: Logo + Departments */}
            <div className="flex items-center gap-4 relative">
              <Link href="/" className="block">
                <img
                  src="https://res.cloudinary.com/dqb4rgzpq/image/upload/v1752166928/walmart-logo-png-27972_pslp97.png"
                  alt="GreenCart Logo"
                  className="h-10 w-12 object-contain"
                />
              </Link>

              <button
                onClick={toggleDropdown}
                className="hover:text-yellow-300 font-semibold text-xl"
              >
                Departments ⏷
              </button>

              {showDropdown && (
                <div className="absolute top-20 left-0 bg-white text-black shadow-lg rounded w-64 max-h-64 overflow-y-auto z-50">
                  <ul className="grid grid-cols-2 gap-2 text-sm p-2">
                    {categories.map((cat) => (
                      <li
                        key={cat}
                        onClick={() => handleCategorySelect(cat)}
                        className="px-3 py-1 hover:bg-gray-100 cursor-pointer rounded"
                      >
                        {cat}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 🔹 Center: Search */}
            <form
              onSubmit={handleSearch}
              className="flex flex-grow max-w-2xl mx-4"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search everything at Walmart online and in store"
                className="w-full px-4 py-3 rounded-l-full text-black placeholder-gray-500 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-300 text-black px-5 py-2 rounded-r-full font-semibold"
              >
                🔍
              </button>
            </form>

            {/* 🔹 Right: Cart + Login */}
            <div className="flex items-center gap-6 text-sm font-semibold">
              <Link
  href="/cart"
  className="text-base text-white hover:text-yellow-300 flex items-center gap-1"
>
  🛒 Cart ({cart.length})
</Link>


              <span className="text-base text-white">Avg. 🌱 {averageEcoScore}</span>
              <Link
  href="/login"
  className="text-base text-white hover:text-yellow-300"
>
  👤 Login
</Link>

            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
