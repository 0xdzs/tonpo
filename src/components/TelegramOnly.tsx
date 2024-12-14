'use client';

import { useEffect, useState } from 'react';

export default function TelegramOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isTelegram, setIsTelegram] = useState(true);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isTelegramWebApp = Boolean(window.Telegram?.WebApp) || userAgent.includes('telegram');
    setIsTelegram(isTelegramWebApp);
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