// Archivo: app/components/VehicleForm.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// El formulario recibe el ID del cliente al que pertenece el nuevo vehículo
const VehicleForm = ({ customerId }) => {
  const [plate, setPlate] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [vin, setVin] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const vehicleData = { plate, brand, model, year, vin, customerId };

      const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicleData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'No se pudo crear el vehículo.');
      }

      // Redirigimos de vuelta a la página de detalle del cliente
      router.push(`/customers/${customerId}`);
      router.refresh();

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const inputClasses = "mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white ...";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-brand-dark p-8 rounded-lg border border-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="plate" className="...">Matrícula (Placa)</label>
          <input type="text" id="plate" value={plate} onChange={(e) => setPlate(e.target.value)} required className={inputClasses} placeholder="ABC-123" />
        </div>
        <div>
          <label htmlFor="brand" className="...">Marca</label>
          <input type="text" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} required className={inputClasses} placeholder="Ej: Toyota" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="model" className="...">Modelo</label>
          <input type="text" id="model" value={model} onChange={(e) => setModel(e.target.value)} required className={inputClasses} placeholder="Ej: Corolla" />
        </div>
        <div>
          <label htmlFor="year" className="...">Año</label>
          <input type="number" id="year" value={year} onChange={(e) => setYear(e.target.value)} required className={inputClasses} placeholder="Ej: 2021" />
        </div>
      </div>
      <div>
        <label htmlFor="vin" className="...">VIN / Serial de Carrocería (Opcional)</label>
        <input type="text" id="vin" value={vin} onChange={(e) => setVin(e.target.value)} className={inputClasses} />
      </div>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <div className="pt-4">
        <button type="submit" disabled={isSubmitting} className="w-full ...">
          {isSubmitting ? 'Guardando...' : 'Añadir Vehículo'}
        </button>
      </div>
    </form>
  );
};

export default VehicleForm;