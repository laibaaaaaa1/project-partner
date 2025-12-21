import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Bell, Shield, HelpCircle, LogOut, Moon, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/lib/routes";

const settingsSections = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Edit Profile", action: "navigate" },
      { icon: Bell, label: "Notifications", action: "toggle", defaultValue: true },
      { icon: Shield, label: "Privacy & Security", action: "navigate" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: Moon, label: "Dark Mode", action: "toggle", defaultValue: false },
      { icon: Globe, label: "Language", value: "English", action: "navigate" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help & FAQ", action: "navigate" },
    ],
  },
];

export default function Settings() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Implement logout with Supabase
    navigate(ROUTES.LANDING);
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
            <div className="rounded-xl border border-border overflow-hidden">
              {section.items.map((item, index) => (
                <div key={item.label}>
                  {index > 0 && <Separator />}
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.action === "toggle" && (
                      <Switch defaultChecked={item.defaultValue} />
                    )}
                    {item.action === "navigate" && item.value && (
                      <span className="text-sm text-muted-foreground">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full text-destructive hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Sign Out
        </Button>

        {/* App Info */}
        <div className="text-center text-sm text-muted-foreground pt-4">
          <p>TripTuner v1.0.0</p>
          <p className="mt-1">Made with ❤️ for travelers</p>
        </div>
      </div>
    </div>
  );
}