// Archivo: app/api/projects/[projectId]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PUT para actualizar un proyecto
export async function PUT(request, { params }) {
  const { projectId } = params;
  const data = await request.json();
  const updatedProject = await prisma.project.update({
    where: { id: projectId },
    data: { title: data.title, description: data.description },
  });
  return NextResponse.json(updatedProject);
}

// DELETE para eliminar un proyecto
export async function DELETE(request, { params }) {
  const { projectId } = params;
  await prisma.project.delete({ where: { id: projectId } });
  return new NextResponse(null, { status: 204 });
}

// GET para un solo proyecto
export async function GET(request, { params }) {
  const { projectId } = params;
  const project = await prisma.project.findUnique({ where: { id: projectId } });
  return NextResponse.json(project);
}