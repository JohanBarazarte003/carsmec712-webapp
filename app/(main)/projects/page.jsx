// Archivo: app/(main)/projects/page.jsx
import Image from 'next/image';
import PaginationControls from '@/app/components/PaginationControls';

// La función ahora recibe 'page' como un string.
async function getPaginatedProjects(page) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/projects?page=${page}`);
    if (!res.ok) {
      console.error("Failed to fetch paginated projects");
      return { projects: [], totalPages: 1, currentPage: 1 };
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { projects: [], totalPages: 1, currentPage: 1 };
  }
}

const ProjectsPage = async ({ searchParams }) => {
  // 1. Extraemos el parámetro 'page' aquí.
  const page = searchParams['page'] ?? '1';
  
  // 2. Pasamos 'page' a la función y desestructuramos la respuesta.
  const { projects, totalPages, currentPage } = await getPaginatedProjects(page);

  return (
    <div className="bg-brand-dark min-h-screen pt-24">
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-5xl font-bold text-center text-brand-light mb-12">Galería de Proyectos</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Ahora 'projects' es un array garantizado y no dará error */}
          {projects && projects.length > 0 ? (
            projects.map(project => (
              <div key={project.id} className="relative rounded-lg overflow-hidden group h-80">
                <Image 
                  src={project.imageUrl} 
                  alt={project.title} 
                  layout="fill" 
                  objectFit="cover" 
                  className="transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    <p className="text-white/80">{project.description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-16">No hay proyectos para mostrar en este momento.</p>
          )}
        </div>
        
        {totalPages > 1 && (
          <PaginationControls currentPage={currentPage} totalPages={totalPages} basePath="/projects" />
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;