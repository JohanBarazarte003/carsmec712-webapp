// Archivo: app/api/customers/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// --- GET: Para obtener todos los clientes ---
export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: { name: 'asc' }, // Ordenamos alfabéticamente por nombre
      include: {
        _count: { // Incluimos un conteo de cuántos vehículos tiene cada cliente
          select: { vehicles: true },
        },
      },
    });
    return NextResponse.json(customers);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
  }
}

// --- POST: Para crear un nuevo cliente ---
export async function POST(request) {
  try {
    const data = await request.json();
    const { name, phone, email } = data;

    if (!name || !phone) {
      return NextResponse.json({ message: "El nombre y el teléfono son requeridos." }, { status: 400 });
    }

    const newCustomer = await prisma.customer.create({
      data: {
        name,
        phone,
        email,
      },
    });

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    if (error.code === 'P2002') { // Error de campo único duplicado
      return NextResponse.json({ message: `Ya existe un cliente con ese ${error.meta.target.includes('phone') ? 'teléfono' : 'email'}.` }, { status: 409 });
    }
    console.error("Error al crear el cliente:", error);
    return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
  }
}