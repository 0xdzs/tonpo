import { NextResponse } from 'next/server';
import bot from '@/lib/bot';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await bot.handleUpdate(data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ ok: true });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
} 