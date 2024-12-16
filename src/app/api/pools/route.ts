import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const response = await fetch(
      'https://api.geckoterminal.com/api/v2/networks/ton/pools',
      {
        headers: {
          'Accept': 'application/json',
        }
      }
    );
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (_) { // Using underscore to ignore the unused parameter
    return NextResponse.json(
      { error: 'Failed to fetch pools' },
      { status: 500 }
    );
  }
}