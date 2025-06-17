// Archivo: app/api/vehicles/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// --- POST: Para crear un nuevo vehículo ---
export async function POST(request) {
  try {
    const data = await request.json();
    const { plate, brand, model, year, vin, customerId } = data;

    // Validación de datos
    if (!plate || !brand || !model || !year || !customerId) {
      return NextResponse.json({ message: "Matrícula, marca, modelo, año y el ID del cliente son requeridos." }, { status: 400 });
    }

    const newVehicle = await prisma.vehicle.create({
      data: {
        plate: plate.toUpperCase(), // Guardamos la matrícula en mayúsculas por consistencia
        brand,
        model,
        year: parseInt(year, 10), // Aseguramos que el año sea un número
        vin: vin || null, // Guardamos null si el VIN está vacío
        customerId, // ¡Aquí asociamos el vehículo al cliente!
      },
    });

    return NextResponse.json(newVehicle, { status: 201 });
  } catch (error) {
    if (error.code === 'P2002' && error.meta.target.includes('plate')) {
      return NextResponse.json({ message: "Ya existe un vehículo con esta matrícula." }, { status: 409 });
    }
    console.error("Error al crear el vehículo:", error);
    return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
  }
}