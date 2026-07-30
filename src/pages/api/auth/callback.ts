import type { APIRoute } from 'astro';
import { getSupabaseServerClient } from '../../../lib/supabase';

export const prerender = false;

export const GET: APIRoute = async (context) => {
  const supabase = getSupabaseServerClient(context);
  if (!supabase) {
    return context.redirect('/');
  }

  const requestUrl = new URL(context.request.url);
  const code = requestUrl.searchParams.get('code');

  if (!code) {
    return context.redirect('/');
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return context.redirect('/');
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return context.redirect('/');
  }

  return context.redirect('/dashboard');
};
