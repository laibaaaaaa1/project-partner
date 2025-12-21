import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface FloatingActionButtonProps {
  onClick?: () => void;
  navigateTo?: string;
}

export function FloatingActionButton({ onClick, navigateTo = "/create-trip" }: FloatingActionButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(navigateTo);
    }
  };

  return (
    <Button
      onClick={handleClick}
      size="icon"
      className="fixed right-4 bottom-24 z-40 h-14 w-14 rounded-full bg-gradient-ocean shadow-lg hover:shadow-glow transition-all duration-300 animate-float"
    >
      <Plus className="h-6 w-6 text-primary-foreground" />
    </Button>
  );
}