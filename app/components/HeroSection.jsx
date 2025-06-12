'use client';

import Link from 'next/link';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

const HeroSection = () => {
  const whatsappUrl = `https://api.whatsapp.com/send?phone=584140311364&text=¡Hola!%20Quisiera%20pedir%20una%20cita%20o%20hacer%20una%20consulta.`;

  // --- LÓGICA PARA ANIMACIÓN DE ESCRITURA ---
  const text1 = "Tu Estilo.";
  const text2 = "Nuestra Máquina.";
  
  const count1 = useMotionValue(0);
  const rounded1 = useTransform(count1, (latest) => Math.round(latest));
  const displayText1 = useTransform(rounded1, (latest) => text1.slice(0, latest));

  const count2 = useMotionValue(0);
  const rounded2 = useTransform(count2, (latest) => Math.round(latest));
  const displayText2 = useTransform(rounded2, (latest) => text2.slice(0, latest));

  useEffect(() => {
    // Inicia la animación del primer texto
    const controls1 = animate(count1, text1.length, {
      type: "tween",
      duration: 1.5,
      ease: "easeInOut",
      delay: 0.5,
    });

    // Inicia la animación del segundo texto después del primero
    const controls2 = animate(count2, text2.length, {
      type: "tween",
      duration: 2,
      ease: "easeInOut",
      delay: 2, // 0.5 (delay inicial) + 1.5 (duración del primero)
    });
    
    return () => {
      controls1.stop();
      controls2.stop();
    };
  }, []);
  // --- FIN DE LA LÓGICA ---

  return (
    <section 
      id="inicio" 
      className="relative h-screen flex items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/hero-background.jpg')" }}
    >
      {/* Capa Oscura (Overlay) */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/55 z-10 "></div>

      {/* Contenido Alineado a la Izquierda */}
      <div className="relative z-20 container mx-auto px-4">
        <div className="max-w-2xl text-left">
          <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-wider text-brand-light">
            {/* Usamos un span para el cursor parpadeante */}
            <motion.span>{displayText1}</motion.span>
            <br />
            <span className="text-brand-red">
              <motion.span className='text-3xl md:text-5xl'>{displayText2}</motion.span>
            </span>
            {/* Cursor parpadeante */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-1 h-12 md:h-16 bg-brand-light ml-2"
            />
          </h1>

          <motion.p 
            className="text-lg md:text-xl my-8 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4, duration: 0.5 }} // Aparece cuando termina la escritura
          >
                ¿Buscas un taller mecánico de confianza en Caracas? Ofrecemos reparación de autos y mantenimiento automotriz integral para que conduzcas seguro. ¡Agenda tu cita!

          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.2, duration: 0.5 }} // Aparece un poco después del párrafo
          >
            <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="inline-block bg-brand-red text-brand-light font-bold py-3 px-8 rounded-md text-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
            >
              Agenda tu Cita
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;