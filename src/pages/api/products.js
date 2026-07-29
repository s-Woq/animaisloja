import { supabase } from '../../lib/supabase';

export async function GET() {
  const { data, error } = await supabase.from('products').select('*');
  
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST({ request }) {
  const body = await request.json();
  const { data, error } = await supabase.from('products').insert([body]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

  return new Response(JSON.stringify(data), { status: 201 });
}