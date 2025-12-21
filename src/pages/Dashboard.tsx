import { Compass, Search, Sun, Cloud } from "lucide-react";
import { MobileLayout, FloatingActionButton } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { TripCard } from "@/components/ui/trip-card";
import { DestinationCard } from "@/components/ui/destination-card";
import { useNavigate } from "react-router-dom";
import { generateRoute } from "@/lib/routes";

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
];

const mockDestinations = [
  {
    id: "1",
    name: "Bali",
    location: "Indonesia",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400",
    budgetLevel: "moderate" as const,
    bestSeason: "Apr-Oct",
  },
  {
    id: "2",
    name: "Santorini",
    location: "Greece",
    imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400",
    budgetLevel: "luxury" as const,
    bestSeason: "May-Sep",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <MobileLayout
      headerTitle="TripTuner"
      headerActions={
        <Button variant="ghost" size="icon" className="min-w-touch min-h-touch">
          <Search className="h-5 w-5" />
        </Button>
      }
    >
      <div className="px-4 py-6 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2 animate-fade-in">
          <h1 className="font-display text-2xl font-bold">
            Good morning! 👋
          </h1>
          <p className="text-muted-foreground">Where shall we go today?</p>
        </div>

        {/* Weather Widget */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-ocean text-primary-foreground animate-slide-up">
          <div className="p-3 rounded-full bg-primary-foreground/20">
            <Sun className="h-6 w-6" />
          </div>
          <div>
            <p className="font-medium">Current Location</p>
            <p className="text-sm opacity-80">24°C • Partly Cloudy</p>
          </div>
          <Cloud className="h-8 w-8 ml-auto opacity-60" />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col gap-2"
            onClick={() => navigate("/chat")}
          >
            <Compass className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium">Chat with AI</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col gap-2"
            onClick={() => navigate("/discover")}
          >
            <Search className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium">Explore</span>
          </Button>
        </div>

        {/* Upcoming Trips */}
        {mockTrips.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Upcoming Trips</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate("/trips")}>
                View all
              </Button>
            </div>
            <div className="space-y-3">
              {mockTrips.map((trip) => (
                <TripCard
                  key={trip.id}
                  {...trip}
                  onClick={() => navigate(generateRoute.trip(trip.id))}
                />
              ))}
            </div>
          </section>
        )}

        {/* Recommended Destinations */}
        <section className="space-y-4">
          <h2 className="font-display text-lg font-semibold">Recommended for You</h2>
          <div className="grid grid-cols-2 gap-4">
            {mockDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                {...destination}
                onClick={() => navigate(generateRoute.destination(destination.id))}
              />
            ))}
          </div>
        </section>
      </div>

      <FloatingActionButton />
    </MobileLayout>
  );
}