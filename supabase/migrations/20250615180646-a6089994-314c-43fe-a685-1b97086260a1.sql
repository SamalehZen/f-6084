
-- Créer l'enum pour les rôles
CREATE TYPE public.app_role AS ENUM ('student', 'teacher', 'admin');

-- Créer la table pour les rôles des utilisateurs
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  assigned_by UUID REFERENCES public.profiles(id),
  UNIQUE(user_id, role)
);

-- Créer une table pour les statistiques d'usage global
CREATE TABLE public.usage_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_users INTEGER DEFAULT 0,
  total_quizzes INTEGER DEFAULT 0,
  total_attempts INTEGER DEFAULT 0,
  average_completion_rate DECIMAL(5,2) DEFAULT 0,
  average_success_rate DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(date)
);

-- Activer RLS sur les nouvelles tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_analytics ENABLE ROW LEVEL SECURITY;

-- Fonction pour vérifier si un utilisateur a un rôle spécifique (évite la récursion RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Fonction pour obtenir le rôle principal d'un utilisateur
CREATE OR REPLACE FUNCTION public.get_user_primary_role(_user_id uuid)
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
  ORDER BY 
    CASE role
      WHEN 'admin' THEN 1
      WHEN 'teacher' THEN 2
      WHEN 'student' THEN 3
    END
  LIMIT 1
$$;

-- Politiques RLS pour user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can assign roles" ON public.user_roles
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles" ON public.user_roles
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles" ON public.user_roles
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Politiques RLS pour usage_analytics
CREATE POLICY "Only admins can view analytics" ON public.usage_analytics
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Créer un rôle par défaut pour les nouveaux utilisateurs
CREATE OR REPLACE FUNCTION public.assign_default_role()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'student');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour assigner automatiquement le rôle étudiant aux nouveaux utilisateurs
CREATE TRIGGER assign_default_role_trigger
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.assign_default_role();

-- Fonction pour calculer les statistiques quotidiennes
CREATE OR REPLACE FUNCTION public.calculate_daily_analytics()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  users_count INTEGER;
  quizzes_count INTEGER;
  attempts_count INTEGER;
  completion_rate DECIMAL(5,2);
  success_rate DECIMAL(5,2);
BEGIN
  -- Compter les utilisateurs actifs
  SELECT COUNT(*) INTO users_count FROM public.profiles;
  
  -- Compter les quiz créés
  SELECT COUNT(*) INTO quizzes_count FROM public.quizzes;
  
  -- Compter les tentatives
  SELECT COUNT(*) INTO attempts_count FROM public.quiz_attempts;
  
  -- Calculer le taux de complétion
  SELECT 
    CASE 
      WHEN COUNT(*) > 0 THEN 
        (COUNT(*) FILTER (WHERE completed_at IS NOT NULL)::DECIMAL / COUNT(*)) * 100
      ELSE 0 
    END INTO completion_rate
  FROM public.quiz_attempts;
  
  -- Calculer le taux de réussite moyen
  SELECT 
    CASE 
      WHEN COUNT(*) > 0 THEN AVG(score)
      ELSE 0 
    END INTO success_rate
  FROM public.quiz_attempts 
  WHERE completed_at IS NOT NULL AND score IS NOT NULL;
  
  -- Insérer ou mettre à jour les statistiques du jour
  INSERT INTO public.usage_analytics (
    date, total_users, total_quizzes, total_attempts, 
    average_completion_rate, average_success_rate
  )
  VALUES (
    CURRENT_DATE, users_count, quizzes_count, attempts_count,
    completion_rate, success_rate
  )
  ON CONFLICT (date) DO UPDATE SET
    total_users = EXCLUDED.total_users,
    total_quizzes = EXCLUDED.total_quizzes,
    total_attempts = EXCLUDED.total_attempts,
    average_completion_rate = EXCLUDED.average_completion_rate,
    average_success_rate = EXCLUDED.average_success_rate,
    created_at = NOW();
END;
$$;

-- Maintenant créer les fonctions RPC
-- Fonction RPC pour récupérer les analytics d'usage
CREATE OR REPLACE FUNCTION public.get_usage_analytics(days_limit integer DEFAULT 30)
RETURNS TABLE (
  id uuid,
  date date,
  total_users integer,
  total_quizzes integer,
  total_attempts integer,
  average_completion_rate decimal(5,2),
  average_success_rate decimal(5,2),
  created_at timestamp with time zone
)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT 
    id, date, total_users, total_quizzes, total_attempts,
    average_completion_rate, average_success_rate, created_at
  FROM public.usage_analytics
  ORDER BY date DESC
  LIMIT days_limit;
$$;

-- Fonction RPC pour récupérer les rôles d'un utilisateur
CREATE OR REPLACE FUNCTION public.get_user_roles(_user_id uuid)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  role app_role,
  assigned_at timestamp with time zone,
  assigned_by uuid
)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT id, user_id, role, assigned_at, assigned_by
  FROM public.user_roles
  WHERE user_id = _user_id;
$$;

-- Fonction RPC pour récupérer tous les utilisateurs avec leurs rôles
CREATE OR REPLACE FUNCTION public.get_all_users_with_roles()
RETURNS TABLE (
  id uuid,
  email text,
  full_name text,
  role text,
  subscription_plan text,
  avatar_url text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  user_roles jsonb
)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT 
    p.id,
    p.email,
    p.full_name,
    p.role,
    p.subscription_plan,
    p.avatar_url,
    p.created_at,
    p.updated_at,
    COALESCE(
      jsonb_agg(
        jsonb_build_object(
          'id', ur.id,
          'role', ur.role,
          'assigned_at', ur.assigned_at,
          'assigned_by', ur.assigned_by
        )
      ) FILTER (WHERE ur.id IS NOT NULL),
      '[]'::jsonb
    ) as user_roles
  FROM public.profiles p
  LEFT JOIN public.user_roles ur ON p.id = ur.user_id
  GROUP BY p.id, p.email, p.full_name, p.role, p.subscription_plan, p.avatar_url, p.created_at, p.updated_at;
$$;

-- Fonction RPC pour assigner un rôle à un utilisateur
CREATE OR REPLACE FUNCTION public.assign_user_role(_user_id uuid, _role app_role)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  role app_role,
  assigned_at timestamp with time zone,
  assigned_by uuid
)
LANGUAGE sql
VOLATILE
SECURITY DEFINER
AS $$
  INSERT INTO public.user_roles (user_id, role, assigned_by)
  VALUES (_user_id, _role, auth.uid())
  ON CONFLICT (user_id, role) DO NOTHING
  RETURNING id, user_id, role, assigned_at, assigned_by;
$$;

-- Fonction RPC pour supprimer un rôle d'un utilisateur
CREATE OR REPLACE FUNCTION public.remove_user_role(_role_id uuid)
RETURNS void
LANGUAGE sql
VOLATILE
SECURITY DEFINER
AS $$
  DELETE FROM public.user_roles WHERE id = _role_id;
$$;
