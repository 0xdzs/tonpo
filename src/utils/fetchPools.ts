import { Pool } from '@/types/pools';

interface FetchConfig {
  pageSize: number;
  totalPages: number;
  network: string;
}

export async function fetchPaginatedPools(endpoint: string, config: FetchConfig) {
  const allPools: Pool[] = [];
  
  for (let page = 1; page <= config.totalPages; page++) {
    const url = endpoint.includes('?') 
      ? `${endpoint}&page=${page}&page_size=${config.pageSize}`
      : `${endpoint}?page=${page}&page_size=${config.pageSize}`;
      
    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    const data = await response.json();
    allPools.push(...data.data);
  }
  
  return allPools;
} 