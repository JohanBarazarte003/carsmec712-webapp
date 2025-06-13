'use client';

import { motion } from 'framer-motion';
// Iconos corregidos - Oil fue reemplazado por Droplet, y añadimos FaWhatsapp
import { Wrench, BrainCircuit, Car, Amphora, Settings, ShieldCheck, SprayCan, CarFront} from 'lucide-react';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa'; // Importamos el icono de WhatsApp de otra librería popular

// Primero, instala react-icons:
// npm install react-icons

const services = [
  {
    icon: <BrainCircuit size={40} className="text-brand-red" />,
    title: "Diagnóstico Computarizado",
    description: "Detectamos con precisión cualquier fallo electrónico usando tecnología de punta."
  },
  {
    icon: <Wrench size={40} className="text-brand-red" />,
    title: "Reparación de Motor",
    description: "Desde afinaciones hasta reparaciones complejas para devolver la potencia a tu vehículo."
  },
  {
    icon: <ShieldCheck size={40} className="text-brand-red" />,
    title: "Servicio de Frenos",
    description: "Revisión y sustitución de pastillas, discos y líquidos. Tu seguridad es lo primero."
  },
  {
    icon: <Settings size={40} className="text-brand-red" />,
    title: "Reparación de Transmisiones",
    description: "Especialistas en la reparación y mantenimiento de cajas automáticas y DSG."
  },
  {
    icon: <Car size={40} className="text-brand-red" />,
    title: "Alineación y Balanceo",
    description: "Manejo suave, seguro y prevenimos el desgaste irregular de tus llantas."
  },
  {
    icon: <Amphora size={40} className="text-brand-red" />, // Icono corregido para 'Cambio de Aceite'
    title: "Cambio de Aceite",
    description: "El mantenimiento esencial con los mejores lubricantes para proteger la vida de tu motor."
  },
  {
    icon: <SprayCan  size={40} className="text-brand-red" />, // Icono corregido para 'Cambio de Aceite'
    title: "Pintura",
    description: "Renovamos la apariencia de su vehículo con pintura de alta calidad."

  },
  {
    icon: < CarFront size={40} className="text-brand-red" />, // Icono corregido para 'Cambio de Aceite'
    title: "Detailing",
    description : "Detailing experto, por dentro y fuera, que restaura, protege y deja su vehículo como nuevo."
  },

  
];

const ServicesSection = () => {
  const whatsappUrlBase = `https://api.whatsapp.com/send?phone=584140311364&text=`;

  return (
    <section id="servicios" className="py-20 bg-brand-dark">
      <div className="container mx-auto px-4 text-center">
        {/* ... (código del título y la línea roja, sin cambios) ... */}
         <motion.h2 
          className="text-4xl font-bold text-brand-light mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          Nuestros Servicios
        </motion.h2>
        <motion.div /* ... */></motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            // Creamos un mensaje personalizado para cada servicio
            const whatsappMessage = `¡Hola!%20Estoy%20interesado%20en%20el%20servicio%20de%20'${encodeURIComponent(service.title)}'.%20¿Podrían%20darme%20más%20información?`;
            const finalWhatsappUrl = `${whatsappUrlBase}${whatsappMessage}`;

            return (
              <motion.div
  key={index}
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
  className="relative rounded-lg group"
>
  {/* El Borde Animado */}
  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-slate-500 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-1000 animate-spin-slow"></div>
  
  {/* Contenido de la Tarjeta */}
  <div className="relative bg-gray-900 h-full rounded-lg p-8 flex flex-col justify-between">
    <div>
      <div className="mb-4">{service.icon}</div>
      <h3 className="text-2xl font-bold text-brand-light mb-3">{service.title}</h3>
      <p className="text-gray-400 mb-6">{service.description}</p>
    </div>

    {/* Botón (asegúrate de que tenga la URL correcta) */}
    <Link href={finalWhatsappUrl} target="_blank" rel="noopener noreferrer"
      className="mt-auto bg-brand-red/90 text-brand-light font-semibold py-2 px-4 rounded-md text-sm flex items-center justify-center space-x-2 hover:bg-brand-red transition-colors duration-300"
    >
      <FaWhatsapp size={18} />
      <span>Agendar Cita</span>
    </Link>
  </div>
</motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
