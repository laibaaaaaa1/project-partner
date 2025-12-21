import { WifiOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Offline() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
      <div className="p-6 rounded-full bg-muted mb-6">
        <WifiOff className="h-12 w-12 text-muted-foreground" />
      </div>
      
      <h1 className="font-display text-2xl font-bold mb-2">You're Offline</h1>
      <p className="text-muted-foreground mb-8 max-w-xs">
        Don't worry! Your saved trips and important information are still available.
      </p>

      <Button onClick={handleRetry} className="gap-2">
        <RefreshCw className="h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
}