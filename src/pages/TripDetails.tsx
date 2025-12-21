import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, DollarSign, CheckSquare, FileText, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Placeholder data
const mockTrip = {
  id: "1",
  title: "Tokyo Adventure",
  destination: "Tokyo, Japan",
  imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
  startDate: "2024-03-15",
  endDate: "2024-03-25",
  status: "upcoming" as const,
  budget: { total: 3000, spent: 1200 },
  itinerary: [
    { day: 1, title: "Arrival & Shibuya", activities: ["Airport pickup", "Hotel check-in", "Shibuya crossing"] },
    { day: 2, title: "Traditional Tokyo", activities: ["Senso-ji Temple", "Meiji Shrine", "Harajuku"] },
    { day: 3, title: "Modern Tokyo", activities: ["TeamLab Borderless", "Odaiba", "Tokyo Tower"] },
  ],
  packingList: [
    { id: "1", item: "Passport", checked: true },
    { id: "2", item: "Travel adapter", checked: false },
    { id: "3", item: "Comfortable walking shoes", checked: true },
    { id: "4", item: "Light jacket", checked: false },
  ],
};

export default function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-safe">
      {/* Hero */}
      <div className="relative h-48">
        <img
          src={mockTrip.imageUrl}
          alt={mockTrip.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
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
          <Button variant="secondary" size="icon" className="bg-background/80 backdrop-blur-sm">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <Badge className="mb-2">Upcoming</Badge>
          <h1 className="font-display text-2xl font-bold">{mockTrip.title}</h1>
          <div className="flex items-center gap-2 text-muted-foreground mt-1">
            <MapPin className="h-4 w-4" />
            <span>{mockTrip.destination}</span>
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div className="px-4 py-4 flex gap-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="text-sm">Mar 15 - 25</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-primary" />
          <span className="text-sm">${mockTrip.budget.spent} / ${mockTrip.budget.total}</span>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="itinerary" className="px-4 py-4">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="packing">Packing</TabsTrigger>
          <TabsTrigger value="documents">Docs</TabsTrigger>
        </TabsList>

        <TabsContent value="itinerary" className="mt-6 space-y-4">
          {mockTrip.itinerary.map((day) => (
            <div key={day.day} className="p-4 rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-semibold text-primary">{day.day}</span>
                </div>
                <h3 className="font-display font-semibold">{day.title}</h3>
              </div>
              <ul className="space-y-2 pl-13">
                {day.activities.map((activity, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="packing" className="mt-6 space-y-3">
          {mockTrip.packingList.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 p-3 rounded-xl border ${
                item.checked ? "bg-muted/50 border-border" : "border-border"
              }`}
            >
              <CheckSquare className={`h-5 w-5 ${item.checked ? "text-primary" : "text-muted-foreground"}`} />
              <span className={item.checked ? "line-through text-muted-foreground" : ""}>
                {item.item}
              </span>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-4 rounded-full bg-muted mb-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-display font-semibold mb-1">No documents yet</h3>
            <p className="text-sm text-muted-foreground">
              Upload your travel documents here
            </p>
            <Button variant="outline" className="mt-4">
              Upload Document
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}