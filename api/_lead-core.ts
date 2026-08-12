/**
 * Pure logic for the Skooped lead router — no I/O here so it can be unit-tested.
 * The HTTP handler lives in api/lead.ts; senders (Twilio/Resend/Supabase) are env-gated there.
 */

export interface LeadPayload {
  site_id: string;
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  service?: string;
  source_url?: string;
  /** honeypot — real users never fill this */
  company_website?: string;
}

export interface LeadRoute {
  /** E.164 number the SMS alert goes to, e.g. "+16153151541" */
  sms?: string;
  /**
   * ISO date the client's written SMS opt-in was recorded, e.g. "2026-08-12".
   * A number alone never sends: see smsAllowed().
   */
  sms_consent_on?: string;
  /** email address the alert goes to */
  email?: string;
  /** human label used in the alert text, e.g. "Gunn's Fencing" */
  label?: string;
}

/** E.164, the only shape Twilio accepts as a To value. */
const E164 = /^\+[1-9]\d{7,14}$/;
/** ISO calendar date, the shape the consent record is written in. */
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * SMS only goes out when a written consent record exists for that route.
 * Adding a phone number is deliberately not enough: a client is texted only
 * after their opt-in is recorded, which is the consent model registered on
 * A2P campaign CMb671be31c1701980e7487f845f247a4b.
 *
 * Both fields are also validated, not just truthy-checked (2026-08-12): the
 * consent date is the compliance record, so a placeholder typed into env config
 * while wiring ("TBD", "asked him", "yesterday") must NOT open the send path,
 * and a non-E.164 number would only fail at Twilio with a 400 nobody reads.
 * A future-dated consent is refused too: nobody has consented yet.
 */
export function smsAllowed(route: LeadRoute, today: string = new Date().toISOString().slice(0, 10)): boolean {
  if (!route.sms || !E164.test(route.sms)) return false;
  const consent = route.sms_consent_on;
  if (!consent || !ISO_DATE.test(consent)) return false;
  if (Number.isNaN(Date.parse(consent))) return false;
  return consent <= today;
}

export type RouteTable = Record<string, LeadRoute>;

export interface ValidationResult {
  ok: boolean;
  error?: string;
  /** true when the honeypot tripped — respond 200 but deliver nothing */
  spam?: boolean;
  lead?: LeadPayload;
}

const MAX_FIELD = 2000;

const clip = (v: unknown): string | undefined => {
  if (typeof v !== "string") return undefined;
  const s = v.trim().slice(0, MAX_FIELD);
  return s.length ? s : undefined;
};

export function validateLead(body: unknown): ValidationResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "body must be a JSON object" };
  }
  const b = body as Record<string, unknown>;
  const lead: LeadPayload = {
    site_id: clip(b.site_id) ?? "",
    name: clip(b.name),
    phone: clip(b.phone),
    email: clip(b.email),
    message: clip(b.message),
    service: clip(b.service),
    source_url: clip(b.source_url),
    company_website: clip(b.company_website),
  };
  if (lead.company_website) {
    return { ok: true, spam: true, lead };
  }
  if (!lead.site_id) {
    return { ok: false, error: "site_id is required" };
  }
  if (!lead.phone && !lead.email) {
    return { ok: false, error: "at least one of phone or email is required" };
  }
  return { ok: true, lead };
}

export function resolveRoute(table: RouteTable, siteId: string): LeadRoute | undefined {
  return table[siteId] ?? table["default"];
}

/**
 * The registration attested "Embedded links = NO (no URLs or email addresses in
 * message bodies)", so both get redacted, not just schemed URLs:
 *  - email addresses first, otherwise the domain half of one would survive as
 *    "jane@[link]";
 *  - then schemed and www. URLs;
 *  - then bare domains, because "visit skooped.io" and "bit.ly/x" are links to a
 *    carrier with or without a scheme.
 *
 * The bare-domain pass is limited to TLDs people actually type. A generic
 * "word.word" pattern ate ordinary prose with a missing space after a period
 * ("Thanks.Please call") and turned it into "[link]".
 */
const TLDS =
  "com|net|org|io|co|us|uk|ca|gov|edu|info|biz|dev|app|ly|me|tv|shop|site|online|store|xyz|link|page";
