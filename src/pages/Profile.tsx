import { useState } from "react";
import {
  User,
  MapPin,
  Settings,
  ChevronRight,
  Heart,
  Award,
  Camera,
  Edit2,
  Globe,
  Calendar,
  Plane,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const stats = [
  { icon: Plane, label: "Trips", value: "12", color: "text-primary" },
  { icon: Globe, label: "Countries", value: "8", color: "text-secondary" },
  { icon: Calendar, label: "Days", value: "87", color: "text-accent" },
];

const menuItems = [
  { icon: Heart, label: "Saved Destinations", to: "/saved", count: 15 },
  { icon: Award, label: "Travel Achievements", to: "/achievements", count: 7 },
  { icon: Settings, label: "Settings", to: ROUTES.SETTINGS },
];

const savedDestinations = [
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Santorini",
    country: "Greece",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Kyoto",
    country: "Japan",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=200&h=200&fit=crop",
  },
  {
    id: 4,
    name: "Machu Picchu",
    country: "Peru",
    image:
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=200&h=200&fit=crop",
  },
];

const achievements = [
  { id: 1, name: "Globe Trotter", description: "Visit 5+ countries", earned: true },
  { id: 2, name: "Adventure Seeker", description: "Complete 10 trips", earned: true },
  { id: 3, name: "Beach Lover", description: "Visit 3 beach destinations", earned: true },
  { id: 4, name: "Culture Vulture", description: "Visit 5 UNESCO sites", earned: false },
];

export default function Profile() {
  const navigate = useNavigate();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [profile, setProfile] = useState({
    name: "Travel Explorer",
    location: "San Francisco, CA",
    bio: "Passionate traveler exploring the world one destination at a time.",
  });

  return (
    <MobileLayout headerTitle="Profile">
      <div className="px-4 py-6 space-y-6">
        {/* Profile Header */}
        <div className="relative">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-ocean flex items-center justify-center shadow-lg">
                <User className="h-12 w-12 text-primary-foreground" />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center shadow-sm">
                <Camera className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <div className="flex-1">
              <h1 className="font-display text-xl font-bold">{profile.name}</h1>
              <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{profile.location}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {profile.bio}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="absolute top-0 right-0"
            onClick={() => setShowEditDialog(true)}
          >
            <Edit2 className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center p-4 rounded-xl bg-muted/50 border border-border/50"
            >
              <stat.icon className={`h-5 w-5 ${stat.color} mb-2`} />
              <span className="font-display text-2xl font-bold">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Travel Preferences */}
        <div className="p-4 rounded-xl border border-border space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold">Travel Style</h2>
            <Button variant="ghost" size="sm" className="text-xs">
              Edit
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Adventure", "Cultural", "Beach", "Luxury"].map((style) => (
              <span
                key={style}
                className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
              >
                {style}
              </span>
            ))}
          </div>
        </div>

        {/* Saved Destinations */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold">Saved Destinations</h2>
            <Button variant="ghost" size="sm" className="text-xs text-primary">
              See All
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {savedDestinations.map((dest) => (
              <div key={dest.id} className="space-y-1">
                <div className="aspect-square rounded-xl overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs font-medium text-center truncate">
                  {dest.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold">Achievements</h2>
            <span className="text-xs text-muted-foreground">
              {achievements.filter((a) => a.earned).length}/{achievements.length}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-3 rounded-xl border text-center ${
                  achievement.earned
                    ? "border-accent/50 bg-accent/10"
                    : "border-border bg-muted/30 opacity-50"
                }`}
              >
                <Award
                  className={`h-6 w-6 mx-auto mb-1 ${
                    achievement.earned ? "text-accent" : "text-muted-foreground"
                  }`}
                />
                <p className="text-[10px] font-medium leading-tight">
                  {achievement.name}
                </p>
              </div>
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
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <item.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <span className="flex-1 text-left font-medium">{item.label}</span>
              {item.count && (
                <span className="text-sm text-muted-foreground">
                  {item.count}
                </span>
              )}
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, name: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, location: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, bio: e.target.value }))
                }
                rows={3}
              />
            </div>
            <Button
              className="w-full"
              onClick={() => setShowEditDialog(false)}
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
}
