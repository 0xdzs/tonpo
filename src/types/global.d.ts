interface Window {
  Telegram?: {
    WebApp: {
      ready(): void;
      expand(): void;
      close(): void;
      [key: string]: any;
    };
  };
} 