/**
 * Handler tests for api/lead.ts, added 2026-08-12.
 *
 * The pure module had 19 tests; the handler had none, and it is the file the
 * Twilio work touches: env gating, the consent guard on the actual send, and
 * the response codes a client site branches on. `fetch` is an unqualified
 * global resolved at call time, so stubbing it exercises the real senders with
 * no network and no Twilio account.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import handler from "../../api/lead.js";

type Call = { url: string; init: RequestInit };

function makeRes() {
  const res = {
    statusCode: 0,
    body: undefined as unknown,
    headers: {} as Record<string, string>,
    setHeader(k: string, v: string) {
      this.headers[k] = v;
    },
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(payload: unknown) {
      this.body = payload;
      return this;
    },
    end() {
      return this;
    },
  };
  return res;
}

const LEAD = { site_id: "gunns-fencing", name: "Erin", phone: "6155739394", message: "top rail broke" };
const CONSENTED = JSON.stringify({
  "gunns-fencing": { sms: "+16155550001", sms_consent_on: "2026-08-11", label: "Gunn's Fencing" },
});

let calls: Call[] = [];

beforeEach(() => {
  calls = [];
  vi.stubGlobal("fetch", vi.fn(async (url: string, init: RequestInit) => {
    calls.push({ url, init });
    return { ok: true, status: 200, text: async () => "" } as unknown as Response;
  }));
  vi.stubEnv("LEAD_ROUTER_SECRET", "");
  for (const k of [
    "TWILIO_ACCOUNT_SID",
    "TWILIO_AUTH_TOKEN",
    "TWILIO_FROM_NUMBER",
    "RESEND_API_KEY",
    "LEAD_FROM_EMAIL",
    "SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "LEAD_ROUTES",
  ]) {
    vi.stubEnv(k, "");
  }
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

const twilioCalls = () => calls.filter((c) => c.url.includes("api.twilio.com"));

describe("dormancy", () => {
  it("answers 503 and sends nothing with no env at all", async () => {
    const res = makeRes();
    await handler({ method: "POST", body: LEAD, headers: {} }, res);
    expect(res.statusCode).toBe(503);
    expect(calls).toHaveLength(0);
  });

  it("stays dormant when Twilio is half configured (SID and FROM but no token)", async () => {
    vi.stubEnv("LEAD_ROUTES", CONSENTED);
    vi.stubEnv("TWILIO_ACCOUNT_SID", "AC123");
    vi.stubEnv("TWILIO_FROM_NUMBER", "+16158809634");
    const res = makeRes();
    await handler({ method: "POST", body: LEAD, headers: {} }, res);
    expect(res.statusCode).toBe(503);
    expect(twilioCalls()).toHaveLength(0);
  });
});

describe("consent guard on the real send path", () => {
  beforeEach(() => {
    vi.stubEnv("TWILIO_ACCOUNT_SID", "AC123");
    vi.stubEnv("TWILIO_AUTH_TOKEN", "token");
    vi.stubEnv("TWILIO_FROM_NUMBER", "+16158809634");
  });

  it("does NOT call Twilio for a route with a number but no consent date", async () => {
    vi.stubEnv("LEAD_ROUTES", JSON.stringify({ "gunns-fencing": { sms: "+16155550001", label: "Gunn's Fencing" } }));
    const res = makeRes();
    await handler({ method: "POST", body: LEAD, headers: {} }, res);
    expect(twilioCalls()).toHaveLength(0);
  });

  it("does NOT call Twilio for a placeholder consent value", async () => {
    vi.stubEnv("LEAD_ROUTES", JSON.stringify({ "gunns-fencing": { sms: "+16155550001", sms_consent_on: "TBD" } }));
    const res = makeRes();
    await handler({ method: "POST", body: LEAD, headers: {} }, res);
    expect(twilioCalls()).toHaveLength(0);
  });

  it("calls Twilio once consent is recorded, with the opt-out line in the body", async () => {
    vi.stubEnv("LEAD_ROUTES", CONSENTED);
    const res = makeRes();
    await handler({ method: "POST", body: LEAD, headers: {} }, res);
    expect(twilioCalls()).toHaveLength(1);
    // URLSearchParams encodes spaces as "+", which decodeURIComponent leaves alone.
    const body = decodeURIComponent(String(twilioCalls()[0].init.body)).replace(/\+/g, " ");
    expect(body).toContain("Reply STOP to opt out.");
    expect(body).toContain("To= 16155550001");
    expect(body).toContain("From= 16158809634");
    expect(res.statusCode).toBe(200);
  });
});

describe("shared secret gate", () => {
  it("401s an unauthenticated post once the secret is set", async () => {
    vi.stubEnv("LEAD_ROUTER_SECRET", "s3cret");
    vi.stubEnv("LEAD_ROUTES", CONSENTED);
    const res = makeRes();
    await handler({ method: "POST", body: LEAD, headers: {} }, res);
    expect(res.statusCode).toBe(401);
    expect(calls).toHaveLength(0);
  });

  it("accepts the post when the header matches", async () => {
    vi.stubEnv("LEAD_ROUTER_SECRET", "s3cret");
    vi.stubEnv("LEAD_ROUTES", CONSENTED);
    vi.stubEnv("SUPABASE_URL", "https://db.example.com");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "key");
    const res = makeRes();
    await handler({ method: "POST", body: LEAD, headers: { "x-skooped-secret": "s3cret" } }, res);
    expect(res.statusCode).toBe(200);
  });
});

describe("failure is not reported as success", () => {
  it("502s when every configured sender fails", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 500, text: async () => "" }) as unknown as Response));
    vi.stubEnv("LEAD_ROUTES", CONSENTED);
    vi.stubEnv("SUPABASE_URL", "https://db.example.com");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "key");
    const res = makeRes();
    await handler({ method: "POST", body: LEAD, headers: {} }, res);
    expect(res.statusCode).toBe(502);
    expect((res.body as { ok: boolean }).ok).toBe(false);
  });

  it("still 200s when storage works even though nobody was notified", async () => {
    vi.stubEnv("LEAD_ROUTES", CONSENTED);
    vi.stubEnv("SUPABASE_URL", "https://db.example.com");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "key");
    const res = makeRes();
    await handler({ method: "POST", body: LEAD, headers: {} }, res);
    expect(res.statusCode).toBe(200);
    expect((res.body as { delivered: { stored: boolean } }).delivered.stored).toBe(true);
  });
});

describe("basics", () => {
  it("405s a GET and 400s a body with no contact detail", async () => {
    const get = makeRes();
    await handler({ method: "GET", headers: {} }, get);
    expect(get.statusCode).toBe(405);

    const bad = makeRes();
    await handler({ method: "POST", body: { site_id: "x" }, headers: {} }, bad);
    expect(bad.statusCode).toBe(400);
  });

  it("swallows a honeypot submission with a fake 200 and no sends", async () => {
    vi.stubEnv("LEAD_ROUTES", CONSENTED);
    vi.stubEnv("SUPABASE_URL", "https://db.example.com");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "key");
    const res = makeRes();
    await handler({ method: "POST", body: { ...LEAD, company_website: "bot" }, headers: {} }, res);
    expect(res.statusCode).toBe(200);
    expect(calls).toHaveLength(0);
  });
});

/* ── Spam gate on the real send path (2026-08-23) ──────────────────────────
 * The pure classifier is covered in lead-core.test.ts. What matters here is
 * that a spam verdict actually reaches the senders: no Twilio call, no Resend
 * call, and the row still lands in Supabase carrying the flag.
 */
