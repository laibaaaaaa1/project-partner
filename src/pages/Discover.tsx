import { useState } from "react";
import { Search, SlidersHorizontal, Sparkles, Heart, Mountain, Palette } from "lucide-react";
import { MobileLayout } from "@/components/layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoodButton } from "@/components/ui/mood-button";
import { DestinationCard } from "@/components/ui/destination-card";
import { useNavigate } from "react-router-dom";
import { generateRoute } from "@/lib/routes";

const moods = [
  { id: "relaxing", label: "Relaxing", icon: Sparkles },
  { id: "romantic", label: "Romantic", icon: Heart },
  { id: "adventure", label: "Adventure", icon: Mountain },
  { id: "cultural", label: "Cultural", icon: Palette },
];

const mockDestinations = [
  {
    id: "1",
    name: "Bali",
    location: "Indonesia",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400",
    budgetLevel: "moderate" as const,
    bestSeason: "Apr-Oct",
  },
  {
    id: "2",
    name: "Santorini",
    location: "Greece",
    imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400",
    budgetLevel: "luxury" as const,
    bestSeason: "May-Sep",
  },
  {
    id: "3",
    name: "Kyoto",
    location: "Japan",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400",
    budgetLevel: "moderate" as const,
    bestSeason: "Mar-May",
  },
  {
    id: "4",
    name: "Patagonia",
    location: "Argentina",
    imageUrl: "https://images.unsplash.com/photo-1531761535209-180857e963b9?w=400",
    budgetLevel: "moderate" as const,
    bestSeason: "Dec-Mar",
  },
];

export default function Discover() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <MobileLayout
      headerTitle="Discover"
      headerActions={
        <Button variant="ghost" size="icon" className="min-w-touch min-h-touch">
          <SlidersHorizontal className="h-5 w-5" />
        </Button>
      }
    >
      <div className="px-4 py-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search destinations..."
            className="pl-10 h-12"
          />
        </div>

        {/* Mood Selector */}
        <div className="space-y-3">
          <h2 className="font-display font-semibold">How are you feeling?</h2>
          <div className="grid grid-cols-4 gap-2">
            {moods.map((mood) => (
              <MoodButton
                key={mood.id}
                icon={mood.icon}
                label={mood.label}
                selected={selectedMood === mood.id}
                onClick={() => setSelectedMood(selectedMood === mood.id ? null : mood.id)}
              />
            ))}
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="space-y-4">
          <h2 className="font-display font-semibold">Popular Destinations</h2>
          <div className="grid grid-cols-2 gap-4">
            {mockDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                {...destination}
                onClick={() => navigate(generateRoute.destination(destination.id))}
              />
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}