// Archivo: app/api/maintenance/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// --- GET: Obtener los detalles de un solo registro ---
export async function GET(request, { params }) {
  const { id } = params;
  try {
    const record = await prisma.maintenanceRecord.findUnique({
      where: { id },
      include: { // Incluimos datos relacionados para la factura/recibo
        vehicle: {
          include: {
            customer: true,
          },
        },
      },
    });
    if (!record) {
      return NextResponse.json({ message: "Registro no encontrado." }, { status: 404 });
    }
    return NextResponse.json(record);
  } catch (error) {
    console.error(`Error al obtener el registro ${id}:`, error);
    return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
  }
}

// --- PUT: Actualizar un registro existente ---
export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const data = await request.json();
    const updatedRecord = await prisma.maintenanceRecord.update({
      where: { id },
      data: {
        description: data.description,
        mileage: data.mileage ? parseInt(data.mileage, 10) : null,
        status: data.status,
        serviceItems: data.serviceItems,
        partItems: data.partItems,
        subtotal: parseFloat(data.subtotal) || 0,
        tax: parseFloat(data.tax) || 0,
        total: parseFloat(data.total) || 0,
      },
    });
    return NextResponse.json(updatedRecord);
  } catch (error) {
    console.error(`Error al actualizar el registro ${id}:`, error);
    return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
  }
}

// --- DELETE: Eliminar un registro ---
export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    await prisma.maintenanceRecord.delete({
      where: { id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error.code === 'P2025') {
        return NextResponse.json({ message: "Registro no encontrado para eliminar." }, { status: 404 });
    }
    console.error(`Error al eliminar el registro ${id}:`, error);
    return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
  }
}