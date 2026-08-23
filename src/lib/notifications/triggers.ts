import { createNotification } from "@/lib/notifications/service";
import { sendEmail } from "@/lib/email/service";

export type NotificationEvent = { eventKey: string; recipientId?: string; recipientEmail?: string; title: string; body: string; actionUrl?: string; type: string };

export async function notifyEvent(event: NotificationEvent) {
  const notification = await createNotification(event);
  const email = event.recipientEmail ? await sendEmail({ to: event.recipientEmail, subject: event.title, html: `<p>${event.body}</p>`, text: event.body }) : { sent: false, reason: "No recipient email" };
  return { notification, email };
}

export const orderConfirmed = (eventKey: string, recipient: Pick<NotificationEvent, "recipientId" | "recipientEmail">, itemName: string) => notifyEvent({ ...recipient, eventKey, type: "ORDER_CONFIRMED", title: "Order confirmed", body: `Your order for ${itemName} has been confirmed.` });
export const orderShipped = (eventKey: string, recipient: Pick<NotificationEvent, "recipientId" | "recipientEmail">, itemName: string) => notifyEvent({ ...recipient, eventKey, type: "ORDER_SHIPPED", title: "Order shipped", body: `Your order for ${itemName} has shipped.` });
export const bookingConfirmed = (eventKey: string, recipient: Pick<NotificationEvent, "recipientId" | "recipientEmail">) => notifyEvent({ ...recipient, eventKey, type: "BOOKING_CONFIRMED", title: "Booking confirmed", body: "Your consultation booking is confirmed." });
export const payoutProcessed = (eventKey: string, recipient: Pick<NotificationEvent, "recipientId" | "recipientEmail">) => notifyEvent({ ...recipient, eventKey, type: "PAYOUT_PROCESSED", title: "Payout processed", body: "Your payout has been processed." });
export const vendorApproved = (eventKey: string, recipient: Pick<NotificationEvent, "recipientId" | "recipientEmail">) => notifyEvent({ ...recipient, eventKey, type: "VENDOR_APPROVED", title: "Vendor approved", body: "Your vendor account has been approved." });
export const tenderStatusChanged = (eventKey: string, recipient: Pick<NotificationEvent, "recipientId" | "recipientEmail">, status: string) => notifyEvent({ ...recipient, eventKey, type: "TENDER_STATUS", title: `Tender ${status}`, body: `Tender status changed to ${status}.` });
