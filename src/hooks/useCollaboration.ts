import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TripCollaborator, TripComment, CollaboratorRole } from '@/types/trip';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

// Note: Using type assertions (as any) until database migration runs and types are regenerated

// Collaborators
export function useCollaborators(tripId: string | undefined) {
  return useQuery({
    queryKey: ['collaborators', tripId],
    queryFn: async (): Promise<TripCollaborator[]> => {
      if (!tripId) return [];

      const { data, error } = await (supabase as any)
        .from('trip_collaborators')
        .select(`
          *,
          profiles:user_id (full_name, avatar_url)
        `)
        .eq('trip_id', tripId)
        .order('invited_at', { ascending: false });

      if (error) throw error;
      return (data as TripCollaborator[]) || [];
    },
    enabled: !!tripId,
  });
}

export function useInviteCollaborator() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ tripId, email, role = 'viewer' }: { 
      tripId: string; 
      email: string; 
      role?: CollaboratorRole 
    }): Promise<TripCollaborator> => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await (supabase as any)
        .from('trip_collaborators')
        .insert({
          trip_id: tripId,
          email: email.toLowerCase(),
          role,
          invited_by: user.id,
          invitation_status: 'pending',
        })
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          throw new Error('This person has already been invited');
        }
        throw error;
      }
      return data as TripCollaborator;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['collaborators', data.trip_id] });
      toast.success('Invitation sent!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateCollaboratorRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, tripId, role }: { id: string; tripId: string; role: CollaboratorRole }): Promise<void> => {
      const { error } = await (supabase as any)
        .from('trip_collaborators')
        .update({ role })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['collaborators', variables.tripId] });
      toast.success('Role updated');
    },
    onError: (error) => {
      toast.error('Failed to update role: ' + error.message);
    },
  });
}

export function useRemoveCollaborator() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, tripId }: { id: string; tripId: string }): Promise<void> => {
      const { error } = await (supabase as any).from('trip_collaborators').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['collaborators', variables.tripId] });
      toast.success('Collaborator removed');
    },
    onError: (error) => {
      toast.error('Failed to remove collaborator: ' + error.message);
    },
  });
}

// Accept/decline invitation
export function useRespondToInvitation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, accept }: { id: string; accept: boolean }): Promise<void> => {
      const { error } = await (supabase as any)
        .from('trip_collaborators')
        .update({
          invitation_status: accept ? 'accepted' : 'declined',
          user_id: accept ? user?.id : undefined,
          accepted_at: accept ? new Date().toISOString() : undefined,
        })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['collaborators'] });
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      toast.success(variables.accept ? 'Invitation accepted!' : 'Invitation declined');
    },
    onError: (error) => {
      toast.error('Failed to respond to invitation: ' + error.message);
    },
  });
}

// Comments
export function useComments(tripId: string | undefined) {
  return useQuery({
    queryKey: ['comments', tripId],
    queryFn: async (): Promise<TripComment[]> => {
      if (!tripId) return [];

      const { data, error } = await (supabase as any)
        .from('trip_comments')
        .select(`
          *,
          profiles:user_id (full_name, avatar_url)
        `)
        .eq('trip_id', tripId)
        .is('parent_comment_id', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data as TripComment[]) || [];
    },
    enabled: !!tripId,
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ 
      tripId, 
      content, 
      destinationId, 
      activityId, 
      parentCommentId 
    }: { 
      tripId: string; 
      content: string; 
      destinationId?: string; 
      activityId?: string; 
      parentCommentId?: string 
    }): Promise<TripComment> => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await (supabase as any)
        .from('trip_comments')
        .insert({
          trip_id: tripId,
          user_id: user.id,
          content,
          destination_id: destinationId,
          activity_id: activityId,
          parent_comment_id: parentCommentId,
        })
        .select(`
          *,
          profiles:user_id (full_name, avatar_url)
        `)
        .single();

      if (error) throw error;
      return data as TripComment;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['comments', data.trip_id] });
    },
    onError: (error) => {
      toast.error('Failed to add comment: ' + error.message);
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, tripId }: { id: string; tripId: string }): Promise<void> => {
      const { error } = await (supabase as any).from('trip_comments').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['comments', variables.tripId] });
    },
    onError: (error) => {
      toast.error('Failed to delete comment: ' + error.message);
    },
  });
}

// Real-time subscriptions
export function useTripRealtime(tripId: string | undefined) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!tripId) return;

    const channel = supabase
      .channel(`trip-${tripId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'trips', filter: `id=eq.${tripId}` },
        () => {
          queryClient.invalidateQueries({ queryKey: ['trip', tripId] });
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'destinations', filter: `trip_id=eq.${tripId}` },
        () => {
          queryClient.invalidateQueries({ queryKey: ['trip', tripId] });
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'activities' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['trip', tripId] });
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'trip_comments', filter: `trip_id=eq.${tripId}` },
        () => {
          queryClient.invalidateQueries({ queryKey: ['comments', tripId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tripId, queryClient]);
}
