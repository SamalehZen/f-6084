
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAuth } from '@/hooks/useAuth'
import { useUserRoles } from '@/hooks/useUserRoles'
import {
  LayoutDashboard,
  Upload,
  User,
  Settings,
  LogOut,
  Shield
} from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()
  const { signOut } = useAuth()
  const { isAdmin } = useUserRoles()

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

  // Ajouter le lien admin si l'utilisateur est admin
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

  return (
    <div className="flex h-full w-64 flex-col fixed inset-y-0 z-50 bg-background border-r">
      <div className="flex h-16 items-center border-b px-4">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">Q</span>
          </div>
          <span className="text-xl font-bold">QuizMaster</span>
        </Link>
      </div>
      
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
      
      <div className="border-t p-4">
        <Button
          onClick={handleSignOut}
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-accent-foreground"
        >
          <LogOut className="h-4 w-4 mr-3" />
          Déconnexion
        </Button>
      </div>
    </div>
  )
}

export default Sidebar
