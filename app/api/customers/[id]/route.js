// app/api/customers/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request, { params }) {
  const {id} = params;
  try {
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        vehicles: true, // ¡Incluimos los vehículos relacionados!
      },
    });
    if (!customer) {
      return NextResponse.json({ message: "Cliente no encontrado." }, { status: 404 });
    }
    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { customerId } = params;

  try {
    const data = await request.json();
    const { name, phone, email } = data;

    if (!name || !phone) {
      return NextResponse.json({ message: "Nombre y teléfono son requeridos." }, { status: 400 });
    }

    const updatedCustomer = await prisma.customer.update({
      where: { id: customerId },
      data: {
        name,
        phone,
        email,
      },
    });

    return NextResponse.json(updatedCustomer);
  } catch (error) {
    if (error.code === 'P2002') { // Error de campo único duplicado
      return NextResponse.json({ message: `Ya existe un cliente con ese ${error.meta.target.includes('phone') ? 'teléfono' : 'email'}.` }, { status: 409 });
    }
    console.error("Error al actualizar el cliente:", error);
    return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
  }
}
