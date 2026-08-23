import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { mobileNumber?: string; otp?: string } | null;
  const mobileNumber = (body?.mobileNumber ?? "").replace(/\D/g, "").slice(-10);
  const otp = (body?.otp ?? "").trim();
  if (mobileNumber.length !== 10 || !/^\d{6}$/.test(otp)) return NextResponse.json({ error: "Invalid verification details" }, { status: 400 });
  const rows = await prisma.$queryRaw<Array<{ id: string; otpCode: string }>>`SELECT "id","otpCode" FROM "MobileOTP" WHERE "mobileNumber"=${mobileNumber} AND "isUsed"=false AND "expiresAt">CURRENT_TIMESTAMP ORDER BY "createdAt" DESC LIMIT 1`;
  if (!rows[0] || !(await bcrypt.compare(otp, rows[0].otpCode))) return NextResponse.json({ error: "Incorrect or expired OTP" }, { status: 400 });
  await prisma.$executeRaw`UPDATE "MobileOTP" SET "isUsed"=true WHERE "id"=${rows[0].id}`;
  return NextResponse.json({ verified: true });
}
