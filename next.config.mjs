/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns sigue siendo necesario para la lista blanca
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ucarecdn.com',
        port: '',
        pathname: '/**',
      },
    ],
    // --- LÍNEA CLAVE AÑADIDA ---
    unoptimized: true,
  },
};

export default nextConfig;