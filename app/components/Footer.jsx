import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black py-8">
      <div className="container mx-auto px-4 text-center text-gray-500">
        <div className="flex justify-center mb-4">
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo CarsMec712" width={80} height={80} />
          </Link>
        </div>
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://www.instagram.com/carsmec712/?hl=es" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors"><FaInstagram size={28} /></a>
          <a href="https://www.tiktok.com/@carsmec712" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors"><FaTiktok size={28} /></a>
        </div>
        <p>© {new Date().getFullYear()} CarsMec712. Todos los derechos reservados.</p>
        
      </div>
    </footer>
  );
};

export default Footer;