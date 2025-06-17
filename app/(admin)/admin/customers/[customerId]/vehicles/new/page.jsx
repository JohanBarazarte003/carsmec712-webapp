// Archivo: app/(admin)/admin/customers/[id]/vehicles/new/page.jsx
import VehicleForm from '@/app/components/VehicleForm';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

// El 'id' en los params corresponde al ID del cliente
const NewVehiclePage = ({ params }) => {
  const customerId = params;

  return (
    <div className="min-h-screen text-brand-light p-8">
      <div className="max-w-2xl mx-auto">
        <Link href={`/admin/customers/${customerId}`} className="inline-flex items-center text-gray-400 ...">
          <ChevronLeft size={20} className="mr-2" />
          Volver a Detalles del Cliente
        </Link>
        <h1 className="text-3xl font-bold my-8">Añadir Nuevo Vehículo</h1>
        
        {/* Le pasamos el customerId al formulario */}
        <VehicleForm customerId={customerId} />
      </div>
    </div>
  );
};

export default NewVehiclePage;