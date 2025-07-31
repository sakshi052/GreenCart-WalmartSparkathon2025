// pages/add-products.js
import { useState } from 'react';

export default function AddProductPage() {
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    imageUrl: '',
    composition: {},
  });
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [currentQty, setCurrentQty] = useState('');
  const [ecoScore, setEcoScore] = useState(null);
  const [saving, setSaving] = useState(false);

  const addComposition = () => {
    if (!currentIngredient || !currentQty) return;
    setForm(prev => ({
      ...prev,
      composition: {
        ...prev.composition,
        [currentIngredient]: parseFloat(currentQty),
      }
    }));
    setCurrentIngredient('');
    setCurrentQty('');
  };

  const predictEcoScore = async () => {
    try {
      const res = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          composition: form.composition,
          Category: form.category
        })
      });
      const data = await res.json();
      setEcoScore(data.ecoScore);
    } catch (err) {
      console.error('Error predicting eco score:', err);
    }
  };

  const saveProduct = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          ecoScore,
          price: parseFloat(form.price)
        })
      });
      if (!res.ok) throw new Error();
      alert('✅ Product saved!');
      setForm({ name: '', category: '', price: '', imageUrl: '', composition: {} });
      setEcoScore(null);
    } catch {
      alert('❌ Failed to save.');
    }
    setSaving(false);
  };

  return (
    <div className="max-w-2xl mx-auto mb-20 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">➕ Add New Product</h1>

      {/* Name + Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full border px-3 py-2 rounded focus:outline-none"
            placeholder="e.g. Glow Face Serum"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            className="w-full border px-3 py-2 rounded focus:outline-none"
            placeholder="e.g. skincare"
          />
        </div>
      </div>

      {/* Price + Image URL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-1 font-medium">Price (₹)</label>
          <input
            type="number"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
            className="w-full border px-3 py-2 rounded focus:outline-none"
            placeholder="e.g. 499.00"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            value={form.imageUrl}
            onChange={e => setForm({ ...form, imageUrl: e.target.value })}
            className="w-full border px-3 py-2 rounded focus:outline-none"
            placeholder="https://example.com/img.jpg"
          />
        </div>
      </div>

      {/* Composition builder */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">🧪 Composition</h2>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={currentIngredient}
            onChange={e => setCurrentIngredient(e.target.value)}
            className="flex-1 border px-3 py-2 rounded focus:outline-none"
            placeholder="Ingredient name"
          />
          <input
            type="number"
            value={currentQty}
            onChange={e => setCurrentQty(e.target.value)}
            className="w-24 border px-3 py-2 rounded focus:outline-none"
            placeholder="Qty"
          />
          <button
            type="button"
            onClick={addComposition}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Add
          </button>
        </div>
        <pre className="bg-gray-50 border p-3 rounded text-sm overflow-x-auto">
          {JSON.stringify(form.composition, null, 2)}
        </pre>
      </div>

      {/* Predict + Save */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          onClick={predictEcoScore}
          className="flex-1 bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-300 transition"
        >
          🔍 Predict Eco Score
        </button>
        {ecoScore !== null && (
          <span className="text-green-700 font-medium">
            🌱 Eco Score:&nbsp;<strong>{ecoScore.toFixed(1)}</strong>
          </span>
        )}
      </div>

      <div className="mt-6">
        <button
          onClick={saveProduct}
          disabled={saving}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {saving ? 'Saving…' : '💾 Save Product'}
        </button>
      </div>
    </div>
  );
}
