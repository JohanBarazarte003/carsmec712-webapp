import HeroSection from '@/app/components/HeroSection';
import ServicesSection from '@/app/components/ServicesSection';
import FeaturedProducts from '@/app/components/FeaturedProducts'; // Importamos el nuevo componente
import ProjectsSection from '@/app/components/ProjectsSection';
import ContactSection from '@/app/components/ContactSection';


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


export default async function Home() {
   const featuredProducts = await getFeaturedProducts();
  

  return (
    <>
      <HeroSection />
      
      <FeaturedProducts products={featuredProducts} />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}