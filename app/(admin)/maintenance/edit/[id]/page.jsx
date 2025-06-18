// Archivo: app/(admin)/maintenance/edit/[id]/page.jsx
import MaintenanceForm from '@/app/components/MaintenanceForm';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

async function getMaintenanceRecord(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/maintenance/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch record');
  return res.json();
}

const EditMaintenancePage = async ({ params }) => {
  const { id } = params;
  const record = await getMaintenanceRecord(id);

  return (
    <div className="min-h-screen text-brand-light p-8">
      <div className="max-w-4xl mx-auto">
        <Link href={`/vehicles/${record.vehicleId}`} className="inline-flex items-center ...">
          <ChevronLeft size={20} className="mr-2" />
          Volver al Historial del Vehículo
        </Link>
        <h1 className="text-3xl font-bold mb-8">Editar Registro de Mantenimiento</h1>
        
        <MaintenanceForm 
          vehicleId={record.vehicleId} 
          existingRecord={record} // Le pasamos los datos existentes
        />
      </div>
    </div>
  );
};

export default EditMaintenancePage;