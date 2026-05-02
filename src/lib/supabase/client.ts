import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Validation to provide better error messages and avoid crashing during build
if (!supabaseUrl || !supabaseAnonKey) {
  if (process.env.NODE_ENV === 'production') {
    console.warn('Supabase environment variables are missing. Please check your deployment settings.');
  }
}

// Client for browser and server (respects RLS)
// We provide a fallback string to avoid "supabaseKey is required" error during build-time module evaluation
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey || 'placeholder-anon-key'
);

// Admin client for backend operations (bypasses RLS)
// Only initialized properly on the server where SUPABASE_SERVICE_ROLE_KEY is available
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceRoleKey || supabaseAnonKey || 'placeholder-service-role-key'
);
