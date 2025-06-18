// Archivo: app/(admin)/layout.jsx

import Link from 'next/link';
import { LayoutDashboard, ShoppingCart, Wrench, Package, Users, LogOut } from 'lucide-react';

// --- Componente de la Barra Lateral ---
const AdminSidebar = () => {
  const navLinkClass = "flex items-center px-4 py-2.5 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors text-sm";

  return (
    <aside className="w-64 bg-brand-dark flex-shrink-0 p-4 flex flex-col border-r border-gray-800">
      <div className="text-center mb-10">
        <Link href="/dashboard">
          <h2 className="text-2xl font-bold text-white">CarsMec<span className="text-brand-red">712</span></h2>
          <p className="text-xs text-gray-400">Panel de Control</p>
        </Link>
      </div>
      <nav className="flex-grow space-y-1">
        <p className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase">General</p>
        <Link href="/dashboard" className={navLinkClass}>
          <LayoutDashboard size={18} className="mr-3" /> Dashboard
        </Link>
        
        <p className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase">Gestión</p>
        {/* Estos enlaces ahora apuntan al dashboard, que tiene pestañas */}
        <Link href="/dashboard?tab=products" className={navLinkClass}>
          <ShoppingCart size={18} className="mr-3" /> Productos
        </Link>
        <Link href="/dashboard?tab=services" className={navLinkClass}>
          <Wrench size={18} className="mr-3" /> Servicios
        </Link>
        <Link href="/dashboard?tab=projects" className={navLinkClass}>
          <Package size={18} className="mr-3" /> Proyectos
        </Link>

        <p className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase">Clientes</p>
        <Link href="/customers" className={navLinkClass}>
          <Users size={18} className="mr-3" /> Clientes y Vehículos
        </Link>
      </nav>
      <div className="mt-auto">
        <a href="/api/auth/logout" className={`${navLinkClass} bg-gray-800/50`}>
          <LogOut size={18} className="mr-3" /> Cerrar Sesión
        </a>
      </div>
    </aside>
  );
};

// --- Componente del Layout Principal del Admin ---
// NOTA: No hay etiquetas <html> ni <body> aquí.
export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <AdminSidebar />
      <main className="flex-grow overflow-y-auto">
        {children}
      </main>
    </div>
  );
}