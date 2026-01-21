import { Clock, MapPin, DollarSign, ExternalLink, GripVertical, Trash2, Edit } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, activityCategoryConfig } from '@/types/trip';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface ActivityCardProps {
  activity: Activity;
  onEdit?: () => void;
  onDelete?: () => void;
  isDragging?: boolean;
  showDragHandle?: boolean;
}

export function ActivityCard({ 
  activity, 
  onEdit, 
  onDelete,
  isDragging,
  showDragHandle = true 
}: ActivityCardProps) {
  const config = activityCategoryConfig[activity.category];

  const formatTime = (time: string | undefined) => {
    if (!time) return null;
    try {
      return format(new Date(time), 'h:mm a');
    } catch {
      return null;
    }
  };

  const formatCurrency = (amount: number | undefined, currency: string = 'USD') => {
    if (!amount) return null;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className={cn(
      "transition-all duration-200 group",
      isDragging && "shadow-lg scale-[1.02] opacity-90",
      "hover:shadow-md hover:border-primary/30"
    )}>
      <CardContent className="p-4">
        <div className="flex gap-3">
          {showDragHandle && (
            <div className="flex items-center justify-center cursor-grab active:cursor-grabbing">
              <GripVertical className="h-5 w-5 text-muted-foreground" />
            </div>
          )}

          {/* Category Emoji */}
          <div className={cn(
            "flex items-center justify-center w-10 h-10 rounded-lg shrink-0 text-xl",
            config?.color || "bg-muted"
          )}>
            {config?.emoji || '📍'}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-semibold text-card-foreground truncate">
                  {activity.title}
                </h4>
                {activity.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {activity.description}
                  </p>
                )}
              </div>
              <Badge 
                variant="outline" 
                className={cn("shrink-0 text-xs", config?.color)}
              >
                {config?.label || activity.category}
              </Badge>
            </div>

            {/* Details Row */}
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              {activity.start_time && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{formatTime(activity.start_time)}</span>
                  {activity.end_time && (
                    <span>- {formatTime(activity.end_time)}</span>
                  )}
                </div>
              )}
              {activity.duration_minutes && !activity.start_time && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{activity.duration_minutes} min</span>
                </div>
              )}
              {activity.location_name && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="truncate max-w-[150px]">{activity.location_name}</span>
                </div>
              )}
              {activity.cost && (
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5" />
                  <span>{formatCurrency(activity.cost, activity.currency)}</span>
                </div>
              )}
            </div>

            {/* Booking Info */}
            {activity.is_booked && (
              <div className="flex items-center gap-2 pt-1">
                <Badge className="bg-teal/10 text-teal-dark border-teal/20">
                  ✓ Booked
                </Badge>
                {activity.booking_url && (
                  <a
                    href={activity.booking_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    View booking
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={onEdit}
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={onDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
