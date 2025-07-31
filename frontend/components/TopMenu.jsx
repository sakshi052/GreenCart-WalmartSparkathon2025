export default function TopMenu() {
  const menuItems = [
    "Get it Fast", "New Arrivals", "4th of July", "Dinner Made Easy",
    "Pharmacy Delivery", "Trending", "Back to School", "Walmart+"
  ];

  return (
    <nav className="bg-[#f7f7f7] text-sm text-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex space-x-6 overflow-x-auto whitespace-nowrap">
        {menuItems.map((item, idx) => (
          <a key={idx} href="#" className="hover:underline font-medium">
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}
