/**
 * skooped.io's own contact form posts here — the dogfood route of the lead
 * router. A browser cannot hold the shared secret that gates /api/lead, so
 * this endpoint takes same-origin posts with no secret and forces site_id to
 * "skooped": a forged post can only ever reach Skooped itself, never a client.
 *
 * Same senders, same env gating, same honeypot as /api/lead. No CORS headers
 * on purpose — the only legitimate caller is the skooped.io page itself.
 */
import { classifyLead, parseBlocklist, parseRouteTable, resolveRoute, validateLead } from "./_lead-core.js";
import { anySenderConfigured, deliver } from "./_lead-senders.js";

const SITE_ID = "skooped";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "POST only" });

  const validation = validateLead({ ...(req.body ?? {}), site_id: SITE_ID });
  if (!validation.ok || !validation.lead) {
    return res.status(400).json({ ok: false, error: validation.error });
  }
  if (validation.spam) {
    // honeypot tripped: pretend success, deliver nothing
    return res.status(200).json({ ok: true });
  }

  const route = resolveRoute(parseRouteTable(process.env.LEAD_ROUTES), SITE_ID);
  if (!route || !anySenderConfigured()) {
    console.log("contact: not configured");
    return res.status(503).json({ ok: false, error: "lead router not configured yet" });
  }

  // Same spam gate as /api/lead. Skooped's own inbound is people asking about
  // SEO and websites, so the score deliberately keys on the shape of a pitch
  // (someone selling to you) rather than on those topic words.
  const verdict = classifyLead(validation.lead, parseBlocklist(process.env.LEAD_BLOCKLIST));
  const delivered = await deliver(validation.lead, route, verdict);

  if (verdict.spam) {
    console.log(
      "contact: spam suppressed",
      JSON.stringify({
        reason: verdict.reason,
        stored: delivered.stored,
        name: validation.lead.name ?? null,
        email: validation.lead.email ?? null,
        phone: validation.lead.phone ?? null,
        message: validation.lead.message?.slice(0, 200) ?? null,
      })
    );
    return res.status(200).json({ ok: true });
  }

  console.log("contact: delivered", JSON.stringify(delivered));

  // Same honesty rule as /api/lead: the form falls back to the SMS/mailto
  // composer on a non-ok response, so a swallowed failure would eat the lead.
  if (!delivered.sms && !delivered.email && !delivered.stored) {
    console.error("contact: total delivery failure");
    return res.status(502).json({ ok: false, error: "lead accepted by nothing", delivered });
  }

  return res.status(200).json({ ok: true, delivered });
}
