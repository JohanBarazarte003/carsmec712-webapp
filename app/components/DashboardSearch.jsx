// Archivo: app/components/DashboardSearch.jsx
'use client';

import { Search } from 'lucide-react';

// Este es un "componente controlado". Su valor es manejado por el componente padre.
const DashboardSearch = ({ searchTerm, onSearchChange, placeholder }) => {
  return (
    <div className="relative w-full md:w-1/2 lg:w-1/3">
      <input 
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder || "Buscar en la tabla..."}
        className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white focus:ring-brand-red focus:border-brand-red"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
    </div>
  );
};

export default DashboardSearch;