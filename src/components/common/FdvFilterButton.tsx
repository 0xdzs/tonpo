interface FdvFilterProps {
  showHighFdvOnly: boolean;
  onToggle: () => void;
}

export default function FdvFilterButton({ showHighFdvOnly, onToggle }: FdvFilterProps) {
  return (
    <button
      onClick={onToggle}
      className={`px-4 py-2 rounded-full text-sm ${
        showHighFdvOnly ? 'bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]' : 'text-[var(--tg-theme-hint-color)]'
      }`}
    >
      FDV &gt; 10M
    </button>
  );
} 