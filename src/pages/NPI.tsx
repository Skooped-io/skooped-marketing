import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Globe, MapPin, Star, Bell, Share2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import CallTextButton, { PHONE_DISPLAY } from "@/components/CallTextButton";
import usePageSeo from "@/hooks/use-page-seo";
import { track } from "@/lib/analytics";

/* ───── What we do for practices ───── */
const features = [
  {
    icon: Globe,
    title: "A website that books clients",
    desc: "A clean, fast site built around your specialties and your intake — so the right clients find you and reach out.",
  },
  {
    icon: MapPin,
    title: "Found on Google",
    desc: "We set up and manage your Google Business Profile so you show up when someone searches for a therapist in your area.",
  },
  {
    icon: Star,
    title: "Reviews, handled",
    desc: "We make it easy for clients to leave reviews and we respond to them — quietly building the trust that fills your calendar.",
  },
  {
    icon: Bell,
    title: "Every inquiry sent to you instantly",
    desc: "New-client inquiries hit your phone the moment they land. No portal to check, no lead left waiting.",
  },
  {
    icon: Share2,
    title: "Social kept alive",
    desc: "We keep your pages posting so your practice looks present and active — without you touching it.",
  },
  {
    icon: Phone,
    title: "One human, not a hotline",
    desc: "You get a real person who knows your practice. Call or text and you reach us — not a ticket queue.",
  },
];

/* ───── Monthly plans (shared grid) ───── */
const tiers = [
  { name: "Single", price: "$49", desc: "Hosting, updates, lead alerts, monthly report" },
  { name: "Double", price: "$149", desc: "Single + ongoing local SEO & content", popular: true },
  { name: "Triple", price: "$299", desc: "Double + Google and Meta ads, and 4 posts a month" },
];

/* ───── How it works ───── */
const steps = [
  { num: "1", title: "Book a Call", desc: "Tell us about your practice — your specialties, your area, and how clients find you today." },
  { num: "2", title: "We Build It", desc: "We stand up your website and Google presence, tuned to how people actually search for care." },
  { num: "3", title: "Live in About a Week", desc: "We launch with you on the phone — and from day one, every inquiry lands straight in your inbox (texted too if you opt in)." },
];

/* ═══════════════════ PAGE ═══════════════════ */
const NPI = () => {
  usePageSeo({
    title: "Skooped × Nashville Psychotherapy Institute — Community Partner",
    description:
      "Skooped is the Nashville Psychotherapy Institute's Community Partner for marketing — websites, Google, reviews, and every new-client inquiry sent to you instantly. Built for Nashville practices.",
  });

  useEffect(() => {
    track("npi_view");
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-background"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 30% 40%, hsl(340 72% 52% / 0.06), transparent 50%), radial-gradient(ellipse at 70% 60%, hsl(34 68% 48% / 0.05), transparent 50%)",
          }}
        />
        <div className="relative container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center max-w-6xl">
          <div>
            <ScrollReveal>
              <span className="inline-block bg-secondary/20 text-accent font-bold text-sm px-4 py-1.5 rounded-full mb-5">
                🍦 Nashville Psychotherapy Institute — Community Partner
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl md:text-[48px] md:leading-tight font-extrabold text-foreground mb-4">
                Your NPI Community Partner for marketing.
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg">
                Skooped is the Nashville Psychotherapy Institute's Community Partner for marketing. We build your
                practice a website that books clients, keep your Google presence strong, and text every new-client
                inquiry straight to your phone — so you stay focused on the work that matters.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap gap-3 mb-3">
                <CallTextButton size="lg" label="Book a Call" onAction={() => track("npi_book_call")} />
                <Link to="/plans" onClick={() => track("npi_see_plans")}>
                  <Button variant="outline" size="lg">
                    See Our Plans
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-muted-foreground">
                Proud Community Partner of the Nashville Psychotherapy Institute.
              </p>
            </ScrollReveal>
          </div>

          {/* Spotlight photo */}
          <ScrollReveal delay={0.2}>
            <figure className="relative">
              <div className="rounded-2xl border-2 border-border overflow-hidden shadow-2xl bg-card">
                <img
                  src="/npi-spotlight.jpg"
                  alt="Skooped featured as a Community Partner at the Nashville Psychotherapy Institute"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <figcaption className="text-center text-xs text-muted-foreground mt-3">
                Community Partner Spotlight — Nashville Psychotherapy Institute
              </figcaption>
            </figure>
          </ScrollReveal>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-card/50">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground text-center mb-4">
              Everything your practice needs to get found.
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              One team handling the marketing so you can spend your time with clients, not on a screen.
            </p>
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
                        <h3 className="font-heading font-bold text-foreground mb-1">{f.title}</h3>
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

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-extrabold text-foreground text-center mb-12">How it works</h2>
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

      {/* Pricing */}
      <section className="py-20 px-6 bg-card/50">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <p className="text-center text-sm text-muted-foreground mb-6">
              Your build is <strong className="text-foreground">$500 flat</strong> — then pick the monthly plan that
              runs it.
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {tiers.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div
                  className={`relative rounded-2xl border p-6 text-center ${
                    t.popular ? "border-primary bg-card shadow-lg" : "border-border bg-card"
                  }`}
                >
                  {t.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-[10px] font-bold px-3 py-0.5 rounded-full">
                      Most Popular
                    </span>
                  )}
                  <p className="font-heading font-extrabold text-foreground text-lg mb-1">{t.name}</p>
                  <p className="font-heading text-3xl font-extrabold text-primary mb-2">
                    {t.price}
                    <span className="text-sm text-muted-foreground font-normal">/mo</span>
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">{t.desc}</p>
                  <Link to="/plans" onClick={() => track("npi_see_plans")}>
                    <Button variant={t.popular ? "hero" : "outline"} size="sm" className="w-full">
                      See Details
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center">
            <CallTextButton size="xl" label="Book a Call" onAction={() => track("npi_book_call")} />
            <p className="text-sm text-muted-foreground mt-3">
              Not sure what fits? Call or text {PHONE_DISPLAY} — we'll tell you straight.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-maroon">
        <div className="container mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
              Let's get your practice found.
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-8">
              As NPI's Community Partner, we make it simple. Start with a call — we'll tell you straight what fits.
            </p>
            <CallTextButton size="xl" label="Book a Call" onAction={() => track("npi_book_call")} />
            <p className="text-sm text-primary-foreground/60 mt-4">
              Proud Community Partner of the Nashville Psychotherapy Institute.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default NPI;
