import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const normalize = (value: string) => value.replace(/\D/g, "").slice(-10);
const code = () => String(Math.floor(100000 + Math.random() * 900000));

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { mobileNumber?: string } | null;
  const mobileNumber = normalize(body?.mobileNumber ?? "");
  if (mobileNumber.length !== 10) return NextResponse.json({ error: "Enter a valid mobile number" }, { status: 400 });
  const setting = await prisma.siteSetting.findUnique({ where: { key: "consultation_mobile_otp_enabled" } });
  const enabled = setting?.value === true || setting?.value === "true";
  if (!enabled) return NextResponse.json({ enabled: false, message: "Mobile verification is disabled" });
  const otp = code();
  await prisma.$executeRaw`DELETE FROM "MobileOTP" WHERE "mobileNumber" = ${mobileNumber} OR "expiresAt" < CURRENT_TIMESTAMP`;
  await prisma.$executeRaw`INSERT INTO "MobileOTP" ("mobileNumber","otpCode","expiresAt") VALUES (${mobileNumber}, ${await bcrypt.hash(otp, 10)}, CURRENT_TIMESTAMP + INTERVAL '10 minutes')`;
  if (process.env.NODE_ENV !== "production") return NextResponse.json({ success: true, devOtp: otp });
  return NextResponse.json({ success: true });
}
