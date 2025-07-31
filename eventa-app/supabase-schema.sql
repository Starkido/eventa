-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('attendee', 'organizer', 'admin');
CREATE TYPE user_status AS ENUM ('active', 'suspended', 'pending');
CREATE TYPE application_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- Create users table (extends auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role user_role DEFAULT 'attendee',
    profile_pic TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    status user_status DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create organizer applications table
CREATE TABLE public.organizer_applications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    org_name VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    gov_id_url TEXT,
    status application_status DEFAULT 'pending',
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE public.events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organizer_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    map_lat DECIMAL(10, 8),
    map_long DECIMAL(11, 8),
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    banner_url TEXT,
    tickets_available INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tickets table
CREATE TABLE public.tickets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0,
    total_quantity INTEGER NOT NULL,
    sold_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create purchases table
CREATE TABLE public.purchases (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    ticket_id UUID REFERENCES public.tickets(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    payment_status payment_status DEFAULT 'pending',
    qr_code VARCHAR(255) UNIQUE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create checkins table
CREATE TABLE public.checkins (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    purchase_id UUID REFERENCES public.purchases(id) ON DELETE CASCADE,
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    checked_in_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics table
CREATE TABLE public.analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    views INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    checkins INTEGER DEFAULT 0,
    date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_events_organizer_id ON public.events(organizer_id);
CREATE INDEX idx_events_category ON public.events(category);
CREATE INDEX idx_events_start_date ON public.events(start_date);
CREATE INDEX idx_events_published ON public.events(is_published);
CREATE INDEX idx_tickets_event_id ON public.tickets(event_id);
CREATE INDEX idx_purchases_user_id ON public.purchases(user_id);
CREATE INDEX idx_purchases_ticket_id ON public.purchases(ticket_id);
CREATE INDEX idx_purchases_qr_code ON public.purchases(qr_code);
CREATE INDEX idx_checkins_purchase_id ON public.checkins(purchase_id);
CREATE INDEX idx_checkins_event_id ON public.checkins(event_id);
CREATE INDEX idx_analytics_event_id ON public.analytics(event_id);
CREATE INDEX idx_analytics_date ON public.analytics(date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
    INSERT INTO public.users (id, email, name)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', 'User'));
    RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view all profiles" ON public.users
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for organizer_applications table
CREATE POLICY "Users can view own applications" ON public.organizer_applications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own applications" ON public.organizer_applications
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all applications" ON public.organizer_applications
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- RLS Policies for events table
CREATE POLICY "Anyone can view published events" ON public.events
    FOR SELECT USING (is_published = true);

CREATE POLICY "Organizers can view own events" ON public.events
    FOR SELECT USING (auth.uid() = organizer_id);

CREATE POLICY "Organizers can create events" ON public.events
    FOR INSERT WITH CHECK (
        auth.uid() = organizer_id AND
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE users.id = auth.uid() AND users.role IN ('organizer', 'admin')
        )
    );

CREATE POLICY "Organizers can update own events" ON public.events
    FOR UPDATE USING (auth.uid() = organizer_id);

CREATE POLICY "Organizers can delete own events" ON public.events
    FOR DELETE USING (auth.uid() = organizer_id);

-- RLS Policies for tickets table
CREATE POLICY "Anyone can view tickets for published events" ON public.tickets
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.events 
            WHERE events.id = tickets.event_id AND events.is_published = true
        )
    );

CREATE POLICY "Organizers can manage tickets for own events" ON public.tickets
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.events 
            WHERE events.id = tickets.event_id AND events.organizer_id = auth.uid()
        )
    );

-- RLS Policies for purchases table
CREATE POLICY "Users can view own purchases" ON public.purchases
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create purchases" ON public.purchases
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Organizers can view purchases for own events" ON public.purchases
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.tickets t
            JOIN public.events e ON e.id = t.event_id
            WHERE t.id = purchases.ticket_id AND e.organizer_id = auth.uid()
        )
    );

-- RLS Policies for checkins table
CREATE POLICY "Users can view own checkins" ON public.checkins
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.purchases 
            WHERE purchases.id = checkins.purchase_id AND purchases.user_id = auth.uid()
        )
    );

CREATE POLICY "Organizers can manage checkins for own events" ON public.checkins
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.events 
            WHERE events.id = checkins.event_id AND events.organizer_id = auth.uid()
        )
    );

-- RLS Policies for analytics table
CREATE POLICY "Organizers can view analytics for own events" ON public.analytics
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.events 
            WHERE events.id = analytics.event_id AND events.organizer_id = auth.uid()
        )
    );

CREATE POLICY "System can insert analytics" ON public.analytics
    FOR INSERT WITH CHECK (true);

-- Insert sample data
INSERT INTO public.users (id, name, email, role) VALUES
    ('00000000-0000-0000-0000-000000000001', 'Admin User', 'admin@eventa.com', 'admin'),
    ('00000000-0000-0000-0000-000000000002', 'John Organizer', 'organizer@eventa.com', 'organizer'),
    ('00000000-0000-0000-0000-000000000003', 'Jane Attendee', 'attendee@eventa.com', 'attendee');

-- Insert sample events
INSERT INTO public.events (id, organizer_id, title, description, category, location, start_date, end_date, is_published) VALUES
    (uuid_generate_v4(), '00000000-0000-0000-0000-000000000002', 'Summer Music Festival', 'Join us for an amazing summer music festival with top artists from around the world.', 'music', 'Central Park, New York', '2024-07-15 18:00:00+00', '2024-07-15 23:00:00+00', true),
    (uuid_generate_v4(), '00000000-0000-0000-0000-000000000002', 'Tech Conference 2024', 'The biggest tech conference of the year featuring industry leaders and innovators.', 'technology', 'Convention Center, San Francisco', '2024-08-20 09:00:00+00', '2024-08-22 17:00:00+00', true),
    (uuid_generate_v4(), '00000000-0000-0000-0000-000000000002', 'Food & Wine Expo', 'Discover the best culinary experiences from renowned chefs and wine makers.', 'food', 'Exhibition Hall, Los Angeles', '2024-09-10 12:00:00+00', '2024-09-10 20:00:00+00', true);

-- Insert sample tickets for the events
INSERT INTO public.tickets (event_id, name, price, total_quantity) 
SELECT 
    e.id,
    'General Admission',
    CASE 
        WHEN e.category = 'music' THEN 75.00
        WHEN e.category = 'technology' THEN 299.00
        WHEN e.category = 'food' THEN 45.00
        ELSE 50.00
    END,
    CASE 
        WHEN e.category = 'music' THEN 1000
        WHEN e.category = 'technology' THEN 500
        WHEN e.category = 'food' THEN 300
        ELSE 200
    END
FROM public.events e;

-- Create functions for common operations
CREATE OR REPLACE FUNCTION get_event_stats(event_uuid UUID)
RETURNS TABLE(
    total_tickets_sold INTEGER,
    total_revenue DECIMAL,
    total_checkins INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COALESCE(SUM(p.quantity), 0)::INTEGER as total_tickets_sold,
        COALESCE(SUM(p.total_amount), 0) as total_revenue,
        COALESCE(COUNT(c.id), 0)::INTEGER as total_checkins
    FROM public.purchases p
    JOIN public.tickets t ON t.id = p.ticket_id
    LEFT JOIN public.checkins c ON c.purchase_id = p.id
    WHERE t.event_id = event_uuid AND p.payment_status = 'completed';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;