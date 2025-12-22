import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  DollarSign, 
  CheckSquare, 
  FileText, 
  Share2,
  Edit3,
  Clock,
  Users,
  Plus,
  Trash2,
  Upload,
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Mock trip data
const mockTrip = {
  id: "1",
  title: "Tokyo Adventure",
  destination: "Tokyo, Japan",
  imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
  startDate: "2024-03-15",
  endDate: "2024-03-25",
  status: "upcoming" as const,
  travelers: 2,
  budget: { total: 3000, spent: 1200, currency: "USD" },
  itinerary: [
    { 
      day: 1, 
      date: "Mar 15",
      title: "Arrival & Shibuya", 
      activities: [
        { time: "14:00", name: "Airport arrival & transfer", duration: "2h" },
        { time: "16:00", name: "Hotel check-in", duration: "1h" },
        { time: "18:00", name: "Shibuya Crossing & Hachiko", duration: "2h" },
        { time: "20:00", name: "Dinner at Ichiran Ramen", duration: "1.5h" },
      ]
    },
    { 
      day: 2, 
      date: "Mar 16",
      title: "Traditional Tokyo", 
      activities: [
        { time: "09:00", name: "Senso-ji Temple", duration: "2h" },
        { time: "11:30", name: "Nakamise Shopping Street", duration: "1h" },
        { time: "14:00", name: "Meiji Shrine", duration: "2h" },
        { time: "16:30", name: "Harajuku & Takeshita Street", duration: "2h" },
      ]
    },
    { 
      day: 3, 
      date: "Mar 17",
      title: "Modern Tokyo", 
      activities: [
        { time: "10:00", name: "TeamLab Borderless", duration: "3h" },
        { time: "14:00", name: "Odaiba Seaside", duration: "2h" },
        { time: "17:00", name: "Tokyo Tower sunset", duration: "2h" },
        { time: "19:30", name: "Roppongi nightlife", duration: "3h" },
      ]
    },
  ],
  packingList: [
    { id: "1", item: "Passport", checked: true, category: "Documents" },
    { id: "2", item: "Travel adapter (Type A/B)", checked: true, category: "Electronics" },
    { id: "3", item: "Comfortable walking shoes", checked: true, category: "Clothing" },
    { id: "4", item: "Light jacket", checked: false, category: "Clothing" },
    { id: "5", item: "Portable WiFi/SIM card", checked: false, category: "Electronics" },
    { id: "6", item: "JR Pass", checked: false, category: "Documents" },
    { id: "7", item: "Cash (Yen)", checked: false, category: "Money" },
    { id: "8", item: "Camera", checked: true, category: "Electronics" },
  ],
  documents: [
    { id: "1", name: "Flight Confirmation", type: "PDF", uploadedAt: "2024-02-20" },
    { id: "2", name: "Hotel Booking", type: "PDF", uploadedAt: "2024-02-18" },
  ],
};

export default function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [packingList, setPackingList] = useState(mockTrip.packingList);
  const [activeTab, setActiveTab] = useState("itinerary");

  const togglePackingItem = (itemId: string) => {
    setPackingList((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const checkedCount = packingList.filter((item) => item.checked).length;
  const packingProgress = (checkedCount / packingList.length) * 100;
  const budgetProgress = (mockTrip.budget.spent / mockTrip.budget.total) * 100;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: mockTrip.title,
        text: `Check out my trip to ${mockTrip.destination}!`,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const formatDateRange = () => {
    const start = new Date(mockTrip.startDate);
    const end = new Date(mockTrip.endDate);
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
    return `${start.toLocaleDateString("en-US", options)} - ${end.toLocaleDateString("en-US", options)}`;
  };

  const getDaysUntil = () => {
    const start = new Date(mockTrip.startDate);
    const today = new Date();
    const diff = Math.ceil((start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  return (
    <div className="min-h-screen bg-background pb-safe">
      {/* Hero */}
      <div className="relative h-56">
        <img
          src={mockTrip.imageUrl}
          alt={mockTrip.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        {/* Top Actions */}
        <div className="absolute top-0 left-0 right-0 pt-safe px-4 py-4 flex justify-between">
          <Button
            variant="secondary"
            size="icon"
            className="bg-background/80 backdrop-blur-sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              size="icon" 
              className="bg-background/80 backdrop-blur-sm"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="bg-background/80 backdrop-blur-sm">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Trip
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Trip
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-primary/90">{getDaysUntil()} days to go</Badge>
            <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
              {mockTrip.status}
            </Badge>
          </div>
          <h1 className="font-display text-2xl font-bold">{mockTrip.title}</h1>
          <div className="flex items-center gap-2 text-muted-foreground mt-1">
            <MapPin className="h-4 w-4" />
            <span>{mockTrip.destination}</span>
          </div>
        </div>
      </div>

      {/* Quick Info Bar */}
      <div className="px-4 py-4 flex items-center gap-6 border-b border-border overflow-x-auto">
        <div className="flex items-center gap-2 shrink-0">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="text-sm">{formatDateRange()}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Users className="h-4 w-4 text-primary" />
          <span className="text-sm">{mockTrip.travelers} travelers</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <DollarSign className="h-4 w-4 text-primary" />
          <span className="text-sm">
            ${mockTrip.budget.spent.toLocaleString()} / ${mockTrip.budget.total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Budget Progress */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Budget used</span>
          <span className="font-medium">{Math.round(budgetProgress)}%</span>
        </div>
        <Progress value={budgetProgress} className="h-2" />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4 py-4">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="packing">
            Packing
            <Badge variant="secondary" className="ml-1.5 h-5 px-1.5 text-xs">
              {checkedCount}/{packingList.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="documents">Docs</TabsTrigger>
        </TabsList>

        {/* Itinerary Tab */}
        <TabsContent value="itinerary" className="mt-6 space-y-4">
          {mockTrip.itinerary.map((day) => (
            <div key={day.day} className="rounded-xl border border-border overflow-hidden">
              <div className="flex items-center gap-3 p-4 bg-muted/30 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="font-bold text-primary-foreground">{day.day}</span>
                </div>
                <div>
                  <h3 className="font-display font-semibold">{day.title}</h3>
                  <p className="text-xs text-muted-foreground">{day.date}</p>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {day.activities.map((activity, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-medium text-primary">{activity.time}</span>
                      <div className="w-px flex-1 bg-border mt-1" />
                    </div>
                    <div className="flex-1 pb-3">
                      <p className="font-medium text-sm">{activity.name}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <Clock className="h-3 w-3" />
                        {activity.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Day
          </Button>
        </TabsContent>

        {/* Packing Tab */}
        <TabsContent value="packing" className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{checkedCount} of {packingList.length} packed</p>
              <p className="text-xs text-muted-foreground">Keep going!</p>
            </div>
            <Progress value={packingProgress} className="w-24 h-2" />
          </div>

          <div className="space-y-2">
            {packingList.map((item) => (
              <div
                key={item.id}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                  item.checked 
                    ? "bg-primary/5 border-primary/20" 
                    : "border-border hover:border-primary/30"
                }`}
              >
                <Checkbox
                  checked={item.checked}
                  onCheckedChange={() => togglePackingItem(item.id)}
                />
                <div className="flex-1">
                  <span className={item.checked ? "line-through text-muted-foreground" : ""}>
                    {item.item}
                  </span>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="mt-6 space-y-4">
          {mockTrip.documents.length > 0 ? (
            <>
              {mockTrip.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {doc.type} • Uploaded {doc.uploadedAt}
                    </p>
                  </div>
                </div>
              ))}
            </>
          ) : null}

          <Button variant="outline" className="w-full">
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
