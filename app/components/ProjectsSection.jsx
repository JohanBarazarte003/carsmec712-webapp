// Archivo: app/components/ProjectsSection.jsx
import Image from 'next/image';
import Link from 'next/link';

const ProjectsSection = ({ projects }) => {
  return (
    <section id="proyectos" className="py-20 bg-brand-dark">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-brand-light mb-2">Nuestro Arte</h2>
        <div className="h-1 w-20 bg-brand-red mx-auto mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="relative rounded-lg overflow-hidden group h-80">
                <Image 
                  src={project.imageUrl}
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
              </div>
            ))
          ) : (
            <p className="col-span-full text-gray-500">Próximamente mostraremos nuestros mejores proyectos.</p>
          )}
        </div>
        
        <div className="mt-16">
          <Link href="/projects" className="bg-brand-red text-white font-bold py-3 px-6 rounded-md text-lg hover:bg-red-700 transition-all duration-300">
            Ver Galería Completa
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;