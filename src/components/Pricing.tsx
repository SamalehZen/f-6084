"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRightIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Star, Zap, Crown, Shield } from 'lucide-react';

interface Feature {
  name: string
  description: string
  included: boolean
}

interface PricingTier {
  name: string
  price: {
    monthly: number
    yearly: number
  }
  description: string
  features: Feature[]
  highlight?: boolean
  badge?: string
  icon: React.ReactNode
}

const tiers: PricingTier[] = [
  {
    name: "Basic",
    price: { monthly: 9, yearly: 90 },
    description: "Parfait pour débuter avec l'IA",
    features: [
      { name: "5 quiz générés par mois", description: "Créez jusqu'à 5 quiz personnalisés", included: true },
      { name: "Documents PDF jusqu'à 10 pages", description: "Support des petits documents", included: true },
      { name: "Analyses de base", description: "Statistiques essentielles", included: true },
      { name: "Support email", description: "Assistance par email", included: true }
    ],
    icon: <Shield className="w-6 h-6" />,
    highlight: false
  },
  {
    name: "Pro",
    price: { monthly: 29, yearly: 290 },
    description: "Pour les utilisateurs avancés",
    features: [
      { name: "50 quiz générés par mois", description: "Création intensive de quiz", included: true },
      { name: "Documents PDF illimités", description: "Aucune limite de taille", included: true },
      { name: "Analyses avancées avec IA", description: "Intelligence artificielle poussée", included: true },
      { name: "Statistiques détaillées", description: "Rapports complets", included: true },
      { name: "Support prioritaire", description: "Réponse rapide", included: true },
      { name: "Export des résultats", description: "Exportation complète", included: true }
    ],
    icon: <Zap className="w-6 h-6" />,
    highlight: true,
    badge: "Populaire"
  },
  {
    name: "Enterprise",
    price: { monthly: 99, yearly: 990 },
    description: "Solution complète pour équipes",
    features: [
      { name: "Quiz illimités", description: "Création sans limite", included: true },
      { name: "Documents illimités", description: "Capacité maximale", included: true },
      { name: "IA personnalisée", description: "Intelligence sur mesure", included: true },
      { name: "Tableau de bord équipe", description: "Gestion collaborative", included: true },
      { name: "Intégrations API", description: "Connexions externes", included: true },
      { name: "Support dédié 24/7", description: "Assistance permanente", included: true },
      { name: "Formation personnalisée", description: "Accompagnement complet", included: true }
    ],
    icon: <Crown className="w-6 h-6" />,
    highlight: false
  }
];

function PricingSection({ className }: { className?: string }) {
  const [isYearly, setIsYearly] = useState(false)

  const buttonStyles = {
    default: cn(
      "h-12 bg-background hover:bg-accent",
      "text-foreground",
      "border border-border hover:border-primary/30",
      "shadow-sm hover:shadow-md",
      "text-sm font-medium",
    ),
    highlight: cn(
      "h-12 bg-primary hover:bg-primary/90",
      "text-primary-foreground",
      "shadow-lg hover:shadow-xl",
      "font-semibold text-base",
    ),
  }

  const badgeStyles = cn(
    "px-4 py-1.5 text-sm font-medium",
    "bg-primary text-primary-foreground",
    "border-none shadow-lg",
  )

  return (
    <section
      className={cn(
        "relative bg-gradient-to-br from-background via-background to-primary/5",
        "py-20 px-4",
        "overflow-hidden",
        className,
      )}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-pulse-slow animation-delay-1000"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-4 mb-16">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 rounded-full backdrop-blur-sm border border-primary/20">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Tarifs transparents</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent text-center">
            Choisissez votre plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-center mb-8">
            Des solutions adaptées à tous vos besoins, de l'utilisateur individuel aux grandes entreprises
          </p>
          <div className="inline-flex items-center p-1.5 bg-card/80 rounded-full border border-border shadow-sm backdrop-blur-sm">
            {["Mensuel", "Annuel"].map((period) => (
              <button
                key={period}
                onClick={() => setIsYearly(period === "Annuel")}
                className={cn(
                  "px-8 py-2.5 text-sm font-medium rounded-full transition-all duration-300",
                  (period === "Annuel") === isYearly
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative group backdrop-blur-sm will-change-transform",
                "rounded-3xl transition-all duration-500",
                "flex flex-col h-full",
                tier.highlight
                  ? "bg-gradient-to-br from-primary/5 to-primary/10 lg:-translate-y-4 hover:scale-105"
                  : "bg-card/50 hover:scale-105",
                "border",
                tier.highlight
                  ? "border-primary/30 shadow-xl"
                  : "border-border/50 hover:border-primary/30 shadow-md",
                "hover:shadow-lg",
              )}
            >
              {tier.badge && tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge className={badgeStyles}>⭐ {tier.badge}</Badge>
                </div>
              )}

              <div className="p-8 flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={cn(
                      "p-3 rounded-xl transition-all duration-300",
                      tier.highlight
                        ? "bg-primary/10 text-primary"
                        : "bg-muted/50 text-muted-foreground",
                    )}
                  >
                    {tier.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {tier.name}
                  </h3>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">
                      €{isYearly ? tier.price.yearly : tier.price.monthly}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      /{isYearly ? "an" : "mois"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {tier.description}
                  </p>
                </div>

                <div className="space-y-4">
                  {tier.features.map((feature) => (
                    <div key={feature.name} className="flex gap-3">
                      <div
                        className={cn(
                          "mt-1 p-1 rounded-full transition-colors duration-200",
                          feature.included
                            ? "bg-primary/10 text-primary"
                            : "bg-muted/50 text-muted-foreground",
                        )}
                      >
                        <CheckIcon className="w-3 h-3" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {feature.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {feature.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 pt-0 mt-auto">
                <Button
                  className={cn(
                    "w-full relative transition-all duration-300",
                    tier.highlight
                      ? buttonStyles.highlight
                      : buttonStyles.default,
                  )}
                  size="lg"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {tier.highlight ? (
                      <>
                        Choisir Pro
                        <ArrowRightIcon className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Commencer
                        <ArrowRightIcon className="w-4 h-4" />
                      </>
                    )}
                  </span>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-2 text-foreground">Besoin d'une solution sur mesure ?</h3>
          <p className="text-muted-foreground mb-4">
            Contactez-nous pour une offre personnalisée adaptée à vos besoins spécifiques
          </p>
          <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
            Nous contacter
          </Button>
        </div>
      </div>
    </section>
  )
}

const Pricing = () => {
  return <PricingSection />
}

export default Pricing;