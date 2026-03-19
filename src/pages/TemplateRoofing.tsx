import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Globe, Search, MapPin, Instagram, Megaphone, Star,
  PhoneIncoming, BarChart3, ChevronDown, Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSeo from "@/hooks/use-page-seo";

/* ───── Hero Device Mockup ───── */
const DeviceMockup = () => (
  <motion.div
    className="relative"
    animate={{ y: [0, -8, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    {/* Desktop frame */}
    <div className="relative w-full max-w-md mx-auto rounded-xl border-2 border-border bg-foreground overflow-hidden shadow-2xl">
      <div className="h-6 bg-foreground/90 flex items-center gap-1.5 px-3">
        <span className="w-2 h-2 rounded-full bg-destructive/60" />
        <span className="w-2 h-2 rounded-full bg-secondary/60" />
        <span className="w-2 h-2 rounded-full bg-green-500/60" />
      </div>
      <div className="bg-[#1a1a2e] p-6 text-center min-h-[220px] flex flex-col items-center justify-center">
        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Your Roofing Company</p>
        <h3 className="font-heading font-extrabold text-white text-lg leading-tight mb-2">
          Your Trusted<br />Roofing Experts
        </h3>
        <p className="text-white/50 text-xs mb-3">Serving Nashville & Middle Tennessee</p>
        <div className="flex gap-2 justify-center">
          <span className="bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1.5 rounded-lg">
            Get a Free Estimate
          </span>
          <span className="border border-white/20 text-white/70 text-[10px] px-3 py-1.5 rounded-lg">
            (615) 555-0199
          </span>
        </div>
      </div>
    </div>

    {/* Phone frame overlapping */}
    <div className="absolute -bottom-4 -right-4 w-28 rounded-xl border-2 border-border bg-foreground overflow-hidden shadow-xl">
      <div className="h-3 bg-foreground/90" />
      <div className="bg-[#1a1a2e] p-3 text-center min-h-[100px] flex flex-col items-center justify-center">
        <p className="font-heading font-bold text-white text-[8px] leading-tight mb-1">Your Trusted Roofers</p>
        <span className="bg-primary text-primary-foreground text-[6px] font-bold px-2 py-0.5 rounded">
          Free Estimate
        </span>
      </div>
    </div>
  </motion.div>
);

/* ───── Features data ───── */
const features = [
  { icon: Globe, title: "Custom Roofing Website", desc: "Not a generic template. Built specifically for roofing contractors with service pages, project galleries, and quote request forms." },
  { icon: Search, title: "Local SEO That Works", desc: "We target the searches that matter: 'roof repair near me', 'roofing contractor [your city]', 'emergency roof leak.'" },
  { icon: MapPin, title: "Google Business Profile", desc: "We set up and optimize your Google Business Profile so you show up in Maps, local search, and the 3-pack." },
  { icon: Instagram, title: "Social Media Content", desc: "Before and after photos, seasonal tips, storm damage awareness posts — all created and scheduled automatically." },
  { icon: Megaphone, title: "Google Local Service Ads", desc: "Pay-per-lead ads that put you at the very top of Google. Only pay when a homeowner calls.", premium: true },
  { icon: Star, title: "Review Management", desc: "Automated review requests after every job. More 5-star reviews = more trust = more calls." },
  { icon: PhoneIncoming, title: "Call/Text Back System", desc: "Miss a call? We automatically text them back within 60 seconds. Don't lose that lead.", premium: true },
  { icon: BarChart3, title: "Weekly Reports", desc: "Know exactly how many people visited your site, called your number, and found you on Google." },
];

/* ───── Stats ───── */
const stats = [
  { value: "8,000+", label: "Google impressions in 3 months" },
  { value: "3x", label: "More phone calls in 60 days" },
  { value: "$0", label: "Down to get started" },
];

/* ───── Steps ───── */
const steps = [
  { num: "1", title: "Pick This Template", desc: "Click 'Get This Template' and create your account. Takes 2 minutes." },
  { num: "2", title: "Tell Us About Your Business", desc: "Add your company name, logo, service area, and services. We handle the rest." },
  { num: "3", title: "Start Getting Calls", desc: "Your site goes live, SEO kicks in, and your AI team starts working 24/7." },
];

/* ───── FAQ ───── */
const faqData = [
  { q: "How is this different from HomeAdvisor or Angi?", a: "Those platforms own your leads and charge you per click. With Skooped, you own your website, your SEO, and your customers. No middleman taking a cut." },
  { q: "I already have a website. Can you work with it?", a: "Absolutely. We can rebuild from this template or optimize what you have. We'll do a free review and give you an honest recommendation." },
  { q: "Do you work with roofing companies outside of Tennessee?", a: "Yes. Our AI team works nationwide. We target the specific cities and services you cover." },
  { q: "How quickly will I see results?", a: "Your website goes live within a week. SEO movement starts in 30-60 days. Ad leads can start the same week your campaigns launch." },
  { q: "What if I need to update my website myself?", a: "You'll have access to a simple editor in your dashboard. Change your colors, update your text, swap photos — no coding needed." },
];

/* ───── Pricing tiers ───── */
const tiers = [
  { name: "Single", price: "$49", desc: "Website + basic SEO" },
  { name: "Double", price: "$99", desc: "Website + SEO + social media", popular: true },
  { name: "Triple", price: "$149", desc: "Everything + ads + call-back" },
];

/* ───── FAQ Item ───── */
const FaqItem = ({ q, a, open, toggle }: { q: string; a: string; open: boolean; toggle: () => void }) => (
  <div className="border-b border-border">
    <button className="w-full flex items-center justify-between py-5 text-left group" onClick={toggle}>
      <span className="font-heading font-bold text-foreground group-hover:text-primary transition-colors pr-4">{q}</span>
      <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
        <ChevronDown size={20} className="text-muted-foreground shrink-0" />
      </motion.span>
    </button>
    <motion.div
      initial={false}
      animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <p className="pb-5 text-sm text-muted-foreground leading-relaxed bg-card rounded-lg px-4 py-3 mb-4">{a}</p>
    </motion.div>
  </div>
);

/* ═══════════════════ PAGE ═══════════════════ */
const TemplateRoofing = () => {
  usePageSeo({
    title: "Roofing Contractor Website & Marketing | Built for Roofers | Skooped",
    description: "Get a custom roofing website with SEO, Google Ads, and social media — all managed by AI. Built specifically for roofing contractors. From $49/mo. No contracts.",
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-background"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 30% 40%, hsl(340 72% 52% / 0.06), transparent 50%), radial-gradient(ellipse at 70% 60%, hsl(34 68% 48% / 0.05), transparent 50%)",
          }}
        />
        <div className="relative container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center max-w-6xl">
          {/* Left */}
          <div>
            <ScrollReveal>
              <span className="inline-block bg-secondary/20 text-accent font-bold text-sm px-4 py-1.5 rounded-full mb-5">
                🏠 Built for Roofers
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl md:text-[48px] md:leading-tight font-extrabold text-foreground mb-4">
                A website that gets your phone ringing.
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg">
                Built specifically for roofing contractors. Custom design, SEO that targets homeowners in your area, Google Ads, social media — all managed by your AI team. Be online in under a week.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap gap-3 mb-3">
                <Link to="/contact">
                  <Button variant="hero" size="lg">Get This Template — $49/mo</Button>
                </Link>
                <Link to="/plans">
                  <Button variant="outline" size="lg">See Plans</Button>
                </Link>
              </div>
              <p className="text-xs text-muted-foreground">No contracts. No setup fee. Cancel anytime.</p>
            </ScrollReveal>
          </div>
          {/* Right */}
          <ScrollReveal delay={0.2}>
            <DeviceMockup />
          </ScrollReveal>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="py-20 px-6 bg-card/50">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground text-center mb-12">
              Everything a roofing company needs to dominate online
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <ScrollReveal key={f.title} delay={i * 0.05}>
                  <div className="bg-card border border-border rounded-2xl p-6 h-full hover:border-primary/40 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-foreground mb-1 flex items-center gap-2">
                          {f.title}
                          {f.premium && (
                            <span className="text-[10px] font-bold bg-accent/15 text-accent px-2 py-0.5 rounded-full">Premium</span>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Results / Stats ── */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-extrabold text-foreground text-center mb-12">
              What Skooped does for roofing companies
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {stats.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center bg-card border border-border rounded-2xl p-8">
                  <p className="font-heading text-4xl font-extrabold text-primary mb-2">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.2}>
            <blockquote className="bg-card border border-border rounded-2xl p-8 text-center max-w-2xl mx-auto">
              <p className="text-foreground italic leading-relaxed mb-4">
                "We went from barely showing up on Google to getting calls every day. Skooped built our site, set up our ads, and now we're on track for our best year ever."
              </p>
              <cite className="text-sm text-muted-foreground not-italic">— Roofing contractor, Franklin TN</cite>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 px-6 bg-card/50">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-extrabold text-foreground text-center mb-12">
              How it works
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-extrabold text-lg mx-auto mb-4">
                    {s.num}
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Reminder ── */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {tiers.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className={`relative rounded-2xl border p-6 text-center ${t.popular ? "border-primary bg-card shadow-lg" : "border-border bg-card"}`}>
                  {t.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-[10px] font-bold px-3 py-0.5 rounded-full">
                      Most Popular
                    </span>
                  )}
                  <p className="font-heading font-extrabold text-foreground text-lg mb-1">{t.name}</p>
                  <p className="font-heading text-3xl font-extrabold text-primary mb-2">{t.price}<span className="text-sm text-muted-foreground font-normal">/mo</span></p>
                  <p className="text-sm text-muted-foreground">{t.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mb-6">All plans include a custom roofing website. No contracts.</p>
          <div className="text-center">
            <Link to="/contact">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">Get Started with Roofing Template</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6 bg-card/50">
        <div className="container mx-auto max-w-2xl">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-extrabold text-foreground text-center mb-10">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>
          {faqData.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} open={openFaq === i} toggle={() => setOpenFaq(openFaq === i ? null : i)} />
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 px-6 bg-maroon">
        <div className="container mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
              Your next customer is searching for a roofer right now.
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-8">Make sure they find you.</p>
            <Link to="/contact">
              <Button variant="hero" size="xl">Get This Template — Start Free</Button>
            </Link>
            <div className="mt-6">
              <a href="tel:6158563871" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary transition-colors font-heading font-bold">
                <Phone size={18} /> Or call us: 615-856-3871
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default TemplateRoofing;
