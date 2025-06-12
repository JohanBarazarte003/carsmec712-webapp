// app/admin/dashboard/page.jsx
import Link from 'next/link';
import Image from 'next/image';

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

const DashboardPage = async () => {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-900 text-brand-light p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          <Link href="/admin/products/new" className="bg-brand-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors">
            Añadir Producto
          </Link>
        </div>

        <div className="bg-brand-dark rounded-lg shadow">
          <table className="w-full text-left">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="p-4">Imagen</th>
                <th className="p-4">Título</th>
                <th className="p-4">Categoría</th>
                <th className="p-4">Precio</th>
                <th className="p-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="p-4">
                      <Image src={product.imageUrl} alt={product.title} width={60} height={60} className="rounded object-cover" />
                    </td>
                    <td className="p-4 font-semibold">{product.title}</td>
                    <td className="p-4 text-gray-400">{product.category}</td>
                    <td className="p-4">${product.price.toFixed(2)}</td>
                    <td className="p-4">
                      {/* Aquí irán los botones de Editar y Eliminar */}
                      <button className="text-blue-400 hover:text-blue-300 mr-4">Editar</button>
                      <button className="text-red-500 hover:text-red-400">Eliminar</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-8 text-gray-500">
                    No hay productos en la base de datos. ¡Añade el primero!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;