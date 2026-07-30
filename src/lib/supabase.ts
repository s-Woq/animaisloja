import type { APIContext } from 'astro';
import { createBrowserClient, createServerClient } from '@supabase/ssr';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

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

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey && isValidHttpUrl(supabaseUrl));
}

function getSupabaseConfigError() {
  return !supabaseUrl
    ? 'PUBLIC_SUPABASE_URL is missing.'
    : !isValidHttpUrl(supabaseUrl)
      ? 'PUBLIC_SUPABASE_URL is not a valid HTTP(S) URL.'
      : !supabaseAnonKey
        ? 'PUBLIC_SUPABASE_ANON_KEY is missing.'
        : 'Supabase is not configured.';
}

export const supabase =
  isSupabaseConfigured()
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      })
    : null;

export function getSupabaseBrowserClient() {
  if (!isSupabaseConfigured()) {
    console.warn(`Supabase is not configured. ${getSupabaseConfigError()}`);
    return null;
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

function parseCookieHeader(cookieHeader: string) {
  if (!cookieHeader) return [] as Array<{ name: string; value: string }>;

  return cookieHeader
    .split(';')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const separatorIndex = entry.indexOf('=');
      if (separatorIndex <= 0) return null;
      const name = entry.slice(0, separatorIndex).trim();
      const value = entry.slice(separatorIndex + 1).trim();
      return name ? { name, value } : null;
    })
    .filter((entry): entry is { name: string; value: string } => Boolean(entry));
}

export function getSupabaseServerClient(context: Pick<APIContext, 'request' | 'cookies'>): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    console.warn(`Supabase is not configured. ${getSupabaseConfigError()}`);
    return null;
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return parseCookieHeader(context.request.headers.get('cookie') ?? '');
      },
      setAll(cookiesToSet) {
        for (const cookie of cookiesToSet) {
          context.cookies.set(cookie.name, cookie.value, cookie.options);
        }
      },
    },
  });
}

export function getSupabaseClient() {
  if (!supabase) {
    console.warn(`Supabase is not configured. ${getSupabaseConfigError()}`);
  }

  return supabase;
}
