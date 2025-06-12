// app/(admin)/layout.jsx
import '../globals.css';
// Simplemente devolvemos los children, envueltos en un div si queremos un fondo
export default function AdminLayout({ children }) {
  return (
    <div className="bg-gray-900 min-h-screen">
      {children}
    </div>
  );
}