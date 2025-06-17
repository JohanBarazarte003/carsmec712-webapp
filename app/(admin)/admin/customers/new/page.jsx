import CustomerForm from '@/app/components/CustomerForm';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

const NewCustomerPage = () => (
  <div className="min-h-screen text-brand-light p-8">
    <div className="max-w-2xl mx-auto">
      <Link href="/admin/customers" className="...">Volver al Listado</Link>
      <h1 className="text-3xl font-bold mb-8">Añadir Nuevo Cliente</h1>
      <CustomerForm />
    </div>
  </div>
);
export default NewCustomerPage;