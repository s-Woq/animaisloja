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

For deployment, add the same variables in your hosting provider's environment settings.

## Run locally

```bash
npm install
npm run dev
```
