
import { Mission, SkillTrack, UserProgress, MissionStatus } from "@/types";
import { select, insert, update } from "@/services/supabaseService";

export async function fetchSkillTracks() {
  const { data, error } = await select<SkillTrack>('skill_tracks')
    .eq("active", true);

  if (error) {
    throw new Error(error.message);
  }

  return data as SkillTrack[];
}

export async function fetchMissionsByTrack(trackId: string) {
  const { data, error } = await select<Mission>('missions')
    .eq("track_id", trackId)
    .eq("published", true);

  if (error) {
    throw new Error(error.message);
  }

  return data as Mission[];
}

export async function fetchUserProgress(userId: string) {
  const { data, error } = await select<UserProgress>('user_progress')
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data as UserProgress[];
}

export async function updateUserProgress(
  userId: string,
  missionId: string,
  status: MissionStatus,
  score: number = 0
) {
  const progressData = {
    user_id: userId,
    mission_id: missionId,
    status,
    score,
    ...(status === "completed" ? { completed_at: new Date().toISOString() } : {}),
  };

  // Check if progress entry exists
  const { data: existingProgress, error: checkError } = await select<UserProgress>('user_progress')
    .eq("user_id", userId)
    .eq("mission_id", missionId)
    .maybeSingle();

  if (checkError) {
    throw new Error(checkError.message);
  }

  let result;

  if (existingProgress) {
    // Update existing progress
    result = await update<UserProgress>('user_progress', progressData)
      .eq("id", existingProgress.id)
      .select();
  } else {
    // Create new progress entry
    result = await insert<UserProgress>('user_progress', [progressData])
      .select();
  }

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data[0] as UserProgress;
}

export async function getMissionProgressStatus(userId: string, missionId: string): Promise<MissionStatus> {
  const { data, error } = await select<UserProgress>('user_progress')
    .eq("user_id", userId)
    .eq("mission_id", missionId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data?.status as MissionStatus || "not_started";
}
