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
      initDataUnsafe?: Record<string, unknown>;
      platform?: string;
      version?: string;
      colorScheme?: string;
      themeParams?: {
        bg_color: string;
        text_color: string;
        hint_color: string;
        link_color: string;
        button_color: string;
        button_text_color: string;
      };
    };
  };
} 