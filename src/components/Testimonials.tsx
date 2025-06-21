
import React from 'react';
import { Crown, Star, Quote, Trophy, Award } from 'lucide-react';

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
        
        {/* Premium testimonials grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="group premium-testimonial-card p-8 rounded-3xl border-2 border-primary/20 backdrop-blur-xl hover:border-primary/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/10 relative overflow-hidden"
            >
              {/* Premium background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Quote icon */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <Quote className="h-8 w-8 text-primary opacity-60" />
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  {testimonial.achievement}
                </div>
                
                <blockquote className="text-lg leading-relaxed text-foreground/90 italic mb-8 font-light">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-start gap-4">
                  <div className={`h-16 w-16 rounded-2xl ${testimonial.avatar} border-2 border-primary/30 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <Crown className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-xl text-foreground mb-1">{testimonial.author}</h4>
                    <p className="text-muted-foreground mb-2">{testimonial.position}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                      <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                      <span className="text-xs font-medium text-primary">{testimonial.badge}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Premium shine effect */}
              <div className="absolute inset-0 -top-4 -left-4 bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-1000 ease-out"></div>
            </div>
          ))}
        </div>
        
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
