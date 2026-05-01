import { NextResponse } from 'next/server';
import { generateEmail } from '@/lib/openai/prompts';
import { supabaseAdmin } from '@/lib/supabase/client';

export async function POST(req: Request) {
  try {
    const { 
      clientName, 
      clientEmail,
      agentName, 
      propertyAddress, 
      price, 
      situation, 
      emailType,
      userId 
    } = await req.json();

    if (!userId || !clientName || !clientEmail || !emailType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { subject, body } = await generateEmail({
      clientName,
      agentName,
      propertyAddress,
      price,
      situation,
      emailType
    });

    // Save as draft in Supabase
    const { data, error } = await supabaseAdmin
      .from('emails')
      .insert({
        user_id: userId,
        client_name: clientName,
        client_email: clientEmail,
        property_address: propertyAddress,
        price,
        situation,
        email_type: emailType,
        subject,
        body,
        status: 'draft'
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ email: data });
  } catch (error: any) {
    console.error('AI Generation Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
