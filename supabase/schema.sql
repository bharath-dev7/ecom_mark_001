-- ============================================================
-- ZEYANA Saree Boutique – Supabase Database Schema
-- Run this in your Supabase SQL Editor (https://app.supabase.com)
-- ============================================================

-- 1. Products Table
CREATE TABLE IF NOT EXISTS products (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  price       NUMERIC(10,2) NOT NULL,
  mrp         NUMERIC(10,2),
  fabric      TEXT NOT NULL DEFAULT 'Silk',
  color       TEXT NOT NULL DEFAULT 'Red',
  occasion    TEXT NOT NULL DEFAULT 'Wedding',
  region      TEXT,
  description TEXT,
  images      TEXT[] DEFAULT '{}',
  in_stock    BOOLEAN DEFAULT TRUE,
  featured    BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Orders Table (For tracking WhatsApp & Boutique orders)
CREATE TABLE IF NOT EXISTS orders (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT,
  phone         TEXT,
  total_amount  NUMERIC(10,2) NOT NULL,
  items         JSONB NOT NULL DEFAULT '[]'::jsonb,
  status        TEXT NOT NULL DEFAULT 'Pending',
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Indexes for Speed
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_fabric ON products(fabric);
CREATE INDEX IF NOT EXISTS idx_products_occasion ON products(occasion);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Products Policies
CREATE POLICY "Allow public read products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert products" ON products
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update products" ON products
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete products" ON products
  FOR DELETE USING (auth.role() = 'authenticated');

-- Orders Policies
CREATE POLICY "Allow public insert orders" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read orders" ON orders
  FOR SELECT USING (auth.role() = 'authenticated');

-- 5. Default Sample Seed Data
INSERT INTO products (name, slug, price, mrp, fabric, color, occasion, region, description, images, featured)
VALUES
('Royal Banarasi Silk Saree', 'royal-banarasi-silk-saree', 3499.00, 5999.00, 'Pure Silk', 'Red & Gold', 'Wedding & Festive', 'Varanasi', 'Opulent Royal Banarasi silk saree woven with golden zari brocade motifs across rich crimson red silk.', ARRAY['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'], true),
('Mehendi Green Kanjivaram Saree', 'mehendi-green-kanjivaram-saree', 4299.00, 6999.00, 'Kanjivaram Silk', 'Mehendi Green', 'Wedding', 'Kanchipuram', 'Authentic Kanchipuram silk saree in mehendi green featuring contrasting crimson pallu and heavy gold thread weaving.', ARRAY['https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'], true),
('Peach Gold Tissue Saree', 'peach-gold-tissue-saree', 2699.00, 4499.00, 'Tissue Silk', 'Peach Gold', 'Festive', 'Chanderi', 'Luminous peach gold tissue silk saree with shimmering golden sheen and delicate hand-carved golden pallu flourishes.', ARRAY['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'], true)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- 6. Inquiries Table (Contact Form Persistence)
-- ============================================================
CREATE TABLE IF NOT EXISTS inquiries (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Allow public to submit contact inquiries
CREATE POLICY "Allow public insert inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);

-- Only authenticated admin can read inquiries
CREATE POLICY "Allow authenticated read inquiries" ON inquiries
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS idx_inquiries_created ON inquiries(created_at DESC);

-- ============================================================
-- 7. Extend Orders Table (Add delivery address fields if missing)
-- ============================================================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'city') THEN
    ALTER TABLE orders ADD COLUMN city TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'pincode') THEN
    ALTER TABLE orders ADD COLUMN pincode TEXT;
  END IF;
END
$$;

