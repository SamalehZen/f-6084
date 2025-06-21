
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import { Crown, Star, Sparkles, Zap, Award, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 md:px-12 py-12 md:py-20 overflow-hidden">
      {/* Premium background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 md:w-80 md:h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="absolute inset-0 cosmic-grid opacity-30"></div>

      <div className="max-w-6xl mx-auto text-center space-y-8 md:space-y-12 relative z-10">
        {/* Premium badge */}
        <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 backdrop-blur-sm animate-fade-in">
          <Crown className="h-4 w-4 md:h-5 md:w-5 text-primary" />
          <span className="text-xs md:text-sm font-bold text-primary uppercase tracking-wider">
            {isMobile ? "IA Premium" : "Intelligence Artificielle Premium"}
          </span>
          <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-primary fill-current animate-pulse" />
        </div>

        {/* Main title with responsive typography */}
        <div className="space-y-4 md:space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-none">
            <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Créez des Quiz
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent animate-gradient-shift">
              {isMobile ? "Elite" : "d'Excellence"}
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto font-light px-2">
            {isMobile 
              ? "Transformez vos PDF en évaluations intelligentes avec notre IA révolutionnaire."
              : "Transformez instantanément vos documents PDF en évaluations intelligentes et personnalisées grâce à notre IA révolutionnaire de dernière génération."
            }
          </p>
        </div>

        {/* Premium features grid - responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {[
            { icon: <Zap className="h-5 w-5 md:h-6 md:w-6" />, text: isMobile ? "IA Avancée" : "IA de Pointe" },
            { icon: <Award className="h-5 w-5 md:h-6 md:w-6" />, text: isMobile ? "100% Précis" : "Précision Absolue" },
            { icon: <Crown className="h-5 w-5 md:h-6 md:w-6" />, text: isMobile ? "Interface Elite" : "Expérience Premium" }
          ].map((feature, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 md:gap-3 justify-center p-3 md:p-4 rounded-2xl bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 group"
            >
              <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <span className="text-sm md:text-base font-semibold text-foreground">
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* CTA buttons - responsive */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center pt-4 md:pt-8">
          <Button 
            asChild 
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/30 rounded-full px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-bold transition-all duration-300 hover:scale-105 premium-button group"
          >
            {user ? (
              <Link to="/dashboard" className="flex items-center gap-2 md:gap-3">
                <Crown className="h-5 w-5 md:h-6 md:w-6" />
                <span>{isMobile ? "Mon Dashboard" : "Accéder au Dashboard Elite"}</span>
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <Link to="/auth" className="flex items-center gap-2 md:gap-3">
                <Star className="h-5 w-5 md:h-6 md:w-6" />
                <span>{isMobile ? "Commencer" : "Commencer l'Expérience Elite"}</span>
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            asChild
            className="w-full sm:w-auto border-primary/20 text-foreground hover:bg-accent/50 rounded-full px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          >
            <a href="#features" className="flex items-center gap-2 md:gap-3">
              <Sparkles className="h-4 w-4 md:h-5 md:w-5" />
              <span>{isMobile ? "Découvrir" : "Découvrir les Fonctionnalités"}</span>
            </a>
          </Button>
        </div>

        {/* Premium stats - responsive */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-8 md:pt-16 border-t border-primary/20 max-w-4xl mx-auto">
          {[
            { value: "50K+", label: isMobile ? "Utilisateurs" : "Utilisateurs VIP" },
            { value: "98.7%", label: "Satisfaction" },
            { value: "2M+", label: isMobile ? "Quiz" : "Quiz Créés" },
            { value: "45+", label: "Pays" }
          ].map((stat, index) => (
            <div key={index} className="text-center space-y-1 md:space-y-2 group">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
