import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Trip, Destination, Activity, Expense } from '@/types/trip';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

// Note: Using type assertions until database migration runs and types are regenerated

// Fetch all trips for current user
export function useTrips() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['trips', user?.id],
    queryFn: async (): Promise<Trip[]> => {
      if (!user) return [];

      const { data, error } = await (supabase as any)
        .from('trips')
        .select(`
          *,
          destinations (
            *,
            activities (*)
          )
        `)
        .order('start_date', { ascending: true });

      if (error) throw error;
      return (data as Trip[]) || [];
    },
    },
    enabled: !!user,
  });
}

// Fetch single trip with all related data
export function useTrip(tripId: string | undefined) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['trip', tripId],
    queryFn: async (): Promise<Trip | null> => {
      if (!tripId || !user) return null;

      const { data, error } = await supabase
        .from('trips')
        .select(`
          *,
          destinations (
            *,
            activities (*)
          ),
          trip_collaborators (
            *,
            profiles:user_id (full_name, avatar_url)
          )
        `)
        .eq('id', tripId)
        .single();

      if (error) throw error;
      return data as unknown as Trip;
    },
    enabled: !!tripId && !!user,
  });
}

// Create new trip
export function useCreateTrip() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (tripData: Partial<CreateTrip>): Promise<Trip> => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('trips')
        .insert({
          ...tripData,
          user_id: user.id,
          currency: tripData.currency || 'USD',
          privacy: tripData.privacy || 'private',
          status: tripData.status || 'draft',
        })
        .select()
        .single();

      if (error) throw error;
      return data as unknown as Trip;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      toast.success('Trip created successfully!');
    },
    onError: (error) => {
      toast.error('Failed to create trip: ' + error.message);
    },
  });
}

// Update trip
export function useUpdateTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Trip> & { id: string }): Promise<Trip> => {
      const { data, error } = await supabase
        .from('trips')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as unknown as Trip;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      queryClient.invalidateQueries({ queryKey: ['trip', data.id] });
      toast.success('Trip updated!');
    },
    onError: (error) => {
      toast.error('Failed to update trip: ' + error.message);
    },
  });
}

// Delete trip
export function useDeleteTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tripId: string): Promise<void> => {
      const { error } = await supabase.from('trips').delete().eq('id', tripId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      toast.success('Trip deleted');
    },
    onError: (error) => {
      toast.error('Failed to delete trip: ' + error.message);
    },
  });
}

// Destination mutations
export function useCreateDestination() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (destination: Omit<Destination, 'id' | 'created_at' | 'updated_at' | 'activities'>): Promise<Destination> => {
      const { data, error } = await supabase
        .from('destinations')
        .insert(destination)
        .select()
        .single();

      if (error) throw error;
      return data as unknown as Destination;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['trip', data.trip_id] });
      toast.success('Destination added!');
    },
    onError: (error) => {
      toast.error('Failed to add destination: ' + error.message);
    },
  });
}

export function useUpdateDestination() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Destination> & { id: string }): Promise<Destination> => {
      const { data, error } = await supabase
        .from('destinations')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as unknown as Destination;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['trip', data.trip_id] });
    },
    onError: (error) => {
      toast.error('Failed to update destination: ' + error.message);
    },
  });
}

export function useDeleteDestination() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, tripId }: { id: string; tripId: string }): Promise<void> => {
      const { error } = await supabase.from('destinations').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['trip', variables.tripId] });
      toast.success('Destination removed');
    },
    onError: (error) => {
      toast.error('Failed to remove destination: ' + error.message);
    },
  });
}

// Activity mutations
export function useCreateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (activity: Omit<Activity, 'id' | 'created_at' | 'updated_at'>): Promise<Activity> => {
      const { data, error } = await supabase
        .from('activities')
        .insert(activity)
        .select()
        .single();

      if (error) throw error;
      return data as unknown as Activity;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trip'] });
      toast.success('Activity added!');
    },
    onError: (error) => {
      toast.error('Failed to add activity: ' + error.message);
    },
  });
}

export function useUpdateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Activity> & { id: string }): Promise<Activity> => {
      const { data, error } = await supabase
        .from('activities')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as unknown as Activity;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trip'] });
    },
    onError: (error) => {
      toast.error('Failed to update activity: ' + error.message);
    },
  });
}

export function useDeleteActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (activityId: string): Promise<void> => {
      const { error } = await supabase.from('activities').delete().eq('id', activityId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trip'] });
      toast.success('Activity removed');
    },
    onError: (error) => {
      toast.error('Failed to remove activity: ' + error.message);
    },
  });
}

// Expenses
export function useExpenses(tripId: string | undefined) {
  return useQuery({
    queryKey: ['expenses', tripId],
    queryFn: async (): Promise<Expense[]> => {
      if (!tripId) return [];

      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('trip_id', tripId)
        .order('date', { ascending: false });

      if (error) throw error;
      return (data as unknown as Expense[]) || [];
    },
    enabled: !!tripId,
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (expense: Omit<Expense, 'id' | 'created_at' | 'updated_at'>): Promise<Expense> => {
      const { data, error } = await supabase
        .from('expenses')
        .insert(expense)
        .select()
        .single();

      if (error) throw error;
      return data as unknown as Expense;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['expenses', data.trip_id] });
      toast.success('Expense added!');
    },
    onError: (error) => {
      toast.error('Failed to add expense: ' + error.message);
    },
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, tripId }: { id: string; tripId: string }): Promise<void> => {
      const { error } = await supabase.from('expenses').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['expenses', variables.tripId] });
      toast.success('Expense removed');
    },
    onError: (error) => {
      toast.error('Failed to remove expense: ' + error.message);
    },
  });
}
