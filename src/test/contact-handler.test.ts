/**
 * Handler tests for api/contact.ts — skooped.io's own form endpoint.
 * The properties that matter: site_id is FORCED to "skooped" (a forged post can
 * never reach a client's route), the shared secret is deliberately NOT required
 * (a browser cannot hold one), and the honeypot/dormancy/failure semantics
 * match /api/lead.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import handler from "../../api/contact.js";

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

const ROUTES = JSON.stringify({
  skooped: { sms: "+16153151541", sms_consent_on: "2026-08-12", email: "joseph@skooped.io", label: "Skooped" },
  "gunns-fencing": { sms: "+16155550001", sms_consent_on: "2026-08-11", label: "Gunn's Fencing" },
});

let calls: Call[] = [];

beforeEach(() => {
  calls = [];
  vi.stubGlobal("fetch", vi.fn(async (url: string, init: RequestInit) => {
    calls.push({ url, init });
    return { ok: true, status: 200, text: async () => "" } as unknown as Response;
  }));
  for (const k of [
    "LEAD_ROUTER_SECRET",
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

describe("site_id is forced to skooped", () => {
  beforeEach(() => {
    vi.stubEnv("TWILIO_ACCOUNT_SID", "AC123");
    vi.stubEnv("TWILIO_AUTH_TOKEN", "token");
    vi.stubEnv("TWILIO_FROM_NUMBER", "+16158809634");
    vi.stubEnv("LEAD_ROUTES", ROUTES);
  });

  it("routes to the skooped entry even when the body claims a client site_id", async () => {
    const res = makeRes();
    await handler({ method: "POST", body: { site_id: "gunns-fencing", phone: "6155550100", name: "Spoof" } }, res);
    expect(res.statusCode).toBe(200);
    expect(twilioCalls()).toHaveLength(1);
    const body = decodeURIComponent(String(twilioCalls()[0].init.body)).replace(/\+/g, " ");
    expect(body).toContain("To= 16153151541"); // Joseph's route, not the client's
    expect(body).not.toContain("16155550001");
  });

  it("stores the lead under site_id skooped", async () => {
    vi.stubEnv("SUPABASE_URL", "https://db.example.com");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "key");
    const res = makeRes();
    await handler({ method: "POST", body: { site_id: "gunns-fencing", phone: "6155550100" } }, res);
    const store = calls.find((c) => c.url.includes("db.example.com"));
    expect(store).toBeDefined();
    expect(JSON.parse(String(store!.init.body)).site_id).toBe("skooped");
  });
});

describe("no shared secret required (browser caller)", () => {
  it("delivers without the x-skooped-secret header even when the secret is set", async () => {
    vi.stubEnv("LEAD_ROUTER_SECRET", "s3cret");
    vi.stubEnv("LEAD_ROUTES", ROUTES);
    vi.stubEnv("SUPABASE_URL", "https://db.example.com");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "key");
    const res = makeRes();
    await handler({ method: "POST", body: { phone: "6155550100", name: "Visitor" } }, res);
    expect(res.statusCode).toBe(200);
  });
});

describe("dormancy, honeypot, basics", () => {
  it("answers 503 and sends nothing with no env at all", async () => {
    const res = makeRes();
    await handler({ method: "POST", body: { phone: "6155550100" } }, res);
    expect(res.statusCode).toBe(503);
    expect(calls).toHaveLength(0);
  });

  it("swallows a honeypot submission with a fake 200 and no sends", async () => {
    vi.stubEnv("LEAD_ROUTES", ROUTES);
    vi.stubEnv("SUPABASE_URL", "https://db.example.com");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "key");
    const res = makeRes();
    await handler({ method: "POST", body: { phone: "6155550100", company_website: "bot" } }, res);
    expect(res.statusCode).toBe(200);
    expect(calls).toHaveLength(0);
  });

  it("405s a GET and 400s a body with no contact detail", async () => {
    const get = makeRes();
    await handler({ method: "GET" }, get);
    expect(get.statusCode).toBe(405);

    const bad = makeRes();
    await handler({ method: "POST", body: { name: "no contact info" } }, bad);
    expect(bad.statusCode).toBe(400);
  });

  it("502s when every configured sender fails", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 500, text: async () => "" }) as unknown as Response));
    vi.stubEnv("LEAD_ROUTES", ROUTES);
    vi.stubEnv("SUPABASE_URL", "https://db.example.com");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "key");
    const res = makeRes();
    await handler({ method: "POST", body: { phone: "6155550100" } }, res);
    expect(res.statusCode).toBe(502);
  });
});

/**
 * The spam gate applies to Skooped's own form too. The risk here is the mirror
 * image of a client's: our real inbound is people asking for SEO and websites,
 * so a topical lead must survive while a pitch aimed at us must not.
 */
describe("spam gate on the dogfood route", () => {
  const on = () => {
    vi.stubEnv("LEAD_ROUTES", ROUTES);
    vi.stubEnv("TWILIO_ACCOUNT_SID", "AC1");
    vi.stubEnv("TWILIO_AUTH_TOKEN", "tok");
    vi.stubEnv("TWILIO_FROM_NUMBER", "+16158809634");
    vi.stubEnv("RESEND_API_KEY", "re_1");
    vi.stubEnv("LEAD_FROM_EMAIL", "leads@skooped.io");
    vi.stubEnv("SUPABASE_URL", "https://db.example.com");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "key");
  };

  it("suppresses an agency pitch aimed at Skooped and stores it flagged", async () => {
    on();
    const res = makeRes();
    await handler(
      {
        method: "POST",
        body: {
          name: "Hannah Melotto",
          email: "hannah@melottogroup.com",
          message:
            "Hi, I'm Hannah from Melotto Group. We help businesses redesign their websites and improve their content.",
        },
      },
      res
    );

    expect(res.statusCode).toBe(200);
    expect(calls.filter((c) => c.url.includes("api.twilio.com"))).toHaveLength(0);
    expect(calls.filter((c) => c.url.includes("api.resend.com"))).toHaveLength(0);
    const stored = JSON.parse(calls.filter((c) => c.url.includes("db.example.com"))[0].init.body as string);
    expect(stored.site_id).toBe("skooped");
    expect(stored.spam).toBe(true);
  });

  it("still alerts on a prospect asking us for the very services spam pitches", async () => {
    on();
    const res = makeRes();
    await handler(
      {
        method: "POST",
        body: {
          name: "Dana Whitfield",
          phone: "6155550123",
          message:
            "I need help with SEO and a new website for my plumbing business. Are you taking on new clients?",
        },
      },
      res
    );

    expect(res.statusCode).toBe(200);
    expect(calls.filter((c) => c.url.includes("api.twilio.com"))).toHaveLength(1);
  });
});
