import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface DestinationCardProps {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  budgetLevel?: "budget" | "moderate" | "luxury";
  bestSeason?: string;
  onClick?: () => void;
  className?: string;
}

const budgetLabels = {
  budget: "Budget-friendly",
  moderate: "Moderate",
  luxury: "Luxury",
};

const budgetColors = {
  budget: "bg-green-500/10 text-green-600 border-green-500/20",
  moderate: "bg-accent/10 text-accent-foreground border-accent/20",
  luxury: "bg-secondary/10 text-secondary border-secondary/20",
};

export function DestinationCard({
  name,
  location,
  imageUrl,
  budgetLevel = "moderate",
  bestSeason,
  onClick,
  className,
}: DestinationCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative w-full text-left overflow-hidden rounded-xl bg-card shadow-md",
        "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        className
      )}
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-display font-semibold text-lg text-card-foreground truncate">
          {name}
        </h3>
        
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="text-sm truncate">{location}</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <Badge variant="outline" className={cn("text-xs", budgetColors[budgetLevel])}>
            {budgetLabels[budgetLevel]}
          </Badge>
          {bestSeason && (
            <Badge variant="outline" className="text-xs">
              Best: {bestSeason}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
}