// Archivo: app/components/FeaturedProducts.jsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProductModal from './ProductModal'; // Importamos el modal para los detalles

const FeaturedProducts = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      {/* El modal que se mostrará al hacer clic en "Ver detalles" */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      <section id="shop-preview" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-brand-light mb-2">
            Productos Destacados
          </h2>
          <div className="h-1 w-20 bg-brand-red mx-auto mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products && products.length > 0 ? (
              products.map((product) => (
                // --- INICIO DE LA NUEVA TARJETA (idéntica a la de la tienda) ---
                <div 
                  key={product.id}
                  className="bg-brand-dark rounded-lg border border-gray-800 overflow-hidden flex flex-col group transition-all duration-300 hover:border-brand-red hover:shadow-lg hover:shadow-brand-red/10"
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

                    {/* Botones de acción */}
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
                // --- FIN DE LA NUEVA TARJETA ---
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400">Próximamente productos destacados.</p>
              </div>
            )}
          </div>
          
          <div className="mt-16">
            <Link href="/shop" className="bg-brand-red text-white font-bold py-3 px-6 rounded-md text-lg hover:bg-red-700 transition-all duration-300">
              Ver toda la Tienda
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts;