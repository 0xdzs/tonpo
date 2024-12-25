type FdvFilter = '1M' | '5M' | '10M';

interface DashboardTabsProps {
  selectedFdvFilter: FdvFilter | null;
  onFilterChange: (filter: FdvFilter | null) => void;
}

export default function DashboardTabs({ 
  selectedFdvFilter,
  onFilterChange 
}: DashboardTabsProps) {
  return (
    <div className="flex items-center mb-4">
      <select
        value={selectedFdvFilter || ''}
        onChange={(e) => onFilterChange(e.target.value as FdvFilter || null)}
        className="px-3 py-1.5 rounded-full text-xs border border-[var(--tg-theme-button-color)] bg-transparent text-[var(--tg-theme-button-color)] appearance-none cursor-pointer"
      >
        <option value="">FDV Filter</option>
        <option value="1M">FDV &gt; 1M</option>
        <option value="5M">FDV &gt; 5M</option>
        <option value="10M">FDV &gt; 10M</option>
      </select>
    </div>
  );
} 