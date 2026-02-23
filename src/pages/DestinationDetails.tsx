import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Heart, Share2, MapPin, Calendar, DollarSign, 
  Thermometer, Star, ChevronLeft, ChevronRight, Plane, 
  Hotel, Car, ExternalLink, Phone, AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ROUTES } from "@/lib/routes";
import { toast } from "sonner";
import { getServicesForCountry } from "@/data/travel-services";
import { destinations } from "@/data/destinations";

// Extended details for select destinations (images, attractions, etc.)
const extendedDetails: Record<string, {
  images: string[];
  longDescription: string;
  highlights: string[];
  bestTimeDetail: string;
  avgBudget: string;
  weatherTemp: string;
  attractions: { name: string; type: string }[];
  rating: number;
  reviews: number;
}> = {
  "1": {
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800",
    ],
    longDescription: "Bali is a living postcard, an Indonesian paradise that feels like a fantasy. Soak up the sun on a stretch of fine white sand, or catch the perfect wave at a celebrated surf beach. Explore temples, rice terraces, and vibrant local culture.",
    highlights: ["Beaches", "Temples", "Rice Terraces", "Surfing", "Yoga", "Nightlife"],
    bestTimeDetail: "April to October",
    avgBudget: "$50-150/day",
    weatherTemp: "28°C",
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
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800",
    ],
    longDescription: "Tokyo is a dazzling mix of ultra-modern and traditional, where neon-lit skyscrapers stand beside serene temples. Experience world-class cuisine, cutting-edge technology, and centuries-old customs all in one extraordinary city.",
    highlights: ["Food", "Technology", "Temples", "Shopping", "Anime", "Gardens"],
    bestTimeDetail: "March to May",
    avgBudget: "$100-200/day",
    weatherTemp: "22°C",
    attractions: [
      { name: "Shibuya Crossing", type: "Landmark" },
      { name: "Meiji Shrine", type: "Culture" },
      { name: "Tsukiji Market", type: "Food" },
      { name: "Akihabara", type: "Entertainment" },
    ],
    rating: 4.9,
    reviews: 18200,
  },
};

