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
      
      const photoUrl = 'https://tonpo.vercel.app/welcome_img.png';
      console.log('Sending photo:', photoUrl);
      
      const telegramApiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;
      console.log('Using Telegram API URL:', telegramApiUrl);
      
      const response = await fetch(telegramApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          photo: photoUrl,
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

      const result = await response.json();
      console.log('Telegram API response:', JSON.stringify(result, null, 2));

      if (!response.ok) {
        throw new Error(`Telegram API error: ${JSON.stringify(result)}`);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ ok: true }); // Always return success to Telegram
  }
}

export async function GET() {
  console.log('Webhook endpoint hit with GET request');
  return NextResponse.json({ ok: true });
} 