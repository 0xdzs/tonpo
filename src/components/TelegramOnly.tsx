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
      // Check environment variable instead of NODE_ENV
      if (process.env.NEXT_PUBLIC_ENABLE_TELEGRAM_MOCK === 'true') {
        return true;
      }

      if (typeof window === 'undefined') return false;
      
      try {
        if (!window.Telegram?.WebApp) {
          return false;
        }

        window.Telegram.WebApp.ready();
        
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isTelegramBrowser = userAgent.includes('telegram') || 
                                 window.Telegram.WebApp.platform !== 'unknown';
        
        return isTelegramBrowser;
      } catch {
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