
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  LayoutDashboard, 
  FileText, 
  Brain, 
  BarChart3, 
  Settings,
  Upload,
  BookOpen
} from 'lucide-react';
import Logo from '@/components/Logo';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Mes Documents',
    href: '/documents',
    icon: FileText,
  },
  {
    name: 'Mes Quiz',
    href: '/quizzes',
    icon: Brain,
  },
  {
    name: 'Analyses',
    href: '/analytics',
    icon: BarChart3,
  },
  {
    name: 'Bibliothèque',
    href: '/library',
    icon: BookOpen,
  },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full bg-card border-r">
      <div className="p-6">
        <Logo />
      </div>
      
      <Separator />
      
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Button
                key={item.name}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-primary text-primary-foreground"
                )}
                asChild
              >
                <Link to={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            );
          })}
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-1 pb-4">
          <Button
            variant="outline"
            className="w-full justify-start"
            asChild
          >
            <Link to="/upload">
              <Upload className="mr-2 h-4 w-4" />
              Nouveau Document
            </Link>
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start"
            asChild
          >
            <Link to="/settings">
              <Settings className="mr-2 h-4 w-4" />
              Paramètres
            </Link>
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
