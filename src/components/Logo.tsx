
import React from 'react';
import { Crown, Sparkles } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-4 group">
      <div className="relative">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
          <Crown className="h-6 w-6 text-primary-foreground group-hover:rotate-12 transition-transform duration-300" />
        </div>
        <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
          <Sparkles className="h-2.5 w-2.5 text-white" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-black tracking-tight text-foreground">
          Quiz PDF{" "}
          <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
            Pro Elite
          </span>
        </span>
        <span className="text-xs font-bold text-primary uppercase tracking-wider">
          Premium Experience
        </span>
      </div>
    </div>
  );
};

export default Logo;
