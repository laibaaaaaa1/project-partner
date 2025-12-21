import { useState } from "react";
import { Plus } from "lucide-react";
import { MobileLayout, FloatingActionButton } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TripCard } from "@/components/ui/trip-card";
import { useNavigate } from "react-router-dom";
import { generateRoute } from "@/lib/routes";

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
  ],
  draft: [
    {
      id: "3",
      title: "Untitled Trip",
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

  return (
    <MobileLayout headerTitle="My Trips">
      <div className="px-4 py-6 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6 space-y-3">
            {mockTrips.upcoming.length > 0 ? (
              mockTrips.upcoming.map((trip) => (
                <TripCard
                  key={trip.id}
                  {...trip}
                  onClick={() => navigate(generateRoute.trip(trip.id))}
                />
              ))
            ) : (
              <EmptyState />
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-6 space-y-3">
            {mockTrips.past.map((trip) => (
              <TripCard
                key={trip.id}
                {...trip}
                onClick={() => navigate(generateRoute.trip(trip.id))}
              />
            ))}
          </TabsContent>

          <TabsContent value="draft" className="mt-6 space-y-3">
            {mockTrips.draft.map((trip) => (
              <TripCard
                key={trip.id}
                {...trip}
                onClick={() => navigate(generateRoute.trip(trip.id))}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <FloatingActionButton />
    </MobileLayout>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="p-4 rounded-full bg-muted mb-4">
        <Plus className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="font-display font-semibold mb-1">No trips yet</h3>
      <p className="text-sm text-muted-foreground">
        Start planning your next adventure!
      </p>
    </div>
  );
}