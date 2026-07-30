import Stripe from 'stripe';
import { products } from '../../../data/products';

export const prerender = false;

type CartPayloadItem = {
  slug: string;
  quantity: number;
};

export const POST = async ({ request }: { request: Request }) => {
  const secretKey = import.meta.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    return new Response(JSON.stringify({ error: 'Stripe is not configured on the server.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: { items?: CartPayloadItem[] };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const incomingItems = Array.isArray(body.items) ? body.items : [];
  const cartItems = incomingItems
    .map((item) => ({
      slug: String(item.slug ?? '').trim(),
      quantity: Math.max(1, Math.min(20, Number(item.quantity) || 1)),
    }))
    .filter((item) => item.slug.length > 0);

  if (cartItems.length === 0) {
    return new Response(JSON.stringify({ error: 'Your cart is empty.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const lineItems = cartItems
    .map((item) => {
      const product = products.find((entry) => entry.slug === item.slug);
      if (!product) return null;

      return {
        quantity: item.quantity,
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(product.price * 100),
          product_data: {
            name: product.name,
            description: product.description,
            images: product.image ? [product.image] : undefined,
          },
        },
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  if (lineItems.length === 0) {
    return new Response(JSON.stringify({ error: 'No valid products were found in your cart.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const stripe = new Stripe(secretKey);
  const origin = new URL(request.url).origin;

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${origin}/checkout?status=success`,
      cancel_url: `${origin}/checkout?status=cancelled`,
      managed_payments: { enabled: false },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Stripe checkout session creation failed.';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!session.url) {
    return new Response(JSON.stringify({ error: 'Failed to create Stripe checkout session.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ url: session.url }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
