import type { APIRoute } from 'astro';
import { getSupabaseServerClient } from '../../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  const supabase = getSupabaseServerClient(context);
  if (!supabase) {
    return context.redirect('/login');
  }

  const origin = new URL(context.request.url).origin;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/api/auth/callback`,
    },
  });

  if (error || !data.url) {
    return context.redirect('/login');
  }

  return context.redirect(data.url);
};
