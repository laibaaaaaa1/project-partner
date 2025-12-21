import { User, MapPin, Settings, ChevronRight, Heart, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

const stats = [
  { label: "Trips", value: "12" },
  { label: "Countries", value: "8" },
  { label: "Days", value: "87" },
];

const menuItems = [
  { icon: Heart, label: "Saved Destinations", to: "/saved" },
  { icon: Award, label: "Travel Achievements", to: "/achievements" },
  { icon: Settings, label: "Settings", to: ROUTES.SETTINGS },
];

export default function Profile() {
  const navigate = useNavigate();

  return (
    <MobileLayout headerTitle="Profile">
      <div className="px-4 py-6 space-y-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-ocean flex items-center justify-center">
            <User className="h-10 w-10 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h1 className="font-display text-xl font-bold">Travel Explorer</h1>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">San Francisco, CA</span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center p-4 rounded-xl bg-muted/50"
            >
              <span className="font-display text-2xl font-bold text-primary">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Travel Preferences */}
        <div className="p-4 rounded-xl border border-border space-y-3">
          <h2 className="font-display font-semibold">Travel Style</h2>
          <div className="flex flex-wrap gap-2">
            {["Adventure", "Cultural", "Beach"].map((style) => (
              <span
                key={style}
                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
              >
                {style}
              </span>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.to)}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
            >
              <item.icon className="h-5 w-5 text-muted-foreground" />
              <span className="flex-1 text-left font-medium">{item.label}</span>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}