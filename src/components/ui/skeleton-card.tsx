import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
  aspectRatio?: "square" | "video" | "wide";
}

const aspectClasses = {
  square: "aspect-square",
  video: "aspect-video",
  wide: "aspect-[2/1]",
};

export function SkeletonCard({ className, aspectRatio = "video" }: SkeletonCardProps) {
  return (
    <div className={cn("rounded-lg overflow-hidden bg-muted", className)}>
      <div className={cn("shimmer w-full", aspectClasses[aspectRatio])} />
      <div className="p-4 space-y-3">
        <div className="shimmer h-5 w-3/4 rounded" />
        <div className="shimmer h-4 w-1/2 rounded" />
        <div className="flex gap-2">
          <div className="shimmer h-6 w-16 rounded-full" />
          <div className="shimmer h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}