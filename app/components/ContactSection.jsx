'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contacto" className="py-20 bg-brand-dark ">
      <div className="container mx-auto px-4">
         <motion.h2 
          className="text-4xl font-bold text-brand-light mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          Nuestro Taller
        </motion.h2>
        <motion.div 
          className="h-1 w-20 bg-brand-red  mb-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        ></motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Columna de Información */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6 text-brand-light">
              <div className="flex items-start space-x-4">
                <MapPin className="text-brand-red mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-lg">Dirección</h3>
                  <p className="text-gray-400">Av. circunvalación el Sol, Centro comercial el Sol, estacionamiento nivel 3, el cafetal, Baruta, Caracas</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="text-brand-red mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-lg">Teléfono / WhatsApp</h3>
                  <a href="https://api.whatsapp.com/send?phone=584140311364" className="text-gray-400 hover:text-brand-red transition-colors">+58 414-0311364</a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="text-brand-red mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-lg">Email</h3>
                  <a href="mailto:carsmec712@gmail.com" className="text-gray-400 hover:text-brand-red transition-colors">carsmec712@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Clock className="text-brand-red mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-lg">Horario</h3>
                  <p className="text-gray-400">Lunes a Viernes: 8:30 a 19:00</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Columna del Mapa */}
          <motion.div 
            className="h-96 w-full rounded-lg overflow-hidden border-2 border-gray-800"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.4637259903147!2d-66.83381570000002!3d10.4640621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2a59a11335a14b%3A0x916f88175f0ce807!2scarsmec712!5e0!3m2!1ses!2sve!4v1749429213310!5m2!1ses!2sve"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className=""
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;