import type { EmailInput } from "./service";
export async function sendWithAwsSes(input: EmailInput) { return { sent: false, reason: "AWS SES requires AWS SDK credentials and is disabled until configured", provider: "AWS_SES" as const }; }
