// Archivo: app/api/services/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// --- GET para obtener un solo servicio ---
export async function GET(request, { params }) {
  const id = params.id;
  try {
    const service = await prisma.service.findUnique({
      where: { id },
    });
    if (!service) {
      return NextResponse.json({ message: "Servicio no encontrado." }, { status: 404 });
    }
    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
  }
}

// --- PUT para actualizar un servicio ---
export async function PUT(request, { params }) {
  const id = params.id;
  try {
    const data = await request.json();
    const { title, description, iconName } = data;

    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        title,
        description,
        iconName,
      },
    });
    return NextResponse.json(updatedService);
  } catch (error) {
    if (error.code === 'P2002') {
      return NextResponse.json({ message: "Ya existe un servicio con este título." }, { status: 409 });
    }
    return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
  }
}

// --- DELETE para eliminar un servicio ---
export async function DELETE(request, { params }) {
    const id = params.id;
    try {
        await prisma.service.delete({
            where: { id },
        });
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        if (error.code === 'P2025') {
            return NextResponse.json({ message: "Servicio no encontrado." }, { status: 404 });
        }
        return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
    }
}