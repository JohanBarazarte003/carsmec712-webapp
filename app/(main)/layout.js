// Archivo: app/(main)/layout.jsx
'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Preloader from '@/app/components/Preloader';

export default function MainLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  // Lógica para el preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Duración del preloader

    return () => clearTimeout(timer);
  }, []);

  // NOTA: No hay etiquetas <html> ni <body> aquí.
  return (
    <div className="bg-brand-dark"> {/* Damos el color de fondo aquí */}
      <AnimatePresence>
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <Header />
            <main>{children}</main>
            <Footer />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}