
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type AppRole = 'student' | 'teacher';

interface RoleSelectorProps {
  value: AppRole;
  onChange: (role: AppRole) => void;
}

const RoleSelector = ({ value, onChange }: RoleSelectorProps) => {
  const roles = [
    { value: 'student' as AppRole, label: 'Étudiant', description: 'Créer et passer des quiz' },
    { value: 'teacher' as AppRole, label: 'Professeur', description: 'Créer et gérer des quiz pour les étudiants' }
  ];

  return (
    <div className="space-y-2">
      <Label htmlFor="role-select">Type de compte</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Sélectionnez votre rôle" />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => (
            <SelectItem key={role.value} value={role.value}>
              <div className="flex flex-col">
                <span className="font-medium">{role.label}</span>
                <span className="text-sm text-muted-foreground">{role.description}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RoleSelector;
