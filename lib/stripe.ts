import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
  typescript: true,
})

export const PRICE_ID = process.env.STRIPE_PRICE_ID || 'price_1234567890' // Will be set after creating product

export const PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    features: [
      'Single video link check',
      'Basic link validation',
      'Manual checks only',
    ],
  },
  PREMIUM: {
    name: 'Premium',
    price: 10, // $10/month
    features: [
      'Full channel monitoring',
      'Automatic daily checks',
      'Email alerts',
      'Multi-platform support',
      'Analytics dashboard',
      'Priority support',
    ],
  },
}
