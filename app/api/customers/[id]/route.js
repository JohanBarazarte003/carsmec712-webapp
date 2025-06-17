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