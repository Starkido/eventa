import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = 'https://zhvhfucogfojwaveqgdr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpodmhmdWNvZ2ZvandhdmVxZ2RyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5ODk1MTcsImV4cCI6MjA2OTU2NTUxN30.sgoeFZmj-aR9ARjpRJ3Wh4L_ImI4eh-CkUs1kBygdrg';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});