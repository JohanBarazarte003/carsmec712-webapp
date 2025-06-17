// Archivo: app/components/ProductForm.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// El componente ahora acepta un prop opcional: `existingProduct`.
// Si este prop existe, significa que estamos en modo "Edición".
// Si no, estamos en modo "Creación".
const ProductForm = ({ existingProduct }) => {
  // Estados para cada campo del formulario
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null); // Almacena el archivo de imagen seleccionado

  // Estados para la UI
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // useEffect se ejecuta cuando el componente se carga.
  // Lo usamos para rellenar el formulario si estamos editando un producto existente.
  useEffect(() => {
    if (existingProduct) {
      setTitle(existingProduct.title || '');
      setDescription(existingProduct.description || '');
      setPrice(existingProduct.price?.toString() || '');
      setCategory(existingProduct.category || '');
      // No podemos pre-cargar el campo de la imagen por seguridad del navegador.
    }
  }, [existingProduct]); // Este efecto se re-ejecuta si `existingProduct` cambia.

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // La imagen solo es obligatoria si estamos creando un nuevo producto.
    if (!image && !existingProduct) {
      setError('Por favor, selecciona una imagen.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      let imageUrl = existingProduct?.imageUrl;

      // Si el usuario seleccionó una nueva imagen, la subimos a Uploadcare.
      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('UPLOADCARE_PUB_KEY', process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY);
        formData.append('UPLOADCARE_STORE', 'auto');

        const uploadcareRes = await fetch('https://upload.uploadcare.com/base/', {
          method: 'POST',
          body: formData,
        });

        if (!uploadcareRes.ok) {
          throw new Error('Error al subir la nueva imagen.');
        }

        const uploadcareData = await uploadcareRes.json();
        imageUrl = `https://ucarecdn.com/${uploadcareData.file}/`;
      }
      
      // Preparamos los datos del producto para enviarlos a nuestra API.
      const productData = {
        title,
        description,
        price: parseFloat(price),
        category,
        imageUrl, // Usamos la nueva URL si se subió una, o la existente si no.
      };
      
      // Decidimos dinámicamente qué método y URL de API usar.
      const method = existingProduct ? 'PUT' : 'POST';
      const apiUrl = existingProduct 
        ? `/api/products/${existingProduct.id}` 
        : '/api/products';
      
      const res = await fetch(apiUrl, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Falló la operación de guardado.');
      }

      // Si todo sale bien, redirigimos al dashboard y refrescamos los datos.
      router.push('/admin/dashboard');
      router.refresh();

    } catch (err) {
      console.error(err);
      setError(err.message || 'Ocurrió un error inesperado.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-brand-dark p-8 rounded-lg border border-gray-800">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300">Título del Producto</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-brand-red focus:border-brand-red" />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300">Descripción</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows="4" className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-brand-red focus:border-brand-red"></textarea>
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
        <label htmlFor="image" className="block text-sm font-medium text-gray-300">
          Imagen {existingProduct && "(Opcional: solo si quieres reemplazar la actual)"}
        </label>
        <input type="file" id="image" onChange={handleImageChange} required={!existingProduct} accept="image/*" className="mt-1 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-red/20 file:text-brand-red hover:file:bg-brand-red/30" />
      </div>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <div>
        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Guardando...' : (existingProduct ? 'Actualizar Producto' : 'Crear Producto')}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;