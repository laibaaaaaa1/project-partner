import { Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface TripCardProps {
  id: string;
  title: string;
  destination: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "ongoing" | "past" | "draft";
  onClick?: () => void;
  className?: string;
}

const statusStyles = {
  upcoming: "bg-primary/10 text-primary border-primary/20",
  ongoing: "bg-green-500/10 text-green-600 border-green-500/20",
  past: "bg-muted text-muted-foreground border-border",
  draft: "bg-accent/10 text-accent-foreground border-accent/20",
};

const statusLabels = {
  upcoming: "Upcoming",
  ongoing: "In Progress",
  past: "Completed",
  draft: "Draft",
};

export function TripCard({
  title,
  destination,
  imageUrl,
  startDate,
  endDate,
  status,
  onClick,
  className,
}: TripCardProps) {
  const formatDateRange = (start: string, end: string) => {
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
    return `${startDateObj.toLocaleDateString("en-US", options)} - ${endDateObj.toLocaleDateString("en-US", options)}`;
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex gap-4 w-full text-left p-3 rounded-xl bg-card",
        "border border-border transition-all duration-200",
        "hover:shadow-md hover:border-primary/30",
        className
      )}
    >
      {/* Thumbnail */}
      <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-semibold text-card-foreground truncate">
            {title}
          </h3>
          <Badge variant="outline" className={cn("text-xs shrink-0", statusStyles[status])}>
            {statusLabels[status]}
          </Badge>
        </div>

        <div className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="text-sm truncate">{destination}</span>
        </div>

        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 shrink-0" />
          <span className="text-sm">{formatDateRange(startDate, endDate)}</span>
        </div>
      </div>
    </button>
  );
}