'use client';

import Script from 'next/script';

export default function TelegramScript() {
  const handleError = (e: Error) => {
    console.warn('Failed to load Telegram script:', e);
  };

  return (
    <>
      {process.env.NEXT_PUBLIC_ENABLE_TELEGRAM_MOCK === 'true' ? (
        <Script 
          src="/mocks/telegram-web-app.js" 
          strategy="afterInteractive"
          onError={handleError}
        />
      ) : (
        <Script 
          src="https://telegram.org/js/telegram-web-app.js" 
          strategy="afterInteractive"
          onError={handleError}
        />
      )}
    </>
  );
} 