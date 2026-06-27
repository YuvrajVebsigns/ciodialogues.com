import { NextResponse } from 'next/server';
import { MOCK_DIALOGUES } from '@/constants/mockData';

export async function GET() {
  return NextResponse.json(MOCK_DIALOGUES);
}
