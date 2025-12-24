import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "@/lib/routes";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { InstallPrompt } from "@/components/pwa";

// Pages
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Discover from "./pages/Discover";
import DestinationDetails from "./pages/DestinationDetails";
import Trips from "./pages/Trips";
import TripDetails from "./pages/TripDetails";
import CreateTrip from "./pages/CreateTrip";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Offline from "./pages/Offline";
import GeneratedItinerary from "./pages/GeneratedItinerary";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
        <InstallPrompt />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
