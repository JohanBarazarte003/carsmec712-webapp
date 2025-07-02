// Archivo: app/api/projects/route.js

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get('featured');
  const page = searchParams.get('page');

  try {
    // --- LÓGICA 1: Si se piden los destacados ---
    if (featured === 'true') {
      const featuredProjects = await prisma.project.findMany({
        take: 6,
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json(featuredProjects);
    }

    // --- LÓGICA 2: Si se pide una página específica (para la galería pública) ---
    if (page) {
      const pageNum = parseInt(page, 10);
      const limit = 9;
      const skip = (pageNum - 1) * limit;

      const [projects, totalProjects] = await prisma.$transaction([
        prisma.project.findMany({ where: {}, skip, take: limit, orderBy: { createdAt: 'desc' } }),
        prisma.project.count({ where: {} }),
      ]);
      
      const totalPages = Math.max(1, Math.ceil(totalProjects / limit));
      return NextResponse.json({ projects, currentPage: pageNum, totalPages });
    }

    // --- LÓGICA 3: Por defecto, si no hay parámetros (para el dashboard) ---
    const allProjects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(allProjects);

  } catch (error) {
    // Si cualquiera de las consultas de Prisma falla, este bloque se ejecutará
    console.error("ERROR EN LA API DE PROYECTOS:", error);
    return NextResponse.json(
      { message: "Error interno del servidor al procesar la solicitud de proyectos." },
      { status: 500 }
    );
  }
}

// La función POST no necesita cambios, pero asegúrate de que esté aquí
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
    console.error("Error al crear proyecto:", error);
    return NextResponse.json({ message: "Error interno del servidor al crear el proyecto." }, { status: 500 });
  }
}