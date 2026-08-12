import { describe, it, expect } from "vitest";
import {
  validateLead,
  resolveRoute,
  formatSms,
  formatEmail,
  parseRouteTable,
  smsAllowed,
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
    default: { sms: "+16153151541", email: "joseph@skooped.io", label: "Skooped" },
  };

  it("routes a known site_id to its owner", () => {
    expect(resolveRoute(table, "gunns-fencing")?.sms).toBe("+16155550001");
  });

  it("falls back to the default route", () => {
    expect(resolveRoute(table, "unknown-site")?.email).toBe("joseph@skooped.io");
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

  it("keeps the SMS shaped like the registered A2P samples", () => {
    const sms = formatSms(lead, route);
    expect(sms.startsWith("Skooped alert for Gunn's Fencing: new website inquiry")).toBe(true);
    expect(sms.endsWith("Reply STOP to opt out.")).toBe(true);
    expect(sms).not.toMatch(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u); // no emoji
  });

  it("strips URLs out of the SMS body (embedded links attested NO)", () => {
    const sms = formatSms(
      { ...lead, message: "see https://spam.example.com and www.spam.example.com" },
      route
    );
    expect(sms).not.toContain("http");
    expect(sms).not.toContain("www.");
    expect(sms).toContain("[link]");
  });

  it("builds an email with subject and body", () => {
    const { subject, text } = formatEmail(lead, route);
    expect(subject).toContain("Gunn's Fencing");
    expect(subject).toContain("Jane Doe");
    expect(text).toContain("Phone: 615-555-0100");
    expect(text).toContain("Interested in: Fence quote");
  });
});

describe("smsAllowed (consent gate)", () => {
  it("refuses a number with no recorded consent", () => {
    expect(smsAllowed({ sms: "+16155550001", email: "a@b.com" })).toBe(false);
  });

  it("allows a number once written consent is recorded", () => {
    expect(smsAllowed({ sms: "+16155550001", sms_consent_on: "2026-08-12" })).toBe(true);
  });

  it("refuses a consent date with no number", () => {
    expect(smsAllowed({ sms_consent_on: "2026-08-12", email: "a@b.com" })).toBe(false);
  });

  it("refuses an email-only route", () => {
    expect(smsAllowed({ email: "a@b.com", label: "Someone" })).toBe(false);
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

// ─── Hardening added 2026-08-12, ahead of the Twilio session ─────────────────

describe("smsAllowed (validation, not just truthiness)", () => {
  it("refuses a placeholder consent value typed while wiring", () => {
    for (const junk of ["TBD", "asked him", "yesterday", "true", " "]) {
      expect(smsAllowed({ sms: "+16155550001", sms_consent_on: junk })).toBe(false);
    }
  });

  it("refuses a consent date in the future: nobody has consented yet", () => {
    expect(smsAllowed({ sms: "+16155550001", sms_consent_on: "2099-01-01" }, "2026-08-12")).toBe(false);
  });

  it("refuses a destination number Twilio would reject", () => {
    for (const bad of ["6155550001", "(615) 555-0001", "+1 615 555 0001", "+1615555000A", "615-555-0001 ext 12"]) {
      expect(smsAllowed({ sms: bad, sms_consent_on: "2026-08-12" })).toBe(false);
    }
  });

  it("still allows a valid E.164 number with a real past consent date", () => {
    expect(smsAllowed({ sms: "+16155550001", sms_consent_on: "2026-08-11" }, "2026-08-12")).toBe(true);
  });
});

describe("formatSms (A2P attestations)", () => {
  const route = { label: "Gunn's Fencing", sms: "+16155550001", sms_consent_on: "2026-08-12" };

  it("strips bare domains, not just prefixed URLs", () => {
    const body = formatSms({ site_id: "x", phone: "6155550001", message: "check skooped.io and bit.ly/abc first" }, route);
    expect(body).not.toMatch(/skooped\.io/);
    expect(body).not.toMatch(/bit\.ly/);
    expect(body).toContain("[link]");
  });

  it("never exceeds two segments, and keeps the opt-out line when it truncates", () => {
    const body = formatSms(
      { site_id: "x", phone: "6155550001", name: "A".repeat(200), service: "B".repeat(300), message: "C".repeat(900) },
      route
    );
    expect(body.length).toBeLessThanOrEqual(320);
    expect(body.endsWith("Reply STOP to opt out.")).toBe(true);
  });

  it("keeps the registered sample shape for an ordinary lead", () => {
    const body = formatSms({ site_id: "x", name: "Erin", phone: "6155739394", service: "chain link repair" }, route);
    expect(body).toBe(
      "Skooped alert for Gunn's Fencing: new website inquiry from Erin, 6155739394. Requested: chain link repair. Reply STOP to opt out."
    );
    expect(body).not.toMatch(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u);
  });
});

describe("parseRouteTable (bad shapes a person can paste)", () => {
  it("rejects an array, which used to pass as a table matching nothing", () => {
    expect(parseRouteTable('[{"sms":"+16155550001"}]')).toEqual({});
  });

  it("drops junk entries instead of crashing at send time", () => {
    const table = parseRouteTable('{"a":"nope","b":["x"],"c":{"sms":"+16155550001","label":"C"}}');
    expect(table.a).toBeUndefined();
    expect(table.b).toBeUndefined();
    expect(table.c.sms).toBe("+16155550001");
  });

  it("trims whitespace a copy-paste leaves behind", () => {
    const table = parseRouteTable('{"a":{"sms":" +16155550001 ","sms_consent_on":" 2026-08-12 "}}');
    expect(smsAllowed(table.a, "2026-08-12")).toBe(true);
  });
});
