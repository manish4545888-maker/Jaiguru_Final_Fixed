import type { EmailInput } from "./service";
export async function sendWithResend(input: EmailInput) { return { sent: false, reason: "Resend credentials are read from environment at runtime", provider: "RESEND" as const }; }
