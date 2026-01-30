-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_preferences table
CREATE TABLE public.user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  travel_styles TEXT[] DEFAULT '{}',
  budget_range TEXT,
  accommodation_preferences TEXT[] DEFAULT '{}',
  activity_preferences TEXT[] DEFAULT '{}',
  travel_frequency TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create trips table
CREATE TABLE public.trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  budget NUMERIC(12, 2),
  currency TEXT NOT NULL DEFAULT 'USD',
  privacy TEXT NOT NULL DEFAULT 'private' CHECK (privacy IN ('private', 'shared', 'public')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'planned', 'ongoing', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create destinations table
CREATE TABLE public.destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  country TEXT,
  address TEXT,
  latitude NUMERIC(10, 7),
  longitude NUMERIC(10, 7),
  start_date DATE,
  end_date DATE,
  notes TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create activities table
CREATE TABLE public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id UUID NOT NULL REFERENCES public.destinations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'other' CHECK (category IN ('food', 'sightseeing', 'transport', 'accommodation', 'shopping', 'entertainment', 'nature', 'culture', 'nightlife', 'wellness', 'other')),
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  duration_minutes INTEGER,
  location_name TEXT,
  address TEXT,
  latitude NUMERIC(10, 7),
  longitude NUMERIC(10, 7),
  cost NUMERIC(12, 2),
  currency TEXT NOT NULL DEFAULT 'USD',
  booking_url TEXT,
  booking_reference TEXT,
  notes TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_booked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create expenses table
CREATE TABLE public.expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES public.activities(id) ON DELETE SET NULL,
  category TEXT NOT NULL DEFAULT 'other' CHECK (category IN ('accommodation', 'transport', 'food', 'activities', 'shopping', 'other')),
  amount NUMERIC(12, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  description TEXT,
  date DATE NOT NULL,
  receipt_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create packing_lists table
CREATE TABLE public.packing_lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'My Packing List',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create packing_items table
CREATE TABLE public.packing_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  packing_list_id UUID NOT NULL REFERENCES public.packing_lists(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  category TEXT,
  is_packed BOOLEAN NOT NULL DEFAULT false,
  is_essential BOOLEAN NOT NULL DEFAULT false,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create trip_collaborators table
CREATE TABLE public.trip_collaborators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('viewer', 'editor', 'admin')),
  invited_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  invitation_status TEXT NOT NULL DEFAULT 'pending' CHECK (invitation_status IN ('pending', 'accepted', 'declined')),
  invited_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  accepted_at TIMESTAMPTZ,
  UNIQUE(trip_id, email)
);

-- Create trip_comments table
CREATE TABLE public.trip_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  destination_id UUID REFERENCES public.destinations(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES public.activities(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_comment_id UUID REFERENCES public.trip_comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON public.user_preferences FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_trips_updated_at BEFORE UPDATE ON public.trips FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_destinations_updated_at BEFORE UPDATE ON public.destinations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON public.activities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_expenses_updated_at BEFORE UPDATE ON public.expenses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_packing_lists_updated_at BEFORE UPDATE ON public.packing_lists FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_trip_comments_updated_at BEFORE UPDATE ON public.trip_comments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packing_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packing_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_collaborators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_comments ENABLE ROW LEVEL SECURITY;

-- Helper function to check trip access
CREATE OR REPLACE FUNCTION public.has_trip_access(_user_id UUID, _trip_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.trips WHERE id = _trip_id AND user_id = _user_id
  ) OR EXISTS (
    SELECT 1 FROM public.trip_collaborators 
    WHERE trip_id = _trip_id AND user_id = _user_id AND invitation_status = 'accepted'
  );
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for user_preferences
CREATE POLICY "Users can view their own preferences" ON public.user_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own preferences" ON public.user_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own preferences" ON public.user_preferences FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for trips
CREATE POLICY "Users can view their own trips" ON public.trips FOR SELECT USING (auth.uid() = user_id OR public.has_trip_access(auth.uid(), id));
CREATE POLICY "Users can create their own trips" ON public.trips FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own trips" ON public.trips FOR UPDATE USING (auth.uid() = user_id OR public.has_trip_access(auth.uid(), id));
CREATE POLICY "Users can delete their own trips" ON public.trips FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for destinations (access through trip)
CREATE POLICY "Users can view destinations of accessible trips" ON public.destinations FOR SELECT USING (public.has_trip_access(auth.uid(), trip_id));
CREATE POLICY "Users can create destinations in accessible trips" ON public.destinations FOR INSERT WITH CHECK (public.has_trip_access(auth.uid(), trip_id));
CREATE POLICY "Users can update destinations in accessible trips" ON public.destinations FOR UPDATE USING (public.has_trip_access(auth.uid(), trip_id));
CREATE POLICY "Users can delete destinations in accessible trips" ON public.destinations FOR DELETE USING (public.has_trip_access(auth.uid(), trip_id));

-- RLS Policies for activities (access through destination -> trip)
CREATE POLICY "Users can view activities of accessible trips" ON public.activities FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.destinations d WHERE d.id = destination_id AND public.has_trip_access(auth.uid(), d.trip_id)));
CREATE POLICY "Users can create activities in accessible trips" ON public.activities FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM public.destinations d WHERE d.id = destination_id AND public.has_trip_access(auth.uid(), d.trip_id)));
CREATE POLICY "Users can update activities in accessible trips" ON public.activities FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM public.destinations d WHERE d.id = destination_id AND public.has_trip_access(auth.uid(), d.trip_id)));
CREATE POLICY "Users can delete activities in accessible trips" ON public.activities FOR DELETE 
  USING (EXISTS (SELECT 1 FROM public.destinations d WHERE d.id = destination_id AND public.has_trip_access(auth.uid(), d.trip_id)));

