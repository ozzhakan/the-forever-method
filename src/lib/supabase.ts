import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY as string;

// Only create client if credentials are configured
export const supabase =
  SUPABASE_URL && SUPABASE_KEY ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

/* ─── Student ─── */
export async function upsertStudent(email: string, name: string) {
  if (!supabase) return;
  await supabase.from("students").upsert({ email, name }, { onConflict: "email" });
}

/* ─── Progress ─── */
export async function syncProgressToCloud(
  email: string,
  lessonId: string,
  data: {
    video_watched?: boolean;
    link_visited?: boolean;
    task_submitted?: boolean;
    completed?: boolean;
  }
) {
  if (!supabase) return;
  await supabase.from("progress").upsert(
    { student_email: email, lesson_id: lessonId, ...data, updated_at: new Date().toISOString() },
    { onConflict: "student_email,lesson_id" }
  );
}

export async function loadProgressFromCloud(email: string) {
  if (!supabase) return null;
  const { data } = await supabase
    .from("progress")
    .select("*")
    .eq("student_email", email);
  return data;
}

/* ─── Submissions ─── */
export async function submitTask(
  email: string,
  lessonId: string,
  taskType: string,
  content: string
) {
  if (!supabase) return;
  await supabase.from("submissions").insert({
    student_email: email,
    lesson_id: lessonId,
    task_type: taskType,
    content,
  });
}

/* ─── File Upload ─── */
export async function uploadFile(email: string, lessonId: string, file: File) {
  if (!supabase) return null;
  const path = `${email}/${lessonId}/${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("submissions")
    .upload(path, file, { upsert: true });
  if (error) { console.error("Upload error:", error); return null; }
  const { data: urlData } = supabase.storage.from("submissions").getPublicUrl(path);
  return urlData?.publicUrl ?? null;
}
