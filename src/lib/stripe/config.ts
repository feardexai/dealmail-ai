import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27' as any, // Use latest or stable
});

export const PLAN_PRICE_ID = 'price_...'; // Monthly $39 plan
