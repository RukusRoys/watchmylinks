// Stripe Webhook Handler
// POST /api/stripe/webhook

import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import { SubscriptionStatus } from '@prisma/client'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = (await headers()).get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        if (session.mode === 'subscription') {
          await handleSubscriptionCreated(session)
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaymentSucceeded(invoice)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaymentFailed(invoice)
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleSubscriptionCreated(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId
  
  if (!userId) {
    console.error('No userId in session metadata')
    return
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      stripeCustomerId: session.customer as string,
      stripeSubscriptionId: session.subscription as string,
      subscriptionStatus: SubscriptionStatus.ACTIVE,
    },
  })
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const user = await prisma.user.findUnique({
    where: { stripeSubscriptionId: subscription.id },
  })

  if (!user) {
    console.error('User not found for subscription:', subscription.id)
    return
  }

  const status = mapSubscriptionStatus(subscription.status)

  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionStatus: status,
      subscriptionEndsAt: subscription.cancel_at 
        ? new Date(subscription.cancel_at * 1000)
        : null,
    },
  })
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const user = await prisma.user.findUnique({
    where: { stripeSubscriptionId: subscription.id },
  })

  if (!user) {
    console.error('User not found for subscription:', subscription.id)
    return
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionStatus: SubscriptionStatus.CANCELED,
      subscriptionEndsAt: new Date(),
    },
  })
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: invoice.customer as string },
  })

  if (!user) {
    return
  }

  // Ensure subscription is active on successful payment
  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionStatus: SubscriptionStatus.ACTIVE,
    },
  })
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: invoice.customer as string },
  })

  if (!user) {
    return
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionStatus: SubscriptionStatus.PAST_DUE,
    },
  })
}

function mapSubscriptionStatus(status: Stripe.Subscription.Status): SubscriptionStatus {
  switch (status) {
    case 'active':
      return SubscriptionStatus.ACTIVE
    case 'canceled':
      return SubscriptionStatus.CANCELED
    case 'past_due':
      return SubscriptionStatus.PAST_DUE
    case 'trialing':
      return SubscriptionStatus.TRIALING
    case 'incomplete':
    case 'incomplete_expired':
      return SubscriptionStatus.INCOMPLETE
    default:
      return SubscriptionStatus.FREE
  }
}
