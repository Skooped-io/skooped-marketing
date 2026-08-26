import { describe, it, expect } from "vitest";
import {
  validateLead,
  resolveRoute,
  formatSms,
  formatEmail,
  parseRouteTable,
  smsAllowed,
  classifyLead,
  parseBlocklist,
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

describe("formatSms (no email addresses in the body, per the registration)", () => {
  const route = { label: "Affordable Elegance", sms: "+16155550001", sms_consent_on: "2026-08-11" };

  it("names the inquirer and their phone, never their email address", () => {
    const body = formatSms(
      { site_id: "affordable-elegance", name: "Jane Doe", phone: "6155550142", email: "jane@example.com" },
      route
    );
    expect(body).not.toContain("@");
    expect(body).toBe(
      "Skooped alert for Affordable Elegance: new website inquiry from Jane Doe, 6155550142. Reply STOP to opt out."
    );
  });

  it("says the address is on file when the lead left no phone", () => {
    const body = formatSms({ site_id: "x", name: "Jane Doe", email: "jane@example.com" }, route);
    expect(body).not.toContain("@");
    expect(body).toContain("Email on file.");
  });

  it("redacts an email address typed inside the free-text message", () => {
    const body = formatSms(
      { site_id: "x", phone: "6155550142", message: "reach me at jane.doe@example.com any time" },
      route
    );
    expect(body).not.toContain("@");
    expect(body).toContain("[email]");
  });

  it("leaves ordinary prose alone when a period has no space after it", () => {
    const body = formatSms({ site_id: "x", phone: "6155550142", message: "Thanks.Please call me" }, route);
    expect(body).toContain("Thanks.Please call me");
    expect(body).not.toContain("[link]");
  });
});

/* ── Spam gate (2026-08-23) ────────────────────────────────────────────────
 * The four spam bodies below are verbatim from the central leads table on
 * 2026-08-22 (3 client sites); the "must survive" bodies are verbatim real
 * client leads from the same table. If a change makes one of those trip, the
 * change is wrong: eating a real lead costs far more than one spam email.
 */

const REAL_SPAM = [
  {
    what: "tonya-mills 8/20, the one the client forwarded",
    lead: {
      site_id: "tonya-mills",
      name: "Benjamin Clarke",
      phone: "8054002077",
      email: "benjamin.clarke@jmailservice.com",
      message:
        "We drive targeted visitors straight to your website - and your campaign can go live by tomorrow.\nAre you interested?",
    },
  },
  {
    what: "squishy-clean 8/20, same sender, different client",
    lead: {
      site_id: "squishy-clean",
      name: "Gabrielle Simmons",
      phone: "8054002077",
      email: "gabrielle.simmons@jmailservice.com",
      message:
        "Most businesses struggle to get noticed online. We solve that by putting your brand above the competition on major search engines. Are you interested?",
    },
  },
  {
    what: "squishy-clean 8/21, BOL7 platform pitch",
    lead: {
      site_id: "squishy-clean",
      name: "Shashank BOL7 Technologies",
      phone: "+1 (555) 703-8289",
      email: "bol7technologies1@gmail.com",
      message:
        "Hello, I'm Shashank from BOL7.\n\nWe offer an all-in-one platform for WhatsApp, SMS and email marketing, AI chatbots, CRM, and lead generation.",
    },
  },
  {
    what: "affordable-elegance 8/18, web redesign pitch",
    lead: {
      site_id: "affordable-elegance",
      name: "Hannah Melotto",
      phone: "2158218810",
      email: "hannah.melotto@melottogroup.com",
      message:
        "Hi, I'm Hannah from Melotto Group. We help businesses redesign their websites and improve their content so they look more professional.",
    },
  },
];

const REAL_LEADS = [
  {
    what: "findi referral",
    lead: {
      site_id: "findi-longevity",
      name: "Quinn Huff",
      email: "qhuff@pm.me",
      message:
        "My sister, Kendra Huff, just started with y'all and recommended me to reach out. I've got some gut health issues that started last year.",
      service: "Functional Medicine",
    },
  },
  {
    what: "southside multi-service, opens with 'we use'",
    lead: {
      site_id: "southside-grounds",
      name: "Madeline Foster",
      phone: "3525401026",
      message:
        "Total lawn care. Right now we use different companies for each service in our yard - weed treatment, grass cutting, etc.",
      service: "other",
    },
  },
  {
    what: "southside mulch, contains 'we are interested in'",
    lead: {
      site_id: "southside-grounds",
      name: "Emily Newman",
      phone: "8658066831",
      message:
        "We have some existing mulch beds along the front/side of our house that we are interested in cleaning up/adding to.",
      service: "landscaping-services",
    },
  },
  {
    what: "limo booking, opens with 'We need'",
    lead: {
      site_id: "affordable-elegance",
      name: "Ana Rogers",
      phone: "8049377327",
      message:
        "We need to be picked up at 2216 Belmont Boulevard at 12:30 and dropped off at Arrington Vineyard.",
      service: "Distillery / Winery Tour",
    },
  },
  {
    what: "a Skooped prospect asking for the exact services spam pitches",
    lead: {
      site_id: "skooped",
      name: "Dana Whitfield",
      phone: "6155550123",
      email: "dana@whitfieldplumbing.com",
      message:
        "I need help with SEO and a new website for my plumbing business. Are you taking on new clients this month?",
    },
  },
];

describe("classifyLead (content score)", () => {
  for (const c of REAL_SPAM) {
    it(`flags real spam: ${c.what}`, () => {
      const v = classifyLead(c.lead);
      expect(v.spam).toBe(true);
      expect(v.reason).toContain("content");
    });
  }

  for (const c of REAL_LEADS) {
    it(`lets a real lead through: ${c.what}`, () => {
      expect(classifyLead(c.lead).spam).toBe(false);
    });
  }

  it("never convicts on topic words alone", () => {
    const v = classifyLead({
      site_id: "skooped",
      email: "a@b.com",
      message: "Do you do SEO, web design and social media marketing? What is the cost?",
    });
    expect(v.spam).toBe(false);
  });

  it("scores nothing when the lead left no free text", () => {
    const v = classifyLead({ site_id: "gunns-fencing", phone: "6155550100", name: "Erin" });
    expect(v.spam).toBe(false);
    expect(v.score).toBe(0);
  });
});

describe("classifyLead (blocklist)", () => {
  const list = parseBlocklist(
    JSON.stringify({
      emails: ["Someone@Example.COM"],
      domains: ["@jmailservice.com"],
      phones: ["(805) 400-2077"],
    })
  );

  it("matches an email case-insensitively", () => {
    const v = classifyLead({ site_id: "x", email: "SOMEONE@example.com" }, list);
    expect(v.spam).toBe(true);
    expect(v.reason).toBe("blocklist:email someone@example.com");
  });

  it("matches a domain whether or not the @ was pasted", () => {
    const v = classifyLead({ site_id: "x", email: "brand.new.name@jmailservice.com" }, list);
    expect(v.spam).toBe(true);
    expect(v.reason).toBe("blocklist:domain jmailservice.com");
  });

  it("matches a phone regardless of formatting", () => {
    const v = classifyLead({ site_id: "x", phone: "805-400-2077" }, list);
    expect(v.spam).toBe(true);
    expect(v.reason).toBe("blocklist:phone 8054002077");
  });

  it("leaves an unlisted sender to the content score", () => {
    expect(classifyLead({ site_id: "x", email: "jane@gmail.com", message: "Need a quote" }, list).spam).toBe(false);
  });
});

describe("parseBlocklist (bad shapes a person can paste)", () => {
  it("blocks nothing on missing, invalid or wrongly-shaped input", () => {
    for (const raw of [undefined, "", "not json", "[]", '"a string"', "42"]) {
      const b = parseBlocklist(raw as string | undefined);
      expect(b.emails).toEqual([]);
      expect(b.domains).toEqual([]);
      expect(b.phones).toEqual([]);
    }
  });

  it("drops non-string entries instead of crashing at match time", () => {
    const b = parseBlocklist(JSON.stringify({ emails: ["a@b.com", 7, null], phones: ["abc"] }));
    expect(b.emails).toEqual(["a@b.com"]);
    expect(b.phones).toEqual([]);
  });
});

/* ── Escapes from the first version, fixed 2026-08-26 ──────────────────────
 * Both are verbatim from the leads table. They reached clients on 8/25 because
 * the v1 score only understood a hard pitch ("we offer X for your website, are
 * you interested?"). These open soft: they explain why they are writing, ask
 * permission to pitch, and never ask for anything. That is now its own signal
 * class, balanced by REAL_INTENT so a lead that actually asks for something
 * loses points before it is compared.
 */
describe("classifyLead (soft-open cold outreach, the 8/25 escapes)", () => {
  it("flags the Top Talent VAs pitch that reached Tonya", () => {
    const v = classifyLead({
      site_id: "tonya-mills",
      name: "Bianca Foster",
      phone: "(650) 887-7769",
      email: "bianca@toptalentvas.com",
      message:
        "I tried emailing you, but it seems it didn't go through, so I'm reaching out here instead.\n\nI'm Bianca, from Top Talent VAs.\n\nI'm reaching out because we offer Virtual Assistants powered by our custom-built AI tools. We literally can take over your entire marketing, administrative tasks, graphic design, video animations, accounting, and even all your prospecting with our system.\n\nAre you interested in learning more?",
    });
    expect(v.spam).toBe(true);
  });

  it("flags the permission-ask AI-search pitch that reached Rochelle", () => {
    const v = classifyLead({
      site_id: "rochelle-inc",
      name: "Gloria Mueller",
      email: "muellergloriamkt@gmail.com",
      message:
        "Hello rochelleinc\nI was wondering if you'd be interested in seeing a few things I noticed about your website and its visibility in AI-powered search.\nI put together a few simple suggestions specifically for your business. They're completely free to review.\nWould it be okay if I sent them over?\nThank you!\nGloria Mueller",
    });
    expect(v.spam).toBe(true);
  });

  it("flags the pain-then-pitch opener", () => {
    const v = classifyLead({
      site_id: "squishy-clean",
      email: "x@example.net",
      message:
        "Most businesses struggle to get noticed online. We solve that by putting your brand above the competition on major search engines.",
    });
    expect(v.spam).toBe(true);
  });

  it("does not hand a spammer free credit for a form's appended Event date", () => {
    // A limo-form blast filled it with "51201-02-02". A real year still earns
    // the real-intent discount; nonsense does not.
    const pitch =
      "We place your business right where people are already searching for your services - setup usually takes less than 24 hours.\nAre you interested?";
    expect(classifyLead({ site_id: "affordable-elegance", email: "a@b.co", message: `${pitch}\nEvent date: 51201-02-02` }).spam).toBe(true);
  });
});

describe("classifyLead (real leads keep their benefit of the doubt)", () => {
  const MUST_PASS = [
    ["a booking with a real event date", "Need just a point to point transfer to BNA Hilton from Brentwood Country Club\nEvent date: 2026-09-19"],
    ["a long, polite price request", "I'm looking for transportation for 7 passengers on Saturday, February 27, 2027. Could you give me the hourly rate and estimated all-in total for each vehicle, including any gratuity, service/fuel fees, or other charges?"],
    ["a referral", "My sister just started with y'all and recommended me to reach out. I've got some gut health issues."],
    ["a homeowner describing their yard", "We have some existing mulch beds along the front/side of our house that we are interested in cleaning up/adding to."],
    ["someone who says 'we use' and 'we need'", "Total lawn care. Right now we use different companies for each service in our yard - weed treatment, grass cutting, etc."],
    ["a prospect asking Skooped for the services spam sells", "I need help with SEO and a new website for my plumbing business. Are you taking on new clients this month?"],
    ["a prospect who introduces themselves by company", "Hi, I'm Sarah from Brentwood Elementary. We need a quote for about 200 feet of chain link fence around the playground."],
  ] as const;

  for (const [what, message] of MUST_PASS) {
    it(`lets through: ${what}`, () => {
      expect(classifyLead({ site_id: "x", email: "a@b.com", message }).spam).toBe(false);
    });
  }
});
