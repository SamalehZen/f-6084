import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import Logo from './Logo';
import { Crown, Star } from 'lucide-react';
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton
} from '@/components/ui/resizable-navbar';

const Header = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Fonctionnalités Elite", link: "#features" },
    { name: "Témoignages VIP", link: "#testimonials" },
    { name: "Tarifs Premium", link: "#pricing" }
  ];

  return (
    <Navbar className="w-full">
      {/* Desktop Navigation */}
      {!isMobile ? (
        <NavBody>
          <NavbarLogo>
            <Logo />
          </NavbarLogo>
          
          <NavItems 
            items={navigationItems}
            className="flex-1"
          />

          <div className="flex items-center space-x-4">
            {user ? (
              <Button asChild>
                <Link to="/dashboard" className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/20 rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02] flex items-center gap-2">
                  <Crown className="h-4 w-4" />
                  Dashboard VIP
                </Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/auth" className="text-muted-foreground hover:text-foreground font-semibold">
                    Connexion
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/auth" className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/20 rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02] flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Commencer Elite
                  </Link>
                </Button>
              </>
            )}
          </div>
        </NavBody>
      ) : (
        /* Mobile Navigation */
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo>
              <Logo />
            </NavbarLogo>
            
            <div className="flex items-center space-x-2">
              {user ? (
                <Button asChild size="sm">
                  <Link to="/dashboard" className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-3 py-2 text-xs font-semibold rounded-xl flex items-center gap-1">
                    <Crown className="h-3 w-3" />
                    VIP
                  </Link>
                </Button>
              ) : (
                <Button asChild size="sm">
                  <Link to="/auth" className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-3 py-2 text-xs font-semibold rounded-xl flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Elite
                  </Link>
                </Button>
              )}
              
              <MobileNavToggle
                isOpen={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
          >
            <nav className="flex flex-col space-y-4 w-full">
              {navigationItems.map((item) => (
                <a
                  key={item.link}
                  href={item.link}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-semibold text-muted-foreground hover:text-foreground transition-colors py-2 border-b border-border/30 last:border-0"
                >
                  {item.name}
                </a>
              ))}
            </nav>
            
            {!user && (
              <div className="w-full space-y-4 pt-4 border-t border-border/30">
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    Connexion
                  </Link>
                </Button>
                <Button asChild className="w-full bg-gradient-to-r from-primary to-primary/80">
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Star className="h-4 w-4" />
                    Commencer Elite
                  </Link>
                </Button>
              </div>
            )}
          </MobileNavMenu>
        </MobileNav>
      )}
    </Navbar>
  );
};

export default Header;