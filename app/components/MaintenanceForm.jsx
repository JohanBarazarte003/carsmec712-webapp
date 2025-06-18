// Archivo: app/components/MaintenanceForm.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Trash2 } from 'lucide-react';

const MaintenanceForm = ({ vehicleId, existingRecord }) => {
  // --- Estados para la información general ---
  const [description, setDescription] = useState('');
  const [mileage, setMileage] = useState('');
  const [status, setStatus] = useState('Presupuesto');

  // --- Estados para las listas dinámicas de ítems ---
  const [serviceItems, setServiceItems] = useState([{ name: '', price: '' }]);
  const [partItems, setPartItems] = useState([{ name: '', quantity: 1, price: '' }]);

  // --- Estados para los totales calculados y UI ---
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // --- useEffect para rellenar el formulario si estamos editando ---
  useEffect(() => {
    if (existingRecord) {
      setDescription(existingRecord.description || '');
      setMileage(existingRecord.mileage?.toString() || '');
      setStatus(existingRecord.status || 'Presupuesto');
      // Aseguramos que los items sean arrays, incluso si no existen en la BD
      setServiceItems(Array.isArray(existingRecord.serviceItems) && existingRecord.serviceItems.length > 0 ? existingRecord.serviceItems : [{ name: '', price: '' }]);
      setPartItems(Array.isArray(existingRecord.partItems) && existingRecord.partItems.length > 0 ? existingRecord.partItems : [{ name: '', quantity: 1, price: '' }]);
    }
  }, [existingRecord]);

  // --- useEffect para recalcular el presupuesto en tiempo real ---
  useEffect(() => {
    const servicesTotal = serviceItems.reduce((acc, item) => acc + (parseFloat(item.price) || 0), 0);
    const partsTotal = partItems.reduce((acc, item) => acc + ((parseInt(item.quantity) || 0) * (parseFloat(item.price) || 0)), 0);
    
    const newSubtotal = servicesTotal + partsTotal;
    const newTax = newSubtotal * 0.16; // Asume 16% de IVA. Cámbialo o pon 0 si no aplica.
    const newTotal = newSubtotal + newTax;

    setSubtotal(newSubtotal);
    setTax(newTax);
    setTotal(newTotal);
  }, [serviceItems, partItems]);

  // --- Funciones para manejar las listas de ítems ---
  const handleItemChange = (index, event, itemType) => {
    const { name, value } = event.target;
    const list = itemType === 'service' ? [...serviceItems] : [...partItems];
    list[index][name] = value;
    if (itemType === 'service') setServiceItems(list);
    else setPartItems(list);
  };
  
  const handleAddItem = (itemType) => {
    if (itemType === 'service') {
      setServiceItems([...serviceItems, { name: '', price: '' }]);
    } else {
      setPartItems([...partItems, { name: '', quantity: 1, price: '' }]);
    }
  };

  const handleRemoveItem = (index, itemType) => {
    const list = itemType === 'service' ? [...serviceItems] : [...partItems];
    if (list.length > 1) { // Previene eliminar la última fila
      list.splice(index, 1);
      if (itemType === 'service') setServiceItems(list);
      else setPartItems(list);
    }
  };

  // --- Lógica para enviar el formulario ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const maintenanceData = {
        vehicleId, 
        description, 
        mileage: mileage ? parseInt(mileage) : null, 
        status,
        serviceItems: serviceItems.filter(item => item.name && item.price), // Filtra ítems vacíos
        partItems: partItems.filter(item => item.name && item.price && item.quantity),
        subtotal, 
        tax, 
        total
      };
      
      const method = existingRecord ? 'PUT' : 'POST';
      const apiUrl = existingRecord 
        ? `/api/maintenance/${existingRecord.id}` 
        : '/api/maintenance';

      const res = await fetch(apiUrl, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(maintenanceData)
      });
      
      if(!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'No se pudo guardar el registro.');
      }

      router.push(`/vehicles/${vehicleId}`);
      router.refresh();
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-brand-red";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-brand-dark p-6 md:p-8 rounded-lg border border-gray-800">
      {/* Información General */}
      <div className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300">Descripción General del Trabajo</label>
          <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required className={inputClasses} placeholder="Ej: Mantenimiento de 50,000 KM" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="mileage" className="block text-sm font-medium text-gray-300">Kilometraje (Opcional)</label>
            <input type="number" id="mileage" value={mileage} onChange={(e) => setMileage(e.target.value)} className={inputClasses} placeholder="Ej: 50000" />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-300">Estado del Trabajo</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className={inputClasses}>
              <option>Presupuesto</option>
              <option>Aprobado</option>
              <option>En Progreso</option>
              <option>Completado</option>
              <option>Cancelado</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Ítems de Servicio */}
      <div className="border-t border-gray-700 pt-6">
        <h3 className="text-lg font-semibold mb-4 text-brand-light">Servicios / Mano de Obra</h3>
        <div className="space-y-2">
          {serviceItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <input type="text" name="name" value={item.name} onChange={e => handleItemChange(i, e, 'service')} placeholder="Nombre del servicio" className={inputClasses} />
              <input type="number" name="price" value={item.price} onChange={e => handleItemChange(i, e, 'service')} placeholder="Precio" className={`${inputClasses} w-32`} step="0.01" />
              <button type="button" onClick={() => handleRemoveItem(i, 'service')} className="p-2 text-gray-400 hover:text-red-500 disabled:opacity-50" disabled={serviceItems.length <= 1}><Trash2 size={18} /></button>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => handleAddItem('service')} className="mt-2 text-sm text-green-400 hover:text-green-300 flex items-center"><PlusCircle size={16} className="mr-1" /> Añadir servicio</button>
      </div>

      {/* Ítems de Repuestos */}
      <div className="border-t border-gray-700 pt-6">
        <h3 className="text-lg font-semibold mb-4 text-brand-light">Repuestos / Partes</h3>
        <div className="space-y-2">
          {partItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <input type="text" name="name" value={item.name} onChange={e => handleItemChange(i, e, 'part')} placeholder="Nombre del repuesto" className={inputClasses} />
              <input type="number" name="quantity" value={item.quantity} onChange={e => handleItemChange(i, e, 'part')} placeholder="Cant." className={`${inputClasses} w-24`} min="1" />
              <input type="number" name="price" value={item.price} onChange={e => handleItemChange(i, e, 'part')} placeholder="Precio Unit." className={`${inputClasses} w-32`} step="0.01" />
              <button type="button" onClick={() => handleRemoveItem(i, 'part')} className="p-2 text-gray-400 hover:text-red-500 disabled:opacity-50" disabled={partItems.length <= 1}><Trash2 size={18} /></button>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => handleAddItem('part')} className="mt-2 text-sm text-green-400 hover:text-green-300 flex items-center"><PlusCircle size={16} className="mr-1" /> Añadir repuesto</button>
      </div>

      {/* Totales */}
      <div className="border-t border-gray-700 pt-6 flex justify-end">
        <div className="w-full max-w-sm space-y-2 text-gray-300">
          <div className="flex justify-between"><span>Subtotal:</span><span className="font-semibold">${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>IVA (16%):</span><span className="font-semibold">${tax.toFixed(2)}</span></div>
          <div className="flex justify-between font-bold text-xl border-t border-gray-600 pt-2 mt-2 text-white">
            <span>TOTAL:</span><span className="text-brand-red">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-center py-2">{error}</p>}
      
      <div className="pt-6">
        <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed">
          {isSubmitting ? 'Guardando...' : (existingRecord ? 'Actualizar Registro' : 'Crear Registro')}
        </button>
      </div>
    </form>
  );
};

export default MaintenanceForm;