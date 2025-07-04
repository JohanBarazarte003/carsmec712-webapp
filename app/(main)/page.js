import HeroSection from '@/app/components/HeroSection';
import ServicesSection from '@/app/components/ServicesSection';
import FeaturedProducts from '@/app/components/FeaturedProducts'; // Importamos el nuevo componente
import ProjectsSection from '@/app/components/ProjectsSection';
import ContactSection from '@/app/components/ContactSection';

async function getFeaturedProjects() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/projects?featured=true`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

async function getFeaturedProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products?featured=true`, { 
      cache: 'no-store' 
    });

    if (!res.ok) {
      console.error("Failed to fetch featured products, status:", res.status);
      return []; // Devuelve un array vacío en caso de error para no romper la página
    }
    return res.json();
  } catch (error) {
    console.error("Error en fetch de getFeaturedProducts:", error);
    return []; // Devuelve array vacío también en error de red
  }
}

async function getServices() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/services`, { 
      cache: 'no-store' 
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error en fetch de getServices:", error);
    return [];
  }
}


export default async function Home() {
  const [featuredProducts, services, featuredProjects] = await Promise.all([
  getFeaturedProducts(),
  getServices(),
  getFeaturedProjects() // Llama a la función correcta para obtener proyectos
]);

  return (
    <>
      <HeroSection />
      
      <FeaturedProducts products={featuredProducts} />
      <ServicesSection services={services} />
      <ProjectsSection projects={featuredProjects} />
      <ContactSection />
    </>
  );
}