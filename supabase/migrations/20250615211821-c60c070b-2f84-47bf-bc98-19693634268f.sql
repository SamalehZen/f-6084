
-- Supprimer l'ancien trigger s'il existe
DROP TRIGGER IF EXISTS assign_default_role_trigger ON auth.users;

-- Recréer le trigger sur auth.users pour assigner automatiquement un rôle
CREATE TRIGGER assign_default_role_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.assign_default_role();
