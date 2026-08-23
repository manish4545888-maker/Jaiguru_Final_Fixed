import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/dal";
import { markNotificationRead } from "@/lib/notifications/service";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body?.id || typeof body.id !== "string") return NextResponse.json({ error: "Notification id is required" }, { status: 400 });
  await markNotificationRead(user.id, body.id);
  return NextResponse.json({ ok: true });
}
