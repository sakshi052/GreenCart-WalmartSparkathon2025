import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../lib/firebase';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [lastEcoSwitch, setLastEcoSwitch] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  const PROMO_CODES = { ECO10: 10, GREEN20: 20, SAVE15: 15 };

  // Load cart from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Auto‐save to Mongo on login
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(user => {
      if (user) {
        setUserEmail(user.email);
        saveCartToMongo(user.email);
      } else {
        setUserEmail(null);
      }
    });
    return () => unsub();
  }, []);

  const saveCartToMongo = async (email = userEmail) => {
    if (!email) return;
    await fetch('/api/save-cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userEmail: email, cart })
    });
  };

  const applyPromoCode = code => {
    const c = code.trim().toUpperCase();
    if (PROMO_CODES[c]) {
      setPromoCode(c);
      setDiscountPercent(PROMO_CODES[c]);
      return { success: true };
    }
    return { success: false, message: 'Invalid promo code' };
  };

  const addToCart = product => {
    setCart(prev => {
      const idx = prev.findIndex(p => p._id === product._id);
      let next;
      if (idx > -1) {
        next = [...prev];
        next[idx].quantity++;
      } else {
        next = [...prev, { ...product, quantity: 1 }];
      }
      // eco‑switch promo
      const lower = prev.find(
        p => p.category === product.category && p.ecoScore < product.ecoScore
      );
      if (lower) {
        setLastEcoSwitch({ from: lower.name, to: product.name });
        applyPromoCode('ECO10');
      }
      return next;
    });
  };

  const removeFromCart = id =>
    setCart(prev => prev.filter(p => p._id !== id));

  const incrementQuantity = id =>
    setCart(prev =>
      prev.map(p => p._id === id ? { ...p, quantity: p.quantity + 1 } : p)
    );

  const decrementQuantity = id =>
    setCart(prev =>
      prev
        .map(p => p._id === id ? { ...p, quantity: p.quantity - 1 } : p)
        .filter(p => p.quantity > 0)
    );

  const replaceWithAlternative = (originalId, newProduct) => {
    setCart(prev => {
      const filtered = prev.filter(p => p._id !== originalId);
      return [...filtered, { ...newProduct, quantity: 1 }];
    });
    setLastEcoSwitch({ from: 'Previous Item', to: newProduct.name });
    applyPromoCode('ECO10');
  };

  // fetch AI insight via our API route
  const getAiInfo = async (name, category, ecoScore) => {
    try {
      const res = await fetch('/api/eco-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, category, ecoScore })
      });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return {
        carbonFootprint: 'Unavailable',
        disposal: 'Unavailable',
        plusPoints: 'Unavailable'
      };
    }
  };

  const averageEcoScore =
    cart.length
      ? (
          cart.reduce((sum, p) => sum + p.ecoScore * p.quantity, 0) /
          cart.reduce((sum, p) => sum + p.quantity, 0)
        ).toFixed(1)
      : 0;

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      incrementQuantity,
      decrementQuantity,
      replaceWithAlternative,
      averageEcoScore,
      lastEcoSwitch,
      promoCode,
      discountPercent,
      applyPromoCode,
      getAiInfo
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
