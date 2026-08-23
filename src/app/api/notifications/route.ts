import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/dal";
import { listNotifications } from "@/lib/notifications/service";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const notifications = await listNotifications(user.id, user.email);
  return NextResponse.json({ notifications, unreadCount: notifications.filter((n: { status: string }) => n.status === "UNREAD").length });
}
