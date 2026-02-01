import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface ExchangeRatesResponse {
  success: boolean;
  base: string;
  rates: Record<string, number>;
  source: 'live' | 'fallback';
  timestamp: string;
  error?: string;
}

// Fallback rates in case everything fails
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

export function useExchangeRates(baseCurrency: string = 'USD') {
  return useQuery({
    queryKey: ['exchange-rates', baseCurrency],
    queryFn: async (): Promise<ExchangeRatesResponse> => {
      try {
        const { data, error } = await supabase.functions.invoke('get-exchange-rates', {
          body: { base: baseCurrency },
        });

        if (error) {
          console.error('Edge function error:', error);
          throw error;
        }

        return data as ExchangeRatesResponse;
      } catch (err) {
        console.error('Failed to fetch exchange rates, using fallback:', err);
        
        // Convert fallback rates to requested base
        const baseRate = fallbackRates[baseCurrency] || 1;
        const convertedRates: Record<string, number> = {};
        
        for (const [currency, rate] of Object.entries(fallbackRates)) {
          convertedRates[currency] = rate / baseRate;
        }

        return {
          success: true,
          base: baseCurrency,
          rates: convertedRates,
          source: 'fallback' as const,
          timestamp: new Date().toISOString(),
        };
      }
    },
    staleTime: 1000 * 60 * 30, // 30 minutes - rates don't change that often
    gcTime: 1000 * 60 * 60, // 1 hour cache
    refetchOnWindowFocus: false,
  });
}

// Helper function to convert currency
export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: Record<string, number>
): number {
  if (fromCurrency === toCurrency) return amount;
  
  // All rates are relative to base currency
  const fromRate = rates[fromCurrency] || 1;
  const toRate = rates[toCurrency] || 1;
  
  // Convert: amount / fromRate gives base currency, then * toRate gives target
  return (amount / fromRate) * toRate;
}
