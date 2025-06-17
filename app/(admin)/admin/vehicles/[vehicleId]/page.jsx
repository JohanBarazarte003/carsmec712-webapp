// Archivo: app/(admin)/admin/vehicles/[id]/page.jsx

import Link from 'next/link';
import { ChevronLeft, Wrench, PlusCircle, Calendar, Gauge } from 'lucide-react';

async function getVehicleDetails(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/vehicles/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch vehicle details');
  return res.json();
}

const VehicleDetailPage = async ({ params }) => {
    const {id} = params;
  const vehicle = await getVehicleDetails(id);

  return (
    <div className="p-4 md:p-8 text-brand-light">
      <Link href={`/admin/customers/${vehicle.customerId}`} className="inline-flex items-center text-gray-400 hover:text-brand-light mb-8 transition-colors">
        <ChevronLeft size={20} className="mr-2" />
        Volver a Detalles del Cliente
      </Link>
      
      {/* Tarjeta de Información del Vehículo */}
      <div className="bg-brand-dark p-6 rounded-lg border border-gray-800 mb-8">
        <h1 className="text-3xl font-bold">{vehicle.brand} {vehicle.model} <span className="text-gray-400">({vehicle.year})</span></h1>
        <p className="font-mono text-brand-red text-lg mt-1">{vehicle.plate}</p>
        <p className="text-sm text-gray-500 mt-2">VIN: {vehicle.vin || 'No especificado'}</p>
        <p className="text-sm mt-1">Propietario: <span className="font-semibold">{vehicle.customer.name}</span></p>
      </div>

      {/* Sección del Historial de Mantenimiento */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Historial y Presupuestos</h2>
        <Link href={`/admin/maintenance/new?vehicleId=${vehicle.id}`} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm inline-flex items-center">
          <PlusCircle size={18} className="mr-2" />
          Nuevo Registro
        </Link>
      </div>

      <div className="space-y-4">
        {vehicle.maintenanceRecords.length > 0 ? (
          vehicle.maintenanceRecords.map(record => (
            <div key={record.id} className="bg-brand-dark p-4 rounded-lg border border-gray-800 hover:bg-gray-800/50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-lg text-brand-light">{record.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                    <span className="flex items-center"><Calendar size={14} className="mr-1.5" /> {new Date(record.date).toLocaleDateString()}</span>
                    <span className="flex items-center"><Gauge size={14} className="mr-1.5" /> {record.mileage ? `${record.mileage.toLocaleString()} km` : 'N/A'}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="font-bold text-xl text-brand-red">${record.total.toFixed(2)}</p>
                  <span className="text-xs font-semibold bg-gray-700 text-gray-300 px-2 py-1 rounded-full mt-1 inline-block">{record.status}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-brand-dark rounded-lg border border-dashed border-gray-700">
            <Wrench className="mx-auto h-12 w-12 text-gray-500" />
            <h3 className="mt-2 text-sm font-semibold text-gray-400">Sin historial</h3>
            <p className="mt-1 text-sm text-gray-500">Este vehículo aún no tiene registros de mantenimiento.</p>
            <p className="mt-1 text-sm text-gray-500">Crea el primero para empezar a llevar un control.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleDetailPage;
