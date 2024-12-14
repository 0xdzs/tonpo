'use client';

import { useEffect, useState } from 'react';

export default function TelegramOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    const checkTelegramWebApp = () => {
      if (typeof window === 'undefined') return false;
      
      try {
        // Check if we're in Telegram's WebApp environment
        if (!window.Telegram?.WebApp) {
          return false;
        }

        // Initialize WebApp
        window.Telegram.WebApp.ready();
        
        // Additional check for Telegram environment
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isTelegramBrowser = userAgent.includes('telegram') || 
                                 window.Telegram.WebApp.platform !== 'unknown';
        
        return isTelegramBrowser;
      } catch (_) {
        return false;
      }
    };

    setIsTelegram(checkTelegramWebApp());
  }, []);

  if (!isTelegram) {
    return (
      <div className="wrong-place">
        You&apos;re in a wrong place ;(
      </div>
    );
  }

  return <>{children}</>;
} 