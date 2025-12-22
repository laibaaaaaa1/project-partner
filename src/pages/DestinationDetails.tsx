import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Sun,
  CloudRain,
  Thermometer,
  Star,
  ChevronLeft,
  ChevronRight,
  Plane
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/lib/routes";
import { toast } from "sonner";

// Mock destination data - in real app would fetch by id
const destinationsData: Record<string, {
  id: string;
  name: string;
  location: string;
  description: string;
  longDescription: string;
  images: string[];
  highlights: string[];
  bestTime: string;
  avgBudget: string;
  weather: { temp: string; condition: string; icon: typeof Sun };
  attractions: { name: string; type: string }[];
  rating: number;
  reviews: number;
}> = {
  "1": {
    id: "1",
    name: "Bali",
    location: "Indonesia",
    description: "Bali is a living postcard, an Indonesian paradise that feels like a fantasy.",
    longDescription: "Bali is a living postcard, an Indonesian paradise that feels like a fantasy. Soak up the sun on a stretch of fine white sand, or catch the perfect wave at a celebrated surf beach. Explore temples, rice terraces, and vibrant local culture. Whether you're seeking adventure, relaxation, or spiritual renewal, Bali offers it all.",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800",
      "https://images.unsplash.com/photo-1573790387438-4da905039392?w=800",
    ],
    highlights: ["Beaches", "Temples", "Rice Terraces", "Surfing", "Yoga", "Nightlife"],
    bestTime: "April to October",
    avgBudget: "$50-150/day",
    weather: { temp: "28°C", condition: "Sunny", icon: Sun },
    attractions: [
      { name: "Ubud Rice Terraces", type: "Nature" },
      { name: "Tanah Lot Temple", type: "Culture" },
      { name: "Seminyak Beach", type: "Beach" },
      { name: "Mount Batur", type: "Adventure" },
    ],
    rating: 4.8,
    reviews: 12453,
  },
  "2": {
    id: "2",
    name: "Santorini",
    location: "Greece",
    description: "Iconic white-washed buildings overlooking the azure Aegean Sea.",
    longDescription: "Santorini is the crown jewel of the Cyclades, famous for its dramatic views, stunning sunsets, and volcanic beaches. Explore charming villages, indulge in Mediterranean cuisine, and experience the perfect blend of romance and adventure on this legendary Greek island.",
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800",
      "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800",
    ],
    highlights: ["Sunsets", "Wine", "Architecture", "Beaches", "Cuisine", "Photography"],
    bestTime: "May to September",
    avgBudget: "$150-300/day",
    weather: { temp: "26°C", condition: "Clear", icon: Sun },
    attractions: [
      { name: "Oia Village", type: "Culture" },
      { name: "Red Beach", type: "Beach" },
      { name: "Akrotiri Ruins", type: "History" },
      { name: "Wine Tasting Tours", type: "Food & Drink" },
    ],
    rating: 4.9,
    reviews: 8234,
  },
};

// Default destination for unknown IDs
const defaultDestination = destinationsData["1"];

export default function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const destination = id && destinationsData[id] ? destinationsData[id] : defaultDestination;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: destination.name,
        text: destination.description,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? "Removed from saved" : "Added to saved destinations");
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % destination.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      (prev - 1 + destination.images.length) % destination.images.length
    );
  };

  return (
    <div className="min-h-screen bg-background pb-safe">
      {/* Hero Image Gallery */}
      <div className="relative h-80">
        <img
          src={destination.images[currentImageIndex]}
          alt={destination.name}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Image Navigation */}
        {destination.images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
              onClick={prevImage}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
              onClick={nextImage}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
              {destination.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentImageIndex 
                      ? "w-6 bg-white" 
                      : "w-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
        
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
              onClick={handleSave}
            >
              <Heart className={`h-5 w-5 ${isSaved ? "fill-secondary text-secondary" : ""}`} />
            </Button>
            <Button 
              variant="secondary" 
              size="icon" 
              className="bg-background/80 backdrop-blur-sm"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6 -mt-12 relative">
        {/* Title & Rating */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold">{destination.name}</h1>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <MapPin className="h-4 w-4" />
                <span>{destination.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10">
              <Star className="h-4 w-4 text-accent fill-accent" />
              <span className="font-semibold">{destination.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({destination.reviews.toLocaleString()})
              </span>
            </div>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center p-4 rounded-xl bg-muted/50 border border-border">
            <Calendar className="h-5 w-5 text-primary mb-2" />
            <span className="text-xs text-muted-foreground">Best Time</span>
            <span className="text-sm font-medium text-center mt-1">{destination.bestTime}</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-xl bg-muted/50 border border-border">
            <DollarSign className="h-5 w-5 text-primary mb-2" />
            <span className="text-xs text-muted-foreground">Budget</span>
            <span className="text-sm font-medium text-center mt-1">{destination.avgBudget}</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-xl bg-muted/50 border border-border">
            <Thermometer className="h-5 w-5 text-primary mb-2" />
            <span className="text-xs text-muted-foreground">Weather</span>
            <span className="text-sm font-medium text-center mt-1">{destination.weather.temp}</span>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h2 className="font-display font-semibold text-lg">About</h2>
          <p className="text-muted-foreground leading-relaxed">
            {destination.longDescription}
          </p>
        </div>

        {/* Highlights */}
        <div className="space-y-3">
          <h2 className="font-display font-semibold text-lg">Highlights</h2>
          <div className="flex flex-wrap gap-2">
            {destination.highlights.map((highlight) => (
              <Badge key={highlight} variant="secondary" className="px-3 py-1">
                {highlight}
              </Badge>
            ))}
          </div>
        </div>

        {/* Top Attractions */}
        <div className="space-y-3">
          <h2 className="font-display font-semibold text-lg">Top Attractions</h2>
          <div className="space-y-2">
            {destination.attractions.map((attraction, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl border border-border"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{attraction.name}</p>
                  <p className="text-xs text-muted-foreground">{attraction.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4 space-y-3">
          <Button 
            size="lg" 
            className="w-full h-14 text-lg font-semibold"
            onClick={() => navigate(ROUTES.CREATE_TRIP)}
          >
            <Plane className="mr-2 h-5 w-5" />
            Start Planning Trip
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            AI will create a personalized itinerary for you
          </p>
        </div>
      </div>
    </div>
  );
}
