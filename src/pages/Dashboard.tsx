import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Compass, Search, Sun, Sparkles, MessageCircle, ArrowRight, TrendingUp } from "lucide-react";
import { MobileLayout, FloatingActionButton } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { DestinationCard } from "@/components/ui/destination-card";
import { MoodButton } from "@/components/ui/mood-button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { generateRoute, ROUTES } from "@/lib/routes";
import { getDestinationsByMood, getRandomDestinations, type Mood } from "@/data/destinations";
import { WeatherWidget, TripsList } from "@/components/dashboard";

const moods: { id: Mood; label: string; icon: typeof Sun }[] = [
  { id: "relaxing", label: "Relaxing", icon: Sun },
  { id: "adventure", label: "Adventure", icon: TrendingUp },
  { id: "cultural", label: "Cultural", icon: Compass },
  { id: "romantic", label: "Romantic", icon: Sparkles },
];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayedDestinations, setDisplayedDestinations] = useState(getRandomDestinations(4));
  const [currentLocation, setCurrentLocation] = useState(() => {
    return localStorage.getItem("triptuner_weather_location") || "San Francisco";
  });

  const handleLocationChange = (loc: string) => {
    setCurrentLocation(loc);
    localStorage.setItem("triptuner_weather_location", loc);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedMood) {
      setDisplayedDestinations(getDestinationsByMood(selectedMood).slice(0, 4));
    } else {
      setDisplayedDestinations(getRandomDestinations(4));
    }
  }, [selectedMood]);

  return (
    <MobileLayout
      headerTitle="TripTuner"
      headerActions={
        <Button variant="ghost" size="icon" className="min-w-touch min-h-touch" onClick={() => navigate(ROUTES.DISCOVER)}>
          <Search className="h-5 w-5" />
        </Button>
      }
    >
      <motion.div className="px-4 py-6 space-y-8" variants={container} initial="hidden" animate="visible">
        {/* Welcome Section */}
        <motion.div className="space-y-2" variants={fadeUp}>
          <h1 className="font-display text-2xl font-bold">
            {getGreeting()}! 👋
          </h1>
          <p className="text-muted-foreground">Where shall we go today?</p>
        </motion.div>

        {/* Dynamic Weather Widget */}
        <motion.div variants={fadeUp}>
          <WeatherWidget location={currentLocation} onLocationChange={handleLocationChange} />
        </motion.div>

        {/* Quick Actions */}
        <motion.div className="grid grid-cols-2 gap-4" variants={fadeUp}>
          <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="outline"
              className="w-full h-auto py-5 flex flex-col gap-2 border-2 hover:border-primary/50 hover:shadow-md transition-all"
              onClick={() => navigate(ROUTES.CHAT)}
            >
              <motion.div
                className="p-2 rounded-full bg-primary/10"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <MessageCircle className="h-5 w-5 text-primary" />
              </motion.div>
              <span className="text-sm font-medium">Chat with AI</span>
              <span className="text-xs text-muted-foreground">Get travel advice</span>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="outline"
              className="w-full h-auto py-5 flex flex-col gap-2 border-2 hover:border-secondary/50 hover:shadow-md transition-all"
              onClick={() => navigate(ROUTES.DISCOVER)}
            >
              <motion.div
                className="p-2 rounded-full bg-secondary/10"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Compass className="h-5 w-5 text-secondary" />
              </motion.div>
              <span className="text-sm font-medium">Explore</span>
              <span className="text-xs text-muted-foreground">Discover places</span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Mood-Based Suggestions */}
        <motion.section className="space-y-4" variants={fadeUp}>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">How are you feeling?</h2>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {moods.map((mood, i) => (
              <motion.div
                key={mood.id}
                variants={scaleIn}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <MoodButton
                  icon={mood.icon}
                  label={mood.label}
                  selected={selectedMood === mood.id}
                  onClick={() => setSelectedMood(selectedMood === mood.id ? null : mood.id)}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Recommended Destinations */}
        <motion.section className="space-y-4" variants={fadeUp}>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">
              {selectedMood
                ? `${selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)} Escapes`
                : "Recommended for You"
              }
            </h2>
            <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.DISCOVER)}>
              See all
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="aspect-[4/3] rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {displayedDestinations.map((destination, i) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  whileHover={{ y: -4 }}
                >
                  <DestinationCard
                    {...destination}
                    onClick={() => navigate(generateRoute.destination(destination.id))}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        {/* Real Trips from Database */}
        <motion.div variants={fadeUp}>
          <TripsList maxItems={2} showViewAll />
        </motion.div>
      </motion.div>

      <FloatingActionButton />
    </MobileLayout>
  );
}
