// app/components/FilterSidebar.jsx
'use client'; // Será un componente cliente para manejar interacciones

const FilterSidebar = () => {
  // En el futuro, las categorías vendrían de la base de datos
  const categories = ['Llantas', 'Aceites', 'Frenos', 'Suspensión', 'Baterías'];

  return (
    <aside className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
      <h3 className="text-xl font-bold text-brand-light mb-4">Categorías</h3>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category}>
            <a href="#" className="text-gray-400 hover:text-brand-red transition-colors">
              {category}
            </a>
          </li>
        ))}
      </ul>

      {/* Aquí podríamos añadir filtros por precio, marca, etc. en el futuro */}
    </aside>
  );
};

export default FilterSidebar;