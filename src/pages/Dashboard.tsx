import { useState, useEffect } from "react";
import { Compass, Search, Sun, Cloud, MapPin, Sparkles, MessageCircle, ArrowRight, TrendingUp } from "lucide-react";
import { MobileLayout, FloatingActionButton } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { TripCard } from "@/components/ui/trip-card";
import { DestinationCard } from "@/components/ui/destination-card";
import { MoodButton } from "@/components/ui/mood-button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { generateRoute, ROUTES } from "@/lib/routes";
import { destinations, getDestinationsByMood, getRandomDestinations, type Mood } from "@/data/destinations";

// Placeholder data
const mockTrips = [
  {
    id: "1",
    title: "Tokyo Adventure",
    destination: "Tokyo, Japan",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400",
    startDate: "2024-03-15",
    endDate: "2024-03-25",
    status: "upcoming" as const,
  },
  {
    id: "2",
    title: "Bali Retreat",
    destination: "Bali, Indonesia",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400",
    startDate: "2024-04-01",
    endDate: "2024-04-10",
    status: "draft" as const,
  },
];

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

        {/* Weather Widget */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-ocean text-primary-foreground animate-slide-up">
          <div className="p-3 rounded-full bg-primary-foreground/20">
            <Sun className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="font-medium">Current Location</p>
            <div className="flex items-center gap-1 text-sm opacity-80">
              <MapPin className="h-3 w-3" />
              <span>San Francisco, CA</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">24°C</p>
            <p className="text-xs opacity-80">Partly Cloudy</p>
          </div>
          <Cloud className="h-8 w-8 opacity-40" />
        </div>

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

        {/* Upcoming Trips */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Your Trips</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.TRIPS)}>
              View all
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          {mockTrips.length > 0 ? (
            <div className="space-y-3">
              {mockTrips.slice(0, 2).map((trip) => (
                <TripCard
                  key={trip.id}
                  {...trip}
                  onClick={() => navigate(generateRoute.trip(trip.id))}
                />
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-xl border border-dashed border-border text-center">
              <p className="text-muted-foreground mb-3">No trips planned yet</p>
              <Button onClick={() => navigate(ROUTES.CREATE_TRIP)}>
                Plan your first trip
              </Button>
            </div>
          )}
        </section>
      </div>

      <FloatingActionButton />
    </MobileLayout>
  );
}
