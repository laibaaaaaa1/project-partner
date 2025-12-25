// Supabase configuration - use hardcoded values, not VITE_ env vars
export const SUPABASE_URL = "https://ivjyjfqtuwdkhfiygunm.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2anlqZnF0dXdka2hmaXlndW5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzMzE3MzMsImV4cCI6MjA4MTkwNzczM30.DwLRL4gxG0W2ktHEXpRGSPnNFDoOXat73y9owf6k2nc";

// Edge function URLs
export const EDGE_FUNCTIONS = {
  travelChat: `${SUPABASE_URL}/functions/v1/travel-chat`,
  getWeather: `${SUPABASE_URL}/functions/v1/get-weather`,
} as const;
