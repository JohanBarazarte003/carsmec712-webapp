// Archivo: app/(admin)/admin/services/new/page.jsx
import GenericForm from '@/app/components/GenericForm';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

// Definimos los campos específicos para el formulario de servicios
const serviceFormFields = [
  { name: 'title', label: 'Título del Servicio', type: 'text', required: true },
  { name: 'description', label: 'Descripción', type: 'textarea', required: true },
  { name: 'iconName', label: 'Icono del servicio', type: 'icon', required: true, placeholder: 'Ej: Wrench, BrainCircuit' },
];

const NewServicePage = () => {
  return (
    <div className="min-h-screen text-brand-light p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/admin/dashboard" className="inline-flex items-center text-gray-400 hover:text-brand-light mb-8">
          <ChevronLeft size={20} className="mr-2" />
          Volver al Panel
        </Link>
        <h1 className="text-3xl font-bold mb-8">Añadir Nuevo Servicio</h1>
        
        <GenericForm 
          entity="service" 
          fields={serviceFormFields} 
        />
      </div>
    </div>
  );
};

export default NewServicePage;