import { NextResponse } from 'next/server';
import { getBot, getUserIds } from '@/lib/bot';

export async function POST(_req: Request) {
  try {
    const bot = getBot();
    if (!bot) {
      console.error('Bot not initialized');
      return NextResponse.json({ error: 'Bot not initialized' }, { status: 500 });
    }

    const userIds = getUserIds();
    console.log('Broadcasting to users:', userIds);

    if (userIds.length === 0) {
      console.log('No users to broadcast to');
      return NextResponse.json({ message: 'No users to broadcast to' });
    }

    const message = `🎉 Happy New Year from Tonpo! 🎊

🌟 Thank you for being part of our journey in 2023. As we step into 2024, we're excited to continue helping you track the tempo of the TON ecosystem!

✨ Here's to a prosperous year ahead filled with successful trades and great opportunities!

📊 Stay tuned for more features and improvements coming your way.

Best wishes,
The Tonpo Team`;

    let successCount = 0;
    let failCount = 0;

    for (const userId of userIds) {
      try {
        console.log('Sending message to user:', userId);
        await bot.telegram.sendPhoto(userId, 
          { url: 'https://tonpo.vercel.app/logo/logo_blue_transparent.png' },
          { 
            caption: message,
            parse_mode: 'HTML'
          }
        );
        successCount++;
        console.log('Successfully sent to user:', userId);
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Failed to send message to user ${userId}:`, error);
        failCount++;
      }
    }

    return NextResponse.json({ 
      success: true,
      stats: {
        total: userIds.length,
        success: successCount,
        failed: failCount
      }
    });
  } catch (error) {
    console.error('Error in broadcast route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 