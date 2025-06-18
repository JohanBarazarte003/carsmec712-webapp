// Archivo: app/(admin)/maintenance/new/page.jsx
import MaintenanceForm from '@/app/components/MaintenanceForm';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

// Esta página recibe `searchParams` para leer parámetros de la URL como ?vehicleId=...
const NewMaintenancePage = ({ searchParams }) => {
  const vehicleId = searchParams.vehicleId;

  // Si no hay vehicleId, no podemos continuar.
  if (!vehicleId) {
    return (
      <div className="p-8 text-red-500">
        Error: No se ha especificado un ID de vehículo. Por favor, vuelve y selecciona un vehículo.
      </div>
    );
  }

  return (
    <div className="min-h-screen text-brand-light p-8">
      <div className="max-w-4xl mx-auto">
        <Link href={`/vehicles/${vehicleId}`} className="inline-flex items-center text-gray-400 hover:text-brand-light mb-8">
          <ChevronLeft size={20} className="mr-2" />
          Volver a Historial del Vehículo
        </Link>
        <h1 className="text-3xl font-bold mb-8">Crear Nuevo Registro / Presupuesto</h1>
        
        {/* Le pasamos el vehicleId al formulario */}
        <MaintenanceForm vehicleId={vehicleId} />
      </div>
    </div>
  );
};

export default NewMaintenancePage;