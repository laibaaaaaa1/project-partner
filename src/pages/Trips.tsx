import { useState } from "react";
import { Plus, Search, Filter, MapPin, Calendar } from "lucide-react";
import { MobileLayout, FloatingActionButton } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TripCard } from "@/components/ui/trip-card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { generateRoute, ROUTES } from "@/lib/routes";

const mockTrips = {
  upcoming: [
    {
      id: "1",
      title: "Tokyo Adventure",
      destination: "Tokyo, Japan",
      imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400",
      startDate: "2024-03-15",
      endDate: "2024-03-25",
      status: "upcoming" as const,
      daysUntil: 45,
    },
    {
      id: "4",
      title: "Barcelona Escape",
      destination: "Barcelona, Spain",
      imageUrl: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400",
      startDate: "2024-05-10",
      endDate: "2024-05-17",
      status: "upcoming" as const,
      daysUntil: 90,
    },
  ],
  past: [
    {
      id: "2",
      title: "Paris Romance",
      destination: "Paris, France",
      imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400",
      startDate: "2023-12-20",
      endDate: "2023-12-28",
      status: "past" as const,
    },
    {
      id: "5",
      title: "New York City Trip",
      destination: "New York, USA",
      imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400",
      startDate: "2023-09-05",
      endDate: "2023-09-12",
      status: "past" as const,
    },
  ],
  draft: [
    {
      id: "3",
      title: "Bali Retreat",
      destination: "Bali, Indonesia",
      imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400",
      startDate: "2024-06-01",
      endDate: "2024-06-10",
      status: "draft" as const,
    },
  ],
};

export default function Trips() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");

  const filterTrips = <T extends { title: string; destination: string }>(trips: T[]): T[] => {
    if (!searchQuery) return trips;
    return trips.filter(
      (trip) =>
        trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.destination.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const totalTrips = mockTrips.upcoming.length + mockTrips.past.length + mockTrips.draft.length;

  return (
    <MobileLayout headerTitle="My Trips">
      <div className="px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-center">
            <p className="text-2xl font-bold text-primary">{mockTrips.upcoming.length}</p>
            <p className="text-xs text-muted-foreground">Upcoming</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/50 border border-border text-center">
            <p className="text-2xl font-bold">{mockTrips.past.length}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/50 border border-border text-center">
            <p className="text-2xl font-bold">{mockTrips.draft.length}</p>
            <p className="text-xs text-muted-foreground">Drafts</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search trips..."
            className="pl-10 h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="upcoming" className="relative">
              Upcoming
              {mockTrips.upcoming.length > 0 && (
                <Badge variant="secondary" className="ml-1.5 h-5 w-5 p-0 justify-center">
                  {mockTrips.upcoming.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="draft">
              Drafts
              {mockTrips.draft.length > 0 && (
                <Badge variant="secondary" className="ml-1.5 h-5 w-5 p-0 justify-center">
                  {mockTrips.draft.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6 space-y-4">
            {filterTrips(mockTrips.upcoming).length > 0 ? (
              <>
                {/* Next Trip Highlight */}
                {mockTrips.upcoming[0] && (
                  <div 
                    className="relative rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => navigate(generateRoute.trip(mockTrips.upcoming[0].id))}
                  >
                    <img
                      src={mockTrips.upcoming[0].imageUrl}
                      alt={mockTrips.upcoming[0].title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <Badge className="mb-2 bg-primary/90">Next Trip</Badge>
                      <h3 className="font-display text-xl font-bold">{mockTrips.upcoming[0].title}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm opacity-90">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {mockTrips.upcoming[0].destination}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          In {mockTrips.upcoming[0].daysUntil} days
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Other Trips */}
                {filterTrips(mockTrips.upcoming).slice(1).map((trip) => (
                  <TripCard
                    key={trip.id}
                    {...trip}
                    onClick={() => navigate(generateRoute.trip(trip.id))}
                  />
                ))}
              </>
            ) : (
              <EmptyState 
                title="No upcoming trips"
                description="Start planning your next adventure!"
                onAction={() => navigate(ROUTES.CREATE_TRIP)}
              />
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-6 space-y-3">
            {filterTrips(mockTrips.past).length > 0 ? (
              filterTrips(mockTrips.past).map((trip) => (
                <TripCard
                  key={trip.id}
                  {...trip}
                  onClick={() => navigate(generateRoute.trip(trip.id))}
                />
              ))
            ) : (
              <EmptyState 
                title="No past trips"
                description="Your completed trips will appear here"
              />
            )}
          </TabsContent>

          <TabsContent value="draft" className="mt-6 space-y-3">
            {filterTrips(mockTrips.draft).length > 0 ? (
              filterTrips(mockTrips.draft).map((trip) => (
                <TripCard
                  key={trip.id}
                  {...trip}
                  onClick={() => navigate(generateRoute.trip(trip.id))}
                />
              ))
            ) : (
              <EmptyState 
                title="No drafts"
                description="Unfinished trip plans will appear here"
              />
            )}
          </TabsContent>
        </Tabs>
      </div>

      <FloatingActionButton />
    </MobileLayout>
  );
}

function EmptyState({ 
  title, 
  description, 
  onAction 
}: { 
  title: string; 
  description: string; 
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="p-4 rounded-full bg-muted mb-4">
        <Plus className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="font-display font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      {onAction && (
        <Button onClick={onAction}>
          Create Trip
        </Button>
      )}
    </div>
  );
}
