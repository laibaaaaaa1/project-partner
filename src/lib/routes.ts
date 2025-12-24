// Route path constants
export const ROUTES = {
  LANDING: "/",
  SIGNUP: "/signup",
  SIGNIN: "/signin",
  ONBOARDING: "/onboarding",
  DASHBOARD: "/dashboard",
  DISCOVER: "/discover",
  DESTINATION: "/destination/:id",
  TRIPS: "/trips",
  TRIP: "/trip/:id",
  CREATE_TRIP: "/create-trip",
  CHAT: "/chat",
  PROFILE: "/profile",
  SETTINGS: "/settings",
  ITINERARY: "/itinerary/:tripId",
  GENERATED_ITINERARY: "/itinerary",
  OFFLINE: "/offline",
} as const;

// Helper function to generate dynamic routes
export const generateRoute = {
  destination: (id: string) => `/destination/${id}`,
  trip: (id: string) => `/trip/${id}`,
  itinerary: (tripId: string) => `/itinerary/${tripId}`,
};

// Protected routes that require authentication
export const protectedRoutes = [
  ROUTES.DASHBOARD,
  ROUTES.DISCOVER,
  ROUTES.DESTINATION,
  ROUTES.TRIPS,
  ROUTES.TRIP,
  ROUTES.CREATE_TRIP,
  ROUTES.CHAT,
  ROUTES.PROFILE,
  ROUTES.SETTINGS,
  ROUTES.ITINERARY,
];