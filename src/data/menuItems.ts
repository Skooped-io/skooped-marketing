/**
 * The Skooped menu — one detail page per offering (/plans/:slug).
 *
 * Source of truth for prices & deliverables: GROWTH-PLAN-2026-07.md §2 (the locked
 * price grid) in the HQ repo. Keep this file in sync with SundaeBuilder.tsx, the Stripe
 * catalog (STRIPE-CATALOG-2026-07.md), and the /plans copy. Theme names always carry a
 * plain-English subtitle (Joseph's rule, 2026-07-14).
 */

import cup1 from "@/assets/sundae/cup-1.png";
import waffle1 from "@/assets/sundae/waffle-1.png";
import waffle2 from "@/assets/sundae/waffle-2.png";
import waffle3 from "@/assets/sundae/waffle-3.png";
import coupe3 from "@/assets/sundae/coupe-3.png";
import topCherry from "@/assets/sundae/topping-cherry.png";
import topSprinkles from "@/assets/sundae/topping-sprinkles.png";
import topExtra from "@/assets/sundae/topping-extra.png";
import topChocDip from "@/assets/sundae/topping-chocdip.png";
import pintHero from "@/assets/sundae/pint-hero.png";

export type MenuCategory = "build" | "plan" | "topping";

export interface MenuInclude {
  label: string;
  note?: string;
}

export interface MenuFaq {
  q: string;
  a: string;
}

/** Feeds the schema.org Product/Offer JSON-LD on each detail page. */
export interface MenuOffer {
  kind: "fixed" | "from" | "range" | "recurring";
  price?: number; // fixed & recurring
  lowPrice?: number; // from & range
  highPrice?: number; // range
  unit?: "MONTH" | "YEAR"; // recurring cadence
}

export interface MenuItem {
  slug: string;
  category: MenuCategory;
  name: string; // theme name — "Cup"
  subtitle: string; // plain-English — "A 5-page website"
  hero: string;
  priceLabel: string; // "$500", "$49", "from $2,000", "+$350", "10×"
  priceUnit: string; // "one-time", "/mo", "quoted", "once a year"
  popular?: boolean;
  tagline: string; // hero one-liner
  intro: string; // plain-English paragraph
  includesHeading: string;
  includes: MenuInclude[];
  bestFor: string[];
  fits: string; // how it fits with the rest of the menu (prose)
  faq: MenuFaq[];
  related: string[]; // slugs
  cta: { label: string; message: string }; // message → /contact?build=<message>
  /** Live Stripe Payment Link (v2, terms-consent required) — STRIPE-CATALOG-2026-07.md in the
   *  HQ repo is canonical. Omitted = sold by conversation only (Sprinkles is capacity-gated;
   *  toppings and annual prepay get added to a subscription by us, not self-served). */
  payLink?: string;
  payCta?: string; // pay-button label — set whenever payLink is set
  payNote?: string; // one-liner under the pay button: who this checkout is for
  /** Annual (By the Pint) variant — 10× monthly, 2 months free. Setting these renders the
   *  Monthly/Annual toggle on the detail page; the pay button + price swap accordingly. */
  payLinkAnnual?: string;
  payCtaAnnual?: string;
  priceLabelAnnual?: string; // "$490"
  priceUnitAnnual?: string; // "/yr"
  offer: MenuOffer;
  disclaimer?: string;
  seo: { title: string; description: string };
}

/* Shared lead-alert line — the promise on every plan & build. */
const LEAD_ALERTS =
  "Every lead from your site is texted straight to your phone the moment it lands — plus an email, so nothing slips through.";

/* Shared monthly-report answer — every plan includes the report; higher tiers append a line. */
const REPORT_BASE =
  "It's a short, plain-English email once a month — no dashboard to log into and no jargon. It covers your website traffic, the leads that came in and where they came from, exactly what we worked on or changed that month, and confirmation your site stayed online (we monitor uptime around the clock). Your leads still reach your phone by text in real time the moment each one lands — the monthly report is the big-picture recap.";

