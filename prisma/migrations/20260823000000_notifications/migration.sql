CREATE TYPE "NotificationChannel" AS ENUM ('IN_APP', 'EMAIL');
CREATE TYPE "NotificationStatus" AS ENUM ('UNREAD', 'READ');

CREATE TABLE "Notification" (
  "id" TEXT NOT NULL,
  "recipientId" TEXT,
  "recipientEmail" TEXT,
  "title" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "channel" "NotificationChannel" NOT NULL DEFAULT 'IN_APP',
  "status" "NotificationStatus" NOT NULL DEFAULT 'UNREAD',
  "eventKey" TEXT NOT NULL,
  "actionUrl" TEXT,
  "metadata" JSONB,
  "readAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Notification_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "Notification_eventKey_key" UNIQUE ("eventKey")
);
CREATE INDEX "Notification_recipientId_status_createdAt_idx" ON "Notification"("recipientId", "status", "createdAt");
CREATE INDEX "Notification_recipientEmail_status_createdAt_idx" ON "Notification"("recipientEmail", "status", "createdAt");

CREATE TABLE "EmailSettings" (
  "id" TEXT NOT NULL,
  "provider" TEXT NOT NULL DEFAULT 'disabled',
  "isEnabled" BOOLEAN NOT NULL DEFAULT false,
  "fromName" TEXT,
  "fromEmail" TEXT,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "EmailSettings_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ScheduledNotification" (
  "id" TEXT NOT NULL,
  "eventKey" TEXT NOT NULL,
  "recipientId" TEXT,
  "recipientEmail" TEXT,
  "subject" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "scheduledFor" TIMESTAMP(3) NOT NULL,
  "sentAt" TIMESTAMP(3),
  "cancelledAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ScheduledNotification_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "ScheduledNotification_eventKey_key" UNIQUE ("eventKey")
);
CREATE INDEX "ScheduledNotification_scheduledFor_sentAt_idx" ON "ScheduledNotification"("scheduledFor", "sentAt");
