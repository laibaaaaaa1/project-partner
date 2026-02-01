import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Fallback rates in case API fails (approximate rates relative to USD)
const fallbackRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.50,
  AUD: 1.53,
  CAD: 1.36,
  CHF: 0.88,
  CNY: 7.24,
  INR: 83.12,
  MXN: 17.15,
  BRL: 4.97,
  KRW: 1320.50,
  SGD: 1.34,
  THB: 35.50,
  NZD: 1.64,
  PKR: 278.50,
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { base = 'USD' } = await req.json().catch(() => ({}));
    
    console.log(`Fetching exchange rates for base currency: ${base}`);

    // Try to fetch from a free exchange rate API
    // Using frankfurter.app which is free and doesn't require API key
    const supportedByAPI = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR', 'MXN', 'BRL', 'KRW', 'SGD', 'THB', 'NZD'];
    
    try {
      const apiBase = supportedByAPI.includes(base) ? base : 'USD';
      const response = await fetch(
        `https://api.frankfurter.app/latest?from=${apiBase}`
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Successfully fetched live rates from API');
        
        // Add PKR with approximate rate (API doesn't support PKR)
        const rates = { ...data.rates, [apiBase]: 1 };
        
        // Calculate PKR rate based on USD
        if (apiBase === 'USD') {
          rates.PKR = 278.50;
        } else {
          // Convert through USD
          const usdRate = rates.USD || 1;
          rates.PKR = 278.50 * usdRate;
        }

        return new Response(
          JSON.stringify({
            success: true,
            base: apiBase,
            rates,
            source: 'live',
            timestamp: new Date().toISOString(),
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    } catch (apiError) {
      console.error('API fetch failed, using fallback rates:', apiError);
    }

    // Use fallback rates if API fails
    console.log('Using fallback exchange rates');
    
    // Convert fallback rates to requested base
    const baseRate = fallbackRates[base] || 1;
    const convertedRates: Record<string, number> = {};
    
    for (const [currency, rate] of Object.entries(fallbackRates)) {
      convertedRates[currency] = rate / baseRate;
    }

    return new Response(
      JSON.stringify({
        success: true,
        base,
        rates: convertedRates,
        source: 'fallback',
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in get-exchange-rates:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        rates: fallbackRates,
        source: 'fallback',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
