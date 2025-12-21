import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Users, DollarSign, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ROUTES } from "@/lib/routes";

export default function CreateTrip() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // TODO: Generate itinerary with AI
      navigate(ROUTES.TRIPS);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pt-safe">
      {/* Header */}
      <div className="px-4 py-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <Progress value={progress} className="h-2" />
        </div>
        <span className="text-sm text-muted-foreground">
          {step}/{totalSteps}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6">
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h1 className="font-display text-2xl font-bold">Where to?</h1>
              <p className="text-muted-foreground">Enter your dream destination</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                placeholder="e.g., Tokyo, Japan"
                className="h-12"
              />
            </div>
          </div>
        )}

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
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h1 className="font-display text-2xl font-bold">Who's going?</h1>
              <p className="text-muted-foreground">Number of travelers</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="travelers">Travelers</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="travelers"
                  type="number"
                  min="1"
                  defaultValue="2"
                  className="h-12 pl-10"
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h1 className="font-display text-2xl font-bold">Budget</h1>
              <p className="text-muted-foreground">Set your trip budget</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Total Budget (USD)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="budget"
                  type="number"
                  placeholder="3000"
                  className="h-12 pl-10"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 pb-safe">
        <Button onClick={handleNext} size="lg" className="w-full h-14 text-lg font-semibold">
          {step === totalSteps ? (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Itinerary
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </div>
    </div>
  );
}