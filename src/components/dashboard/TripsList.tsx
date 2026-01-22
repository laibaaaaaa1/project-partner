import { useNavigate } from "react-router-dom";
import { TripCard } from "@/components/ui/trip-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import { generateRoute, ROUTES } from "@/lib/routes";
import { useTrips } from "@/hooks/useTrips";
import type { Trip, TripStatus } from "@/types/trip";

interface TripsListProps {
  maxItems?: number;
  showViewAll?: boolean;
}

export function TripsList({ maxItems = 2, showViewAll = true }: TripsListProps) {
  const navigate = useNavigate();
  const { data: trips, isLoading, error } = useTrips();

  const getImageForDestination = (destination?: string): string => {
    const images: Record<string, string> = {
      tokyo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400",
      paris: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400",
      bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400",
      london: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400",
      default: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400",
    };

    if (!destination) return images.default;
    const lowerDest = destination.toLowerCase();
    for (const [key, url] of Object.entries(images)) {
      if (lowerDest.includes(key)) return url;
    }
    return images.default;
  };

  const mapStatus = (status: string): "upcoming" | "ongoing" | "past" | "draft" => {
    const validStatuses = ["upcoming", "ongoing", "past", "draft"];
    if (validStatuses.includes(status)) {
      return status as "upcoming" | "ongoing" | "past" | "draft";
    }
    // Map database statuses to UI statuses
    if (status === "planned") return "upcoming";
    if (status === "completed" || status === "cancelled") return "past";
    return "draft";
  };

  if (isLoading) {
    return (
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Your Trips</h2>
        </div>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-3 p-3 rounded-xl border border-border">
              <Skeleton className="w-20 h-20 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-4">
        <h2 className="font-display text-lg font-semibold">Your Trips</h2>
        <div className="p-6 rounded-xl border border-destructive/20 bg-destructive/5 text-center">
          <p className="text-muted-foreground">Failed to load trips</p>
        </div>
      </section>
    );
  }

  const displayTrips = trips?.slice(0, maxItems) || [];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">Your Trips</h2>
        {showViewAll && trips && trips.length > 0 && (
          <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.TRIPS)}>
            View all
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </div>

      {displayTrips.length > 0 ? (
        <div className="space-y-3">
          {displayTrips.map((trip: Trip) => (
            <TripCard
              key={trip.id}
              id={trip.id}
              title={trip.title}
              destination={trip.destinations?.[0]?.name || "Unknown destination"}
              imageUrl={getImageForDestination(trip.destinations?.[0]?.name)}
              startDate={trip.start_date || ""}
              endDate={trip.end_date || ""}
              status={mapStatus(trip.status)}
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
  );
}
