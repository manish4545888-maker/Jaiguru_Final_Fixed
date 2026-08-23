"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
export function BookingOtpToggle({ initialEnabled }: { initialEnabled: boolean }) {
  const [enabled, setEnabled] = useState(initialEnabled);
  async function toggle() { const next = !enabled; const response = await fetch("/api/admin/settings/booking-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ enabled: next }) }); if (response.ok) setEnabled(next); }
  return <section className="flex max-w-xl items-center justify-between rounded-xl border p-4"><div><h2 className="font-medium">Enable Mobile OTP Verification for Consultations</h2><p className="text-sm text-muted-foreground">{enabled ? "Enabled" : "Disabled"}</p></div><Button type="button" variant={enabled ? "outline" : "default"} onClick={() => void toggle()}>{enabled ? "Disable" : "Enable"}</Button></section>;
}
