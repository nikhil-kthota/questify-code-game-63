
import { supabase } from "@/integrations/supabase/client";

// This service provides typed wrapper functions for Supabase operations
// to work around the empty database types issue

// Helper type to define what tables we support
type SupportedTables = 
  | 'profiles'
  | 'skill_tracks' 
  | 'missions'
  | 'questions'
  | 'user_progress'
  | 'badges'
  | 'user_badges'
  | 'learning_content'
  | 'activity_logs';

// Generic helper to make TypeScript happy with our table names
export const supabaseFrom = <T = any>(table: SupportedTables) => {
  // Force type bypass with multiple assertions
  const typed = supabase.from(table as never) as any;
  return typed;
};

// Generic CRUD operations
export const select = <T = any>(table: SupportedTables, columns = '*') => {
  return supabaseFrom<T>(table).select(columns);
};

export const insert = <T = any>(table: SupportedTables, data: any) => {
  return supabaseFrom<T>(table).insert(data);
};

export const update = <T = any>(table: SupportedTables, data: any) => {
  return supabaseFrom<T>(table).update(data);
};

export const remove = (table: SupportedTables) => {
  return supabaseFrom(table).delete();
};
