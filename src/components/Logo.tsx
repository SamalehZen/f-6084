
import React from 'react';
import { FileText } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
        <FileText className="h-4 w-4 text-primary-foreground" />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold tracking-tight text-foreground">Quiz PDF Pro</span>
      </div>
    </div>
  );
};

export default Logo;
