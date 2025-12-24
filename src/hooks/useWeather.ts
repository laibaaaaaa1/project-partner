import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface CurrentWeather {
  temp: number;
  condition: string;
  icon: string;
  humidity: number;
  wind: number;
}

interface ForecastDay {
  date: string;
  day: string;
  temp: number;
  condition: string;
  icon: string;
}

interface WeatherData {
  location: string;
  current: CurrentWeather;
  forecast: ForecastDay[];
}

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (location: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase.functions.invoke("get-weather", {
        body: { location },
      });

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      setWeather(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch weather";
      setError(message);
      console.error("Weather fetch error:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    weather,
    isLoading,
    error,
    fetchWeather,
  };
}
