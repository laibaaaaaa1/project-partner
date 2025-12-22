import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { ROUTES } from "@/lib/routes";
import { 
  Backpack, 
  Building2, 
  Mountain, 
  Palette, 
  Sparkles, 
  Tent, 
  Crown,
  Camera,
  Utensils,
  Music,
  Heart,
  Waves,
  TreePine,
  ArrowLeft,
  Check,
  Loader2
} from "lucide-react";
import { toast } from "sonner";

const travelStyles = [
  { id: "adventure", label: "Adventure", icon: Mountain, description: "Hiking, extreme sports, exploration" },
  { id: "luxury", label: "Luxury", icon: Crown, description: "5-star hotels, fine dining, spa" },
  { id: "budget", label: "Budget", icon: Tent, description: "Hostels, local food, backpacking" },
  { id: "cultural", label: "Cultural", icon: Palette, description: "Museums, history, local traditions" },
];

const accommodationTypes = [
  { id: "hotel", label: "Hotels", icon: Building2 },
  { id: "hostel", label: "Hostels & B&Bs", icon: Backpack },
  { id: "resort", label: "Resorts", icon: Sparkles },
  { id: "camping", label: "Camping & Glamping", icon: Tent },
];

const activityTypes = [
  { id: "photography", label: "Photography", icon: Camera },
  { id: "food", label: "Food & Cuisine", icon: Utensils },
  { id: "nightlife", label: "Nightlife", icon: Music },
  { id: "romance", label: "Romance", icon: Heart },
  { id: "beach", label: "Beach & Water", icon: Waves },
  { id: "nature", label: "Nature & Wildlife", icon: TreePine },
];

const travelFrequencies = [
  { id: "rarely", label: "Rarely", description: "Once a year or less" },
  { id: "sometimes", label: "Sometimes", description: "2-3 times a year" },
  { id: "often", label: "Often", description: "4-6 times a year" },
  { id: "frequently", label: "Frequently", description: "Monthly or more" },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState([1500]);
  const [selectedAccommodations, setSelectedAccommodations] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [travelFrequency, setTravelFrequency] = useState("");

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const toggleSelection = (
    id: string, 
    current: string[], 
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(current.includes(id) 
      ? current.filter((s) => s !== id) 
      : [...current, id]
    );
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      // TODO: Save preferences to Supabase
      const preferences = {
        travelStyles: selectedStyles,
        budgetRange: budgetRange[0],
        accommodations: selectedAccommodations,
        activities: selectedActivities,
        travelFrequency,
      };
      console.log("Saving preferences:", preferences);
      toast.success("Preferences saved! Let's explore.");
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      toast.error("Failed to save preferences. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return selectedStyles.length > 0;
      case 2: return true; // Budget always has a value
      case 3: return selectedAccommodations.length > 0;
      case 4: return selectedActivities.length > 0;
      case 5: return travelFrequency !== "";
      default: return false;
    }
  };

  const formatBudget = (value: number) => {
    if (value >= 5000) return "$5,000+";
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pt-safe">
      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-4">
        {step > 1 && (
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <div className="flex-1">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            Step {step} of {totalSteps}
          </p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className="text-muted-foreground"
        >
          Skip
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 overflow-y-auto">
        {/* Step 1: Travel Style */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h1 className="font-display text-2xl font-bold">Your Travel Style</h1>
              <p className="text-muted-foreground">Select all that apply to you</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {travelStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => toggleSelection(style.id, selectedStyles, setSelectedStyles)}
                  className={`p-5 rounded-xl border-2 transition-all text-left relative ${
                    selectedStyles.includes(style.id)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  {selectedStyles.includes(style.id) && (
                    <div className="absolute top-2 right-2 p-1 rounded-full bg-primary">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                  <style.icon className={`h-8 w-8 mb-3 ${
                    selectedStyles.includes(style.id) ? "text-primary" : "text-muted-foreground"
                  }`} />
                  <p className="font-medium">{style.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{style.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Budget */}
        {step === 2 && (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-2">
              <h1 className="font-display text-2xl font-bold">Your Budget</h1>
              <p className="text-muted-foreground">What's your typical trip budget?</p>
            </div>

            <div className="space-y-8 py-8">
              <div className="text-center">
                <span className="text-5xl font-display font-bold text-primary">
                  {formatBudget(budgetRange[0])}
                </span>
                <p className="text-muted-foreground mt-2">per trip</p>
              </div>

              <Slider
                value={budgetRange}
                onValueChange={setBudgetRange}
                min={500}
                max={5000}
                step={100}
                className="py-4"
              />

              <div className="flex justify-between text-sm text-muted-foreground">
                <span>$500</span>
                <span>$5,000+</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Accommodations */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h1 className="font-display text-2xl font-bold">Preferred Stays</h1>
              <p className="text-muted-foreground">Where do you like to stay?</p>
            </div>

            <div className="space-y-3">
              {accommodationTypes.map((option) => (
                <button
                  key={option.id}
                  onClick={() => toggleSelection(option.id, selectedAccommodations, setSelectedAccommodations)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    selectedAccommodations.includes(option.id)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <option.icon className={`h-6 w-6 ${
                    selectedAccommodations.includes(option.id) ? "text-primary" : "text-muted-foreground"
                  }`} />
                  <span className="font-medium flex-1 text-left">{option.label}</span>
                  {selectedAccommodations.includes(option.id) && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Activities */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h1 className="font-display text-2xl font-bold">Your Interests</h1>
              <p className="text-muted-foreground">What activities do you enjoy?</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {activityTypes.map((activity) => (
                <button
                  key={activity.id}
                  onClick={() => toggleSelection(activity.id, selectedActivities, setSelectedActivities)}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    selectedActivities.includes(activity.id)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <activity.icon className={`h-5 w-5 ${
                    selectedActivities.includes(activity.id) ? "text-primary" : "text-muted-foreground"
                  }`} />
                  <span className={`text-sm font-medium ${
                    selectedActivities.includes(activity.id) ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {activity.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Travel Frequency */}
        {step === 5 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h1 className="font-display text-2xl font-bold">How Often Do You Travel?</h1>
              <p className="text-muted-foreground">This helps us personalize your experience</p>
            </div>

            <div className="space-y-3">
              {travelFrequencies.map((freq) => (
                <button
                  key={freq.id}
                  onClick={() => setTravelFrequency(freq.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                    travelFrequency === freq.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="text-left">
                    <p className="font-medium">{freq.label}</p>
                    <p className="text-sm text-muted-foreground">{freq.description}</p>
                  </div>
                  {travelFrequency === freq.id && (
                    <div className="p-1 rounded-full bg-primary">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 pb-safe">
        <Button 
          onClick={step === totalSteps ? handleComplete : handleNext} 
          size="lg" 
          className="w-full h-14 text-lg font-semibold"
          disabled={!canProceed() || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Saving...
            </>
          ) : step === totalSteps ? (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Start Exploring
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </div>
    </div>
  );
}
