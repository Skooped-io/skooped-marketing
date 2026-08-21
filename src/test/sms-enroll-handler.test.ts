/**
 * Handler tests for api/sms-enroll.ts (2026-08-20): the endpoint that texts a
 * client their one-time enrollment confirmation. It must fail closed on every
 * path except "secret matches AND a valid written consent is on the route".
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import handler from "../../api/sms-enroll.js";
import { ENROLLMENT_CONFIRMATION } from "../../api/_lead-core.js";

type Call = { url: string; init: RequestInit };

function makeRes() {
  return {
    statusCode: 0,
    body: undefined as unknown,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(payload: unknown) {
      this.body = payload;
      return this;
    },
  };
}

const ROUTES = JSON.stringify({
  "gunns-fencing": { label: "Gunn's Fencing", sms: "+16155550001", sms_consent_on: "2026-08-11" },
  "rios-landscaping": { label: "Rios Landscaping" },
  default: { label: "Skooped", email: "joseph@skooped.io" },
});

let calls: Call[] = [];

beforeEach(() => {
  calls = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init: RequestInit) => {
      calls.push({ url, init });
      return {
        ok: true,
        status: 201,
        text: async () => JSON.stringify({ sid: "SMtest123", status: "queued" }),
      } as unknown as Response;
    })
  );
  vi.stubEnv("LEAD_ROUTER_SECRET", "s3cret");
  vi.stubEnv("LEAD_ROUTES", ROUTES);
  vi.stubEnv("TWILIO_ACCOUNT_SID", "ACtest");
  vi.stubEnv("TWILIO_AUTH_TOKEN", "tok");
  vi.stubEnv("TWILIO_FROM_NUMBER", "+16158809634");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

function post(body: unknown, secret?: string) {
  return { method: "POST", headers: secret ? { "x-skooped-secret": secret } : {}, body };
}

describe("api/sms-enroll", () => {
  it("sends exactly the registered confirmation to the consented number", async () => {
    const res = makeRes();
    await handler(post({ site_id: "gunns-fencing" }, "s3cret"), res);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({ ok: true, sid: "SMtest123", status: "queued", to_last4: "0001" });
    expect(calls).toHaveLength(1);
    const params = new URLSearchParams(calls[0].init.body as string);
    expect(params.get("To")).toBe("+16155550001");
    expect(params.get("From")).toBe("+16158809634");
    expect(params.get("Body")).toBe(ENROLLMENT_CONFIRMATION);
  });

  it("refuses to run at all when no secret is configured", async () => {
    vi.stubEnv("LEAD_ROUTER_SECRET", "");
    const res = makeRes();
    await handler(post({ site_id: "gunns-fencing" }), res);
    expect(res.statusCode).toBe(503);
    expect(calls).toHaveLength(0);
  });

  it("rejects a wrong or missing secret", async () => {
    const res = makeRes();
    await handler(post({ site_id: "gunns-fencing" }, "nope"), res);
    expect(res.statusCode).toBe(401);
    expect(calls).toHaveLength(0);
  });

  it("never falls back to the default route for an unknown site_id", async () => {
    const res = makeRes();
    await handler(post({ site_id: "typo-fencing" }, "s3cret"), res);
    expect(res.statusCode).toBe(404);
    expect(calls).toHaveLength(0);
  });

  it("refuses a route with no written consent on file", async () => {
    const res = makeRes();
    await handler(post({ site_id: "rios-landscaping" }, "s3cret"), res);
    expect(res.statusCode).toBe(409);
    expect(calls).toHaveLength(0);
  });

  it("surfaces a Twilio rejection instead of claiming success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: false, status: 400, text: async () => '{"code":21211}' }) as unknown as Response)
    );
    const res = makeRes();
    await handler(post({ site_id: "gunns-fencing" }, "s3cret"), res);
    expect(res.statusCode).toBe(502);
  });

  it("answers 405 to anything but POST", async () => {
    const res = makeRes();
    await handler({ method: "GET", headers: {} }, res);
    expect(res.statusCode).toBe(405);
  });
});
