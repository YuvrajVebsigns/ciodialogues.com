import { NextResponse } from 'next/server';
import { MOCK_VIDEOS } from '@/constants/mockData';

export async function GET() {
  return NextResponse.json(MOCK_VIDEOS);
}
