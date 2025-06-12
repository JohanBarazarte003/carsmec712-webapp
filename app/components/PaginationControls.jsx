// Archivo: app/components/PaginationControls.jsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PaginationControls = ({ currentPage, totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    // Llevamos al usuario al inicio de la sección de la tienda
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-16 text-brand-light">
      <button 
        onClick={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage <= 1}
        className="flex items-center justify-center p-2 rounded-md bg-gray-800 hover:bg-brand-red disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <span className="font-semibold">
        Página {currentPage} de {totalPages}
      </span>
      <button 
        onClick={() => handlePageChange(currentPage + 1)} 
        disabled={currentPage >= totalPages}
        className="flex items-center justify-center p-2 rounded-md bg-gray-800 hover:bg-brand-red disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default PaginationControls;