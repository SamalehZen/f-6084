
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Logo from './Logo';
import { Crown, Star, Menu } from 'lucide-react';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="w-full py-6 px-6 md:px-12 bg-background/80 backdrop-blur-xl border-b border-primary/20 sticky top-0 z-50 premium-header">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo />
        
        {/* Premium navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <a href="#features" className="group text-sm font-semibold text-muted-foreground hover:text-foreground transition-all duration-300 relative">
            Fonctionnalités Elite
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/70 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </a>
          <a href="#testimonials" className="group text-sm font-semibold text-muted-foreground hover:text-foreground transition-all duration-300 relative">
            Témoignages VIP
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/70 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </a>
          <a href="#pricing" className="group text-sm font-semibold text-muted-foreground hover:text-foreground transition-all duration-300 relative">
            Tarifs Premium
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/70 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </a>
        </nav>

        {/* Premium CTA buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <Button asChild className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/30 rounded-full px-6 font-semibold transition-all duration-300 hover:scale-105">
              <Link to="/dashboard" className="flex items-center gap-2">
                <Crown className="h-4 w-4" />
                Dashboard VIP
              </Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild className="hidden md:inline-flex text-muted-foreground hover:text-foreground font-semibold">
                <Link to="/auth">Connexion</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/30 rounded-full px-6 font-semibold transition-all duration-300 hover:scale-105">
                <Link to="/auth" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Commencer Elite
                </Link>
              </Button>
            </>
          )}
          
          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
