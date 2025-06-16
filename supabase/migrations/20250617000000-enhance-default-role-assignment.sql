-- File: supabase/migrations/20250617000000-enhance-default-role-assignment.sql

-- Forcer la reconnexion en invalidant les connexions existantes (si nécessaire, pour s'assurer que les anciennes fonctions ne sont pas en cache)
-- SELECT pg_terminate_backend(pid)
-- FROM pg_stat_activity
-- WHERE datname = current_database()
-- AND pid <> pg_backend_pid()
-- AND application_name LIKE '%postgrest%'; -- Être prudent avec cette commande en production.

-- Recréer la fonction avec la logique de fallback améliorée
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
    RAISE WARNING 'Tentative d''auto-assignation du rôle admin pour l''utilisateur %, rôle modifié en student.', NEW.id;
  END IF;

  BEGIN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, selected_role_text::app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE WARNING 'Erreur lors de l''assignation du rôle initial "%" pour l''utilisateur %: %. Assignation du rôle ''student'' par défaut.', selected_role_text, NEW.id, SQLERRM;
      BEGIN
        INSERT INTO public.user_roles (user_id, role)
        VALUES (NEW.id, 'student'::app_role)
        ON CONFLICT (user_id, role) DO NOTHING;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE WARNING 'Échec de l''assignation du rôle ''student'' par défaut pour l''utilisateur % après une erreur initiale: %.', NEW.id, SQLERRM;
          -- On ne bloque toujours pas l'inscription même si le fallback échoue.
      END;
  END;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Commenter ou omettre les commandes pg_reload_conf() et DEALLOCATE ALL; si elles ne sont pas nécessaires
-- ou causent des problèmes de permissions dans l'environnement de migration.
-- SELECT pg_reload_conf();
-- DEALLOCATE ALL;
