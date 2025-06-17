// app/(admin)/admin/customers/[id]/page.jsx
import Link from 'next/link';
import { ChevronLeft, Car, PlusCircle } from 'lucide-react';

async function getCustomerDetails(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/customers/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch customer details');
  return res.json();
}

const CustomerDetailPage = async ({ params }) => {
  const {customerId} = params;
  const customer = await getCustomerDetails(customerId);

  return (
    <div className="p-4 md:p-8 text-brand-light">
      <Link href="/admin/customers" className="inline-flex items-center text-gray-400 hover:text-brand-light mb-8">
        <ChevronLeft size={20} className="mr-2" />
        Volver al Listado de Clientes
      </Link>

      {/* Tarjeta con la información del cliente */}
      <div className="bg-brand-dark p-6 rounded-lg border border-gray-800 mb-8">
        <h1 className="text-3xl font-bold">{customer.name}</h1>
        <p className="text-gray-400">Teléfono: {customer.phone}</p>
        <p className="text-gray-400">Email: {customer.email || 'No proporcionado'}</p>
      </div>

      {/* Sección de Vehículos */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Vehículos Registrados</h2>
        <Link href={`/admin/customers/${customer.id}/vehicles/new`} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm inline-flex items-center">
          <PlusCircle size={18} className="mr-2" />
          Añadir Vehículo
        </Link>
      </div>

      <div className="bg-brand-dark rounded-lg shadow">
        {customer.vehicles.length > 0 ? (
          <ul className="divide-y divide-gray-800">
            {customer.vehicles.map(vehicle => (
              <li key={vehicle.id} className="p-4 flex items-center justify-between hover:bg-gray-800/50">
                <div className="flex items-center">
                  <Car size={24} className="text-brand-red mr-4" />
                  <div>
                    <p className="font-bold text-lg">{vehicle.brand} {vehicle.model} ({vehicle.year})</p>
                    <p className="text-sm text-gray-400 font-mono">{vehicle.plate}</p>
                  </div>
                </div>
                <Link href={`/admin/vehicles/${vehicle.id}`} className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
    Ver Historial
  </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-8 text-center text-gray-500">Este cliente aún no tiene vehículos registrados.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerDetailPage;