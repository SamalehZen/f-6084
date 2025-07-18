
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import QuizDemo from './QuizDemo';
import { Brain, Sparkles, Star, Crown } from 'lucide-react';
import { Spotlight, GridBackground } from '@/components/magicui/spotlight-grid';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full py-20 md:py-32 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden">
      {/* Premium grid background with spotlight */}
      <GridBackground />
      <Spotlight />
      
      {/* Premium floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 opacity-20 animate-float">
          <Star className="h-6 w-6 text-primary" />
        </div>
        <div className="absolute top-40 right-20 opacity-30 animate-float animation-delay-1000">
          <Crown className="h-8 w-8 text-primary" />
        </div>
        <div className="absolute bottom-40 left-20 opacity-25 animate-float animation-delay-2000">
          <Sparkles className="h-7 w-7 text-primary" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20 animate-float animation-delay-3000">
          <Brain className="h-6 w-6 text-primary" />
        </div>
      </div>
      
      <div className={`relative z-10 max-w-6xl text-center space-y-8 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Premium badge */}
        <div className="flex justify-center">
          <div className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border border-primary/30 backdrop-blur-xl shadow-2xl hover:shadow-primary/20 transition-all duration-500">
            <div className="flex h-3 w-3 rounded-full bg-gradient-to-r from-primary to-primary/70 animate-pulse"></div>
            <span className="text-sm font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              🚀 IA Révolutionnaire
            </span>
            <Crown className="h-4 w-4 text-primary group-hover:rotate-12 transition-transform duration-300" />
          </div>
        </div>
        
        {/* Main title with premium typography */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none">
            <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
              Quiz PDF
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
              Pro Elite
            </span>
          </h1>
          
          <div className="flex justify-center items-center gap-2 text-lg md:text-xl text-primary/80 font-medium">
            <Star className="h-5 w-5 fill-current" />
            <span>L'Excellence de l'IA Pédagogique</span>
            <Star className="h-5 w-5 fill-current" />
          </div>
        </div>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed font-light">
          Découvrez la nouvelle génération de création de quiz avec notre IA avancée. 
          Transformez vos documents PDF en expériences d'apprentissage exceptionnelles.
        </p>
        
        {/* Premium CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 items-center">
          <Button className="group relative bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground hover:shadow-xl hover:shadow-primary/20 text-lg h-14 px-10 rounded-full font-semibold transition-all duration-300 hover:scale-[1.02] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <Crown className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            Commencer l'Expérience VIP
          </Button>
          <Button variant="outline" className="group border-2 border-primary/30 text-foreground hover:bg-primary/5 hover:border-primary/50 text-lg h-14 px-10 rounded-full font-semibold transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm">
            <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin transition-transform duration-300" />
            Découvrir la Démo Premium
          </Button>
        </div>
        
        <div className="pt-4 flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>Essai VIP 30 jours</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span>Support Premium 24/7</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse"></div>
            <span>Garantie Excellence</span>
          </div>
        </div>
      </div>
      
      {/* Premium Demo Section */}
      <div className={`w-full max-w-7xl mt-20 z-10 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="premium-glass-card relative rounded-3xl overflow-hidden border border-primary/20 shadow-2xl">
          {/* Premium header with glowing effect */}
          <div className="premium-header-gradient backdrop-blur-xl border-b border-primary/20">
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-6">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                  <Crown className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Interface Premium Pro</h3>
                  <p className="text-sm text-muted-foreground">Expérience utilisateur de luxe</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/60 border-2 border-background flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {i}
                    </div>
                  ))}
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/60 to-primary border-2 border-background flex items-center justify-center text-xs font-bold text-primary-foreground">
                    +∞
                  </div>
                </div>
                
                <Button size="sm" className="bg-gradient-to-r from-primary/80 to-primary text-primary-foreground rounded-xl px-6 font-semibold">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Partager VIP
                </Button>
              </div>
            </div>
          </div>
          
          {/* Demo content with premium layout */}
          <div className="flex h-[600px] overflow-hidden">
            {/* Premium sidebar */}
            <div className="w-80 premium-sidebar border-r border-primary/10 p-6 space-y-6 hidden lg:block">
              <div className="space-y-3">
                <div className="text-xs text-primary font-bold uppercase tracking-wider">Navigation Premium</div>
                <div className="space-y-2">
                  {[
                    { icon: Crown, label: "Dashboard VIP", active: true },
                    { icon: Brain, label: "IA Avancée", active: false },
                    { icon: Star, label: "Analytics Pro", active: false },
                    { icon: Sparkles, label: "Mes Quiz Elite", active: false }
                  ].map((item, index) => (
                    <div key={index} className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${item.active ? 'bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 shadow-lg' : 'hover:bg-primary/5'}`}>
                      <item.icon className={`h-5 w-5 ${item.active ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className={`font-medium ${item.active ? 'text-foreground' : 'text-muted-foreground'}`}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3 pt-6 border-t border-primary/10">
                <div className="text-xs text-primary font-bold uppercase tracking-wider">Création Elite</div>
                <div className="space-y-2">
                  {[
                    { label: "QCM Premium", color: "from-blue-500/20 to-blue-500/10" },
                    { label: "Vrai/Faux Pro", color: "from-green-500/20 to-green-500/10" },
                    { label: "Texte à Trous VIP", color: "from-purple-500/20 to-purple-500/10" },
                    { label: "Correspondance Elite", color: "from-orange-500/20 to-orange-500/10" }
                  ].map((item, index) => (
                    <div key={index} className={`flex items-center gap-4 px-4 py-3 rounded-xl bg-gradient-to-r ${item.color} border border-white/10 hover:scale-105 transition-all duration-300 cursor-pointer`}>
                      <div className="h-3 w-3 rounded-full bg-current opacity-60"></div>
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Main premium content */}
            <div className="flex-1 p-6 premium-content-bg overflow-hidden">
              <QuizDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
