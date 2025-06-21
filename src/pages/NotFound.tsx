
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { AlertTriangle, Home, ArrowLeft, Sparkles } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 text-foreground relative overflow-hidden">
      {/* Premium background effects - responsive */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 md:w-80 md:h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-gradient-radial from-primary/3 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="absolute inset-0 cosmic-grid opacity-30"></div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-lg md:max-w-2xl w-full border-0 shadow-2xl bg-card/80 backdrop-blur-xl cosmic-glow">
          <CardContent className="py-12 md:py-16 px-6 md:px-8">
            <div className="text-center space-y-6 md:space-y-8">
              {/* Premium icon - responsive */}
              <div className="relative mx-auto">
                <div className="h-24 w-24 md:h-32 md:w-32 mx-auto rounded-2xl md:rounded-3xl bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center shadow-2xl">
                  <AlertTriangle className="h-12 w-12 md:h-16 md:w-16 text-red-600 icon-glow" />
                </div>
                <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 h-6 w-6 md:h-8 md:w-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                  <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-white" />
                </div>
              </div>

              {/* Premium typography - responsive */}
              <div className="space-y-3 md:space-y-4">
                <h1 className="text-6xl md:text-8xl font-black tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                  404
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Page Introuvable
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed px-2">
                  {isMobile 
                    ? "La page que vous cherchez semble avoir disparu."
                    : "La page que vous recherchez semble avoir disparu dans l'univers numérique."
                  }
                </p>
              </div>

              {/* Premium action buttons - responsive */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-6 md:pt-8">
                <Button 
                  asChild 
                  className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/30 rounded-full px-6 md:px-8 py-4 md:py-6 font-semibold transition-all duration-300 hover:scale-105 text-base md:text-lg premium-button"
                >
                  <a href="/" className="flex items-center gap-2 md:gap-3 justify-center">
                    <Home className="h-4 w-4 md:h-5 md:w-5" />
                    <span>{isMobile ? "Accueil" : "Retour à l'accueil"}</span>
                  </a>
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => window.history.back()}
                  className="w-full sm:w-auto border-primary/20 text-foreground hover:bg-accent/50 rounded-full px-6 md:px-8 py-4 md:py-6 font-semibold transition-all duration-300 hover:scale-105 text-base md:text-lg"
                >
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3" />
                  <span>{isMobile ? "Précédent" : "Page précédente"}</span>
                </Button>
              </div>

              {/* Premium decorative element */}
              <div className="pt-6 md:pt-8 flex justify-center">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="h-px w-12 md:w-16 bg-gradient-to-r from-transparent to-primary/30"></div>
                  <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-primary/50" />
                  <div className="h-px w-12 md:w-16 bg-gradient-to-l from-transparent to-primary/30"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
