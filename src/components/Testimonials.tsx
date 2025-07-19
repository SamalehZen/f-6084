
import React from 'react';
import { Crown, Star, Trophy, Award } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  ContainerScroll, 
  CardsContainer, 
  CardTransformed, 
  ReviewStars 
} from '@/components/ui/animated-testimonials';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Quiz PDF Pro Elite a révolutionné notre approche pédagogique. L'IA génère des évaluations d'une qualité exceptionnelle qui surpassent tout ce que nous avions imaginé. Une véritable révolution !",
      author: "Dr. Marie Dubois",
      position: "Directrice Pédagogique, Sciences Po Paris",
      rating: 5,
      avatar: "bg-gradient-to-br from-purple-500/30 to-purple-600/20",
      badge: "Utilisatrice VIP depuis 2023",
      achievement: <Trophy className="h-5 w-5 text-yellow-500" />
    },
    {
      quote: "L'analyse prédictive de l'IA nous permet d'anticiper les difficultés d'apprentissage avec une précision remarquable. Nos taux de réussite ont augmenté de 85% depuis l'adoption de cette solution premium.",
      author: "Prof. Jean-Pierre Martin",
      position: "Responsable Formation, Groupe Total",
      rating: 5,
      avatar: "bg-gradient-to-br from-blue-500/30 to-blue-600/20",
      badge: "Expert Enterprise",
      achievement: <Crown className="h-5 w-5 text-primary" />
    },
    {
      quote: "Une interface d'une élégance rare et des fonctionnalités qui dépassent nos attentes les plus élevées. Quiz PDF Pro Elite définit les nouveaux standards de l'excellence pédagogique digitale.",
      author: "Sophie Lefebvre",
      position: "Innovation Manager, CNAM International",
      rating: 5,
      avatar: "bg-gradient-to-br from-green-500/30 to-green-600/20",
      badge: "Innovatrice de l'Année",
      achievement: <Award className="h-5 w-5 text-green-500" />
    }
  ];
  
  return (
    <section className="w-full py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
      {/* Premium background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Premium header */}
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 backdrop-blur-sm">
            <Crown className="h-5 w-5 text-primary" />
            <span className="text-sm font-bold text-primary uppercase tracking-wider">Témoignages d'Excellence</span>
            <Star className="h-5 w-5 text-primary fill-current" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
            <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Reconnu par les
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
              Leaders Mondiaux
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed font-light">
            Découvrez pourquoi les plus grandes institutions éducatives et entreprises 
            font confiance à Quiz PDF Pro Elite pour transformer leurs méthodes d'apprentissage.
          </p>
        </div>
        
        {/* Animated testimonials stack */}
        <ContainerScroll className="h-[800px]">
          <CardsContainer className="h-[600px] w-full max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <CardTransformed
                key={index}
                index={index}
                arrayLength={testimonials.length}
                incrementY={20}
                incrementZ={20}
                incrementRotation={index * 2}
                variant="light"
                className="w-full h-[400px]"
              >
                <div className="relative z-10 text-center">
                  {/* Achievement Icon */}
                  <div className="flex justify-center mb-6">
                    {testimonial.achievement}
                  </div>
                  
                  {/* Rating */}
                  <ReviewStars rating={testimonial.rating} className="justify-center mb-6" />
                  
                  {/* Quote */}
                  <blockquote className="text-lg leading-relaxed text-foreground/90 italic mb-8 font-light max-w-md">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  {/* Author Info */}
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className={`${testimonial.avatar} border-2 border-primary/30`}>
                        <Crown className="h-6 w-6 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h4 className="font-bold text-xl text-foreground mb-1">{testimonial.author}</h4>
                      <p className="text-muted-foreground mb-3">{testimonial.position}</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                        <span className="text-xs font-medium text-primary">{testimonial.badge}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardTransformed>
            ))}
          </CardsContainer>
        </ContainerScroll>
        
        {/* Premium stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-primary/20">
          {[
            { value: "50,000+", label: "Utilisateurs Premium", icon: <Crown className="h-6 w-6" /> },
            { value: "98.7%", label: "Satisfaction Client", icon: <Star className="h-6 w-6" /> },
            { value: "2M+", label: "Quiz Générés", icon: <Trophy className="h-6 w-6" /> },
            { value: "45+", label: "Pays Conquis", icon: <Award className="h-6 w-6" /> }
          ].map((stat, index) => (
            <div key={index} className="text-center space-y-3 group">
              <div className="flex justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-black text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
