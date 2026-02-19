import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  Sparkles, 
  MapPin,
  Loader2,
  ChevronRight,
  Mountain,
  Crown,
  Tent,
  Palette,
  ChevronDown,
  ArrowRightLeft,
  Loader2 as Loader2Icon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { ROUTES } from "@/lib/routes";
import { toast } from "sonner";
import { useItineraryGeneration } from "@/hooks/useItineraryGeneration";
import { useExchangeRates, convertCurrency } from "@/hooks/useExchangeRates";
import { currencies, getCurrencySymbol, formatCurrency } from "@/lib/currency";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const travelStyles = [
  { id: "adventure", label: "Adventure", icon: Mountain, description: "Hiking & exploration" },
  { id: "luxury", label: "Luxury", icon: Crown, description: "5-star experiences" },
  { id: "budget", label: "Budget", icon: Tent, description: "Smart travel" },
  { id: "cultural", label: "Cultural", icon: Palette, description: "Local immersion" },
];

const popularDestinations = [
  { name: "Tokyo, Japan", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=200" },
  { name: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200" },
  { name: "Paris, France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=200" },
  { name: "Santorini, Greece", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=200" },
];

// Popular conversion targets to always show
const conversionTargets = ['USD', 'EUR', 'GBP', 'PKR', 'JPY', 'INR', 'AUD', 'CAD'];

function CurrencyConversions({ budget, baseCurrency }: { budget: number; baseCurrency: string }) {
  const { data: ratesData, isLoading } = useExchangeRates(baseCurrency);
  const rates = ratesData?.rates || {};

  const conversions = useMemo(() => {
    if (!Object.keys(rates).length) return [];
    return conversionTargets
      .filter(code => code !== baseCurrency)
      .map(code => ({
        code,
        symbol: getCurrencySymbol(code),
        name: currencies.find(c => c.code === code)?.name || code,
        converted: convertCurrency(budget, baseCurrency, code, rates),
        rate: rates[code] || 0,
      }))
      .filter(c => c.rate > 0);
  }, [rates, budget, baseCurrency]);

  if (isLoading) {
    return (
      <div className="p-4 rounded-xl bg-muted/50 border border-border flex items-center justify-center gap-2 text-muted-foreground text-sm">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading live rates...
      </div>
    );
  }

  if (!conversions.length) return null;

  return (
    <div className="rounded-xl bg-muted/50 border border-border overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        <ArrowRightLeft className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold">Live Currency Conversions</span>
        <span className="ml-auto text-xs text-muted-foreground">
          {ratesData?.source === 'live' ? '● Live' : '○ Approx'}
        </span>
      </div>
      <div className="divide-y divide-border">
        {conversions.map(c => (
          <div key={c.code} className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base font-medium">{c.symbol}</span>
              <div>
                <p className="text-sm font-medium">{c.code}</p>
                <p className="text-xs text-muted-foreground">{c.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">{formatCurrency(Math.round(c.converted), c.code)}</p>
              <p className="text-xs text-muted-foreground">1 {baseCurrency} = {c.rate.toFixed(2)} {c.code}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CreateTrip() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { isGenerating, progress: generationProgress, generateItinerary } = useItineraryGeneration();
  
  // Form state
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState([2000]);
  const [currency, setCurrency] = useState("USD");
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const totalSteps = 5;
  const stepProgress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  const handleGenerate = async () => {
    if (!selectedStyle) return;
    
    const result = await generateItinerary({
      destination,
      startDate,
      endDate,
      travelers,
      budget: budget[0],
      currency,
      travelStyle: selectedStyle,
    });

    if (result) {
      toast.success("Itinerary generated successfully!");
      navigate("/itinerary", { state: { itinerary: result } });
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return destination.length > 0;
      case 2: return startDate && endDate;
      case 3: return travelers > 0;
      case 4: return budget[0] > 0;
      case 5: return selectedStyle !== null;
      default: return false;
    }
  };

  const sym = getCurrencySymbol(currency);

  const formatBudgetDisplay = (value: number) => {
    if (value >= 10000) return `${sym}10,000+`;
    return formatCurrency(value, currency);
  };

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pt-safe">
      {/* Header */}
      <div className="px-4 py-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleBack} disabled={isGenerating}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <Progress value={isGenerating ? generationProgress : stepProgress} className="h-2" />
        </div>
        <span className="text-sm text-muted-foreground font-medium">
          {isGenerating ? `${generationProgress}%` : `${step}/${totalSteps}`}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Step 1: Destination */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h1 className="font-display text-2xl font-bold">Where to?</h1>
              <p className="text-muted-foreground">Enter your dream destination</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="destination"
                  placeholder="e.g., Tokyo, Japan"
                  className="h-12 pl-10"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">Popular destinations</p>
              <div className="grid grid-cols-2 gap-3">
                {popularDestinations.map((dest) => (
                  <button
                    key={dest.name}
                    onClick={() => setDestination(dest.name)}
                    className={`relative rounded-xl overflow-hidden h-24 ${
                      destination === dest.name ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <img 
                      src={dest.image} 
                      alt={dest.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                      <span className="text-white text-sm font-medium">{dest.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Dates */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h1 className="font-display text-2xl font-bold">When?</h1>
              <p className="text-muted-foreground">Select your travel dates</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="startDate"
                    type="date"
                    className="h-12 pl-10"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="endDate"
                    type="date"
                    className="h-12 pl-10"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate}
                  />
                </div>
              </div>
            </div>

            {startDate && endDate && (
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-center">
                  <span className="font-bold text-primary text-2xl">{calculateDays()}</span>
                  <span className="text-muted-foreground ml-2">days of adventure</span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Travelers */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h1 className="font-display text-2xl font-bold">Who's going?</h1>
              <p className="text-muted-foreground">Number of travelers</p>
            </div>

            <div className="flex items-center justify-center py-8">
              <div className="flex items-center gap-6">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-14 w-14 rounded-full"
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  disabled={travelers <= 1}
                >
                  <span className="text-2xl">-</span>
                </Button>
                <div className="text-center">
                  <span className="text-5xl font-bold text-primary">{travelers}</span>
                  <p className="text-muted-foreground mt-1">
                    {travelers === 1 ? "Traveler" : "Travelers"}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-14 w-14 rounded-full"
                  onClick={() => setTravelers(Math.min(10, travelers + 1))}
                  disabled={travelers >= 10}
                >
                  <span className="text-2xl">+</span>
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Users className="h-8 w-8 text-muted-foreground/50" />
            </div>
          </div>
        )}

        {/* Step 4: Budget */}
        {step === 4 && (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-2">
              <h1 className="font-display text-2xl font-bold">Budget</h1>
              <p className="text-muted-foreground">Set your total trip budget & currency</p>
            </div>

            {/* Currency Selector */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((curr) => (
                    <SelectItem key={curr.code} value={curr.code}>
                      {curr.symbol} {curr.code} — {curr.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-8 py-4">
              <div className="text-center">
                <span className="text-5xl font-display font-bold text-primary">
                  {formatBudgetDisplay(budget[0])}
                </span>
                <p className="text-muted-foreground mt-2">total budget</p>
              </div>

              <Slider
                value={budget}
                onValueChange={setBudget}
                min={500}
                max={10000}
                step={100}
                className="py-4"
              />

              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{sym}500</span>
                <span>{sym}10,000+</span>
              </div>
            </div>

            {/* Live Currency Conversions */}
            <CurrencyConversions budget={budget[0]} baseCurrency={currency} />

            {calculateDays() > 0 && (
              <div className="p-4 rounded-xl bg-muted/50 border border-border">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Per day average</span>
                  <span className="font-semibold">
                    ~{formatCurrency(Math.round(budget[0] / calculateDays()), currency)}/day
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 5: Travel Style */}
        {step === 5 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h1 className="font-display text-2xl font-bold">Travel Style</h1>
              <p className="text-muted-foreground">How do you like to travel?</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {travelStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`p-5 rounded-xl border-2 transition-all text-left ${
                    selectedStyle === style.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <style.icon className={`h-8 w-8 mb-3 ${
                    selectedStyle === style.id ? "text-primary" : "text-muted-foreground"
                  }`} />
                  <p className="font-medium">{style.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{style.description}</p>
                </button>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border space-y-3">
              <h3 className="font-semibold">Trip Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Destination</span>
                  <span className="font-medium">{destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{calculateDays()} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Travelers</span>
                  <span className="font-medium">{travelers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Budget</span>
                  <span className="font-medium">{formatBudgetDisplay(budget[0])} ({currency})</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 pb-safe">
        <Button 
          onClick={step === totalSteps ? handleGenerate : handleNext} 
          size="lg" 
          className="w-full h-14 text-lg font-semibold"
          disabled={!canProceed() || isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating Itinerary...
            </>
          ) : step === totalSteps ? (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Itinerary
            </>
          ) : (
            <>
              Continue
              <ChevronRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
