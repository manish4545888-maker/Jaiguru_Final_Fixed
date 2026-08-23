"use client";

import { useState } from "react";
import { Bell, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NotificationsPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <main className="space-y-6 p-6">
      <div><p className="text-sm text-muted-foreground">Audience</p><h1 className="flex items-center gap-2 text-2xl font-semibold"><Bell className="h-6 w-6 text-primary" />Notifications</h1></div>
      <Card className="max-w-2xl">
        <CardHeader><CardTitle>Send an in-app notification</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Input value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} placeholder="Recipient email (optional; blank broadcasts)" type="email" />
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Notification title" />
          <Textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write a clear, useful message" rows={5} />
          <Button disabled={!title.trim() || !body.trim() || sent} onClick={() => setSent(true)}><Send className="mr-2 h-4 w-4" />{sent ? "Queued" : "Queue notification"}</Button>
          {sent && <p className="text-sm text-muted-foreground">The composer is ready for the persisted send action after the database migration is applied.</p>}
        </CardContent>
      </Card>
    </main>
  );
}
