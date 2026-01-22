import { useState, useEffect } from "react";
import { Compass, Search, Sun, Sparkles, MessageCircle, ArrowRight, TrendingUp } from "lucide-react";
import { MobileLayout, FloatingActionButton } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { DestinationCard } from "@/components/ui/destination-card";
import { MoodButton } from "@/components/ui/mood-button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { generateRoute, ROUTES } from "@/lib/routes";
import { getDestinationsByMood, getRandomDestinations, type Mood } from "@/data/destinations";
import { WeatherWidget, TripsList } from "@/components/dashboard";

const moods: { id: Mood; label: string; icon: typeof Sun }[] = [
  { id: "relaxing", label: "Relaxing", icon: Sun },
  { id: "adventure", label: "Adventure", icon: TrendingUp },
  { id: "cultural", label: "Cultural", icon: Compass },
  { id: "romantic", label: "Romantic", icon: Sparkles },
];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayedDestinations, setDisplayedDestinations] = useState(getRandomDestinations(4));
  const [currentLocation] = useState("San Francisco");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedMood) {
      setDisplayedDestinations(getDestinationsByMood(selectedMood).slice(0, 4));
    } else {
      setDisplayedDestinations(getRandomDestinations(4));
    }
  }, [selectedMood]);

  return (
    <MobileLayout
      headerTitle="TripTuner"
      headerActions={
        <Button 
          variant="ghost" 
          size="icon" 
          className="min-w-touch min-h-touch"
          onClick={() => navigate(ROUTES.DISCOVER)}
        >
          <Search className="h-5 w-5" />
        </Button>
      }
    >
      <div className="px-4 py-6 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2 animate-fade-in">
          <h1 className="font-display text-2xl font-bold">
            {getGreeting()}! 👋
          </h1>
          <p className="text-muted-foreground">Where shall we go today?</p>
        </div>

        {/* Dynamic Weather Widget */}
        <WeatherWidget location={currentLocation} />

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="h-auto py-5 flex flex-col gap-2 border-2 hover:border-primary/50 transition-all"
            onClick={() => navigate(ROUTES.CHAT)}
          >
            <div className="p-2 rounded-full bg-primary/10">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-medium">Chat with AI</span>
            <span className="text-xs text-muted-foreground">Get travel advice</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-5 flex flex-col gap-2 border-2 hover:border-primary/50 transition-all"
            onClick={() => navigate(ROUTES.DISCOVER)}
          >
            <div className="p-2 rounded-full bg-secondary/10">
              <Compass className="h-5 w-5 text-secondary" />
            </div>
            <span className="text-sm font-medium">Explore</span>
            <span className="text-xs text-muted-foreground">Discover places</span>
          </Button>
        </div>

        {/* Mood-Based Suggestions */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">How are you feeling?</h2>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {moods.map((mood) => (
              <MoodButton
                key={mood.id}
                icon={mood.icon}
                label={mood.label}
                selected={selectedMood === mood.id}
                onClick={() => setSelectedMood(selectedMood === mood.id ? null : mood.id)}
              />
            ))}
          </div>
        </section>

        {/* Recommended Destinations */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">
              {selectedMood 
                ? `${selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)} Escapes` 
                : "Recommended for You"
              }
            </h2>
            <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.DISCOVER)}>
              See all
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="aspect-[4/3] rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {displayedDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  {...destination}
                  onClick={() => navigate(generateRoute.destination(destination.id))}
                />
              ))}
            </div>
          )}
        </section>

        {/* Real Trips from Database */}
        <TripsList maxItems={2} showViewAll />
      </div>

      <FloatingActionButton />
    </MobileLayout>
  );
}
