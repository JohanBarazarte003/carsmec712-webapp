// Archivo: app/(admin)/vehicles/[vehicleId]/page.jsx

import Link from 'next/link';
import { ChevronLeft, Wrench, PlusCircle, Calendar, Gauge, Car, User } from 'lucide-react';
import ActionButtons from '@/app/components/ActionButtons'; // No olvides importar esto

async function getVehicleDetails(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/vehicles/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch vehicle details');
  return res.json();
}

const VehicleDetailPage = async ({ params }) => {
  const { vehicleId } = params;
  const vehicle = await getVehicleDetails(vehicleId);

  return (
    <div className="p-4 md:p-8 text-brand-light">
      <Link href={`/customers/${vehicle.customerId}`} className="inline-flex items-center text-gray-400 hover:text-brand-light mb-8">
        <ChevronLeft size={20} className="mr-2" />
        Volver a Detalles de {vehicle.customer.name}
      </Link>
      
      {/* ... Tarjeta de Información del Vehículo (sin cambios) ... */}

      <div className="flex justify-between items-center mb-4 mt-8">
        <h2 className="text-2xl font-bold">Historial y Presupuestos</h2>
       <Link 
  href={`/maintenance/new?vehicleId=${vehicle.id}`} 
  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md text-sm inline-flex items-center transition-colors"
>
  <PlusCircle size={18} className="mr-2" />
  Nuevo Registro
</Link>
      </div>

      <div className="space-y-4">
        {vehicle.maintenanceRecords.length > 0 ? (
          vehicle.maintenanceRecords.map(record => ( // <-- Aquí empieza el bucle, 'record' existe desde aquí...
            <div key={record.id} className="bg-brand-dark rounded-lg border border-gray-800">
              <div className="p-4">
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
              
              {/* --- ESTA ES LA SECCIÓN CORREGIDA --- */}
              <div className="mt-2 pt-2 border-t border-gray-700 flex justify-end space-x-4 p-4 bg-gray-900/30 rounded-b-lg">
                <Link href={`/maintenance/detail/${record.id}`} className="text-sm font-semibold text-blue-400 hover:text-blue-300">
                  Ver Detalles
                </Link>
                {/* Ahora ActionButtons está dentro del map y tiene acceso a 'record.id' */}
                <ActionButtons entity="maintenance" entityId={record.id} />
              </div>
            </div> // <-- ...hasta aquí.
          )) // <-- El bucle termina aquí.
        ) : (
          <div className="text-center py-16 ...">
            {/* ... Mensaje de "Sin historial" ... */}
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleDetailPage;