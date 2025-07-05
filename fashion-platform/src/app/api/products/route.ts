import { NextResponse } from 'next/server';
import { mockProducts } from '@/data/mockProducts';

export async function GET() {
  try {
    // Simulamos un pequeño retraso para simular una llamada real a la API
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(mockProducts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener los productos' },
      { status: 500 }
    );
  }
} 