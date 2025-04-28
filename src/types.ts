
import { Database } from './integrations/supabase/types';

// Define type for user profile
export type Profile = Database['public']['Tables']['profiles']['Row'];

// Define types for Skill Tracks
export type SkillTrack = Database['public']['Tables']['skill_tracks']['Row'];

// Define types for Missions
export type Mission = Database['public']['Tables']['missions']['Row'];

// Define types for Questions
export type Question = Database['public']['Tables']['questions']['Row'] & {
  options: { id: string; text: string }[];
};

// Define types for User Progress
export type UserProgress = Database['public']['Tables']['user_progress']['Row'];

// Define types for Badges
export type Badge = Database['public']['Tables']['badges']['Row'];

// Define types for User Badges
export type UserBadge = Database['public']['Tables']['user_badges']['Row'] & {
  badge: Badge;
};

// Define types for Learning Content
export type LearningContent = Database['public']['Tables']['learning_content']['Row'];

// Define types for Activity Logs
export type ActivityLog = Database['public']['Tables']['activity_logs']['Row'];

// Define enums
export type UserRole = Database['public']['Enums']['user_role'];
export type DifficultyLevel = Database['public']['Enums']['difficulty_level'];

// Define a type for mission status
export type MissionStatus = 'not_started' | 'in_progress' | 'completed';
