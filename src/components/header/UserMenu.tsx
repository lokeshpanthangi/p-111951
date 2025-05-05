
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { getUserProfile } from "@/lib/supabase-data";

interface UserMenuProps {
  onLogout: () => void;
}

const UserMenu = ({ onLogout }: UserMenuProps) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [profile, setProfile] = useState<{ name: string | null, email: string | null } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const data = await getUserProfile(user.id);
          setProfile(data);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };
    
    fetchProfile();
  }, [user]);

  const handleLogout = () => {
    setOpen(false);
    onLogout();
  };

  const getInitials = () => {
    if (profile?.name) {
      return profile.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return user?.email?.charAt(0).toUpperCase() || 'U';
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarFallback className="bg-primary/10 text-primary">{getInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5">
            <p className="text-sm font-medium">{profile?.name || 'User'}</p>
            <p className="text-xs text-muted-foreground">{profile?.email || user?.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/my-issues" className="cursor-pointer">My Issues</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
