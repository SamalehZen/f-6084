
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import Logo from './Logo';
import { Crown, Star, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { href: "#features", label: "Fonctionnalités Elite" },
    { href: "#testimonials", label: "Témoignages VIP" },
    { href: "#pricing", label: "Tarifs Premium" }
  ];

  const MobileMenu = () => (
    <div className="flex flex-col space-y-6 p-6">
      <nav className="flex flex-col space-y-4">
        {navigationItems.map((item) => (
          <a 
            key={item.href}
            href={item.href} 
            onClick={() => setIsMenuOpen(false)}
            className="group text-lg font-semibold text-muted-foreground hover:text-foreground transition-all duration-300 relative py-2"
          >
            {item.label}
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/70 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </a>
        ))}
      </nav>
      
      <div className="flex flex-col space-y-3 pt-4 border-t border-primary/20">
        {user ? (
          <Button asChild className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/30 rounded-full px-6 py-3 font-semibold transition-all duration-300 hover:scale-105">
            <Link to="/dashboard" className="flex items-center gap-2">
              <Crown className="h-4 w-4" />
              Dashboard VIP
            </Link>
          </Button>
        ) : (
          <>
            <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground font-semibold py-3">
              <Link to="/auth">Connexion</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/30 rounded-full px-6 py-3 font-semibold transition-all duration-300 hover:scale-105">
              <Link to="/auth" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Commencer Elite
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <header className="w-full py-4 md:py-6 px-4 md:px-12 bg-background/80 backdrop-blur-xl border-b border-primary/20 sticky top-0 z-50 premium-header">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo />
        
        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navigationItems.map((item) => (
            <a 
              key={item.href}
              href={item.href} 
              className="group text-sm font-semibold text-muted-foreground hover:text-foreground transition-all duration-300 relative"
            >
              {item.label}
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/70 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </a>
          ))}
        </nav>

        {/* Desktop CTA buttons */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
          {user ? (
            <Button asChild className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/30 rounded-full px-4 lg:px-6 font-semibold transition-all duration-300 hover:scale-105">
              <Link to="/dashboard" className="flex items-center gap-2">
                <Crown className="h-4 w-4" />
                <span className="hidden lg:inline">Dashboard VIP</span>
                <span className="lg:hidden">Dashboard</span>
              </Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground font-semibold">
                <Link to="/auth">Connexion</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/30 rounded-full px-4 lg:px-6 font-semibold transition-all duration-300 hover:scale-105">
                <Link to="/auth" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span className="hidden lg:inline">Commencer Elite</span>
                  <span className="lg:hidden">Commencer</span>
                </Link>
              </Button>
            </>
          )}
        </div>
        
        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 border-0 bg-card/95 backdrop-blur-xl">
              <MobileMenu />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
