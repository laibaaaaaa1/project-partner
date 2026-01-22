import { useState, useMemo } from "react";
import { Plus, Search, MapPin, Calendar, Loader2, Plane } from "lucide-react";
import { MobileLayout, FloatingActionButton } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TripCard } from "@/components/ui/trip-card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { generateRoute, ROUTES } from "@/lib/routes";
import { useTrips } from "@/hooks/useTrips";
import { Trip } from "@/types/trip";
import { differenceInDays, parseISO, isBefore, isAfter, isToday } from "date-fns";

export default function Trips() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: trips = [], isLoading, error } = useTrips();

  // Categorize trips based on dates and status
  const categorizedTrips = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const upcoming: Trip[] = [];
    const past: Trip[] = [];
    const draft: Trip[] = [];

    trips.forEach((trip) => {
      const startDate = parseISO(trip.start_date);
      const endDate = parseISO(trip.end_date);

      if (trip.status === 'draft') {
        draft.push(trip);
      } else if (trip.status === 'completed' || isBefore(endDate, today)) {
        past.push(trip);
      } else if (isAfter(startDate, today) || isToday(startDate) || 
                 (isBefore(startDate, today) && isAfter(endDate, today))) {
        upcoming.push(trip);
      } else {
        past.push(trip);
      }
    });

    // Sort upcoming by start date (soonest first)
    upcoming.sort((a, b) => parseISO(a.start_date).getTime() - parseISO(b.start_date).getTime());
    // Sort past by end date (most recent first)
    past.sort((a, b) => parseISO(b.end_date).getTime() - parseISO(a.end_date).getTime());

    return { upcoming, past, draft };
  }, [trips]);

  const filterTrips = (tripsList: Trip[]): Trip[] => {
    if (!searchQuery) return tripsList;
    return tripsList.filter((trip) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesTitle = trip.title.toLowerCase().includes(searchLower);
      const matchesDestination = trip.destinations?.some(d => 
        d.name.toLowerCase().includes(searchLower) ||
        d.country?.toLowerCase().includes(searchLower)
      );
      return matchesTitle || matchesDestination;
    });
  };

  const getDestinationString = (trip: Trip): string => {
    if (!trip.destinations || trip.destinations.length === 0) return 'No destination';
    const firstDest = trip.destinations[0];
    return firstDest.country ? `${firstDest.name}, ${firstDest.country}` : firstDest.name;
  };

  const getDaysUntil = (trip: Trip): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return differenceInDays(parseISO(trip.start_date), today);
  };


  if (isLoading) {
    return (
      <MobileLayout headerTitle="My Trips">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </MobileLayout>
    );
  }

  if (error) {
    return (
      <MobileLayout headerTitle="My Trips">
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
          <p className="text-destructive mb-4">Failed to load trips</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </MobileLayout>
    );
  }

  

  return (
    <MobileLayout headerTitle="My Trips">
      <div className="px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-center">
            <p className="text-2xl font-bold text-primary">{categorizedTrips.upcoming.length}</p>
            <p className="text-xs text-muted-foreground">Upcoming</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/50 border border-border text-center">
            <p className="text-2xl font-bold">{categorizedTrips.past.length}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/50 border border-border text-center">
            <p className="text-2xl font-bold">{categorizedTrips.draft.length}</p>
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
              {categorizedTrips.upcoming.length > 0 && (
                <Badge variant="secondary" className="ml-1.5 h-5 w-5 p-0 justify-center">
                  {categorizedTrips.upcoming.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="draft">
              Drafts
              {categorizedTrips.draft.length > 0 && (
                <Badge variant="secondary" className="ml-1.5 h-5 w-5 p-0 justify-center">
                  {categorizedTrips.draft.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6 space-y-4">
            {filterTrips(categorizedTrips.upcoming).length > 0 ? (
              <>
                {/* Next Trip Highlight */}
                {categorizedTrips.upcoming[0] && (
                  <NextTripCard 
                    trip={categorizedTrips.upcoming[0]} 
                    onClick={() => navigate(generateRoute.trip(categorizedTrips.upcoming[0].id))}
                    getDestinationString={getDestinationString}
                    getDaysUntil={getDaysUntil}
                  />
                )}

                {/* Other Trips */}
                {filterTrips(categorizedTrips.upcoming).slice(1).map((trip) => (
                  <TripCard
                    key={trip.id}
                    id={trip.id}
                    title={trip.title}
                    destination={getDestinationString(trip)}
                    imageUrl={trip.cover_image_url || getDefaultTripImage(trip)}
                    startDate={trip.start_date}
                    endDate={trip.end_date}
                    status="upcoming"
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
            {filterTrips(categorizedTrips.past).length > 0 ? (
              filterTrips(categorizedTrips.past).map((trip) => (
                <TripCard
                  key={trip.id}
                  id={trip.id}
                  title={trip.title}
                  destination={getDestinationString(trip)}
                  imageUrl={trip.cover_image_url || getDefaultTripImage(trip)}
                  startDate={trip.start_date}
                  endDate={trip.end_date}
                  status="past"
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
            {filterTrips(categorizedTrips.draft).length > 0 ? (
              filterTrips(categorizedTrips.draft).map((trip) => (
                <TripCard
                  key={trip.id}
                  id={trip.id}
                  title={trip.title}
                  destination={getDestinationString(trip)}
                  imageUrl={trip.cover_image_url || getDefaultTripImage(trip)}
                  startDate={trip.start_date}
                  endDate={trip.end_date}
                  status="draft"
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

function NextTripCard({ 
  trip, 
  onClick, 
  getDestinationString,
  getDaysUntil 
}: { 
  trip: Trip; 
  onClick: () => void;
  getDestinationString: (trip: Trip) => string;
  getDaysUntil: (trip: Trip) => number;
}) {
  const daysUntil = getDaysUntil(trip);
  const destination = getDestinationString(trip);
  
  return (
    <div 
      className="relative rounded-xl overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      <img
        src={trip.cover_image_url || getDefaultTripImage(trip)}
        alt={trip.title}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <Badge className="mb-2 bg-primary/90">Next Trip</Badge>
        <h3 className="font-display text-xl font-bold">{trip.title}</h3>
        <div className="flex items-center gap-4 mt-2 text-sm opacity-90">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {destination}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {daysUntil === 0 ? 'Today!' : daysUntil < 0 ? 'Ongoing' : `In ${daysUntil} days`}
          </div>
        </div>
      </div>
    </div>
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
        <Plane className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="font-display font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      {onAction && (
        <Button onClick={onAction}>
          <Plus className="h-4 w-4 mr-2" />
          Create Trip
        </Button>
      )}
    </div>
  );
}

// Helper function to get a default image based on destination
function getDefaultTripImage(trip: Trip): string {
  const destinations = trip.destinations || [];
  if (destinations.length === 0) {
    return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400';
  }
  
  const country = destinations[0].country?.toLowerCase() || '';
  const name = destinations[0].name.toLowerCase();
  
  // Map common destinations to images
  const imageMap: Record<string, string> = {
    'japan': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
    'tokyo': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
    'france': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400',
    'paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400',
    'spain': 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400',
    'barcelona': 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400',
    'indonesia': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400',
    'bali': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400',
    'usa': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400',
    'new york': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400',
    'italy': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400',
    'rome': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400',
    'thailand': 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400',
    'bangkok': 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400',
    'greece': 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400',
    'santorini': 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400',
  };

  return imageMap[country] || imageMap[name] || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400';
}
