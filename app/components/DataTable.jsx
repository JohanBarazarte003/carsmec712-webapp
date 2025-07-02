// Archivo: app/components/DataTable.jsx
'use client';

import Image from 'next/image';
import ActionButtons from './ActionButtons';

const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

const DataTable = ({ title, data, columns, entity }) => {
  return (
    <div className="bg-brand-dark rounded-lg shadow overflow-x-auto">
      <table className="w-full text-left">
        <thead className="border-b border-gray-700">
          <tr>
            {/* Crea las cabeceras de columna dinámicamente */}
            {columns.map((col) => (
              <th key={col.accessor} className="p-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">{col.Header}</th>
            ))}
            <th className="p-4 text-sm font-semibold text-gray-400 uppercase tracking-wider w-40">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((row) => (
              <tr key={row.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                {/* Crea las celdas de datos dinámicamente */}
                {columns.map((col) => (
                  <td key={col.accessor} className="p-4 align-top">
                    {/* Lógica para renderizar diferentes tipos de celda */}
                    {col.accessor === 'imageUrl' ? (
                      <Image src={row[col.accessor]} alt="Imagen del producto" width={60} height={60} className="rounded object-cover" />
                    ) : col.accessor === 'price' ? (
                      <span className="font-semibold text-brand-light">${row[col.accessor].toFixed(2)}</span>
                    ) : (
                      <span className={`${col.isMono ? 'font-mono text-sm text-gray-400' : 'text-brand-light'}`}>
                        {row[col.accessor]}
                      </span>
                    )}
                  </td>
                ))}
                <td className="p-4 align-top">
                  <ActionButtons entity={entity} entityId={row.id} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-center p-8 text-gray-500">
                No hay {title.toLowerCase()} para mostrar.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;