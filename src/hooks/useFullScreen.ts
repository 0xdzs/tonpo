import { useState, useCallback, useEffect } from 'react';

export function useFullScreen() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreenChange = useCallback(() => {
    setIsFullScreen(window.Telegram?.WebApp?.isFullscreen || false);
  }, []);

  const enterFullScreen = useCallback(() => {
    window.Telegram?.WebApp?.requestFullscreen();
    
  }, []);

  const exitFullScreen = useCallback(() => {
    window.Telegram?.WebApp?.exitFullscreen();
  }, []);

  useEffect(() => {
    const webApp = window.Telegram?.WebApp;
    if (!webApp) return;

    webApp.onEvent('fullscreenChanged', handleFullScreenChange);
    
    return () => {
      webApp.offEvent('fullscreenChanged', handleFullScreenChange);
    };
  }, [handleFullScreenChange]);

  return {
    isFullScreen,
    enterFullScreen,
    exitFullScreen,
    toggleFullScreen: isFullScreen ? exitFullScreen : enterFullScreen
  };
} 