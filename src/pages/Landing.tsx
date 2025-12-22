import { useState, useEffect } from "react";
import { ArrowRight, Compass, Map, Sparkles, Brain, Wallet, CloudSun, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Planning",
    description: "Get personalized itineraries crafted by AI based on your preferences and travel style.",
  },
  {
    icon: Sparkles,
    title: "Mood-Based Discovery",
    description: "Find destinations that match your current mood - adventurous, relaxing, or cultural.",
  },
  {
    icon: Wallet,
    title: "Smart Budgeting",
    description: "Track expenses and get budget-optimized recommendations for every trip.",
  },
  {
    icon: CloudSun,
    title: "Weather Integration",
    description: "Plan with confidence using real-time weather forecasts for your destinations.",
  },
];

export default function Landing() {
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextFeature = () => setCurrentFeature((prev) => (prev + 1) % features.length);
  const prevFeature = () => setCurrentFeature((prev) => (prev - 1 + features.length) % features.length);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section */}
      <div className="flex-1 bg-gradient-hero flex flex-col items-center justify-center px-6 py-12 text-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="animate-fade-in space-y-6 max-w-md relative z-10">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm">
              <Compass className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="font-display text-4xl font-bold text-primary-foreground tracking-tight">
              TripTuner
            </h1>
          </div>

          {/* Tagline */}
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary-foreground leading-tight">
            Your AI-Powered Travel Companion
          </h2>
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            Plan perfect trips with personalized recommendations, mood-based destinations, and smart itineraries.
          </p>

          {/* Quick feature icons */}
          <div className="grid grid-cols-3 gap-4 pt-6">
            <div className="flex flex-col items-center gap-2 text-primary-foreground/90">
              <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium">AI Planning</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-primary-foreground/90">
              <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm">
                <Map className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium">Smart Routes</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-primary-foreground/90">
              <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm">
                <Compass className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium">Discovery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Carousel */}
      <div className="bg-muted/30 py-8 px-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-foreground">Why TripTuner?</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={prevFeature}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={nextFeature}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentFeature * 100}%)` }}
            >
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="w-full flex-shrink-0 p-6 bg-card rounded-xl border border-border"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentFeature(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentFeature 
                    ? "w-6 bg-primary" 
                    : "w-2 bg-primary/30"
                }`}
              />
            ))}
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
        <p className="text-center text-xs text-muted-foreground pt-2">
          Free to use • No credit card required
        </p>
      </div>
    </div>
  );
}
