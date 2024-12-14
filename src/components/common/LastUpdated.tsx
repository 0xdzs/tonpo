'use client';

interface LastUpdatedProps {
  timestamp: number | null;
  isLoading: boolean;
}

export default function LastUpdated({ timestamp, isLoading }: LastUpdatedProps) {
  if (!timestamp) return null;

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(',', '');
  };

  return (
    <div className="flex flex-col items-end text-[var(--tg-theme-subtitle-text-color)]">
      <span className="text-xs">Last Updated</span>
      <span className="text-xs font-mono">
        {isLoading ? 'Updating...' : formatDate(timestamp)}
      </span>
    </div>
  );
} 