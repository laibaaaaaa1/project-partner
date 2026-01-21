// Trip Planning Types

export type TripStatus = 'draft' | 'planned' | 'ongoing' | 'completed' | 'cancelled';
export type TripPrivacy = 'private' | 'shared' | 'public';
export type CollaboratorRole = 'viewer' | 'editor' | 'admin';
export type InvitationStatus = 'pending' | 'accepted' | 'declined';

export type ActivityCategory = 
  | 'food' 
  | 'sightseeing' 
  | 'transport' 
  | 'accommodation' 
  | 'shopping' 
  | 'entertainment' 
  | 'nature' 
  | 'culture' 
  | 'nightlife' 
  | 'wellness' 
  | 'other';

export type ExpenseCategory = 
  | 'accommodation' 
  | 'transport' 
  | 'food' 
  | 'activities' 
  | 'shopping' 
  | 'other';

export interface Trip {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  cover_image_url?: string;
  start_date: string;
  end_date: string;
  budget?: number;
  currency: string;
  privacy: TripPrivacy;
  status: TripStatus;
  created_at: string;
  updated_at: string;
  // Joined data
  destinations?: Destination[];
  collaborators?: TripCollaborator[];
}

export interface Destination {
  id: string;
  trip_id: string;
  name: string;
  country?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  start_date?: string;
  end_date?: string;
  notes?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
  // Joined data
  activities?: Activity[];
}

export interface Activity {
  id: string;
  destination_id: string;
  title: string;
  description?: string;
  category: ActivityCategory;
  start_time?: string;
  end_time?: string;
  duration_minutes?: number;
  location_name?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  cost?: number;
  currency: string;
  booking_url?: string;
  booking_reference?: string;
  notes?: string;
  order_index: number;
  is_booked: boolean;
  created_at: string;
  updated_at: string;
}

export interface Expense {
  id: string;
  trip_id: string;
  activity_id?: string;
  category: ExpenseCategory;
  amount: number;
  currency: string;
  description?: string;
  date: string;
  receipt_url?: string;
  created_at: string;
  updated_at: string;
}

export interface PackingList {
  id: string;
  trip_id: string;
  name: string;
  created_at: string;
  updated_at: string;
  items?: PackingItem[];
}

export interface PackingItem {
  id: string;
  packing_list_id: string;
  name: string;
  quantity: number;
  category?: string;
  is_packed: boolean;
  is_essential: boolean;
  order_index: number;
  created_at: string;
}

export interface TripCollaborator {
  id: string;
  trip_id: string;
  user_id?: string;
  email: string;
  role: CollaboratorRole;
  invited_by?: string;
  invitation_status: InvitationStatus;
  invited_at: string;
  accepted_at?: string;
  // Joined profile data
  profile?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export interface TripComment {
  id: string;
  trip_id: string;
  destination_id?: string;
  activity_id?: string;
  user_id: string;
  content: string;
  parent_comment_id?: string;
  created_at: string;
  updated_at: string;
  // Joined profile data
  profile?: {
    full_name?: string;
    avatar_url?: string;
  };
  replies?: TripComment[];
}

export interface TripDocument {
  id: string;
  trip_id: string;
  user_id: string;
  file_name: string;
  file_url: string;
  file_type?: string;
  file_size?: number;
  category: string;
  description?: string;
  created_at: string;
}

export interface TripPhoto {
  id: string;
  trip_id: string;
  destination_id?: string;
  user_id: string;
  file_url: string;
  thumbnail_url?: string;
  caption?: string;
  taken_at?: string;
  is_cover: boolean;
  order_index: number;
  created_at: string;
}

// Helper type for creating new items
export type CreateTrip = Omit<Trip, 'id' | 'created_at' | 'updated_at' | 'destinations' | 'collaborators'>;
export type CreateDestination = Omit<Destination, 'id' | 'created_at' | 'updated_at' | 'activities'>;
export type CreateActivity = Omit<Activity, 'id' | 'created_at' | 'updated_at'>;
export type CreateExpense = Omit<Expense, 'id' | 'created_at' | 'updated_at'>;

// Activity category config for UI
export const activityCategoryConfig: Record<ActivityCategory, { label: string; emoji: string; color: string }> = {
  food: { label: 'Food & Dining', emoji: '🍽️', color: 'bg-coral/10 text-coral' },
  sightseeing: { label: 'Sightseeing', emoji: '📸', color: 'bg-primary/10 text-primary' },
  transport: { label: 'Transport', emoji: '✈️', color: 'bg-teal/10 text-teal-dark' },
  accommodation: { label: 'Accommodation', emoji: '🏨', color: 'bg-golden/10 text-golden' },
  shopping: { label: 'Shopping', emoji: '🛍️', color: 'bg-lavender/20 text-lavender' },
  entertainment: { label: 'Entertainment', emoji: '🎭', color: 'bg-coral/10 text-coral' },
  nature: { label: 'Nature', emoji: '🏖️', color: 'bg-forest/10 text-forest' },
  culture: { label: 'Culture', emoji: '🏛️', color: 'bg-ocean/10 text-ocean' },
  nightlife: { label: 'Nightlife', emoji: '🌙', color: 'bg-primary/20 text-primary' },
  wellness: { label: 'Wellness', emoji: '💆', color: 'bg-teal/10 text-teal' },
  other: { label: 'Other', emoji: '📍', color: 'bg-muted text-muted-foreground' },
};

// Expense category config for UI
export const expenseCategoryConfig: Record<ExpenseCategory, { label: string; emoji: string; color: string }> = {
  accommodation: { label: 'Accommodation', emoji: '🏨', color: 'hsl(var(--golden))' },
  transport: { label: 'Transport', emoji: '✈️', color: 'hsl(var(--teal))' },
  food: { label: 'Food', emoji: '🍽️', color: 'hsl(var(--coral))' },
  activities: { label: 'Activities', emoji: '🎯', color: 'hsl(var(--primary))' },
  shopping: { label: 'Shopping', emoji: '🛍️', color: 'hsl(var(--lavender))' },
  other: { label: 'Other', emoji: '📦', color: 'hsl(var(--muted-foreground))' },
};
