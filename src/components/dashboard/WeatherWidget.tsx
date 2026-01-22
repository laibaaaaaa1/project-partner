import { useState, useEffect } from "react";
import { Sun, Cloud, MapPin, RefreshCw } from "lucide-react";
import { useWeather } from "@/hooks/useWeather";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface WeatherWidgetProps {
  location?: string;
  className?: string;
}

export function WeatherWidget({ location = "San Francisco", className }: WeatherWidgetProps) {
  const { weather, isLoading, error, refresh } = useWeather(location);

  const getWeatherIcon = (icon?: string) => {
    if (!icon) return <Sun className="h-6 w-6" />;
    // Return the emoji if available, otherwise show Sun icon
    return <span className="text-2xl">{icon}</span>;
  };

  if (isLoading) {
    return (
      <div className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-ocean text-primary-foreground ${className}`}>
        <Skeleton className="h-12 w-12 rounded-full bg-primary-foreground/20" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-24 bg-primary-foreground/20" />
          <Skeleton className="h-3 w-32 bg-primary-foreground/20" />
        </div>
        <div className="text-right space-y-2">
          <Skeleton className="h-6 w-12 bg-primary-foreground/20" />
          <Skeleton className="h-3 w-16 bg-primary-foreground/20" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-ocean text-primary-foreground ${className}`}>
        <div className="p-3 rounded-full bg-primary-foreground/20">
          <Cloud className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <p className="font-medium">Weather unavailable</p>
          <p className="text-sm opacity-80">{location}</p>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={refresh}
          className="text-primary-foreground hover:bg-primary-foreground/20"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-ocean text-primary-foreground animate-slide-up ${className}`}>
      <div className="p-3 rounded-full bg-primary-foreground/20">
        {getWeatherIcon(weather?.current.icon)}
      </div>
      <div className="flex-1">
        <p className="font-medium">{weather?.location || location}</p>
        <div className="flex items-center gap-1 text-sm opacity-80">
          <MapPin className="h-3 w-3" />
          <span>{weather?.location || location}</span>
        </div>
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold">{weather?.current.temp ?? "--"}°C</p>
        <p className="text-xs opacity-80">{weather?.current.condition || "Loading..."}</p>
      </div>
      {weather?.current.icon && (
        <div className="opacity-40">
          <Cloud className="h-8 w-8" />
        </div>
      )}
    </div>
  );
}
