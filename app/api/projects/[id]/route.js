// Archivo: app/api/projects/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET para obtener un solo proyecto
export async function GET(request, { params }) {
  const { id } = params;
  try {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return NextResponse.json({ message: "Proyecto no encontrado." }, { status: 404 });
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
  }
}

// PUT para actualizar un proyecto
export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const data = await request.json();
    // No actualizamos la imagen aquí, solo texto
    const { title, description } = data; 
    const updatedProject = await prisma.project.update({
      where: { id },
      data: { title, description },
    });
    return NextResponse.json(updatedProject);
  } catch (error) { /* ... manejo de errores ... */ }
}

// DELETE para eliminar un proyecto
export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    await prisma.project.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) { /* ... manejo de errores ... */ }
}