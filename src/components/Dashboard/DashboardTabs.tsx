type Tab = 'top';

interface DashboardTabsProps {
  showHighFdvOnly: boolean;
  onToggleFilter: () => void;
}

export default function DashboardTabs({ 
  showHighFdvOnly,
  onToggleFilter 
}: DashboardTabsProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="flex gap-2">
        <div className="px-4 py-2 rounded-full text-sm bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]">
          Top Pools
        </div>
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