-- Add Cloudflare Workers AI columns
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS cloudflare_api_key TEXT CHECK (char_length(cloudflare_api_key) <= 1000);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS cloudflare_account_id TEXT CHECK (char_length(cloudflare_account_id) <= 1000);

-- Add Tavily API column
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS tavily_api_key TEXT CHECK (char_length(tavily_api_key) <= 1000);

-- Add Nebius API column
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS nebius_api_key TEXT CHECK (char_length(nebius_api_key) <= 1000);
