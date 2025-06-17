// Archivo: app/api/services/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// --- FUNCIÓN GET: Para obtener todos los servicios ---
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: {
        createdAt: 'asc', // Ordenamos por fecha de creación, del más viejo al más nuevo
      },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error("Error al obtener servicios:", error);
    return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
  }
}

// --- FUNCIÓN POST: Para crear un nuevo servicio ---
export async function POST(request) {
  try {
    const data = await request.json();
    const { title, description, iconName } = data;

    if (!title || !description || !iconName) {
      return NextResponse.json({ message: "Título, descripción e icono son requeridos." }, { status: 400 });
    }

    const newService = await prisma.service.create({
      data: {
        title,
        description,
        iconName,
      },
    });

    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error("Error al crear el servicio:", error);
    // Manejo de error para título duplicado
    if (error.code === 'P2002') {
      return NextResponse.json({ message: "Ya existe un servicio con este título." }, { status: 409 });
    }
    return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
  }
}