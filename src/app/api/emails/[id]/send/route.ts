import { NextResponse } from 'next/server';
import { sendEmailWithTracking } from '@/lib/emails/send';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: 'Missing email ID' }, { status: 400 });
    }

    const data = await sendEmailWithTracking(id);

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Email Send Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
