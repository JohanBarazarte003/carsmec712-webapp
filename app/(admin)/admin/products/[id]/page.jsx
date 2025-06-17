// Archivo: app/(admin)/admin/products/edit/[id]/page.jsx
import ProductForm from '@/app/components/ProductForm'; // Reutilizaremos nuestro formulario
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

// Función para obtener los datos del producto a editar
async function getProductById(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    // Puedes manejar el error como prefieras, ej: notFound() de Next.js
    throw new Error('No se pudo obtener el producto');
  }
  return res.json();
}

const EditProductPage = async ({ params }) => {
  const product = await getProductById(params.id);

  return (
    <div className="min-h-screen text-brand-light p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/admin/dashboard" className="inline-flex items-center ...">
          <ChevronLeft size={20} className="mr-2" />
          Volver al Panel
        </Link>
        <h1 className="text-3xl font-bold mb-8">Editar Producto</h1>
        
        {/* Le pasamos el producto existente al formulario */}
        <ProductForm existingProduct={product} />
      </div>
    </div>
  );
};

export default EditProductPage;