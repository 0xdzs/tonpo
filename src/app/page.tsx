'use client';

import { useEffect, useState, useCallback } from 'react';
import PoolsTable from '@/components/Dashboard/PoolsTable';
import DashboardTabs from '@/components/Dashboard/DashboardTabs';
import RefreshButton from '@/components/common/RefreshButton';
import LastUpdated from '@/components/common/LastUpdated';
import { Pool } from '@/types/pools';
import { filterAndCombinePools } from '@/utils/poolFormatters';

type Tab = 'top' | 'new';
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
  const [activeTab, setActiveTab] = useState<Tab>('top');
  const [pools, setPools] = useState<CombinedPool[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [sortField, setSortField] = useState<SortField>('volume');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

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

  const fetchNewPools = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/pools/new');
      const data = await response.json();
      const combinedPools = filterAndCombinePools(data.data);
      setPools(combinedPools);
      setLastUpdated(Date.now());
    } catch (error) {
      console.error('Error fetching new pools:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (activeTab === 'top') {
        await fetchPools();
      } else {
        await fetchNewPools();
      }
    };

    fetchData();
    
    return () => {
      setPools([]);
    };
  }, [activeTab, fetchPools, fetchNewPools]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleTabChange = (newTab: Tab) => {
    setActiveTab(newTab);
    setPools([]);
    setLoading(true);
    if (newTab === 'new') {
      fetchNewPools();
    } else {
      fetchPools();
    }
  };

  return (
    <div className="p-4 pb-20 bg-[var(--tg-theme-bg-color)] min-h-screen">
      <DashboardTabs activeTab={activeTab} onTabChange={handleTabChange} />
      
      {activeTab === 'top' ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4 pl-4">
              <PoolsTable.SortButton 
                field="volume" 
                label="Volume"
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
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4 pl-4">
              <PoolsTable.SortButton 
                field="volume" 
                label="Volume"
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
            <div className="flex flex-col items-end gap-2">
              <RefreshButton onRefresh={fetchNewPools} isLoading={loading} />
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
        </>
      )}
    </div>
  );
} 