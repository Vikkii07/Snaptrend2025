'use client';

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { type SupabaseClient } from '@supabase/supabase-js';
import { type Database } from '@/types/supabase';

export const createClient = (): SupabaseClient<Database> =>
  createBrowserSupabaseClient<Database>();
