// Archivo: app/(main)/shop/page.jsx

import ShopClientPage from '@/app/components/ShopClientPage';
import FilterSidebar from '@/app/components/FilterSidebar';

// Función para obtener los productos paginados
async function getPaginatedProducts(searchParams) {
  // Obtenemos el número de página de los parámetros de la URL, por defecto es 1
  const page = searchParams['page'] ?? '1';
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products?page=${page}`, { 
      cache: 'no-store' 
    });

    if (!res.ok) {
      console.error("Failed to fetch paginated products, status:", res.status);
      // Devolvemos un objeto con valores por defecto en caso de error
      return { products: [], totalPages: 1, currentPage: 1 };
    }
    return res.json();
  } catch (error) {
    console.error("Error en fetch de getPaginatedProducts:", error);
    return { products: [], totalPages: 1, currentPage: 1 };
  }
}

// La página en sí es un Server Component asíncrono
export default async function ShopPage({ searchParams }) {
  const data = await getPaginatedProducts(searchParams);

  return (
    <div className="bg-brand-dark min-h-screen pt-24">
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-5xl font-bold text-center text-brand-light mb-4">Nuestra Tienda</h1>
        <div className="h-1 w-24 bg-brand-red mx-auto mb-12"></div>

         {/* --- INICIO DEL NUEVO LAYOUT DE 2 COLUMNAS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Columna de Filtros (a la izquierda) */}
          <div className="lg:col-span-1">
            <FilterSidebar />
          </div>

           <div className="lg:col-span-3">
            <ShopClientPage 
              initialProducts={data.products} 
              initialTotalPages={data.totalPages}
              initialCurrentPage={data.currentPage}
            />
          </div>
        </div>
        {/* --- FIN DEL NUEVO LAYOUT --- */}
        
        {/* Renderizamos el componente cliente, pasándole los datos */}
        {/* <ShopClientPage 
          initialProducts={data.products} 
          initialTotalPages={data.totalPages}
          initialCurrentPage={data.currentPage}
        /> */}
      </div>
    </div>
  );
}