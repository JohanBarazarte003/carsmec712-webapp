// Archivo: app/components/GenericForm.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import IconPicker from './IconPicker'; // Asegúrate de que este componente exista


const GenericForm = ({ entity, fields, existingData }) => {
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // useEffect para rellenar el formulario cuando estamos en modo "Edición"
  useEffect(() => {
    if (existingData) {
      const initialData = {};
      fields.forEach(field => {
        if (field.type !== 'file') {
          // Aseguramos que el valor no sea null o undefined
          initialData[field.name] = existingData[field.name] || '';
        }
      });
      setFormData(initialData);
    }
  }, [existingData, fields]);

  // Manejador para cambios en inputs de texto, número y textarea
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manejador para el cambio de imagen
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Manejador para el cambio de icono desde el IconPicker
  const handleIconChange = (iconName) => {
    setFormData(prev => ({ ...prev, iconName: iconName }));
  };

  // Lógica principal para enviar el formulario
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError('');

  try {
    let finalData = { ...formData };
    let imageUrl = existingData?.imageUrl;

    if (fields.some(f => f.name === 'image') && image) {
      const uploadFormData = new FormData();
      uploadFormData.append('file', image);
      uploadFormData.append('UPLOADCARE_PUB_KEY', process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY);
      uploadFormData.append('UPLOADCARE_STORE', 'auto');
      
      const uploadcareRes = await fetch('https://upload.uploadcare.com/base/', { method: 'POST', body: uploadFormData });
      if (!uploadcareRes.ok) throw new Error('Error al subir la imagen.');
      
      const uploadcareData = await uploadcareRes.json();
      imageUrl = `https://ucarecdn.com/${uploadcareData.file}/`;
    }
    
    finalData.imageUrl = imageUrl;
    
    if (finalData.price) {
      finalData.price = parseFloat(finalData.price);
    }

    const method = existingData ? 'PUT' : 'POST';
    const apiUrl = existingData ? `/api/${entity}s/${existingData.id}` : `/api/${entity}s`;

    const res = await fetch(apiUrl, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Falló la operación.');
    }

    // --- CORRECCIÓN AQUÍ ---
    // Ahora redirigimos a la pestaña correcta
    router.push(`/dashboard?tab=${entity}s`);
    router.refresh();

  } catch (err) {
    setError(err.message);
  } finally {
    setIsSubmitting(false);
  }
};
  
  // --- RENDERIZADO DEL FORMULARIO ---

  // Clases de estilo consistentes para los campos
  const inputClasses = "mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-brand-red focus:border-brand-red";
  const fileInputClasses = "mt-1 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-red/20 file:text-brand-red hover:file:bg-brand-red/30";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-brand-dark p-8 rounded-lg border border-gray-800">
      {fields.map(field => (
        <div key={field.name}>
          {field.type !== 'icon' && (
             <label htmlFor={field.name} className="block text-sm font-medium text-gray-300">{field.label}</label>
          )}

          {field.type === 'textarea' ? (
            <textarea name={field.name} id={field.name} value={formData[field.name] || ''} onChange={handleChange} required={field.required} className={inputClasses} rows="4"></textarea>
          
          ) : field.type === 'file' ? (
            <input type="file" name={field.name} id={field.name} onChange={handleImageChange} required={field.required && !existingData} accept="image/*" className={fileInputClasses} />
          
          ) : field.type === 'icon' ? (
            <IconPicker value={formData[field.name] || ''} onChange={handleIconChange} />
          
          ) : (
            <input 
              type={field.type} 
              name={field.name} 
              id={field.name} 
              value={formData[field.name] || ''} 
              onChange={handleChange} 
              required={field.required} 
              step={field.step} 
              placeholder={field.placeholder} 
              className={inputClasses} 
            />
          )}
        </div>
      ))}
      
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      
      <div className="pt-4">
        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Guardando...' : (existingData ? `Actualizar ${entity.charAt(0).toUpperCase() + entity.slice(1)}` : `Crear ${entity.charAt(0).toUpperCase() + entity.slice(1)}`)}
        </button>
      </div>
    </form>
  );
};

export default GenericForm;