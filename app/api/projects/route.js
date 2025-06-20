// Archivo: app/api/projects/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET para obtener todos los proyectos
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get('featured');

  // --- LÓGICA PARA DESTACADOS ---
  if (featured === 'true') {
    try {
      const featuredProjects = await prisma.project.findMany({
        take: 6, // Mostramos hasta 6 proyectos destacados
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json(featuredProjects);
    } catch (error) { /* ... manejo de error ... */ }
  }

  // --- LÓGICA PARA PAGINACIÓN (para la página /projects) ---
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = 9; // 9 por página, bueno para una cuadrícula 3x3
  const skip = (page - 1) * limit;

  try {
    const [projects, totalProjects] = await prisma.$transaction([
      prisma.project.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }),
      prisma.project.count(),
    ]);
    const totalPages = Math.max(1, Math.ceil(totalProjects / limit));
    return NextResponse.json({ projects, currentPage: page, totalPages });
  } catch (error) { /* ... manejo de error ... */ }
}

// POST para crear un nuevo proyecto
export async function POST(request) {
  try {
    const data = await request.json();
    const { title, description, imageUrl } = data;

    if (!title || !description || !imageUrl) {
      return NextResponse.json({ message: "Todos los campos son requeridos." }, { status: 400 });
    }

    const newProject = await prisma.project.create({ 
      data: { title, description, imageUrl } 
    });
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error al crear proyecto:", error); // Revisa la terminal del servidor de Next.js
    return NextResponse.json({ message: "Error interno del servidor al crear el proyecto." }, { status: 500 });
  }
}