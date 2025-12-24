import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Mock weather data for demo purposes
// In production, integrate with OpenWeatherMap or WeatherAPI
const mockWeatherData: Record<string, { temp: number; condition: string; icon: string; humidity: number; wind: number }> = {
  "bali": { temp: 28, condition: "Partly Cloudy", icon: "⛅", humidity: 75, wind: 12 },
  "tokyo": { temp: 22, condition: "Clear", icon: "☀️", humidity: 55, wind: 8 },
  "paris": { temp: 18, condition: "Cloudy", icon: "☁️", humidity: 65, wind: 15 },
  "santorini": { temp: 26, condition: "Sunny", icon: "☀️", humidity: 50, wind: 18 },
  "new york": { temp: 15, condition: "Rainy", icon: "🌧️", humidity: 80, wind: 20 },
  "london": { temp: 12, condition: "Overcast", icon: "☁️", humidity: 70, wind: 22 },
  "sydney": { temp: 24, condition: "Sunny", icon: "☀️", humidity: 60, wind: 10 },
  "dubai": { temp: 35, condition: "Hot", icon: "🌡️", humidity: 40, wind: 5 },
  "iceland": { temp: 5, condition: "Cold", icon: "❄️", humidity: 85, wind: 30 },
  "maldives": { temp: 30, condition: "Tropical", icon: "🌴", humidity: 78, wind: 8 },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { location } = await req.json();
    
    if (!location) {
      return new Response(
        JSON.stringify({ error: "Location is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Getting weather for:", location);
    
    const normalizedLocation = location.toLowerCase();
    const weather = mockWeatherData[normalizedLocation] || {
      temp: Math.floor(Math.random() * 25) + 10,
      condition: "Variable",
      icon: "🌤️",
      humidity: Math.floor(Math.random() * 40) + 40,
      wind: Math.floor(Math.random() * 20) + 5,
    };

    // Generate 5-day forecast
    const forecast = Array.from({ length: 5 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return {
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        temp: weather.temp + Math.floor(Math.random() * 6) - 3,
        condition: weather.condition,
        icon: weather.icon,
      };
    });

    return new Response(
      JSON.stringify({
        location,
        current: weather,
        forecast,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in get-weather function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
