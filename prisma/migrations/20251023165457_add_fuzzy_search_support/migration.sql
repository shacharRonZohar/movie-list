-- Enable pg_trgm extension for fuzzy text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create GIN indexes for trigram similarity search on text fields
-- These indexes enable fast fuzzy matching on title, original_title, overview, and genres

-- Index for title (most common search field)
CREATE INDEX IF NOT EXISTS idx_content_title_trgm ON content USING gin (title gin_trgm_ops);

-- Index for original_title (for international titles)
CREATE INDEX IF NOT EXISTS idx_content_original_title_trgm ON content USING gin (original_title gin_trgm_ops);

-- Index for overview (for searching by plot/description)
CREATE INDEX IF NOT EXISTS idx_content_overview_trgm ON content USING gin (overview gin_trgm_ops);

-- Index for genres (array of strings - using standard GIN for array containment)
CREATE INDEX IF NOT EXISTS idx_content_genres_gin ON content USING gin (genres);

-- Composite index for common filters (type + year)
CREATE INDEX IF NOT EXISTS idx_content_type_year ON content (type, year);

-- Index for tagline (for memorable quotes search)
CREATE INDEX IF NOT EXISTS idx_content_tagline_trgm ON content USING gin (tagline gin_trgm_ops);
