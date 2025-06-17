// app/api/maintenance/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const data = await request.json();
    const { vehicleId, description, mileage, serviceItems, partItems, subtotal, tax, total, status } = data;

    if (!vehicleId || !description || !serviceItems || !partItems) {
      return NextResponse.json({ message: "Faltan datos requeridos." }, { status: 400 });
    }

    const newRecord = await prisma.maintenanceRecord.create({
      data: {
        vehicleId,
        description,
        mileage: mileage ? parseInt(mileage) : null,
        serviceItems, // Se guarda directamente el JSON
        partItems,    // Se guarda directamente el JSON
        subtotal,
        tax,
        total,
        status,
      },
    });
    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    console.error("Error al crear registro:", error);
    return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
  }
}