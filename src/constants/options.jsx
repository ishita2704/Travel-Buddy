export const SelectTravelList = [
  {
    id: 1,
    title: "Solo Adventure",
    desc: "Embark on a journey of self-discovery",
    icon: "✈️",
    people: "1 person",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Experience the world together",
    icon: "🥂",
    people: "2 people",
  },
  {
    id: 3,
    title: "Family ",
    desc: "Create unforgettable memories with loved ones",
    icon: "🏠",
    people: "3 to 4 people",
  },
  {
    id: 4,
    title: "Friends",
    desc: "Thrilling adventures with your best buddies",
    icon: "🫂",
    people: "5 to 10 people",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Budget-Friendly",
    desc: "Travel smart, spend less",
    icon: "🪙",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Balance comfort and cost",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Indulge in lavish experiences",
    icon: "💸",
  },
];

export const AI_PROMPT = `
  Generate a travel plan for the destination: {location} for {totalDays} days for Traveler type: {traveler}, with a {budget} budget. 
  Provide a list of Hotel options  including the HotelName,Hotel address,Hotel Price ,hotel image URL (ensure the URL is working), geo coordinates, price ,rating, and descriptions and
  Suggest a daily itinerary with placeName, Place Details, Place Image URL, Geo coordinates, ticket pricing, travel time for each of the location for {totalDays} days with each day plan with including Best Time to Visit (specific time like "9:00 AM - 11:00 AM")
  in JSON format.
`;
export const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
