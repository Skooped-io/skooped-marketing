/**
 * First-party ad attribution. captureAttribution() runs once at app boot and stores
 * the visit's UTM params (last ad touch wins; organic visits never overwrite a stored
 * ad touch, so a Meta click that comes back via Google two days later still credits
 * the ad). getAttributionLine() stamps that source into every composed lead.
 *
 * When the contact form swaps from composed SMS/mailto to the api/lead POST, send
 * getAttribution() along — the router schema already carries source_url, and the
 * line can ride in `message` until dedicated columns exist.
 */

const KEY = "skooped_attrib";

export interface Attribution {
  source: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  landing: string;
  ts: string;
}

export function captureAttribution(): void {
  try {
    const p = new URLSearchParams(window.location.search);
    const source = p.get("utm_source");
    if (!source) return;
    const attrib: Attribution = {
      source,
      medium: p.get("utm_medium") ?? undefined,
      campaign: p.get("utm_campaign") ?? undefined,
      content: p.get("utm_content") ?? undefined,
      term: p.get("utm_term") ?? undefined,
      landing: window.location.pathname,
      ts: new Date().toISOString(),
    };
    localStorage.setItem(KEY, JSON.stringify(attrib));
  } catch {
    /* storage blocked — attribution is best-effort */
  }
}

export function getAttribution(): Attribution | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

/** One line for composed leads, e.g. "Ad source: facebook / paid-social / roofing-july → /templates/roofing" */
export function getAttributionLine(): string | null {
  const a = getAttribution();
  if (!a?.source) return null;
  const parts = [a.source, a.medium, a.campaign, a.content].filter(Boolean).join(" / ");
  return `Ad source: ${parts} → ${a.landing}`;
}
