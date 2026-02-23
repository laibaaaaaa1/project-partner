import { useState } from "react";
import { Sun, Cloud, MapPin, RefreshCw, Edit2, Check } from "lucide-react";
import { useWeather } from "@/hooks/useWeather";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface WeatherWidgetProps {
  location?: string;
  onLocationChange?: (location: string) => void;
  className?: string;
}

export function WeatherWidget({ location = "San Francisco", onLocationChange, className }: WeatherWidgetProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(location);
  const { weather, isLoading, error, refresh, fetchWeather } = useWeather(location);

  const getWeatherIcon = (icon?: string) => {
    if (!icon) return <Sun className="h-6 w-6" />;
    return <span className="text-2xl">{icon}</span>;
  };

  const handleLocationSubmit = () => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== location) {
      onLocationChange?.(trimmed);
      fetchWeather(trimmed);
    }
    setIsEditing(false);
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
        <Button variant="ghost" size="icon" onClick={refresh} className="text-primary-foreground hover:bg-primary-foreground/20">
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
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLocationSubmit()}
              className="h-8 text-sm bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50"
              placeholder="Enter city name"
              autoFocus
            />
            <Button size="icon" variant="ghost" onClick={handleLocationSubmit} className="h-8 w-8 shrink-0 text-primary-foreground hover:bg-primary-foreground/20">
              <Check className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <p className="font-medium">{weather?.current.condition || "Loading..."}</p>
            <button
              onClick={() => { setEditValue(location); setIsEditing(true); }}
              className="flex items-center gap-1 text-sm opacity-80 hover:opacity-100 transition-opacity"
            >
              <MapPin className="h-3 w-3" />
              <span className="truncate">{weather?.location || location}</span>
              <Edit2 className="h-3 w-3 ml-1" />
            </button>
          </>
        )}
      </div>
      {!isEditing && (
        <div className="text-right shrink-0">
          <p className="text-2xl font-bold">{weather?.current.temp ?? "--"}°C</p>
          <p className="text-xs opacity-80">
            💧 {weather?.current.humidity ?? "--"}% · 💨 {weather?.current.wind ?? "--"} km/h
          </p>
        </div>
      )}
    </div>
  );
}
