import { NextResponse } from 'next/server';
import { getBot } from '@/lib/bot';

export async function POST(req: Request) {
  try {
    console.log('Webhook POST received');
    const data = await req.json();
    console.log('Webhook data:', JSON.stringify(data, null, 2));

    const bot = getBot();
    console.log('Bot instance created');

    await bot.handleUpdate(data);
    console.log('Update handled successfully');

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ ok: true });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
} 