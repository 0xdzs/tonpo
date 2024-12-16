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
      // Always return true if mock is enabled
      if (process.env.NEXT_PUBLIC_ENABLE_TELEGRAM_MOCK === 'true') {
        return true;
      }

      if (typeof window === 'undefined') return false;
      
      try {
        // Check if Telegram WebApp object exists
        if (window.Telegram?.WebApp) {
          window.Telegram.WebApp.ready();
          return true;
        }

        // Fallback check for Telegram browser
        const userAgent = window.navigator.userAgent.toLowerCase();
        return userAgent.includes('telegram');
        
      } catch (error) {
        console.warn('Error checking Telegram environment:', error);
        return false;
      }
    };

    // Add a small delay to ensure Telegram WebApp is initialized
    const timer = setTimeout(() => {
      setIsTelegram(checkTelegramWebApp());
    }, 100);

    return () => clearTimeout(timer);
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