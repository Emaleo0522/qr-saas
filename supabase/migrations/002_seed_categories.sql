-- ============================================
-- Seed: Social Media & Common Categories
-- ============================================

INSERT INTO categories (name, slug, icon, color, platform) VALUES
  ('Instagram', 'instagram', 'instagram', '#E4405F', 'instagram'),
  ('TikTok', 'tiktok', 'music', '#000000', 'tiktok'),
  ('YouTube', 'youtube', 'youtube', '#FF0000', 'youtube'),
  ('Twitter / X', 'twitter', 'twitter', '#1DA1F2', 'twitter'),
  ('Facebook', 'facebook', 'facebook', '#1877F2', 'facebook'),
  ('LinkedIn', 'linkedin', 'linkedin', '#0A66C2', 'linkedin'),
  ('WhatsApp', 'whatsapp', 'message-circle', '#25D366', 'whatsapp'),
  ('Telegram', 'telegram', 'send', '#26A5E4', 'telegram'),
  ('Spotify', 'spotify', 'music', '#1DB954', 'spotify'),
  ('GitHub', 'github', 'github', '#181717', 'github'),
  ('Website', 'website', 'globe', '#7c3aed', NULL),
  ('Email', 'email', 'mail', '#EA4335', NULL),
  ('Phone', 'phone', 'phone', '#34A853', NULL),
  ('WiFi', 'wifi', 'wifi', '#FF9800', NULL),
  ('vCard', 'vcard', 'contact', '#607D8B', NULL),
  ('PDF / Document', 'document', 'file-text', '#F44336', NULL)
ON CONFLICT (slug) DO NOTHING;
