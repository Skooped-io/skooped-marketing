import { describe, it, expect } from "vitest";
import {
  validateLead,
  resolveRoute,
  formatSms,
  formatEmail,
  parseRouteTable,
  type RouteTable,
} from "../../api/_lead-core";

describe("validateLead", () => {
  it("accepts a minimal valid lead", () => {
    const r = validateLead({ site_id: "gunns-fencing", phone: "615-555-0100" });
    expect(r.ok).toBe(true);
    expect(r.spam).toBeUndefined();
    expect(r.lead?.site_id).toBe("gunns-fencing");
  });

  it("rejects a lead without site_id", () => {
    const r = validateLead({ phone: "615-555-0100" });
    expect(r.ok).toBe(false);
    expect(r.error).toMatch(/site_id/);
  });

  it("rejects a lead with no contact info", () => {
    const r = validateLead({ site_id: "x", name: "Bob" });
    expect(r.ok).toBe(false);
    expect(r.error).toMatch(/phone or email/);
  });

  it("rejects non-object bodies", () => {
    expect(validateLead("nope").ok).toBe(false);
    expect(validateLead(null).ok).toBe(false);
  });

  it("flags the honeypot as spam but ok", () => {
    const r = validateLead({ site_id: "x", phone: "1", company_website: "spam.biz" });
    expect(r.ok).toBe(true);
    expect(r.spam).toBe(true);
  });

  it("trims and clips oversized fields", () => {
    const r = validateLead({ site_id: "  x  ", phone: "1", message: "a".repeat(5000) });
    expect(r.lead?.site_id).toBe("x");
    expect(r.lead?.message?.length).toBe(2000);
  });
});

describe("resolveRoute", () => {
  const table: RouteTable = {
    "gunns-fencing": { sms: "+16155550001", label: "Gunn's Fencing" },
    default: { sms: "+16153151541", email: "cooper@skooped.io", label: "Skooped" },
  };

  it("routes a known site_id to its owner", () => {
    expect(resolveRoute(table, "gunns-fencing")?.sms).toBe("+16155550001");
  });

  it("falls back to the default route", () => {
    expect(resolveRoute(table, "unknown-site")?.email).toBe("cooper@skooped.io");
  });

  it("returns undefined with an empty table", () => {
    expect(resolveRoute({}, "anything")).toBeUndefined();
  });
});

describe("formatting", () => {
  const lead = {
    site_id: "gunns-fencing",
    name: "Jane Doe",
    phone: "615-555-0100",
    service: "Fence quote",
    message: "Need ~120ft of privacy fence.",
  };
  const route = { sms: "+16155550001", email: "andy@example.com", label: "Gunn's Fencing" };

  it("builds a compact SMS with the essentials", () => {
    const sms = formatSms(lead, route);
    expect(sms).toContain("Gunn's Fencing");
    expect(sms).toContain("Jane Doe");
    expect(sms).toContain("615-555-0100");
    expect(sms).toContain("privacy fence");
  });

  it("builds an email with subject and body", () => {
    const { subject, text } = formatEmail(lead, route);
    expect(subject).toContain("Gunn's Fencing");
    expect(subject).toContain("Jane Doe");
    expect(text).toContain("Phone: 615-555-0100");
    expect(text).toContain("Interested in: Fence quote");
  });
});

describe("parseRouteTable", () => {
  it("parses valid JSON", () => {
    expect(parseRouteTable('{"a":{"sms":"+1"}}').a.sms).toBe("+1");
  });
  it("returns empty on missing or invalid input", () => {
    expect(parseRouteTable(undefined)).toEqual({});
    expect(parseRouteTable("not json")).toEqual({});
    expect(parseRouteTable('"a string"')).toEqual({});
  });
});
