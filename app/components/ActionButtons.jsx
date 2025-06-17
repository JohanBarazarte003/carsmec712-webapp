// Archivo: app/components/ActionButtons.jsx
'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Ahora recibe el tipo de entidad ('product', 'service', etc.) y el ID
const ActionButtons = ({ entity, entityId }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(`¿Estás seguro de que quieres eliminar est${entity === 'product' ? 'e' : 'e'} ${entity}? Esta acción no se puede deshacer.`);
    
    if (confirmed) {
      setIsDeleting(true);
      try {
        // La URL de la API se construye dinámicamente
        const res = await fetch(`/api/${entity}s/${entityId}`, {
          method: 'DELETE',
        });

        if (!res.ok) {
          throw new Error(`No se pudo eliminar el ${entity}.`);
        }
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
    <>
       <Link href={`/admin/edit/${entity}/${entityId}`} className="text-blue-400 hover:text-blue-300 mr-4 text-sm">
        Editar
      </Link>
      <button 
        onClick={handleDelete} 
        disabled={isDeleting}
        className="text-red-500 hover:text-red-400 text-sm disabled:opacity-50"
      >
        {isDeleting ? 'Eliminando...' : 'Eliminar'}
      </button>
    </>
  );
};

export default ActionButtons;