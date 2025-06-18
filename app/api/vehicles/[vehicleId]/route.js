// Archivo: app/api/vehicles/[vehicleId]/route.js

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// --- FUNCIÓN GET: Para obtener los detalles de UN solo vehículo ---
export async function GET(request, { params }) {
  const {vehicleId}  = params; // Extraemos el ID del vehículo de los parámetros de la URL

  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { 
        id: vehicleId 
      },
      // Incluimos datos relacionados que son útiles
      include: {
        customer: true, // Para saber quién es el dueño
        maintenanceRecords: { // Para obtener todo su historial
          orderBy: { 
            date: 'desc' // Ordenamos el historial del más reciente al más antiguo
          },
        },
      },
    });

    // Si no se encuentra un vehículo con ese ID, devolvemos un error 404
    if (!vehicle) {
      return NextResponse.json({ message: "Vehículo no encontrado." }, { status: 404 });
    }
    
    // Si se encuentra, lo devolvemos con un estado 200 (OK)
    return NextResponse.json(vehicle);

  } catch (error) {
    // Si ocurre cualquier otro error (ej: problema de conexión a la BD)
     console.error("Error al obtener detalle del vehículo:", error);
    return NextResponse.json(
      { message: "Error interno del servidor al buscar el vehículo." }, 
      { status: 500 }
    );
  }
}

// --- FUNCIÓN PUT: Para actualizar un vehículo existente ---
// (Aún no hemos construido el formulario de edición, pero la API ya está lista)
export async function PUT(request, { params }) {
  const { vehicleId } = params;
  try {
    const data = await request.json();
    const { plate, brand, model, year, vin } = data;

    const updatedVehicle = await prisma.vehicle.update({
      where: { id: vehicleId },
      data: {
        plate: plate.toUpperCase(),
        brand,
        model,
        year: parseInt(year, 10),
        vin,
      },
    });
    return NextResponse.json(updatedVehicle);
  } catch (error) { /* ... manejo de errores ... */ }
}

// --- FUNCIÓN DELETE: Para eliminar un vehículo ---
export async function DELETE(request, { params }) {
  const { vehicleId } = params;

  try {
    await prisma.vehicle.delete({
      where: { id: vehicleId },
    });

    // Éxito, devolvemos una respuesta vacía con estado 204 (No Content)
    return new NextResponse(null, { status: 204 });

  } catch (error) {
    console.error("Error al eliminar el vehículo:", error);
    // Si el vehículo a eliminar no existe
    if (error.code === 'P2025') {
      return NextResponse.json({ message: "Vehículo no encontrado." }, { status: 404 });
    }
    return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
  }
}