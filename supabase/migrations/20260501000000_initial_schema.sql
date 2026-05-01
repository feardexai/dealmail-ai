-- Initial Schema for DealMail AI

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT UNIQUE NOT NULL,
    stripe_customer_id TEXT,
    subscription_status TEXT DEFAULT 'trialing' CHECK (subscription_status IN ('trialing', 'active', 'past_due', 'canceled')),
    trial_ends_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + interval '7 days'),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Emails table
CREATE TABLE IF NOT EXISTS public.emails (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    property_address TEXT,
    price TEXT,
    situation TEXT,
    email_type TEXT NOT NULL,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent')),
    tracking_id UUID UNIQUE DEFAULT gen_random_uuid(),
    open_count INTEGER DEFAULT 0,
    last_opened_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on emails
ALTER TABLE public.emails ENABLE ROW LEVEL SECURITY;

-- Tracking Logs table
CREATE TABLE IF NOT EXISTS public.tracking_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email_id UUID NOT NULL REFERENCES public.emails(id) ON DELETE CASCADE,
    opened_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    ip_address TEXT,
    user_agent TEXT
);

-- Enable RLS on tracking_logs
ALTER TABLE public.tracking_logs ENABLE ROW LEVEL SECURITY;

-- Follow-up Suggestions table
CREATE TABLE IF NOT EXISTS public.follow_up_suggestions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_email_id UUID NOT NULL REFERENCES public.emails(id) ON DELETE CASCADE,
    suggested_body TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'dismissed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on follow_up_suggestions
ALTER TABLE public.follow_up_suggestions ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies (Simplified for initialization)
-- Profiles: Users can only see/edit their own profile
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Emails: Users can only see/edit their own emails
CREATE POLICY "Users can view own emails" ON public.emails FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own emails" ON public.emails FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own emails" ON public.emails FOR UPDATE USING (auth.uid() = user_id);

-- Tracking Logs: Only system or authenticated users can view logs for their emails
CREATE POLICY "Users can view logs for own emails" ON public.tracking_logs FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.emails WHERE emails.id = tracking_logs.email_id AND emails.user_id = auth.uid()));

-- Follow-up Suggestions: Users can only see/edit suggestions for their emails
CREATE POLICY "Users can view suggestions for own emails" ON public.follow_up_suggestions FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.emails WHERE emails.id = follow_up_suggestions.parent_email_id AND emails.user_id = auth.uid()));
