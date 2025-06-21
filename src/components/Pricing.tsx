
import React from 'react';
import { Button } from '@/components/ui/button';
import { Crown, Star, Sparkles, Trophy, Award, Diamond } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Découverte",
      price: "0€",
      description: "Parfait pour découvrir l'excellence Quiz PDF Pro et créer vos premiers chefs-d'œuvre pédagogiques",
      features: [
        "5 quiz premium par mois",
        "IA basique incluse",
        "QCM et Vrai/Faux", 
        "Support communautaire",
        "Interface moderne",
        "Exports basiques"
      ],
      buttonText: "Commencer l'Aventure",
      buttonVariant: "outline",
      popular: false,
      icon: <Star className="h-6 w-6" />,
      gradient: "from-gray-500/10 to-gray-600/5",
      border: "border-gray-500/20"
    },
    {
      name: "Pro Elite",
      price: "29€",
      period: "par mois",
      description: "La solution premium pour les professionnels exigeants qui recherchent l'excellence absolue",
      features: [
        "Quiz illimités premium",
        "IA révolutionnaire complète",
        "Tous types de questions elite",
        "Analyse prédictive avancée",
        "Exports premium (PDF, Excel, JSON)",
        "Support prioritaire 24/7",
        "Révisions intelligentes IA",
        "Tableaux de bord avancés",
        "Intégrations LMS premium"
      ],
      buttonText: "Essai VIP 30 Jours",
      buttonVariant: "default",
      popular: true,
      icon: <Crown className="h-6 w-6" />,
      gradient: "from-primary/20 to-primary/10",
      border: "border-primary/40"
    },
    {
      name: "Enterprise Platinum",
      price: "99€",
      period: "par mois",
      description: "Solution ultra-premium pour les organisations d'élite et institutions prestigieuses",
      features: [
        "Utilisateurs illimités",
        "IA quantique exclusive",
        "Analytics prédictifs avancés",
        "Gestion d'équipes enterprise",
        "White-labeling complet",
        "Intégrations sur-mesure",
        "Support dédié premium",
        "Formation executive incluse",
        "SLA 99.9% garanti",
        "Sécurité enterprise grade"
      ],
      buttonText: "Consultation VIP",
      buttonVariant: "outline",
      popular: false,
      icon: <Diamond className="h-6 w-6" />,
      gradient: "from-purple-500/20 to-purple-600/10",
      border: "border-purple-500/30"
    }
  ];
  
  return (
    <section id="pricing" className="w-full py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
      {/* Premium background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/5"></div>
        <div className="absolute top-20 right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Premium header */}
        <div className="text-center space-y-8 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 backdrop-blur-sm">
            <Crown className="h-5 w-5 text-primary" />
            <span className="text-sm font-bold text-primary uppercase tracking-wider">Tarification Premium Elite</span>
            <Trophy className="h-5 w-5 text-primary" />
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none">
            <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Investissez dans
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
              L'Excellence
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
            Choisissez le plan qui correspond à vos ambitions d'excellence pédagogique. 
            Chaque formule est conçue pour maximiser votre retour sur investissement.
          </p>
        </div>
        
        {/* Premium pricing grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`group premium-pricing-card rounded-3xl border-2 ${plan.border} relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                plan.popular 
                  ? "hover:shadow-primary/20 ring-2 ring-primary/20" 
                  : "hover:shadow-black/10"
              }`}
            >
              {/* Premium background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-500`}></div>
              
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm rounded-full font-bold shadow-lg">
                    <Crown className="h-4 w-4" />
                    <span>LE PLUS POPULAIRE</span>
                    <Sparkles className="h-4 w-4" />
                  </div>
                </div>
              )}
              
              <div className="relative z-10 p-8 h-full flex flex-col">
                {/* Plan header */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${plan.gradient} border ${plan.border}`}>
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight text-foreground">{plan.name}</h3>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-4xl font-black tracking-tighter text-foreground">{plan.price}</div>
                    {plan.period && <div className="text-sm text-muted-foreground font-medium">{plan.period}</div>}
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">{plan.description}</p>
                </div>
                
                {/* Features list */}
                <div className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-primary/30 to-primary/20 flex items-center justify-center border border-primary/30 mt-0.5">
                        <Star className="h-3 w-3 text-primary fill-current" />
                      </div>
                      <span className="text-sm text-foreground font-medium leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA Button */}
                <Button 
                  className={`w-full h-14 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 ${
                    plan.buttonVariant === "default" 
                      ? "bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground hover:shadow-xl hover:shadow-primary/30" 
                      : "border-2 border-primary/30 text-foreground hover:bg-primary/5 hover:border-primary/50 backdrop-blur-sm"
                  }`}
                  variant={plan.buttonVariant as "default" | "outline"}
                >
                  <div className="flex items-center gap-2">
                    {plan.buttonVariant === "default" ? <Crown className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                    {plan.buttonText}
                  </div>
                </Button>
                
                {/* Premium guarantee */}
                <div className="text-center mt-4">
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Award className="h-3 w-3" />
                    <span>Garantie Excellence 100%</span>
                  </div>
                </div>
              </div>
              
              {/* Premium shine effect */}
              <div className="absolute inset-0 -top-4 -left-4 bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-1000 ease-out"></div>
            </div>
          ))}
        </div>
        
        {/* Premium footer */}
        <div className="text-center space-y-6 pt-16 border-t border-primary/20">
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30 backdrop-blur-sm">
            <Crown className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-foreground">Besoin d'une solution sur-mesure ?</span>
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <p className="text-muted-foreground">
            Contactez notre équipe d'experts pour une{" "}
            <a href="#" className="text-primary hover:underline font-semibold">consultation VIP personnalisée</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
