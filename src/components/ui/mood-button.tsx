import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MoodButtonProps {
  icon: LucideIcon;
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function MoodButton({ icon: Icon, label, selected = false, onClick, className }: MoodButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-4 rounded-xl transition-all duration-200 min-w-touch",
        "border-2",
        selected
          ? "bg-secondary/10 border-secondary text-secondary"
          : "bg-card border-border text-muted-foreground hover:border-primary/30 hover:bg-muted/50",
        className
      )}
    >
      <Icon className={cn("h-6 w-6", selected && "animate-pulse")} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}