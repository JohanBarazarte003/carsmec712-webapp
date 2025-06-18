// Archivo: app/(admin)/products/new/page.jsx

import ProductForm from '@/app/components/ProductForm'; // <-- CAMBIO CLAVE: Usamos ProductForm
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

const NewProductPage = () => {
  return (
    <div className="min-h-screen text-brand-light p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center text-gray-400 hover:text-brand-light transition-colors mb-8">
          <ChevronLeft size={20} className="mr-2" />
          Volver al Panel
        </Link>
        <h1 className="text-3xl font-bold mb-8">Añadir Nuevo Producto</h1>
        
        {/* Usamos ProductForm sin props, ya que está en modo "Creación" por defecto */}
        <ProductForm />
      </div>
    </div>
  );
};

export default NewProductPage;