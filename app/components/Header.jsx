import Link from 'next/link';
import Image from 'next/image'; // ¡Importante! Importa el componente Image

import { motion } from 'framer-motion';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-brand-dark/50 backdrop-blur-sm z-50 border-b border-gray-800">
      <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo con Imagen */}
        <Link href="/" className="flex items-center">
         <motion.div layoutId="logo"> {/* 2. Envuélvelo y añade el layoutId */}
            <Image
              src="/images/logo.png"
              alt="Logo CarsMec712"
              width={120}
              height={120}
              className="h-auto"
              priority
            />
          </motion.div>
        </Link>

        {/* Menú de Navegación */}
        <div className="hidden md:flex space-x-6 text-brand-light font-bold uppercase">
           <Link href="#servicios" className="hover:text-red-500 transition-colors">Servicios</Link>
          <Link href="#shop" className="hover:text-brand-red transition-colors">Shop</Link>
          <Link href="#proyectos" className="hover:text-brand-red transition-colors">Proyectos</Link>
          <Link href="#contacto" className="hover:text-brand-red transition-colors">Contacto</Link>
        </div>

        {/* Redes Sociales con Iconos */}
        <div className="flex items-center space-x-4 text-white">
          <a href="https://www.instagram.com/carsmec712/?hl=es" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors"><FaInstagram size={28} />
           
          </a>
         <a href="https://www.tiktok.com/@carsmec712" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors"><FaTiktok size={28} />
            {/* Lucide no tiene icono oficial de TikTok, usamos uno similar */}
    
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
