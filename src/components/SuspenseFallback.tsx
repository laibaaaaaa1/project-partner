import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function SuspenseFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-muted-foreground text-sm animate-pulse">Loading...</p>
      </div>
    </div>
  );
}

export function PageSuspenseFallback() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <LoadingSpinner size="md" />
    </div>
  );
}
