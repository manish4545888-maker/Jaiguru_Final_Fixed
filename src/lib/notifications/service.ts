import "server-only";
import { prisma } from "@/lib/prisma";

export type NotificationInput = {
  recipientId?: string;
  recipientEmail?: string;
  title: string;
  body: string;
  type: string;
  eventKey: string;
  actionUrl?: string;
  metadata?: unknown;
};

export type NotificationRow = {
  id: string;
  recipientId: string | null;
  recipientEmail: string | null;
  title: string;
  body: string;
  type: string;
  status: "UNREAD" | "READ";
  eventKey: string;
  actionUrl: string | null;
  metadata: unknown;
  createdAt: Date;
};

export async function createNotification(input: NotificationInput) {
  const metadata = input.metadata ? JSON.stringify(input.metadata) : null;
  return prisma.$executeRawUnsafe(
    `INSERT INTO "Notification" ("id","recipientId","recipientEmail","title","body","type","channel","status","eventKey","actionUrl","metadata","createdAt")
     VALUES ($1,$2,$3,$4,$5,$6,'IN_APP','UNREAD',$7,$8,$9::jsonb,CURRENT_TIMESTAMP)
     ON CONFLICT ("eventKey") DO NOTHING`,
    crypto.randomUUID(), input.recipientId ?? null, input.recipientEmail ?? null,
    input.title, input.body, input.type, input.eventKey, input.actionUrl ?? null, metadata,
  );
}

export async function listNotifications(userId: string, email?: string): Promise<NotificationRow[]> {
  return prisma.$queryRawUnsafe<NotificationRow[]>(
    `SELECT "id","recipientId","recipientEmail","title","body","type","status","eventKey","actionUrl","metadata","createdAt"
     FROM "Notification" WHERE "recipientId" = $1 OR ($2::text IS NOT NULL AND "recipientEmail" = $2)
     ORDER BY "createdAt" DESC LIMIT 50`, userId, email ?? null,
  );
}

export async function markNotificationRead(userId: string, id: string) {
  return prisma.$executeRawUnsafe(
    `UPDATE "Notification" SET "status"='READ', "readAt"=CURRENT_TIMESTAMP
     WHERE "id"=$1 AND ("recipientId"=$2 OR "recipientEmail"=(SELECT "email" FROM "User" WHERE "id"=$2))`, id, userId,
  );
}
