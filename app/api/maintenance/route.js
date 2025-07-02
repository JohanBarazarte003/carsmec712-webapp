// Archivo: app/api/maintenance/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const data = await request.json();

    // Extraemos todos los campos que esperamos del formulario
    const { 
      vehicleId, 
      description, 
      mileage, 
      status,
      serviceItems, 
      partItems, 
      subtotal, 
      tax, 
      total 
    } = data;

    // Validación básica
    if (!vehicleId || !description || !status) {
      return NextResponse.json({ message: "Faltan datos esenciales (ID de vehículo, descripción o estado)." }, { status: 400 });
    }

    const newRecord = await prisma.maintenanceRecord.create({
      data: {
        vehicleId,
        description,
        mileage: mileage ? parseInt(mileage, 10) : null,
        status,
        // Los arrays de objetos se guardan directamente gracias al tipo `Json` en Prisma
        serviceItems: serviceItems || [],
        partItems: partItems || [],
        // Aseguramos que los totales sean números
        subtotal: parseFloat(subtotal) || 0,
        tax: parseFloat(tax) || 0,
        total: parseFloat(total) || 0,
      },
    });

    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    console.error("Error al crear el registro de mantenimiento:", error);
    return NextResponse.json({ message: "Error interno del servidor al crear el registro." }, { status: 500 });
  }
}