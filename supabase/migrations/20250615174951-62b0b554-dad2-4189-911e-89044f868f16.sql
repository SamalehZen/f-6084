
-- Add score calculation to quiz_attempts if not already present
ALTER TABLE public.quiz_attempts 
ADD COLUMN IF NOT EXISTS score DECIMAL(5,2);

-- Create indexes for better performance on quiz results queries
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_quiz 
ON public.quiz_attempts(user_id, quiz_id);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_completed 
ON public.quiz_attempts(completed_at) 
WHERE completed_at IS NOT NULL;

-- Update pedagogical_analysis table to ensure it has all needed columns
-- (This table already exists from the migration, just ensuring structure)
DO $$ 
BEGIN
    -- Add columns if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'pedagogical_analysis' 
                   AND column_name = 'performance_by_topic') THEN
        ALTER TABLE public.pedagogical_analysis 
        ADD COLUMN performance_by_topic JSONB;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'pedagogical_analysis' 
                   AND column_name = 'time_analysis') THEN
        ALTER TABLE public.pedagogical_analysis 
        ADD COLUMN time_analysis JSONB;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'pedagogical_analysis' 
                   AND column_name = 'difficulty_level') THEN
        ALTER TABLE public.pedagogical_analysis 
        ADD COLUMN difficulty_level TEXT;
    END IF;
END $$;

-- Add RLS policies for pedagogical_analysis if not already present
DO $$
BEGIN
    -- Create policy for inserting analysis
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'pedagogical_analysis' 
        AND policyname = 'Users can create analysis for their attempts'
    ) THEN
        CREATE POLICY "Users can create analysis for their attempts" 
        ON public.pedagogical_analysis
        FOR INSERT WITH CHECK (
            EXISTS (
                SELECT 1 FROM public.quiz_attempts 
                WHERE id = quiz_attempt_id AND user_id = auth.uid()
            )
        );
    END IF;
END $$;
