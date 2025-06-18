// Archivo: app/(admin)/maintenance/detail/[id]/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Printer, User, Car, Calendar, Gauge } from 'lucide-react';

const MaintenanceDetailPage = () => {
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  const [record, setRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchRecord = async () => {
        setIsLoading(true);
        try {
          const res = await fetch(`/api/maintenance/${id}`);
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'No se pudo obtener el registro.');
          }
          const data = await res.json();
          setRecord(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchRecord();
    }
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">Cargando...</div>;
  }
  if (error) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-900 text-red-500">Error: {error}</div>;
  }
  if (!record) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-500">No se encontró el registro.</div>;
  }

  const { vehicle, serviceItems = [], partItems = [] } = record;
  const { customer } = vehicle;

  return (
    <div className="bg-gray-900 min-h-screen p-4 md:p-8 flex justify-center items-start text-sm">
      <div className="w-full max-w-4xl">
        {/* Controles que se ocultan al imprimir */}
        <div className="flex justify-between items-center mb-6 print:hidden">
          <button onClick={() => router.back()} className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
            <ChevronLeft size={18} className="mr-2" /> Volver
          </button>
          <button onClick={handlePrint} className="flex items-center bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md text-sm">
            <Printer size={16} className="mr-2" /> Imprimir / PDF
          </button>
        </div>

        {/* --- INICIO DEL ÁREA IMPRIMIBLE --- */}
        <div id="printable-area" className="bg-white text-gray-800 p-8 md:p-10 rounded-lg shadow-2xl">
          {/* Cabecera con Logo */}
          <header className="flex justify-between items-start pb-4 border-b border-gray-200">
            <div className="w-28">
              <Image src="/images/logo.png" alt="CarsMec712 Logo" width={112} height={112} />
            </div>
            <div className="text-right">
              <h1 className="text-2xl font-bold text-gray-900">{record.description}</h1>
              <p className="text-gray-500 font-mono">Registro #{record.id.slice(-8)}</p>
            </div>
          </header>

          {/* Fecha y Estado */}
          <section className="flex justify-between items-center mt-4 pb-4">
             <p className="font-semibold text-gray-600 flex items-center"><Calendar size={14} className="mr-2"/>{new Date(record.date).toLocaleDateString('es-VE', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
             <span className="text-xs font-bold bg-blue-100 text-blue-800 px-3 py-1 rounded-full uppercase">{record.status}</span>
          </section>

          {/* Información del Cliente y Vehículo */}
          <section className="grid grid-cols-2 gap-8 py-5 border-y border-gray-200">
            <div>
              <h3 className="text-xs uppercase font-bold text-gray-500 mb-2 flex items-center"><User size={12} className="mr-2"/>Cliente</h3>
              <p className="font-semibold">{customer.name}</p>
              <p className="text-gray-600">{customer.phone}</p>
              <p className="text-gray-600">{customer.email || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-xs uppercase font-bold text-gray-500 mb-2 flex items-center"><Car size={12} className="mr-2"/>Vehículo</h3>
              <p className="font-semibold">{vehicle.brand} {vehicle.model} ({vehicle.year})</p>
              <p className="font-mono text-red-600">{vehicle.plate}</p>
              <p className="text-gray-600 flex items-center"><Gauge size={12} className="mr-1.5"/>{record.mileage ? `${record.mileage.toLocaleString()} km` : 'N/A'}</p>
            </div>
          </section>

          {/* Tablas de Items (con texto más pequeño) */}
          <section className="text-xs leading-relaxed">
            {serviceItems.length > 0 && (
              <div className="py-5">
                <h3 className="font-semibold mb-2 text-base text-gray-800">Servicios y Mano de Obra</h3>
                <table className="w-full">
                   <thead><tr className="border-b border-gray-300 text-gray-500"><th className="py-1 text-left font-normal">Servicio</th><th className="py-1 text-right font-normal">Costo</th></tr></thead>
                   <tbody>{serviceItems.map((item, i) => (<tr key={`service-${i}`} className="border-b border-gray-200"><td className="py-2">{item.name}</td><td className="py-2 text-right">${(parseFloat(item.price) || 0).toFixed(2)}</td></tr>))}</tbody>
                </table>
              </div>
            )}
            {partItems.length > 0 && (
              <div className="py-5">
                <h3 className="font-semibold mb-2 text-base text-gray-800">Repuestos y Partes</h3>
                <table className="w-full">
                  <thead><tr className="border-b border-gray-300 text-gray-500"><th className="py-1 text-left font-normal">Repuesto</th><th className="py-1 text-center font-normal">Cant.</th><th className="py-1 text-right font-normal">P/Unit.</th><th className="py-1 text-right font-normal">Total</th></tr></thead>
                  <tbody>{partItems.map((item, i) => (<tr key={`part-${i}`} className="border-b border-gray-200"><td className="py-2">{item.name}</td><td className="py-2 text-center">{item.quantity}</td><td className="py-2 text-right">${(parseFloat(item.price) || 0).toFixed(2)}</td><td className="py-2 text-right font-semibold">${(item.quantity * item.price).toFixed(2)}</td></tr>))}</tbody>
                </table>
              </div>
            )}
          </section>
          
          {/* Resumen de Totales */}
          <section className="flex justify-end pt-5 mt-4">
            <div className="w-full max-w-xs space-y-2 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal:</span><span>${record.subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600"><span>IVA (16%):</span><span>${record.tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-base pt-2 mt-2 border-t border-gray-300 text-gray-900">
                <span>TOTAL:</span><span className="text-red-600">${record.total.toFixed(2)}</span>
              </div>
            </div>
          </section>

          {/* Pie de página de la factura */}
          <footer className="text-center text-xs text-gray-400 mt-10 pt-4 border-t border-gray-200">
            <p>Gracias por su confianza en CarsMec712.</p>
            <p>Este documento es un presupuesto válido por 15 días / Recibo de servicio.</p>
          </footer>
        </div>
        {/* --- FIN DEL ÁREA IMPRIMIBLE --- */}
      </div>
    </div>
  );
};

export default MaintenanceDetailPage;