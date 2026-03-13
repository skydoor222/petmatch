-- Update script to add image_url to mates table
ALTER TABLE mates ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Update existing mates if needed (though seeding will handle this)
-- This script is primarily to ensure the schema is ready for the new data.
