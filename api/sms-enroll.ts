/**
 * One-time SMS enrollment confirmation (SMS-ROLLOUT step 4), added 2026-08-20.
 *
 * Why this exists: every production env var on this project is Sensitive
 * (write-only), so the Twilio token cannot be pulled to a laptop to send the
 * confirmation by hand. The deployed function is the only thing that holds it.
 *
 * POST /api/sms-enroll  { "site_id": "gunns-fencing" }  with x-skooped-secret
 *
 * Fails closed everywhere a lead alert would merely degrade:
 *  - no LEAD_ROUTER_SECRET configured → 503 (this endpoint texts a client; it
 *    never runs unauthenticated the way /api/lead may while dormant)
 *  - wrong secret → 401
 *  - unknown site_id → 404 (no `default` fallback: nobody gets enrolled by typo)
 *  - route without a valid number + past consent date → 409 (smsAllowed())
 *
 * The message text is the one the A2P campaign registration promises. Change
 * the registered sample first, then this constant.
 */
import { parseRouteTable, smsAllowed, ENROLLMENT_CONFIRMATION } from "./_lead-core.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  // GET doubles as the deploy probe ops/sms-enroll.ps1 polls: the commit sha
  // tells it when the deployment carrying a fresh LEAD_ROUTES is the live one.
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "POST only", deployment: process.env.VERCEL_GIT_COMMIT_SHA ?? null });
  }

  const requiredSecret = process.env.LEAD_ROUTER_SECRET;
  if (!requiredSecret) return res.status(503).json({ ok: false, error: "enrollment endpoint not configured" });
  if (req.headers?.["x-skooped-secret"] !== requiredSecret) {
    console.error("sms-enroll: rejected unauthenticated post");
    return res.status(401).json({ ok: false, error: "unauthorized" });
  }

  const siteId = typeof req.body?.site_id === "string" ? req.body.site_id.trim() : "";
  if (!siteId) return res.status(400).json({ ok: false, error: "site_id is required" });

  const route = parseRouteTable(process.env.LEAD_ROUTES)[siteId];
  if (!route) return res.status(404).json({ ok: false, error: "unknown site_id" });
  if (!smsAllowed(route)) return res.status(409).json({ ok: false, error: "no valid written consent on this route" });

  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  if (!sid || !token || !from) return res.status(503).json({ ok: false, error: "twilio not configured" });

  const twilio = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ To: route.sms as string, From: from, Body: ENROLLMENT_CONFIRMATION }),
  });
  const detail = (await twilio.text().catch(() => "")) || "";
  if (!twilio.ok) {
    console.error("sms-enroll: twilio failed", JSON.stringify({ site_id: siteId, status: twilio.status, detail: detail.slice(0, 300) }));
    return res.status(502).json({ ok: false, error: "twilio rejected the send", status: twilio.status });
  }
  let messageSid: string | undefined;
  let messageStatus: string | undefined;
  try {
    const parsed = JSON.parse(detail) as { sid?: string; status?: string };
    messageSid = parsed.sid;
    messageStatus = parsed.status;
  } catch {
    // Twilio answered 2xx with a non-JSON body; the send happened, the ledger just lacks the SID
  }
  console.log("sms-enroll: confirmation sent", JSON.stringify({ site_id: siteId, sid: messageSid, status: messageStatus }));
  return res.status(200).json({ ok: true, site_id: siteId, sid: messageSid, status: messageStatus, to_last4: (route.sms as string).slice(-4) });
}
