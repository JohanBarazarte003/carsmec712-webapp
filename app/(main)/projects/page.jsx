// Archivo: app/(main)/projects/page.jsx

import Image from 'next/image';
import PaginationControls from '@/app/components/PaginationControls';

// Función para obtener los proyectos paginados desde nuestra API.
// Lee el parámetro 'page' de la URL para saber qué página de resultados pedir.
async function getPaginatedProjects(searchParams) {
  const page = searchParams['page'] ?? '1';
  
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/projects?page=${page}`;
    const res = await fetch(apiUrl, { 
      cache: 'no-store' // Aseguramos que siempre traemos los datos más frescos
    });

    if (!res.ok) {
      console.error("No se pudieron obtener los proyectos paginados. Estado:", res.status);
      return { projects: [], totalPages: 1, currentPage: 1 };
    }
    return res.json();
  } catch (error) {
    console.error("Error en fetch de getPaginatedProjects:", error);
    return { projects: [], totalPages: 1, currentPage: 1 };
  }
}

// Metadata para el SEO de esta página específica.
export const metadata = {
  title: 'Galería de Proyectos',
  description: 'Explora nuestros trabajos destacados, desde restauraciones completas hasta personalizaciones únicas. La calidad y pasión de CarsMec712 en cada detalle.',
};


// Este es el componente de la página, que es un Server Component asíncrono.
const ProjectsPage = async ({ searchParams }) => {
  // 1. Llama a la función para obtener los datos de la página actual.
  const { projects, totalPages, currentPage } = await getPaginatedProjects(searchParams);

  return (
    // Contenedor principal de la página con padding superior para dejar espacio al Header.
    <div className="bg-brand-dark min-h-screen pt-24 md:pt-32">
      <div className="container mx-auto px-4 pb-24">
        
        {/* Cabecera de la página */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-light pt-32">Galería de Proyectos</h1>
          <p className="text-lg text-gray-400 mt-2 max-w-2xl mx-auto">Nuestro trabajo es nuestra mejor carta de presentación. Cada proyecto es una muestra de nuestra dedicación y pericia técnica.</p>
        </div>
        
        {/* 2. Cuadrícula que mostrará los proyectos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects && projects.length > 0 ? (
            // Si hay proyectos, los recorremos y creamos una tarjeta para cada uno.
            projects.map(project => (
              <div key={project.id} className="relative rounded-lg overflow-hidden group h-80 shadow-lg border border-gray-800/50">
                <Image 
                  src={project.imageUrl} 
                  alt={project.title} 
                  layout="fill" 
                  objectFit="cover" 
                  className="transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
                {/* Capa de gradiente para mejorar la legibilidad del texto */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                {/* Contenido de texto sobre la imagen */}
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="text-2xl font-bold text-white shadow-black [text-shadow:_0_2px_4px_var(--tw-shadow-color)]">{project.title}</h3>
                  <p className="text-white/90 mt-1 text-sm [text-shadow:_0_1px_2px_var(--tw-shadow-color)]">{project.description}</p>
                </div>
              </div>
            ))
          ) : (
            // Si no hay proyectos, mostramos un mensaje amigable.
            <div className="col-span-full text-center text-gray-500 py-16">
              <p>No hay proyectos para mostrar en este momento. ¡Vuelve pronto!</p>
            </div>
          )}
        </div>
        
        {/* 3. Controles de Paginación */}
        {/* Solo se muestran si hay más de una página de resultados. */}
        {totalPages > 1 && (
          <PaginationControls 
            currentPage={currentPage} 
            totalPages={totalPages} 
            basePath="/projects" // Le decimos que la ruta base es /projects
          />
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;