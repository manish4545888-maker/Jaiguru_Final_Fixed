import { prisma } from "@/lib/prisma";
import { BookingOtpToggle } from "@/components/admin/settings/booking-otp-toggle";

export default async function BookingSettingsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: "consultation_mobile_otp_enabled" } });
  return <main className="space-y-6 p-6"><h1 className="text-2xl font-semibold">Booking settings</h1><BookingOtpToggle initialEnabled={setting?.value === true || setting?.value === "true"} /></main>;
}
