
-- Itinerary feedback (AI quality) - fix typo
CREATE TABLE public.itinerary_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id UUID REFERENCES public.trips(id) ON DELETE SET NULL,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  accuracy_rating INTEGER CHECK (accuracy_rating >= 1 AND accuracy_rating <= 5),
  helpfulness_rating INTEGER CHECK (helpfulness_rating >= 1 AND helpfulness_rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.itinerary_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own itinerary feedback" ON public.itinerary_feedback FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create itinerary feedback" ON public.itinerary_feedback FOR INSERT WITH CHECK (auth.uid() = user_id);
