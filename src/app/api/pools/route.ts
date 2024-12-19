import { NextResponse } from 'next/server';
import { fetchPaginatedPools } from '@/utils/fetchPools';

export async function GET() {
  try {
    const config = {
      pageSize: 100, // GeckoTerminal max page size
      totalPages: 5, // 5 pages × 100 tokens = 500 tokens
      network: 'ton'
    };

    const pools = await fetchPaginatedPools(
      'https://api.geckoterminal.com/api/v2/networks/ton/pools',
      config
    );
    
    return NextResponse.json({ data: pools });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch pools' },
      { status: 500 }
    );
  }
}