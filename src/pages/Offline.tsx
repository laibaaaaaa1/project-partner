import { WifiOff, RefreshCw, MapPin, Calendar, Briefcase, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Mock cached trip data
const cachedTrip = {
  id: 1,
  destination: "Tokyo, Japan",
  dates: "Mar 15 - Mar 22, 2024",
  hotel: "Park Hyatt Tokyo",
  hotelAddress: "3-7-1-2 Nishi Shinjuku, Shinjuku-ku",
  confirmationCode: "PHT-2024-87654",
  emergencyContacts: [
    { name: "Embassy", phone: "+81-3-3224-5000" },
    { name: "Hotel", phone: "+81-3-5322-1234" },
  ],
};

const packingItems = [
  { name: "Passport", checked: true },
  { name: "Travel adapter", checked: true },
  { name: "Medications", checked: true },
  { name: "Phone charger", checked: false },
  { name: "Umbrella", checked: false },
];

export default function Offline() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 pb-safe">
      {/* Offline Banner */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="p-4 rounded-full bg-muted mb-4">
          <WifiOff className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="font-display text-xl font-bold mb-1">You're Offline</h1>
        <p className="text-sm text-muted-foreground max-w-xs">
          Don't worry! Your essential trip info is saved for offline access.
        </p>
        <Button
          onClick={handleRetry}
          variant="outline"
          size="sm"
          className="mt-4 gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try to Reconnect
        </Button>
      </div>

      {/* Cached Trip Info */}
      <div className="space-y-4">
        <h2 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Your Current Trip
        </h2>

        <Card className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-ocean flex items-center justify-center">
              <MapPin className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display font-bold">{cachedTrip.destination}</h3>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>{cachedTrip.dates}</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-muted/50 space-y-2">
            <div className="flex items-start gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium text-sm">{cachedTrip.hotel}</p>
                <p className="text-xs text-muted-foreground">
                  {cachedTrip.hotelAddress}
                </p>
                <p className="text-xs text-primary mt-1">
                  Confirmation: {cachedTrip.confirmationCode}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Emergency Contacts */}
        <Card className="p-4 space-y-3">
          <h3 className="font-display font-semibold flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Emergency Contacts
          </h3>
          <div className="space-y-2">
            {cachedTrip.emergencyContacts.map((contact) => (
              <a
                key={contact.name}
                href={`tel:${contact.phone}`}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <span className="font-medium text-sm">{contact.name}</span>
                <span className="text-sm text-primary">{contact.phone}</span>
              </a>
            ))}
          </div>
        </Card>

        {/* Packing List */}
        <Card className="p-4 space-y-3">
          <h3 className="font-display font-semibold">Essential Packing List</h3>
          <div className="space-y-2">
            {packingItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-3 p-2 rounded-lg"
              >
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    item.checked
                      ? "bg-primary border-primary"
                      : "border-muted-foreground"
                  }`}
                >
                  {item.checked && (
                    <svg
                      className="w-3 h-3 text-primary-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span
                  className={`text-sm ${
                    item.checked ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Offline Tips */}
        <div className="p-4 rounded-xl border border-border bg-muted/30">
          <h3 className="font-display font-semibold text-sm mb-2">
            Tips for Offline Mode
          </h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Download maps before traveling</li>
            <li>• Save important documents as screenshots</li>
            <li>• Enable data saving mode on your phone</li>
            <li>• Keep confirmation emails accessible offline</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
