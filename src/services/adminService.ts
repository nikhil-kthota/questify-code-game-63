
import { supabase } from "@/integrations/supabase/client";
import { SkillTrack, Mission, Question, Profile } from "@/types";

// Skill Tracks Management
export async function fetchAllSkillTracks() {
  const { data, error } = await supabase
    .from("skill_tracks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as SkillTrack[];
}

export async function createSkillTrack(trackData: Partial<SkillTrack>) {
  const { data, error } = await supabase
    .from("skill_tracks")
    .insert([trackData])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0] as SkillTrack;
}

export async function updateSkillTrack(trackId: string, trackData: Partial<SkillTrack>) {
  const { data, error } = await supabase
    .from("skill_tracks")
    .update(trackData)
    .eq("id", trackId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0] as SkillTrack;
}

export async function deleteSkillTrack(trackId: string) {
  const { error } = await supabase
    .from("skill_tracks")
    .delete()
    .eq("id", trackId);

  if (error) {
    throw new Error(error.message);
  }
}

// Missions Management
export async function fetchAllMissions() {
  const { data, error } = await supabase
    .from("missions")
    .select("*, skill_tracks(name)")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createMission(missionData: Partial<Mission>) {
  const { data, error } = await supabase
    .from("missions")
    .insert([missionData])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0] as Mission;
}

export async function updateMission(missionId: string, missionData: Partial<Mission>) {
  const { data, error } = await supabase
    .from("missions")
    .update(missionData)
    .eq("id", missionId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0] as Mission;
}

export async function deleteMission(missionId: string) {
  const { error } = await supabase
    .from("missions")
    .delete()
    .eq("id", missionId);

  if (error) {
    throw new Error(error.message);
  }
}

// Questions Management
export async function fetchQuestionsByMission(missionId: string) {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("mission_id", missionId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data as Question[];
}

export async function createQuestion(questionData: Partial<Question>) {
  const { data, error } = await supabase
    .from("questions")
    .insert([questionData])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0] as Question;
}

export async function updateQuestion(questionId: string, questionData: Partial<Question>) {
  const { data, error } = await supabase
    .from("questions")
    .update(questionData)
    .eq("id", questionId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0] as Question;
}

export async function deleteQuestion(questionId: string) {
  const { error } = await supabase
    .from("questions")
    .delete()
    .eq("id", questionId);

  if (error) {
    throw new Error(error.message);
  }
}

// User Management
export async function fetchAllUsers() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as Profile[];
}

export async function updateUserRole(userId: string, role: 'user' | 'admin') {
  const { data, error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("id", userId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0] as Profile;
}

// Analytics and Reports
export async function getUserStats() {
  // Count total users
  const { count: userCount, error: userError } = await supabase
    .from("profiles")
    .select("*", { count: 'exact', head: true });

  if (userError) {
    throw new Error(userError.message);
  }

  // Count active users (logged in within last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { count: activeUserCount, error: activeUserError } = await supabase
    .from("profiles")
    .select("*", { count: 'exact', head: true })
    .gt("last_activity", sevenDaysAgo.toISOString());

  if (activeUserError) {
    throw new Error(activeUserError.message);
  }

  // Count completed missions
  const { count: completedMissionsCount, error: missionsError } = await supabase
    .from("user_progress")
    .select("*", { count: 'exact', head: true })
    .eq("status", "completed");

  if (missionsError) {
    throw new Error(missionsError.message);
  }

  return {
    totalUsers: userCount,
    activeUsers: activeUserCount,
    completedMissions: completedMissionsCount,
  };
}

export async function getMissionCompletionStats() {
  // Get a list of all missions with completion counts
  const { data, error } = await supabase
    .from("missions")
    .select("id, name, xp_reward, user_progress(status)");

  if (error) {
    throw new Error(error.message);
  }

  // Process data to calculate completion stats
  return data.map((mission: any) => {
    const progressEntries = mission.user_progress || [];
    const completedCount = progressEntries.filter((p: any) => p.status === "completed").length;
    const inProgressCount = progressEntries.filter((p: any) => p.status === "in_progress").length;
    const notStartedCount = progressEntries.filter((p: any) => p.status === "not_started").length;
    
    return {
      id: mission.id,
      name: mission.name,
      xpReward: mission.xp_reward,
      completedCount,
      inProgressCount,
      notStartedCount,
      totalCount: completedCount + inProgressCount + notStartedCount,
    };
  });
}

// File Upload Helper
export async function uploadFile(file: File, bucket: string = 'questify-assets', path: string = '') {
  const fileExt = file.name.split('.').pop();
  const filePath = `${path ? path + '/' : ''}${Date.now()}.${fileExt}`;
  
  const { data, error } = await supabase
    .storage
    .from(bucket)
    .upload(filePath, file);

  if (error) {
    throw new Error(error.message);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase
    .storage
    .from(bucket)
    .getPublicUrl(filePath);

  return publicUrl;
}

// Learning Content Management is already handled in the component
