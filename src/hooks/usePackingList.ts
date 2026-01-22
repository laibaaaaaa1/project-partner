import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PackingList, PackingItem } from '@/types/trip';
import { toast } from 'sonner';

// Note: Using type assertions (as any) until database migration runs and types are regenerated

// Smart packing suggestions based on destination and weather
export const defaultPackingCategories = {
  essentials: [
    { name: 'Passport', is_essential: true },
    { name: 'ID/Driver\'s License', is_essential: true },
    { name: 'Credit/Debit Cards', is_essential: true },
    { name: 'Phone & Charger', is_essential: true },
    { name: 'Travel Insurance Documents', is_essential: true },
    { name: 'Medications', is_essential: true },
  ],
  clothing: [
    { name: 'T-shirts', quantity: 4 },
    { name: 'Pants/Shorts', quantity: 2 },
    { name: 'Underwear', quantity: 5 },
    { name: 'Socks', quantity: 5 },
    { name: 'Sleepwear', quantity: 2 },
    { name: 'Jacket/Sweater', quantity: 1 },
    { name: 'Comfortable Walking Shoes', quantity: 1 },
  ],
  toiletries: [
    { name: 'Toothbrush & Toothpaste' },
    { name: 'Deodorant' },
    { name: 'Shampoo & Conditioner' },
    { name: 'Sunscreen' },
    { name: 'Personal Hygiene Items' },
  ],
  electronics: [
    { name: 'Camera' },
    { name: 'Power Bank' },
    { name: 'Universal Adapter' },
    { name: 'Headphones' },
  ],
  beach: [
    { name: 'Swimsuit', quantity: 2 },
    { name: 'Beach Towel' },
    { name: 'Sunglasses' },
    { name: 'Flip Flops' },
    { name: 'Beach Bag' },
  ],
  winter: [
    { name: 'Winter Coat' },
    { name: 'Gloves' },
    { name: 'Scarf' },
    { name: 'Warm Hat' },
    { name: 'Thermal Underwear' },
    { name: 'Winter Boots' },
  ],
  adventure: [
    { name: 'Hiking Boots' },
    { name: 'Backpack' },
    { name: 'Water Bottle' },
    { name: 'First Aid Kit' },
    { name: 'Quick-dry Clothes' },
  ],
};

export function usePackingList(tripId: string | undefined) {
  return useQuery({
    queryKey: ['packing-list', tripId],
    queryFn: async (): Promise<PackingList | null> => {
      if (!tripId) return null;

      const { data, error } = await (supabase as any)
        .from('packing_lists')
        .select(`
          *,
          items:packing_items (*)
        `)
        .eq('trip_id', tripId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data as PackingList | null;
    },
    enabled: !!tripId,
  });
}

export function useCreatePackingList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tripId, name = 'Main List' }: { tripId: string; name?: string }): Promise<PackingList> => {
      const { data, error } = await (supabase as any)
        .from('packing_lists')
        .insert({ trip_id: tripId, name })
        .select()
        .single();

      if (error) throw error;
      return data as PackingList;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['packing-list', data.trip_id] });
    },
    onError: (error) => {
      toast.error('Failed to create packing list: ' + error.message);
    },
  });
}

export function useAddPackingItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: Omit<PackingItem, 'id' | 'created_at'>): Promise<PackingItem> => {
      const { data, error } = await (supabase as any)
        .from('packing_items')
        .insert(item)
        .select()
        .single();

      if (error) throw error;
      return data as PackingItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packing-list'] });
    },
    onError: (error) => {
      toast.error('Failed to add item: ' + error.message);
    },
  });
}

export function useTogglePackingItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, is_packed }: { id: string; is_packed: boolean }): Promise<void> => {
      const { error } = await (supabase as any)
        .from('packing_items')
        .update({ is_packed })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packing-list'] });
    },
  });
}

export function useDeletePackingItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: string): Promise<void> => {
      const { error } = await (supabase as any).from('packing_items').delete().eq('id', itemId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packing-list'] });
    },
    onError: (error) => {
      toast.error('Failed to remove item: ' + error.message);
    },
  });
}

// Bulk add items from suggestions
export function useBulkAddPackingItems() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ packingListId, items }: { 
      packingListId: string; 
      items: Array<{ name: string; quantity?: number; category?: string; is_essential?: boolean }> 
    }): Promise<void> => {
      const itemsToInsert = items.map((item, index) => ({
        packing_list_id: packingListId,
        name: item.name,
        quantity: item.quantity || 1,
        category: item.category,
        is_essential: item.is_essential || false,
        order_index: index,
        is_packed: false,
      }));

      const { error } = await (supabase as any).from('packing_items').insert(itemsToInsert);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packing-list'] });
      toast.success('Items added to packing list!');
    },
    onError: (error) => {
      toast.error('Failed to add items: ' + error.message);
    },
  });
}
