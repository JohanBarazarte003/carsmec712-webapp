// Archivo: components/Header.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { href: '/#servicios', label: 'Servicios' },
    { href: '/shop', label: 'Shop' },
    { href: '/#proyectos', label: 'Proyectos' },
    { href: '/#contacto', label: 'Contacto' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-brand-dark/80 backdrop-blur-sm z-50 border-b border-gray-800">
        <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0"> {/* Añadimos flex-shrink-0 para que no se encoja */}
            <motion.div layoutId="logo">
              <Image
                src="/images/logo.png"
                alt="Logo CarsMec712"
                width={140}
                height={140}
                className="h-auto"
                priority
              />
            </motion.div>
          </Link>

          {/* Menú de Navegación para Escritorio (Oculto en móvil) */}
          <div className="hidden md:flex flex-grow justify-center">
            <div className="flex space-x-8 text-brand-light font-bold uppercase">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-brand-red transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contenedor Derecho: Redes Sociales y Menú Hamburguesa */}
          <div className="flex items-center space-x-4">
            {/* Redes Sociales (Siempre visibles) */}
            <div className="flex items-center space-x-4 text-white">
              <a href="https://www.instagram.com/carsmec712/?hl=es" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="https://www.tiktok.com/@carsmec712" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">
                <FaTiktok size={24} />
              </a>
            </div>

            {/* Botón de Menú Hamburguesa (Solo visible en móvil) */}
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="text-brand-light p-1 focus:outline-none">
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Menú Desplegable para Móvil (Ahora solo contiene los enlaces de navegación) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="fixed top-[77px] left-0 w-full bg-brand-dark/95 backdrop-blur-md z-40 p-5 md:hidden"
          >
            <nav className="flex flex-col items-center space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xl text-brand-light font-bold uppercase hover:text-brand-red transition-colors"
                  onClick={toggleMobileMenu}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;