
import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Quiz PDF Pro a révolutionné ma façon de créer des évaluations. En 5 minutes, je transforme mes cours en quiz interactifs que mes étudiants adorent !",
      author: "Marie Dubois",
      position: "Professeure de Mathématiques, Lycée Henri IV",
      avatar: "bg-primary/30"
    },
    {
      quote: "L'analyse pédagogique de l'IA m'aide à identifier rapidement les concepts mal compris. Mes formations en entreprise sont maintenant beaucoup plus efficaces.",
      author: "Jean-Pierre Martin",
      position: "Formateur RH, Groupe Renault",
      avatar: "bg-primary/20"
    },
    {
      quote: "Fini les heures passées à créer manuellement des quiz ! L'IA génère des questions pertinentes et variées. Un gain de temps énorme pour notre équipe pédagogique.",
      author: "Sophie Lefebvre",
      position: "Directrice Pédagogique, CNAM Paris",
      avatar: "bg-primary/40"
    }
  ];
  
  return (
    <section className="w-full py-20 px-6 md:px-12 bg-card relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 cosmic-grid opacity-20"></div>
      
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
            Utilisé par des milliers d'enseignants et formateurs
          </h2>
          <p className="text-muted-foreground text-lg">
            Découvrez comment Quiz PDF Pro transforme l'éducation et la formation professionnelle
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl border border-border bg-background/80 backdrop-blur-sm hover:border-border/60 transition-all duration-300"
            >
              <div className="mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary inline-block mr-1">★</span>
                ))}
              </div>
              <p className="text-lg mb-8 text-foreground/90 italic">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-full ${testimonial.avatar} bg-muted`}></div>
                <div>
                  <h4 className="font-medium text-foreground">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
