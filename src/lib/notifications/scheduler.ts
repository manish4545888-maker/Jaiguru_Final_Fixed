import { prisma } from "@/lib/prisma";
import { notifyEvent } from "./triggers";

/** Invoke from a cron endpoint or platform scheduler; safe to run repeatedly. */
export async function runNotificationScheduler(now = new Date()) {
  const due = await prisma.$queryRaw<Array<{ id: string; eventKey: string; recipientId: string | null; recipientEmail: string | null; subject: string; body: string }>>`SELECT "id","eventKey","recipientId","recipientEmail","subject","body" FROM "ScheduledNotification" WHERE "scheduledFor" <= ${now} AND "sentAt" IS NULL AND "cancelledAt" IS NULL LIMIT 100`;
  for (const item of due) {
    await notifyEvent({ eventKey: item.eventKey, recipientId: item.recipientId ?? undefined, recipientEmail: item.recipientEmail ?? undefined, title: item.subject, body: item.body, type: "SCHEDULED" });
    await prisma.$executeRaw`UPDATE "ScheduledNotification" SET "sentAt" = ${now} WHERE "id" = ${item.id}`;
  }
  return due.length;
}
