import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "@/lib/routes";

interface ProtectedRouteProps {
  children: ReactNode;
}

// TODO: Replace with actual auth check from Supabase
const useAuth = () => {
  // Temporary: always return authenticated for development
  // This will be replaced with actual Supabase auth in Phase 5
  return { isAuthenticated: true, isLoading: false };
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.SIGNIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}