// Archivo: app/(admin)/maintenance/detail/[id]/layout.jsx

// Este layout es súper simple. Solo renderiza a sus hijos
// sin añadir la sidebar del admin.
export default function MaintenanceDetailLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}