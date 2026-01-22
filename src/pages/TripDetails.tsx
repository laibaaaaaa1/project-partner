import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Share2,
  Edit3,
  Clock,
  Users,
  Plus,
  Trash2,
  Upload,
  MoreVertical,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useTrip, useDeleteTrip } from "@/hooks/useTrips";
import { BudgetTracker } from "@/components/trips/BudgetTracker";
import { PackingListView } from "@/components/trips/PackingListView";
import { ActivityCard } from "@/components/trips/ActivityCard";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget";
import { ROUTES } from "@/lib/routes";
import type { Activity, Destination } from "@/types/trip";
import { format, differenceInDays, parseISO } from "date-fns";

export default function TripDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("itinerary");
  
  const { data: trip, isLoading, error } = useTrip(id);
  const deleteTripMutation = useDeleteTrip();

  const handleShare = async () => {
    if (!trip) return;
    if (navigator.share) {
      await navigator.share({
        title: trip.title,
        text: `Check out my trip to ${trip.destinations?.[0]?.name || "somewhere amazing"}!`,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (confirm("Are you sure you want to delete this trip?")) {
      await deleteTripMutation.mutateAsync(id);
      navigate(ROUTES.TRIPS);
    }
  };

  const formatDateRange = (startDate?: string, endDate?: string) => {
    if (!startDate || !endDate) return "Dates not set";
    try {
      const start = parseISO(startDate);
      const end = parseISO(endDate);
      return `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`;
    } catch {
      return "Invalid dates";
    }
  };

  const getDaysUntil = (startDate?: string) => {
    if (!startDate) return 0;
    try {
      const start = parseISO(startDate);
      const today = new Date();
      const diff = differenceInDays(start, today);
      return diff > 0 ? diff : 0;
    } catch {
      return 0;
    }
  };

  const getDestinationImage = (destination?: Destination): string => {
    const defaultImages: Record<string, string> = {
      tokyo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
      paris: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
      bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
      london: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
      default: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
    };
    
    if (!destination?.name) return defaultImages.default;
    const name = destination.name.toLowerCase();
    for (const [key, url] of Object.entries(defaultImages)) {
      if (name.includes(key)) return url;
    }
    return defaultImages.default;
  };

  // Group activities by destination and order
  const groupActivitiesByDestination = (destinations?: Destination[]) => {
    if (!destinations) return [];
    
    return destinations.map((dest, index) => {
      const activities = dest.activities || [];
      const sortedActivities = [...activities].sort((a, b) => {
        if (a.order_index !== b.order_index) {
          return a.order_index - b.order_index;
        }
        if (!a.start_time || !b.start_time) return 0;
        return a.start_time.localeCompare(b.start_time);
      });

      return {
        day: index + 1,
        date: `Day ${index + 1}`,
        title: dest.name || "Activities",
        activities: sortedActivities,
      };
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-safe">
        <Skeleton className="h-56 w-full" />
        <div className="px-4 py-4 space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex gap-4">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-6">
          <p className="text-muted-foreground mb-4">Trip not found</p>
          <Button onClick={() => navigate(ROUTES.TRIPS)}>Go to Trips</Button>
        </div>
      </div>
    );
  }

  const daysUntil = getDaysUntil(trip.start_date);
  const destinationName = trip.destinations?.[0]?.name || "Unknown destination";
  const heroImage = getDestinationImage(trip.destinations?.[0]);
  const itineraryDays = groupActivitiesByDestination(trip.destinations);

  return (
    <div className="min-h-screen bg-background pb-safe">
      {/* Hero */}
      <div className="relative h-56">
        <img
          src={heroImage}
          alt={trip.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        {/* Top Actions */}
        <div className="absolute top-0 left-0 right-0 pt-safe px-4 py-4 flex justify-between">
          <Button
            variant="secondary"
            size="icon"
            className="bg-background/80 backdrop-blur-sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              size="icon" 
              className="bg-background/80 backdrop-blur-sm"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="bg-background/80 backdrop-blur-sm">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate(`${ROUTES.CREATE_TRIP}?edit=${id}`)}>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Trip
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-destructive"
                  onClick={handleDelete}
                  disabled={deleteTripMutation.isPending}
                >
                  {deleteTripMutation.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4 mr-2" />
                  )}
                  Delete Trip
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-2">
            {daysUntil > 0 && (
              <Badge className="bg-primary/90">{daysUntil} days to go</Badge>
            )}
            <Badge variant="outline" className="bg-background/50 backdrop-blur-sm capitalize">
              {trip.status}
            </Badge>
          </div>
          <h1 className="font-display text-2xl font-bold">{trip.title}</h1>
          <div className="flex items-center gap-2 text-muted-foreground mt-1">
            <MapPin className="h-4 w-4" />
            <span>{destinationName}</span>
          </div>
        </div>
      </div>

      {/* Quick Info Bar */}
      <div className="px-4 py-4 flex items-center gap-6 border-b border-border overflow-x-auto">
        <div className="flex items-center gap-2 shrink-0">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="text-sm">{formatDateRange(trip.start_date, trip.end_date)}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Users className="h-4 w-4 text-primary" />
          <span className="text-sm">{trip.collaborators?.length || 1} traveler(s)</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <DollarSign className="h-4 w-4 text-primary" />
          <span className="text-sm">{trip.currency || "USD"}</span>
        </div>
      </div>

      {/* Weather for destination */}
      {destinationName && (
        <div className="px-4 py-3 border-b border-border">
          <WeatherWidget location={destinationName.split(",")[0]} />
        </div>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4 py-4">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="packing">Packing</TabsTrigger>
          <TabsTrigger value="docs">Docs</TabsTrigger>
        </TabsList>

        {/* Itinerary Tab */}
        <TabsContent value="itinerary" className="mt-6 space-y-4">
          {itineraryDays.length > 0 ? (
            itineraryDays.map((day) => (
              <div key={`${day.day}-${day.date}`} className="rounded-xl border border-border overflow-hidden">
                <div className="flex items-center gap-3 p-4 bg-muted/30 border-b border-border">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="font-bold text-primary-foreground">{day.day}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold">{day.title}</h3>
                    <p className="text-xs text-muted-foreground">{day.date}</p>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {day.activities.length > 0 ? (
                    day.activities.map((activity) => (
                      <ActivityCard
                        key={activity.id}
                        activity={activity}
                        showDragHandle={false}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No activities for this day yet
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center border border-dashed border-border rounded-xl">
              <Clock className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground mb-4">No activities planned yet</p>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Activity
              </Button>
            </div>
          )}
          <Button variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Day
          </Button>
        </TabsContent>

        {/* Budget Tab */}
        <TabsContent value="budget" className="mt-6">
          <BudgetTracker 
            tripId={id || ""} 
            totalBudget={trip.budget || 0} 
            currency={trip.currency || "USD"} 
          />
        </TabsContent>

        {/* Packing Tab */}
        <TabsContent value="packing" className="mt-6">
          <PackingListView tripId={id || ""} />
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="docs" className="mt-6 space-y-4">
          <div className="p-8 text-center border border-dashed border-border rounded-xl">
            <Upload className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground mb-4">No documents uploaded yet</p>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
