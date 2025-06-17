// Archivo: app/components/ServiceForm.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ServiceForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [iconName, setIconName] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
      router.push('/admin/dashboard'); // <- Usamos router
    router.refresh();     

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, iconName }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'No se pudo crear el servicio.');
      }

      router.push('/admin/dashboard');
      router.refresh();

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-brand-dark p-8 rounded-lg border border-gray-800">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300">Título del Servicio</label>
        <input 
          type="text" 
          id="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
          className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-brand-red focus:border-brand-red" 
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300">Descripción</label>
        <textarea 
          id="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
          rows="4" 
          className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-brand-red focus:border-brand-red"
        ></textarea>
      </div>
      <div>
        <label htmlFor="iconName" className="block text-sm font-medium text-gray-300">Nombre del Icono (de Lucide)</label>
        <input 
          type="text" 
          id="iconName" 
          value={iconName} 
          onChange={(e) => setIconName(e.target.value)} 
          required 
          className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-brand-red focus:border-brand-red" 
          placeholder="Ej: Wrench, BrainCircuit, Car"
        />
        <p className="text-xs text-gray-500 mt-1">
          Busca el nombre del icono en <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">lucide.dev/icons</a>. Escribe el nombre exacto (ej. `ShieldCheck`).
        </p>
      </div>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <div>
        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Guardando...' : 'Guardar Servicio'}
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;