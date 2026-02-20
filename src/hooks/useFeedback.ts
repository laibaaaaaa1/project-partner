import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

// Types
export interface TripReview {
  id: string;
  trip_id: string;
  user_id: string;
  rating: number;
  title: string | null;
  content: string | null;
  would_recommend: boolean;
  created_at: string;
  updated_at: string;
}

export interface DestinationReview {
  id: string;
  destination_name: string;
  user_id: string;
  rating: number;
  title: string | null;
  content: string | null;
  visit_date: string | null;
  tips: string | null;
  created_at: string;
  updated_at: string;
}

export interface AppFeedback {
  id: string;
  user_id: string;
  category: string;
  subject: string;
  message: string;
  rating: number | null;
  status: string;
  created_at: string;
}

export interface ItineraryFeedback {
  id: string;
  trip_id: string | null;
  user_id: string;
  rating: number;
  accuracy_rating: number | null;
  helpfulness_rating: number | null;
  comment: string | null;
  created_at: string;
}

// Helper to query tables not yet in generated types
const fromTable = (table: string) => supabase.from(table as any);

// Trip Reviews
export function useTripReviews() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["trip-reviews", user?.id],
    queryFn: async () => {
      const { data, error } = await fromTable("trip_reviews")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as unknown as TripReview[];
    },
    enabled: !!user,
  });
}

export function useCreateTripReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (review: Omit<TripReview, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await fromTable("trip_reviews").insert(review as any).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["trip-reviews"] });
      toast.success("Trip review submitted!");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

// Destination Reviews
export function useDestinationReviews(destinationName?: string) {
  return useQuery({
    queryKey: ["destination-reviews", destinationName],
    queryFn: async () => {
      let q = fromTable("destination_reviews").select("*").order("created_at", { ascending: false });
      if (destinationName) q = q.eq("destination_name", destinationName);
      const { data, error } = await q;
      if (error) throw error;
      return (data || []) as unknown as DestinationReview[];
    },
  });
}

export function useCreateDestinationReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (review: Omit<DestinationReview, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await fromTable("destination_reviews").insert(review as any).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["destination-reviews"] });
      toast.success("Destination review submitted!");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

// App Feedback
export function useAppFeedback() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["app-feedback", user?.id],
    queryFn: async () => {
      const { data, error } = await fromTable("app_feedback")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as unknown as AppFeedback[];
    },
    enabled: !!user,
  });
}

export function useCreateAppFeedback() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (feedback: Omit<AppFeedback, "id" | "created_at" | "status">) => {
      const { data, error } = await fromTable("app_feedback").insert(feedback as any).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["app-feedback"] });
      toast.success("Feedback submitted! Thank you.");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

// Itinerary Feedback
export function useCreateItineraryFeedback() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (feedback: Omit<ItineraryFeedback, "id" | "created_at">) => {
      const { data, error } = await fromTable("itinerary_feedback").insert(feedback as any).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["itinerary-feedback"] });
      toast.success("Itinerary feedback submitted!");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
