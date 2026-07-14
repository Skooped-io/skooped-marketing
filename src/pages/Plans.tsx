import { motion } from "framer-motion";
import { Check, X, ChevronDown, Phone, Hammer, Building2, Puzzle, FileCheck2, Sparkles, Plus, CalendarDays } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IncludedStrip from "@/components/IncludedStrip";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSeo from "@/hooks/use-page-seo";
import tier1Img from "@/assets/skooped-tier-1.png";
import tier2Img from "@/assets/skooped-tier-2.png";
import tier3Img from "@/assets/skooped-tier-3.png";

/* ───── One-time builds ───── */
const builds = [
  {
    icon: Hammer,
    name: "Cup",
    price: "$500",
    priceNote: "one-time · requires a monthly plan",
    tagline: "The Launch build — get online and look legit.",
    features: [
      "5-page custom site from our industry library",
      "Mobile-ready, fast, built to convert",
      "On-page SEO: metadata, schema, Google Business Profile link",
      "Lead form wired to SMS + email alerts",
      "Domain purchase & DNS handled (domain billed at cost)",
      "Launch report when you go live",
    ],
  },
  {
    icon: Building2,
    name: "Waffle Cone",
    price: "$1,000",
    priceNote: "one-time · requires a monthly plan",
    tagline: "The Establish build — everything in the Cup, plus get found.",
    popular: true,
    features: [
      "Everything in the Cup, plus:",
      "Google Business Profile created, verified & optimized",
      "Google reviews widget on your site",
      "Local SEO: service-area pages & citations",
      "Light brand cleanup (logo & colors)",
      "30-day post-launch tweak window",
    ],
  },
  {
    icon: Puzzle,
    name: "The Sundae",
    price: "from $2,000",
    priceNote: "quoted through the Sample Spoon — never on the spot",
    tagline: "The custom build — integrations, booking, stores, multi-location.",
    features: [
      "Quoting tools & booking systems",
      "Dashboards and online stores",
      "AI integrations",
      "Multi-location businesses",
      "Fixed quote from your Discovery roadmap",
      "Milestone billing: 50% start, 50% launch",
    ],
  },
];

/* ───── Monthly plans ───── */
const plans = [
  {
    name: "Single",
    tagline: "Your site, alive and answering.",
    price: "$49",
    image: tier1Img,
    features: [
      "Hosting, SSL, DNS & domain management",
      "Security & software updates",
      "SMS + email lead alerts — every lead texted to you",
      "Monthly plain-English report: visits, leads, changes made",
      "30 minutes of small edits every month",
    ],
  },
  {
    name: "Double",
    tagline: "Show up higher. Stay fresh.",
    price: "$149",
    popular: true,
    image: tier2Img,
    features: [
      "Everything in Single, plus:",
      "Ongoing local SEO: Google Business posts, review responses, content refresh",
      "2 hours of edits every month",
      "Priority response",
      "Quarterly strategy call",
    ],
  },
  {
    name: "Triple",
    tagline: "The full operation. We run it all.",
    price: "$299",
    image: tier3Img,
    features: [
      "Everything in Double, plus:",
      "Ads management: Google Local Service Ads & Meta",
      "Ad spend bills to your own card — we never mark it up",
      "Social media coordination",
      "Monthly call",
    ],
  },
];

/* ───── Toppings (add-ons — attach to any monthly plan) ───── */
const toppings = [
  {
    icon: Sparkles,
    name: "Sprinkles",
    subtitle: "Dedicated Content Specialist",
    price: "+$350",
    priceNote: "/mo · limited availability",
    features: [
      "A monthly on-site content day at your jobs",
      "12 produced photo & video posts a month",
      "Comments & DMs answered within a business day",
      "Content calendar + boosted-post management",
    ],
    cta: "Ask About Availability",
  },
  {
    icon: FileCheck2,
    name: "Cherry on Top",
    subtitle: "Business Launch Pack",
    price: "+$500",
    priceNote: "one-time · filing assistance, not legal advice",
    features: [
      "LLC filing in your state (state fee at cost)",
      "Your EIN, ready for the bank",
      "Starter operating agreement",
      "Google Business Profile verification support",
    ],
    cta: "Add It to My Build",
  },
  {
    icon: Plus,
    name: "Extra Scoop",
    subtitle: "Additional website",
    price: "+$25",
    priceNote: "/mo per site, on the same plan",
    features: [
      "Same hosting, security, and updates",
      "Same lead alerts to your phone",
      "Same plain-English monthly report",
    ],
    cta: "Add a Site",
  },
  {
    icon: CalendarDays,
    name: "By the Pint",
    subtitle: "Annual prepay — 2 months free",
    price: "10×",
    priceNote: "monthly, once a year",
    features: [
      "Single: $490/yr",
      "Double: $1,490/yr",
      "Triple: $2,990/yr",
    ],
    cta: "Ask About Annual",
  },
];

