// Archivo: app/components/DashboardClient.jsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import DataTable from './DataTable'; // ¡Importamos nuestro componente genérico!
import DashboardSearch from './DashboardSearch';

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

const projectColumns = [
  { Header: 'Imagen', accessor: 'imageUrl' },
  { Header: 'Título', accessor: 'title' },
  { Header: 'Descripción', accessor: 'description' },
];

const customerColumns = [
  { Header: 'Nombre', accessor: 'name' },
  { Header: 'Teléfono', accessor: 'phone' },
  { Header: 'Email', accessor: 'email' },
  { Header: 'Vehículos', accessor: '_count.vehicles' }, // Prisma nos da este conteo
];




// --- Componente Principal del Dashboard ---
const DashboardClient = ({ products, services, projects, customers }) => {
  const [activeTab, setActiveTab] = useState('products');
  const [searchTerm, setSearchTerm] = useState('');

   const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [products, searchTerm]);

  const filteredServices = useMemo(() => {
    if (!searchTerm) return services;
    return services.filter(s =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [services, searchTerm]);
  
  const filteredProjects = useMemo(() => {
    if (!searchTerm) return projects;
    return projects.filter(p =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [projects, searchTerm]);

  const filteredCustomers = useMemo(() => {
    if (!searchTerm) return customers;
        const lowercasedFilter = searchTerm.toLowerCase();

    return customers.filter(c =>
             customers.name.toLowerCase().includes(lowercasedFilter) ||

        customers.phone.includes(searchTerm) ||
       (customers.email && customers.email.toLowerCase().includes(lowercasedFilter))
    );
  }, [customers, searchTerm]);

    const tabs = [
    { name: 'products', label: 'Productos', data: filteredProducts, columns: productColumns, addLink: '/products/new', addLabel: 'Producto' },
    { name: 'services', label: 'Servicios', data: filteredServices, columns: serviceColumns, addLink: '/services/new', addLabel: 'Servicio' },
    { name: 'projects', label: 'Proyectos', data: filteredProjects, columns: projectColumns, addLink: '/projects/new', addLabel: 'Proyecto' },
    { name: 'customers', label: 'Clientes', data: filteredCustomers, columns: customerColumns, addLink: '/customers/new', addLabel: 'Cliente' },
  ];

  const activeTabData = tabs.find(tab => tab.name === activeTab);

  const tabClass = "py-2 px-4 text-sm font-semibold cursor-pointer border-b-2 transition-colors";
  const activeTabClass = "border-brand-red text-brand-light";
  const inactiveTabClass = "border-transparent text-gray-500 hover:text-gray-300";

  

  return (
    <>
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div className="border-b border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            {tabs.map(tab => (
              <button
                key={tab.name}
                onClick={() => { setActiveTab(tab.name); setSearchTerm(''); }}
                className={`${tabClass} ${activeTab === tab.name ? activeTabClass : inactiveTabClass}`}
              >
                {tab.label} ({(tab.data && tab.data.length) || 0})
              </button>
            ))}
          </nav>
        </div>

          <DashboardSearch 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm}
          placeholder={`Buscar en ${activeTabData?.label}`}
        />
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