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
