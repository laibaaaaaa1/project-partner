import { useState, useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Map, Sparkles, Brain, Wallet, CloudSun, ChevronLeft, ChevronRight, Globe, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

const AirplaneScene = lazy(() => import("@/components/3d/AirplaneScene"));

const features = [
  { icon: Brain, title: "AI-Powered Planning", description: "Get personalized itineraries crafted by AI based on your preferences and travel style." },
  { icon: Sparkles, title: "Mood-Based Discovery", description: "Find destinations that match your current mood - adventurous, relaxing, or cultural." },
  { icon: Wallet, title: "Smart Budgeting", description: "Track expenses and get budget-optimized recommendations for every trip." },
  { icon: CloudSun, title: "Weather Integration", description: "Plan with confidence using real-time weather forecasts for your destinations." },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};
const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Landing() {
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentFeature((prev) => (prev + 1) % features.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const nextFeature = () => setCurrentFeature((prev) => (prev + 1) % features.length);
  const prevFeature = () => setCurrentFeature((prev) => (prev - 1 + features.length) % features.length);

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      {/* Hero Section */}
      <div className="flex-1 bg-gradient-hero relative flex flex-col items-center justify-center px-6 py-16 text-center overflow-hidden">
        {/* Animated background orbs */}
        <motion.div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-coral/20 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-teal/15 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-golden/10 blur-2xl"
          animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div className="space-y-6 max-w-md relative z-10" variants={container} initial="hidden" animate="visible">
          {/* Logo */}
          <motion.div className="flex items-center justify-center gap-3 mb-8" variants={scaleIn}>
            <motion.div
              className="p-3.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/10 shadow-lg"
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Compass className="h-10 w-10 text-primary-foreground" />
            </motion.div>
            <h1 className="font-display text-4xl font-bold text-primary-foreground tracking-tight">
              TripTuner
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.h2 className="font-display text-2xl md:text-3xl font-semibold text-primary-foreground leading-tight" variants={fadeUp}>
            Your AI-Powered Travel Companion
          </motion.h2>
          <motion.p className="text-primary-foreground/80 text-lg leading-relaxed" variants={fadeUp}>
            Plan perfect trips with personalized recommendations, mood-based destinations, and smart itineraries.
          </motion.p>

          {/* Quick feature icons - animated grid */}
          <motion.div className="grid grid-cols-3 gap-5 pt-6" variants={container}>
            {[
              { icon: Sparkles, label: "AI Planning" },
              { icon: Globe, label: "200+ Places" },
              { icon: Zap, label: "Instant Plans" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center gap-2 text-primary-foreground/90"
                variants={scaleIn}
                whileHover={{ y: -4, scale: 1.05 }}
              >
                <motion.div
                  className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                >
                  <item.icon className="h-5 w-5" />
                </motion.div>
                <span className="text-xs font-medium">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* 3D Airplane Scene */}
          <motion.div
            className="w-full h-72 md:h-80 -mb-6 mt-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-primary-foreground/50 text-sm">Loading 3D scene…</div>}>
              <AirplaneScene />
            </Suspense>
          </motion.div>
        </motion.div>
      </div>

      {/* Feature Carousel */}
      <motion.div
        className="bg-muted/30 py-8 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-md mx-auto">
          <motion.div className="flex items-center justify-between mb-4" variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h3 className="font-display font-semibold text-foreground">Why TripTuner?</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={prevFeature}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={nextFeature}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentFeature * 100}%)` }}
            >
              {features.map((feature, index) => (
                <div key={index} className="w-full flex-shrink-0 p-6 bg-card rounded-xl border border-border shadow-sm">
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="p-3 rounded-xl bg-gradient-to-br from-primary/15 to-teal/10"
                      whileHover={{ rotate: 10 }}
                    >
                      <feature.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
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
                className={`h-2 rounded-full transition-all duration-300 ${index === currentFeature ? "w-6 bg-primary" : "w-2 bg-primary/30"}`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="p-6 pb-safe bg-background space-y-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button asChild size="lg" className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-ocean-dark hover:opacity-90 transition-opacity shadow-lg">
            <Link to={ROUTES.SIGNUP}>
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button asChild variant="outline" size="lg" className="w-full h-14 text-lg border-2">
            <Link to={ROUTES.SIGNIN}>Sign In</Link>
          </Button>
        </motion.div>
        <p className="text-center text-xs text-muted-foreground pt-2">
          Free to use • No credit card required
        </p>
      </motion.div>
    </div>
  );
}
