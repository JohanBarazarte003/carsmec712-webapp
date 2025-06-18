// Archivo: app/components/ActionButtons.jsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2 } from 'lucide-react'; // Importamos iconos para los botones

// El componente recibe el tipo de entidad ('product', 'service', etc.) y el ID del ítem.
const ActionButtons = ({ entity, entityId }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  // --- Lógica para construir la URL de Edición ---
  // Por defecto, usa la ruta genérica.
  let editUrl = `/edit/${entity}/${entityId}`;
  
  // Excepción: si la entidad es 'maintenance', usa su ruta de edición específica.
  if (entity === 'maintenance') {
    editUrl = `/maintenance/edit/${entityId}`;
  }

  // --- Lógica para Eliminar (ahora es más robusta) ---
  const handleDelete = async () => {
    // Creamos un mensaje de confirmación más descriptivo
    const entityName = entity === 'maintenance' ? 'este registro' : `est${entity === 'product' ? 'e' : 'e'} ${entity}`;
    const confirmed = window.confirm(`¿Estás seguro de que quieres eliminar ${entityName}? Esta acción no se puede deshacer.`);
    
    if (confirmed) {
      setIsDeleting(true);
      try {
        // Construimos la ruta de la API correctamente
        const apiPath = entity === 'maintenance' ? 'maintenance' : `${entity}s`;
        const res = await fetch(`/api/${apiPath}/${entityId}`, {
          method: 'DELETE',
        });

        if (!res.ok) {
          throw new Error(`No se pudo eliminar el ${entity}.`);
        }
        
        // Refrescamos la página para que la tabla se actualice
        router.refresh();

      } catch (error) {
        console.error(error);
        alert(`Ocurrió un error al eliminar el ${entity}.`);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Botón de Editar como un Link */}
      <Link 
        href={editUrl} 
        className="p-2 text-yellow-400 hover:text-yellow-300 transition-colors"
        title={`Editar ${entity}`}
      >
        <Edit size={16} />
      </Link>
      
      {/* Botón de Eliminar */}
      <button 
        onClick={handleDelete} 
        disabled={isDeleting}
        className="p-2 text-red-500 hover:text-red-400 transition-colors disabled:opacity-50"
        title={`Eliminar ${entity}`}
      >
        {isDeleting ? (
          <div className="w-4 h-4 border-2 border-dashed rounded-full animate-spin border-gray-400"></div>
        ) : (
          <Trash2 size={16} />
        )}
      </button>
    </div>
  );
};

export default ActionButtons;