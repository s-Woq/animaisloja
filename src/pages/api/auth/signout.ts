import type { APIRoute } from 'astro';
import { getSupabaseServerClient } from '../../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  const supabase = getSupabaseServerClient(context);
  if (supabase) {
    await supabase.auth.signOut();
  }

  return context.redirect('/login');
};
