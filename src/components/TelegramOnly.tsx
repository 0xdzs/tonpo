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
    if (process.env.NEXT_PUBLIC_ENABLE_TELEGRAM_MOCK === 'true') {
      setIsTelegram(true);
      setIsLoading(false);
      return;
    }

    if (typeof window !== 'undefined') {
      const webApp = window.Telegram?.WebApp;
      if (webApp) {
        webApp.ready();
        setIsTelegram(true);
      }
      setIsLoading(false);
    }
  }, []);

  if (!isTelegram && !isLoading) {
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