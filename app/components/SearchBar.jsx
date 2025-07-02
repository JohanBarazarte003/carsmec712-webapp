// app/components/SearchBar.jsx
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.query.value;
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    // Al buscar, siempre volvemos a la página 1
    params.set('page', '1');
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative mb-8">
      <input 
        type="text" 
        name="query"
        defaultValue={searchParams.get('q') || ''}
        placeholder="Buscar productos por nombre o descripción..."
        className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white focus:ring-brand-red focus:border-brand-red"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
    </form>
  );
};
export default SearchBar;