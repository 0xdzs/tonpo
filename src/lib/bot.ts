import { Telegraf } from 'telegraf';

let bot: Telegraf | null = null;
// Store user IDs in memory (you might want to use a database in production)
const userIds = new Set<number>();

export function getBot() {
  if (!bot) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    console.log('Bot token status:', token ? 'Available' : 'Missing');
    
    if (!token) {
      console.error('TELEGRAM_BOT_TOKEN environment variable is not set');
      return null;
    }

    try {
      bot = new Telegraf(token);

      bot.command('start', async (ctx) => {
        const userId = ctx.from?.id;
        if (userId) {
          userIds.add(userId);
          console.log('New user added:', userId);
        }
        
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
          await ctx.reply('Sorry, there was an error. Please try again.');
        }
      });

      bot.catch((err) => {
        console.error('Bot error:', err);
      });
    } catch (error) {
      console.error('Error initializing bot:', error);
      return null;
    }
  }
  
  return bot;
}

// Export function to get all user IDs
export function getUserIds(): number[] {
  return Array.from(userIds);
} 