describe("spam gate on the real send path", () => {
  const SPAM = {
    site_id: "gunns-fencing",
    name: "Benjamin Clarke",
    phone: "8054002077",
    email: "benjamin.clarke@jmailservice.com",
    message:
      "We drive targeted visitors straight to your website - and your campaign can go live by tomorrow. Are you interested?",
  };

  const allSendersOn = () => {
    vi.stubEnv("LEAD_ROUTES", CONSENTED);
    vi.stubEnv("TWILIO_ACCOUNT_SID", "AC1");
    vi.stubEnv("TWILIO_AUTH_TOKEN", "tok");
    vi.stubEnv("TWILIO_FROM_NUMBER", "+16158809634");
    vi.stubEnv("RESEND_API_KEY", "re_1");
    vi.stubEnv("LEAD_FROM_EMAIL", "leads@skooped.io");
    vi.stubEnv("SUPABASE_URL", "https://db.example.com");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "key");
  };

  const supabaseCalls = () => calls.filter((c) => c.url.includes("db.example.com"));
  const resendCalls = () => calls.filter((c) => c.url.includes("api.resend.com"));

  it("texts and emails nobody about a solicitation, but still stores it flagged", async () => {
    allSendersOn();
    const res = makeRes();
    await handler({ method: "POST", body: SPAM, headers: {} }, res);

    expect(res.statusCode).toBe(200);
    expect(twilioCalls()).toHaveLength(0);
    expect(resendCalls()).toHaveLength(0);
    expect(supabaseCalls()).toHaveLength(1);

    const stored = JSON.parse(supabaseCalls()[0].init.body as string);
    expect(stored.spam).toBe(true);
    expect(stored.spam_reason).toContain("content");
    expect(stored.message).toBe(SPAM.message);
  });

  it("suppresses a blocklisted sender even when the message reads clean", async () => {
    allSendersOn();
    vi.stubEnv("LEAD_BLOCKLIST", JSON.stringify({ phones: ["805-400-2077"] }));
    const res = makeRes();
    await handler(
      { method: "POST", body: { ...SPAM, message: "Can you quote a fence?" }, headers: {} },
      res
    );

    expect(res.statusCode).toBe(200);
    expect(twilioCalls()).toHaveLength(0);
    const stored = JSON.parse(supabaseCalls()[0].init.body as string);
    expect(stored.spam_reason).toBe("blocklist:phone 8054002077");
  });

  it("still texts and emails a real lead with the gate live", async () => {
    allSendersOn();
    // CONSENTED carries no email address, and this case has to prove BOTH legs
    // still fire, so give the route one.
    vi.stubEnv(
      "LEAD_ROUTES",
      JSON.stringify({
        "gunns-fencing": {
          sms: "+16155550001",
          sms_consent_on: "2026-08-11",
          email: "andy@gunnsfencingco.com",
          label: "Gunn's Fencing",
        },
      })
    );
    vi.stubEnv("LEAD_BLOCKLIST", JSON.stringify({ domains: ["jmailservice.com"] }));
    const res = makeRes();
    await handler({ method: "POST", body: LEAD, headers: {} }, res);

    expect(res.statusCode).toBe(200);
    expect(twilioCalls()).toHaveLength(1);
    expect(resendCalls()).toHaveLength(1);
    const stored = JSON.parse(supabaseCalls()[0].init.body as string);
    expect(stored.spam).toBe(false);
    expect(stored.spam_reason).toBeNull();
  });

  it("does not 502 a suppressed lead when storage is unavailable", async () => {
    // Nothing delivered and nothing stored would normally read as total failure.
    // For spam that is the correct outcome, not an error the client site should
    // retry — the Vercel log line carries the lead.
    vi.stubEnv("LEAD_ROUTES", CONSENTED);
    vi.stubEnv("RESEND_API_KEY", "re_1");
    vi.stubEnv("LEAD_FROM_EMAIL", "leads@skooped.io");
    const res = makeRes();
    await handler({ method: "POST", body: SPAM, headers: {} }, res);
    expect(res.statusCode).toBe(200);
    expect(calls).toHaveLength(0);
  });

  it("falls back to a store without the spam columns if the database lacks them", async () => {
    allSendersOn();
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, init: RequestInit) => {
        calls.push({ url, init });
        const body = JSON.parse((init.body as string) ?? "{}");
        const unknownColumn = url.includes("db.example.com") && "spam" in body;
        return {
          ok: !unknownColumn,
          status: unknownColumn ? 400 : 200,
          text: async () => "",
        } as unknown as Response;
      })
    );
    const res = makeRes();
    await handler({ method: "POST", body: SPAM, headers: {} }, res);

    expect(res.statusCode).toBe(200);
    expect(supabaseCalls()).toHaveLength(2);
    const retried = JSON.parse(supabaseCalls()[1].init.body as string);
    expect("spam" in retried).toBe(false);
    expect(retried.message).toBe(SPAM.message);
  });
});
