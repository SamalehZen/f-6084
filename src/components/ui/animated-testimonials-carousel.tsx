"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  rating: number;
  achievement: React.ReactNode;
  badge: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className={cn("max-w-sm md:max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-20", className)}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 999
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <div className="h-full w-full rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 border-2 border-primary/20 backdrop-blur-xl flex items-center justify-center relative overflow-hidden">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={testimonial.src} alt={testimonial.name} />
                      <AvatarFallback className="bg-gradient-to-br from-primary/30 to-primary/20 text-4xl font-bold text-primary">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    {/* Achievement badge */}
                    <div className="absolute top-4 right-4">
                      {testimonial.achievement}
                    </div>
                    
                    {/* Rating stars */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <div key={i} className="h-3 w-3 bg-primary rounded-full"></div>
                      ))}
                    </div>
                    
                    {/* Premium shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-1000 ease-out"></div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-2xl font-bold text-foreground">
                {testimonials[active].name}
              </h3>
              {testimonials[active].achievement}
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {testimonials[active].designation}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-xs font-medium text-primary">{testimonials[active].badge}</span>
            </div>
            
            {/* Rating stars */}
            <div className="flex items-center gap-1 mb-6">
              {[...Array(testimonials[active].rating)].map((_, i) => (
                <div key={i} className="h-4 w-4 bg-primary rounded-full"></div>
              ))}
            </div>
            
            <motion.p className="text-lg text-foreground/90 italic leading-relaxed">
              "{testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}"
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm flex items-center justify-center group/button hover:bg-primary/20 transition-all duration-300"
            >
              <ChevronLeft className="h-5 w-5 text-primary group-hover/button:scale-110 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm flex items-center justify-center group/button hover:bg-primary/20 transition-all duration-300"
            >
              <ChevronRight className="h-5 w-5 text-primary group-hover/button:scale-110 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};