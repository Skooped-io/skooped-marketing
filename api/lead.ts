/**
 * Skooped lead router v1 — every client site's form POSTs here.
 * Flow: validate → resolve route by site_id → text the client (Twilio) →
 * email the client (Resend) → store (Supabase). Every sender is env-gated:
 * with no env vars set this endpoint answers 503 and delivers nothing, so it
 * ships dormant and comes alive purely through Vercel env config.
 *
 * Env vars (all optional until go-live):
 *   LEAD_ROUTES        JSON: {"<site_id>": {"sms":"+1615...","email":"...","label":"..."}, "default": {...}}
 *   TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN / TWILIO_FROM_NUMBER
 *   RESEND_API_KEY / LEAD_FROM_EMAIL   (from-address on a verified skooped.io domain)
 *   SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY   (table: leads)
 */
import {
  formatEmail,
  formatSms,
  parseRouteTable,
  resolveRoute,
  validateLead,
  type LeadPayload,
  type LeadRoute,
} from "./_lead-core";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

async function sendSms(lead: LeadPayload, route: LeadRoute): Promise<boolean> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  if (!sid || !token || !from || !route.sms) return false;
  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ To: route.sms, From: from, Body: formatSms(lead, route) }),
  });
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
  return res.ok;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "POST only" });

  const validation = validateLead(req.body);
  if (!validation.ok || !validation.lead) {
    return res.status(400).json({ ok: false, error: validation.error });
  }
  if (validation.spam) {
    // honeypot tripped: pretend success, deliver nothing
    return res.status(200).json({ ok: true });
  }

  const lead = validation.lead;
  const routes = parseRouteTable(process.env.LEAD_ROUTES);
  const route = resolveRoute(routes, lead.site_id);

  const anySenderConfigured =
    (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_FROM_NUMBER) ||
    (process.env.RESEND_API_KEY && process.env.LEAD_FROM_EMAIL) ||
    (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
  if (!route || !anySenderConfigured) {
    console.log("lead-router: not configured", JSON.stringify({ site_id: lead.site_id }));
    return res.status(503).json({ ok: false, error: "lead router not configured yet" });
  }

  const [sms, email] = await Promise.all([
    sendSms(lead, route).catch(() => false),
    sendEmail(lead, route).catch(() => false),
  ]);
  const stored = await storeLead(lead, { sms, email }).catch(() => false);

  // structured log line = poor-man's ledger in Vercel logs until Supabase is wired
  console.log(
    "lead-router: delivered",
    JSON.stringify({ site_id: lead.site_id, sms, email, stored, has_phone: !!lead.phone, has_email: !!lead.email })
  );

  return res.status(200).json({ ok: true, delivered: { sms, email, stored } });
}
