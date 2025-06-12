/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#121212',      // Nuestro negro de fondo
        'brand-light': '#ffffff',     // Un blanco roto para textos
        'brand-red': '#cb0006',       // Nuestro rojo de acento
      },

      
       animation: { // <-- AÑADE ESTA SECCIÓN
        'spin-slow': 'spin 4s linear ',
      },
      keyframes: { // <-- Y ESTA OTRA
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },

      
    },
  },
  plugins: [],
}