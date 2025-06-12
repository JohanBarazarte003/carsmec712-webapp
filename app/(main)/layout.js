// Archivo: app/layout.js

'use client'; // ¡Muy importante! Necesitamos que sea un Client Component para usar estado

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Krona_One, Inter } from 'next/font/google';
import '../globals.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';

const kronaOne = Krona_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-krona-one', // Asigna una variable CSS
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Asigna una variable CSS
});

// Nota: No podemos exportar 'metadata' desde un Client Component.
// Esto se manejará de otra forma en Next.js si es necesario, pero para el layout funciona.

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula el tiempo que dura el preloader
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Opcional: para evitar que el scroll esté bloqueado si el usuario interactuó
      document.body.style.overflow = 'auto'; 
    }, 2000); // Este tiempo debe coincidir con el 'delay' del preloader

    return () => clearTimeout(timer);
  }, []);

  return (
   
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
    
  );
}