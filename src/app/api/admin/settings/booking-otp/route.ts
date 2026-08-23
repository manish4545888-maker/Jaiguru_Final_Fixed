import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionPayload } from "@/lib/session";
export async function POST(request: Request) {
  const session = await getSessionPayload();
  if (!session || !["ADMIN", "EDITOR"].includes(session.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const body = await request.json().catch(() => null) as { enabled?: boolean } | null;
  if (typeof body?.enabled !== "boolean") return NextResponse.json({ error: "Invalid setting" }, { status: 400 });
  await prisma.siteSetting.upsert({ where: { key: "consultation_mobile_otp_enabled" }, update: { value: body.enabled }, create: { key: "consultation_mobile_otp_enabled", value: body.enabled } });
  return NextResponse.json({ enabled: body.enabled });
}
