// Archivo: app/(admin)/layout.jsx
'use client'; // Convertimos el layout en un Client Component

import { useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, ShoppingCart, Wrench, Package, Users, LogOut, PanelLeftClose, PanelRightClose, Menu } from 'lucide-react';

// --- Componente de la Barra Lateral ---
// Ahora recibe props para saber si está abierta y una función para cerrarla
const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const navLinkClass = "flex items-center px-4 py-2.5 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors text-sm";
  
  return (
    // La transición de 'width' hace que el efecto de ocultar/mostrar sea suave
    <aside className={`bg-brand-dark flex-shrink-0 flex flex-col border-r border-gray-800 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className={`text-center mb-10 p-4 ${isOpen ? '' : 'py-5'}`}>
        <Link href="/dashboard">
          <h2 className="text-2xl font-bold text-white">
            {isOpen ? <>CarsMec<span className="text-brand-red">712</span></> : <span className="text-brand-red">C</span>}
          </h2>
          {isOpen && <p className="text-xs text-gray-400">Panel de Control</p>}
        </Link>
      </div>
      <nav className="flex-grow space-y-1 px-2">
        <p className={`pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase ${isOpen ? 'px-4' : 'text-center'}`}>{isOpen ? "General" : "•"}</p>
        <Link href="/dashboard" className={navLinkClass} title="Dashboard">
          <LayoutDashboard size={18} className={isOpen ? "mr-3" : "mx-auto"} /> {isOpen && "Dashboard"}
        </Link>
        
        <p className={`pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase ${isOpen ? 'px-4' : 'text-center'}`}>{isOpen ? "Gestión" : "•"}</p>
        <Link href="/dashboard?tab=products" className={navLinkClass} title="Productos"><ShoppingCart size={18} className={isOpen ? "mr-3" : "mx-auto"}/>{isOpen && "Productos"}</Link>
        <Link href="/dashboard?tab=services" className={navLinkClass} title="Servicios"><Wrench size={18} className={isOpen ? "mr-3" : "mx-auto"}/>{isOpen && "Servicios"}</Link>
        <Link href="/dashboard?tab=projects" className={navLinkClass} title="Proyectos"><Package size={18} className={isOpen ? "mr-3" : "mx-auto"}/>{isOpen && "Proyectos"}</Link>
        
        <p className={`pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase ${isOpen ? 'px-4' : 'text-center'}`}>{isOpen ? "Clientes" : "•"}</p>
        <Link href="/customers" className={navLinkClass} title="Clientes y Vehículos"><Users size={18} className={isOpen ? "mr-3" : "mx-auto"}/>{isOpen && "Clientes y Vehículos"}</Link>
      </nav>
      <div className="mt-auto p-2">
        <a href="/api/auth/logout" className={`${navLinkClass} bg-gray-800/50`} title="Cerrar Sesión">
          <LogOut size={18} className={isOpen ? "mr-3" : "mx-auto"} /> {isOpen && "Cerrar Sesión"}
        </a>
      </div>
    </aside>
  );
};

// --- Layout Principal del Admin ---
export default function AdminLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className="flex-grow overflow-y-auto bg-gray-900">
        {/* Botón para ocultar/mostrar la sidebar en el contenido principal */}
        <div className="sticky top-0 bg-gray-900/50 backdrop-blur-sm p-4 z-10">
            <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
                <Menu size={24}/>
            </button>
        </div>

        {/* El contenido de la página */}
        <div className="p-4 md:p-8">
            {children}
        </div>
      </main>
    </div>
  );
}