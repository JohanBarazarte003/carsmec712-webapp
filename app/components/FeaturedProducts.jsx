// Archivo: app/components/FeaturedProducts.jsx

import Image from 'next/image';
import Link from 'next/link';

// Este componente solo recibe y muestra los productos.
const FeaturedProducts = ({ products }) => {
  return (
    <section id="shop-preview" className="py-20 bg-gray-900 ">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-brand-light mb-2">
          Productos Destacados
        </h2>
        <div className="h-1 w-20 bg-brand-red mx-auto mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="bg-brand-dark rounded-lg overflow-hidden border border-gray-800 flex flex-col group">
                <div className="relative w-full h-48">
                  <Image 
                    src={product.imageUrl} 
                    alt={product.title} 
                    layout="fill" 
                    objectFit="cover" 
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-left flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-brand-light mb-2 truncate">{product.title}</h3>
                  <div className="mt-auto">
                    <p className="text-2xl font-bold text-brand-red">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400">Próximamente productos destacados.</p>
            </div>
          )}
        </div>
        
        {/* Botón para ver la tienda completa */}
        <div className="mt-16">
          <Link href="/shop" className="bg-brand-red text-white font-bold py-3 px-6 rounded-md text-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105">
            Ver toda la Tienda
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;