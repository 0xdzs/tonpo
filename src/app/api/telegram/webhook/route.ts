import { NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error('TELEGRAM_BOT_TOKEN is not set');
}

export async function POST(req: Request) {
  console.log('Webhook endpoint hit with POST request');
  
  try {
    const data = await req.json();
    console.log('Full webhook data:', JSON.stringify(data, null, 2));
    
    const { message } = data;
    console.log('Received message:', message);
    
    if (message?.text === '/start') {
      const chatId = message.chat.id;
      console.log('Processing /start command for chat:', chatId);
      
      const telegramApiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;
      console.log('Using Telegram API URL:', telegramApiUrl);
      
      const requestBody = {
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
      };

      console.log('Sending request with body:', JSON.stringify(requestBody, null, 2));

      const response = await fetch(telegramApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log('Telegram API response:', JSON.stringify(result, null, 2));

      if (!response.ok) {
        console.error('Failed to send photo:', result);
        throw new Error(`Telegram API error: ${JSON.stringify(result)}`);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    // Still return 200 to Telegram even on error
    return NextResponse.json({ ok: true });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
} 