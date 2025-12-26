import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Sparkles, Heart, Mountain, Palette, X, MapPin } from "lucide-react";
import { MobileLayout, FloatingActionButton } from "@/components/layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoodButton } from "@/components/ui/mood-button";
import { DestinationCard } from "@/components/ui/destination-card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { generateRoute } from "@/lib/routes";
import { destinations, type Mood, type BudgetLevel } from "@/data/destinations";

const moods: { id: Mood; label: string; icon: typeof Sparkles }[] = [
  { id: "relaxing", label: "Relaxing", icon: Sparkles },
  { id: "romantic", label: "Romantic", icon: Heart },
  { id: "adventure", label: "Adventure", icon: Mountain },
  { id: "cultural", label: "Cultural", icon: Palette },
];

const budgetLabels: Record<BudgetLevel, string> = {
  budget: "Budget",
  moderate: "Moderate",
  luxury: "Luxury",
};

export default function Discover() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [budgetRange, setBudgetRange] = useState([0, 500]);
  const [selectedBudgetLevels, setSelectedBudgetLevels] = useState<BudgetLevel[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const matchesSearch = 
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesMood = !selectedMood || dest.mood === selectedMood;
      
      const matchesBudgetLevel = 
        selectedBudgetLevels.length === 0 || 
        selectedBudgetLevels.includes(dest.budgetLevel);
      
      const matchesPriceRange = 
        dest.pricePerDay >= budgetRange[0] && 
        dest.pricePerDay <= budgetRange[1];

      return matchesSearch && matchesMood && matchesBudgetLevel && matchesPriceRange;
    });
  }, [searchQuery, selectedMood, selectedBudgetLevels, budgetRange]);

  const toggleBudgetLevel = (level: BudgetLevel) => {
    setSelectedBudgetLevels((prev) =>
      prev.includes(level)
        ? prev.filter((l) => l !== level)
        : [...prev, level]
    );
  };

  const clearFilters = () => {
    setSelectedMood(null);
    setSelectedBudgetLevels([]);
    setBudgetRange([0, 500]);
    setSearchQuery("");
  };

  const activeFiltersCount = 
    (selectedMood ? 1 : 0) + 
    selectedBudgetLevels.length + 
    (budgetRange[0] > 0 || budgetRange[1] < 500 ? 1 : 0);

  return (
    <MobileLayout
      headerTitle="Discover"
      headerActions={
        <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="min-w-touch min-h-touch relative">
              <SlidersHorizontal className="h-5 w-5" />
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[70vh]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>
                Narrow down your destination search
              </SheetDescription>
            </SheetHeader>
            
            <div className="py-6 space-y-6">
              {/* Budget Level */}
              <div className="space-y-3">
                <h3 className="font-semibold">Budget Level</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(budgetLabels).map(([key, label]) => (
                    <Badge
                      key={key}
                      variant={selectedBudgetLevels.includes(key) ? "default" : "outline"}
                      className="cursor-pointer px-4 py-2"
                      onClick={() => toggleBudgetLevel(key)}
                    >
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Daily Budget</h3>
                  <span className="text-sm text-muted-foreground">
                    ${budgetRange[0]} - ${budgetRange[1]}+
                  </span>
                </div>
                <Slider
                  value={budgetRange}
                  onValueChange={setBudgetRange}
                  min={0}
                  max={400}
                  step={25}
                  className="py-4"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={clearFilters}>
                  Clear All
                </Button>
                <Button className="flex-1" onClick={() => setFiltersOpen(false)}>
                  Show {filteredDestinations.length} Results
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      }
    >
      <div className="px-4 py-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search destinations..."
            className="pl-10 h-12 pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
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

        {/* Active Filters */}
        {(selectedMood || selectedBudgetLevels.length > 0) && (
          <div className="flex flex-wrap gap-2">
            {selectedMood && (
              <Badge variant="secondary" className="gap-1">
                {selectedMood}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setSelectedMood(null)} 
                />
              </Badge>
            )}
            {selectedBudgetLevels.map((level) => (
              <Badge key={level} variant="secondary" className="gap-1">
                {budgetLabels[level]}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => toggleBudgetLevel(level)} 
                />
              </Badge>
            ))}
          </div>
        )}

        {/* Destinations Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold">
              {selectedMood 
                ? `${selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)} Destinations` 
                : "Popular Destinations"
              }
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredDestinations.length} places
            </span>
          </div>
          
          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  {...destination}
                  onClick={() => navigate(generateRoute.destination(destination.id))}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 rounded-full bg-muted mb-4">
                <MapPin className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-display font-semibold mb-1">No destinations found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Try adjusting your filters
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <FloatingActionButton />
    </MobileLayout>
  );
}
