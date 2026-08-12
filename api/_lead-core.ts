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

/**
 * SMS only goes out when a written consent record exists for that route.
 * Adding a phone number is deliberately not enough: a client is texted only
 * after their opt-in is recorded, which is the consent model registered on
 * A2P campaign CMb671be31c1701980e7487f845f247a4b.
 */
export function smsAllowed(route: LeadRoute): boolean {
  return Boolean(route.sms && route.sms_consent_on);
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

/** Links are barred from message bodies: the campaign attested embedded links = NO. */
const stripUrls = (v: string): string => v.replace(/\b(?:https?:\/\/|www\.)\S+/gi, "[link]");

/**
 * The SMS an opted-in client gets. This must keep the shape of the sample
 * messages registered on A2P campaign CMb671be31c1701980e7487f845f247a4b:
 * leads with "Skooped", says "inquiry" not "lead", carries the opt-out line,
 * and contains no emoji and no URLs. Production bodies that drift from the
 * registered samples put the campaign at risk, so change the samples in the
 * Twilio console first, then this function.
 */
export function formatSms(lead: LeadPayload, route: LeadRoute): string {
  const who = [lead.name, lead.phone, lead.email].filter(Boolean).join(", ");
  return [
    `Skooped alert for ${route.label ?? "your business"}: new website inquiry${who ? ` from ${who}` : ""}.`,
    lead.service ? `Requested: ${stripUrls(lead.service)}.` : "",
    lead.message ? `"${stripUrls(lead.message).slice(0, 200)}"` : "",
    "Reply STOP to opt out.",
  ]
    .filter(Boolean)
    .join(" ");
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

export function parseRouteTable(raw: string | undefined): RouteTable {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? (parsed as RouteTable) : {};
  } catch {
    return {};
  }
}
