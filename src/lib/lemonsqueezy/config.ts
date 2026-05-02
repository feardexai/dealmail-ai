import { lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js';

export const setupLemonSqueezy = () => {
  lemonSqueezySetup({
    apiKey: process.env.LEMONSQUEEZY_API_KEY!,
    onError: (error) => console.error('Lemon Squeezy Error:', error),
  });
};

export const STORE_ID = process.env.LEMONSQUEEZY_STORE_ID!;
export const VARIANT_ID = process.env.LEMONSQUEEZY_VARIANT_ID!;
