// Archivo: app/(admin)/dashboard/page.jsx

import DashboardClient from '@/app/components/DashboardClient';

// --- FUNCIONES PARA OBTENER DATOS ---

async function getProducts() {
  // Usamos limit=200 para asegurarnos de traer todos para el admin, ya que no paginamos aquí
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products?limit=200`, { cache: 'no-store' });
  if (!res.ok) {
    console.error("Error al obtener productos para el dashboard");
    return { products: [] }; // Devolvemos la estructura esperada
  }
  return res.json();
}

async function getServices() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/services`, { cache: 'no-store' });
  if (!res.ok) {
    console.error("Error al obtener servicios para el dashboard");
    return []; // Devolvemos la estructura esperada
  }
  return res.json();
}

async function getProjects() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/projects`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

async function getCustomers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/customers`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}
// --- FIN DE FUNCIONES ---


const DashboardPage = async () => {
  // Obtenemos todos los datos en paralelo
  const [productData, services, projects, customers] = await Promise.all([
    getProducts(),
    getServices(),
    getProjects(),
    getCustomers(),
    
  ]);

  // Extraemos el array de productos del objeto que devuelve su API
  const products = productData.products || [];

  return (
    <div className="min-h-screen bg-gray-900 text-brand-light p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>
        
        {/* Renderizamos el componente cliente y le pasamos TODOS los datos */}
        <DashboardClient 
          products={products}
          services={services}
          projects={projects}
          customers={customers}
        />
      </div>
    </div>
  );
};

export default DashboardPage;