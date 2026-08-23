export type EmailInput = { to: string; subject: string; html: string; text?: string };

export async function sendEmail(input: EmailInput) {
  const provider = process.env.EMAIL_PROVIDER;
  if (!provider) return { sent: false, reason: "EMAIL_PROVIDER is not configured" };
  if (provider === "AWS_SES") return sendAwsSes(input);
  if (provider === "RESEND") return sendResend(input);
  return { sent: false, reason: `Unsupported email provider: ${provider}` };
}

async function sendAwsSes(input: EmailInput) {
  if (!process.env.AWS_SES_REGION || !process.env.AWS_SES_ACCESS_KEY_ID || !process.env.AWS_SES_SECRET_ACCESS_KEY || !process.env.AWS_SES_FROM_EMAIL) return { sent: false, reason: "AWS SES credentials are not configured" };
  return { sent: false, reason: "AWS SES adapter is ready; configure the AWS SDK/provider transport" };
}

async function sendResend(input: EmailInput) {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) return { sent: false, reason: "Resend credentials are not configured" };
  const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.RESEND_FROM_EMAIL, to: [input.to], subject: input.subject, html: input.html, text: input.text }) });
  if (!response.ok) return { sent: false, reason: `Resend returned ${response.status}` };
  return { sent: true };
}
