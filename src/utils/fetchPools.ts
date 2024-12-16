import { Pool } from '@/types/pools';

interface FetchConfig {
  pageSize: number;
  totalPages: number;
  network: string;
}

export async function fetchPaginatedPools(endpoint: string, config: FetchConfig) {
  const allPools: Pool[] = [];
  
  try {
    for (let page = 1; page <= config.totalPages; page++) {
      const url = endpoint.includes('?') 
        ? `${endpoint}&page=${page}&page_size=${config.pageSize}`
        : `${endpoint}?page=${page}&page_size=${config.pageSize}`;
        
      const response = await fetch(url, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Accept': 'application/json'
        },
        mode: 'cors'
      });

      if (!response.ok) {
        if (response.status === 429) {
          // Wait for 1 second before retrying on rate limit
          await new Promise(resolve => setTimeout(resolve, 1000));
          page--; // Retry this page
          continue;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      allPools.push(...data.data);
      
      // Add small delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  } catch (error) {
    console.error('Error fetching pools:', error);
    return [];
  }
  
  return allPools;
} 