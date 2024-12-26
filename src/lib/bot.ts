import { Telegraf } from 'telegraf';

if (!process.env.TELEGRAM_BOT_TOKEN) {
  throw new Error('TELEGRAM_BOT_TOKEN is not set');
}

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.command('start', async (ctx) => {
  try {
    await ctx.replyWithPhoto(
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
  } catch (error) {
    console.error('Error sending welcome message:', error);
  }
});

export default bot; 