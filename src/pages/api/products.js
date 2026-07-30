import { supabase } from '../../lib/supabase';

export const prerender = false;

export async function GET() {
  if (!supabase) {
    return new Response(JSON.stringify({ error: 'Supabase is not configured on the server.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { data, error } = await supabase.from('products').select('*');
  
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST({ request }) {
  if (!supabase) {
    return new Response(JSON.stringify({ error: 'Supabase is not configured on the server.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const body = await request.json();
  const { data, error } = await supabase.from('products').insert([body]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}