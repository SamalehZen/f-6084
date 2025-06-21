
import React from 'react';
import Sidebar from './Sidebar';
import AppHeader from './AppHeader';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="h-screen flex bg-gradient-to-br from-background via-background to-background/95 relative overflow-hidden">
      {/* Premium background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 md:w-80 md:h-80 bg-primary/3 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
      </div>
      
      <div className="absolute inset-0 cosmic-grid opacity-20"></div>
      
      {!isMobile && (
        <div className="w-64 flex-shrink-0 relative z-10">
          <Sidebar />
        </div>
      )}
      
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <AppHeader />
        <main className="flex-1 overflow-auto premium-content-bg">
          <div className="relative p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
      
      {isMobile && <Sidebar />}
    </div>
  );
};

export default AppLayout;
