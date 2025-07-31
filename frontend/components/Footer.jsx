export default function Footer() {
  const links = [
    "All Departments", "Store Directory", "Careers", "Our Company", "Sell on GreenCart",
    "Help", "Product Recalls", "Accessibility", "Tax Exempt Program", "Terms of Use",
    "Privacy Notice", "California Supply Chain Act", "Your Privacy Choices",
    "Notice at Collection", "AdChoices", "Consumer Health Data Privacy Notices",
    "Delete Account"
  ];

  return (
    <footer className="bg-[#002d74] text-white py-4 px-4 text-sm"> {/* reduced py-8 to py-4 */}
      <div className="max-w-7xl mx-auto text-center space-y-2"> {/* reduced space-y-4 to space-y-2 */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1"> {/* tighter gap */}
          {links.map((link, idx) => (
            <a
              key={idx}
              href="#"
              className="hover:underline whitespace-nowrap"
            >
              {link}
            </a>
          ))}
        </div>
        <p className="text-xs text-gray-300 mt-2"> {/* reduced mt-4 to mt-2 */}
          © 2025 GreenCart. Trademarks and design are registered with the US Patent and Trademark Office. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
