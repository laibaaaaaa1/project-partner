import { useState } from 'react';
import { Check, Plus, Trash2, Sparkles, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  usePackingList,
  useCreatePackingList,
  useAddPackingItem,
  useTogglePackingItem,
  useDeletePackingItem,
  useBulkAddPackingItems,
  defaultPackingCategories,
} from '@/hooks/usePackingList';
import { cn } from '@/lib/utils';

interface PackingListViewProps {
  tripId: string;
  destinationType?: 'beach' | 'winter' | 'adventure' | 'city';
}

export function PackingListView({ tripId, destinationType }: PackingListViewProps) {
  const { data: packingList, isLoading } = usePackingList(tripId);
  const createList = useCreatePackingList();
  const addItem = useAddPackingItem();
  const toggleItem = useTogglePackingItem();
  const deleteItem = useDeletePackingItem();
  const bulkAddItems = useBulkAddPackingItems();

  const [newItemName, setNewItemName] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const items = packingList?.items || [];
  const packedCount = items.filter(i => i.is_packed).length;
  const totalCount = items.length;
  const progress = totalCount > 0 ? (packedCount / totalCount) * 100 : 0;

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    const cat = item.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  const handleCreateList = async () => {
    await createList.mutateAsync({ tripId });
  };

  const handleAddItem = async () => {
    if (!newItemName.trim() || !packingList) return;

    await addItem.mutateAsync({
      packing_list_id: packingList.id,
      name: newItemName.trim(),
      quantity: 1,
      is_packed: false,
      is_essential: false,
      order_index: items.length,
    });
    setNewItemName('');
  };

  const handleAddSuggestions = async (category: keyof typeof defaultPackingCategories) => {
    if (!packingList) return;

    const suggestions = defaultPackingCategories[category].map(item => ({
      ...item,
      category: category.charAt(0).toUpperCase() + category.slice(1),
    }));

    await bulkAddItems.mutateAsync({
      packingListId: packingList.id,
      items: suggestions,
    });
    setShowSuggestions(false);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="h-40 flex items-center justify-center">
            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!packingList) {
    return (
      <Card className="border-dashed">
        <CardContent className="p-6 text-center">
          <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-semibold mb-2">No Packing List Yet</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Create a packing list to keep track of what to bring.
          </p>
          <Button 
            onClick={handleCreateList}
            disabled={createList.isPending}
            className="bg-teal hover:bg-teal-dark"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Packing List
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress Overview */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-teal p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Packing Progress</span>
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              {packedCount}/{totalCount} packed
            </Badge>
          </div>
          <Progress value={progress} className="h-2 [&>div]:bg-white" />
        </div>
      </Card>

      {/* Add Item */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add an item..."
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
              className="flex-1"
            />
            <Button 
              onClick={handleAddItem}
              disabled={!newItemName.trim() || addItem.isPending}
              className="bg-teal hover:bg-teal-dark"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Sheet open={showSuggestions} onOpenChange={setShowSuggestions}>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Sparkles className="h-4 w-4 text-golden" />
                  Suggestions
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Smart Packing Suggestions</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Add pre-made packing lists for different needs:
                  </p>
                  {Object.entries(defaultPackingCategories).map(([key, items]) => (
                    <Button
                      key={key}
                      variant="outline"
                      className="w-full justify-start h-auto py-3"
                      onClick={() => handleAddSuggestions(key as keyof typeof defaultPackingCategories)}
                      disabled={bulkAddItems.isPending}
                    >
                      <div className="text-left">
                        <p className="font-medium capitalize">{key}</p>
                        <p className="text-xs text-muted-foreground">
                          {items.length} items
                        </p>
                      </div>
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </CardContent>
      </Card>

      {/* Items by Category */}
      {Object.entries(groupedItems).map(([category, categoryItems]) => (
        <Card key={category}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span>{category}</span>
              <Badge variant="outline" className="text-xs">
                {categoryItems.filter(i => i.is_packed).length}/{categoryItems.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {categoryItems.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "flex items-center gap-3 p-2 rounded-lg transition-colors",
                  item.is_packed ? "bg-teal/5" : "hover:bg-muted"
                )}
              >
                <Checkbox
                  checked={item.is_packed}
                  onCheckedChange={(checked) => 
                    toggleItem.mutate({ id: item.id, is_packed: checked as boolean })
                  }
                  className="data-[state=checked]:bg-teal data-[state=checked]:border-teal"
                />
                <span className={cn(
                  "flex-1 text-sm",
                  item.is_packed && "line-through text-muted-foreground"
                )}>
                  {item.name}
                  {item.quantity > 1 && (
                    <span className="text-muted-foreground"> ×{item.quantity}</span>
                  )}
                </span>
                {item.is_essential && (
                  <Badge variant="outline" className="text-xs bg-coral/10 text-coral border-coral/20">
                    Essential
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                  onClick={() => deleteItem.mutate(item.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {items.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">
              Your packing list is empty. Add items or use suggestions!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
