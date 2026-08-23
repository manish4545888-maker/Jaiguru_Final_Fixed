"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EmailSettingsPage() {
  const [enabled, setEnabled] = useState(false);
  return <main className="space-y-6 p-6"><div><p className="text-sm text-muted-foreground">System</p><h1 className="flex items-center gap-2 text-2xl font-semibold"><Mail className="h-6 w-6 text-primary" />Email settings</h1></div><Card className="max-w-2xl"><CardHeader><CardTitle>Delivery provider</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-sm text-muted-foreground">Choose a configured provider in deployment environment variables before enabling transactional email.</p><div className="flex items-center justify-between rounded-lg border p-4"><div><p className="font-medium">Email delivery</p><p className="text-sm text-muted-foreground">{enabled ? "Enabled" : "Disabled until credentials are configured"}</p></div><Button variant={enabled ? "outline" : "default"} onClick={() => setEnabled((value) => !value)}>{enabled ? "Disable" : "Enable"}</Button></div></CardContent></Card></main>;
}
