import { createClient } from '@supabase/supabase-js';

function isValidHttpUrl(value: string) {
  if (!value) return false;

  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

const supabaseUrl = (import.meta.env.PUBLIC_SUPABASE_URL ?? '').trim();
const supabaseAnonKey = (import.meta.env.PUBLIC_SUPABASE_ANON_KEY ?? '').trim();

export const supabase =
  supabaseUrl && supabaseAnonKey && isValidHttpUrl(supabaseUrl)
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      })
    : null;

export function getSupabaseClient() {
  if (!supabase) {
    const reason = !supabaseUrl
      ? 'PUBLIC_SUPABASE_URL is missing.'
      : !isValidHttpUrl(supabaseUrl)
        ? 'PUBLIC_SUPABASE_URL is not a valid HTTP(S) URL.'
        : !supabaseAnonKey
          ? 'PUBLIC_SUPABASE_ANON_KEY is missing.'
          : 'Supabase is not configured.';

    console.warn(`Supabase is not configured. ${reason}`);
  }

  return supabase;
}
