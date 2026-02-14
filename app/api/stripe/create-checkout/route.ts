// Create Stripe Checkout Session
// POST /api/stripe/create-checkout

import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import { SubscriptionStatus } from '@prisma/client'

export async function POST(request: Request) {
  try {
    const user = await currentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get or create user in database
    let dbUser = await prisma.user.findUnique({
      where: { email: user.emailAddresses[0].emailAddress },
    })

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          email: user.emailAddresses[0].emailAddress,
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || null,
        },
      })
    }

    // If user already has a subscription, redirect to billing portal
    if (dbUser.stripeCustomerId && dbUser.subscriptionStatus === SubscriptionStatus.ACTIVE) {
      return NextResponse.json(
        { error: 'You already have an active subscription. Use the billing portal to manage it.' },
        { status: 400 }
      )
    }

    // Create or retrieve Stripe customer
    let customerId = dbUser.stripeCustomerId

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
        name: dbUser.name || undefined,
        metadata: {
          userId: dbUser.id,
        },
      })

      customerId = customer.id

      // Update user with Stripe customer ID
      await prisma.user.update({
        where: { id: dbUser.id },
        data: { stripeCustomerId: customerId },
      })
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://watchmylinks.app'}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://watchmylinks.app'}/dashboard?canceled=true`,
      metadata: {
        userId: dbUser.id,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
