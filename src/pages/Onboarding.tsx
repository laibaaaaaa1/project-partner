import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ROUTES } from "@/lib/routes";
import { Backpack, Building2, Mountain, Palette, Sparkles, Tent, Crown } from "lucide-react";

const travelStyles = [
  { id: "adventure", label: "Adventure", icon: Mountain },
  { id: "luxury", label: "Luxury", icon: Crown },
  { id: "budget", label: "Budget", icon: Tent },
  { id: "cultural", label: "Cultural", icon: Palette },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const toggleStyle = (styleId: string) => {
    setSelectedStyles((prev) =>
      prev.includes(styleId)
        ? prev.filter((s) => s !== styleId)
        : [...prev, styleId]
    );
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      navigate(ROUTES.DASHBOARD);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pt-safe">
      {/* Progress */}
      <div className="px-6 py-4">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2">
          Step {step} of {totalSteps}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
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
                  onClick={() => toggleStyle(style.id)}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedStyles.includes(style.id)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <style.icon className={`h-8 w-8 mb-3 ${
                    selectedStyles.includes(style.id) ? "text-primary" : "text-muted-foreground"
                  }`} />
                  <p className="font-medium">{style.label}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h1 className="font-display text-2xl font-bold">Preferred Stays</h1>
              <p className="text-muted-foreground">Where do you like to stay?</p>
            </div>

            <div className="space-y-3">
              {[
                { id: "hotel", label: "Hotels", icon: Building2 },
                { id: "hostel", label: "Hostels & B&Bs", icon: Backpack },
                { id: "resort", label: "Resorts", icon: Sparkles },
                { id: "camping", label: "Camping & Glamping", icon: Tent },
              ].map((option) => (
                <button
                  key={option.id}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/30 transition-all"
                >
                  <option.icon className="h-6 w-6 text-muted-foreground" />
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h1 className="font-display text-2xl font-bold">You're All Set!</h1>
              <p className="text-muted-foreground">
                We'll personalize your experience based on your preferences.
              </p>
            </div>

            <div className="flex items-center justify-center py-12">
              <div className="p-6 rounded-full bg-primary/10">
                <Sparkles className="h-16 w-16 text-primary" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 pb-safe">
        <Button onClick={handleNext} size="lg" className="w-full h-14 text-lg font-semibold">
          {step === totalSteps ? "Start Exploring" : "Continue"}
        </Button>
      </div>
    </div>
  );
}