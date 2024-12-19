interface Window {
  Telegram?: {
    WebApp: {
      ready(): void;
      expand(): void;
      close(): void;
      requestFullscreen(): void;
      exitFullscreen(): void;
      isFullscreen: boolean;
      onEvent(event: string, callback: () => void): void;
      offEvent(event: string, callback: () => void): void;
      initData?: string;
      platform?: string;
    };
  };
} 