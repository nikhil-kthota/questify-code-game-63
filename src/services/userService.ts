
import { supabase } from "@/integrations/supabase/client";
import { Profile, Badge, ActivityLog, UserBadge } from "@/types";

export async function fetchUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Profile;
}

export async function updateUserProfile(userId: string, profileData: Partial<Profile>) {
  const { data, error } = await supabase
    .from("profiles")
    .update(profileData)
    .eq("id", userId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0] as Profile;
}

export async function addXpToUser(userId: string, xpAmount: number) {
  // First get current user profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("xp, level, daily_xp")
    .eq("id", userId)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  // Calculate new XP and level
  const currentXp = profile.xp || 0;
  const currentDailyXp = profile.daily_xp || 0;
  const currentLevel = profile.level || 1;

  const newXp = currentXp + xpAmount;
  const newDailyXp = currentDailyXp + xpAmount;

  // Simple level calculation (can be adjusted based on your game design)
  // Level thresholds: 1000, 2000, 4000, 8000, etc. (exponential growth)
  const xpForNextLevel = 1000 * Math.pow(2, currentLevel - 1);
  const newLevel = newXp >= xpForNextLevel ? currentLevel + 1 : currentLevel;

  // Update user profile
  const { data, error } = await supabase
    .from("profiles")
    .update({
      xp: newXp,
      daily_xp: newDailyXp,
      level: newLevel,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  // If level increased, create an activity log
  if (newLevel > currentLevel) {
    await createActivityLog(userId, "reached_level", `Level ${newLevel}`, 0);
  }

  return data[0] as Profile;
}

export async function fetchUserBadges(userId: string) {
  const { data, error } = await supabase
    .from("user_badges")
    .select("*, badge:badges(*)")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data as unknown as UserBadge[];
}

export async function fetchActivityLogs(userId: string, limit = 10) {
  const { data, error } = await supabase
    .from("activity_logs")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  return data as ActivityLog[];
}

export async function createActivityLog(
  userId: string,
  action: string,
  detail: string,
  xpGained: number = 0
) {
  const { error } = await supabase.from("activity_logs").insert([
    {
      user_id: userId,
      action,
      detail,
      xp_gained: xpGained,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }
}

export async function resetDailyXp(userId: string) {
  const { error } = await supabase
    .from("profiles")
    .update({
      daily_xp: 0,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateDailyStreak(userId: string) {
  // Get current user profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("streak_days, last_activity")
    .eq("id", userId)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  const lastActivity = profile.last_activity ? new Date(profile.last_activity) : null;
  const currentDate = new Date();
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);

  let newStreakDays = profile.streak_days || 0;

  // If last activity was yesterday or earlier today, increment streak
  if (
    lastActivity &&
    ((lastActivity.toDateString() === yesterday.toDateString()) ||
      (lastActivity.toDateString() === currentDate.toDateString()))
  ) {
    newStreakDays++;
  } else if (!lastActivity || lastActivity.toDateString() !== currentDate.toDateString()) {
    // If more than a day has passed, reset streak
    newStreakDays = 1;
  }

  // Update streak and last activity
  const { error } = await supabase
    .from("profiles")
    .update({
      streak_days: newStreakDays,
      last_activity: currentDate.toISOString(),
      updated_at: currentDate.toISOString(),
    })
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return newStreakDays;
}

export async function checkAndAwardBadges(userId: string) {
  // This would be more complex in a real app, checking various conditions
  // For now, we'll just check for streak badges
  
  // Get user profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("streak_days, xp")
    .eq("id", userId)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  const streakDays = profile.streak_days || 0;
  const xp = profile.xp || 0;
  
  // Check for eligible badges
  const { data: eligibleBadges, error: badgesError } = await supabase
    .from("badges")
    .select("*")
    .or(`required_xp.lte.${xp},and(required_xp.is.null)`);

  if (badgesError) {
    throw new Error(badgesError.message);
  }

  // Get user's existing badges
  const { data: userBadges, error: userBadgesError } = await supabase
    .from("user_badges")
    .select("badge_id")
    .eq("user_id", userId);

  if (userBadgesError) {
    throw new Error(userBadgesError.message);
  }

  const existingBadgeIds = userBadges.map(ub => ub.badge_id);
  
  // Filter out badges the user already has
  const newBadges = eligibleBadges.filter(badge => !existingBadgeIds.includes(badge.id));
  
  // Award new badges
  for (const badge of newBadges) {
    await supabase.from("user_badges").insert([
      {
        user_id: userId,
        badge_id: badge.id,
        earned_at: new Date().toISOString(),
      }
    ]);

    // Create activity log for the new badge
    await createActivityLog(userId, "earned_badge", badge.name, 0);
  }

  return newBadges as Badge[];
}
