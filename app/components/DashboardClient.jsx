// Archivo: app/components/DashboardClient.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import DataTable from './DataTable'; // ¡Importamos nuestro componente genérico!

// --- Definiciones de las Columnas para cada tabla ---
const productColumns = [
  { Header: 'Imagen', accessor: 'imageUrl' },
  { Header: 'Título', accessor: 'title' },
  { Header: 'Categoría', accessor: 'category' },
  { Header: 'Precio', accessor: 'price' },
];

const serviceColumns = [
  { Header: 'Icono (Nombre)', accessor: 'iconName', isMono: true },
  { Header: 'Título', accessor: 'title' },
  { Header: 'Descripción', accessor: 'description' },
];

const projectColumns = []; // Lista para el futuro

// --- Componente Principal del Dashboard ---
const DashboardClient = ({ products, services, projects }) => {
  const [activeTab, setActiveTab] = useState('products');

  const tabs = [
    { name: 'products', label: 'Productos', data: products, columns: productColumns, addLink: '/products/new', addLabel: 'Producto' },
    { name: 'services', label: 'Servicios', data: services, columns: serviceColumns, addLink: '/services/new', addLabel: 'Servicio' },
    { name: 'projects', label: 'Proyectos', data: projects, columns: projectColumns, addLink: '#', addLabel: 'Proyecto' },
  ];

  const activeTabData = tabs.find(tab => tab.name === activeTab);

  const tabClass = "py-2 px-4 text-sm font-semibold cursor-pointer border-b-2 transition-colors";
  const activeTabClass = "border-brand-red text-brand-light";
  const inactiveTabClass = "border-transparent text-gray-500 hover:text-gray-300";

  return (
    <>
      <div className="border-b border-gray-700 mb-8">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`${tabClass} ${activeTab === tab.name ? activeTabClass : inactiveTabClass}`}
            >
              {tab.label} ({(tab.data && tab.data.length) || 0})
            </button>
          ))}
        </nav>
      </div>

      <div>
        {activeTabData && activeTabData.columns.length > 0 ? (
          <>
            <div className="flex justify-end mb-4">
              <Link href={activeTabData.addLink} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm">
                Añadir {activeTabData.addLabel}
              </Link>
            </div>
            <DataTable
              title={activeTabData.label}
              data={activeTabData.data}
              columns={activeTabData.columns}
              entity={activeTabData.name.slice(0, -1)} // 'products' -> 'product'
            />
          </>
        ) : (
           <div className="text-center py-16 text-gray-500">
             <p>La gestión de {activeTabData?.label.toLowerCase()} se implementará próximamente.</p>
           </div>
        )}
      </div>
    </>
  );
};

export default DashboardClient;