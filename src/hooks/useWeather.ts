import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface CurrentWeather {
  temp: number;
  condition: string;
  icon: string;
  humidity: number;
  wind: number;
}

export interface ForecastDay {
  date: string;
  day: string;
  temp: number;
  condition: string;
  icon: string;
}

export interface WeatherData {
  location: string;
  current: CurrentWeather;
  forecast: ForecastDay[];
}

export function useWeather(location: string | null = null) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (loc: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase.functions.invoke("get-weather", {
        body: { location: loc },
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

  useEffect(() => {
    if (location) {
      fetchWeather(location);
    }
  }, [location, fetchWeather]);

  const refresh = useCallback(() => {
    if (location) {
      fetchWeather(location);
    }
  }, [location, fetchWeather]);

  return {
    weather,
    isLoading,
    error,
    fetchWeather,
    refresh,
  };
}