export const menuItems: Record<string, MenuItem> = {
  /* ═══════════════════ BUILDS (one-time — the cones) ═══════════════════ */

  cup: {
    slug: "cup",
    category: "build",
    name: "Cup",
    subtitle: "A 5-page website — $500 one-time",
    hero: cup1,
    priceLabel: "$500",
    priceUnit: "one-time",
    tagline: "Your first professional website, live in about a week.",
    intro:
      "The Cup is where most businesses start. A clean, fast, mobile-ready 5-page website built from our proven industry library and customized to your business — your name, your services, your service area. Pay $500 once and you own it. It never bills again.",
    includesHeading: "What your $500 gets you",
    includes: [
      { label: "5-page website", note: "Built from our proven industry template library and customized to your business" },
      { label: "Mobile-ready design", note: "Looks right on every phone, tablet, and desktop" },
      { label: "On-page SEO", note: "Page titles, metadata, schema markup, and your Google Business Profile linked" },
      { label: "Lead-capture form", note: "Wired to SMS + email alerts so every inquiry reaches you instantly" },
      { label: "Domain & DNS handled", note: "We buy and set up your domain; the domain itself is billed at cost (~$15–20/yr)" },
      { label: "Launch report", note: "A plain-English summary of what went live and where you stand" },
    ],
    bestFor: [
      "Getting online fast with something that looks professional",
      "Replacing a DIY Wix/Squarespace site or an outdated page",
      "Solo operators and small crews who just need the phone to ring",
    ],
    fits:
      "The Cup is the entry cone. Every build runs on a monthly plan — that's what keeps it hosted, secure, and texting you leads. Most clients start with the Cup + the Single plan: $500 today, then $49/mo from launch.",
    faq: [
      { q: "Is the $500 a one-time payment or a subscription?", a: "One-time. Once the build is paid, it's never billed again. The only ongoing cost is the monthly plan (from $49/mo) that keeps your site running and texting you leads." },
      { q: "Why does a build require a monthly plan?", a: "A website isn't done when it launches — it has to be hosted, secured, updated, and actually working for you. The plan covers all of that plus the part that makes you money: every lead texted to your phone and a monthly report in plain English." },
      { q: "Do I own the website?", a: "Yes. Your website, your content, your domain, your data — always." },
      { q: "How fast will I be online?", a: "About a week from payment to launch. We build from a proven library and customize it, so you're not waiting on an agency timeline." },
    ],
    related: ["waffle-cone", "single", "cherry-on-top"],
    cta: { label: "Get the Cup build — $500", message: "Hey Skooped — I want the Cup build for $500, plus a monthly plan. Let's get started." },
    payLink: "https://buy.stripe.com/3cI28q82B0qg3ZPdyE8Ra06",
    payCta: "Start my build — $500",
    payNote: "Build billed once, today — your monthly plan starts at launch.",
    offer: { kind: "fixed", price: 500 },
    seo: {
      title: "5-Page Website — $500 Flat, Live in a Week | Skooped Franklin TN",
      description:
        "The Cup: a $500 flat-rate 5-page website for local service businesses in Franklin, TN. Mobile-ready, on-page SEO, domain handled, and every lead texted to your phone. Live in about a week.",
    },
  },

  "waffle-cone": {
    slug: "waffle-cone",
    category: "build",
    name: "Waffle Cone",
    subtitle: "Website + Google presence — $1,000 one-time",
    hero: waffle2,
    priceLabel: "$1,000",
    priceUnit: "one-time",
    popular: true,
    tagline: "Everything in the Cup — plus we get you found on Google.",
    intro:
      "The Waffle Cone is the Cup plus the local-search machinery that puts you on the map — literally. We build and optimize your Google Business Profile, put a live reviews widget on your site, add service-area pages so you rank for the towns you cover. It's the build for owners who want to be found, not just online.",
    includesHeading: "What your $1,000 gets you",
    includes: [
      { label: "Everything in the Cup", note: "The full 5-page site, on-page SEO, lead alerts, domain, and launch report" },
      { label: "Google Business Profile", note: "Created, verified, and optimized so you show up in Maps and the local 3-pack" },
      { label: "Google reviews widget", note: "Your real reviews, live on your site, building trust the moment visitors land" },
      { label: "Local SEO", note: "Service-area pages and citation building so you rank in the towns you serve" },
      { label: "30-day post-launch tweak window", note: "We fine-tune after you've seen it live" },
    ],
    bestFor: [
      "Established local businesses that want to show up in Google Maps and search",
      "Owners competing on reviews and local reputation",
      "Anyone serving multiple towns or a wide service area",
    ],
    fits:
      "The Waffle Cone is the middle cone — the most popular build. It pairs naturally with the Double plan, which keeps working your local SEO every month after launch.",
    faq: [
      { q: "What's the difference between the Cup and the Waffle Cone?", a: "The Cup ($500) gets you a professional website. The Waffle Cone ($1,000) adds the Google side — your Business Profile, reviews widget, and local SEO — so you actually get found in local search, not just online." },
      { q: "Do you handle my Google Business Profile?", a: "Yes. We create it (or claim it if it exists), verify it, and optimize it so you show up in Maps and the local 3-pack for the services you offer." },
      { q: "Is this a one-time cost too?", a: "Yes — $1,000 once, never billed again. Like every build, it runs on a monthly plan (Double is the common pairing) that keeps the SEO work going." },
    ],
    related: ["cup", "double", "sundae"],
    cta: { label: "Get the Waffle Cone build — $1,000", message: "Hey Skooped — I want the Waffle Cone build for $1,000, plus a monthly plan. Let's talk." },
    payLink: "https://buy.stripe.com/00weVc1Ed2yo53T0LS8Ra07",
    payCta: "Start my build — $1,000",
    payNote: "Build billed once, today — your monthly plan starts at launch.",
    offer: { kind: "fixed", price: 1000 },
    seo: {
      title: "$1,000 Website + Google Business Profile & Local SEO | Skooped Franklin TN",
      description:
        "The Waffle Cone: a $1,000 website for local businesses that includes a Google Business Profile, a live reviews widget, and local SEO service-area pages. Get found in Google Maps in Franklin, TN.",
    },
  },

  sundae: {
    slug: "sundae",
    category: "build",
    name: "The Sundae",
    subtitle: "Custom builds & integrations — from $2,000",
    hero: coupe3,
    priceLabel: "from $2,000",
    priceUnit: "quoted",
    tagline: "When you need more than a website — booking, quoting, stores, dashboards, AI.",
    intro:
      "The Sundae is anything beyond a brochure site: online booking, quoting tools, e-commerce stores, customer dashboards, AI integrations, multi-location setups. Because every custom job is different, we never quote it on the spot. It starts with a Sample Spoon — a $300 Discovery session that turns into a fixed, written quote you can hold us to. The $300 is credited to your build if you sign within 30 days.",
    includesHeading: "How a Sundae works",
    includes: [
      { label: "Custom builds & integrations", note: "Booking systems, quoting tools, online stores, dashboards, AI features, multi-location" },
      { label: "A fixed quote — never a guess", note: "Scoped through the Sample Spoon so the number is real before any work starts" },
      { label: "Milestone billing", note: "50% to start, 50% at launch — billed cleanly through Stripe" },
      { label: "Sample Spoon credited", note: "The $300 Discovery fee comes off your build if you sign within 30 days" },
    ],
    bestFor: [
      "Businesses that have outgrown a simple website",
      "Anyone who needs to take bookings, quotes, or payments online",
      "Multi-location or franchise operations",
    ],
    fits:
      "The Sundae is the custom cone. It always starts with the Sample Spoon ($300 Discovery, credited), then runs on the monthly plan that fits — usually Double or Triple.",
    faq: [
      { q: "Why can't you just quote it now?", a: "Custom work has too many moving parts to price on a napkin — and a wrong guess helps no one. The Sample Spoon is a paid hour that produces a written roadmap and a fixed cost within 7 days. It filters tire-kickers and protects you from surprise invoices." },
      { q: "What's the Sample Spoon?", a: "Our Discovery session: a one-hour, recorded sit-down about your business. Within 7 days you get a written roadmap and a fixed quote. It's $300, and 100% of it is credited toward your build if you sign within 30 days." },
      { q: "How is a custom build billed?", a: "Milestone billing: 50% to start and 50% at launch, both through Stripe. No open-ended hourly meters." },
    ],
    related: ["waffle-cone", "triple", "single"],
    cta: { label: "Book my Sample Spoon — $300 credited", message: "Hey Skooped — I've got a custom project (a Sundae) in mind. I'd like to book the $300 Sample Spoon to get my roadmap and fixed quote." },
    payLink: "https://buy.stripe.com/4gM7sKbeN7SIcwl9io8Ra08",
    payCta: "Book my Sample Spoon — $300",
    payNote: "Credited in full toward your build when you sign within 30 days.",
    offer: { kind: "from", lowPrice: 2000 },
    seo: {
      title: "Custom Websites & Integrations — Booking, Quoting, Online Stores | Skooped",
      description:
        "The Sundae: custom websites and integrations from $2,000 — booking systems, quoting tools, online stores, dashboards, and AI. Fixed-quoted through a $300 Sample Spoon Discovery session, credited to your build.",
    },
  },

  /* ═══════════════════ PLANS (monthly — the scoops) ═══════════════════ */

  single: {
    slug: "single",
    category: "plan",
    name: "Single",
    subtitle: "The base monthly plan — $49/mo",
    hero: waffle1,
    priceLabel: "$49",
    priceUnit: "/mo",
    tagline: "Keeps your site alive, secure, and texting you every lead.",
    intro:
      "The Single scoop is the plan every site needs. It handles the unglamorous-but-essential work — hosting, security, updates, your domain — and delivers the part that pays for itself: every lead texted to your phone, and a monthly report in plain English so you always know what's working.",
    includesHeading: "What $49/mo covers",
    includes: [
      { label: "Hosting", note: "Fast, reliable, and handled — you never think about a server" },
      { label: "SSL, DNS & domain management", note: "The lock icon, the routing, the renewal — all on us" },
      { label: "Security & updates", note: "Your site stays patched and protected" },
      { label: "SMS + email lead alerts", note: LEAD_ALERTS },
      { label: "Monthly proof-of-value report", note: "Traffic, leads, and what we changed — one plain-English email a month, no dashboard to log into" },
      { label: "30 minutes of edits per month", note: "Text us a change; no editor to learn, no coding" },
    ],
    bestFor: [
      "Every client — a build runs on a plan, and Single is the floor",
      "Solo operators who just need to be online and get the calls",
      "Businesses replacing a site they were paying to host elsewhere",
    ],
    fits:
      "The Single is the base scoop. It's the most common pairing with the Cup build — Cup + Single is where most clients start: $500 today, then $49/mo. Prefer to pay yearly? By the Pint makes it $490/yr — two months free.",
    faq: [
      { q: "Is $49/mo really everything?", a: "For the base plan, yes: hosting, security, domain, lead alerts, monthly report, and 30 minutes of edits. Add-ons (toppings) are optional and clearly priced. No hidden fees." },
      { q: "What are the lead alerts, exactly?", a: "The moment someone fills out a form on your site, we text it to your phone and email it to you. No inbox to remember to check — the lead buzzes in your pocket." },
      { q: "What's in the monthly report, and how do I get it?", a: REPORT_BASE },
      { q: "Can I pay annually?", a: "Yes — that's By the Pint: $490/yr for Single, which is two months free versus paying monthly." },
    ],
    related: ["cup", "double", "by-the-pint"],
    cta: { label: "Start on the Single plan — $49/mo", message: "Hey Skooped — I want to get set up on the Single plan ($49/mo). Let's do it." },
    payLink: "https://buy.stripe.com/5kQbJ082B0qg2VL5288Ra09",
    payCta: "Start Single — $49/mo",
    payNote: "For a site we built or already manage.",
    payLinkAnnual: "https://buy.stripe.com/aFa4gy4Qp5KA7c11PW8Ra0c",
    payCtaAnnual: "Start Single — $490/yr",
    priceLabelAnnual: "$490",
    priceUnitAnnual: "/yr — 2 months free",
    offer: { kind: "recurring", price: 49, unit: "MONTH" },
    seo: {
      title: "Single Plan — $49/mo Hosting, Security & SMS Lead Alerts | Skooped Franklin TN",
      description:
        "The Single scoop: $49/mo covers hosting, SSL, security, updates, 30 minutes of edits, a monthly report, and every website lead texted to your phone. The base plan behind every Skooped site.",
    },
  },

  double: {
    slug: "double",
    category: "plan",
    name: "Double",
    subtitle: "The growth plan — $149/mo",
    hero: waffle2,
    priceLabel: "$149",
    priceUnit: "/mo",
    popular: true,
    tagline: "Everything in Single — plus we actively work your local SEO every month.",
    intro:
      "The Double scoop is for businesses that want to climb. On top of everything the Single does, we work your local SEO month after month — Google Business Profile posts, review responses, fresh content — so you keep rising in local search instead of stalling after launch. It's the plan most clients grow into.",
    includesHeading: "What $149/mo covers",
    includes: [
      { label: "Everything in the Single plan", note: "Hosting, security, domain, lead alerts, and your monthly report" },
      { label: "Google Business Profile posts", note: "We publish posts to your Google Business Profile every month, so your Google listing stays active and shows up fresh in Maps and local search" },
      { label: "Google review responses", note: "Every review gets a prompt, on-brand reply written in your voice — the follow-up that customers notice and Google rewards" },
      { label: "Ongoing local SEO", note: "Content refreshes and citation building on top of the Google work, so you keep climbing the local results" },
      { label: "1 hour of edits per month", note: "Bigger changes, new pages, seasonal updates — just text us (Triple doubles this to 2 hours)" },
      { label: "Priority response", note: "Your requests move to the front of the line" },
      { label: "Support without the meetings", note: "The monthly report keeps you posted and we're a call or text away when you need us — no standing meeting to sit through" },
    ],
    bestFor: [
      "Businesses that want to climb in Google's local results",
      "Owners who need fresh content and reviews handled for them",
      "Anyone competing in a crowded local market",
    ],
    fits:
      "The Double is the middle scoop — the most popular plan. It's the natural pairing with the Waffle Cone build, which sets up the SEO the Double then keeps working. Pay yearly with By the Pint: $1,490/yr, two months free.",
    faq: [
      { q: "What does 'ongoing local SEO' actually mean?", a: "Real monthly work, not a set-and-forget: we post to your Google Business Profile, respond to reviews, and refresh site content so Google keeps seeing an active, relevant business. That's what moves you up in the local 3-pack over time." },
      { q: "How is Double different from Single?", a: "Single keeps your site alive and texting you leads. Double adds active marketing on top — monthly SEO work, an hour of edits, and priority response. No meetings to sit through: your monthly report shows the results, and we're a text away whenever you want to talk." },
      { q: "What's in the monthly report, and how do I get it?", a: REPORT_BASE + " On the Double plan it also tracks your local-SEO progress — how your Google Business Profile and local rankings are moving month over month." },
      { q: "When should I move up to Triple?", a: "When you're ready to run ads and coordinate social. Triple adds Google/Meta ads management (spend stays on your card) and social coordination on top of everything in Double — plus double the edit time (2 hours) and a quarterly strategy call to review it all. Triple is the only plan with a scheduled call." },
    ],
    related: ["waffle-cone", "single", "triple"],
    cta: { label: "Start on the Double plan — $149/mo", message: "Hey Skooped — I'd like the Double plan ($149/mo) with the ongoing local SEO. Let's set it up." },
    payLink: "https://buy.stripe.com/dRmcN4eqZ0qg67X8ek8Ra0a",
    payCta: "Start Double — $149/mo",
    payNote: "For a site we built or already manage.",
    payLinkAnnual: "https://buy.stripe.com/6oU28q0A9eh6fIx1PW8Ra0d",
    payCtaAnnual: "Start Double — $1,490/yr",
    priceLabelAnnual: "$1,490",
    priceUnitAnnual: "/yr — 2 months free",
    offer: { kind: "recurring", price: 149, unit: "MONTH" },
    seo: {
      title: "Double Plan — $149/mo Local SEO, Reviews & Content | Skooped Franklin TN",
      description:
        "The Double scoop: $149/mo adds ongoing local SEO — Google Business Profile posts, review responses, and content — to everything in Single. Climb the local search results in Franklin, TN.",
    },
  },

  triple: {
    slug: "triple",
    category: "plan",
    name: "Triple",
    subtitle: "The full-service plan — $299/mo",
    hero: waffle3,
    priceLabel: "$299",
    priceUnit: "/mo",
    tagline: "Everything in Double — plus we run your ads and coordinate your social.",
    intro:
      "The Triple scoop is the full marketing team. On top of the Double's SEO work, we manage your paid ads (Google Local Service Ads and Meta) and coordinate your social media. Ad spend always bills to your own card — we manage it, we never front it, and we never mark it up. It's the plan for owners ready to put fuel on the fire.",
    includesHeading: "What $299/mo covers",
    includes: [
      { label: "Everything in the Double plan", note: "Ongoing local SEO, priority response, and content refreshes" },
      { label: "2 hours of edits per month", note: "Up from 1 hour on Double — bigger changes and new pages, just text us" },
      { label: "Ads management", note: "Google Local Service Ads and Meta campaigns, built and managed for you" },
      { label: "Ad spend on your own card", note: "You pay Google/Meta directly — we never front spend or mark it up" },
      { label: "Social media coordination", note: "Your posts planned and scheduled so your channels stay active" },
      { label: "Quarterly strategy call", note: "A dedicated sit-down to review leads, ad spend, and results — Triple is the only plan with a scheduled call" },
    ],
    bestFor: [
      "Businesses ready to invest in paid ads and want it managed right",
      "Owners who want social handled instead of ignored",
      "Anyone chasing serious lead volume in their market",
    ],
    fits:
      "The Triple is the top scoop. It's also the plan the Sprinkles topping rides on — a dedicated content specialist only makes sense once Triple's ads are amplifying the content. Pay yearly with By the Pint: $2,990/yr, two months free.",
    faq: [
      { q: "Do you take a cut of my ad spend?", a: "Never. Ad spend bills directly to your own card — you see every dollar Google and Meta charge. We charge only for managing the campaigns. No markup, no fronting spend." },
      { q: "What's in the monthly report, and how do I get it?", a: REPORT_BASE + " On the Triple plan it also breaks down your ad performance — what you spent and the leads your Google and Meta campaigns brought in." },
      { q: "What's the difference between Triple and Sprinkles?", a: "Triple ($299/mo) manages your ads and social. Sprinkles (+$350/mo) adds a dedicated content specialist who shoots real photo and video at your job sites — 12 produced posts a month. Sprinkles rides on top of Triple." },
      { q: "Can you build custom retainers on Triple?", a: "Yes. Bigger operations — multi-location, dedicated management, contractor pass-throughs — are built on Triple as transparent line items, scoped through a Sample Spoon session." },
    ],
    related: ["double", "sprinkles", "by-the-pint"],
    cta: { label: "Start on the Triple plan — $299/mo", message: "Hey Skooped — I want the Triple plan ($299/mo) with ads and social management. Let's talk." },
    payLink: "https://buy.stripe.com/fZu9AS0A9b4U53T66c8Ra0b",
    payCta: "Start Triple — $299/mo",
    payNote: "For a site we built or already manage.",
    payLinkAnnual: "https://buy.stripe.com/28EbJ0eqZdd27c1gKQ8Ra0e",
    payCtaAnnual: "Start Triple — $2,990/yr",
    priceLabelAnnual: "$2,990",
    priceUnitAnnual: "/yr — 2 months free",
    offer: { kind: "recurring", price: 299, unit: "MONTH" },
    seo: {
      title: "Triple Plan — $299/mo Ads Management & Social Media | Skooped Franklin TN",
      description:
        "The Triple scoop: $299/mo adds Google & Meta ads management and social coordination to everything in Double. Ad spend stays on your card — never marked up. Full-service local marketing in Franklin, TN.",
    },
  },

  /* ═══════════════════ TOPPINGS (add-ons) ═══════════════════ */

  sprinkles: {
    slug: "sprinkles",
    category: "topping",
    name: "Sprinkles",
    subtitle: "Dedicated content specialist — +$350/mo",
    hero: topSprinkles,
    priceLabel: "+$350",
    priceUnit: "/mo",
    tagline: "A real person shooting photo and video at your job sites every month.",
    intro:
      "Sprinkles is a dedicated content specialist assigned to your business. They come out for an on-site content day — capturing real photo and video of your team and your work — and turn it into 12 produced posts a month. It's the difference between recycled stock images and content that actually looks like you. Availability is limited, and Sprinkles rides on the Triple plan, where the ads amplify everything you capture.",
    includesHeading: "What +$350/mo adds",
    includes: [
      { label: "A dedicated content specialist", note: "One person who learns your business, not a rotating queue" },
      { label: "On-site content day", note: "Real photo and video shot at your job sites and around your team" },
      { label: "12 produced posts a month", note: "Edited, captioned, and ready to run across your channels" },
      { label: "Rides on the Triple plan", note: "The ads and social coordination in Triple put your content to work" },
    ],
    bestFor: [
      "Triple clients who want a steady stream of authentic, local content",
      "Trades and services whose work looks great on camera",
      "Owners who know they should be posting but never have the time",
    ],
    fits:
      "Sprinkles is a topping that only goes on the Triple scoop — that's why picking it in the builder bumps you up to Triple. Limited availability: we only take on as many content clients as we can serve well.",
    faq: [
      { q: "Why does Sprinkles require the Triple plan?", a: "Content works best when something amplifies it. Triple's ad and social management is what turns your photos and videos into leads — so a dedicated specialist only makes sense once that engine is running. That's why Sprinkles rides on Triple." },
      { q: "What will the content specialist actually produce?", a: "An on-site shoot plus 12 finished posts a month — real photo and video of your work and your team, edited and ready to publish. Not stock photos, not AI filler." },
      { q: "Is availability really limited?", a: "Yes. This is a real person's time, so we cap how many businesses we take on to keep the quality high. If we're at capacity, we'll tell you straight and hold your spot." },
    ],
    related: ["triple", "double", "cherry-on-top"],
    cta: { label: "Add Sprinkles — +$350/mo on Triple", message: "Hey Skooped — I want to add Sprinkles (the dedicated content specialist, +$350/mo) on the Triple plan. Is there availability?" },
    offer: { kind: "recurring", price: 350, unit: "MONTH" },
    seo: {
      title: "Content Specialist Add-On — Photo & Video at Your Job Site, +$350/mo | Skooped",
      description:
        "Sprinkles: a dedicated content specialist who shoots real photo and video at your job sites and produces 12 posts a month. +$350/mo on the Triple plan. Limited availability. Franklin, TN.",
    },
  },

  "cherry-on-top": {
    slug: "cherry-on-top",
    category: "topping",
    name: "Cherry on Top",
    subtitle: "Business Launch Pack — +$500 one-time",
    hero: topCherry,
    priceLabel: "+$500",
    priceUnit: "one-time",
    tagline: "Brand-new business? We get you legit — LLC filed, EIN in hand.",
    intro:
      "The Cherry on Top is our Business Launch Pack, made for owners who are just starting out. We file your Tennessee LLC, obtain your EIN, hand you a starter operating agreement, and help verify your Google Business Profile — so the same week you get a website, you get a real, registered business behind it. This is filing assistance, not legal advice.",
    includesHeading: "What +$500 adds",
    includes: [
      { label: "TN Articles of Organization filed", note: "We file your LLC with the state; the ~$300 state fee is passed through at cost, no markup" },
      { label: "EIN obtained", note: "Your federal tax ID, so you can open a business bank account and get paid properly" },
      { label: "Starter operating agreement", note: "A boilerplate single-member agreement to get you set up" },
      { label: "Google Business Profile verification support", note: "We help you get verified so your new business shows up on Google" },
    ],
    bestFor: [
      "Brand-new businesses that haven't formed an LLC yet",
      "Side hustles going full-time and getting official",
      "Owners who want the website and the paperwork handled together",
    ],
    fits:
      "The Cherry on Top is a one-time topping that works with any build. It's most popular alongside the Cup or Waffle Cone for owners launching everything at once.",
    faq: [
      { q: "Is this legal advice?", a: "No. This is filing assistance — we handle the paperwork and the process, the same steps we've done for our own business. For legal questions specific to your situation, talk to an attorney." },
      { q: "What's included in the $500?", a: "Filing your TN Articles of Organization (the ~$300 state fee is passed through at cost inside that price), obtaining your EIN, a starter single-member operating agreement, and help verifying your Google Business Profile." },
      { q: "Do I need this if I already have an LLC?", a: "No — if you're already formed with an EIN, skip the Cherry. It's built specifically for brand-new businesses that still need to get registered." },
    ],
    related: ["cup", "waffle-cone", "single"],
    cta: { label: "Add the Business Launch Pack — +$500", message: "Hey Skooped — my business is brand new. I'd like to add the Cherry on Top (Business Launch Pack, +$500) to get my LLC and EIN set up with my build." },
    offer: { kind: "fixed", price: 500 },
    disclaimer: "Filing assistance, not legal advice. State filing fees are passed through at cost.",
    seo: {
      title: "Business Launch Pack — LLC Filing + EIN for New Businesses, $500 | Skooped",
      description:
        "Cherry on Top: our Business Launch Pack files your Tennessee LLC, obtains your EIN, and provides a starter operating agreement — plus Google Business Profile verification. +$500 one-time. Filing assistance, not legal advice.",
    },
  },

  "chocolate-dipped": {
    slug: "chocolate-dipped",
    category: "topping",
    name: "Chocolate Dipped",
    subtitle: "One-round brand refresh — +$200 one-time",
    hero: topChocDip,
    priceLabel: "+$200",
    priceUnit: "one-time",
    tagline: "One clean coat over your whole brand — a tidy logo and consistent colors across your site.",
    intro:
      "Chocolate Dipped is a single, focused brand-refresh pass. We tidy up your existing logo and lock in one consistent color palette, then apply it across your whole site so every page looks like it belongs together — the same coat of polish from top to bottom. It's one bounded round of cleanup, not a ground-up rebrand: fast, predictable, and priced flat at $200.",
    includesHeading: "What +$200 adds",
    includes: [
      { label: "Logo tidy-up", note: "We clean up and standardize the logo you already have so it's crisp at every size — not a brand-new logo from scratch" },
      { label: "Consistent color palette", note: "One coherent set of brand colors, chosen and locked in so nothing clashes" },
      { label: "Applied across your site", note: "The refreshed logo and colors are rolled out on every page in one pass" },
      { label: "One round, flat price", note: "A single bounded cleanup — no open-ended rebrand meter, no surprise hours" },
    ],
    bestFor: [
      "Cup clients who want a more polished, coordinated look",
      "Businesses whose logo and colors have drifted inconsistent over time",
      "Owners who want everything looking sharp before they start driving traffic",
    ],
    fits:
      "Chocolate Dipped is a one-time topping that works with any build or plan. It's most popular on the Cup — the quickest way to add a coat of brand polish without stepping up to a full custom project.",
    faq: [
      { q: "Is this a full rebrand?", a: "No — it's one bounded round: a tidy pass on your existing logo plus a consistent color palette applied across your site. A ground-up rebrand — new logo concepts, a full identity system — is a bigger custom project, and that's a Sundae." },
      { q: "Do I get a brand-new logo?", a: "Not a new logo from scratch. We clean up and standardize the one you have so it's sharp and consistent everywhere. If you want a completely new identity, we can scope that separately as a custom Sundae." },
      { q: "How is this different from the Waffle Cone?", a: "The Waffle Cone build is about getting you found on Google — Business Profile, reviews, and local SEO. Chocolate Dipped is the standalone brand-refresh pass, so any client — including a plain Cup build — can add the same coat of polish for a flat $200." },
    ],
    related: ["cup", "waffle-cone", "single"],
    cta: { label: "Add Chocolate Dipped — +$200", message: "Hey Skooped — I'd like to add Chocolate Dipped (the one-round brand refresh, +$200) to tidy up my logo and colors across the site." },
    offer: { kind: "fixed", price: 200 },
    seo: {
      title: "Brand Refresh Add-On — Logo Tidy + Consistent Colors, $200 | Skooped Franklin TN",
      description:
        "Chocolate Dipped: a one-round brand refresh — we tidy your logo and apply one consistent color palette across your whole site. Flat +$200 one-time, not a full rebrand. Franklin, TN.",
    },
  },

  "extra-scoop": {
    slug: "extra-scoop",
    category: "topping",
    name: "Extra Scoop",
    subtitle: "Additional website — +$25/mo",
    hero: topExtra,
    priceLabel: "+$25",
    priceUnit: "/mo",
    tagline: "Run a second (or third) site on the same plan.",
    intro:
      "Got more than one business, brand, or location? The Extra Scoop adds another website to your existing plan for just $25/mo — with the same lead alerts and the same monthly report as your main site. One account, one login, one bill.",
    includesHeading: "What +$25/mo adds",
    includes: [
      { label: "Another full website", note: "A second site on your existing monthly plan" },
      { label: "Same SMS + email lead alerts", note: "Leads from the additional site text you just like the first" },
      { label: "Same monthly report", note: "Rolled into the plain-English report you already get" },
      { label: "One bill", note: "Added as a clean $25/mo line item on your existing subscription" },
    ],
    bestFor: [
      "Owners running more than one brand or business",
      "Multi-location businesses that want a site per location",
      "Anyone who needs a separate landing site for a specific service",
    ],
    fits:
      "The Extra Scoop is a topping that stacks on any monthly plan — Single, Double, or Triple. Each additional site is another +$25/mo on the same subscription.",
    faq: [
      { q: "Is the extra site really only $25/mo?", a: "The $25/mo is the ongoing plan cost to run an additional site — same lead alerts, same report, on your existing subscription. If the second site still needs to be built, that's a separate one-time build; just ask and we'll sort out the simplest path." },
      { q: "Do leads from both sites reach me?", a: "Yes. Every site on your plan texts and emails you its leads, and they're all summarized in your one monthly report." },
      { q: "Can I add more than one extra site?", a: "Absolutely — each additional site is another +$25/mo. Same alerts, same report, same single bill." },
    ],
    related: ["single", "double", "by-the-pint"],
    cta: { label: "Add an Extra Scoop — +$25/mo", message: "Hey Skooped — I've got more than one site. I'd like to add an Extra Scoop (+$25/mo) to my plan." },
    offer: { kind: "recurring", price: 25, unit: "MONTH" },
    seo: {
      title: "Additional Website — Second Site for +$25/mo | Skooped Franklin TN",
      description:
        "Extra Scoop: add a second or third website to your Skooped plan for +$25/mo, with the same SMS lead alerts and monthly report. Perfect for multi-brand and multi-location businesses.",
    },
  },

  "by-the-pint": {
    slug: "by-the-pint",
    category: "topping",
    name: "By the Pint",
    subtitle: "Annual prepay — pay yearly, get 2 months free",
    hero: pintHero,
    priceLabel: "10×",
    priceUnit: "once a year",
    tagline: "Pay for the year up front and get two months free.",
    intro:
      "By the Pint is the annual option: instead of paying monthly, you prepay a full year at 10× the monthly price — so you get two months free. Same plan, same everything, one payment a year. It's the simplest way to save, and it means never thinking about a monthly charge again.",
    includesHeading: "The annual math",
    includes: [
      { label: "Single — $490/yr", note: "Versus $588 paid monthly — two months free" },
      { label: "Double — $1,490/yr", note: "Versus $1,788 paid monthly — two months free" },
      { label: "Triple — $2,990/yr", note: "Versus $3,588 paid monthly — two months free" },
      { label: "Everything your plan includes", note: "Nothing changes but the billing — you just save" },
    ],
    bestFor: [
      "Clients who'd rather handle one payment a year",
      "Owners who want to lock in savings up front",
      "Anyone who prefers annual budgeting over monthly charges",
    ],
    fits:
      "By the Pint applies to any monthly plan — Single, Double, or Triple. Pick your scoop, then pay for the year at 10× and pocket the two free months.",
    faq: [
      { q: "How much do I actually save?", a: "Two months. You pay 10× the monthly price for 12 months of service — so Single is $490 instead of $588, Double is $1,490 instead of $1,788, and Triple is $2,990 instead of $3,588." },
      { q: "Is it a real annual subscription?", a: "Yes — it's billed as a genuine yearly subscription through Stripe, so it renews cleanly on its own. No manual re-upping, no lapse." },
      { q: "Can I switch to annual later?", a: "Yes. Start monthly if you like, and move to By the Pint whenever you're ready to lock in the two free months." },
    ],
    related: ["single", "double", "triple"],
    cta: { label: "Prepay the year — By the Pint", message: "Hey Skooped — I'd like to pay annually (By the Pint) and get the two months free. Here's the plan I want:" },
    offer: { kind: "range", lowPrice: 490, highPrice: 2990, unit: "YEAR" },
    seo: {
      title: "Annual Prepay — Pay Yearly, Get 2 Months Free | Skooped Franklin TN",
      description:
        "By the Pint: prepay your Skooped plan for the year at 10× the monthly price and get two months free. Single $490/yr, Double $1,490/yr, Triple $2,990/yr. Billed as a clean annual subscription.",
    },
  },
};

/** Display order for the menu index, grouped by category. */
export const menuOrder: string[] = [
  "cup",
  "waffle-cone",
  "sundae",
  "single",
  "double",
  "triple",
  "sprinkles",
  "cherry-on-top",
  "chocolate-dipped",
  "extra-scoop",
  "by-the-pint",
];

export const categoryLabels: Record<MenuCategory, { title: string; blurb: string }> = {
  build: { title: "The builds — one-time", blurb: "Pay once, own the site. Every build runs on a monthly plan." },
  plan: { title: "The scoops — monthly plans", blurb: "What keeps your site hosted, secure, and texting you leads." },
  topping: { title: "The toppings — add-ons", blurb: "Optional extras. Add them at signup or whenever you're ready." },
};