function getDestinationData(id: string) {
  const dest = destinations.find(d => d.id === id);
  if (!dest) return null;

  const extended = extendedDetails[id];
  
  return {
    id: dest.id,
    name: dest.name,
    location: dest.location,
    country: dest.country,
    description: dest.description || `Explore the beauty of ${dest.name}, ${dest.location}.`,
    longDescription: extended?.longDescription || `${dest.name} in ${dest.location} is a wonderful destination for ${dest.mood} travelers. With a ${dest.budgetLevel} budget level and best visited during ${dest.bestSeason}, it offers unforgettable experiences.`,
    images: extended?.images || [dest.imageUrl.replace("w=400", "w=800")],
    highlights: extended?.highlights || [dest.mood.charAt(0).toUpperCase() + dest.mood.slice(1), dest.budgetLevel.charAt(0).toUpperCase() + dest.budgetLevel.slice(1), dest.bestSeason],
    bestTime: extended?.bestTimeDetail || dest.bestSeason,
    avgBudget: extended?.avgBudget || `~$${dest.pricePerDay}/day`,
    weatherTemp: extended?.weatherTemp || "—",
    attractions: extended?.attractions || [
      { name: `${dest.name} City Center`, type: "Landmark" },
      { name: `Local Markets`, type: "Culture" },
      { name: `${dest.name} National Park`, type: "Nature" },
    ],
    rating: extended?.rating || (4.0 + Math.round(Math.random() * 9) / 10),
    reviews: extended?.reviews || (1000 + Math.floor(Math.random() * 5000)),
  };
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const destination = getDestinationData(id || "1");

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Destination not found</h1>
          <Button onClick={() => navigate(ROUTES.DISCOVER)}>Back to Discover</Button>
        </div>
      </div>
    );
  }

  const services = getServicesForCountry(destination.country);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: destination.name, text: destination.description, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? "Removed from saved" : "Added to saved destinations");
  };

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % destination.images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + destination.images.length) % destination.images.length);

  return (
    <div className="min-h-screen bg-background pb-safe">
      {/* Hero Image Gallery */}
      <div className="relative h-80">
        <img src={destination.images[currentImageIndex]} alt={destination.name} className="w-full h-full object-cover transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        {destination.images.length > 1 && (
          <>
            <Button variant="secondary" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm" onClick={prevImage}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="secondary" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm" onClick={nextImage}>
              <ChevronRight className="h-5 w-5" />
            </Button>
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
              {destination.images.map((_, index) => (
                <button key={index} onClick={() => setCurrentImageIndex(index)} className={`h-2 rounded-full transition-all ${index === currentImageIndex ? "w-6 bg-white" : "w-2 bg-white/50"}`} />
              ))}
            </div>
          </>
        )}
        <div className="absolute top-0 left-0 right-0 pt-safe px-4 py-4 flex justify-between">
          <Button variant="secondary" size="icon" className="bg-background/80 backdrop-blur-sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            <Button variant="secondary" size="icon" className="bg-background/80 backdrop-blur-sm" onClick={handleSave}>
              <Heart className={`h-5 w-5 ${isSaved ? "fill-secondary text-secondary" : ""}`} />
            </Button>
            <Button variant="secondary" size="icon" className="bg-background/80 backdrop-blur-sm" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div className="px-4 py-6 space-y-6 -mt-12 relative" variants={stagger} initial="hidden" animate="visible">
        <motion.div className="space-y-3" variants={fadeUp}>
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
              <span className="text-xs text-muted-foreground">({destination.reviews.toLocaleString()})</span>
            </div>
          </div>
        </motion.div>

        <motion.div className="grid grid-cols-3 gap-3" variants={fadeUp}>
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
            <span className="text-sm font-medium text-center mt-1">{destination.weatherTemp}</span>
          </div>
        </motion.div>

        <motion.div className="space-y-2" variants={fadeUp}>
          <h2 className="font-display font-semibold text-lg">About</h2>
          <p className="text-muted-foreground leading-relaxed">{destination.longDescription}</p>
        </motion.div>

        <motion.div className="space-y-3" variants={fadeUp}>
          <h2 className="font-display font-semibold text-lg">Highlights</h2>
          <div className="flex flex-wrap gap-2">
            {destination.highlights.map((highlight) => (
              <Badge key={highlight} variant="secondary" className="px-3 py-1">{highlight}</Badge>
            ))}
          </div>
        </motion.div>

        <motion.div className="space-y-3" variants={fadeUp}>
          <h2 className="font-display font-semibold text-lg">Top Attractions</h2>
          <div className="space-y-2">
            {destination.attractions.map((attraction, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-xl border border-border">
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
        </motion.div>

        {/* Hotel Booking */}
        <motion.div className="space-y-3" variants={fadeUp}>
          <div className="flex items-center gap-2">
            <Hotel className="h-5 w-5 text-primary" />
            <h2 className="font-display font-semibold text-lg">Hotel Booking</h2>
          </div>
          <p className="text-xs text-muted-foreground">Top booking platforms for {destination.country}</p>
          <div className="space-y-2">
            {services.hotels.map((hotel, i) => (
              <Card key={i} className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{hotel.name}</p>
                    <p className="text-xs text-muted-foreground">{hotel.description}</p>
                  </div>
                  <Button size="sm" variant="outline" asChild className="ml-2 shrink-0">
                    <a href={hotel.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3.5 w-3.5 mr-1" /> Book
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Taxi & Transport */}
        <motion.div className="space-y-3" variants={fadeUp}>
          <div className="flex items-center gap-2">
            <Car className="h-5 w-5 text-primary" />
            <h2 className="font-display font-semibold text-lg">Taxi & Transport</h2>
          </div>
          <p className="text-xs text-muted-foreground">Get around in {destination.country}</p>
          <div className="space-y-2">
            {services.taxis.map((taxi, i) => (
              <Card key={i} className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{taxi.name}</p>
                    <p className="text-xs text-muted-foreground">{taxi.description}</p>
                  </div>
                  <div className="flex gap-1 ml-2 shrink-0">
                    {taxi.phone && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={`tel:${taxi.phone}`}><Phone className="h-3.5 w-3.5 mr-1" /> Call</a>
                      </Button>
                    )}
                    {taxi.url && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={taxi.url} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-3.5 w-3.5 mr-1" /> Open</a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Emergency */}
        <motion.div variants={fadeUp}>
          <Card className="p-3 border-destructive/30 bg-destructive/5">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-sm">Emergency Number</p>
                <p className="text-xs text-muted-foreground">{destination.country}</p>
              </div>
              <Button size="sm" variant="destructive" asChild>
                <a href={`tel:${services.emergency}`}><Phone className="h-3.5 w-3.5 mr-1" /> {services.emergency}</a>
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div className="pt-4 space-y-3" variants={fadeUp}>
          <Button size="lg" className="w-full h-14 text-lg font-semibold" onClick={() => navigate(ROUTES.CREATE_TRIP)}>
            <Plane className="mr-2 h-5 w-5" /> Start Planning Trip
          </Button>
          <p className="text-center text-xs text-muted-foreground">AI will create a personalized itinerary for you</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
