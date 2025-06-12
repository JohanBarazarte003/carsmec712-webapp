// Archivo: app/components/ShopClientPage.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductModal from './ProductModal';
import PaginationControls from './PaginationControls'; // Reutilizamos nuestro componente de paginación

const ShopClientPage = ({ initialProducts, initialTotalPages, initialCurrentPage }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      {/* El modal para ver los detalles del producto */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      {/* Cuadrícula de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 bg-gray">
        {initialProducts && initialProducts.length > 0 ? (
          initialProducts.map((product) => (
            <div 
  key={product.id}
  className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden flex flex-col group transition-all duration-300 hover:border-brand-red hover:shadow-lg hover:shadow-brand-red/10"
>
  {/* Imagen del producto */}
  <div 
    onClick={() => setSelectedProduct(product)}
    className="relative w-full h-48 cursor-pointer"
  >
    <Image 
      src={product.imageUrl} 
      alt={product.title} 
      layout="fill" 
      objectFit="cover"
      className="group-hover:scale-105 transition-transform duration-300"
    />
  </div>

  {/* Contenido de la tarjeta */}
  <div className="p-4 flex flex-col flex-grow text-left">
    <h3 
    onClick={() => setSelectedProduct(product)}
    className="text-md font-semibold text-brand-light mb-2 h-12 cursor-pointer"
  >
    {product.title}
  </h3>
    
    <p className="text-2xl font-bold text-brand-light mt-auto mb-3">
    ${product.price.toFixed(2)}
  </p>

    <p className="text-xs text-green-400 mb-4">Llega gratis mañana</p> 

     <div className="space-y-2">
    <Link 
      href={`https://api.whatsapp.com/send?phone=584140311364&text=¡Hola!%20Quiero%20comprar%20el%20producto%20'${encodeURIComponent(product.title)}'.`}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full text-center bg-brand-red/90 text-white font-bold py-2 rounded-md hover:bg-brand-red transition-colors text-sm"
    >
      Comprar
    </Link>
    <button 
      onClick={() => setSelectedProduct(product)}
      className="block w-full text-center bg-gray-700 text-white font-semibold py-2 rounded-md hover:bg-gray-600 transition-colors text-sm"
    >
      Ver detalles
    </button>
  </div>
  </div>
</div>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="text-gray-400 text-lg">No se encontraron productos.</p>
          </div>
        )}
      </div>

      {/* Controles de paginación */}
      <PaginationControls 
        currentPage={initialCurrentPage} 
        totalPages={initialTotalPages} 
      />
    </>
  );
};

export default ShopClientPage;