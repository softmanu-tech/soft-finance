
import React, { useEffect, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, HelpCircle, LogOut, Settings, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface UserData {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

export const UserMenu = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem('softmanu_user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    } else {
      // Check if we're already on the login or signup page
      const path = window.location.pathname;
      if (path !== '/login' && path !== '/signup') {
        navigate('/login');
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('softmanu_user');
    setUserData(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
    navigate('/login');
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  if (!userData?.isLoggedIn) {
    return (
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" className="font-rowdies" onClick={() => navigate('/login')}>Log In</Button>
        <Button size="sm" className="font-lobster" onClick={() => navigate('/signup')}>Sign Up</Button>
      </div>
    );
  }

  const initials = userData.name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
        <Bell className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
        <HelpCircle className="h-5 w-5" />
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt={userData.name} />
              <AvatarFallback className="bg-primary text-primary-foreground font-medium">{initials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none font-cinzel">{userData.name}</p>
              <p className="text-xs leading-none text-muted-foreground font-rowdies">{userData.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="font-rowdies cursor-pointer" onClick={() => handleNavigate('/profile')}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="font-rowdies cursor-pointer" onClick={() => handleNavigate('/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="font-rowdies cursor-pointer" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
