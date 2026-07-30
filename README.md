# Paw & Co. Astro Store

## Supabase setup

1. Create a new Supabase project.
2. Open the SQL editor and run the contents of [supabase-schema.sql](supabase-schema.sql).
3. Copy your project URL and anon key from Settings > API.
4. Create a `.env` file from `.env.example` and fill in the values:

```env
PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Vercel deployment

Use Node.js 20.x or newer in Vercel.

Add the same values in Vercel Project Settings → Environment Variables for all environments (Production, Preview, Development).

Required variables:
- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `STRIPE_SECRET_KEY` (test key for checkout)

If you do not configure them, the app will still build, but Supabase-powered features will be unavailable until the variables are provided.

## Stripe test checkout

1. Create a Stripe account and switch to **Test mode**.
2. Copy your test secret key (`sk_test_...`).
3. Add `STRIPE_SECRET_KEY` to your local `.env` and Vercel environment variables.
4. Start checkout from `/checkout` and use this test card:

`4242 4242 4242 4242` with any future expiry date, any CVC, and any ZIP/postal code.

## Run locally

```bash
npm install
npm run dev
```
