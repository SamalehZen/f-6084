


-- Forcer la reconnexion en invalidant les connexions existantes
SELECT pg_terminate_backend(pid) 
FROM pg_stat_activity 
WHERE datname = current_database() 
AND pid <> pg_backend_pid()
AND application_name LIKE '%postgrest%';

-- Recréer complètement le trigger avec une approche simplifiée
DROP TRIGGER IF EXISTS assign_default_role_trigger ON public.profiles;

-- Fonction simplifiée qui utilise directement du texte au lieu de l'enum
CREATE OR REPLACE FUNCTION public.assign_default_role_simple()
RETURNS TRIGGER AS $$
DECLARE
  selected_role_text text;
  user_metadata jsonb;
BEGIN
  -- Récupérer les métadonnées depuis auth.users
  SELECT raw_user_meta_data INTO user_metadata
  FROM auth.users 
  WHERE id = NEW.id;
  
  -- Récupérer le rôle depuis les métadonnées utilisateur, par défaut 'student'
  selected_role_text := COALESCE(
    user_metadata->>'role',
    'student'
  );
  
  -- Empêcher l'auto-attribution du rôle admin (sécurité)
  IF selected_role_text = 'admin' THEN
    selected_role_text := 'student';
  END IF;
  
  -- Insérer avec cast vers app_role seulement au moment de l'insertion
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, selected_role_text::app_role)
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- En cas d'erreur, on continue sans bloquer l'inscription
    RAISE WARNING 'Erreur lors de l''assignation du rôle: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recréer le trigger avec la nouvelle fonction
CREATE TRIGGER assign_default_role_trigger
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.assign_default_role_simple();

-- Forcer la recompilation des fonctions
SELECT pg_reload_conf();

-- Nettoyer le cache des prepared statements
DEALLOCATE ALL;


