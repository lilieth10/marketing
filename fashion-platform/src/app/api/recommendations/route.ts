import { NextResponse } from 'next/server';
import { getMockRecommendations } from '@/lib/mocks/recommendations';

export async function GET() {
  const data = getMockRecommendations();
  return NextResponse.json(data);
} 