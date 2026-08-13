import { motion } from "framer-motion";
import {
  MessageSquareText, Search, Gauge, Shield, Calendar, PieChart,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import CallTextButton from "@/components/CallTextButton";
import usePageSeo from "@/hooks/use-page-seo";

const systems = [
  {
    icon: MessageSquareText,
    name: "Lead capture & routing",
    desc: "Every form fill on your site reaches you the moment it lands — name, number, and what they asked for. Emailed always, texted if you opt in.",
  },
  {
    icon: Search,
    name: "Local SEO monitoring",
    desc: "Rankings tracked weekly, Google Search Console watched for drops, and competitor movement flagged before it costs you calls.",
  },
  {
    icon: Gauge,
    name: "Site health & speed",
    desc: "Nightly broken-link scans, weekly performance checks, and zero-downtime deploys on every update we ship.",
  },
  {
    icon: Shield,
    name: "Security & uptime",
    desc: "Daily security scans, SSL monitoring, and uptime checks on every site we run. Zero breaches, ever.",
  },
  {
    icon: Calendar,
    name: "Content & social",
    desc: "Content calendars, post scheduling, and monthly hashtag research on plans that include social.",
  },
  {
    icon: PieChart,
    name: "Plain-English reporting",
    desc: "A monthly report that says what happened and what we changed — visits, leads, rankings. No vanity metrics.",
  },
];

const tickerItems = [
  "SEO Monitoring", "Content Scheduling", "Security Scanning", "Website QA",
  "Analytics Reporting", "Cost Optimization", "Google Ads", "Social Media",
  "Keyword Research", "Performance Reports", "Threat Detection", "Budget Tracking",
];

const Marquee = () => (
  <div className="relative overflow-hidden py-4 mt-4">
    <motion.div
      className="flex gap-8 whitespace-nowrap"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      {[...tickerItems, ...tickerItems].map((item, i) => (
        <span key={i} className="text-sm text-muted-foreground/50 font-medium">
          {item} •
        </span>
      ))}
    </motion.div>
  </div>
);

const About = () => {
  usePageSeo({ title: "About Skooped | Websites & Marketing for Local Businesses | Franklin, Tennessee", description: "Skooped pairs a real person in Franklin, TN with automation that works 24/7 — SEO monitoring, site health, security, and every lead sent to you the moment it lands." });

  return (
    <>
      <Navbar />

      <div className="relative overflow-hidden">
        <div className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute top-[40%] -right-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-float-delayed" />

        {/* Header */}
        <section className="relative pt-28 pb-6">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <ScrollReveal>
              <h1 className="text-4xl md:text-[48px] md:leading-tight font-extrabold text-foreground mb-3">
                A marketing department that never clocks out.
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Skooped isn't a typical agency. Automation does the repetitive work around the clock —
                monitoring, scanning, reporting — and a real person in Franklin runs it all and answers
                when you call. That's how local businesses get a full marketing operation at a price that makes sense.
              </p>
            </ScrollReveal>
            <Marquee />
          </div>
        </section>

        {/* Systems */}
        <section className="relative pb-12 px-6">
          <div className="container mx-auto px-0 max-w-5xl">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {systems.map((s, i) => (
                <ScrollReveal key={s.name} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <s.icon size={22} className="text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-foreground mb-1.5">{s.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Summary stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {[
                { value: "Every lead", label: "sent to you instantly" },
                { value: "24/7/365", label: "monitoring & automation" },
                { value: "1 real human", label: "answers every call" },
              ].map((s) => (
                <ScrollReveal key={s.value}>
                  <div className="text-center bg-card/60 border border-border rounded-xl p-4">
                    <p className="font-heading text-2xl md:text-3xl font-extrabold text-primary mb-0.5">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* The human behind it */}
        <section className="relative py-10 px-6">
          <div className="container mx-auto px-0 max-w-3xl">
            <ScrollReveal>
              <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-border text-center">
                <h2 className="font-heading text-2xl font-extrabold text-foreground mb-1">Joseph Anderson</h2>
                <p className="text-muted-foreground font-medium text-sm mb-4">Owner &amp; Operator — Franklin, TN</p>
                <p className="text-foreground text-sm leading-relaxed max-w-xl mx-auto">
                  The systems above do the heavy lifting, but a real person runs Skooped and stands behind
                  every build. When you call or text, you reach Joseph — not a ticket queue.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="relative pb-16 px-6">
          <div className="container mx-auto px-0 max-w-2xl">
            <ScrollReveal>
              <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-center border border-border">
                <p className="font-heading text-xl font-extrabold text-foreground mb-2">
                  Every business is different. That's why we build custom.
                </p>
                <p className="text-muted-foreground text-sm mb-5">Build from $500 + plan from $49/mo, and every lead sent to you the moment it lands.</p>
                <CallTextButton />
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default About;
