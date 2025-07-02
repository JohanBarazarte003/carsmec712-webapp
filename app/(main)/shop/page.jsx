// Archivo: app/(main)/shop/page.jsx

import ShopClientPage from '@/app/components/ShopClientPage';


// Función para obtener los productos paginados
async function getPaginatedProducts(searchParams) {
  // Obtenemos el número de página de los parámetros de la URL, por defecto es 1
   const params = new URLSearchParams();
  params.set('page', searchParams['page'] ?? '1');
  if (searchParams['category']) {
    params.set('category', searchParams['category']);
  }
  if (searchParams['q']) {
    params.set('q', searchParams['q']);
  }
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products?${params.toString()}`, { cache: 'no-store' });

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


async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories`, { cache: 'no-store' });
    if (!res.ok) {
      console.error("No se pudieron obtener las categorías.");
      return [];
    }
    return res.json();
  } catch (error) {
    console.error("Error en fetch de getCategories:", error);
    return [];
  }
}
// La página en sí es un Server Component asíncrono
const ShopPage = async ({ searchParams }) => {
  // Ahora llamamos a ambas funciones en paralelo para más eficiencia
  const [data, categories] = await Promise.all([
    getPaginatedProducts(searchParams),
    getCategories()
  ]);
  
  const { products, totalPages, currentPage } = data;

  return (
    <div className="bg-brand-dark min-h-screen pt-24">
      <div className="container mx-auto px-4 pb-24">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-brand-light mb-12 pt-24">Nuestra Tienda</h1>
        
        {/* Le pasamos las categorías al componente cliente */}
        <ShopClientPage 
          initialProducts={products} 
          initialTotalPages={totalPages}
          initialCurrentPage={currentPage}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default ShopPage;