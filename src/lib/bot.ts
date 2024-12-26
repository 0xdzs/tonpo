import { Telegraf } from 'telegraf';

let bot: Telegraf | null = null;

export function getBot() {
  if (!bot) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    console.log('Initializing bot with token:', token ? 'exists' : 'missing');

    if (!token) {
      throw new Error('TELEGRAM_BOT_TOKEN is not set');
    }

    bot = new Telegraf(token);

    bot.command('start', async (ctx) => {
      console.log('Received /start command from:', ctx.from?.id);
      try {
        console.log('Sending welcome photo...');
        const result = await ctx.replyWithPhoto(
          { url: 'https://tonpo.vercel.app/welcome_img.png' },
          {
            caption: '🚀 Welcome to Tonpo!\n\nTrack the tempo of TON ecosystem for better trading decisions 📈\n\nClick the button below to open the app 👇',
            reply_markup: {
              inline_keyboard: [[
                {
                  text: "📊 Open Tonpo",
                  web_app: { url: "https://tonpo.vercel.app" }
                }
              ]]
            },
            parse_mode: 'HTML'
          }
        );
        console.log('Welcome photo sent successfully:', result);
      } catch (error) {
        console.error('Error sending welcome message:', error);
        // Attempt to send error message to user
        await ctx.reply('Sorry, there was an error sending the welcome message. Please try again.');
      }
    });

    // Add error handler
    bot.catch((err) => {
      console.error('Bot error:', err);
    });
  }
  
  return bot;
} 