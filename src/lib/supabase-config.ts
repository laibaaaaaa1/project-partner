// Supabase configuration - use environment variables from Lovable Cloud
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Edge function URLs
export const EDGE_FUNCTIONS = {
  travelChat: `${SUPABASE_URL}/functions/v1/travel-chat`,
  getWeather: `${SUPABASE_URL}/functions/v1/get-weather`,
} as const;
