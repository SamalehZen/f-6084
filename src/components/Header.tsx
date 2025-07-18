
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

  const NavigationContent = ({ onClick }: { onClick?: () => void }) => (
    <nav className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8 p-6 lg:p-0">
      {navigationItems.map((item) => (
        <a 
          key={item.href}
          href={item.href} 
          onClick={onClick}
          className="group text-base lg:text-sm font-semibold text-muted-foreground hover:text-foreground transition-all duration-300 relative w-full lg:w-auto py-2 lg:py-0"
        >
          {item.label}
          <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/70 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        </a>
      ))}
    </nav>
  );

  return (
    <header className="w-full py-4 sm:py-6 px-4 sm:px-6 md:px-8 lg:px-12 bg-background/80 backdrop-blur-xl border-b border-primary/20 sticky top-0 z-50 premium-header">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo />
        
        {/* Desktop navigation */}
        {!isMobile && (
          <NavigationContent />
        )}

        {/* Premium CTA buttons */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {user ? (
            <Button asChild className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 font-semibold transition-all duration-200 hover:scale-[1.02] text-sm">
              <Link to="/dashboard" className="flex items-center gap-2">
                <Crown className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Dashboard VIP</span>
                <span className="sm:hidden">VIP</span>
              </Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild className="hidden sm:inline-flex text-muted-foreground hover:text-foreground font-semibold">
                <Link to="/auth">Connexion</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 font-semibold transition-all duration-200 hover:scale-[1.02] text-sm">
                <Link to="/auth" className="flex items-center gap-2">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Commencer Elite</span>
                  <span className="sm:hidden">Elite</span>
                </Link>
              </Button>
            </>
          )}
          
          {/* Mobile menu */}
          {isMobile && (
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-accent/50">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-card/95 backdrop-blur-xl border-l border-primary/20">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-black bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Menu Premium
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(false)}
                    className="h-10 w-10 rounded-xl hover:bg-accent/50"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <NavigationContent onClick={() => setIsMenuOpen(false)} />
                
                {!user && (
                  <div className="mt-8 space-y-4">
                    <Button asChild variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground font-semibold py-3">
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)}>Connexion</Link>
                    </Button>
                    <Button asChild className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/30 rounded-xl font-semibold py-3">
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2">
                        <Star className="h-4 w-4" />
                        Commencer Elite
                      </Link>
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
