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
  Mountain,
  Crown,
  Tent,
  Palette,
  Building2,
  Backpack,
  Sparkles,
  Utensils,
  Music,
  Waves,
  TreePine,
  Check,
  Loader2,
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
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserProfile, useUpdateProfile, useUserPreferences, useUpsertPreferences } from "@/hooks/useUserPreferences";
import { useTrips } from "@/hooks/useTrips";

const travelStyles = [
  { id: "adventure", label: "Adventure", icon: Mountain },
  { id: "luxury", label: "Luxury", icon: Crown },
  { id: "budget", label: "Budget", icon: Tent },
  { id: "cultural", label: "Cultural", icon: Palette },
];

const accommodationTypes = [
  { id: "hotel", label: "Hotels", icon: Building2 },
  { id: "hostel", label: "Hostels & B&Bs", icon: Backpack },
  { id: "resort", label: "Resorts", icon: Sparkles },
  { id: "camping", label: "Camping", icon: Tent },
];

const activityTypes = [
  { id: "photography", label: "Photography", icon: Camera },
  { id: "food", label: "Food & Cuisine", icon: Utensils },
  { id: "nightlife", label: "Nightlife", icon: Music },
  { id: "romance", label: "Romance", icon: Heart },
  { id: "beach", label: "Beach & Water", icon: Waves },
  { id: "nature", label: "Nature", icon: TreePine },
];

const travelFrequencies = [
  { id: "rarely", label: "Rarely" },
  { id: "sometimes", label: "Sometimes" },
  { id: "often", label: "Often" },
  { id: "frequently", label: "Frequently" },
];

const menuItems = [
  { icon: Heart, label: "Saved Destinations", to: "/saved", count: 0 },
  { icon: Award, label: "Travel Achievements", to: "/achievements", count: 0 },
  { icon: Settings, label: "Settings", to: ROUTES.SETTINGS },
];

const savedDestinations = [
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Kyoto",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=200&h=200&fit=crop",
  },
  {
    id: 4,
    name: "Machu Picchu",
    country: "Peru",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=200&h=200&fit=crop",
  },
];

