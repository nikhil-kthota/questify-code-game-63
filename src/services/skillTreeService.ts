
import { supabase } from "@/integrations/supabase/client";
import { Mission, SkillTrack, UserProgress, MissionStatus } from "@/types";

export async function fetchSkillTracks() {
  const { data, error } = await supabase
    .from("skill_tracks")
    .select("*")
    .eq("active", true);

  if (error) {
    throw new Error(error.message);
  }

  return data as SkillTrack[];
}

export async function fetchMissionsByTrack(trackId: string) {
  const { data, error } = await supabase
    .from("missions")
    .select("*")
    .eq("track_id", trackId)
    .eq("published", true);

  if (error) {
    throw new Error(error.message);
  }

  return data as Mission[];
}

export async function fetchUserProgress(userId: string) {
  const { data, error } = await supabase
    .from("user_progress")
    .select("*")
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
  const { data: existingProgress, error: checkError } = await supabase
    .from("user_progress")
    .select("id")
    .eq("user_id", userId)
    .eq("mission_id", missionId)
    .maybeSingle();

  if (checkError) {
    throw new Error(checkError.message);
  }

  let result;

  if (existingProgress) {
    // Update existing progress
    result = await supabase
      .from("user_progress")
      .update(progressData)
      .eq("id", existingProgress.id)
      .select();
  } else {
    // Create new progress entry
    result = await supabase
      .from("user_progress")
      .insert([progressData])
      .select();
  }

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data[0] as UserProgress;
}

export async function getMissionProgressStatus(userId: string, missionId: string): Promise<MissionStatus> {
  const { data, error } = await supabase
    .from("user_progress")
    .select("status")
    .eq("user_id", userId)
    .eq("mission_id", missionId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data?.status as MissionStatus || "not_started";
}
