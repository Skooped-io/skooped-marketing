/**
 * The three delivery legs of the lead router — Twilio, Resend, Supabase — plus
 * the shared deliver() pipeline. Split out of api/lead.ts (2026-08-12) so the
 * public contact endpoint (api/contact.ts, skooped.io's own form) can reuse the
 * exact same senders without holding the shared secret that gates /api/lead.
 * Every sender is env-gated: with nothing configured, nothing sends.
 */
import { formatEmail, formatSms, smsAllowed, type LeadPayload, type LeadRoute } from "./_lead-core.js";

export interface Delivery {
  sms: boolean;
  email: boolean;
  stored: boolean;
}

/**
 * True only when at least one sender has EVERY var it needs. A half-configured
 * sender must read as "not configured": the Twilio triple once omitted
 * AUTH_TOKEN from this check, and the half-finished state of a session that
 * stopped mid-setup flipped the router out of dormancy — it answered 200 ok
 * and texted nobody.
 */
export function anySenderConfigured(): boolean {
  return Boolean(
    (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM_NUMBER) ||
      (process.env.RESEND_API_KEY && process.env.LEAD_FROM_EMAIL) ||
      (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
  );
}

async function sendSms(lead: LeadPayload, route: LeadRoute): Promise<boolean> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  // No consent record, no text — regardless of what the route table holds.
  if (!sid || !token || !from || !smsAllowed(route)) return false;
  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ To: route.sms as string, From: from, Body: formatSms(lead, route) }),
  });
  if (!res.ok) {
    // 21610 = this number replied STOP. Twilio blocks it for us; the route's
    // sms_consent_on must be cleared so the record matches reality.
    const detail = await res.text().catch(() => "");
    console.error(
      "lead-router: sms failed",
      JSON.stringify({ site_id: lead.site_id, status: res.status, opted_out: detail.includes("21610") })
    );
  }
  return res.ok;
}

async function sendEmail(lead: LeadPayload, route: LeadRoute): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  if (!key || !from || !route.email) return false;
  const { subject, text } = formatEmail(lead, route);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [route.email], subject, text }),
  });
  if (!res.ok) {
    console.error(
      "lead-router: email failed",
      JSON.stringify({ site_id: lead.site_id, status: res.status })
    );
  }
  return res.ok;
}

async function storeLead(lead: LeadPayload, delivered: { sms: boolean; email: boolean }): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return false;
  const res = await fetch(`${url}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      site_id: lead.site_id,
      name: lead.name ?? null,
      phone: lead.phone ?? null,
      email: lead.email ?? null,
      message: lead.message ?? null,
      service: lead.service ?? null,
      source_url: lead.source_url ?? null,
      sms_sent: delivered.sms,
      email_sent: delivered.email,
    }),
  });
  if (!res.ok) {
    console.error(
      "lead-router: store failed",
      JSON.stringify({ site_id: lead.site_id, status: res.status })
    );
  }
  return res.ok;
}

/** Text, email, and store one validated lead. A sender that throws counts as failed. */
export async function deliver(lead: LeadPayload, route: LeadRoute): Promise<Delivery> {
  const [sms, email] = await Promise.all([
    sendSms(lead, route).catch(() => false),
    sendEmail(lead, route).catch(() => false),
  ]);
  const stored = await storeLead(lead, { sms, email }).catch(() => false);
  return { sms, email, stored };
}
