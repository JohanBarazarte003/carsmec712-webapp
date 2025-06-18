// Archivo: app/(admin)/customers/page.jsx
import Link from 'next/link';

async function getCustomers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/customers`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

const CustomersPage = async () => {
  const customers = await getCustomers();

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brand-light">Gestión de Clientes</h1>
        <Link href="/customers/new" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors text-sm">
          Añadir Cliente
        </Link>

        
      </div>
      
      <div className="bg-brand-dark rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left text-brand-light">
          <thead className="border-b border-gray-700">
            <tr>
              <th className="p-4">Nombre</th>
              <th className="p-4">Teléfono</th>
              <th className="p-4">Email</th>
              <th className="p-4">Vehículos</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="p-4 font-semibold">{customer.name}</td>
                  <td className="p-4 text-gray-400">{customer.phone}</td>
                  <td className="p-4 text-gray-400">{customer.email || 'N/A'}</td>
                  <td className="p-4 text-center">{customer._count.vehicles}</td>
                  <td className="p-4">
                    {/* Aquí irán los botones de Ver/Editar/Eliminar */}
                     <Link href={`/customers/${customer.id}`} className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
    Ver Detalles
  </Link>

   <Link href={`/edit/customer/${customer.id}`} className="text-yellow-400 ml-4 hover:text-yellow-300 text-sm font-semibold"> 
  Editar
</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-8 text-gray-500">
                  Aún no hay clientes registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersPage;