// Archivo: app/(admin)/admin/edit/[entity]/[id]/page.jsx

import GenericForm from '@/app/components/GenericForm';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

// Función para obtener datos (sin cambios)
async function getEntityData(entity, id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/${entity}s/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch ${entity}`);
  return res.json();
}

// --- DEFINICIÓN COMPLETA DE CAMPOS PARA TODOS LOS FORMULARIOS ---
const formFields = {
  product: [
    { name: 'title', label: 'Título del Producto', type: 'text', required: true },
    { name: 'description', label: 'Descripción', type: 'textarea', required: true },
    { name: 'price', label: 'Precio', type: 'number', required: true, step: '0.01' },
    { name: 'category', label: 'Categoría', type: 'text', required: true, placeholder: 'Ej: Llantas' },
    { name: 'image', label: 'Imagen (Opcional: solo para reemplazar)', type: 'file' },
  ],
  service: [ // <-- ESTA ES LA PARTE QUE PROBABLEMENTE FALTABA O ESTABA INCOMPLETA
    { name: 'title', label: 'Título del Servicio', type: 'text', required: true },
    { name: 'description', label: 'Descripción', type: 'textarea', required: true },
    { name: 'iconName', label: 'icono', type: 'icon', required: true, placeholder: 'Ej: Wrench' },
  ]
};
// --- FIN DE LA DEFINICIÓN ---


const EditEntityPage = async ({ params }) => {
  const { entity, id } = params;

  if (!formFields[entity]) {
    return (
      <div className="text-center text-red-500 p-8">
        Error: La entidad '{entity}' no es válida o no está configurada para edición.
      </div>
    );
  }

  const entityData = await getEntityData(entity, id);
  const fields = formFields[entity];
  const entityName = entity.charAt(0).toUpperCase() + entity.slice(1);

  return (
    <div className="min-h-screen text-brand-light p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/admin/dashboard" className="inline-flex items-center text-gray-400 hover:text-brand-light mb-8">
          <ChevronLeft size={20} className="mr-2" />
          Volver al Panel
        </Link>
        <h1 className="text-3xl font-bold mb-8">Editar {entityName}</h1>
        
        <GenericForm 
          entity={entity}
          fields={fields} 
          existingData={entityData} 
        />
      </div>
    </div>
  );
};

export default EditEntityPage;