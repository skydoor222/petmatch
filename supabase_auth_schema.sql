-- ユーザープロフィールテーブル (Supabase Auth の users.id に紐づく)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  area TEXT,
  role TEXT DEFAULT 'owner',   -- 'owner' or 'mate'
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ペット情報テーブル
CREATE TABLE pets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  name TEXT,
  species TEXT,   -- 'dog', 'cat', 'small_animal', 'other'
  age INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS (Row Level Security) を有効化
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;

-- ユーザーは自分のプロフィールのみ読み書き可能
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);

-- ペットも自分のものだけ読み書き可能
CREATE POLICY "Users can view own pets" ON pets FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Users can insert own pets" ON pets FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users can update own pets" ON pets FOR UPDATE USING (auth.uid() = owner_id);
