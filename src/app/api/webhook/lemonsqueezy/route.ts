import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase/client';

export async function POST(req: Request) {
  const body = await req.text();
  const hmac = crypto.createHmac('sha256', process.env.LEMONSQUEEZY_WEBHOOK_SECRET!);
  const digest = Buffer.from(hmac.update(body).digest('hex'), 'utf8');
  const signature = Buffer.from(req.headers.get('x-signature') || '', 'utf8');

  if (!crypto.timingSafeEqual(digest, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const payload = JSON.parse(body);
  const eventName = payload.meta.event_name;
  const customData = payload.meta.custom_data;
  const userId = customData?.user_id;

  try {
    switch (eventName) {
      case 'subscription_created':
      case 'subscription_updated': {
        const status = payload.data.attributes.status;
        const customerId = payload.data.attributes.customer_id.toString();
        
        let dbStatus = 'canceled';
        if (status === 'active') dbStatus = 'active';
        if (status === 'on_trial') dbStatus = 'trialing';
        if (status === 'past_due') dbStatus = 'past_due';
        if (status === 'unpaid') dbStatus = 'past_due';

        // Update profile status
        // If we have userId from custom data, use it, otherwise use customerId if we stored it
        if (userId) {
          await supabaseAdmin
            .from('profiles')
            .update({
              subscription_status: dbStatus,
              stripe_customer_id: customerId, // Reusing the column for Lemon Squeezy customer ID
            })
            .eq('id', userId);
        } else {
          await supabaseAdmin
            .from('profiles')
            .update({
              subscription_status: dbStatus,
            })
            .eq('stripe_customer_id', customerId);
        }
        break;
      }

      case 'subscription_cancelled':
      case 'subscription_expired': {
        const customerId = payload.data.attributes.customer_id.toString();
        await supabaseAdmin
          .from('profiles')
          .update({
            subscription_status: 'canceled',
          })
          .eq('stripe_customer_id', customerId);
        break;
      }
    }
  } catch (error: any) {
    console.error('Webhook processing failed.', error.message);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
