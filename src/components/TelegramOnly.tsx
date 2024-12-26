'use client';

import { useEffect, useState } from 'react';

export default function TelegramOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    const checkTelegramWebApp = () => {
      if (process.env.NEXT_PUBLIC_ENABLE_TELEGRAM_MOCK === 'true') {
        return true;
      }

      if (typeof window === 'undefined') return false;

      // Check if we're in Telegram's iframe
      const isInTelegramFrame = 
        window.location.href.includes('tg://') || 
        window.location.href.includes('t.me/') ||
        window !== window.parent ||
        !!window.Telegram?.WebApp;

      return isInTelegramFrame;
    };

    // Run check immediately
    const isTelegramApp = checkTelegramWebApp();
    setIsTelegram(isTelegramApp);
    
    // If we're in Telegram, call ready()
    if (isTelegramApp && window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
    }
    
    setIsLoading(false);
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--tg-theme-button-color)]"></div>
      </div>
    );
  }

  // Show Telegram-only message
  if (!isTelegram) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-xl font-bold mb-4">Telegram Only</h1>
          <p className="text-gray-600">
            Please open this app in Telegram.
          </p>
          <a 
            href="https://t.me/tonpo_bot" 
            className="mt-4 inline-block text-blue-500 hover:text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Telegram
          </a>
        </div>
      </div>
    );
  }

  return children;
} 