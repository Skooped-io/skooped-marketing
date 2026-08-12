/**
 * Skooped lead router v1 — every client site's form POSTs here.
 * Flow: validate → resolve route by site_id → text the client (Twilio) →
 * email the client (Resend) → store (Supabase). Every sender is env-gated:
 * with no env vars set this endpoint answers 503 and delivers nothing, so it
 * ships dormant and comes alive purely through Vercel env config.
 *
 * Env vars (all optional until go-live):
 *   LEAD_ROUTES        JSON: {"<site_id>": {"sms":"+1615...","sms_consent_on":"2026-08-12","email":"...","label":"..."}, "default": {...}}
 *                      sms_consent_on is the date the client's written opt-in was
 *                      recorded; without it the number is ignored and only email goes out.
 *   TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN / TWILIO_FROM_NUMBER
 *   RESEND_API_KEY / LEAD_FROM_EMAIL   (from-address on a verified skooped.io domain)
 *   SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY   (table: leads)
 */
import {
  formatEmail,
  formatSms,
  parseRouteTable,
  resolveRoute,
  smsAllowed,
  validateLead,
  type LeadPayload,
  type LeadRoute,
} from "./_lead-core.js";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "POST only" });

  // Shared-secret gate, opt-in by env. The endpoint is otherwise open to the
  // internet with a wildcard CORS header, so once SMS is live anyone who guesses
  // a site_id could text a client's personal phone in a loop. Client sites post
  // from a server function, so they can hold the header. While
  // LEAD_ROUTER_SECRET is unset nothing changes for existing callers.
  const requiredSecret = process.env.LEAD_ROUTER_SECRET;
  if (requiredSecret) {
    const provided = req.headers?.["x-skooped-secret"];
    if (provided !== requiredSecret) {
      console.error("lead-router: rejected unauthenticated post");
      return res.status(401).json({ ok: false, error: "unauthorized" });
    }
  }

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

  // Each sender counts as configured only when EVERY var it needs is present.
  // The Twilio triple used to omit AUTH_TOKEN, so the half-finished state of a
  // session that stopped to fetch the token flipped the router out of dormancy:
  // it answered 200 ok and texted nobody.
  const anySenderConfigured =
    (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM_NUMBER) ||
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

  // structured log line = ledger in Vercel logs alongside the leads table
  console.log(
    "lead-router: delivered",
    JSON.stringify({ site_id: lead.site_id, sms, email, stored, has_phone: !!lead.phone, has_email: !!lead.email })
  );

  // A lead that reached nobody and was stored nowhere must not read as success:
  // the client-side snippet branches on res.ok, so a 200 here told the visitor
  // "you'll hear from us shortly" for a lead that evaporated. 502 makes the loss
  // visible in the caller's logs and in Vercel's error rate.
  if (!sms && !email && !stored) {
    console.error("lead-router: total delivery failure", JSON.stringify({ site_id: lead.site_id }));
    return res.status(502).json({ ok: false, error: "lead accepted by nothing", delivered: { sms, email, stored } });
  }

  return res.status(200).json({ ok: true, delivered: { sms, email, stored } });
}
