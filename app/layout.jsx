// Archivo: app/layout.jsx

import './globals.css'; // Importa tus estilos globales

// Aquí puedes definir los metadatos base para todo el sitio
export const metadata = {
  title: {
    default: 'CarsMec712 - Taller Mecánico de Confianza',
    template: '%s | CarsMec712',
  },
  description: 'Especialistas en mecánica, diagnóstico y performance. Cuidamos tu coche como si fuera nuestro.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      {/* 
        El body no necesita clases aquí si cada layout anidado 
        maneja su propio fondo, o podemos poner un fondo base.
        Dejarlo sin clases es más flexible.
      */}
      <body>
        {children}
      </body>
    </html>
  );
}