// typescript/types/contentstack.d.ts

export interface File {
  url: string;
  title: string;
  filename: string;
}

export interface Link {
  title: string;
  href: string;
}

export interface JsonRTE {
  children: any[]; 
}

// --- YOUR NEW TYPES ---

export interface Destination {
  uid: string;
  title: string;
  url: string;
  hero: File;
  description: string | JsonRTE;
  region: "North India" | "International" | "South India";
}

export interface DailySchedule {
  day_number: number;
  description: string | JsonRTE;
}

export interface Activity {
  uid: string;
  title: string;
  url: string;
  description: string;
  price: number;
  rating: number;
  category: "Trekking" | "Water Sports" | "Camping" | "Luxury";
  destination: Destination[]; // References are arrays
  gallery: File[];
  itinerary: {
    daily_schedule: DailySchedule;
  }[];
  related_experiences: Activity[];
}

export interface Homepage {
  title: string;
  hero_section: string; 
  featured_destinations: Destination[];
  trending_activities: Activity[];
}