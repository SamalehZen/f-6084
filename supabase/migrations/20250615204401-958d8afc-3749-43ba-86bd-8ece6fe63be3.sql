

-- Modifier la fonction assign_default_role pour lire le rôle depuis les métadonnées utilisateur
CREATE OR REPLACE FUNCTION public.assign_default_role()
RETURNS TRIGGER AS $$
DECLARE
  selected_role app_role;
  user_metadata jsonb;
BEGIN
  -- Récupérer les métadonnées depuis auth.users
  SELECT raw_user_meta_data INTO user_metadata
  FROM auth.users 
  WHERE id = NEW.id;
  
  -- Récupérer le rôle depuis les métadonnées utilisateur, par défaut 'student'
  selected_role := COALESCE(
    (user_metadata->>'role')::app_role,
    'student'::app_role
  );
  
  -- Empêcher l'auto-attribution du rôle admin (sécurité)
  IF selected_role = 'admin' THEN
    selected_role := 'student';
  END IF;
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, selected_role)
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

