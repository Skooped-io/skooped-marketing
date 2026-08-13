/**
 * Skooped lead router v1 — every client site's server function POSTs here.
 * Flow: validate → resolve route by site_id → text the client (Twilio) →
 * email the client (Resend) → store (Supabase). Every sender is env-gated:
 * with no env vars set this endpoint answers 503 and delivers nothing, so it
 * ships dormant and comes alive purely through Vercel env config.
 *
 * skooped.io's own contact form does NOT post here — a browser cannot hold the
 * shared secret. It posts to /api/contact, which forces site_id "skooped" and
 * reuses the same senders (api/_lead-senders.ts).
 *
 * Env vars (all optional until go-live):
 *   LEAD_ROUTES        JSON: {"<site_id>": {"sms":"+1615...","sms_consent_on":"2026-08-12","email":"...","label":"..."}, "default": {...}}
 *                      sms_consent_on is the date the client's written opt-in was
 *                      recorded; without it the number is ignored and only email goes out.
 *   LEAD_ROUTER_SECRET shared secret each bridged site sends as x-skooped-secret
 *   TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN / TWILIO_FROM_NUMBER
 *   RESEND_API_KEY / LEAD_FROM_EMAIL   (from-address on a verified skooped.io domain)
 *   SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY   (table: leads)
 */
import { parseRouteTable, resolveRoute, validateLead } from "./_lead-core.js";
import { anySenderConfigured, deliver } from "./_lead-senders.js";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

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

  if (!route || !anySenderConfigured()) {
    console.log("lead-router: not configured", JSON.stringify({ site_id: lead.site_id }));
    return res.status(503).json({ ok: false, error: "lead router not configured yet" });
  }

  const delivered = await deliver(lead, route);

  // structured log line = ledger in Vercel logs alongside the leads table
  console.log(
    "lead-router: delivered",
    JSON.stringify({ site_id: lead.site_id, ...delivered, has_phone: !!lead.phone, has_email: !!lead.email })
  );

  // A lead that reached nobody and was stored nowhere must not read as success:
  // the client-side snippet branches on res.ok, so a 200 here told the visitor
  // "you'll hear from us shortly" for a lead that evaporated. 502 makes the loss
  // visible in the caller's logs and in Vercel's error rate.
  if (!delivered.sms && !delivered.email && !delivered.stored) {
    console.error("lead-router: total delivery failure", JSON.stringify({ site_id: lead.site_id }));
    return res.status(502).json({ ok: false, error: "lead accepted by nothing", delivered });
  }

  return res.status(200).json({ ok: true, delivered });
}
