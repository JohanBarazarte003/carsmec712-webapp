'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ProductForm = () => {
  // Estados para cada campo del formulario
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null); // Almacena el objeto del archivo de imagen
  
  // Estados para la interfaz de usuario
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();

  const handleImageChange = (e) => {
    // Tomamos solo el primer archivo si el usuario selecciona varios
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    // Validación simple
    if (!image) {
      setError('Por favor, selecciona una imagen para el producto.');
      return;
    }
    
    setError('');
    setIsSubmitting(true);

    try {
      // --- PASO A: SUBIR IMAGEN A UPLOADCARE ---
      const formData = new FormData();
      formData.append('file', image);
      formData.append('UPLOADCARE_PUB_KEY', process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY);
      formData.append('UPLOADCARE_STORE', 'auto');

      const uploadcareRes = await fetch('https://upload.uploadcare.com/base/', {
        method: 'POST',
        body: formData,
      });

      if (!uploadcareRes.ok) {
        throw new Error('Error al subir la imagen. Inténtalo de nuevo.');
      }

      const uploadcareData = await uploadcareRes.json();
      const imageUrl = `https://ucarecdn.com/${uploadcareData.file}/`; // Construimos la URL final de la imagen

      // --- PASO B: GUARDAR DATOS EN NUESTRA BASE DE DATOS ---
      const productData = {
        title,
        description,
        price: parseFloat(price), // Convertimos el precio a número
        category,
        imageUrl, // Usamos la URL de Uploadcare
      };

      const apiRes = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!apiRes.ok) {
        const errorResult = await apiRes.json();
        throw new Error(errorResult.message || 'No se pudo guardar el producto.');
      }

      // --- PASO C: ÉXITO Y REDIRECCIÓN ---
      // Forzamos una actualización de la página del dashboard para que muestre el nuevo producto
      router.push('/admin/dashboard');
      router.refresh(); 

    } catch (err) {
      console.error(err);
      setError(err.message || 'Ocurrió un error inesperado.');
    } finally {
      setIsSubmitting(false); // Reactivamos el botón
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* --- CAMPOS DEL FORMULARIO (JSX sin cambios) --- */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300">Título</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-brand-red focus:border-brand-red" />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300">Descripción</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows="3" className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-brand-red focus:border-brand-red"></textarea>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-300">Precio</label>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required step="0.01" className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-brand-red focus:border-brand-red" />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300">Categoría</label>
          <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-brand-red focus:border-brand-red" />
        </div>
      </div>
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-300">Imagen</label>
        <input type="file" id="image" onChange={handleImageChange} required accept="image/*" className="mt-1 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-red/20 file:text-brand-red hover:file:bg-brand-red/30" />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div>
        <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red disabled:bg-gray-500 disabled:cursor-not-allowed">
          {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;