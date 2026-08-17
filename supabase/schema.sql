-- ============================================================
-- Saree Catalog – Supabase Schema
-- Run this in the Supabase SQL Editor to set up your database.
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

-- 2. Indexes
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_fabric ON products(fabric);
CREATE INDEX IF NOT EXISTS idx_products_occasion ON products(occasion);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);

-- 3. Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read products
CREATE POLICY "Allow public read" ON products
  FOR SELECT USING (true);

-- Allow authenticated users (admins) to insert
CREATE POLICY "Allow authenticated insert" ON products
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users (admins) to update
CREATE POLICY "Allow authenticated update" ON products
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users (admins) to delete
CREATE POLICY "Allow authenticated delete" ON products
  FOR DELETE USING (auth.role() = 'authenticated');

-- 4. Storage Bucket (run in Supabase Dashboard > Storage > Create new bucket)
-- Name: saree-images
-- Public: Yes
-- Allowed MIME types: image/jpeg, image/png, image/webp
