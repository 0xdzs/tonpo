'use client';

import { useEffect, useState, useCallback } from 'react';
import PoolsTable from '@/components/Dashboard/PoolsTable';
import DashboardTabs from '@/components/Dashboard/DashboardTabs';
import RefreshButton from '@/components/common/RefreshButton';
import LastUpdated from '@/components/common/LastUpdated';
import { Pool } from '@/types/pools';
import { filterAndCombinePools } from '@/utils/poolFormatters';
import FdvFilterButton from '@/components/common/FdvFilterButton';

type Tab = 'top' | 'new';
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
  const [isTelegramWebApp, setIsTelegramWebApp] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('top');
  const [pools, setPools] = useState<CombinedPool[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [sortField, setSortField] = useState<SortField>('volumeFdvRatio');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [showHighFdvOnly, setShowHighFdvOnly] = useState(false);

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
    const isTelegram = !!window.Telegram?.WebApp;
    setIsTelegramWebApp(isTelegram);
    
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
    }
  }, []);

  useEffect(() => {
    if (!isTelegramWebApp) return;

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
  }, [activeTab, fetchPools, fetchNewPools, isTelegramWebApp]);

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

  const filterHighFdvPools = useCallback((pools: CombinedPool[]) => {
    if (!showHighFdvOnly) return pools;
    return pools.filter(pool => parseFloat(pool.attributes.fdv_usd || '0') >= 10_000_000);
  }, [showHighFdvOnly]);

  return (
    <div className="p-4 pb-20 bg-[var(--tg-theme-bg-color)] min-h-screen">
      <DashboardTabs activeTab={activeTab} onTabChange={handleTabChange} />
      
      {activeTab === 'top' ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4 pl-4">
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
            <div className="flex flex-col items-end gap-2">
              <FdvFilterButton 
                showHighFdvOnly={showHighFdvOnly}
                onToggle={() => setShowHighFdvOnly(!showHighFdvOnly)}
              />
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
              pools={filterHighFdvPools(pools)} 
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
            <div className="flex items-center gap-4">
              <FdvFilterButton 
                showHighFdvOnly={showHighFdvOnly}
                onToggle={() => setShowHighFdvOnly(!showHighFdvOnly)}
              />
              <div className="flex flex-col items-end gap-2">
                <RefreshButton onRefresh={fetchNewPools} isLoading={loading} />
                <LastUpdated timestamp={lastUpdated} isLoading={loading} />
              </div>
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
        </>
      )}
    </div>
  );
} 