/* ───── FAQ data ───── */
const faqGroups = [
  {
    title: "Getting Started",
    items: [
      { q: "How much does a website cost?", a: "The Cup (our Launch build) is $500 flat. The Waffle Cone (Establish) is $1,000 flat. Anything custom is a Sundae — a fixed quote through a $300 Sample Spoon session, and the $300 is credited to your build if you sign within 30 days. No estimates on a napkin, no surprise invoices." },
      { q: "How fast will I be online?", a: "About a week from payment to launch. We build from a proven industry library and customize it to your business, so you're not waiting on an agency timeline." },
      { q: "What's the Sample Spoon?", a: "Our Discovery session — a taste before you order. A one-hour sit-down about your business; within 7 days you get a written roadmap and a fixed cost estimate. It's $300, and 100% of it is credited toward your build if you sign within 30 days." },
    ],
  },
  {
    title: "What's Included",
    items: [
      { q: "Why do builds require a monthly plan?", a: "Because a website isn't done when it launches. The Single plan covers hosting, security, domain management, small edits — and the part that makes you money: every lead from your site texted straight to your phone, plus a monthly report in plain English." },
      { q: "Do I own my website?", a: "Yes. Your website, your content, your data. Always." },
      { q: "How is this different from Wix or Squarespace?", a: "Those platforms give you a template and say 'good luck.' We build your site, handle your domain and SEO, and text you every lead. You get a marketing team — not a DIY tool." },
      { q: "Do you run my ad budget?", a: "Ads bill directly to your own card — we never front spend or mark it up. On Triple, we manage the campaigns and you see every dollar." },
      { q: "What are toppings?", a: "Optional add-ons that go on any monthly plan. Sprinkles ($350/mo) is a dedicated content specialist shooting real photo and video at your job sites — limited availability. Cherry on Top ($500) files your LLC if your business is brand new. Extra Scoop adds another website for +$25/mo. Toppings work with any scoop — Sprinkles hits hardest with Triple, where the ads amplify the content." },
    ],
  },
  {
    title: "Billing & Contracts",
    items: [
      { q: "Is the $500 a one-time payment or a subscription?", a: "One-time. Once the build is paid, it's never billed again. The subscription is a separate, smaller thing: the monthly plan (from $49/mo) that keeps your site hosted, secure, updated, and texting you every lead. Typical start: $500 today, then $49/mo from launch." },
      { q: "Is there a contract?", a: "One page of paper: your scope and the plan you're on. No long-term lock-in, no hidden fees. Plans bill monthly with a card on file." },
      { q: "Can I pay annually?", a: "Yes — that's By the Pint: annual prepay at 10× the monthly price, so you get 2 months free. Single runs $490/yr, Double $1,490/yr, Triple $2,990/yr." },
      { q: "I have more than one site.", a: "Each additional site is +$25/mo on the same plan — same lead alerts, same report." },
    ],
  },
];

/* ───── Comparison table ───── */
const compRows = [
  { label: "Setup fee", trad: "$3,000 – $8,000", skoop: "$500 flat" },
  { label: "Website delivery", trad: "4-8 weeks", skoop: "About a week" },
  { label: "Monthly cost", trad: "$100 – $800/mo", skoop: "$49 – $299/mo" },
  { label: "Every lead texted to your phone", trad: false, skoop: true },
  { label: "Plain-English monthly report", trad: false, skoop: true },
  { label: "Ad spend markup", trad: "10 – 20% of spend", skoop: "$0 — bills to your card" },
  { label: "Contracts", trad: "6–12 months", skoop: "One page. No lock-in." },
];

