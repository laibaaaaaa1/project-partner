export type BudgetLevel = "budget" | "moderate" | "luxury";
export type Mood = "relaxing" | "adventure" | "cultural" | "romantic";

export interface Destination {
  id: string;
  name: string;
  location: string;
  country: string;
  continent: string;
  imageUrl: string;
  budgetLevel: BudgetLevel;
  bestSeason: string;
  mood: Mood;
  pricePerDay: number;
  description?: string;
}

// Comprehensive list of world destinations
export const destinations: Destination[] = [
  // Asia
  { id: "1", name: "Bali", location: "Indonesia", country: "Indonesia", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400", budgetLevel: "moderate", bestSeason: "Apr-Oct", mood: "relaxing", pricePerDay: 75 },
  { id: "2", name: "Tokyo", location: "Japan", country: "Japan", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400", budgetLevel: "moderate", bestSeason: "Mar-May", mood: "cultural", pricePerDay: 120 },
  { id: "3", name: "Kyoto", location: "Japan", country: "Japan", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400", budgetLevel: "moderate", bestSeason: "Mar-May", mood: "cultural", pricePerDay: 100 },
  { id: "4", name: "Bangkok", location: "Thailand", country: "Thailand", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400", budgetLevel: "budget", bestSeason: "Nov-Feb", mood: "cultural", pricePerDay: 45 },
  { id: "5", name: "Phuket", location: "Thailand", country: "Thailand", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=400", budgetLevel: "moderate", bestSeason: "Nov-Apr", mood: "relaxing", pricePerDay: 65 },
  { id: "6", name: "Singapore", location: "Singapore", country: "Singapore", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400", budgetLevel: "luxury", bestSeason: "Year-round", mood: "cultural", pricePerDay: 180 },
  { id: "7", name: "Hong Kong", location: "China", country: "China", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1536599018102-9f803c979571?w=400", budgetLevel: "moderate", bestSeason: "Oct-Dec", mood: "cultural", pricePerDay: 130 },
  { id: "8", name: "Seoul", location: "South Korea", country: "South Korea", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=400", budgetLevel: "moderate", bestSeason: "Mar-May", mood: "cultural", pricePerDay: 95 },
  { id: "9", name: "Maldives", location: "South Asia", country: "Maldives", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400", budgetLevel: "luxury", bestSeason: "Nov-Apr", mood: "romantic", pricePerDay: 350 },
  { id: "10", name: "Dubai", location: "UAE", country: "United Arab Emirates", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400", budgetLevel: "luxury", bestSeason: "Nov-Mar", mood: "adventure", pricePerDay: 200 },
  { id: "11", name: "Hanoi", location: "Vietnam", country: "Vietnam", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400", budgetLevel: "budget", bestSeason: "Oct-Apr", mood: "cultural", pricePerDay: 35 },
  { id: "12", name: "Ho Chi Minh City", location: "Vietnam", country: "Vietnam", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400", budgetLevel: "budget", bestSeason: "Dec-Apr", mood: "cultural", pricePerDay: 40 },
  { id: "13", name: "Kuala Lumpur", location: "Malaysia", country: "Malaysia", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400", budgetLevel: "moderate", bestSeason: "May-Jul", mood: "cultural", pricePerDay: 55 },
  { id: "14", name: "Manila", location: "Philippines", country: "Philippines", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=400", budgetLevel: "budget", bestSeason: "Dec-May", mood: "adventure", pricePerDay: 45 },
  { id: "15", name: "Palawan", location: "Philippines", country: "Philippines", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=400", budgetLevel: "moderate", bestSeason: "Dec-May", mood: "relaxing", pricePerDay: 70 },
  { id: "16", name: "Taipei", location: "Taiwan", country: "Taiwan", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1470004914212-05527e49370b?w=400", budgetLevel: "moderate", bestSeason: "Mar-May", mood: "cultural", pricePerDay: 80 },
  { id: "17", name: "Mumbai", location: "India", country: "India", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=400", budgetLevel: "budget", bestSeason: "Nov-Feb", mood: "cultural", pricePerDay: 40 },
  { id: "18", name: "Delhi", location: "India", country: "India", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400", budgetLevel: "budget", bestSeason: "Oct-Mar", mood: "cultural", pricePerDay: 35 },
  { id: "19", name: "Goa", location: "India", country: "India", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400", budgetLevel: "budget", bestSeason: "Nov-Feb", mood: "relaxing", pricePerDay: 45 },
  { id: "20", name: "Kathmandu", location: "Nepal", country: "Nepal", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1558799401-1dcba79e6e8e?w=400", budgetLevel: "budget", bestSeason: "Oct-Dec", mood: "adventure", pricePerDay: 30 },
  { id: "21", name: "Colombo", location: "Sri Lanka", country: "Sri Lanka", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1586523969829-f7f2f3c36ca3?w=400", budgetLevel: "budget", bestSeason: "Dec-Mar", mood: "cultural", pricePerDay: 40 },
  { id: "22", name: "Siem Reap", location: "Cambodia", country: "Cambodia", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=400", budgetLevel: "budget", bestSeason: "Nov-Feb", mood: "cultural", pricePerDay: 35 },
  { id: "23", name: "Luang Prabang", location: "Laos", country: "Laos", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400", budgetLevel: "budget", bestSeason: "Nov-Feb", mood: "cultural", pricePerDay: 30 },
  { id: "24", name: "Yangon", location: "Myanmar", country: "Myanmar", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1540611025311-01df3cef54b5?w=400", budgetLevel: "budget", bestSeason: "Nov-Feb", mood: "cultural", pricePerDay: 35 },
  { id: "25", name: "Thimphu", location: "Bhutan", country: "Bhutan", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1553856622-d1b352e9a211?w=400", budgetLevel: "luxury", bestSeason: "Mar-May", mood: "cultural", pricePerDay: 250 },
  { id: "26", name: "Doha", location: "Qatar", country: "Qatar", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1559564484-e48b3e040ff4?w=400", budgetLevel: "luxury", bestSeason: "Nov-Apr", mood: "cultural", pricePerDay: 180 },
  { id: "27", name: "Muscat", location: "Oman", country: "Oman", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=400", budgetLevel: "moderate", bestSeason: "Oct-Apr", mood: "adventure", pricePerDay: 120 },
  { id: "28", name: "Amman", location: "Jordan", country: "Jordan", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1548195667-1c329a2c3d4e?w=400", budgetLevel: "moderate", bestSeason: "Mar-May", mood: "cultural", pricePerDay: 80 },
  { id: "29", name: "Petra", location: "Jordan", country: "Jordan", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1579606032821-4e6161c81571?w=400", budgetLevel: "moderate", bestSeason: "Mar-May", mood: "adventure", pricePerDay: 90 },
  { id: "30", name: "Tel Aviv", location: "Israel", country: "Israel", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=400", budgetLevel: "luxury", bestSeason: "Apr-Oct", mood: "cultural", pricePerDay: 150 },
  
  // Europe
  { id: "31", name: "Santorini", location: "Greece", country: "Greece", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400", budgetLevel: "luxury", bestSeason: "May-Sep", mood: "romantic", pricePerDay: 200 },
  { id: "32", name: "Paris", location: "France", country: "France", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400", budgetLevel: "luxury", bestSeason: "Apr-Jun", mood: "romantic", pricePerDay: 180 },
  { id: "33", name: "Rome", location: "Italy", country: "Italy", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400", budgetLevel: "moderate", bestSeason: "Apr-Jun", mood: "cultural", pricePerDay: 130 },
  { id: "34", name: "Venice", location: "Italy", country: "Italy", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400", budgetLevel: "luxury", bestSeason: "Apr-Jun", mood: "romantic", pricePerDay: 200 },
  { id: "35", name: "Amalfi Coast", location: "Italy", country: "Italy", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=400", budgetLevel: "luxury", bestSeason: "May-Sep", mood: "relaxing", pricePerDay: 250 },
  { id: "36", name: "Florence", location: "Italy", country: "Italy", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1541370976299-4d24ebbc9077?w=400", budgetLevel: "moderate", bestSeason: "Apr-Jun", mood: "cultural", pricePerDay: 120 },
  { id: "37", name: "Barcelona", location: "Spain", country: "Spain", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400", budgetLevel: "moderate", bestSeason: "May-Jun", mood: "cultural", pricePerDay: 110 },
  { id: "38", name: "Madrid", location: "Spain", country: "Spain", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400", budgetLevel: "moderate", bestSeason: "Apr-Jun", mood: "cultural", pricePerDay: 100 },
  { id: "39", name: "Ibiza", location: "Spain", country: "Spain", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400", budgetLevel: "luxury", bestSeason: "Jun-Sep", mood: "adventure", pricePerDay: 180 },
  { id: "40", name: "Lisbon", location: "Portugal", country: "Portugal", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=400", budgetLevel: "moderate", bestSeason: "Mar-Oct", mood: "cultural", pricePerDay: 85 },
  { id: "41", name: "Porto", location: "Portugal", country: "Portugal", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400", budgetLevel: "moderate", bestSeason: "May-Sep", mood: "cultural", pricePerDay: 75 },
  { id: "42", name: "London", location: "United Kingdom", country: "United Kingdom", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400", budgetLevel: "luxury", bestSeason: "May-Sep", mood: "cultural", pricePerDay: 200 },
  { id: "43", name: "Edinburgh", location: "Scotland", country: "United Kingdom", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?w=400", budgetLevel: "moderate", bestSeason: "May-Sep", mood: "cultural", pricePerDay: 120 },
  { id: "44", name: "Amsterdam", location: "Netherlands", country: "Netherlands", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400", budgetLevel: "moderate", bestSeason: "Apr-Sep", mood: "cultural", pricePerDay: 140 },
  { id: "45", name: "Berlin", location: "Germany", country: "Germany", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400", budgetLevel: "moderate", bestSeason: "May-Sep", mood: "cultural", pricePerDay: 100 },
  { id: "46", name: "Munich", location: "Germany", country: "Germany", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1595867818082-083862f3d630?w=400", budgetLevel: "moderate", bestSeason: "Jun-Sep", mood: "cultural", pricePerDay: 120 },
  { id: "47", name: "Vienna", location: "Austria", country: "Austria", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=400", budgetLevel: "moderate", bestSeason: "Apr-Oct", mood: "cultural", pricePerDay: 130 },
  { id: "48", name: "Prague", location: "Czech Republic", country: "Czech Republic", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400", budgetLevel: "budget", bestSeason: "Apr-Oct", mood: "cultural", pricePerDay: 70 },
  { id: "49", name: "Budapest", location: "Hungary", country: "Hungary", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=400", budgetLevel: "budget", bestSeason: "Apr-Oct", mood: "cultural", pricePerDay: 60 },
  { id: "50", name: "Krakow", location: "Poland", country: "Poland", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=400", budgetLevel: "budget", bestSeason: "May-Sep", mood: "cultural", pricePerDay: 50 },
  { id: "51", name: "Warsaw", location: "Poland", country: "Poland", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=400", budgetLevel: "budget", bestSeason: "May-Sep", mood: "cultural", pricePerDay: 55 },
  { id: "52", name: "Swiss Alps", location: "Switzerland", country: "Switzerland", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400", budgetLevel: "luxury", bestSeason: "Dec-Mar", mood: "adventure", pricePerDay: 300 },
  { id: "53", name: "Zurich", location: "Switzerland", country: "Switzerland", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=400", budgetLevel: "luxury", bestSeason: "Jun-Sep", mood: "cultural", pricePerDay: 280 },
  { id: "54", name: "Copenhagen", location: "Denmark", country: "Denmark", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=400", budgetLevel: "luxury", bestSeason: "May-Sep", mood: "cultural", pricePerDay: 180 },
  { id: "55", name: "Stockholm", location: "Sweden", country: "Sweden", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=400", budgetLevel: "luxury", bestSeason: "May-Sep", mood: "cultural", pricePerDay: 170 },
  { id: "56", name: "Oslo", location: "Norway", country: "Norway", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1559199664-7e89d6f0e096?w=400", budgetLevel: "luxury", bestSeason: "May-Sep", mood: "adventure", pricePerDay: 200 },
  { id: "57", name: "Helsinki", location: "Finland", country: "Finland", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?w=400", budgetLevel: "luxury", bestSeason: "Jun-Aug", mood: "cultural", pricePerDay: 160 },
  { id: "58", name: "Reykjavik", location: "Iceland", country: "Iceland", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400", budgetLevel: "luxury", bestSeason: "Jun-Aug", mood: "adventure", pricePerDay: 220 },
  { id: "59", name: "Dublin", location: "Ireland", country: "Ireland", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1549918864-48ac978761a4?w=400", budgetLevel: "moderate", bestSeason: "May-Sep", mood: "cultural", pricePerDay: 130 },
  { id: "60", name: "Brussels", location: "Belgium", country: "Belgium", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1559113513-d5e09c78b9dd?w=400", budgetLevel: "moderate", bestSeason: "Apr-Sep", mood: "cultural", pricePerDay: 120 },
  { id: "61", name: "Athens", location: "Greece", country: "Greece", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=400", budgetLevel: "moderate", bestSeason: "Apr-Jun", mood: "cultural", pricePerDay: 90 },
  { id: "62", name: "Dubrovnik", location: "Croatia", country: "Croatia", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1555990538-18e3c3a7c8e8?w=400", budgetLevel: "moderate", bestSeason: "May-Sep", mood: "cultural", pricePerDay: 100 },
  { id: "63", name: "Split", location: "Croatia", country: "Croatia", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1555990538-18e3c3a7c8e8?w=400", budgetLevel: "moderate", bestSeason: "May-Sep", mood: "relaxing", pricePerDay: 85 },
  { id: "64", name: "Ljubljana", location: "Slovenia", country: "Slovenia", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1569091791842-7cfb64e04797?w=400", budgetLevel: "moderate", bestSeason: "May-Sep", mood: "cultural", pricePerDay: 80 },
  { id: "65", name: "Bratislava", location: "Slovakia", country: "Slovakia", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1555990538-18e3c3a7c8e8?w=400", budgetLevel: "budget", bestSeason: "May-Sep", mood: "cultural", pricePerDay: 55 },
  { id: "66", name: "Sofia", location: "Bulgaria", country: "Bulgaria", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1562523430-727a0fe8de25?w=400", budgetLevel: "budget", bestSeason: "May-Sep", mood: "cultural", pricePerDay: 40 },
  { id: "67", name: "Bucharest", location: "Romania", country: "Romania", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1584646098378-0874589d76b1?w=400", budgetLevel: "budget", bestSeason: "May-Sep", mood: "cultural", pricePerDay: 45 },
  { id: "68", name: "Belgrade", location: "Serbia", country: "Serbia", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1577939092387-8b6b93b4eb3e?w=400", budgetLevel: "budget", bestSeason: "May-Sep", mood: "adventure", pricePerDay: 40 },
  { id: "69", name: "Tallinn", location: "Estonia", country: "Estonia", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400", budgetLevel: "moderate", bestSeason: "May-Sep", mood: "cultural", pricePerDay: 80 },
  { id: "70", name: "Riga", location: "Latvia", country: "Latvia", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1566831677-b277df1e64aa?w=400", budgetLevel: "budget", bestSeason: "May-Sep", mood: "cultural", pricePerDay: 60 },
  { id: "71", name: "Vilnius", location: "Lithuania", country: "Lithuania", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1565876427310-0695a4ff03b7?w=400", budgetLevel: "budget", bestSeason: "May-Sep", mood: "cultural", pricePerDay: 55 },
  { id: "72", name: "Malta", location: "Malta", country: "Malta", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=400", budgetLevel: "moderate", bestSeason: "Apr-Oct", mood: "relaxing", pricePerDay: 100 },
  { id: "73", name: "Monaco", location: "Monaco", country: "Monaco", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=400", budgetLevel: "luxury", bestSeason: "May-Sep", mood: "romantic", pricePerDay: 400 },
  { id: "74", name: "Luxembourg", location: "Luxembourg", country: "Luxembourg", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1577939092387-8b6b93b4eb3e?w=400", budgetLevel: "luxury", bestSeason: "May-Sep", mood: "cultural", pricePerDay: 160 },

  // Africa
  { id: "75", name: "Marrakech", location: "Morocco", country: "Morocco", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=400", budgetLevel: "budget", bestSeason: "Mar-May", mood: "cultural", pricePerDay: 50 },
  { id: "76", name: "Cape Town", location: "South Africa", country: "South Africa", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400", budgetLevel: "moderate", bestSeason: "Oct-Apr", mood: "adventure", pricePerDay: 80 },
  { id: "77", name: "Cairo", location: "Egypt", country: "Egypt", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=400", budgetLevel: "budget", bestSeason: "Oct-Apr", mood: "cultural", pricePerDay: 45 },
  { id: "78", name: "Luxor", location: "Egypt", country: "Egypt", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=400", budgetLevel: "moderate", bestSeason: "Oct-Apr", mood: "cultural", pricePerDay: 60 },
  { id: "79", name: "Serengeti", location: "Tanzania", country: "Tanzania", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400", budgetLevel: "luxury", bestSeason: "Jun-Oct", mood: "adventure", pricePerDay: 300 },
  { id: "80", name: "Zanzibar", location: "Tanzania", country: "Tanzania", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1586041828039-b8d193d6d1dc?w=400", budgetLevel: "moderate", bestSeason: "Jun-Oct", mood: "relaxing", pricePerDay: 100 },
  { id: "81", name: "Nairobi", location: "Kenya", country: "Kenya", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400", budgetLevel: "moderate", bestSeason: "Jun-Oct", mood: "adventure", pricePerDay: 90 },
  { id: "82", name: "Masai Mara", location: "Kenya", country: "Kenya", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400", budgetLevel: "luxury", bestSeason: "Jul-Oct", mood: "adventure", pricePerDay: 280 },
  { id: "83", name: "Victoria Falls", location: "Zimbabwe", country: "Zimbabwe", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1568454537842-d933259bb258?w=400", budgetLevel: "moderate", bestSeason: "May-Aug", mood: "adventure", pricePerDay: 120 },
  { id: "84", name: "Kruger National Park", location: "South Africa", country: "South Africa", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400", budgetLevel: "moderate", bestSeason: "May-Sep", mood: "adventure", pricePerDay: 150 },
  { id: "85", name: "Seychelles", location: "Seychelles", country: "Seychelles", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1505881402582-c5bc11054f91?w=400", budgetLevel: "luxury", bestSeason: "Apr-May", mood: "romantic", pricePerDay: 350 },
  { id: "86", name: "Mauritius", location: "Mauritius", country: "Mauritius", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1589979481223-deb893043163?w=400", budgetLevel: "luxury", bestSeason: "May-Dec", mood: "romantic", pricePerDay: 250 },
  { id: "87", name: "Fez", location: "Morocco", country: "Morocco", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=400", budgetLevel: "budget", bestSeason: "Mar-May", mood: "cultural", pricePerDay: 45 },
  { id: "88", name: "Tunis", location: "Tunisia", country: "Tunisia", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1568736333610-eae6e0ab9500?w=400", budgetLevel: "budget", bestSeason: "Mar-May", mood: "cultural", pricePerDay: 40 },
  { id: "89", name: "Addis Ababa", location: "Ethiopia", country: "Ethiopia", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1568736333610-eae6e0ab9500?w=400", budgetLevel: "budget", bestSeason: "Oct-Jun", mood: "cultural", pricePerDay: 35 },
  { id: "90", name: "Lagos", location: "Nigeria", country: "Nigeria", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1568736333610-eae6e0ab9500?w=400", budgetLevel: "moderate", bestSeason: "Nov-Mar", mood: "cultural", pricePerDay: 80 },
  { id: "91", name: "Accra", location: "Ghana", country: "Ghana", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1568736333610-eae6e0ab9500?w=400", budgetLevel: "budget", bestSeason: "Nov-Mar", mood: "cultural", pricePerDay: 50 },
  { id: "92", name: "Dakar", location: "Senegal", country: "Senegal", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1568736333610-eae6e0ab9500?w=400", budgetLevel: "budget", bestSeason: "Nov-May", mood: "cultural", pricePerDay: 55 },
  { id: "93", name: "Kampala", location: "Uganda", country: "Uganda", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1568736333610-eae6e0ab9500?w=400", budgetLevel: "budget", bestSeason: "Jun-Sep", mood: "adventure", pricePerDay: 45 },
  { id: "94", name: "Kigali", location: "Rwanda", country: "Rwanda", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1568736333610-eae6e0ab9500?w=400", budgetLevel: "moderate", bestSeason: "Jun-Sep", mood: "adventure", pricePerDay: 100 },

  // North America
  { id: "95", name: "New York City", location: "USA", country: "United States", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400", budgetLevel: "luxury", bestSeason: "Apr-Jun", mood: "cultural", pricePerDay: 250 },
  { id: "96", name: "Los Angeles", location: "USA", country: "United States", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=400", budgetLevel: "luxury", bestSeason: "Year-round", mood: "adventure", pricePerDay: 200 },
  { id: "97", name: "San Francisco", location: "USA", country: "United States", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400", budgetLevel: "luxury", bestSeason: "Sep-Nov", mood: "cultural", pricePerDay: 220 },
  { id: "98", name: "Las Vegas", location: "USA", country: "United States", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400", budgetLevel: "moderate", bestSeason: "Mar-May", mood: "adventure", pricePerDay: 150 },
  { id: "99", name: "Miami", location: "USA", country: "United States", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?w=400", budgetLevel: "luxury", bestSeason: "Dec-Apr", mood: "relaxing", pricePerDay: 180 },
  { id: "100", name: "Hawaii", location: "USA", country: "United States", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1507876466758-bc54f384809c?w=400", budgetLevel: "luxury", bestSeason: "Apr-Oct", mood: "relaxing", pricePerDay: 250 },
  { id: "101", name: "Grand Canyon", location: "USA", country: "United States", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=400", budgetLevel: "moderate", bestSeason: "Mar-May", mood: "adventure", pricePerDay: 120 },
  { id: "102", name: "Chicago", location: "USA", country: "United States", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=400", budgetLevel: "moderate", bestSeason: "Apr-Oct", mood: "cultural", pricePerDay: 150 },
  { id: "103", name: "New Orleans", location: "USA", country: "United States", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1518897190127-48b4e51c6d6b?w=400", budgetLevel: "moderate", bestSeason: "Feb-May", mood: "cultural", pricePerDay: 130 },
  { id: "104", name: "Seattle", location: "USA", country: "United States", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1502175353174-a7a70e73b362?w=400", budgetLevel: "moderate", bestSeason: "Jun-Sep", mood: "cultural", pricePerDay: 160 },
  { id: "105", name: "Boston", location: "USA", country: "United States", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1501979376754-1c2a1a4c7d8f?w=400", budgetLevel: "moderate", bestSeason: "Apr-Oct", mood: "cultural", pricePerDay: 180 },
  { id: "106", name: "Washington DC", location: "USA", country: "United States", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=400", budgetLevel: "moderate", bestSeason: "Mar-May", mood: "cultural", pricePerDay: 170 },
  { id: "107", name: "Nashville", location: "USA", country: "United States", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1518897190127-48b4e51c6d6b?w=400", budgetLevel: "moderate", bestSeason: "Apr-Oct", mood: "cultural", pricePerDay: 120 },
  { id: "108", name: "Austin", location: "USA", country: "United States", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=400", budgetLevel: "moderate", bestSeason: "Mar-May", mood: "cultural", pricePerDay: 130 },
  { id: "109", name: "Denver", location: "USA", country: "United States", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1546156929-a4c0ac411f47?w=400", budgetLevel: "moderate", bestSeason: "Jun-Aug", mood: "adventure", pricePerDay: 140 },
  { id: "110", name: "Toronto", location: "Canada", country: "Canada", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400", budgetLevel: "moderate", bestSeason: "May-Oct", mood: "cultural", pricePerDay: 140 },
  { id: "111", name: "Vancouver", location: "Canada", country: "Canada", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1559511260-66a68eab03eb?w=400", budgetLevel: "moderate", bestSeason: "Jun-Sep", mood: "adventure", pricePerDay: 150 },
  { id: "112", name: "Montreal", location: "Canada", country: "Canada", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1519178614-68673b201f36?w=400", budgetLevel: "moderate", bestSeason: "Jun-Sep", mood: "cultural", pricePerDay: 120 },
  { id: "113", name: "Banff", location: "Canada", country: "Canada", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=400", budgetLevel: "moderate", bestSeason: "Jun-Sep", mood: "adventure", pricePerDay: 160 },
  { id: "114", name: "Quebec City", location: "Canada", country: "Canada", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1519178614-68673b201f36?w=400", budgetLevel: "moderate", bestSeason: "Jun-Sep", mood: "romantic", pricePerDay: 130 },
  { id: "115", name: "Mexico City", location: "Mexico", country: "Mexico", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1518659526054-190340b32735?w=400", budgetLevel: "budget", bestSeason: "Mar-May", mood: "cultural", pricePerDay: 60 },
  { id: "116", name: "Cancun", location: "Mexico", country: "Mexico", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=400", budgetLevel: "moderate", bestSeason: "Dec-Apr", mood: "relaxing", pricePerDay: 100 },
  { id: "117", name: "Playa del Carmen", location: "Mexico", country: "Mexico", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=400", budgetLevel: "moderate", bestSeason: "Dec-Apr", mood: "relaxing", pricePerDay: 90 },
  { id: "118", name: "Tulum", location: "Mexico", country: "Mexico", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=400", budgetLevel: "moderate", bestSeason: "Dec-Apr", mood: "relaxing", pricePerDay: 110 },
  { id: "119", name: "Oaxaca", location: "Mexico", country: "Mexico", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1518659526054-190340b32735?w=400", budgetLevel: "budget", bestSeason: "Oct-Apr", mood: "cultural", pricePerDay: 50 },
  { id: "120", name: "Puerto Vallarta", location: "Mexico", country: "Mexico", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=400", budgetLevel: "moderate", bestSeason: "Dec-Apr", mood: "relaxing", pricePerDay: 85 },

  // Central America & Caribbean
  { id: "121", name: "Havana", location: "Cuba", country: "Cuba", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1500759285222-a95626b934cb?w=400", budgetLevel: "budget", bestSeason: "Nov-Apr", mood: "cultural", pricePerDay: 50 },
  { id: "122", name: "San Juan", location: "Puerto Rico", country: "Puerto Rico", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1580937580214-9eb6bd4a0bcc?w=400", budgetLevel: "moderate", bestSeason: "Dec-Apr", mood: "relaxing", pricePerDay: 120 },
  { id: "123", name: "Jamaica", location: "Jamaica", country: "Jamaica", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1500759285222-a95626b934cb?w=400", budgetLevel: "moderate", bestSeason: "Nov-Apr", mood: "relaxing", pricePerDay: 110 },
  { id: "124", name: "Bahamas", location: "Bahamas", country: "Bahamas", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=400", budgetLevel: "luxury", bestSeason: "Dec-Apr", mood: "relaxing", pricePerDay: 200 },
  { id: "125", name: "Aruba", location: "Aruba", country: "Aruba", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=400", budgetLevel: "luxury", bestSeason: "Year-round", mood: "relaxing", pricePerDay: 180 },
  { id: "126", name: "Barbados", location: "Barbados", country: "Barbados", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=400", budgetLevel: "luxury", bestSeason: "Dec-Apr", mood: "relaxing", pricePerDay: 170 },
  { id: "127", name: "St. Lucia", location: "St. Lucia", country: "Saint Lucia", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=400", budgetLevel: "luxury", bestSeason: "Dec-Apr", mood: "romantic", pricePerDay: 220 },
  { id: "128", name: "Dominican Republic", location: "Dominican Republic", country: "Dominican Republic", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=400", budgetLevel: "moderate", bestSeason: "Dec-Apr", mood: "relaxing", pricePerDay: 100 },
  { id: "129", name: "Costa Rica", location: "Costa Rica", country: "Costa Rica", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1518259102261-b40117eabbc9?w=400", budgetLevel: "moderate", bestSeason: "Dec-Apr", mood: "adventure", pricePerDay: 90 },
  { id: "130", name: "Panama City", location: "Panama", country: "Panama", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1537531383496-e2d07aca90a5?w=400", budgetLevel: "moderate", bestSeason: "Dec-Apr", mood: "cultural", pricePerDay: 80 },
  { id: "131", name: "Belize", location: "Belize", country: "Belize", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1518259102261-b40117eabbc9?w=400", budgetLevel: "moderate", bestSeason: "Dec-Apr", mood: "adventure", pricePerDay: 100 },
  { id: "132", name: "Guatemala City", location: "Guatemala", country: "Guatemala", continent: "North America", imageUrl: "https://images.unsplash.com/photo-1518259102261-b40117eabbc9?w=400", budgetLevel: "budget", bestSeason: "Nov-Apr", mood: "cultural", pricePerDay: 45 },

  // South America
  { id: "133", name: "Machu Picchu", location: "Peru", country: "Peru", continent: "South America", imageUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400", budgetLevel: "moderate", bestSeason: "May-Oct", mood: "adventure", pricePerDay: 80 },
  { id: "134", name: "Lima", location: "Peru", country: "Peru", continent: "South America", imageUrl: "https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=400", budgetLevel: "budget", bestSeason: "Dec-Mar", mood: "cultural", pricePerDay: 55 },
  { id: "135", name: "Cusco", location: "Peru", country: "Peru", continent: "South America", imageUrl: "https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=400", budgetLevel: "budget", bestSeason: "May-Oct", mood: "cultural", pricePerDay: 50 },
  { id: "136", name: "Rio de Janeiro", location: "Brazil", country: "Brazil", continent: "South America", imageUrl: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400", budgetLevel: "moderate", bestSeason: "Dec-Mar", mood: "adventure", pricePerDay: 90 },
  { id: "137", name: "Sao Paulo", location: "Brazil", country: "Brazil", continent: "South America", imageUrl: "https://images.unsplash.com/photo-1543059080-f9b1272213d5?w=400", budgetLevel: "moderate", bestSeason: "Mar-Nov", mood: "cultural", pricePerDay: 85 },
  { id: "138", name: "Buenos Aires", location: "Argentina", country: "Argentina", continent: "South America", imageUrl: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=400", budgetLevel: "moderate", bestSeason: "Mar-May", mood: "cultural", pricePerDay: 70 },
  { id: "139", name: "Patagonia", location: "Argentina", country: "Argentina", continent: "South America", imageUrl: "https://images.unsplash.com/photo-1531761535209-180857e963b9?w=400", budgetLevel: "moderate", bestSeason: "Dec-Mar", mood: "adventure", pricePerDay: 120 },
  { id: "140", name: "Cartagena", location: "Colombia", country: "Colombia", continent: "South America", imageUrl: "https://images.unsplash.com/photo-1533050487297-09b450131914?w=400", budgetLevel: "moderate", bestSeason: "Dec-Apr", mood: "cultural", pricePerDay: 70 },
  { id: "141", name: "Bogota", location: "Colombia", country: "Colombia", continent: "South America", imageUrl: "https://images.unsplash.com/photo-1533050487297-09b450131914?w=400", budgetLevel: "budget", bestSeason: "Dec-Mar", mood: "cultural", pricePerDay: 50 },
  { id: "142", name: "Medellin", location: "Colombia", country: "Colombia", continent: "South America", imageUrl: "https://images.unsplash.com/photo-1533050487297-09b450131914?w=400", budgetLevel: "budget", bestSeason: "Year-round", mood: "cultural", pricePerDay: 55 },
  { id: "143", name: "Santiago", location: "Chile", country: "Chile", continent: "South America", imageUrl: "https://images.unsplash.com/photo-1541079546017-8bfce6db3f71?w=400", budgetLevel: "moderate", bestSeason: "Sep-Nov", mood: "cultural", pricePerDay: 80 },
  { id: "144", name: "Atacama Desert", location: "Chile", country: "Chile", continent: "South America", imageUrl: "https://images.unsplash.com/photo-1541079546017-8bfce6db3f71?w=400", budgetLevel: "moderate", bestSeason: "Year-round", mood: "adventure", pricePerDay: 100 },
  { id: "145", name: "Quito", location: "Ecuador", country: "Ecuador", continent: "South America", imageUrl: "https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=400", budgetLevel: "budget", bestSeason: "Jun-Sep", mood: "cultural", pricePerDay: 45 },
  { id: "146", name: "Galapagos Islands", location: "Ecuador", country: "Ecuador", continent: "South America", imageUrl: "https://images.unsplash.com/photo-1544979590-37e9b47eb705?w=400", budgetLevel: "luxury", bestSeason: "Jun-Sep", mood: "adventure", pricePerDay: 300 },
  { id: "147", name: "La Paz", location: "Bolivia", country: "Bolivia", continent: "South America", imageUrl: "https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=400", budgetLevel: "budget", bestSeason: "May-Oct", mood: "adventure", pricePerDay: 35 },
  { id: "148", name: "Salar de Uyuni", location: "Bolivia", country: "Bolivia", continent: "South America", imageUrl: "https://images.unsplash.com/photo-1531761535209-180857e963b9?w=400", budgetLevel: "moderate", bestSeason: "May-Oct", mood: "adventure", pricePerDay: 80 },
  { id: "149", name: "Montevideo", location: "Uruguay", country: "Uruguay", continent: "South America", imageUrl: "https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=400", budgetLevel: "moderate", bestSeason: "Dec-Mar", mood: "relaxing", pricePerDay: 75 },
  { id: "150", name: "Asuncion", location: "Paraguay", country: "Paraguay", continent: "South America", imageUrl: "https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=400", budgetLevel: "budget", bestSeason: "May-Sep", mood: "cultural", pricePerDay: 40 },
  { id: "151", name: "Caracas", location: "Venezuela", country: "Venezuela", continent: "South America", imageUrl: "https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=400", budgetLevel: "budget", bestSeason: "Dec-Apr", mood: "adventure", pricePerDay: 45 },
  { id: "152", name: "Georgetown", location: "Guyana", country: "Guyana", continent: "South America", imageUrl: "https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=400", budgetLevel: "moderate", bestSeason: "Sep-Nov", mood: "adventure", pricePerDay: 70 },
  { id: "153", name: "Paramaribo", location: "Suriname", country: "Suriname", continent: "South America", imageUrl: "https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=400", budgetLevel: "moderate", bestSeason: "Feb-Aug", mood: "cultural", pricePerDay: 75 },

  // Oceania
  { id: "154", name: "Sydney", location: "Australia", country: "Australia", continent: "Oceania", imageUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400", budgetLevel: "luxury", bestSeason: "Sep-Nov", mood: "adventure", pricePerDay: 180 },
  { id: "155", name: "Melbourne", location: "Australia", country: "Australia", continent: "Oceania", imageUrl: "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=400", budgetLevel: "moderate", bestSeason: "Mar-May", mood: "cultural", pricePerDay: 150 },
  { id: "156", name: "Great Barrier Reef", location: "Australia", country: "Australia", continent: "Oceania", imageUrl: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=400", budgetLevel: "luxury", bestSeason: "Jun-Oct", mood: "adventure", pricePerDay: 250 },
  { id: "157", name: "Brisbane", location: "Australia", country: "Australia", continent: "Oceania", imageUrl: "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=400", budgetLevel: "moderate", bestSeason: "Sep-Nov", mood: "relaxing", pricePerDay: 130 },
  { id: "158", name: "Perth", location: "Australia", country: "Australia", continent: "Oceania", imageUrl: "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=400", budgetLevel: "moderate", bestSeason: "Sep-Nov", mood: "adventure", pricePerDay: 140 },
  { id: "159", name: "Gold Coast", location: "Australia", country: "Australia", continent: "Oceania", imageUrl: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=400", budgetLevel: "moderate", bestSeason: "Apr-Oct", mood: "relaxing", pricePerDay: 140 },
  { id: "160", name: "Auckland", location: "New Zealand", country: "New Zealand", continent: "Oceania", imageUrl: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=400", budgetLevel: "moderate", bestSeason: "Dec-Feb", mood: "adventure", pricePerDay: 140 },
  { id: "161", name: "Queenstown", location: "New Zealand", country: "New Zealand", continent: "Oceania", imageUrl: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=400", budgetLevel: "moderate", bestSeason: "Dec-Feb", mood: "adventure", pricePerDay: 160 },
  { id: "162", name: "Wellington", location: "New Zealand", country: "New Zealand", continent: "Oceania", imageUrl: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=400", budgetLevel: "moderate", bestSeason: "Dec-Mar", mood: "cultural", pricePerDay: 130 },
  { id: "163", name: "Fiji", location: "Fiji", country: "Fiji", continent: "Oceania", imageUrl: "https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?w=400", budgetLevel: "luxury", bestSeason: "May-Oct", mood: "romantic", pricePerDay: 220 },
  { id: "164", name: "Bora Bora", location: "French Polynesia", country: "French Polynesia", continent: "Oceania", imageUrl: "https://images.unsplash.com/photo-1568623503150-aaa8d5d7d28a?w=400", budgetLevel: "luxury", bestSeason: "May-Oct", mood: "romantic", pricePerDay: 500 },
  { id: "165", name: "Tahiti", location: "French Polynesia", country: "French Polynesia", continent: "Oceania", imageUrl: "https://images.unsplash.com/photo-1568623503150-aaa8d5d7d28a?w=400", budgetLevel: "luxury", bestSeason: "May-Oct", mood: "relaxing", pricePerDay: 350 },
  { id: "166", name: "Samoa", location: "Samoa", country: "Samoa", continent: "Oceania", imageUrl: "https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?w=400", budgetLevel: "moderate", bestSeason: "May-Oct", mood: "relaxing", pricePerDay: 120 },
  { id: "167", name: "Tonga", location: "Tonga", country: "Tonga", continent: "Oceania", imageUrl: "https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?w=400", budgetLevel: "moderate", bestSeason: "May-Oct", mood: "adventure", pricePerDay: 130 },
  { id: "168", name: "Vanuatu", location: "Vanuatu", country: "Vanuatu", continent: "Oceania", imageUrl: "https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?w=400", budgetLevel: "moderate", bestSeason: "Apr-Oct", mood: "adventure", pricePerDay: 140 },
  { id: "169", name: "Papua New Guinea", location: "Papua New Guinea", country: "Papua New Guinea", continent: "Oceania", imageUrl: "https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?w=400", budgetLevel: "moderate", bestSeason: "May-Oct", mood: "adventure", pricePerDay: 150 },
  { id: "170", name: "New Caledonia", location: "New Caledonia", country: "New Caledonia", continent: "Oceania", imageUrl: "https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?w=400", budgetLevel: "luxury", bestSeason: "Sep-Dec", mood: "relaxing", pricePerDay: 200 },
  { id: "171", name: "Solomon Islands", location: "Solomon Islands", country: "Solomon Islands", continent: "Oceania", imageUrl: "https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?w=400", budgetLevel: "moderate", bestSeason: "May-Oct", mood: "adventure", pricePerDay: 120 },
  { id: "172", name: "Palau", location: "Palau", country: "Palau", continent: "Oceania", imageUrl: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=400", budgetLevel: "luxury", bestSeason: "Nov-Apr", mood: "adventure", pricePerDay: 250 },
  { id: "173", name: "Guam", location: "Guam", country: "Guam", continent: "Oceania", imageUrl: "https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?w=400", budgetLevel: "moderate", bestSeason: "Dec-Jun", mood: "relaxing", pricePerDay: 140 },

  // More Asia
  { id: "174", name: "Bhutan", location: "Bhutan", country: "Bhutan", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=400", budgetLevel: "luxury", bestSeason: "Mar-May", mood: "cultural", pricePerDay: 250 },
  { id: "175", name: "Mongolia", location: "Mongolia", country: "Mongolia", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=400", budgetLevel: "moderate", bestSeason: "Jun-Sep", mood: "adventure", pricePerDay: 80 },
  { id: "176", name: "Uzbekistan", location: "Uzbekistan", country: "Uzbekistan", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=400", budgetLevel: "budget", bestSeason: "Apr-Jun", mood: "cultural", pricePerDay: 45 },
  { id: "177", name: "Kazakhstan", location: "Kazakhstan", country: "Kazakhstan", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=400", budgetLevel: "moderate", bestSeason: "May-Sep", mood: "adventure", pricePerDay: 70 },
  { id: "178", name: "Azerbaijan", location: "Azerbaijan", country: "Azerbaijan", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=400", budgetLevel: "moderate", bestSeason: "Apr-Jun", mood: "cultural", pricePerDay: 65 },
  { id: "179", name: "Georgia", location: "Georgia", country: "Georgia", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400", budgetLevel: "budget", bestSeason: "May-Oct", mood: "cultural", pricePerDay: 50 },
  { id: "180", name: "Armenia", location: "Armenia", country: "Armenia", continent: "Asia", imageUrl: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400", budgetLevel: "budget", bestSeason: "May-Oct", mood: "cultural", pricePerDay: 45 },

  // More Europe
  { id: "181", name: "Andorra", location: "Andorra", country: "Andorra", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400", budgetLevel: "moderate", bestSeason: "Dec-Mar", mood: "adventure", pricePerDay: 120 },
  { id: "182", name: "San Marino", location: "San Marino", country: "San Marino", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400", budgetLevel: "moderate", bestSeason: "Apr-Oct", mood: "cultural", pricePerDay: 100 },
  { id: "183", name: "Liechtenstein", location: "Liechtenstein", country: "Liechtenstein", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400", budgetLevel: "luxury", bestSeason: "Jun-Sep", mood: "adventure", pricePerDay: 180 },
  { id: "184", name: "Montenegro", location: "Montenegro", country: "Montenegro", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1555990538-18e3c3a7c8e8?w=400", budgetLevel: "moderate", bestSeason: "May-Sep", mood: "adventure", pricePerDay: 80 },
  { id: "185", name: "North Macedonia", location: "North Macedonia", country: "North Macedonia", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1555990538-18e3c3a7c8e8?w=400", budgetLevel: "budget", bestSeason: "May-Sep", mood: "cultural", pricePerDay: 45 },
  { id: "186", name: "Albania", location: "Albania", country: "Albania", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1555990538-18e3c3a7c8e8?w=400", budgetLevel: "budget", bestSeason: "May-Sep", mood: "adventure", pricePerDay: 40 },
  { id: "187", name: "Kosovo", location: "Kosovo", country: "Kosovo", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1555990538-18e3c3a7c8e8?w=400", budgetLevel: "budget", bestSeason: "May-Sep", mood: "cultural", pricePerDay: 35 },
  { id: "188", name: "Bosnia", location: "Bosnia and Herzegovina", country: "Bosnia and Herzegovina", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1555990538-18e3c3a7c8e8?w=400", budgetLevel: "budget", bestSeason: "May-Sep", mood: "cultural", pricePerDay: 45 },
  { id: "189", name: "Moldova", location: "Moldova", country: "Moldova", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400", budgetLevel: "budget", bestSeason: "May-Sep", mood: "cultural", pricePerDay: 35 },
  { id: "190", name: "Belarus", location: "Belarus", country: "Belarus", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400", budgetLevel: "budget", bestSeason: "May-Sep", mood: "cultural", pricePerDay: 45 },
  { id: "191", name: "Ukraine", location: "Ukraine", country: "Ukraine", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400", budgetLevel: "budget", bestSeason: "May-Sep", mood: "cultural", pricePerDay: 40 },
  { id: "192", name: "Cyprus", location: "Cyprus", country: "Cyprus", continent: "Europe", imageUrl: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=400", budgetLevel: "moderate", bestSeason: "Apr-Oct", mood: "relaxing", pricePerDay: 90 },

  // More Africa
  { id: "193", name: "Madagascar", location: "Madagascar", country: "Madagascar", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1568736333610-eae6e0ab9500?w=400", budgetLevel: "moderate", bestSeason: "Apr-Nov", mood: "adventure", pricePerDay: 80 },
  { id: "194", name: "Botswana", location: "Botswana", country: "Botswana", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400", budgetLevel: "luxury", bestSeason: "May-Sep", mood: "adventure", pricePerDay: 300 },
  { id: "195", name: "Namibia", location: "Namibia", country: "Namibia", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400", budgetLevel: "moderate", bestSeason: "May-Oct", mood: "adventure", pricePerDay: 120 },
  { id: "196", name: "Zambia", location: "Zambia", country: "Zambia", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400", budgetLevel: "moderate", bestSeason: "May-Oct", mood: "adventure", pricePerDay: 100 },
  { id: "197", name: "Mozambique", location: "Mozambique", country: "Mozambique", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1586041828039-b8d193d6d1dc?w=400", budgetLevel: "moderate", bestSeason: "Apr-Oct", mood: "relaxing", pricePerDay: 90 },
  { id: "198", name: "Malawi", location: "Malawi", country: "Malawi", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1568736333610-eae6e0ab9500?w=400", budgetLevel: "budget", bestSeason: "May-Oct", mood: "adventure", pricePerDay: 50 },
  { id: "199", name: "Ivory Coast", location: "Ivory Coast", country: "Ivory Coast", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1568736333610-eae6e0ab9500?w=400", budgetLevel: "moderate", bestSeason: "Nov-Mar", mood: "cultural", pricePerDay: 70 },
  { id: "200", name: "Cameroon", location: "Cameroon", country: "Cameroon", continent: "Africa", imageUrl: "https://images.unsplash.com/photo-1568736333610-eae6e0ab9500?w=400", budgetLevel: "budget", bestSeason: "Nov-Feb", mood: "adventure", pricePerDay: 55 },
];

// Helper functions
export function getDestinationsByMood(mood: Mood): Destination[] {
  return destinations.filter(d => d.mood === mood);
}

export function getDestinationsByContinent(continent: string): Destination[] {
  return destinations.filter(d => d.continent === continent);
}

export function getDestinationsByBudget(budget: BudgetLevel): Destination[] {
  return destinations.filter(d => d.budgetLevel === budget);
}

export function searchDestinations(query: string): Destination[] {
  const lowerQuery = query.toLowerCase();
  return destinations.filter(d => 
    d.name.toLowerCase().includes(lowerQuery) ||
    d.location.toLowerCase().includes(lowerQuery) ||
    d.country.toLowerCase().includes(lowerQuery) ||
    d.continent.toLowerCase().includes(lowerQuery)
  );
}

export function getDestinationById(id: string): Destination | undefined {
  return destinations.find(d => d.id === id);
}

export function getRandomDestinations(count: number): Destination[] {
  const shuffled = [...destinations].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
