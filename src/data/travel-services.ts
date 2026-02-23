// Country-specific hotel booking links and taxi services
export interface TravelService {
  country: string;
  hotels: { name: string; url: string; description: string }[];
  taxis: { name: string; phone?: string; url?: string; description: string }[];
  emergency: string;
}

export const travelServices: Record<string, TravelService> = {
  "Indonesia": {
    country: "Indonesia",
    hotels: [
      { name: "Traveloka", url: "https://www.traveloka.com", description: "Southeast Asia's leading hotel booking" },
      { name: "Agoda", url: "https://www.agoda.com", description: "Best rates for Asian hotels" },
      { name: "Booking.com", url: "https://www.booking.com", description: "Global hotel booking" },
    ],
    taxis: [
      { name: "Grab", url: "https://www.grab.com", description: "Ride-hailing app" },
      { name: "Gojek", url: "https://www.gojek.com", description: "Multi-service platform" },
      { name: "Blue Bird Taxi", phone: "+62-21-7917-1234", description: "Trusted metered taxi" },
    ],
    emergency: "112",
  },
  "Japan": {
    country: "Japan",
    hotels: [
      { name: "Rakuten Travel", url: "https://travel.rakuten.com", description: "Japan's top booking platform" },
      { name: "Japanican", url: "https://www.japanican.com", description: "JTB's official booking site" },
      { name: "Booking.com", url: "https://www.booking.com", description: "Global hotel booking" },
    ],
    taxis: [
      { name: "Japan Taxi", url: "https://japantaxi.jp", description: "Official taxi app" },
      { name: "GO Taxi", url: "https://go.mo-t.com", description: "Smart taxi dispatch" },
      { name: "Uber Japan", url: "https://www.uber.com/jp", description: "Available in major cities" },
    ],
    emergency: "110",
  },
  "Thailand": {
    country: "Thailand",
    hotels: [
      { name: "Agoda", url: "https://www.agoda.com", description: "Best Thai hotel deals" },
      { name: "Booking.com", url: "https://www.booking.com", description: "Wide selection" },
      { name: "Hotels.com", url: "https://www.hotels.com", description: "Reward nights program" },
    ],
    taxis: [
      { name: "Grab", url: "https://www.grab.com", description: "Most popular ride app" },
      { name: "Bolt", url: "https://bolt.eu", description: "Affordable rides" },
      { name: "Bangkok Taxi", phone: "+66-2-0000-000", description: "Metered taxi service" },
    ],
    emergency: "191",
  },
  "Singapore": {
    country: "Singapore",
    hotels: [
      { name: "Booking.com", url: "https://www.booking.com", description: "Wide selection" },
      { name: "Agoda", url: "https://www.agoda.com", description: "Asia specialist" },
      { name: "Trip.com", url: "https://www.trip.com", description: "Competitive rates" },
    ],
    taxis: [
      { name: "Grab", url: "https://www.grab.com", description: "Dominant ride app" },
      { name: "ComfortDelGro", phone: "+65-6552-1111", description: "Largest taxi fleet" },
      { name: "TADA", url: "https://tada.global", description: "No commission rides" },
    ],
    emergency: "999",
  },
  "United Arab Emirates": {
    country: "United Arab Emirates",
    hotels: [
      { name: "Booking.com", url: "https://www.booking.com", description: "Luxury & budget options" },
      { name: "Hotels.com", url: "https://www.hotels.com", description: "Reward nights" },
      { name: "Expedia", url: "https://www.expedia.com", description: "Bundle deals" },
    ],
    taxis: [
      { name: "Careem", url: "https://www.careem.com", description: "Middle East's leading app" },
      { name: "Uber Dubai", url: "https://www.uber.com/ae", description: "Premium rides" },
      { name: "Dubai Taxi", phone: "+971-4-208-0808", description: "Government taxi service" },
    ],
    emergency: "999",
  },
  "India": {
    country: "India",
    hotels: [
      { name: "MakeMyTrip", url: "https://www.makemytrip.com", description: "India's top travel platform" },
      { name: "OYO Rooms", url: "https://www.oyorooms.com", description: "Budget-friendly hotels" },
      { name: "Booking.com", url: "https://www.booking.com", description: "Global selection" },
    ],
    taxis: [
      { name: "Ola", url: "https://www.olacabs.com", description: "India's ride-hailing leader" },
      { name: "Uber India", url: "https://www.uber.com/in", description: "Available in 100+ cities" },
      { name: "Meru Cabs", phone: "+91-44-4422-4422", description: "Premium taxi service" },
    ],
    emergency: "112",
  },
  "Pakistan": {
    country: "Pakistan",
    hotels: [
      { name: "Booking.com", url: "https://www.booking.com", description: "Global hotel booking" },
      { name: "Trip.com", url: "https://www.trip.com", description: "Competitive rates" },
      { name: "Jovago", url: "https://www.jovago.net", description: "Local hotel deals" },
    ],
    taxis: [
      { name: "Careem", url: "https://www.careem.com", description: "Most popular ride app" },
      { name: "InDriver", url: "https://indriver.com", description: "Negotiate your fare" },
      { name: "Bykea", url: "https://bykea.com", description: "Bike & car rides" },
    ],
    emergency: "115",
  },
  "Greece": {
    country: "Greece",
    hotels: [
      { name: "Booking.com", url: "https://www.booking.com", description: "Best Greek hotel selection" },
      { name: "Hotels.com", url: "https://www.hotels.com", description: "Reward nights" },
      { name: "Airbnb", url: "https://www.airbnb.com", description: "Unique local stays" },
    ],
    taxis: [
      { name: "BEAT", url: "https://thebeat.co", description: "Greece's top taxi app" },
      { name: "Uber Greece", url: "https://www.uber.com/gr", description: "Available in Athens" },
      { name: "Athens Taxi", phone: "+30-210-5200-020", description: "Radio taxi service" },
    ],
    emergency: "112",
  },
  "France": {
    country: "France",
    hotels: [
      { name: "Booking.com", url: "https://www.booking.com", description: "Widest selection" },
      { name: "Accor Hotels", url: "https://all.accor.com", description: "French hotel chain" },
      { name: "Hotels.com", url: "https://www.hotels.com", description: "Reward program" },
    ],
    taxis: [
      { name: "Uber France", url: "https://www.uber.com/fr", description: "Major cities" },
      { name: "Bolt", url: "https://bolt.eu", description: "Budget-friendly rides" },
      { name: "G7 Taxi", phone: "+33-1-47-39-47-39", description: "Paris premier taxi" },
    ],
    emergency: "112",
  },
  "Italy": {
    country: "Italy",
    hotels: [
      { name: "Booking.com", url: "https://www.booking.com", description: "Best Italian hotels" },
      { name: "Hotels.com", url: "https://www.hotels.com", description: "Reward program" },
      { name: "Expedia", url: "https://www.expedia.com", description: "Bundle deals" },
    ],
    taxis: [
      { name: "Free Now", url: "https://www.free-now.com", description: "European taxi app" },
      { name: "Uber Italy", url: "https://www.uber.com/it", description: "Limited availability" },
      { name: "Radio Taxi", phone: "+39-06-3570", description: "Rome radio taxi" },
    ],
    emergency: "112",
  },
  "Spain": {
    country: "Spain",
    hotels: [
      { name: "Booking.com", url: "https://www.booking.com", description: "Huge Spanish selection" },
      { name: "Meliá Hotels", url: "https://www.melia.com", description: "Spanish hotel chain" },
      { name: "Hotels.com", url: "https://www.hotels.com", description: "Great deals" },
    ],
    taxis: [
      { name: "Cabify", url: "https://cabify.com", description: "Spanish ride-hailing" },
      { name: "Uber Spain", url: "https://www.uber.com/es", description: "Major cities" },
      { name: "Free Now", url: "https://www.free-now.com", description: "Taxi booking app" },
    ],
    emergency: "112",
  },
  "United Kingdom": {
    country: "United Kingdom",
    hotels: [
      { name: "Booking.com", url: "https://www.booking.com", description: "Extensive UK listings" },
      { name: "Premier Inn", url: "https://www.premierinn.com", description: "UK budget chain" },
      { name: "Hotels.com", url: "https://www.hotels.com", description: "Reward program" },
    ],
    taxis: [
      { name: "Uber UK", url: "https://www.uber.com/gb", description: "Available nationwide" },
      { name: "Bolt", url: "https://bolt.eu", description: "Affordable rides" },
      { name: "Black Cab", phone: "+44-20-7272-0272", description: "Iconic London taxi" },
    ],
    emergency: "999",
  },
  "United States": {
    country: "United States",
    hotels: [
      { name: "Hotels.com", url: "https://www.hotels.com", description: "Reward nights program" },
      { name: "Booking.com", url: "https://www.booking.com", description: "Global selection" },
      { name: "Marriott", url: "https://www.marriott.com", description: "Loyalty rewards" },
    ],
    taxis: [
      { name: "Uber", url: "https://www.uber.com", description: "Available nationwide" },
      { name: "Lyft", url: "https://www.lyft.com", description: "Friendly rides" },
      { name: "Yellow Cab", phone: "+1-212-666-6666", description: "NYC classic taxi" },
    ],
    emergency: "911",
  },
  "Maldives": {
    country: "Maldives",
    hotels: [
      { name: "Booking.com", url: "https://www.booking.com", description: "Resort bookings" },
      { name: "Agoda", url: "https://www.agoda.com", description: "Asia specialist" },
      { name: "Expedia", url: "https://www.expedia.com", description: "Package deals" },
    ],
    taxis: [
      { name: "Speedboat Transfer", url: "https://www.booking.com", description: "Resort transfers" },
      { name: "Seaplane Transfer", url: "https://www.transmaldivian.com", description: "Trans Maldivian Airways" },
      { name: "Male Taxi", phone: "+960-332-2211", description: "Male city taxis" },
    ],
    emergency: "119",
  },
  "Turkey": {
    country: "Turkey",
    hotels: [
      { name: "Booking.com", url: "https://www.booking.com", description: "Wide selection" },
      { name: "Hotels.com", url: "https://www.hotels.com", description: "Reward program" },
      { name: "Trivago", url: "https://www.trivago.com", description: "Compare prices" },
    ],
    taxis: [
      { name: "BiTaksi", url: "https://bitaksi.com", description: "Turkey's taxi app" },
      { name: "Uber Turkey", url: "https://www.uber.com/tr", description: "Istanbul & more" },
      { name: "Istanbul Taxi", phone: "+90-212-444-0436", description: "Radio taxi" },
    ],
    emergency: "112",
  },
  "Egypt": {
    country: "Egypt",
    hotels: [
      { name: "Booking.com", url: "https://www.booking.com", description: "Global booking" },
      { name: "Hotels.com", url: "https://www.hotels.com", description: "Reward program" },
      { name: "Agoda", url: "https://www.agoda.com", description: "Great rates" },
    ],
    taxis: [
      { name: "Uber Egypt", url: "https://www.uber.com/eg", description: "Cairo & Alexandria" },
      { name: "Careem", url: "https://www.careem.com", description: "Popular in Egypt" },
      { name: "Cairo Taxi", phone: "+20-2-19702", description: "White taxi service" },
    ],
    emergency: "122",
  },
  "Mexico": {
    country: "Mexico",
    hotels: [
      { name: "Booking.com", url: "https://www.booking.com", description: "Wide selection" },
      { name: "Hotels.com", url: "https://www.hotels.com", description: "Reward program" },
      { name: "Expedia", url: "https://www.expedia.com", description: "Package deals" },
    ],
    taxis: [
      { name: "Uber Mexico", url: "https://www.uber.com/mx", description: "Available in major cities" },
      { name: "DiDi", url: "https://www.didiglobal.com", description: "Competitive fares" },
      { name: "Cabify", url: "https://cabify.com", description: "Safe rides" },
    ],
    emergency: "911",
  },
  "Brazil": {
    country: "Brazil",
    hotels: [
      { name: "Booking.com", url: "https://www.booking.com", description: "Wide selection" },
      { name: "Hotels.com", url: "https://www.hotels.com", description: "Reward program" },
      { name: "Decolar", url: "https://www.decolar.com", description: "Latin America leader" },
    ],
    taxis: [
      { name: "99", url: "https://99app.com", description: "Brazil's top ride app" },
      { name: "Uber Brazil", url: "https://www.uber.com/br", description: "Available nationwide" },
      { name: "Cabify", url: "https://cabify.com", description: "Premium rides" },
    ],
    emergency: "190",
  },
  "Australia": {
    country: "Australia",
    hotels: [
      { name: "Booking.com", url: "https://www.booking.com", description: "Global booking" },
      { name: "Wotif", url: "https://www.wotif.com.au", description: "Aussie travel deals" },
      { name: "Hotels.com", url: "https://www.hotels.com", description: "Reward program" },
    ],
    taxis: [
      { name: "Uber Australia", url: "https://www.uber.com/au", description: "Available nationwide" },
      { name: "DiDi", url: "https://www.didiglobal.com", description: "Competitive fares" },
      { name: "13cabs", phone: "+61-13-22-27", description: "Australia's largest taxi" },
    ],
    emergency: "000",
  },
  "South Korea": {
    country: "South Korea",
    hotels: [
      { name: "Booking.com", url: "https://www.booking.com", description: "Global selection" },
      { name: "Agoda", url: "https://www.agoda.com", description: "Asia specialist" },
      { name: "Yanolja", url: "https://www.yanolja.com", description: "Korea's top platform" },
    ],
    taxis: [
      { name: "Kakao T", url: "https://kakaot.com", description: "Korea's #1 taxi app" },
      { name: "Uber Korea", url: "https://www.uber.com/kr", description: "Limited availability" },
      { name: "Seoul Taxi", phone: "+82-2-3151-0000", description: "Call taxi service" },
    ],
    emergency: "112",
  },
  "Morocco": {
    country: "Morocco",
    hotels: [
      { name: "Booking.com", url: "https://www.booking.com", description: "Riads & hotels" },
      { name: "Hotels.com", url: "https://www.hotels.com", description: "Reward program" },
      { name: "Airbnb", url: "https://www.airbnb.com", description: "Authentic riad stays" },
    ],
    taxis: [
      { name: "Careem", url: "https://www.careem.com", description: "Available in major cities" },
      { name: "Roby", url: "https://roby.ma", description: "Moroccan ride app" },
      { name: "Petit Taxi", phone: "+212-5-22-00-00-00", description: "Local metered taxis" },
    ],
    emergency: "19",
  },
  "South Africa": {
    country: "South Africa",
    hotels: [
      { name: "Booking.com", url: "https://www.booking.com", description: "Wide SA selection" },
      { name: "SafariNow", url: "https://www.safarinow.com", description: "Safari & lodge bookings" },
      { name: "Hotels.com", url: "https://www.hotels.com", description: "Reward program" },
    ],
    taxis: [
      { name: "Uber SA", url: "https://www.uber.com/za", description: "Available in major cities" },
      { name: "Bolt", url: "https://bolt.eu", description: "Affordable rides" },
      { name: "City Bug", phone: "+27-21-830-5050", description: "Cape Town taxi service" },
    ],
    emergency: "10111",
  },
  "New Zealand": {
    country: "New Zealand",
    hotels: [
      { name: "Booking.com", url: "https://www.booking.com", description: "NZ hotels & lodges" },
      { name: "Wotif", url: "https://www.wotif.co.nz", description: "NZ travel deals" },
      { name: "Hotels.com", url: "https://www.hotels.com", description: "Reward program" },
    ],
    taxis: [
      { name: "Uber NZ", url: "https://www.uber.com/nz", description: "Auckland & Wellington" },
      { name: "Ola NZ", url: "https://www.olacabs.com/nz", description: "Ride-hailing" },
      { name: "Green Cabs", phone: "+64-4-387-8787", description: "Eco-friendly taxis" },
    ],
    emergency: "111",
  },
  "Argentina": {
    country: "Argentina",
    hotels: [
      { name: "Booking.com", url: "https://www.booking.com", description: "Wide selection" },
      { name: "Despegar", url: "https://www.despegar.com.ar", description: "Latin America leader" },
      { name: "Hotels.com", url: "https://www.hotels.com", description: "Reward program" },
    ],
    taxis: [
      { name: "Uber Argentina", url: "https://www.uber.com/ar", description: "Buenos Aires & more" },
      { name: "Cabify", url: "https://cabify.com", description: "Premium rides" },
      { name: "Radio Taxi", phone: "+54-11-4923-7000", description: "Buenos Aires radio taxi" },
    ],
    emergency: "911",
  },
  "Canada": {
    country: "Canada",
    hotels: [
      { name: "Booking.com", url: "https://www.booking.com", description: "Canadian hotels" },
      { name: "Hotels.com", url: "https://www.hotels.com", description: "Reward program" },
      { name: "Expedia", url: "https://www.expedia.ca", description: "Bundle deals" },
    ],
    taxis: [
      { name: "Uber Canada", url: "https://www.uber.com/ca", description: "Available nationwide" },
      { name: "Lyft", url: "https://www.lyft.com", description: "Major cities" },
      { name: "Beck Taxi", phone: "+1-416-751-5555", description: "Toronto's largest taxi" },
    ],
    emergency: "911",
  },
};

// Fallback for countries not in the list
const defaultService: TravelService = {
  country: "International",
  hotels: [
    { name: "Booking.com", url: "https://www.booking.com", description: "World's largest hotel booking" },
    { name: "Hotels.com", url: "https://www.hotels.com", description: "Collect reward nights" },
    { name: "Expedia", url: "https://www.expedia.com", description: "Bundle & save" },
  ],
  taxis: [
    { name: "Uber", url: "https://www.uber.com", description: "Available in 70+ countries" },
    { name: "Bolt", url: "https://bolt.eu", description: "Affordable rides globally" },
    { name: "Local Taxi", description: "Ask your hotel for local taxi numbers" },
  ],
  emergency: "112",
};

export function getServicesForCountry(country: string): TravelService {
  return travelServices[country] || defaultService;
}
