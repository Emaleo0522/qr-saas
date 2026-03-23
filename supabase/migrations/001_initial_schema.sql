-- ============================================
-- QR-SaaS Initial Schema
-- Tables: profiles, categories, qr_codes
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'business')),
  qr_count INTEGER NOT NULL DEFAULT 0,
  max_qrs INTEGER NOT NULL DEFAULT 10,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================
-- CATEGORIES
-- ============================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT NOT NULL DEFAULT 'link',
  color TEXT NOT NULL DEFAULT '#7c3aed',
  platform TEXT
);

-- Categories are public read
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read categories"
  ON categories FOR SELECT
  USING (true);

-- ============================================
-- QR_CODES
-- ============================================
CREATE TABLE qr_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  destination_url TEXT NOT NULL,
  short_code TEXT UNIQUE NOT NULL,
  qr_config JSONB NOT NULL DEFAULT '{}',
  social_platform TEXT,
  category UUID REFERENCES categories(id),
  logo_url TEXT,
  scan_count INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_qr_codes_user_id ON qr_codes(user_id);
CREATE UNIQUE INDEX idx_qr_codes_short_code ON qr_codes(short_code);
CREATE INDEX idx_qr_codes_is_active ON qr_codes(is_active) WHERE is_active = true;

-- RLS
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own QR codes"
  ON qr_codes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own QR codes"
  ON qr_codes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own QR codes"
  ON qr_codes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own QR codes"
  ON qr_codes FOR DELETE
  USING (auth.uid() = user_id);

-- Public read for active QR redirects (no auth needed)
CREATE POLICY "Anyone can read active QR for redirect"
  ON qr_codes FOR SELECT
  USING (is_active = true)
  -- This allows the redirect endpoint to lookup by short_code
  -- without authentication, but only active QR codes
;

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER qr_codes_updated_at
  BEFORE UPDATE ON qr_codes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================
-- SCAN TRACKING (atomic increment)
-- ============================================
CREATE OR REPLACE FUNCTION increment_scan_count(code TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE qr_codes
  SET scan_count = scan_count + 1
  WHERE short_code = code AND is_active = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
