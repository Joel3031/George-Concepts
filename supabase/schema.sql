-- ========================================================
-- GEORGE CONCEPTS DESIGN STUDIO - DATABASE SCHEMA
-- Execute this SQL in your Supabase SQL Editor to provision tables
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Interior', 'Turnkey', 'Renovation', 'Planning')),
    location TEXT NOT NULL,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    year TEXT,
    client_name TEXT,
    area TEXT,
    services_involved JSONB DEFAULT '[]'::jsonb,
    before_image TEXT,
    after_image TEXT,
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. PROJECT IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.project_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. GALLERY IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    image_url TEXT NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    sort_order INT DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. BEFORE & AFTER TABLE
CREATE TABLE IF NOT EXISTS public.before_after (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    category TEXT,
    before_image TEXT NOT NULL,
    after_image TEXT NOT NULL,
    description TEXT,
    published BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name TEXT NOT NULL,
    location TEXT NOT NULL,
    project_type TEXT NOT NULL,
    rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    testimonial TEXT NOT NULL,
    image_url TEXT,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. CONTACT SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    project_type TEXT NOT NULL,
    location TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'contacted', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.before_after ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (published = true);
CREATE POLICY "Public Read Project Images" ON public.project_images FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery" ON public.gallery_images FOR SELECT USING (published = true);
CREATE POLICY "Public Read Before After" ON public.before_after FOR SELECT USING (published = true);
CREATE POLICY "Public Read Testimonials" ON public.testimonials FOR SELECT USING (published = true);
CREATE POLICY "Public Insert Contact Submissions" ON public.contact_submissions FOR INSERT WITH CHECK (true);

-- ADMIN ALL ACCESS POLICIES (AUTHENTICATED USERS)
CREATE POLICY "Admin All Projects" ON public.projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Project Images" ON public.project_images FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Gallery" ON public.gallery_images FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Before After" ON public.before_after FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Testimonials" ON public.testimonials FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Contact Submissions" ON public.contact_submissions FOR ALL TO authenticated USING (true);

-- CREATE STORAGE BUCKETS
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true) ON CONFLICT DO NOTHING;

-- STORAGE POLICIES
CREATE POLICY "Public Storage Read" ON storage.objects FOR SELECT USING (bucket_id IN ('portfolio', 'gallery'));
CREATE POLICY "Admin Storage Insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id IN ('portfolio', 'gallery'));
CREATE POLICY "Admin Storage Delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id IN ('portfolio', 'gallery'));
