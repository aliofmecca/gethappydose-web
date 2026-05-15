import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// Server-side admin route for the feedback feature.
// Uses the service role key — bypasses RLS, so this MUST stay server-side only.
// Mirrors the actions in binate's /api/admin/feedback, minus the in-app
// notifications fan-out (deferred for v1, see SUMMARY).

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function fail(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

type Action =
  | "list"
  | "update_status"
  | "update_priority"
  | "add_comment"
  | "delete_comment"
  | "delete_feedback";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { password } = body as { password?: string };

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return unauthorized();
  }

  const action = (body.action ?? "list") as Action;
  const supabase = getSupabase();

  // ---------------------------------------------------------------
  // update_status: change a feedback row's status
  // ---------------------------------------------------------------
  if (action === "update_status") {
    const { feedbackId, status } = body as { feedbackId?: string; status?: string };
    if (!feedbackId || !status) return fail("feedbackId and status are required", 400);

    const { error } = await supabase
      .from("feedback")
      .update({ status })
      .eq("id", feedbackId);

    if (error) return fail(error.message);
    return NextResponse.json({ success: true });
  }

  // ---------------------------------------------------------------
  // update_priority: change a feedback row's priority
  // ---------------------------------------------------------------
  if (action === "update_priority") {
    const { feedbackId, priority } = body as { feedbackId?: string; priority?: string };
    if (!feedbackId || !priority) return fail("feedbackId and priority are required", 400);

    const { error } = await supabase
      .from("feedback")
      .update({ priority })
      .eq("id", feedbackId);

    if (error) return fail(error.message);
    return NextResponse.json({ success: true });
  }

  // ---------------------------------------------------------------
  // add_comment: insert an admin-reply comment in the thread
  // FK'd to the HappyDose admin auth user (ADMIN_USER_ID env var)
  // ---------------------------------------------------------------
  if (action === "add_comment") {
    const adminUserId = process.env.ADMIN_USER_ID;
    if (!adminUserId) {
      return fail(
        "ADMIN_USER_ID env var is not set. Create an admin user in Supabase and set its uuid as ADMIN_USER_ID in your env.",
        500
      );
    }

    const { feedbackId, comment } = body as { feedbackId?: string; comment?: string };
    if (!feedbackId || !comment?.trim()) return fail("feedbackId and comment are required", 400);

    const { error } = await supabase.from("feedback_comments").insert({
      feedback_id: feedbackId,
      user_id: adminUserId,
      body: comment.trim(),
      is_admin_reply: true,
    });

    if (error) return fail(error.message);
    return NextResponse.json({ success: true });
  }

  // ---------------------------------------------------------------
  // delete_comment: remove a comment (admin or user)
  // ---------------------------------------------------------------
  if (action === "delete_comment") {
    const { commentId } = body as { commentId?: string };
    if (!commentId) return fail("commentId is required", 400);

    const { error } = await supabase.from("feedback_comments").delete().eq("id", commentId);
    if (error) return fail(error.message);
    return NextResponse.json({ success: true });
  }

  // ---------------------------------------------------------------
  // delete_feedback: nuke a feedback row (cascades attachments,
  // hearts, comments; storage cleanup trigger reaps storage objects)
  // ---------------------------------------------------------------
  if (action === "delete_feedback") {
    const { feedbackId } = body as { feedbackId?: string };
    if (!feedbackId) return fail("feedbackId is required", 400);

    const { error } = await supabase.from("feedback").delete().eq("id", feedbackId);
    if (error) return fail(error.message);
    return NextResponse.json({ success: true });
  }

  // ---------------------------------------------------------------
  // list (default): fetch all feedback enriched with author profile,
  // attachments, comments, hearts. Sorted newest first.
  //
  // We avoid PostgREST embeds for `profiles` because feedback.user_id
  // FKs auth.users(id), not public.profiles(id) — PostgREST can't auto-
  // resolve the join, which 500s the route. Instead we fetch profiles in
  // a second query and join in JS. Attachments DO have a direct FK to
  // feedback.id so the embed there works.
  // ---------------------------------------------------------------
  const { data: feedback, error: feedbackError } = await supabase
    .from("feedback")
    .select(
      `
      *,
      attachments:feedback_attachments (
        id,
        storage_path,
        file_name,
        file_type,
        mime_type,
        file_size_bytes
      )
    `
    )
    .order("created_at", { ascending: false });

  if (feedbackError) return fail(feedbackError.message);

  const { data: comments, error: commentsError } = await supabase
    .from("feedback_comments")
    .select("*")
    .order("created_at", { ascending: true });

  if (commentsError) return fail(commentsError.message);

  // Collect every author id that appears in feedback OR comments and
  // pull their profile rows in one query.
  const authorIds = new Set<string>();
  (feedback ?? []).forEach((f) => authorIds.add(f.user_id));
  (comments ?? []).forEach((c) => authorIds.add(c.user_id));

  let profilesById = new Map<string, { id: string; full_name: string | null; profile_picture_url: string | null; email: string | null }>();
  if (authorIds.size > 0) {
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, full_name, profile_picture_url, email")
      .in("id", Array.from(authorIds));
    if (profilesError) return fail(profilesError.message);
    profilesById = new Map((profiles ?? []).map((p) => [p.id, p]));
  }

  const commentsByFeedback: Record<string, unknown[]> = {};
  (comments ?? []).forEach((c) => {
    if (!commentsByFeedback[c.feedback_id]) commentsByFeedback[c.feedback_id] = [];
    commentsByFeedback[c.feedback_id].push({
      ...c,
      profiles: profilesById.get(c.user_id) ?? null,
    });
  });

  // Resolve public URLs for attachments so the admin UI can render them
  // without an extra round-trip.
  const enriched = (feedback ?? []).map((f) => {
    const attachments = (f.attachments ?? []).map((a: { storage_path: string } & Record<string, unknown>) => ({
      ...a,
      public_url: supabase.storage
        .from("feedback-attachments")
        .getPublicUrl(a.storage_path).data.publicUrl,
    }));
    return {
      ...f,
      profiles: profilesById.get(f.user_id) ?? null,
      attachments,
      comments: commentsByFeedback[f.id] ?? [],
      attachments_count: attachments.length,
    };
  });

  return NextResponse.json({ data: enriched });
}
