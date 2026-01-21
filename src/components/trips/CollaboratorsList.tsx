import { useState } from 'react';
import { UserPlus, MoreHorizontal, Mail, Check, X, Crown, Edit3, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  useCollaborators, 
  useInviteCollaborator, 
  useUpdateCollaboratorRole,
  useRemoveCollaborator 
} from '@/hooks/useCollaboration';
import { CollaboratorRole } from '@/types/trip';
import { cn } from '@/lib/utils';

interface CollaboratorsListProps {
  tripId: string;
  isOwner: boolean;
}

const roleConfig: Record<CollaboratorRole, { label: string; icon: typeof Eye; color: string }> = {
  viewer: { label: 'Viewer', icon: Eye, color: 'bg-muted text-muted-foreground' },
  editor: { label: 'Editor', icon: Edit3, color: 'bg-teal/10 text-teal-dark' },
  admin: { label: 'Admin', icon: Crown, color: 'bg-golden/10 text-golden' },
};

export function CollaboratorsList({ tripId, isOwner }: CollaboratorsListProps) {
  const { data: collaborators = [], isLoading } = useCollaborators(tripId);
  const inviteCollaborator = useInviteCollaborator();
  const updateRole = useUpdateCollaboratorRole();
  const removeCollaborator = useRemoveCollaborator();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<CollaboratorRole>('viewer');

  const handleInvite = async () => {
    if (!email.trim()) return;

    await inviteCollaborator.mutateAsync({
      tripId,
      email: email.trim(),
      role,
    });

    setEmail('');
    setRole('viewer');
    setIsDialogOpen(false);
  };

  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return email?.slice(0, 2).toUpperCase() || '??';
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <UserPlus className="h-4 w-4 text-teal" />
            Collaborators
          </CardTitle>
          {isOwner && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1 bg-teal hover:bg-teal-dark">
                  <UserPlus className="h-4 w-4" />
                  Invite
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite Collaborator</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      placeholder="friend@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Permission Level</Label>
                    <Select value={role} onValueChange={(v) => setRole(v as CollaboratorRole)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="viewer">
                          <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            <div>
                              <p className="font-medium">Viewer</p>
                              <p className="text-xs text-muted-foreground">Can view trip details</p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="editor">
                          <div className="flex items-center gap-2">
                            <Edit3 className="h-4 w-4" />
                            <div>
                              <p className="font-medium">Editor</p>
                              <p className="text-xs text-muted-foreground">Can edit trip activities</p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="admin">
                          <div className="flex items-center gap-2">
                            <Crown className="h-4 w-4" />
                            <div>
                              <p className="font-medium">Admin</p>
                              <p className="text-xs text-muted-foreground">Full access to trip</p>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    className="w-full bg-teal hover:bg-teal-dark"
                    onClick={handleInvite}
                    disabled={!email.trim() || inviteCollaborator.isPending}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    {inviteCollaborator.isPending ? 'Sending...' : 'Send Invitation'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-14 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : collaborators.length === 0 ? (
          <div className="text-center py-6">
            <UserPlus className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              No collaborators yet. Invite friends to plan together!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {collaborators.map((collaborator) => {
              const config = roleConfig[collaborator.role];
              const RoleIcon = config.icon;

              return (
                <div 
                  key={collaborator.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={collaborator.profile?.avatar_url || undefined} />
                      <AvatarFallback className="text-xs bg-teal/10 text-teal-dark">
                        {getInitials(collaborator.profile?.full_name, collaborator.email)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">
                        {collaborator.profile?.full_name || collaborator.email}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={cn("text-xs", config.color)}>
                          <RoleIcon className="h-3 w-3 mr-1" />
                          {config.label}
                        </Badge>
                        {collaborator.invitation_status === 'pending' && (
                          <Badge variant="outline" className="text-xs bg-golden/10 text-golden border-golden/20">
                            Pending
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {isOwner && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => updateRole.mutate({ 
                            id: collaborator.id, 
                            tripId, 
                            role: 'viewer' 
                          })}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Make Viewer
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updateRole.mutate({ 
                            id: collaborator.id, 
                            tripId, 
                            role: 'editor' 
                          })}
                        >
                          <Edit3 className="h-4 w-4 mr-2" />
                          Make Editor
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updateRole.mutate({ 
                            id: collaborator.id, 
                            tripId, 
                            role: 'admin' 
                          })}
                        >
                          <Crown className="h-4 w-4 mr-2" />
                          Make Admin
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => removeCollaborator.mutate({ 
                            id: collaborator.id, 
                            tripId 
                          })}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
