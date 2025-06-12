'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Preloader = () => {
  const [progress, setProgress] = useState(0);

  // Simula el progreso de la barra de carga
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20); // Ajusta este valor para cambiar la velocidad (ms)

    return () => clearInterval(interval);
  }, []);

  // Variantes de animación para el logo (efecto grafiti/stencil)
  const logoVariants = {
    hidden: { opacity: 0, scale: 1.5, rotate: -15 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-dark"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, transitionEnd: { display: "none" } }} // Cuando termina de desaparecer, se quita del DOM
      transition={{ delay: 2, duration: 0.5 }} // Empieza a desaparecer después de 3 segundos
    >
      {/* Contenedor del Logo y la Barra */}
      <div className="w-64 flex flex-col items-center">
        {/* Logo con animación */}
        <motion.div
          layoutId="logo"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
        >
          <Image
            src="/images/logo.png"
            alt="Logo CarsMec712"
            width={300}
            height={300}
          />
        </motion.div>

        {/* Barra de Carga */}
        <div className="w-full h-2 bg-gray-800 rounded-full mt-6 overflow-hidden">
          <motion.div
            className="h-full bg-brand-red rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          ></motion.div>
        </div>
        
        {/* Porcentaje de Carga (Opcional) */}
        <p className="text-brand-red font-mono mt-2 text-sm">{progress}%</p>
      </div>
    </motion.div>
  );
};

export default Preloader;