'use client';

import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useState, useCallback } from 'react';

interface RefreshButtonProps {
  onRefresh: () => Promise<void>;
  isLoading: boolean;
}

export default function RefreshButton({ onRefresh, isLoading }: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    if (isRefreshing || isLoading) return;
    
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  }, [onRefresh, isRefreshing, isLoading]);

  return (
    <button
      onClick={handleRefresh}
      disabled={isRefreshing || isLoading}
      className="p-3 bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] rounded-full shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      aria-label="Refresh data"
    >
      <ArrowPathIcon className={`h-6 w-6 ${isRefreshing || isLoading ? 'animate-spin' : ''}`} />
    </button>
  );
} 