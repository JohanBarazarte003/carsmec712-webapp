// Archivo: app/api/maintenance/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const record = await prisma.maintenanceRecord.findUnique({
      where: { id },
      include: {
        vehicle: { // Incluimos el vehículo...
          include: {
            customer: true, // ...y el dueño del vehículo.
          }
        }
      }
    });

    if (!record) {
      return NextResponse.json({ message: "Registro no encontrado." }, { status: 404 });
    }
    
    return NextResponse.json(record);
  } catch (error) {
    console.error("Error al obtener el registro:", error);
    return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;

  try {
    const data = await request.json();
    // Extraemos todos los campos que pueden ser actualizados
    const { description, mileage, status, serviceItems, partItems, subtotal, tax, total } = data;

    const updatedRecord = await prisma.maintenanceRecord.update({
      where: { id },
      data: {
        description,
        mileage: mileage ? parseInt(mileage) : null,
        status,
        serviceItems, // Prisma actualiza el campo JSON completo
        partItems,
        subtotal,
        tax,
        total,
      },
    });

    return NextResponse.json(updatedRecord);
  } catch (error) {
    console.error("Error al actualizar el registro:", error);
    return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
  }
}

// --- DELETE (la podemos añadir ahora también) ---
export async function DELETE(request, { params }) {
    const { id } = params;
    try {
        await prisma.maintenanceRecord.delete({
            where: { id },
        });
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        if (error.code === 'P2025') {
            return NextResponse.json({ message: "Registro no encontrado." }, { status: 404 });
        }
        return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
    }
}