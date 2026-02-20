import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "@/lib/routes";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { InstallPrompt } from "@/components/pwa";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SuspenseFallback } from "@/components/SuspenseFallback";
import { AuthProvider } from "@/hooks/useAuth";

// Lazy load pages for better performance
const Landing = lazy(() => import("./pages/Landing"));
const SignUp = lazy(() => import("./pages/SignUp"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Discover = lazy(() => import("./pages/Discover"));
const DestinationDetails = lazy(() => import("./pages/DestinationDetails"));
const Trips = lazy(() => import("./pages/Trips"));
const TripDetails = lazy(() => import("./pages/TripDetails"));
const CreateTrip = lazy(() => import("./pages/CreateTrip"));
const Chat = lazy(() => import("./pages/Chat"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));
const Offline = lazy(() => import("./pages/Offline"));
const GeneratedItinerary = lazy(() => import("./pages/GeneratedItinerary"));
const Feedback = lazy(() => import("./pages/Feedback"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<SuspenseFallback />}>
              <Routes>
                {/* Public Routes */}
                <Route path={ROUTES.LANDING} element={<Landing />} />
                <Route path={ROUTES.SIGNUP} element={<SignUp />} />
                <Route path={ROUTES.SIGNIN} element={<SignIn />} />
                <Route path={ROUTES.ONBOARDING} element={<Onboarding />} />
                <Route path={ROUTES.OFFLINE} element={<Offline />} />

                {/* Protected Routes */}
                <Route path={ROUTES.DASHBOARD} element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path={ROUTES.DISCOVER} element={<ProtectedRoute><Discover /></ProtectedRoute>} />
                <Route path={ROUTES.DESTINATION} element={<ProtectedRoute><DestinationDetails /></ProtectedRoute>} />
                <Route path={ROUTES.TRIPS} element={<ProtectedRoute><Trips /></ProtectedRoute>} />
                <Route path={ROUTES.TRIP} element={<ProtectedRoute><TripDetails /></ProtectedRoute>} />
                <Route path={ROUTES.CREATE_TRIP} element={<ProtectedRoute><CreateTrip /></ProtectedRoute>} />
                <Route path={ROUTES.GENERATED_ITINERARY} element={<ProtectedRoute><GeneratedItinerary /></ProtectedRoute>} />
                <Route path={ROUTES.ITINERARY} element={<ProtectedRoute><TripDetails /></ProtectedRoute>} />
                <Route path={ROUTES.CHAT} element={<ProtectedRoute><Chat /></ProtectedRoute>} />
                <Route path={ROUTES.PROFILE} element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path={ROUTES.SETTINGS} element={<ProtectedRoute><Settings /></ProtectedRoute>} />

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <InstallPrompt />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
