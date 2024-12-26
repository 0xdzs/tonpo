import { NextApiRequest, NextApiResponse } from 'next';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    
    if (message?.text === '/start') {
      const chatId = message.chat.id;
      
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          photo: 'https://tonpo.vercel.app/welcome_img.png',
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
        }),
      });
    }

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ message: 'Error processing webhook' });
  }
} 