import { useState, useEffect } from 'react';
import { useCart } from '../components/CartContext';
import ProductWithAiInfo from '../components/ProductWithAiInfo';

export default function CartPage() {
  const {
    cart,
    averageEcoScore,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    replaceWithAlternative,
    lastEcoSwitch,
    promoCode,
    discountPercent,
    applyPromoCode,
    getAiInfo
  } = useCart();

  const [allProducts, setAllProducts] = useState([]);
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(d => setAllProducts(d.products));
  }, []);

  const normalize = str =>
    str?.trim().toLowerCase().replace(/\s+/g, '');

  const getAlternatives = product =>
    allProducts
      .filter(
        p =>
          normalize(p.category) === normalize(product.category) &&
          p.ecoScore > product.ecoScore
      )
      .sort((a, b) => b.ecoScore - a.ecoScore)
      .slice(0, 3);

  const subtotal = cart.reduce(
    (sum, p) => sum + (p.price || 0) * p.quantity,
    0
  );
  const discountAmt = (subtotal * discountPercent) / 100;
  const total = subtotal - discountAmt;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 pt-2 pb-60">
      <h1 className="text-3xl font-bold mb-2">🛒 Your Cart</h1>
      <p className="text-green-700 mb-6">
        🌱 Average Eco Score: <strong>{averageEcoScore}</strong>
      </p>

      {/* New Banner */}
      <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
        <span className="text-xl">💡</span>
        <span className="font-medium">
          Save <strong>10%</strong> on your cart by switching to eco‑friendly options!
        </span>
      </div>

      {lastEcoSwitch && (
        <div className="bg-green-50 border border-green-400 p-4 rounded mb-6 text-green-800">
          🎉 Switched: <strong>{lastEcoSwitch.from}</strong> → <strong>{lastEcoSwitch.to}</strong><br/>
          🎁 Promo <strong>ECO10</strong> applied!
        </div>
      )}

      {cart.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-300 p-4 rounded text-yellow-800">
          Your cart is empty. Start shopping!
        </div>
      ) : (
        <>
          {/* Promo Form */}
          <div className="mb-6 max-w-md">
            {promoCode ? (
              <div className="text-green-700">
                ✅ Promo <strong>{promoCode}</strong> (−{discountPercent}%)
              </div>
            ) : (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  const res = applyPromoCode(promoInput);
                  if (!res.success) setPromoError(res.message);
                  else setPromoError('');
                }}
                className="flex gap-2"
              >
                <input
                  className="border px-3 py-1 rounded flex-grow"
                  value={promoInput}
                  onChange={e => setPromoInput(e.target.value)}
                  placeholder="Enter promo code"
                />
                <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                  Apply
                </button>
              </form>
            )}
            {promoError && <p className="text-red-500 text-sm">{promoError}</p>}
          </div>

          <div className="space-y-8">
            {cart.map((p, i) => (
              <ProductWithAiInfo
                key={p._id + i}
                product={p}
                removeFromCart={removeFromCart}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
                replaceWithAlternative={replaceWithAlternative}
                getAiInfo={getAiInfo}
                alternatives={getAlternatives(p)}
              />
            ))}
          </div>

          {/* Totals */}
          <div className="mt-10 p-6 bg-white border rounded-lg shadow-sm text-right">
            <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
            {discountPercent > 0 && (
              <p className="text-green-700">Discount: −₹{discountAmt.toFixed(2)}</p>
            )}
            <p className="text-xl font-bold">Total: ₹{total.toFixed(2)}</p>
          </div>
        </>
      )}
    </div>
  );
}
