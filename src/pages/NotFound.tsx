
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Home, ArrowLeft, Sparkles } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

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
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/3 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="absolute inset-0 cosmic-grid opacity-30"></div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full border-0 shadow-2xl bg-card/80 backdrop-blur-xl cosmic-glow">
          <CardContent className="py-16 px-8">
            <div className="text-center space-y-8">
              {/* Premium icon */}
              <div className="relative mx-auto">
                <div className="h-32 w-32 mx-auto rounded-3xl bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center shadow-2xl">
                  <AlertTriangle className="h-16 w-16 text-red-600 icon-glow" />
                </div>
                <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              </div>

              {/* Premium typography */}
              <div className="space-y-4">
                <h1 className="text-8xl font-black tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                  404
                </h1>
                <h2 className="text-3xl font-bold text-foreground">
                  Page Introuvable
                </h2>
                <p className="text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
                  La page que vous recherchez semble avoir disparu dans l'univers numérique.
                </p>
              </div>

              {/* Premium action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Button 
                  asChild 
                  className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/30 rounded-full px-8 py-6 font-semibold transition-all duration-300 hover:scale-105 text-lg premium-button"
                >
                  <a href="/" className="flex items-center gap-3">
                    <Home className="h-5 w-5" />
                    Retour à l'accueil
                  </a>
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => window.history.back()}
                  className="border-primary/20 text-foreground hover:bg-accent/50 rounded-full px-8 py-6 font-semibold transition-all duration-300 hover:scale-105 text-lg"
                >
                  <ArrowLeft className="h-5 w-5 mr-3" />
                  Page précédente
                </Button>
              </div>

              {/* Premium decorative element */}
              <div className="pt-8 flex justify-center">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/30"></div>
                  <Sparkles className="h-4 w-4 text-primary/50" />
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/30"></div>
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
