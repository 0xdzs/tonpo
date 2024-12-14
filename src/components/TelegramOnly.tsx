'use client';

import { useEffect, useState } from 'react';

export default function TelegramOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isTelegram, setIsTelegram] = useState(true);

  useEffect(() => {
    // Check if window.Telegram.WebApp exists
    const isTelegramWebApp = Boolean(
      typeof window !== 'undefined' &&
      window.Telegram &&
      window.Telegram.WebApp
    );
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