/* ───── Build card ───── */
const BuildCard = ({ build, delay }: { build: (typeof builds)[number]; delay: number }) => (
  <ScrollReveal delay={delay}>
    <motion.div
      className={`relative rounded-2xl p-6 flex flex-col h-full transition-shadow duration-300 ${
        build.popular
          ? "bg-card border-2 border-primary shadow-xl z-10"
          : "bg-card/80 backdrop-blur-sm border border-border shadow-md"
      }`}
      whileHover={{ boxShadow: "0 20px 40px -12px hsl(340 60% 57% / 0.15)" }}
      transition={{ duration: 0.3 }}
    >
      {build.popular && (
        <span className="absolute -top-3 right-6 bg-accent text-accent-foreground text-xs font-bold px-4 py-1 rounded-full shadow">
          Most Popular
        </span>
      )}
      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
        <build.icon size={22} className="text-primary" />
      </div>
      <h3 className="font-heading text-xl font-extrabold text-foreground">{build.name}</h3>
      <p className="text-muted-foreground text-xs mb-3">{build.tagline}</p>
      <p className="mb-1">
        <span className="font-heading text-4xl font-extrabold text-primary">{build.price}</span>
      </p>
      <p className="text-[11px] text-muted-foreground mb-4">{build.priceNote}</p>
      <ul className="space-y-2 mb-5 flex-1">
        {build.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-foreground">
            <Check size={14} className="text-primary shrink-0 mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Link to="/contact">
        <Button variant={build.popular ? "hero" : "hero-outline"} size="lg" className="w-full">
          {build.name === "The Sundae" ? "Book My Discovery Session" : "Start My Build"}
        </Button>
      </Link>
    </motion.div>
  </ScrollReveal>
);

/* ───── Plan card ───── */
const PlanCard = ({ plan, delay }: { plan: (typeof plans)[number]; delay: number }) => (
  <ScrollReveal delay={delay}>
    <motion.div
      className={`relative rounded-2xl p-6 flex flex-col h-full transition-shadow duration-300 ${
        plan.popular
          ? "bg-card border-2 border-primary shadow-xl md:scale-[1.03] z-10"
          : "bg-card/80 backdrop-blur-sm border border-border shadow-md"
      }`}
      whileHover={{ boxShadow: "0 20px 40px -12px hsl(340 60% 57% / 0.15)" }}
      transition={{ duration: 0.3 }}
    >
      {plan.popular && (
        <span className="absolute -top-3 right-6 bg-accent text-accent-foreground text-xs font-bold px-4 py-1 rounded-full shadow">
          Most Popular
        </span>
      )}
      <img src={plan.image} alt={`${plan.name} plan`} className="w-24 h-24 object-contain mx-auto mb-2" />
      <h3 className="font-heading text-xl font-extrabold text-foreground text-center">{plan.name}</h3>
      <p className="text-muted-foreground text-xs text-center mb-3">{plan.tagline}</p>
      <p className="text-center mb-4">
        <span className="font-heading text-4xl font-extrabold text-primary">{plan.price}</span>
        <span className="text-muted-foreground text-sm">/mo</span>
      </p>
      <ul className="space-y-2 mb-5 flex-1">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-foreground">
            <Check size={14} className="text-primary shrink-0 mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Link to="/contact">
        <Button variant={plan.popular ? "hero" : "hero-outline"} size="lg" className="w-full">
          Pick My Plan
        </Button>
      </Link>
    </motion.div>
  </ScrollReveal>
);

/* ───── Topping card ───── */
const ToppingCard = ({ topping, delay }: { topping: (typeof toppings)[number]; delay: number }) => (
  <ScrollReveal delay={delay}>
    <motion.div
      className="relative rounded-2xl p-6 flex flex-col h-full bg-card/80 backdrop-blur-sm border border-border shadow-md transition-shadow duration-300"
      whileHover={{ boxShadow: "0 20px 40px -12px hsl(340 60% 57% / 0.15)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
        <topping.icon size={22} className="text-accent" />
      </div>
      <h3 className="font-heading text-xl font-extrabold text-foreground">{topping.name}</h3>
      <p className="text-muted-foreground text-xs mb-3">{topping.subtitle}</p>
      <p className="mb-1">
        <span className="font-heading text-3xl font-extrabold text-primary">{topping.price}</span>
      </p>
      <p className="text-[11px] text-muted-foreground mb-4">{topping.priceNote}</p>
      <ul className="space-y-2 mb-5 flex-1">
        {topping.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-foreground">
            <Check size={14} className="text-primary shrink-0 mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Link to="/contact">
        <Button variant="hero-outline" size="lg" className="w-full">
          {topping.cta}
        </Button>
      </Link>
    </motion.div>
  </ScrollReveal>
);

/* ───── Page ───── */
const Plans = () => {
  usePageSeo({
    title: "Pricing | Websites from $500, Plans from $49/mo | Skooped Franklin TN",
    description: "One price list: builds from $500, custom quoted via a $300 Discovery session (credited). Single $49, Double $149, Triple $299 monthly. Toppings: dedicated content specialist +$350/mo, LLC filing +$500. Every lead texted to your phone.",
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Navbar />

      {/* ── Header ── */}
      <section className="relative pt-28 pb-12 overflow-hidden">
        <div className="absolute top-20 left-[-3rem] w-72 h-72 rounded-full bg-primary/12 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-[-2rem] w-56 h-56 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="relative container mx-auto px-6 text-center max-w-3xl">
          <ScrollReveal>
            <h1 className="text-4xl md:text-[48px] md:leading-tight font-extrabold text-foreground mb-3">
              One price list. No surprises.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Two numbers, that's it: a <strong className="text-foreground">one-time build</strong> (the cone) to get online, plus a{" "}
              <strong className="text-foreground">monthly plan</strong> (the scoops) that keeps it running. Optional toppings go on any plan.
              Most clients start at $500 + $49/mo.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── One-time builds ── */}
      <section className="pb-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="font-heading text-2xl font-extrabold text-foreground mb-1">Step 1 — Pick your cone</h2>
            <p className="text-sm text-muted-foreground mb-6">The one-time build everything sits on. Pay it once, own the site. This is not a subscription.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {builds.map((b, i) => (
              <BuildCard key={b.name} build={b} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Monthly plans ── */}
      <section className="pb-10 px-6">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="font-heading text-2xl font-extrabold text-foreground mb-1">Step 2 — Pick your scoops</h2>
            <p className="text-sm text-muted-foreground mb-6">
              The monthly plan — not an alternative to the build. It keeps your site hosted, secure, and texting you every lead.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {plans.map((p, i) => (
              <PlanCard key={p.name} plan={p} delay={i * 0.1} />
            ))}
          </div>
          <ScrollReveal delay={0.3}>
            <p className="text-center text-sm text-muted-foreground mt-6">
              Bigger operation? Multi-location and dedicated-management retainers are built on Triple as
              transparent line items — scoped through a <Link to="/contact" className="text-primary font-semibold hover:underline">Sample Spoon session</Link>.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Toppings ── */}
      <section className="pb-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="font-heading text-2xl font-extrabold text-foreground mb-1">Step 3 — Add your toppings <span className="text-muted-foreground font-bold text-base">(optional)</span></h2>
            <p className="text-sm text-muted-foreground mb-6">
              Toppings go on any scoop. Add them at signup or whenever you're ready.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {toppings.map((t, i) => (
              <ToppingCard key={t.name} topping={t} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ── The math, spelled out ── */}
      <section className="pb-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 md:p-8 text-center">
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold mb-3">
                So what do I actually pay?
              </p>
              <p className="font-heading text-xl md:text-2xl font-extrabold text-foreground mb-2">
                Cone once + scoops monthly. Example: Cup + Single ={" "}
                <span className="text-primary">$500 today, then $49/mo</span> from launch.
              </p>
              <p className="text-sm text-muted-foreground">
                That's the whole bill. No setup fees, no hourly surprises — the build is never billed again.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Discovery callout ── */}
      <section className="pb-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <div className="bg-maroon rounded-2xl p-8 md:p-10 grid md:grid-cols-[1fr_auto] gap-6 items-center">
              <div>
                <h3 className="font-heading text-2xl font-extrabold text-primary-foreground mb-2">
                  The Sample Spoon — a $300 taste, credited to your build.
                </h3>
                <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-2xl">
                  Before you order a Sundae, taste first: a one-hour sit-down about your business. Within 7 days you get a
                  written roadmap and a fixed quote. Sign within 30 days and the full $300 comes off your build. No free
                  scoping, no vague estimates — just a plan you can hold us to.
                </p>
              </div>
              <Link to="/contact">
                <Button variant="hero" size="lg">Book My Session</Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Every plan includes ── */}
      <div className="mb-16">
        <IncludedStrip />
      </div>

      {/* ── Comparison table ── */}
      <section className="pb-16 px-6">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-extrabold text-foreground text-center mb-8">Traditional Agency vs Skooped</h2>
            <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-card">
                    <th className="text-left py-4 px-5 font-heading font-bold text-foreground" />
                    <th className="text-center py-4 px-5 font-heading font-bold text-muted-foreground">Traditional Agency</th>
                    <th className="text-center py-4 px-5 font-heading text-lg font-extrabold text-primary bg-primary/5 border-l-2 border-primary/30">
                      ✨ Skooped
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-card/50"}>
                      <td className="py-3.5 px-5 font-medium text-foreground">{row.label}</td>
                      <td className="py-3.5 px-5 text-center text-muted-foreground">
                        {typeof row.trad === "boolean" ? (
                          row.trad ? <Check size={18} className="mx-auto text-green-600" /> : <X size={18} className="mx-auto text-destructive/50" />
                        ) : row.trad}
                      </td>
                      <td className="py-3.5 px-5 text-center font-semibold text-foreground bg-primary/5 border-l-2 border-primary/30">
                        {typeof row.skoop === "boolean" ? (
                          row.skoop ? <Check size={18} className="mx-auto text-primary" /> : <X size={18} className="mx-auto text-destructive/50" />
                        ) : (
                          <span className="text-primary font-bold">{row.skoop}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FAQ (grouped, 2-col, card style) ── */}
      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-extrabold text-foreground text-center mb-10">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>

          {faqGroups.map((group, gi) => (
            <div key={gi} className="mb-8">
              <ScrollReveal delay={gi * 0.05}>
                <h3 className="font-heading font-bold text-sm uppercase tracking-widest text-primary mb-4">{group.title}</h3>
              </ScrollReveal>
              <div className="grid md:grid-cols-2 gap-3">
                {group.items.map((item, fi) => {
                  const idx = faqGroups.slice(0, gi).reduce((acc, g) => acc + g.items.length, 0) + fi;
                  const isOpen = openFaq === idx;
                  return (
                    <ScrollReveal key={fi} delay={fi * 0.05}>
                      <div className="rounded-xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden">
                        <button
                          className="w-full flex items-center justify-between p-4 text-left group"
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                        >
                          <span className="font-heading font-bold text-sm text-foreground group-hover:text-primary transition-colors pr-3">{item.q}</span>
                          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                            <ChevronDown size={16} className="text-muted-foreground shrink-0" />
                          </motion.span>
                        </button>
                        <motion.div
                          initial={false}
                          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                        </motion.div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="pb-24 px-6 text-center">
        <ScrollReveal>
          <h2 className="font-heading text-2xl font-extrabold text-foreground mb-3">Not sure which fits? Just ask.</h2>
          <a href="tel:6153151541" className="inline-flex items-center gap-2 text-2xl md:text-3xl font-heading font-extrabold text-primary hover:underline mb-6">
            <Phone size={24} /> 615-315-1541
          </a>
          <div>
            <Link to="/contact">
              <Button variant="hero" size="xl">Send Us a Message</Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-3">We'll tell you straight — even if the answer is "you don't need us yet."</p>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </>
  );
};

export default Plans;
