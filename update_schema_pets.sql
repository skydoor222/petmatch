-- Create pets table
CREATE TABLE IF NOT EXISTS pets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  breed TEXT NOT NULL,
  category TEXT NOT NULL, -- 'dog', 'cat', 'rabbit', etc.
  age TEXT NOT NULL,
  gender TEXT NOT NULL,
  image_url TEXT,
  description TEXT,
  area TEXT NOT NULL,
  status TEXT DEFAULT 'looking_for_mate', -- 'looking_for_mate', 'booked', 'none'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read access for pets" ON pets FOR SELECT USING (true);

-- Allow users to manage their own pets
CREATE POLICY "Users can insert their own pets" ON pets FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users can update their own pets" ON pets FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Users can delete their own pets" ON pets FOR DELETE USING (auth.uid() = owner_id);
