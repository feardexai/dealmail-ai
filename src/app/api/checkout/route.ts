import { NextResponse } from 'next/server';
import { createCheckout } from '@lemonsqueezy/lemonsqueezy.js';
import { setupLemonSqueezy, STORE_ID, VARIANT_ID } from '@/lib/lemonsqueezy/config';

export async function POST(req: Request) {
  try {
    setupLemonSqueezy();
    const { userId, email, name } = await req.json();

    if (!userId || !email) {
      return NextResponse.json({ error: 'Missing user details' }, { status: 400 });
    }

    // Create a Lemon Squeezy Checkout
    const { data: checkout, error } = await createCheckout(STORE_ID, VARIANT_ID, {
      checkoutData: {
        email: email,
        name: name || '',
        custom: {
          user_id: userId,
        },
      },
      productOptions: {
        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ url: checkout?.data.attributes.url });
  } catch (error: any) {
    console.error('Checkout Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
