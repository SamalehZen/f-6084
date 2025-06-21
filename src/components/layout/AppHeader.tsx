
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bell, LogOut, User, Settings, Crown, Sparkles, Star } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

const AppHeader = () => {
  const { user, signOut } = useAuth();

  const getInitials = (email: string) => {
    return email.split('@')[0].slice(0, 2).toUpperCase();
  };

  return (
    <header className="h-20 border-b border-primary/20 bg-gradient-to-r from-card/95 to-card/90 backdrop-blur-xl flex items-center justify-between px-8 shadow-lg">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
            <Crown className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Tableau de Bord{" "}
              <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                Elite
              </span>
            </h1>
            <p className="text-sm font-semibold text-primary">Interface Premium VIP</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Premium notification button */}
        <Button variant="ghost" size="icon" className="relative rounded-2xl hover:bg-accent/50 transition-all duration-300 hover:scale-110">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center">
            <Bell className="h-4 w-4 text-blue-600" />
          </div>
          <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
            <div className="h-1 w-1 rounded-full bg-white"></div>
          </div>
        </Button>

        {/* Premium user menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-12 w-12 rounded-2xl hover:scale-110 transition-all duration-300 group">
              <div className="relative">
                <Avatar className="h-10 w-10 border-2 border-primary/20 shadow-lg">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-bold">
                    {user?.email ? getInitials(user.email) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <Star className="h-2 w-2 text-white" />
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72 border-0 shadow-2xl bg-card/95 backdrop-blur-xl" align="end">
            <DropdownMenuLabel className="font-normal p-4">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-bold">
                      {user?.email ? getInitials(user.email) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-bold leading-none text-foreground">
                      {user?.user_metadata?.full_name || 'Utilisateur VIP'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground mt-1">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <Badge className="w-fit bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 border-0 font-bold">
                  <Crown className="h-3 w-3 mr-1" />
                  Plan Premium Elite
                </Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-primary/20" />
            <DropdownMenuItem asChild className="p-3 rounded-lg mx-2 mb-1 cursor-pointer hover:bg-accent/50 transition-all duration-300">
              <Link to="/profile" className="flex items-center">
                <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center mr-3">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <span className="font-semibold">Profil VIP</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="p-3 rounded-lg mx-2 mb-1 cursor-pointer hover:bg-accent/50 transition-all duration-300">
              <Link to="/settings" className="flex items-center">
                <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center mr-3">
                  <Settings className="h-4 w-4 text-purple-600" />
                </div>
                <span className="font-semibold">Paramètres Elite</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-primary/20" />
            <DropdownMenuItem onClick={signOut} className="p-3 rounded-lg mx-2 mb-2 cursor-pointer hover:bg-red-500/10 transition-all duration-300 text-red-600">
              <div className="h-8 w-8 rounded-lg bg-red-500/10 flex items-center justify-center mr-3">
                <LogOut className="h-4 w-4" />
              </div>
              <span className="font-semibold">Déconnexion</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AppHeader;
