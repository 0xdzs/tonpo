'use client';

import { Pool } from '@/types/pools';
import { Text } from '@tremor/react';
import { ArrowUpIcon, ArrowDownIcon, DocumentDuplicateIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

type SortField = 'volumeFdvRatio' | 'fdv';
type SortDirection = 'asc' | 'desc';

interface SortButtonProps {
  field: SortField;
  label: string;
  currentSort: SortField;
  direction: SortDirection;
  onSort: (field: SortField) => void;
}

function SortButton({ field, label, currentSort, direction, onSort }: SortButtonProps) {
  return (
    <button
      onClick={() => onSort(field)}
      className={`px-4 py-2 rounded-full text-sm flex items-center gap-1 whitespace-nowrap
        ${currentSort === field ? 'active' : ''} sort-button`}
    >
      {label}
      {currentSort === field && (
        direction === 'asc' ? 
          <ArrowUpIcon className="h-3 w-3" /> : 
          <ArrowDownIcon className="h-3 w-3" />
      )}
    </button>
  );
}

interface PoolsTableProps {
  pools: Pool[];
  sortField: SortField;
  sortDirection: SortDirection;
}

export default function PoolsTable({ pools, sortField, sortDirection }: PoolsTableProps) {
  const [copiedPoolId, setCopiedPoolId] = useState<string | null>(null);

  const handleCopyAddress = async (poolId: string, address: string | undefined) => {
    try {
      if (!address) {
        console.error('No address available for pool:', poolId);
        return;
      }
      
      // Remove the 'ton_' prefix if it exists
      const cleanAddress = address.startsWith('ton_') ? address.slice(4) : address;
      
      await navigator.clipboard.writeText(cleanAddress);
      setCopiedPoolId(poolId);
      setTimeout(() => setCopiedPoolId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const sortPools = (a: Pool, b: Pool) => {
    switch (sortField) {
      case 'volumeFdvRatio':
        const aRatio = parseFloat(a.attributes.combined_volume_usd?.h24 || '0') / parseFloat(a.attributes.fdv_usd || '1');
        const bRatio = parseFloat(b.attributes.combined_volume_usd?.h24 || '0') / parseFloat(b.attributes.fdv_usd || '1');
        return sortDirection === 'asc' ? aRatio - bRatio : bRatio - aRatio;
      case 'fdv':
        return sortDirection === 'asc'
          ? parseFloat(a.attributes.fdv_usd || '0') - parseFloat(b.attributes.fdv_usd || '0')
          : parseFloat(b.attributes.fdv_usd || '0') - parseFloat(a.attributes.fdv_usd || '0');
      default:
        return 0;
    }
  };

  const sortedPools = [...pools].sort(sortPools);

  return (
    <div>
      <div className="divide-y-2 divide-[var(--tg-theme-secondary-bg-color)] border-y-2 border-[var(--tg-theme-secondary-bg-color)]">
        {sortedPools.map((pool) => (
          <div key={pool.id} className="card p-4 rounded-none first:rounded-t-xl last:rounded-b-xl">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Text className="font-medium text-[var(--tg-theme-text-color)]">
                  {pool.attributes.name}
                </Text>
                <button
                  onClick={() => handleCopyAddress(pool.id, pool.attributes.base_token_address)}
                  className={`p-1.5 rounded-full transition-colors ${
                    copiedPoolId === pool.id
                      ? 'bg-green-100 text-green-600'
                      : 'hover:bg-[var(--tg-theme-secondary-bg-color)] text-[var(--tg-theme-hint-color)]'
                  }`}
                  title="Copy Contract Address"
                >
                  <DocumentDuplicateIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="text-right">
                <Text className="text-sm subtitle">Price</Text>
                <Text className="font-medium text-[var(--tg-theme-accent-text-color)]">
                  ${parseFloat(pool.attributes.base_token_price_usd).toFixed(6)}
                </Text>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Text className="text-sm subtitle">Volume/FDV</Text>
                <Text className="font-medium">
                  {(parseFloat(pool.attributes.combined_volume_usd?.h24 || '0') / parseFloat(pool.attributes.fdv_usd || '1')).toFixed(4)}
                </Text>
              </div>
              <div className="text-right">
                <Text className="text-sm subtitle">FDV</Text>
                <Text className="font-medium">
                  ${parseFloat(pool.attributes.fdv_usd || '0').toLocaleString()}
                </Text>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

PoolsTable.SortButton = function TableSortButton(props: { 
  field: SortField; 
  label: string;
  currentSort: SortField;
  direction: SortDirection;
  onSort: (field: SortField) => void;
}) {
  return (
    <SortButton {...props} />
  );
}; 