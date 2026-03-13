-- Tables for PetMatch App

-- 1. Mates table
CREATE TABLE mates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  emoji TEXT NOT NULL,
  image_url TEXT,
  bg_gradient TEXT NOT NULL,
  area TEXT NOT NULL,
  city TEXT NOT NULL,
  bio TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  available_dates INTEGER[] DEFAULT '{}',
  repeat_count INTEGER DEFAULT 0,
  is_new BOOLEAN DEFAULT false,
  trust_score JSONB DEFAULT '{"score": 0, "completedCount": 0, "repeatRate": 0, "avgRating": 0, "activeMonths": 0}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Services table (linked to mates)
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mate_id UUID REFERENCES mates(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'walk', 'home_care', etc.
  price_per_hour INTEGER NOT NULL
);

-- 3. Reviews table (linked to mates)
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mate_id UUID REFERENCES mates(id) ON DELETE CASCADE,
  owner_name TEXT NOT NULL,
  owner_emoji TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  date TEXT NOT NULL,
  comment TEXT NOT NULL,
  repeat_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Timeline table (for relationship history)
CREATE TABLE timeline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  emoji TEXT NOT NULL,
  text TEXT NOT NULL,
  date TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Optional but recommended)
ALTER TABLE mates ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline ENABLE ROW LEVEL SECURITY;

-- Allow public read access for now
CREATE POLICY "Public read access for mates" ON mates FOR SELECT USING (true);
CREATE POLICY "Public read access for services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read access for reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Public read access for timeline" ON timeline FOR SELECT USING (true);

-- Allow public insert access for seeding
CREATE POLICY "Public insert access for mates" ON mates FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access for services" ON services FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access for reviews" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access for timeline" ON timeline FOR INSERT WITH CHECK (true);
