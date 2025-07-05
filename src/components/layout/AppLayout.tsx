
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-background via-background to-background/95 relative overflow-hidden">
      {/* Premium background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-48 h-48 lg:w-96 lg:h-96 bg-primary/5 lg:bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 lg:w-80 lg:h-80 bg-primary/3 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
      </div>
      
      <div className="absolute inset-0 cosmic-grid opacity-10 lg:opacity-20"></div>
      
      {/* Mobile layout */}
      {isMobile ? (
        <>
          <Sidebar />
          <div className="flex-1 flex flex-col min-h-screen">
            <AppHeader />
            <main className="flex-1 overflow-auto premium-content-bg p-4">
              <div className="relative max-w-full">
                {children}
              </div>
            </main>
          </div>
        </>
      ) : (
        /* Desktop layout */
        <>
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden relative z-10">
            <AppHeader />
            <main className="flex-1 overflow-auto premium-content-bg">
              <div className="relative">
                {children}
              </div>
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default AppLayout;
