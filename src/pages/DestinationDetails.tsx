import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Share2, MapPin, Calendar, DollarSign, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Placeholder data
const mockDestination = {
  id: "1",
  name: "Bali",
  location: "Indonesia",
  description: "Bali is a living postcard, an Indonesian paradise that feels like a fantasy. Soak up the sun on a stretch of fine white sand, or catch the perfect wave at a celebrated surf beach.",
  imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
  images: [
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
    "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800",
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800",
  ],
  highlights: ["Beaches", "Temples", "Rice Terraces", "Surfing", "Yoga"],
  bestTime: "April to October",
  avgBudget: "$50-150/day",
  weather: { temp: "28°C", condition: "Sunny" },
};

export default function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-safe">
      {/* Hero Image */}
      <div className="relative h-72">
        <img
          src={mockDestination.imageUrl}
          alt={mockDestination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
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
            <Button variant="secondary" size="icon" className="bg-background/80 backdrop-blur-sm">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="secondary" size="icon" className="bg-background/80 backdrop-blur-sm">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6 -mt-8 relative">
        {/* Title */}
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-bold">{mockDestination.name}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{mockDestination.location}</span>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center p-3 rounded-xl bg-muted/50">
            <Calendar className="h-5 w-5 text-primary mb-1" />
            <span className="text-xs text-muted-foreground">Best Time</span>
            <span className="text-sm font-medium text-center">{mockDestination.bestTime}</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl bg-muted/50">
            <DollarSign className="h-5 w-5 text-primary mb-1" />
            <span className="text-xs text-muted-foreground">Budget</span>
            <span className="text-sm font-medium">{mockDestination.avgBudget}</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl bg-muted/50">
            <Sun className="h-5 w-5 text-primary mb-1" />
            <span className="text-xs text-muted-foreground">Weather</span>
            <span className="text-sm font-medium">{mockDestination.weather.temp}</span>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h2 className="font-display font-semibold">About</h2>
          <p className="text-muted-foreground leading-relaxed">
            {mockDestination.description}
          </p>
        </div>

        {/* Highlights */}
        <div className="space-y-3">
          <h2 className="font-display font-semibold">Highlights</h2>
          <div className="flex flex-wrap gap-2">
            {mockDestination.highlights.map((highlight) => (
              <Badge key={highlight} variant="secondary">
                {highlight}
              </Badge>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Button size="lg" className="w-full h-14 text-lg font-semibold">
          Start Planning Trip
        </Button>
      </div>
    </div>
  );
}