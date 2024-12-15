if (process.env.NODE_ENV === 'development') {
  window.Telegram = {
    WebApp: {
      ready: () => {},
      expand: () => {},
      close: () => {},
      platform: 'macos',
      // Add other methods you need
    }
  };
} 