-- RLS Policies for expenses
CREATE POLICY "Users can view expenses of accessible trips" ON public.expenses FOR SELECT USING (public.has_trip_access(auth.uid(), trip_id));
CREATE POLICY "Users can create expenses in accessible trips" ON public.expenses FOR INSERT WITH CHECK (public.has_trip_access(auth.uid(), trip_id));
CREATE POLICY "Users can update expenses in accessible trips" ON public.expenses FOR UPDATE USING (public.has_trip_access(auth.uid(), trip_id));
CREATE POLICY "Users can delete expenses in accessible trips" ON public.expenses FOR DELETE USING (public.has_trip_access(auth.uid(), trip_id));

-- RLS Policies for packing_lists
CREATE POLICY "Users can view packing lists of accessible trips" ON public.packing_lists FOR SELECT USING (public.has_trip_access(auth.uid(), trip_id));
CREATE POLICY "Users can create packing lists in accessible trips" ON public.packing_lists FOR INSERT WITH CHECK (public.has_trip_access(auth.uid(), trip_id));
CREATE POLICY "Users can update packing lists in accessible trips" ON public.packing_lists FOR UPDATE USING (public.has_trip_access(auth.uid(), trip_id));
CREATE POLICY "Users can delete packing lists in accessible trips" ON public.packing_lists FOR DELETE USING (public.has_trip_access(auth.uid(), trip_id));

-- RLS Policies for packing_items (access through packing_list -> trip)
CREATE POLICY "Users can view packing items of accessible trips" ON public.packing_items FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.packing_lists pl WHERE pl.id = packing_list_id AND public.has_trip_access(auth.uid(), pl.trip_id)));
CREATE POLICY "Users can create packing items in accessible trips" ON public.packing_items FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM public.packing_lists pl WHERE pl.id = packing_list_id AND public.has_trip_access(auth.uid(), pl.trip_id)));
CREATE POLICY "Users can update packing items in accessible trips" ON public.packing_items FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM public.packing_lists pl WHERE pl.id = packing_list_id AND public.has_trip_access(auth.uid(), pl.trip_id)));
CREATE POLICY "Users can delete packing items in accessible trips" ON public.packing_items FOR DELETE 
  USING (EXISTS (SELECT 1 FROM public.packing_lists pl WHERE pl.id = packing_list_id AND public.has_trip_access(auth.uid(), pl.trip_id)));

-- RLS Policies for trip_collaborators
CREATE POLICY "Users can view collaborators of accessible trips" ON public.trip_collaborators FOR SELECT USING (public.has_trip_access(auth.uid(), trip_id));
CREATE POLICY "Trip owners can manage collaborators" ON public.trip_collaborators FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM public.trips t WHERE t.id = trip_id AND t.user_id = auth.uid()));
CREATE POLICY "Trip owners can update collaborators" ON public.trip_collaborators FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM public.trips t WHERE t.id = trip_id AND t.user_id = auth.uid()));
CREATE POLICY "Trip owners can delete collaborators" ON public.trip_collaborators FOR DELETE 
  USING (EXISTS (SELECT 1 FROM public.trips t WHERE t.id = trip_id AND t.user_id = auth.uid()));

-- RLS Policies for trip_comments
CREATE POLICY "Users can view comments on accessible trips" ON public.trip_comments FOR SELECT USING (public.has_trip_access(auth.uid(), trip_id));
CREATE POLICY "Users can create comments on accessible trips" ON public.trip_comments FOR INSERT WITH CHECK (auth.uid() = user_id AND public.has_trip_access(auth.uid(), trip_id));
CREATE POLICY "Users can update their own comments" ON public.trip_comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own comments" ON public.trip_comments FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_trips_user_id ON public.trips(user_id);
CREATE INDEX idx_trips_status ON public.trips(status);
CREATE INDEX idx_destinations_trip_id ON public.destinations(trip_id);
CREATE INDEX idx_activities_destination_id ON public.activities(destination_id);
CREATE INDEX idx_expenses_trip_id ON public.expenses(trip_id);
CREATE INDEX idx_packing_lists_trip_id ON public.packing_lists(trip_id);
CREATE INDEX idx_packing_items_packing_list_id ON public.packing_items(packing_list_id);
CREATE INDEX idx_trip_collaborators_trip_id ON public.trip_collaborators(trip_id);
CREATE INDEX idx_trip_collaborators_user_id ON public.trip_collaborators(user_id);
CREATE INDEX idx_trip_comments_trip_id ON public.trip_comments(trip_id);