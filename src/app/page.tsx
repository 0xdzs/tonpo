'use client';

import { useEffect, useState, useCallback } from 'react';
import PoolsTable from '@/components/Dashboard/PoolsTable';
import RefreshButton from '@/components/common/RefreshButton';
import LastUpdated from '@/components/common/LastUpdated';
import { Pool } from '@/types/pools';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

type SortField = 'volume' | 'fdv';
type SortDirection = 'asc' | 'desc';

interface CombinedPool extends Omit<Pool, 'attributes'> {
  attributes: Pool['attributes'] & {
    combined_volume_usd: {
      h24: string;
    };
    fee_tiers: string[];
  };
}

export default function Home() {
  const [pools, setPools] = useState<CombinedPool[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [lastData, setLastData] = useState<string>('');
  const [sortField, setSortField] = useState<SortField>('volume');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const fetchPools = useCallback(async () => {
    setLoading(true);
    try {
      const allPools: Pool[] = [];
      const pageSize = 50;
      const totalPages = 2;

      for (let page = 1; page <= totalPages; page++) {
        const response = await fetch(
          `https://api.geckoterminal.com/api/v2/networks/ton/pools?page=${page}&page_size=${pageSize}`, 
          {
            cache: 'no-store',
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache'
            }
          }
        );
        const data = await response.json();
        allPools.push(...data.data);
      }
      
      // Filter out USD₮/TON pairs
      const filteredPools = allPools.filter((pool: Pool) => {
        const poolName = pool.attributes.name.toLowerCase();
        return !(
          poolName.includes('usd₮') || 
          poolName.includes('usdt') ||
          poolName.includes('tether')
        );
      });

      // Combine volumes for same pairs
      const poolMap = new Map<string, CombinedPool>();
      
      filteredPools.forEach((pool: Pool) => {
        // Extract base pair name without fee tier
        const poolName = pool.attributes.name;
        let [token1, token2] = poolName.split('/').map(t => t.trim().split(' ')[0]);
        
        // Ensure TON is always the quote token (second position)
        if (token1.toLowerCase() === 'ton') {
          [token1, token2] = [token2, token1];
        }
        
        const pairKey = `${token1} / ${token2}`;
        
        if (poolMap.has(pairKey)) {
          const existingPool = poolMap.get(pairKey)!;
          const existingVolume = parseFloat(existingPool.attributes.combined_volume_usd.h24);
          const newVolume = parseFloat(pool.attributes.volume_usd.h24);
          
          existingPool.attributes.combined_volume_usd.h24 = (existingVolume + newVolume).toString();
          existingPool.attributes.name = pairKey;
        } else {
          poolMap.set(pairKey, {
            ...pool,
            attributes: {
              ...pool.attributes,
              name: pairKey,
              combined_volume_usd: {
                h24: pool.attributes.volume_usd.h24
              },
              fee_tiers: []
            }
          });
        }
      });

      const combinedPools = Array.from(poolMap.values());
      const newDataString = JSON.stringify(combinedPools);
      
      if (newDataString !== lastData) {
        setPools(combinedPools);
        setLastData(newDataString);
        setLastUpdated(Date.now());
      }
    } catch (error) {
      console.error('Error fetching pools:', error);
    } finally {
      setLoading(false);
    }
  }, [lastData]);

  useEffect(() => {
    fetchPools();
  }, [fetchPools]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="p-4 pb-20 bg-[var(--tg-theme-bg-color)] min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 overflow-x-auto">
          <PoolsTable.SortButton 
            field="volume" 
            label="Volume"
            currentSort={sortField}
            direction={sortDirection}
            onSort={handleSort}
          />
          <button
            onClick={() => handleSort('fdv')}
            className={`px-4 py-2 rounded-full text-sm flex items-center gap-1 whitespace-nowrap
              ${sortField === 'fdv' ? 'active' : ''} sort-button`}
          >
            FDV
            {sortField === 'fdv' && (
              sortDirection === 'asc' ? 
                <ArrowUpIcon className="h-3 w-3" /> : 
                <ArrowDownIcon className="h-3 w-3" />
            )}
          </button>
        </div>
        <div className="flex flex-col items-end gap-2">
          <RefreshButton onRefresh={fetchPools} isLoading={loading} />
          <LastUpdated timestamp={lastUpdated} isLoading={loading} />
        </div>
      </div>
      {loading && pools.length === 0 ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--tg-theme-button-color)]"></div>
        </div>
      ) : (
        <PoolsTable 
          pools={pools} 
          sortField={sortField}
          sortDirection={sortDirection}
        />
      )}
    </div>
  );
} 