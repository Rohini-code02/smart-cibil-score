-- Run this in the Supabase SQL Editor

-- 1. Create the 'profiles' table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  profession TEXT,
  phone TEXT,
  trust_score INTEGER DEFAULT 500
);

-- Enable RLS for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can view own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert own profile" 
ON profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);

-- 2. Create the 'credit_data' table
CREATE TABLE IF NOT EXISTS credit_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  data_type TEXT NOT NULL,
  provider_name TEXT,
  amount NUMERIC,
  status TEXT DEFAULT 'connected',
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for credit_data
ALTER TABLE credit_data ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own credit data
CREATE POLICY "Users can view own credit data" 
ON credit_data FOR SELECT 
USING (auth.uid() = user_id);

-- Allow users to insert their own credit data
CREATE POLICY "Users can insert own credit data" 
ON credit_data FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own credit data
CREATE POLICY "Users can update own credit data" 
ON credit_data FOR UPDATE 
USING (auth.uid() = user_id);
