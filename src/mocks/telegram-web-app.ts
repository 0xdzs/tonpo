if (process.env.NODE_ENV === 'development') {
  window.Telegram = {
    WebApp: {
      ready: () => {},
      expand: () => {},
      close: () => {},
      platform: 'macos',
      requestFullscreen: () => {},
      exitFullscreen: () => {},
      isFullscreen: false,
      onEvent: (_event: string, _callback: () => void) => {},
      offEvent: (_event: string, _callback: () => void) => {},
      initData: '',
      initDataUnsafe: {},
      version: '6.0',
      colorScheme: 'light',
      themeParams: {
        bg_color: '#ffffff',
        text_color: '#000000',
        hint_color: '#999999',
        link_color: '#2481cc',
        button_color: '#2481cc',
        button_text_color: '#ffffff',
      }
    }
  };
} 