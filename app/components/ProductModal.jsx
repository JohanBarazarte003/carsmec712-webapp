'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { X } from 'lucide-react';

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  const whatsappUrl = `https://api.whatsapp.com/send?phone=584140311364&text=¡Hola!%20Estoy%20interesado%20en%20el%20producto%20'${encodeURIComponent(product.title)}'.%20Precio%20listado:%20$${product.price}.%20¿Me%20pueden%20dar%20más%20información?`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90] flex items-center justify-center p-4"
        onClick={onClose} // Cierra el modal al hacer clic en el fondo
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="relative bg-gray-900 border border-gray-800 rounded-lg w-full max-w-2xl text-left overflow-hidden"
          onClick={(e) => e.stopPropagation()} // Evita que el clic en el contenido cierre el modal
        >
          {/* Botón de Cerrar */}
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors z-10">
            <X size={24} />
          </button>
          
          <div className="relative w-full h-64">
            <Image src={product.imageUrl} alt={product.title} layout="fill" objectFit="cover" />
          </div>

          <div className="p-8">
            <span className="bg-brand-red/20 text-brand-red text-xs font-bold py-1 px-3 rounded-full uppercase">{product.category}</span>
            <h2 className="text-3xl font-bold text-brand-light mt-4">{product.title}</h2>
            <p className="text-gray-400 mt-4">{product.description}</p>
            <p className="text-4xl font-bold text-brand-red mt-6">${product.price.toFixed(2)}</p>

            <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="mt-8 w-full bg-brand-red text-brand-light font-bold py-3 px-8 rounded-md text-lg flex items-center justify-center space-x-3 hover:bg-red-700 transition-all duration-300"
            >
              <FaWhatsapp size={22} />
              <span>Consultar por WhatsApp</span>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;