export default function Profile() {
  const navigate = useNavigate();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showPreferencesDialog, setShowPreferencesDialog] = useState(false);
  
  // Fetch real data
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const { data: preferences, isLoading: preferencesLoading } = useUserPreferences();
  const { data: trips } = useTrips();
  const updateProfile = useUpdateProfile();
  const upsertPreferences = useUpsertPreferences();

  // Local state for editing
  const [editProfile, setEditProfile] = useState({
    full_name: "",
    email: "",
  });

  // Preferences editing state
  const [editPrefs, setEditPrefs] = useState({
    travel_styles: [] as string[],
    budget_range: "1500",
    accommodation_preferences: [] as string[],
    activity_preferences: [] as string[],
    travel_frequency: "",
  });

  // Calculate stats from trips
  const tripCount = trips?.length || 0;
  const uniqueCountries = new Set(
    trips?.flatMap(t => t.destinations?.map(d => d.country).filter(Boolean) || [])
  ).size;
  const totalDays = trips?.reduce((acc, trip) => {
    const start = new Date(trip.start_date);
    const end = new Date(trip.end_date);
    return acc + Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }, 0) || 0;

  const stats = [
    { icon: Plane, label: "Trips", value: tripCount.toString(), color: "text-primary" },
    { icon: Globe, label: "Countries", value: uniqueCountries.toString(), color: "text-secondary" },
    { icon: Calendar, label: "Days", value: totalDays.toString(), color: "text-accent" },
  ];

  const openEditProfile = () => {
    setEditProfile({
      full_name: profile?.full_name || "",
      email: profile?.email || "",
    });
    setShowEditDialog(true);
  };

  const openEditPreferences = () => {
    setEditPrefs({
      travel_styles: preferences?.travel_styles || [],
      budget_range: preferences?.budget_range || "1500",
      accommodation_preferences: preferences?.accommodation_preferences || [],
      activity_preferences: preferences?.activity_preferences || [],
      travel_frequency: preferences?.travel_frequency || "",
    });
    setShowPreferencesDialog(true);
  };

  const handleSaveProfile = async () => {
    await updateProfile.mutateAsync({
      full_name: editProfile.full_name,
    });
    setShowEditDialog(false);
  };

  const handleSavePreferences = async () => {
    await upsertPreferences.mutateAsync({
      travel_styles: editPrefs.travel_styles,
      budget_range: editPrefs.budget_range,
      accommodation_preferences: editPrefs.accommodation_preferences,
      activity_preferences: editPrefs.activity_preferences,
      travel_frequency: editPrefs.travel_frequency,
    });
    setShowPreferencesDialog(false);
  };

  const togglePref = (
    id: string,
    field: "travel_styles" | "accommodation_preferences" | "activity_preferences"
  ) => {
    setEditPrefs((prev) => ({
      ...prev,
      [field]: prev[field].includes(id)
        ? prev[field].filter((s) => s !== id)
        : [...prev[field], id],
    }));
  };

  const formatBudget = (value: string) => {
    const num = parseInt(value);
    if (num >= 5000) return "$5,000+";
    return `$${num.toLocaleString()}`;
  };

  const displayName = profile?.full_name || "Travel Explorer";
  const displayEmail = profile?.email || "";

  return (
    <MobileLayout headerTitle="Profile">
      <div className="px-4 py-6 space-y-6">
        {/* Profile Header */}
        <div className="relative">
          {profileLoading ? (
            <div className="flex items-center gap-4">
              <Skeleton className="w-24 h-24 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-ocean flex items-center justify-center shadow-lg">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={displayName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12 text-primary-foreground" />
                  )}
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center shadow-sm">
                  <Camera className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
              <div className="flex-1">
                <h1 className="font-display text-xl font-bold">{displayName}</h1>
                <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{displayEmail}</span>
                </div>
              </div>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            className="absolute top-0 right-0"
            onClick={openEditProfile}
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
        <div className="p-4 rounded-xl border border-border space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold">Travel Preferences</h2>
            <Button variant="ghost" size="sm" className="text-xs" onClick={openEditPreferences}>
              Edit
            </Button>
          </div>
          
          {preferencesLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-3/4" />
            </div>
          ) : preferences ? (
            <div className="space-y-3">
              {/* Travel Styles */}
              {preferences.travel_styles?.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1.5">Style</p>
                  <div className="flex flex-wrap gap-2">
                    {preferences.travel_styles.map((style) => {
                      const config = travelStyles.find((s) => s.id === style);
                      return (
                        <span
                          key={style}
                          className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium capitalize"
                        >
                          {config?.label || style}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Budget */}
              {preferences.budget_range && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1.5">Budget per trip</p>
                  <span className="text-lg font-semibold text-accent">
                    {formatBudget(preferences.budget_range)}
                  </span>
                </div>
              )}

              {/* Accommodations */}
              {preferences.accommodation_preferences?.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1.5">Accommodations</p>
                  <div className="flex flex-wrap gap-2">
                    {preferences.accommodation_preferences.map((acc) => {
                      const config = accommodationTypes.find((a) => a.id === acc);
                      return (
                        <span
                          key={acc}
                          className="px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium"
                        >
                          {config?.label || acc}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Activities */}
              {preferences.activity_preferences?.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1.5">Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {preferences.activity_preferences.map((act) => {
                      const config = activityTypes.find((a) => a.id === act);
                      return (
                        <span
                          key={act}
                          className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium"
                        >
                          {config?.label || act}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Travel Frequency */}
              {preferences.travel_frequency && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1.5">Travel Frequency</p>
                  <span className="text-sm font-medium capitalize">
                    {travelFrequencies.find((f) => f.id === preferences.travel_frequency)?.label || preferences.travel_frequency}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground text-sm mb-3">
                No preferences set yet
              </p>
              <Button size="sm" onClick={openEditPreferences}>
                Set Preferences
              </Button>
            </div>
          )}
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
              {item.count !== undefined && (
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
                value={editProfile.full_name}
                onChange={(e) =>
                  setEditProfile((p) => ({ ...p, full_name: e.target.value }))
                }
                maxLength={100}
              />
            </div>
            <Button
              className="w-full"
              onClick={handleSaveProfile}
              disabled={updateProfile.isPending}
            >
              {updateProfile.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Preferences Dialog */}
      <Dialog open={showPreferencesDialog} onOpenChange={setShowPreferencesDialog}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Travel Preferences</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Travel Styles */}
            <div className="space-y-3">
              <Label>Travel Style</Label>
              <div className="grid grid-cols-2 gap-2">
                {travelStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => togglePref(style.id, "travel_styles")}
                    className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      editPrefs.travel_styles.includes(style.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <style.icon className={`h-4 w-4 ${
                      editPrefs.travel_styles.includes(style.id) ? "text-primary" : "text-muted-foreground"
                    }`} />
                    <span className="text-sm font-medium">{style.label}</span>
                    {editPrefs.travel_styles.includes(style.id) && (
                      <Check className="h-4 w-4 text-primary ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-3">
              <Label>Budget per Trip</Label>
              <div className="text-center py-2">
                <span className="text-2xl font-bold text-primary">
                  {formatBudget(editPrefs.budget_range)}
                </span>
              </div>
              <Slider
                value={[parseInt(editPrefs.budget_range) || 1500]}
                onValueChange={(v) => setEditPrefs((p) => ({ ...p, budget_range: v[0].toString() }))}
                min={500}
                max={5000}
                step={100}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$500</span>
                <span>$5,000+</span>
              </div>
            </div>

            {/* Accommodations */}
            <div className="space-y-3">
              <Label>Preferred Accommodations</Label>
              <div className="grid grid-cols-2 gap-2">
                {accommodationTypes.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => togglePref(acc.id, "accommodation_preferences")}
                    className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      editPrefs.accommodation_preferences.includes(acc.id)
                        ? "border-secondary bg-secondary/5"
                        : "border-border hover:border-secondary/30"
                    }`}
                  >
                    <acc.icon className={`h-4 w-4 ${
                      editPrefs.accommodation_preferences.includes(acc.id) ? "text-secondary" : "text-muted-foreground"
                    }`} />
                    <span className="text-sm font-medium">{acc.label}</span>
                    {editPrefs.accommodation_preferences.includes(acc.id) && (
                      <Check className="h-4 w-4 text-secondary ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div className="space-y-3">
              <Label>Interests & Activities</Label>
              <div className="grid grid-cols-2 gap-2">
                {activityTypes.map((act) => (
                  <button
                    key={act.id}
                    onClick={() => togglePref(act.id, "activity_preferences")}
                    className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      editPrefs.activity_preferences.includes(act.id)
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/30"
                    }`}
                  >
                    <act.icon className={`h-4 w-4 ${
                      editPrefs.activity_preferences.includes(act.id) ? "text-accent" : "text-muted-foreground"
                    }`} />
                    <span className="text-sm font-medium">{act.label}</span>
                    {editPrefs.activity_preferences.includes(act.id) && (
                      <Check className="h-4 w-4 text-accent ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Frequency */}
            <div className="space-y-3">
              <Label>Travel Frequency</Label>
              <div className="grid grid-cols-2 gap-2">
                {travelFrequencies.map((freq) => (
                  <button
                    key={freq.id}
                    onClick={() => setEditPrefs((p) => ({ ...p, travel_frequency: freq.id }))}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      editPrefs.travel_frequency === freq.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <span className={`text-sm font-medium ${
                      editPrefs.travel_frequency === freq.id ? "text-primary" : "text-muted-foreground"
                    }`}>
                      {freq.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <Button
              className="w-full"
              onClick={handleSavePreferences}
              disabled={upsertPreferences.isPending}
            >
              {upsertPreferences.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Preferences"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
}
