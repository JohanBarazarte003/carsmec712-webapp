// app/components/MaintenanceForm.jsx (versión simplificada de la lógica)
'use client';
import { useState, useEffect } from 'react';

const MaintenanceForm = ({ vehicleId }) => {
  // Estado para la información general
  const [description, setDescription] = useState('');
  const [mileage, setMileage] = useState('');

  // Estado para los ítems de servicio
  const [serviceItems, setServiceItems] = useState([{ name: '', price: '' }]);
  
  // Estado para los ítems de repuesto
  const [partItems, setPartItems] = useState([{ name: '', quantity: 1, price: '' }]);

  // Estado para los totales
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  // useEffect para recalcular totales cada vez que los ítems cambien
  useEffect(() => {
    const servicesTotal = serviceItems.reduce((acc, item) => acc + (parseFloat(item.price) || 0), 0);
    const partsTotal = partItems.reduce((acc, item) => acc + (item.quantity * (parseFloat(item.price) || 0)), 0);
    const newSubtotal = servicesTotal + partsTotal;
    const newTax = newSubtotal * 0.16; // Asumiendo 16% de IVA, por ejemplo
    const newTotal = newSubtotal + newTax;

    setSubtotal(newSubtotal);
    setTax(newTax);
    setTotal(newTotal);
  }, [serviceItems, partItems]);

  const handleAddServiceItem = () => {
    setServiceItems([...serviceItems, { name: '', price: '' }]);
  };

  const handleAddPartItem = () => {
    setPartItems([...partItems, { name: '', quantity: 1, price: '' }]);
  };
  
  const handleSubmit = async (e) => {
    // ... lógica para enviar todos los datos a la API /api/maintenance
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Inputs para descripción y kilometraje */}

      {/* Sección de Servicios */}
      <h2>Servicios (Mano de Obra)</h2>
      {serviceItems.map((item, index) => (
        <div key={index}>
          <input type="text" placeholder="Nombre del servicio" />
          <input type="number" placeholder="Precio" />
        </div>
      ))}
      <button type="button" onClick={handleAddServiceItem}>+ Añadir Servicio</button>

      {/* Sección de Repuestos */}
      <h2>Repuestos</h2>
      {partItems.map((item, index) => (
        <div key={index}>
          <input type="text" placeholder="Nombre del repuesto" />
          <input type="number" placeholder="Cantidad" />
          <input type="number" placeholder="Precio unitario" />
        </div>
      ))}
      <button type="button" onClick={handleAddPartItem}>+ Añadir Repuesto</button>

      {/* Sección de Totales */}
      <div>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>IVA (16%): ${tax.toFixed(2)}</p>
        <p>Total: ${total.toFixed(2)}</p>
      </div>

      <button type="submit">Guardar Registro</button>
    </form>
  );
};