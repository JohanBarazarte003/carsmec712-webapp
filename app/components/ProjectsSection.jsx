'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const projects = [
  {
    image: '/images/frenos.jpg', // Reemplaza con tus imágenes
    title: "Toyota Fortuner",
    description: "Cambio de frenos"
  },
  {
    image: '/images/cambio.jpg', // Reemplaza con tus imágenes
    title: "Nissan Patrol",
    description: "Cambio de Aceite y Filtro"
  },
  {
    image: '/images/cher.jpg', // Reemplaza con tus imágenes
    title: "Grand Cherokee",
    description: "Cambio de Frenos"
  },
  // {
  //   image: '/images/proyecto-lancer.jpg', // Añade más si quieres
  //   title: "Mitsubishi Lancer",
  //   description: "Sistema de escape y reprogramación"
  // },
];

const ProjectsSection = () => {
  return (
    <section id="proyectos" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          className="text-4xl font-bold text-brand-light mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          Nuestro Arte
        </motion.h2>
        <motion.div 
          className="h-1 w-20 bg-brand-red mx-auto mb-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        ></motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="relative rounded-lg overflow-hidden group h-80"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Image 
                src={project.image}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                className="transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-brand-light">{project.title}</h3>
                <p className="text-brand-light/80">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;