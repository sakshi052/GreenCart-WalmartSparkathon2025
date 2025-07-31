export default function DepartmentsDropdown({ label = 'Departments' }) {
  const categories = ['Serum','Soap','Shampoo','Chips','Juice','Baby Food','Ketchup'];
  return (
    <select className="border rounded p-2 text-sm">
      <option disabled>{label}</option>
      {categories.map(cat => (
        <option key={cat} value={cat.toLowerCase()}>{cat}</option>
      ))}
    </select>
  );
}
