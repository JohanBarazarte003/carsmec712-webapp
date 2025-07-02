import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const categories = await prisma.product.findMany({
      select: { category: true },
      distinct: ['category'],
    });
    // Extraemos solo los nombres de categoría en un array simple
    const categoryNames = categories.map(c => c.category);
    return NextResponse.json(categoryNames);
  } catch (error) { /*...*/ }
}