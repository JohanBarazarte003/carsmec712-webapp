// Archivo: app/api/products/route.js

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// --- FUNCIÓN GET MEJORADA: Maneja destacados, filtros, búsqueda y paginación ---
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  // --- LÓGICA 1: PRODUCTOS DESTACADOS ---
  // Si la URL contiene "?featured=true", se ejecuta este bloque y la función termina.
  if (searchParams.get('featured') === 'true') {
    try {
      const featuredProducts = await prisma.product.findMany({
        take: 4, // Mantenemos la lógica de tomar solo 4 productos
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json(featuredProducts);
    } catch (error) {
      console.error("Error al obtener productos destacados:", error);
      return NextResponse.json({ message: "Error interno al obtener destacados." }, { status: 500 });
    }
  }

  // --- LÓGICA 2: TIENDA COMPLETA (con filtros, búsqueda y paginación) ---
  // Si no se pidieron los destacados, el código continúa aquí.

  // Leemos los parámetros de la URL para filtrar y buscar
  const category = searchParams.get('category');
  const searchQuery = searchParams.get('q');
  
  // Leemos los parámetros de paginación
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = 9; // 9 productos por página para la tienda
  const skip = (page - 1) * limit;

  // Construimos el objeto de condiciones para la consulta a la base de datos
  const where = {};

  if (category) {
    where.category = {
      equals: category,
      mode: 'insensitive', // 'Llantas' y 'llantas' serán tratados como iguales
    };
  }

  if (searchQuery) {
    // Buscamos el texto en el título O en la descripción
    where.OR = [
      { title: { contains: searchQuery, mode: 'insensitive' } },
      { description: { contains: searchQuery, mode: 'insensitive' } },
    ];
  }

  try {
    // Hacemos dos consultas a la vez para ser más eficientes
    const [products, totalProducts] = await prisma.$transaction([
      // 1. Obtiene los productos que coinciden con los filtros y la paginación
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      // 2. Cuenta el total de productos que coinciden con los filtros (para la paginación)
      prisma.product.count({ where }),
    ]);

    const totalPages = Math.max(1, Math.ceil(totalProducts / limit));

    // Devolvemos un objeto con los productos y la información de la paginación
    return NextResponse.json({
      products,
      currentPage: page,
      totalPages,
      totalProducts,
    });

  } catch (error) {
    console.error("Error en paginación/filtro de productos:", error);
    return NextResponse.json({ message: "Error interno al obtener productos." }, { status: 500 });
  }
}

// --- FUNCIÓN POST (sin cambios) ---
export async function POST(request) {
  try {
    const data = await request.json();
    const { title, description, imageUrl, price, category, brand } = data;

    if (!title || !description || !imageUrl || !price || !category) {
      return NextResponse.json({ message: "Todos los campos son requeridos." }, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        imageUrl,
        price: parseFloat(price),
        category,
        brand,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error al crear el producto:", error);
    return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
  }
}