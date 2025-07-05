
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Home, ArrowLeft, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
      {/* Premium background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[800px] lg:h-[800px] bg-gradient-radial from-primary/3 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="absolute inset-0 cosmic-grid opacity-20 sm:opacity-30"></div>

      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6">
        <Card className="max-w-sm sm:max-w-lg lg:max-w-2xl w-full border-0 shadow-2xl bg-card/80 backdrop-blur-xl cosmic-glow">
          <CardContent className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6 sm:space-y-8">
              {/* Premium icon */}
              <div className="relative mx-auto">
                <div className="h-20 w-20 sm:h-28 sm:w-28 lg:h-32 lg:w-32 mx-auto rounded-2xl sm:rounded-3xl bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center shadow-2xl">
                  <AlertTriangle className="h-10 w-10 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-red-600 icon-glow" />
                </div>
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                </div>
              </div>

              {/* Premium typography */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                  404
                </h1>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
                  Page Introuvable
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xs sm:max-w-sm lg:max-w-md mx-auto leading-relaxed px-2">
                  La page que vous recherchez semble avoir disparu dans l'univers numérique.
                </p>
              </div>

              {/* Premium action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-6 sm:pt-8">
                <Button 
                  asChild 
                  className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/30 rounded-full px-6 sm:px-8 py-4 sm:py-6 font-semibold transition-all duration-300 hover:scale-105 text-base sm:text-lg premium-button"
                >
                  <a href="/" className="flex items-center justify-center gap-2 sm:gap-3">
                    <Home className="h-4 w-4 sm:h-5 sm:w-5" />
                    Retour à l'accueil
                  </a>
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => window.history.back()}
                  className="border-primary/20 text-foreground hover:bg-accent/50 rounded-full px-6 sm:px-8 py-4 sm:py-6 font-semibold transition-all duration-300 hover:scale-105 text-base sm:text-lg"
                >
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
                  Page précédente
                </Button>
              </div>

              {/* Premium decorative element */}
              <div className="pt-6 sm:pt-8 flex justify-center">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-primary/30"></div>
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary/50" />
                  <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-primary/30"></div>
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
