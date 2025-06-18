// Archivo: app/(admin)/products/edit/[id]/page.jsx
import ProductForm from '@/app/components/ProductForm';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

async function getProductById(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

const EditProductPage = async ({ params }) => {
  const product = await getProductById(params.id);

  return (
    <div className="min-h-screen text-brand-light p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center text-gray-400 hover:text-brand-light mb-8">
          <ChevronLeft size={20} className="mr-2" />
          Volver al Panel
        </Link>
        <h1 className="text-3xl font-bold mb-8">Editar Producto</h1>
        <ProductForm existingProduct={product} />
      </div>
    </div>
  );
};
export default EditProductPage;