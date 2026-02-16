-- Add language column to users table
-- Run this in Vercel Postgres Dashboard → Data → Query Editor

ALTER TABLE users ADD COLUMN IF NOT EXISTS language TEXT NOT NULL DEFAULT 'en';
