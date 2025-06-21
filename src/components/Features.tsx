
import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Upload, Brain, BarChart, GraduationCap, Users, Settings, Crown, Sparkles, Star } from "lucide-react";

const Features = () => {
  const [openFeature, setOpenFeature] = useState<number | null>(null);
  
  const features = [
    {
      title: "IA Elite PDF Import",
      description: "Technologie révolutionnaire d'import avec reconnaissance avancée et analyse contextuelle premium.",
      expandedDescription: "Notre IA de nouvelle génération analyse chaque page avec une précision chirurgicale. OCR premium, détection de mise en page complexe, extraction sémantique avancée avec compréhension du contexte pédagogique pour une génération de quiz optimale.",
      icon: <Upload size={28} className="text-primary" />,
      gradient: "from-blue-500/20 via-blue-500/10 to-transparent",
      accent: "border-blue-500/30"
    },
    {
      title: "Générateur IA Quantum",
      description: "Moteur d'IA révolutionnaire créant des quiz personnalisés avec intelligence contextuelle avancée.",
      expandedDescription: "Algorithmes d'apprentissage automatique de pointe générant des questions d'une pertinence exceptionnelle. Adaptation automatique au niveau, personnalisation psycho-pédagogique, et création de scénarios d'apprentissage immersifs avec évaluation prédictive.",
      icon: <Brain size={28} className="text-primary" />,
      gradient: "from-purple-500/20 via-purple-500/10 to-transparent",
      accent: "border-purple-500/30"
    },
    {
      title: "Analytics Premium Pro",
      description: "Tableaux de bord ultra-avancés avec insights prédictifs et recommandations pédagogiques IA.",
      expandedDescription: "Analyses comportementales approfondies, cartographie des lacunes d'apprentissage, prédictions de réussite avec IA prédictive, recommandations personnalisées et rapports executives pour optimiser les stratégies pédagogiques.",
      icon: <BarChart size={28} className="text-primary" />,
      gradient: "from-green-500/20 via-green-500/10 to-transparent",
      accent: "border-green-500/30"
    },
    {
      title: "Expérience Immersive VIP",
      description: "Modes d'apprentissage révolutionnaires avec gamification avancée et parcours adaptatifs.",
      expandedDescription: "Environnements d'apprentissage immersifs avec réalité augmentée, gamification intelligente, parcours adaptatifs en temps réel, système de badges premium, et expériences collaboratives synchronisées pour un engagement maximal.",
      icon: <GraduationCap size={28} className="text-primary" />,
      gradient: "from-orange-500/20 via-orange-500/10 to-transparent",
      accent: "border-orange-500/30"
    },
    {
      title: "Collaboration Enterprise",
      description: "Plateforme collaborative d'entreprise avec gestion d'équipes avancée et workflow intelligents.",
      expandedDescription: "Espaces de travail collaboratifs premium, gestion granulaire des permissions, workflows automatisés, synchronisation cloud sécurisée, intégrations SSO enterprise, et dashboards multi-niveaux pour organisations complexes.",
      icon: <Users size={28} className="text-primary" />,
      gradient: "from-pink-500/20 via-pink-500/10 to-transparent",
      accent: "border-pink-500/30"
    },
    {
      title: "Écosystème Intégré Elite",
      description: "Suite complète d'intégrations premium avec API avancées et customisation illimitée.",
      expandedDescription: "API REST et GraphQL complètes, webhooks intelligents, intégrations LMS premium, thèmes personnalisables illimités, white-labeling enterprise, et écosystème de plugins extensibles pour une solution sur-mesure.",
      icon: <Settings size={28} className="text-primary" />,
      gradient: "from-cyan-500/20 via-cyan-500/10 to-transparent",
      accent: "border-cyan-500/30"
    }
  ];
  
  const toggleFeature = (index: number) => {
    setOpenFeature(openFeature === index ? null : index);
  };
  
  return (
    <section id="features" className="w-full py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/3 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Premium section header */}
        <div className="text-center space-y-8 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 backdrop-blur-sm">
            <Crown className="h-5 w-5 text-primary" />
            <span className="text-sm font-bold text-primary uppercase tracking-wider">Fonctionnalités Premium Elite</span>
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none">
            <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              L'Excellence
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
              Technologique
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
            Découvrez une suite de fonctionnalités révolutionnaires conçues pour transformer 
            l'éducation avec l'intelligence artificielle la plus avancée au monde.
          </p>
        </div>
        
        {/* Premium features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Collapsible
              key={index}
              open={openFeature === index}
              onOpenChange={() => toggleFeature(index)}
              className={`group premium-feature-card rounded-3xl border-2 ${openFeature === index ? feature.accent : 'border-border/40'} transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-500`}></div>
              
              <CollapsibleTrigger className="w-full text-left p-8 relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 shadow-lg group-hover:shadow-xl group-hover:shadow-primary/20 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <ChevronDown
                      className={`h-6 w-6 text-primary transition-transform duration-300 ${
                        openFeature === index ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold tracking-tight mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="px-8 pb-8 relative z-10">
                <div className="pt-6 border-t border-primary/20">
                  <p className="text-muted-foreground leading-relaxed mb-6">{feature.expandedDescription}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      <Sparkles className="h-4 w-4" />
                      <span>Technologie Premium</span>
                    </div>
                    <button className="text-primary hover:text-primary/80 text-sm font-bold transition-colors duration-200 flex items-center gap-2">
                      Découvrir Plus
                      <Crown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
        
        {/* Premium CTA section */}
        <div className="text-center space-y-8 pt-16">
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30 backdrop-blur-sm">
            <Crown className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-foreground">Prêt pour l'Excellence ?</span>
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
