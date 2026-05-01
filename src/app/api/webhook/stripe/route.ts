import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/config';
import { supabaseAdmin } from '@/lib/supabase/client';
import Stripe from 'stripe';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const subscriptionId = session.subscription as string;
        const customerId = session.customer as string;

        // Update profile status
        const { error } = await supabaseAdmin
          .from('profiles')
          .update({
            subscription_status: 'active',
          })
          .eq('stripe_customer_id', customerId);

        if (error) throw error;
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        
        let status = 'canceled';
        if (subscription.status === 'active') status = 'active';
        if (subscription.status === 'trialing') status = 'trialing';
        if (subscription.status === 'past_due') status = 'past_due';

        await supabaseAdmin
          .from('profiles')
          .update({
            subscription_status: status,
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
