import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY as string;

// Only create client if credentials are configured
export const supabase =
  SUPABASE_URL && SUPABASE_KEY ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

/* ─── Leads (free PDF email capture) ───
   Persists every email that grabs the free 60-Day ADHD Meal Plan so we
   can reach those people later (the YouTube → free-PDF → nurture funnel).
   Best-effort by design: the caller NEVER blocks PDF delivery on this —
   if the write fails (e.g. table not yet created) the visitor still gets
   their PDF and we just log it.

   One-time Supabase setup (run in the SQL editor):
     create table if not exists leads (
       email text primary key,
       source text,
       created_at timestamptz default now()
     );
     alter table leads enable row level security;
     create policy "anon can insert leads" on leads
       for insert to anon with check (true);
*/
export async function captureLead(
  email: string,
  source = "adhd-meal-plan"
): Promise<{ ok: boolean; reason?: string }> {
  if (!supabase) return { ok: false, reason: "supabase-not-configured" };
  try {
    // insert, ignore duplicates: ON CONFLICT DO NOTHING. A repeat email
    // no-ops instead of attempting an UPDATE (which the anon INSERT-only
    // policy would reject). Lead capture only needs the first record.
    const { error } = await supabase
      .from("leads")
      .upsert(
        { email: email.trim().toLowerCase(), source, created_at: new Date().toISOString() },
        { onConflict: "email", ignoreDuplicates: true }
      );
    if (error) {
      console.warn("captureLead failed:", error.message);
      return { ok: false, reason: error.message };
    }
    return { ok: true };
  } catch (err) {
    console.warn("captureLead threw:", err);
    return { ok: false, reason: String(err) };
  }
}

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
