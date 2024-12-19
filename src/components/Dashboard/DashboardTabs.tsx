type Tab = 'top' | 'new';

interface DashboardTabsProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  showHighFdvOnly: boolean;
  onToggleFilter: () => void;
}

export default function DashboardTabs({ 
  activeTab, 
  onTabChange,
  showHighFdvOnly,
  onToggleFilter 
}: DashboardTabsProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="flex gap-2">
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
      <button
        onClick={onToggleFilter}
        className={`px-3 py-1.5 rounded-full text-xs border border-[var(--tg-theme-button-color)] transition-colors
          ${showHighFdvOnly 
            ? 'bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]' 
            : 'bg-transparent text-[var(--tg-theme-button-color)]'
          }`}
      >
        FDV &gt; 10M
      </button>
    </div>
  );
} 