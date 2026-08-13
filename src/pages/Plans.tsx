import { motion } from "framer-motion";
import { Check, X, ChevronDown, Phone, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IncludedStrip from "@/components/IncludedStrip";
import SundaeBuilder from "@/components/SundaeBuilder";
import MenuIndex from "@/components/MenuIndex";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSeo from "@/hooks/use-page-seo";

/* ───── FAQ data ───── */
const faqGroups = [
  {
    title: "Getting Started",
    items: [
      { q: "How much does a website cost?", a: "The Cup is $500 flat — a 5-page website. The Waffle Cone is $1,000 flat — the website plus your Google presence. Anything custom is a Sundae — a fixed quote through a $300 Sample Spoon session, and the $300 is credited to your build if you sign within 30 days. No estimates on a napkin, no surprise invoices." },
      { q: "How fast will I be online?", a: "About a week from payment to launch. We build from a proven industry library and customize it to your business, so you're not waiting on an agency timeline." },
      { q: "What's the Sample Spoon?", a: "Our Discovery session — a taste before you order. A one-hour sit-down about your business; within 7 days you get a written roadmap and a fixed cost estimate. It's $300, and 100% of it is credited toward your build if you sign within 30 days." },
    ],
  },
  {
    title: "What's Included",
    items: [
      { q: "Why do builds require a monthly plan?", a: "Because a website isn't done when it launches. The Single plan covers hosting, security, domain management, small edits — and the part that makes you money: every lead from your site delivered to you the moment it lands (email always, text if you opt in), plus a monthly report in plain English." },
      { q: "Do I own my website?", a: "Yes. Your website, your content, your data. Always." },
      { q: "How is this different from Wix or Squarespace?", a: "Those platforms give you a template and say 'good luck.' We build your site, handle your domain and SEO, and text you every lead. You get a marketing team — not a DIY tool." },
      { q: "Do you run my ad budget?", a: "Ads bill directly to your own card. We never front spend and we never mark it up. On Triple we manage the campaigns on Google (Local Services and Search) and Meta (Facebook and Instagram), and you see every dollar." },
      { q: "What are toppings?", a: "Optional add-ons. Sprinkles ($350/mo) takes Triple's 4 posts a month up to 12, edited and curated from the photos and clips you and your crew send in, with at least 4 real videos, and it rides on the Triple plan where the ads amplify them (limited availability). Cherry on Top ($500) files your LLC if your business is brand new, Chocolate Dipped (+$200) is a one-round brand refresh (a logo tidy and consistent colors across your site), and Extra Scoop adds another website for +$25/mo. Those three work with any scoop. Sprinkles is the one that needs Triple." },
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
  { label: "Every lead sent to you instantly", trad: false, skoop: true },
  { label: "Plain-English monthly report", trad: false, skoop: true },
  { label: "Ad spend markup", trad: "10 – 20% of spend", skoop: "$0 — bills to your card" },
  { label: "Contracts", trad: "6–12 months", skoop: "One page. No lock-in." },
];

/* ───── Page ───── */
const Plans = () => {
  usePageSeo({
    title: "Pricing | Websites from $500, Plans from $49/mo | Skooped Franklin TN",
    description: "One price list: builds from $500, custom quoted via a $300 Discovery session (credited). Single $49, Double $149, Triple $299 monthly. Toppings: 12 posts a month with real video +$350/mo, LLC filing +$500. Every lead sent straight to you.",
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
              Two numbers, that's it: a <strong className="text-foreground">one-time build</strong> to get online, plus a{" "}
              <strong className="text-foreground">monthly plan</strong> (the scoops) that keeps it running. Optional toppings go on any plan.
              Most clients start at $500 + $49/mo.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Interactive builder first — the pricing tool IS the page ── */}
      <section className="pt-6 pb-1 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">Build it and see your exact total</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
            Pick a build, a plan, and any add-ons — the price updates live as you go. Full details on every item are just below.
          </p>
        </div>
      </section>
      <SundaeBuilder />

      <section className="pt-8 pb-4 px-6">
        <div className="container mx-auto max-w-5xl">
          <p className="text-center text-sm text-muted-foreground">
            Bigger operation? Multi-location and dedicated-management retainers are built on Triple as
            transparent line items — scoped through a <Link to="/contact" className="text-primary font-semibold hover:underline">Sample Spoon session</Link>.
          </p>
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
                Build once + scoops monthly. Example: Cup + Single ={" "}
                <span className="text-primary">$500 today, then $49/mo</span> from launch.
              </p>
              <p className="text-sm text-muted-foreground">
                That's the whole bill. No setup fees, no hourly surprises — the build is never billed again.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── The detail layer — every build, plan & topping links to its own page ── */}
      <MenuIndex />

      {/* ── The Local Scoop: standalone GBP plan for sites we don't host ── */}
      <section className="pb-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <div className="mb-5 text-center">
              <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">Already have a website? Keep it.</h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
                The Local Scoop runs your Google Business Profile while your website stays wherever it is.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <Link
              to="/plans/local-scoop"
              className="group block rounded-2xl border-2 border-primary/30 bg-card p-6 md:p-8 transition-all hover:border-primary hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-heading text-xl font-extrabold text-foreground group-hover:text-primary transition-colors">The Local Scoop</p>
                  <p className="mt-1 text-sm text-muted-foreground">We run your Google listing. Your website stays put.</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-3xl font-extrabold text-primary tabular-nums">$100</span>
                  <span className="text-sm text-muted-foreground">/mo</span>
                </div>
              </div>
              <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-muted-foreground">
                {[
                  "Every review answered, in your voice",
                  "Fresh posts on your profile every week",
                  "Hours, phone, and services kept accurate",
                  "A plain-English monthly report",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                See The Local Scoop <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </ScrollReveal>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Skooped-hosted sites don't need this: it's already inside the Double Scoop ($149/mo).
          </p>
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
