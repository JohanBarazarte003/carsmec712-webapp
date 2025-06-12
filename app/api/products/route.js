

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get('featured');

  // --- LÓGICA PARA PRODUCTOS DESTACADOS ---
  if (featured === 'true') {
    try {
      const featuredProducts = await prisma.product.findMany({
        take: 4, // Tomamos un máximo de 4 productos
        orderBy: {
          createdAt: 'desc', // Los más nuevos primero
        },
      });
      return NextResponse.json(featuredProducts);
    } catch (error) {
      console.error("Error al obtener productos destacados:", error);
      return NextResponse.json(
        { message: "Error interno al obtener destacados." },
        { status: 500 }
      );
    }
  }
  
  // --- LÓGICA DE PAGINACIÓN (si no se piden los destacados) ---
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '8', 10);
  const skip = (page - 1) * limit;

  try {
    const [products, totalProducts] = await prisma.$transaction([
      prisma.product.findMany({
        skip: skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.product.count(),
    ]);

    const totalPages = Math.max(1, Math.ceil(totalProducts / limit));

    return NextResponse.json({
      products,
      currentPage: page,
      totalPages,
      totalProducts,
    });
  } catch (error) {
    console.error("Error en paginación de productos:", error);
    return NextResponse.json(
      { message: "Error interno al paginar productos." },
      { status: 500 }
    );
  }
}
export async function POST(request) {
  try {
    const data = await request.json();
    const { title, description, imageUrl, price, category } = data;

    if (!title || !description || !imageUrl || !price || !category) {
      return NextResponse.json(
        { message: "Todos los campos son requeridos." },
        { status: 400 }
      );
    }

    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        imageUrl,
        price: parseFloat(price),
        category,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error al crear el producto:", error);
    return NextResponse.json(
      { message: "Error interno del servidor al crear el producto." }, // Mensaje más específico
      { status: 500 }
    );
  }
}