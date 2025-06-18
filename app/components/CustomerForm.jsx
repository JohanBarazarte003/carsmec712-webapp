// Archivo: app/components/CustomerForm.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CustomerForm = ({ existingCustomer }) => {
  // Estados para los campos del formulario
  const [name, setName] = useState(existingCustomer?.name || '');
  const [phone, setPhone] =useState(existingCustomer?.phone || '');
  const [email, setEmail] = useState(existingCustomer?.email || '');

  // Estados para la UI
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Lógica para enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const customerData = { name, phone, email };

      // Decidimos si creamos (POST) o actualizamos (PUT)
      const method = existingCustomer ? 'PUT' : 'POST';
      const apiUrl = existingCustomer 
        ? `/api/customers/${existingCustomer.id}` 
        : '/api/customers';

      const res = await fetch(apiUrl, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'No se pudo guardar el cliente.');
      }

      // Redirigimos al listado de clientes y refrescamos los datos
      router.push('/customers');
      router.refresh();

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clases de estilo consistentes para los inputs
  const inputClasses = "mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-brand-red focus:border-brand-red";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-brand-dark p-8 rounded-lg border border-gray-800">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nombre Completo</label>
        <input 
          type="text" 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          className={inputClasses}
          placeholder="Ej: Johan Barazarte"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Número de Teléfono</label>
        <input 
          type="tel" 
          id="phone" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          required 
          className={inputClasses}
          placeholder="Ej: 04141234567"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email (Opcional)</label>
        <input 
          type="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className={inputClasses}
          placeholder="Ej: cliente@email.com"
        />
      </div>
      
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      
      <div className="pt-4">
        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Guardando...' : (existingCustomer ? 'Actualizar Cliente' : 'Crear Cliente')}
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;