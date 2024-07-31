import { NextRequest, NextResponse } from 'next/server';
import { fetchTokens } from '@/utils/tokens';

export async function GET(_request: NextRequest) {
  try {
    const token = await fetchTokens();
    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error fetching token:', error);
    return NextResponse.json({ error: 'Failed to fetch token' }, { status: 500 });
  }
}
