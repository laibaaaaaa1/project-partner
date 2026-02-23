import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  DollarSign, 
  MapPin,
  Clock,
  Utensils,
  Car,
  Hotel,
  Compass,
  Lightbulb,
  CheckSquare,
  Share2,
  Download,
  Edit2,
  Loader2
} from "lucide-react";
import { useCreateTrip, useCreateDestination, useCreateActivity } from "@/hooks/useTrips";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import type { GeneratedItinerary, TripActivity } from "@/hooks/useItineraryGeneration";

const getActivityIcon = (type: TripActivity["type"]) => {
  switch (type) {
    case "meal":
      return Utensils;
    case "transport":
      return Car;
    case "accommodation":
      return Hotel;
    default:
      return Compass;
  }
};

const getActivityColor = (type: TripActivity["type"]) => {
  switch (type) {
    case "meal":
      return "bg-orange-500/10 text-orange-600 border-orange-500/20";
    case "transport":
      return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    case "accommodation":
      return "bg-purple-500/10 text-purple-600 border-purple-500/20";
    default:
      return "bg-primary/10 text-primary border-primary/20";
  }
};

export default function GeneratedItinerary() {
  const location = useLocation();
  const navigate = useNavigate();
  const itinerary = location.state?.itinerary as GeneratedItinerary | undefined;
  const [isSaving, setIsSaving] = useState(false);
  const createTrip = useCreateTrip();
  const createDestination = useCreateDestination();
  const createActivity = useCreateActivity();

  if (!itinerary) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
        <p className="text-muted-foreground mb-4">No itinerary found</p>
        <Button onClick={() => navigate("/create-trip")}>
          Create a Trip
        </Button>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const handleShare = () => {
    toast.success("Sharing coming soon!");
  };

  const handleDownload = () => {
    toast.success("Download coming soon!");
  };

  const travelStyleLabels: Record<string, string> = {
    adventure: "Adventure",
    luxury: "Luxury",
    budget: "Budget",
    cultural: "Cultural",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="relative h-48 bg-gradient-to-br from-primary via-primary/80 to-secondary">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center gap-4 pt-safe">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1" />
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20"
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20"
            onClick={handleDownload}
          >
            <Download className="h-5 w-5" />
          </Button>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="font-display text-2xl font-bold text-white">
            {itinerary.destination}
          </h1>
          <div className="flex items-center gap-4 mt-2 text-white/90 text-sm">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {itinerary.totalDays} days
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {itinerary.travelers}
            </span>
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              {travelStyleLabels[itinerary.travelStyle] || itinerary.travelStyle}
            </Badge>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4 -mt-4 relative z-10">
        <Card className="border-0 shadow-lg">
          <CardContent className="grid grid-cols-3 gap-4 p-4">
            <div className="text-center">
              <Calendar className="h-5 w-5 mx-auto text-primary mb-1" />
              <p className="text-xs text-muted-foreground">Dates</p>
              <p className="text-sm font-medium">
                {formatDate(itinerary.startDate).split(",")[0]}
              </p>
            </div>
            <div className="text-center border-x border-border">
              <DollarSign className="h-5 w-5 mx-auto text-primary mb-1" />
              <p className="text-xs text-muted-foreground">Budget</p>
              <p className="text-sm font-medium">${itinerary.budget.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <MapPin className="h-5 w-5 mx-auto text-primary mb-1" />
              <p className="text-xs text-muted-foreground">Activities</p>
              <p className="text-sm font-medium">
                {itinerary.days.reduce((acc, day) => acc + day.activities.length, 0)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="itinerary" className="mt-4">
        <TabsList className="w-full justify-start px-4 bg-transparent border-b rounded-none h-auto pb-0">
          <TabsTrigger 
            value="itinerary" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3"
          >
            Itinerary
          </TabsTrigger>
          <TabsTrigger 
            value="packing" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3"
          >
            Packing
          </TabsTrigger>
          <TabsTrigger 
            value="tips" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3"
          >
            Tips
          </TabsTrigger>
        </TabsList>

        <TabsContent value="itinerary" className="mt-0">
          <ScrollArea className="h-[calc(100vh-320px)]">
            <div className="p-4 space-y-6">
              {itinerary.days.map((day) => (
                <div key={day.day}>
                  {/* Day Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                      {day.day}
                    </div>
                    <div>
                      <h3 className="font-semibold">{day.title}</h3>
                      <p className="text-sm text-muted-foreground">{formatDate(day.date)}</p>
                    </div>
                  </div>

                  {/* Activities Timeline */}
                  <div className="ml-5 border-l-2 border-border pl-6 space-y-4">
                    {day.activities.map((activity, idx) => {
                      const Icon = getActivityIcon(activity.type);
                      const colorClass = getActivityColor(activity.type);
                      
                      return (
                        <div key={idx} className="relative">
                          {/* Timeline dot */}
                          <div className={`absolute -left-[30px] w-4 h-4 rounded-full border-2 bg-background ${colorClass.split(" ")[1]}`} />
                          
                          <Card className="border shadow-sm">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg ${colorClass}`}>
                                  <Icon className="h-4 w-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-2">
                                    <h4 className="font-medium truncate">{activity.title}</h4>
                                    {activity.cost && (
                                      <Badge variant="outline" className="shrink-0">
                                        {activity.cost}
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {activity.description}
                                  </p>
                                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {activity.time} · {activity.duration}
                                    </span>
                                    {activity.location && (
                                      <span className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        {activity.location}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="packing" className="mt-0">
          <ScrollArea className="h-[calc(100vh-320px)]">
            <div className="p-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CheckSquare className="h-5 w-5 text-primary" />
                    Packing List
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {itinerary.packingList.length > 0 ? (
                    itinerary.packingList.map((item, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="w-5 h-5 rounded border-2 border-primary/50" />
                        <span>{item}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">
                      No packing suggestions available
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="tips" className="mt-0">
          <ScrollArea className="h-[calc(100vh-320px)]">
            <div className="p-4 space-y-3">
              {itinerary.tips.length > 0 ? (
                itinerary.tips.map((tip, idx) => (
                  <Card key={idx}>
                    <CardContent className="flex items-start gap-3 p-4">
                      <div className="p-2 rounded-lg bg-accent/10 text-accent">
                        <Lightbulb className="h-4 w-4" />
                      </div>
                      <p className="text-sm">{tip}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">No tips available</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t pb-safe">
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => navigate("/create-trip")}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Modify
          </Button>
          <Button 
            className="flex-1"
            disabled={isSaving}
            onClick={async () => {
              if (!itinerary) return;
              setIsSaving(true);
              try {
                // 1. Create the trip
                const trip = await createTrip.mutateAsync({
                  title: `Trip to ${itinerary.destination}`,
                  description: `${itinerary.travelStyle} trip for ${itinerary.travelers} travelers`,
                  start_date: itinerary.startDate,
                  end_date: itinerary.endDate,
                  budget: itinerary.budget,
                  status: 'planned',
                });

                // 2. Create a destination
                const dest = await createDestination.mutateAsync({
                  trip_id: trip.id,
                  name: itinerary.destination,
                  start_date: itinerary.startDate,
                  end_date: itinerary.endDate,
                  order_index: 0,
                });

                // 3. Create activities from itinerary days
                const activityPromises = itinerary.days.flatMap((day) =>
                  day.activities.map((act, idx) =>
                    createActivity.mutateAsync({
                      destination_id: dest.id,
                      title: act.title,
                      description: act.description,
                      category: act.type === 'meal' ? 'food' : act.type === 'transport' ? 'transport' : act.type === 'accommodation' ? 'accommodation' : 'sightseeing',
                      location_name: act.location || null,
                      start_time: act.time ? `${day.date}T${act.time}:00` : null,
                      order_index: (day.day - 1) * 100 + idx,
                      cost: act.cost ? parseFloat(act.cost.replace(/[^0-9.]/g, '')) || null : null,
                    })
                  )
                );
                await Promise.all(activityPromises);

                toast.success("Trip saved to your trips!");
                navigate(`/trip/${trip.id}`);
              } catch (error) {
                console.error("Failed to save trip:", error);
                toast.error("Failed to save trip. Please try again.");
              } finally {
                setIsSaving(false);
              }
            }}
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Trip"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
