import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Moon,
  Globe,
  CreditCard,
  Download,
  Smartphone,
  Mail,
  MessageSquare,
  MapPin,
  ChevronRight,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/lib/routes";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SettingItem = {
  icon: React.ElementType;
  label: string;
  action: "navigate" | "toggle" | "select";
  value?: string;
  defaultValue?: boolean;
  options?: { value: string; label: string }[];
  description?: string;
  route?: string;
};

type SettingSection = {
  title: string;
  items: SettingItem[];
};

const settingsSections: SettingSection[] = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Edit Profile", action: "navigate" },
      { icon: Mail, label: "Email", value: "user@example.com", action: "navigate" },
      { icon: CreditCard, label: "Subscription", value: "Free Plan", action: "navigate" },
    ],
  },
  {
    title: "Notifications",
    items: [
      {
        icon: Bell,
        label: "Push Notifications",
        action: "toggle",
        defaultValue: true,
        description: "Receive trip reminders and updates",
      },
      {
        icon: Mail,
        label: "Email Notifications",
        action: "toggle",
        defaultValue: true,
        description: "Weekly travel inspiration",
      },
      {
        icon: MessageSquare,
        label: "In-App Messages",
        action: "toggle",
        defaultValue: true,
        description: "Chat and tips from AI coach",
      },
    ],
  },
  {
    title: "Preferences",
    items: [
      {
        icon: Moon,
        label: "Dark Mode",
        action: "toggle",
        defaultValue: false,
        description: "Use dark theme",
      },
      {
        icon: Globe,
        label: "Language",
        action: "select",
        value: "en",
        options: [
          { value: "en", label: "English" },
          { value: "es", label: "Español" },
          { value: "fr", label: "Français" },
          { value: "de", label: "Deutsch" },
          { value: "ja", label: "日本語" },
        ],
      },
      {
        icon: MapPin,
        label: "Distance Unit",
        action: "select",
        value: "mi",
        options: [
          { value: "mi", label: "Miles" },
          { value: "km", label: "Kilometers" },
        ],
      },
    ],
  },
  {
    title: "Data & Privacy",
    items: [
      { icon: Shield, label: "Privacy Settings", action: "navigate" },
      { icon: Download, label: "Download My Data", action: "navigate" },
      { icon: Smartphone, label: "Connected Devices", action: "navigate" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help Center", action: "navigate" },
      { icon: MessageSquare, label: "Send Feedback", action: "navigate", route: "/feedback" },
    ],
  },
];

export default function Settings() {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({});
  const [selectStates, setSelectStates] = useState<Record<string, string>>({});

  const handleLogout = () => {
    // TODO: Implement logout with Supabase
    navigate(ROUTES.LANDING);
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion
    navigate(ROUTES.LANDING);
  };

  const getToggleState = (label: string, defaultValue: boolean = false) => {
    return toggleStates[label] ?? defaultValue;
  };

  const setToggleState = (label: string, value: boolean) => {
    setToggleStates((prev) => ({ ...prev, [label]: value }));
  };

  const getSelectState = (label: string, defaultValue: string = "") => {
    return selectStates[label] ?? defaultValue;
  };

  const setSelectState = (label: string, value: string) => {
    setSelectStates((prev) => ({ ...prev, [label]: value }));
  };

  return (
    <div className="min-h-screen bg-background pb-safe">
      {/* Header */}
      <div className="sticky top-0 z-40 glass border-b border-border pt-safe">
        <div className="flex items-center gap-4 h-14 px-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-display text-lg font-semibold">Settings</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {settingsSections.map((section) => (
          <div key={section.title} className="space-y-3">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {section.title}
            </h2>
            <div className="rounded-xl border border-border overflow-hidden bg-card">
              {section.items.map((item, index) => (
                <div key={item.label}>
                  {index > 0 && <Separator />}
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                        <item.icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-sm">{item.label}</span>
                        {item.description && (
                          <p className="text-xs text-muted-foreground">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                    {item.action === "toggle" && (
                      <Switch
                        checked={getToggleState(item.label, item.defaultValue)}
                        onCheckedChange={(value) =>
                          setToggleState(item.label, value)
                        }
                      />
                    )}
                    {item.action === "select" && item.options && (
                      <Select
                        value={getSelectState(item.label, item.value)}
                        onValueChange={(value) =>
                          setSelectState(item.label, value)
                        }
                      >
                        <SelectTrigger className="w-[120px] h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {item.options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    {item.action === "navigate" && (
                      <div className="flex items-center gap-2">
                        {item.value && (
                          <span className="text-sm text-muted-foreground">
                            {item.value}
                          </span>
                        )}
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Danger Zone */}
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-destructive uppercase tracking-wide">
            Danger Zone
          </h2>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => setShowLogoutDialog(true)}
            >
              <LogOut className="mr-3 h-4 w-4" />
              Sign Out
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 className="mr-3 h-4 w-4" />
              Delete Account
            </Button>
          </div>
        </div>

        {/* App Info */}
        <div className="text-center text-sm text-muted-foreground pt-4 pb-8">
          <p className="font-medium">TripTuner v1.0.0</p>
          <p className="mt-1">Made with ❤️ for travelers</p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">
              Terms
            </a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">
              Licenses
            </a>
          </div>
        </div>
      </div>

      {/* Logout Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign out?</AlertDialogTitle>
            <AlertDialogDescription>
              You'll need to sign in again to access your trips and preferences.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Sign Out</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Account Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete your account?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. All your trips, preferences, and data
              will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
