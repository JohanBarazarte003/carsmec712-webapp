// app/(admin)/admin/products/new/page.jsx
import ProductForm from '@/app/components/ProductForm';

const NewProductPage = () => {
  return (
    <div className="min-h-screen text-brand-light p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Añadir Nuevo Producto</h1>
        <ProductForm />
      </div>
    </div>
  );
};

export default NewProductPage;