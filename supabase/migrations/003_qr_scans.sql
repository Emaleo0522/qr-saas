-- ============================================
-- QR-SaaS: Scan Tracking & Analytics
-- Table: qr_scans
-- ============================================

-- Enable pgcrypto for SHA-256 hashing
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- QR_SCANS — individual scan events
-- ============================================
CREATE TABLE qr_scans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  qr_code_id UUID NOT NULL REFERENCES qr_codes(id) ON DELETE CASCADE,
  scanned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip_hash TEXT,           -- SHA-256 of IP, never raw IP
  user_agent TEXT,
  referer TEXT,
  country TEXT,           -- Future: from Vercel x-vercel-ip-country header
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for analytics queries
CREATE INDEX idx_qr_scans_qr_code_id ON qr_scans(qr_code_id);
CREATE INDEX idx_qr_scans_scanned_at ON qr_scans(scanned_at);
CREATE INDEX idx_qr_scans_qr_code_date ON qr_scans(qr_code_id, scanned_at DESC);

-- ============================================
-- RLS Policies
-- ============================================
ALTER TABLE qr_scans ENABLE ROW LEVEL SECURITY;

-- INSERT: Only via service_role (server-side insert from API route)
-- No INSERT policy for regular users — inserts happen server-side
-- using the service role key

-- SELECT: Owner of the QR code can read its scans
CREATE POLICY "QR owner can view scans"
  ON qr_scans FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM qr_codes
      WHERE qr_codes.id = qr_scans.qr_code_id
      AND qr_codes.user_id = auth.uid()
    )
  );

-- ============================================
-- Updated increment function to also insert scan record
-- ============================================
CREATE OR REPLACE FUNCTION record_scan(
  p_short_code TEXT,
  p_ip_hash TEXT DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL,
  p_referer TEXT DEFAULT NULL,
  p_country TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_qr_id UUID;
  v_destination TEXT;
BEGIN
  -- Get QR code ID and increment scan count atomically
  UPDATE qr_codes
  SET scan_count = scan_count + 1
  WHERE short_code = p_short_code AND is_active = true
  RETURNING id INTO v_qr_id;

  IF v_qr_id IS NULL THEN
    RETURN NULL;
  END IF;

  -- Insert scan record
  INSERT INTO qr_scans (qr_code_id, ip_hash, user_agent, referer, country)
  VALUES (v_qr_id, p_ip_hash, p_user_agent, p_referer, p_country);

  RETURN v_qr_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
