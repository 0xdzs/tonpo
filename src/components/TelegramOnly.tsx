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
      
      try {
        const webApp = window.Telegram?.WebApp;
        if (webApp) {
          const hasInitData = !!webApp.initData;
          const hasPlatform = !!webApp.platform;
          
          if (hasInitData && hasPlatform) {
            webApp.ready();
            webApp.requestFullscreen();
            return true;
          }
        }
        return false;
      } catch (error) {
        console.warn('Error checking Telegram environment:', error);
        return false;
      }
    };

    const timer = setTimeout(() => {
      setIsTelegram(checkTelegramWebApp());
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return null;
  }

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