const stripUrls = (v: string): string =>
  v
    .replace(/\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b/gi, "[email]")
    .replace(/\b(?:https?:\/\/|www\.)\S+/gi, "[link]")
    .replace(
      new RegExp(`\\b[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\\.[a-z0-9-]+)*\\.(?:${TLDS})(?:\\/\\S*)?\\b`, "gi"),
      "[link]"
    );

/**
 * Hard ceiling on the outbound body. Two GSM-7 segments; keeps per-message cost
 * predictable and keeps long pasted messages from turning one lead into a
 * ten-segment bill. The opt-out sentence is never what gets cut.
 */
const SMS_MAX = 320;
const OPT_OUT = "Reply STOP to opt out.";

/**
 * The SMS an opted-in client gets. This must keep the shape of the sample
 * messages registered on A2P campaign CMb671be31c1701980e7487f845f247a4b:
 * leads with "Skooped", says "inquiry" not "lead", carries the opt-out line,
 * and contains no emoji and no URLs. Production bodies that drift from the
 * registered samples put the campaign at risk, so change the samples in the
 * Twilio console first, then this function.
 */
export function formatSms(lead: LeadPayload, route: LeadRoute): string {
  // Name and phone only. All three registered samples carry phone-only contact
  // details, and the campaign's own form toggles say no email addresses in
  // message bodies, so an inquirer's address is named but never printed.
  const who = [lead.name, lead.phone].filter(Boolean).join(", ");
  const head = `Skooped alert for ${route.label ?? "your business"}: new website inquiry${who ? ` from ${who}` : ""}.`;
  const parts = [
    head,
    !lead.phone && lead.email ? "Email on file." : "",
    lead.service ? `Requested: ${stripUrls(lead.service).slice(0, 80)}.` : "",
    lead.message ? `"${stripUrls(lead.message).slice(0, 200)}"` : "",
  ].filter(Boolean);

  // Trim the detail, never the opt-out line: dropping it would break the
  // registered sample shape (and the attestation).
  let body = [...parts, OPT_OUT].join(" ");
  while (body.length > SMS_MAX && parts.length > 1) {
    parts.pop();
    body = [...parts, OPT_OUT].join(" ");
  }
  if (body.length > SMS_MAX) {
    const room = SMS_MAX - OPT_OUT.length - 2;
    body = `${head.slice(0, Math.max(0, room))} ${OPT_OUT}`;
  }
  return body;
}

export function formatEmail(lead: LeadPayload, route: LeadRoute): { subject: string; text: string } {
  const subject = `New lead${route.label ? ` for ${route.label}` : ""}${lead.name ? `: ${lead.name}` : ""}`;
  const text = [
    `A new lead just came in${route.label ? ` for ${route.label}` : ""}.`,
    "",
    lead.name ? `Name: ${lead.name}` : "",
    lead.phone ? `Phone: ${lead.phone}` : "",
    lead.email ? `Email: ${lead.email}` : "",
    lead.service ? `Interested in: ${lead.service}` : "",
    lead.message ? `Message:\n${lead.message}` : "",
    lead.source_url ? `From: ${lead.source_url}` : "",
    "",
    "Skooped lead alerts",
  ]
    .filter((l) => l !== "")
    .join("\n");
  return { subject, text };
}

/**
 * LEAD_ROUTES comes from hand-edited Vercel env config, so every bad shape a
 * person can paste has to land somewhere safe rather than half-working:
 * an array (a copy-pasted `[{...}]`) used to pass the object check and produce a
 * table matching nothing, and per-entry junk (a string instead of an object)
 * would have crashed on property access at send time.
 */
export function parseRouteTable(raw: string | undefined): RouteTable {
  if (!raw) return {};
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return {};
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return {};
  const table: RouteTable = {};
  for (const [siteId, entry] of Object.entries(parsed as Record<string, unknown>)) {
    if (typeof entry !== "object" || entry === null || Array.isArray(entry)) continue;
    const e = entry as Record<string, unknown>;
    const route: LeadRoute = {};
    if (typeof e.sms === "string") route.sms = e.sms.trim();
    if (typeof e.sms_consent_on === "string") route.sms_consent_on = e.sms_consent_on.trim();
    if (typeof e.email === "string") route.email = e.email.trim();
    if (typeof e.label === "string") route.label = e.label.trim();
    table[siteId] = route;
  }
  return table;
}
