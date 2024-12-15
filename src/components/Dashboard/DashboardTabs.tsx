import { useState } from 'react';

type Tab = 'top' | 'new';

interface DashboardTabsProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function DashboardTabs({ activeTab, onTabChange }: DashboardTabsProps) {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => onTabChange('top')}
        className={`px-4 py-2 rounded-full text-sm
          ${activeTab === 'top' ? 'active' : ''} tab-button`}
      >
        Top Pools
      </button>
      <button
        onClick={() => onTabChange('new')}
        className={`px-4 py-2 rounded-full text-sm
          ${activeTab === 'new' ? 'active' : ''} tab-button`}
      >
        New Pools
      </button>
    </div>
  );
} 