'use client';

import { useEffect, useState, useCallback } from 'react';
import PoolsTable from '@/components/Dashboard/PoolsTable';
import RefreshButton from '@/components/common/RefreshButton';
import LastUpdated from '@/components/common/LastUpdated';
import { Pool } from '@/types/pools';
import { filterAndCombinePools } from '@/utils/poolFormatters';

type SortField = 'volumeFdvRatio' | 'fdv';
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
  const [sortField, setSortField] = useState<SortField>('volumeFdvRatio');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedFdvFilter, setSelectedFdvFilter] = useState<'1M' | '5M' | '10M' | null>(null);

  const fetchPools = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/pools');
      const data = await response.json();
      const combinedPools = filterAndCombinePools(data.data);
      setPools(combinedPools);
      setLastUpdated(Date.now());
    } catch (error) {
      console.error('Error fetching pools:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
    }
    fetchPools();
    return () => {
      setPools([]);
    };
  }, [fetchPools]);

  const filterHighFdvPools = useCallback((pools: CombinedPool[]) => {
    if (!selectedFdvFilter) return pools;
    const thresholds = {
      '1M': 1_000_000,
      '5M': 5_000_000,
      '10M': 10_000_000
    };
    return pools.filter(pool => parseFloat(pool.attributes.fdv_usd || '0') >= thresholds[selectedFdvFilter]);
  }, [selectedFdvFilter]);

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
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col gap-3">
          <select
            value={selectedFdvFilter || ''}
            onChange={(e) => setSelectedFdvFilter(e.target.value as '1M' | '5M' | '10M' | null)}
            className="px-3 py-1.5 w-[120px] border border-[var(--tg-theme-button-color)] bg-transparent text-[var(--tg-theme-button-color)] appearance-none cursor-pointer text-xs"
          >
            <option value="">FDV Filter</option>
            <option value="1M">FDV &gt; 1M</option>
            <option value="5M">FDV &gt; 5M</option>
            <option value="10M">FDV &gt; 10M</option>
          </select>
          <div className="flex gap-2">
            <PoolsTable.SortButton
              field="volumeFdvRatio"
              label="Volume/FDV"
              currentSort={sortField}
              direction={sortDirection}
              onSort={handleSort}
            />
            <PoolsTable.SortButton
              field="fdv"
              label="FDV"
              currentSort={sortField}
              direction={sortDirection}
              onSort={handleSort}
            />
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-2">
            <RefreshButton onRefresh={fetchPools} isLoading={loading} />
          </div>
          <LastUpdated timestamp={lastUpdated} isLoading={loading} />
        </div>
      </div>
      {loading && pools.length === 0 ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--tg-theme-button-color)]"></div>
        </div>
      ) : (
        <PoolsTable 
          pools={filterHighFdvPools(pools)} 
          sortField={sortField}
          sortDirection={sortDirection}
        />
      )}
    </div>
  );
} 