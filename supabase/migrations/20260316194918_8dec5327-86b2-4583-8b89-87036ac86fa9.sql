
ALTER TABLE public.profiles 
  ADD COLUMN tracking_mode text DEFAULT NULL,
  ADD COLUMN cycle_length integer DEFAULT 28,
  ADD COLUMN onboarding_completed boolean DEFAULT false,
  ADD COLUMN period_start_date date DEFAULT NULL;
