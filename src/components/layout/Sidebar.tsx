
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useAuth } from '@/hooks/useAuth'
import { useUserRoles } from '@/hooks/useUserRoles'
import { useIsMobile } from '@/hooks/use-mobile'
import {
  LayoutDashboard,
  Upload,
  User,
  Settings,
  LogOut,
  Shield,
  Crown,
  Sparkles,
  Menu,
  X
} from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()
  const { signOut } = useAuth()
  const { isAdmin } = useUserRoles()
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard
    },
    {
      name: 'Upload PDF',
      href: '/upload',
      icon: Upload
    },
    {
      name: 'Mon Profil',
      href: '/profile',
      icon: User
    }
  ]

  if (isAdmin) {
    navigation.push({
      name: 'Administration',
      href: '/admin',
      icon: Shield
    })
  }

  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/'
  }

  const SidebarContent = () => (
    <div className="flex h-full w-full flex-col bg-gradient-to-b from-card/95 to-card/90 backdrop-blur-xl border-r border-primary/20 shadow-2xl">
      {/* Premium header */}
      <div className="flex h-16 sm:h-20 items-center border-b border-primary/20 px-4 sm:px-6 bg-gradient-to-r from-card to-card/80 backdrop-blur-sm">
        <Link to="/dashboard" className="flex items-center gap-2 sm:gap-3 group" onClick={() => setIsOpen(false)}>
          <div className="relative">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <span className="text-primary-foreground font-black text-sm sm:text-lg group-hover:rotate-12 transition-transform duration-300">Q</span>
            </div>
            <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
              <Crown className="h-1.5 w-1.5 sm:h-2.5 sm:w-2.5 text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-black tracking-tight text-foreground">
              Quiz{" "}
              <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                Pro
              </span>
            </span>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Premium
            </span>
          </div>
        </Link>
        
        {/* Close button for mobile */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto h-8 w-8 rounded-xl hover:bg-accent/50"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {/* Premium navigation */}
      <ScrollArea className="flex-1 px-3 sm:px-4 py-4 sm:py-6">
        <nav className="space-y-2 sm:space-y-3">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'group flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 relative overflow-hidden',
                  isActive
                    ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                )}
              >
                <div className={cn(
                  'h-6 w-6 sm:h-8 sm:w-8 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300',
                  isActive 
                    ? 'bg-primary-foreground/20' 
                    : 'group-hover:bg-accent'
                )}>
                  <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                </div>
                <span className="relative text-xs sm:text-sm">
                  {item.name}
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-foreground/50 rounded-full"></div>
                  )}
                </span>
                {isActive && (
                  <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary-foreground/70 ml-auto animate-pulse" />
                )}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
      
      {/* Premium footer */}
      <div className="border-t border-primary/20 p-3 sm:p-4 bg-gradient-to-r from-card to-card/80 backdrop-blur-sm">
        <Button
          onClick={handleSignOut}
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-xl sm:rounded-2xl py-4 sm:py-6 font-semibold transition-all duration-300 hover:scale-105 group"
        >
          <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-lg sm:rounded-xl bg-red-500/10 flex items-center justify-center mr-2 sm:mr-3 group-hover:bg-red-500/20 transition-colors">
            <LogOut className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
          </div>
          <span className="text-xs sm:text-sm">Déconnexion Elite</span>
        </Button>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 z-50 h-10 w-10 rounded-xl bg-card/80 backdrop-blur-xl border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div className="w-64 flex-shrink-0 relative z-10">
      <div className="fixed inset-y-0 left-0 w-64">
        <SidebarContent />
      </div>
    </div>
  )
}

export default Sidebar
