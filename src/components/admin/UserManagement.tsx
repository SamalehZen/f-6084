
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Shield, Trash2 } from 'lucide-react'
import { useRoleManagement } from '@/hooks/useUserRoles'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

const UserManagement = () => {
  const { allUsers, assignRole, removeRole, isAssigningRole } = useRoleManagement()
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = allUsers?.filter(user => 
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const handleAssignRole = (userId: string) => {
    if (selectedRole) {
      assignRole({ userId, role: selectedRole as any })
      setSelectedRole('')
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive'
      case 'teacher': return 'default'
      case 'student': return 'secondary'
      default: return 'outline'
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrateur'
      case 'teacher': return 'Enseignant'
      case 'student': return 'Étudiant'
      default: return role
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des utilisateurs et rôles</CardTitle>
        <CardDescription>Gérer les utilisateurs et leurs rôles dans le système</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Barre de recherche */}
          <div className="flex space-x-4">
            <Input
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {/* Liste des utilisateurs */}
          <div className="space-y-2">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium">{user.full_name || 'Nom non défini'}</h4>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="flex space-x-2">
                    {user.user_roles && Array.isArray(user.user_roles) ? user.user_roles.map((userRole: any) => (
                      <div key={userRole.id} className="flex items-center space-x-2">
                        <Badge variant={getRoleBadgeVariant(userRole.role)}>
                          {getRoleLabel(userRole.role)}
                        </Badge>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Supprimer le rôle</AlertDialogTitle>
                              <AlertDialogDescription>
                                Êtes-vous sûr de vouloir supprimer le rôle "{getRoleLabel(userRole.role)}" 
                                pour {user.full_name || user.email} ?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction onClick={() => removeRole(userRole.id)}>
                                Supprimer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )) : null}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Étudiant</SelectItem>
                      <SelectItem value="teacher">Enseignant</SelectItem>
                      <SelectItem value="admin">Administrateur</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={() => handleAssignRole(user.id)}
                    disabled={!selectedRole || isAssigningRole}
                    size="sm"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Assigner
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserManagement
