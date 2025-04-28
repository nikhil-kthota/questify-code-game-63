
// Define enums
export type UserRole = 'user' | 'admin';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

// Define type for user profile
export interface Profile {
  id: string;
  username: string;
  avatar_url?: string | null;
  level: number;
  xp: number;
  daily_xp: number;
  daily_goal: number;
  streak_days: number;
  last_activity?: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

// Define types for Skill Tracks
export interface SkillTrack {
  id: string;
  name: string;
  description?: string | null;
  icon?: string | null;
  created_at: string;
  updated_at: string;
  active: boolean;
}

// Define types for Missions
export interface Mission {
  id: string;
  name: string;
  description?: string | null;
  track_id: string;
  difficulty: DifficultyLevel;
  xp_reward: number;
  estimated_time?: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
  skill_tracks?: { name: string }; // For joined queries
}

// Define types for Questions
export interface Question {
  id: string;
  mission_id: string;
  question: string;
  options?: { id: string; text: string }[];
  correct_answer: string;
  explanation?: string | null;
  created_at: string;
  updated_at: string;
}

// Define types for User Progress
export interface UserProgress {
  id: string;
  user_id: string;
  mission_id: string;
  status: MissionStatus;
  score: number;
  completed_at?: string | null;
  created_at: string;
  updated_at: string;
}

// Define types for Badges
export interface Badge {
  id: string;
  name: string;
  description?: string | null;
  icon: string;
  required_xp?: number | null;
  required_mission_id?: string | null;
  created_at: string;
}

// Define types for User Badges
export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  badge: Badge;
}

// Define types for Learning Content
export interface LearningContent {
  id: string;
  title: string;
  description?: string | null;
  content_type: string;
  url?: string | null;
  track_id?: string | null;
  created_by?: string | null;
  created_at: string;
  updated_at: string;
  skill_tracks?: { name: string }; // For joined queries
}

// Define types for Activity Logs
export interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  detail?: string | null;
  xp_gained: number;
  created_at: string;
}

// Define a type for mission status
export type MissionStatus = 'not_started' | 'in_progress' | 'completed';
