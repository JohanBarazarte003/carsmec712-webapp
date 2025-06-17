// Archivo: app/components/ServicesSection.jsx
'use client';

import { motion } from 'framer-motion';
// Importa todos los iconos que podrías necesitar
import { Wrench, BrainCircuit, Car, Droplet, Settings, ShieldCheck, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

// Objeto para mapear nombres de icono (String) a componentes de React
const iconComponents = {
  Wrench,
  BrainCircuit,
  Car,
  Droplet, // Asegúrate de que este nombre coincida con lo que pones en la BD
  Settings,
  ShieldCheck,
};

const ServicesSection = ({ services }) => { // El componente recibe los servicios como props
  const whatsappUrlBase = `https://api.whatsapp.com/send?phone=584140311364&text=`;

  return (
    <section id="servicios" className="py-20 bg-brand-dark">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          className="text-4xl font-bold text-brand-light mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          Nuestros Servicios
        </motion.h2>
        {/* Este motion.div estaba vacío, lo he completado */}
        <motion.div 
          className="h-1 w-20 bg-brand-red mx-auto mb-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        ></motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services && services.length > 0 ? (
            services.map((service, index) => {
              // Busca el componente de icono. Si no lo encuentra, usa HelpCircle por defecto.
              const IconComponent = iconComponents[service.iconName] || HelpCircle;
              
              const whatsappMessage = `¡Hola!%20Estoy%20interesado%20en%20el%20servicio%20de%20'${encodeURIComponent(service.title)}'.%20¿Podrían%20darme%20más%20información?`;
              const finalWhatsappUrl = `${whatsappUrlBase}${whatsappMessage}`;
  
              return (
                <motion.div
                  key={service.id}
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
                      <div className="mb-4"><IconComponent size={40} className="text-brand-red" /></div>
                      <h3 className="text-2xl font-bold text-brand-light mb-3">{service.title}</h3>
                      <p className="text-gray-400 mb-6">{service.description}</p>
                    </div>
  
                    <Link href={finalWhatsappUrl} target="_blank" rel="noopener noreferrer"
                      className="mt-auto bg-brand-red/90 text-brand-light font-semibold py-2 px-4 rounded-md text-sm flex items-center justify-center space-x-2 hover:bg-brand-red transition-colors duration-300"
                    >
                      <FaWhatsapp size={18} />
                      <span>Agendar Cita</span>
                    </Link>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400">Actualmente no hay servicios para mostrar.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;