
import React from 'react';
import Logo from './Logo';
import { Crown, Star, Sparkles, Trophy } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-20 px-6 md:px-12 border-t border-primary/20 bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary/3 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Premium brand section */}
          <div className="md:col-span-2 space-y-8">
            <Logo />
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Quiz PDF Pro Elite - La révolution de l'intelligence artificielle pédagogique. 
              Transformez vos documents en chefs-d'œuvre d'apprentissage interactif.
            </p>
            
            {/* Premium badges */}
            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                <Crown className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold text-primary">Premium Elite</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/20">
                <Trophy className="h-4 w-4 text-green-500" />
                <span className="text-xs font-bold text-green-500">Award Winner</span>
              </div>
            </div>
            
            {/* Premium social links */}
            <div className="flex items-center gap-4">
              {[
                { icon: "M23 3.01s-2.018 1.192-3.14 1.53a4.48 4.48 0 00-7.86 3v1a10.66 10.66 0 01-9-4.53s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.278-.028-.556-.08-.83C21.94 5.674 23 3.01 23 3.01z", gradient: "from-blue-400 to-blue-600" },
                { icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z", gradient: "from-blue-600 to-blue-800" },
                { icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z", gradient: "from-blue-500 to-blue-700" },
                { icon: "M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2c.313-1.732.467-3.482.46-5.33a29.005 29.005 0 00-.46-5.33z", gradient: "from-red-500 to-red-700" }
              ].map((social, index) => (
                <a key={index} href="#" className={`group h-12 w-12 rounded-2xl bg-gradient-to-br ${social.gradient} flex items-center justify-center text-white hover:scale-110 transition-all duration-300 hover:shadow-lg`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d={social.icon} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          {/* Premium navigation columns */}
          <div className="space-y-6">
            <h4 className="font-bold text-lg text-foreground flex items-center gap-2">
              <Crown className="h-5 w-5 text-primary" />
              Produit Elite
            </h4>
            <ul className="space-y-4">
              {[
                "Fonctionnalités Premium",
                "Intégrations Enterprise",
                "API Développeurs",
                "Nouveautés Elite",
                "Roadmap Innovation"
              ].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors group flex items-center gap-2">
                    <Star className="h-3 w-3 opacity-0 group-hover:opacity-100 text-primary transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-bold text-lg text-foreground flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Excellence Pédagogique
            </h4>
            <ul className="space-y-4">
              {[
                "Enseignants Premium",
                "Formateurs Elite",
                "Institutions VIP",
                "Études de Cas",
                "Blog Innovation"
              ].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors group flex items-center gap-2">
                    <Star className="h-3 w-3 opacity-0 group-hover:opacity-100 text-primary transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-bold text-lg text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Support Premium
            </h4>
            <ul className="space-y-4">
              {[
                "Documentation Elite",
                "Centre d'Excellence",
                "Guides Premium",
                "API Reference Pro",
                "Communauté VIP"
              ].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors group flex items-center gap-2">
                    <Star className="h-3 w-3 opacity-0 group-hover:opacity-100 text-primary transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Premium footer bottom */}
        <div className="mt-20 pt-8 border-t border-primary/20 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-primary" />
              <span>© 2025 Quiz PDF Pro Elite.</span>
            </div>
            <span>Tous droits réservés.</span>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Confidentialité Elite</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Conditions Premium</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookies VIP</a>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-bold text-primary">Service Premium Actif</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
