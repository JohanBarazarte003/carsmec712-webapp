// Archivo: app/api/products/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// --- FUNCIÓN GET (para obtener un solo producto) ---
export async function GET(request, { params }) {
  const id = params.id;
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      return NextResponse.json({ message: "Producto no encontrado." }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
  }
}

// --- FUNCIÓN PUT (para actualizar un producto) ---
export async function PUT(request, { params }) {
  const id = params.id;
  try {
    const data = await request.json();
    const { title, description, price, category } = data; // La imageUrl no la actualizamos aquí por simplicidad

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        title,
        description,
        price: parseFloat(price),
        category,
      },
    });
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
  }
}

// --- FUNCIÓN DELETE: Para eliminar un producto por su ID ---
export async function DELETE(request, { params }) {
  // El ID del producto viene de la URL (ej: /api/products/clwse123)
  const id = params.id;

  try {
    // Le decimos a Prisma que borre el producto con ese ID
    await prisma.product.delete({
      where: { id },
    });

    // Devolvemos una respuesta vacía con estado 204 (No Content), que significa éxito.
    return new NextResponse(null, { status: 204 });

  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    // Si el producto no se encuentra, Prisma lanza un error específico
    if (error.code === 'P2025') {
      return NextResponse.json({ message: "Producto no encontrado." }, { status: 404 });
    }
    return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
  }
}

// Aquí también podríamos poner las funciones PUT (para editar) y GET (para obtener un solo producto)