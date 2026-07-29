import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      })
    : null;

export function getSupabaseClient() {
  if (!supabase) {
    console.warn('Supabase is not configured. Set PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY.');
  }
  return supabase;
}
