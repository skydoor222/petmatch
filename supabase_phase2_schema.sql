-- Booking Requests (依頼内容を保存するテーブル)
CREATE TABLE booking_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  mate_id UUID REFERENCES mates(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL,
  booking_date DATE NOT NULL,
  hours INTEGER NOT NULL,
  total_price INTEGER NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending', -- pending, accepted, completed, cancelled
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Favorite Mates (お気に入りのMateを保存するテーブル)
CREATE TABLE favorite_mates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  mate_id UUID REFERENCES mates(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, mate_id)
);

-- Enable RLS
ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorite_mates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for booking_requests
-- 飼い主は自分の依頼のみ閲覧可能
CREATE POLICY "Users can view own bookings" ON booking_requests FOR SELECT USING (auth.uid() = owner_id);
-- 飼い主は依頼を作成可能
CREATE POLICY "Users can create own bookings" ON booking_requests FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- RLS Policies for favorite_mates
-- ユーザーは自分のお気に入りのみ閲覧可能
CREATE POLICY "Users can view own favorites" ON favorite_mates FOR SELECT USING (auth.uid() = user_id);
-- ユーザーはお気に入りに追加可能
CREATE POLICY "Users can insert own favorites" ON favorite_mates FOR INSERT WITH CHECK (auth.uid() = user_id);
-- ユーザーはお気に入りから削除可能
CREATE POLICY "Users can delete own favorites" ON favorite_mates FOR DELETE USING (auth.uid() = user_id);
