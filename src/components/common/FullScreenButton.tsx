import { useFullScreen } from '@/hooks/useFullScreen';

export default function FullScreenButton() {
  const { isFullScreen, toggleFullScreen } = useFullScreen();
  
  return (
    <button
      onClick={toggleFullScreen}
      className="flex items-center justify-center p-2 rounded-lg bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]"
      aria-label={isFullScreen ? 'Exit full screen' : 'Enter full screen'}
    >
      {isFullScreen ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3h7v7H3zm11 0h7v7h-7zm0 11h7v7h-7zM3 14h7v7H3z"/>
        </svg>
      )}
    </button>
  );
} 