
import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Upload, Brain, BarChart, GraduationCap, Users, Settings } from "lucide-react";

const Features = () => {
  const [openFeature, setOpenFeature] = useState<number | null>(null);
  
  const features = [
    {
      title: "Import intelligent de PDF",
      description: "Glisser-déposer, sélection de pages et OCR automatique pour tous types de documents.",
      expandedDescription: "Importez facilement vos documents PDF avec notre interface intuitive. Sélectionnez les pages spécifiques à analyser, bénéficiez de l'OCR automatique pour les documents scannés, et obtenez un résumé IA du contenu pour optimiser la génération de quiz.",
      icon: (
        <Upload size={24} className="text-primary" />
      )
    },
    {
      title: "Génération IA de quiz",
      description: "Créez automatiquement des quiz personnalisés avec différents types de questions et niveaux.",
      expandedDescription: "Notre IA avancée génère automatiquement des questions variées : QCM, vrai/faux, texte à trous, et correspondance. Choisissez le niveau de difficulté, le nombre de questions, et personnalisez le style selon votre matière et votre public cible.",
      icon: (
        <Brain size={24} className="text-primary" />
      )
    },
    {
      title: "Analyse pédagogique",
      description: "Détection des concepts-clés et analyse du taux de compréhension avec conseils IA.",
      expandedDescription: "Analysez la performance des apprenants avec nos outils pédagogiques avancés. Détectez automatiquement les concepts-clés, évaluez le taux de compréhension, et recevez des conseils personnalisés de l'IA pour améliorer l'apprentissage.",
      icon: (
        <BarChart size={24} className="text-primary" />
      )
    },
    {
      title: "Modes Examen & Apprentissage",
      description: "Chronomètre, feedback personnalisé et révisions intelligentes après chaque test.",
      expandedDescription: "Adaptez l'expérience selon vos besoins : mode examen avec chronomètre et évaluation stricte, ou mode apprentissage avec feedback immédiat et explications détaillées. Système de révisions intelligentes basé sur les résultats.",
      icon: (
        <GraduationCap size={24} className="text-primary" />
      )
    },
    {
      title: "Gestion utilisateur & Auth",
      description: "Authentification sécurisée avec rôles et suivi de progression personnalisé.",
      expandedDescription: "Système d'authentification complet avec Supabase. Gestion des rôles (Admin, Étudiant, Enseignant), sauvegarde automatique des quiz et résultats, suivi détaillé de la progression avec tableaux de bord personnalisés.",
      icon: (
        <Users size={24} className="text-primary" />
      )
    },
    {
      title: "Paramètres avancés",
      description: "Thèmes, multi-langue, export et intégrations LMS pour une expérience complète.",
      expandedDescription: "Personnalisez entièrement votre expérience : thème clair/sombre, interface multi-langue, export des quiz en PDF/CSV/JSON, et intégrations LMS via Zapier, webhooks ou API pour une utilisation professionnelle.",
      icon: (
        <Settings size={24} className="text-primary" />
      )
    }
  ];
  
  const toggleFeature = (index: number) => {
    setOpenFeature(openFeature === index ? null : index);
  };
  
  return (
    <section id="features" className="w-full py-12 md:py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter">
            Tout ce dont vous avez besoin pour créer des quiz intelligents
          </h2>
          <p className="text-muted-foreground text-lg">
            Des fonctionnalités IA avancées pour transformer vos documents en expériences d'apprentissage interactives
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Collapsible
              key={index}
              open={openFeature === index}
              onOpenChange={() => toggleFeature(index)}
              className={`rounded-xl border ${openFeature === index ? 'border-primary/40' : 'border-border'} cosmic-gradient transition-all duration-300`}
            >
              <CollapsibleTrigger className="w-full text-left p-6 flex flex-col">
                <div className="flex justify-between items-start">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                      openFeature === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <h3 className="text-xl font-medium tracking-tighter mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 pb-6 pt-2">
                <div className="pt-3 border-t border-border/10">
                  <p className="text-muted-foreground">{feature.expandedDescription}</p>
                  <div className="mt-4 flex justify-end">
                    <button className="text-primary hover:text-primary/80 text-sm font-medium">
                      En savoir plus →
                    </button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
