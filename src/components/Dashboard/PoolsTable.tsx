'use client';

import { useState } from 'react';
import { Pool } from '@/types/pools';
import { Text } from '@tremor/react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

type SortField = 'volume' | 'fdv';
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
  const sortPools = (a: Pool, b: Pool) => {
    switch (sortField) {
      case 'volume':
        return sortDirection === 'asc'
          ? parseFloat(a.attributes.combined_volume_usd?.h24 || '0') - parseFloat(b.attributes.combined_volume_usd?.h24 || '0')
          : parseFloat(b.attributes.combined_volume_usd?.h24 || '0') - parseFloat(a.attributes.combined_volume_usd?.h24 || '0');
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
              <Text className="font-medium text-[var(--tg-theme-text-color)]">
                {pool.attributes.name}
              </Text>
              <div className="text-right">
                <Text className="text-sm subtitle">Price</Text>
                <Text className="font-medium text-[var(--tg-theme-accent-text-color)]">
                  ${parseFloat(pool.attributes.base_token_price_usd).toFixed(6)}
                </Text>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Text className="text-sm subtitle">24h Volume</Text>
                <Text className="font-medium">
                  ${parseFloat(pool.attributes.combined_volume_usd?.h24 || '0').toLocaleString()}
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