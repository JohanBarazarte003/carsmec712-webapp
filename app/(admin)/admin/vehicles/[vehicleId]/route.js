// app/api/vehicles/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: {
        customer: true, // Incluimos los datos del dueño
        maintenanceRecords: { // Incluimos el historial
          orderBy: { date: 'desc' }, // El más reciente primero
        },
      },
    });
    if (!vehicle) return NextResponse.json({ message: "Vehículo no encontrado." }, { status: 404 });
    return NextResponse.json(vehicle);
  } catch (error) { /* ... */ }
}