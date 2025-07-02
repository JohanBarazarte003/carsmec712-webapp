// Archivo: app/(admin)/projects/new/page.jsx
import GenericForm from '@/app/components/GenericForm';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';


const projectFormFields = [
  { name: 'title', label: 'Título del Proyecto', type: 'text', required: true },
  { name: 'description', label: 'Descripción', type: 'textarea', required: true },
  { name: 'image', label: 'Imagen del Proyecto', type: 'file', required: true },
];

const NewProjectPage = () => {
  return (
    <div className="min-h-screen text-brand-light p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center text-gray-400 hover:text-brand-light mb-8">
          <ChevronLeft size={20} className="mr-2" />
          Volver al Dashboard
        </Link>
        <h1 className="text-3xl font-bold mb-8">Añadir Nuevo Proyecto</h1>
        
        <GenericForm 
          entity="project" 
          fields={projectFormFields} 
        />
      </div>
    </div>
  );
};

export default NewProjectPage;