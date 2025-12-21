import { ArrowRight, Compass, Map, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 bg-gradient-hero flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="animate-fade-in space-y-6 max-w-md">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Compass className="h-10 w-10 text-primary-foreground" />
            <h1 className="font-display text-3xl font-bold text-primary-foreground">
              TripTuner
            </h1>
          </div>

          {/* Tagline */}
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary-foreground leading-tight">
            Your AI-Powered Travel Companion
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            Plan perfect trips with personalized recommendations, mood-based destinations, and smart itineraries.
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-3 gap-4 pt-6">
            <div className="flex flex-col items-center gap-2 text-primary-foreground/90">
              <div className="p-3 rounded-full bg-primary-foreground/10">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium">AI Planning</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-primary-foreground/90">
              <div className="p-3 rounded-full bg-primary-foreground/10">
                <Map className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium">Smart Routes</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-primary-foreground/90">
              <div className="p-3 rounded-full bg-primary-foreground/10">
                <Compass className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium">Discovery</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="p-6 pb-safe bg-background space-y-4">
        <Button asChild size="lg" className="w-full h-14 text-lg font-semibold">
          <Link to={ROUTES.SIGNUP}>
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="w-full h-14 text-lg">
          <Link to={ROUTES.SIGNIN}>
            Sign In
          </Link>
        </Button>
      </div>
    </div>
  );
}