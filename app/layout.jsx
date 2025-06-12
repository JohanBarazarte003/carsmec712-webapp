// app/layout.jsx (El nuevo layout raíz)

// Importa los estilos globales si los tienes en un archivo separado


export const metadata = {
  title: 'CarsMec712',
  description: 'La app para tu taller mecánico.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
     <body >{children}</body>
    </html>
  );
}