import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSeo from "@/hooks/use-page-seo";
import { industryTemplates, type IndustryTemplate as ITemplate } from "@/data/industryTemplates";

/* ───── Device Mockup ───── */
const DeviceMockup = ({ data }: { data: ITemplate }) => (
  <motion.div
    className="relative"
    animate={{ y: [0, -8, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    <div className="relative w-full max-w-md mx-auto rounded-xl border-2 border-border bg-foreground overflow-hidden shadow-2xl">
      <div className="h-6 bg-foreground/90 flex items-center gap-1.5 px-3">
        <span className="w-2 h-2 rounded-full bg-destructive/60" />
        <span className="w-2 h-2 rounded-full bg-secondary/60" />
        <span className="w-2 h-2 rounded-full bg-green-500/60" />
      </div>
      <div className="bg-foreground p-6 text-center min-h-[220px] flex flex-col items-center justify-center">
        <p className="text-[10px] text-primary-foreground/40 uppercase tracking-widest mb-2">{data.mockupCompany}</p>
        <h3 className="font-heading font-extrabold text-primary-foreground text-lg leading-tight mb-2 whitespace-pre-line">
          {data.mockupHeadline}
        </h3>
        <p className="text-primary-foreground/50 text-xs mb-3">{data.mockupLocation}</p>
        <div className="flex gap-2 justify-center">
          <span className="bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1.5 rounded-lg">
            {data.mockupCta}
          </span>
          <span className="border border-primary-foreground/20 text-primary-foreground/70 text-[10px] px-3 py-1.5 rounded-lg">
            (615) 555-0199
          </span>
        </div>
      </div>
    </div>
    <div className="absolute -bottom-4 -right-4 w-28 rounded-xl border-2 border-border bg-foreground overflow-hidden shadow-xl">
      <div className="h-3 bg-foreground/90" />
      <div className="bg-foreground p-3 text-center min-h-[100px] flex flex-col items-center justify-center">
        <p className="font-heading font-bold text-primary-foreground text-[8px] leading-tight mb-1">{data.mockupHeadline.split("\n")[0]}</p>
        <span className="bg-primary text-primary-foreground text-[6px] font-bold px-2 py-0.5 rounded">
          {data.mockupCta}
        </span>
      </div>
    </div>
  </motion.div>
);

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

/* ───── Pricing tiers (shared) ───── */
const tiers = [
  { name: "Single", price: "$49", desc: "Website + basic SEO" },
  { name: "Double", price: "$99", desc: "Website + SEO + social media", popular: true },
  { name: "Triple", price: "$149", desc: "Everything + ads + call-back" },
];

/* ───── Steps (shared) ───── */
const steps = [
  { num: "1", title: "Pick This Template", desc: "Click 'Try This Template Free' and create your account. Takes 2 minutes." },
  { num: "2", title: "Tell Us About Your Business", desc: "Add your company name, logo, service area, and services. We handle the rest." },
  { num: "3", title: "Your Site Is Live in 60 Seconds", desc: "Your website goes live instantly. Your AI team starts SEO, social media, and analytics 24/7." },
];

/* ═══════════════════ PAGE ═══════════════════ */
const IndustryTemplate = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? industryTemplates[slug] : undefined;
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const previewUrl = slug ? `https://skooped-io.github.io/template-${slug}/` : undefined;

  usePageSeo(data?.seo ?? { title: "Templates | Skooped", description: "" });

  if (!data) return <Navigate to="/templates" replace />;

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-background" style={{ backgroundImage: "radial-gradient(ellipse at 30% 40%, hsl(340 72% 52% / 0.06), transparent 50%), radial-gradient(ellipse at 70% 60%, hsl(34 68% 48% / 0.05), transparent 50%)" }} />
        <div className="relative container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center max-w-6xl">
          <div>
            <ScrollReveal>
              <span className="inline-block bg-secondary/20 text-accent font-bold text-sm px-4 py-1.5 rounded-full mb-5">
                {data.emoji} {data.badge}
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl md:text-[48px] md:leading-tight font-extrabold text-foreground mb-4">{data.headline}</h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg">{data.subtext}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap gap-3 mb-3">
                <Link to={`/signup?template=${slug}`}><Button variant="hero" size="lg">Try This Template Free — Live in 60 Seconds</Button></Link>
                <Link to="/plans"><Button variant="outline" size="lg">See Plans</Button></Link>
                {previewUrl && (
                  <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg">
                      Open Live Demo <ExternalLink size={16} className="ml-1" />
                    </Button>
                  </a>
                )}
              </div>
              <p className="text-xs text-muted-foreground">14 days free. No credit card required.</p>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.2}>
            <DeviceMockup data={data} />
          </ScrollReveal>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-card/50">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground text-center mb-12">{data.featuresHeading}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {data.features.map((f, i) => {
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
                          {f.premium && <span className="text-[10px] font-bold bg-accent/15 text-accent px-2 py-0.5 rounded-full">Premium</span>}
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

      {/* Stats */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-extrabold text-foreground text-center mb-12">{data.statsHeading}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
            <ScrollReveal delay={0}>
              <div className="text-center bg-card border border-border rounded-2xl p-8">
                <p className="font-heading text-4xl font-extrabold text-primary mb-2">60 sec</p>
                <p className="text-sm text-muted-foreground">From signup to live website</p>
              </div>
            </ScrollReveal>
            {data.stats.map((s, i) => (
              <ScrollReveal key={i} delay={(i + 1) * 0.1}>
                <div className="text-center bg-card border border-border rounded-2xl p-8">
                  <p className="font-heading text-4xl font-extrabold text-primary mb-2">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.2}>
            <blockquote className="bg-card border border-border rounded-2xl p-8 text-center max-w-2xl mx-auto">
              <p className="text-foreground italic leading-relaxed mb-4">"{data.testimonial.quote}"</p>
              <cite className="text-sm text-muted-foreground not-italic">— {data.testimonial.cite}</cite>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-card/50">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-extrabold text-foreground text-center mb-12">How it works</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-extrabold text-lg mx-auto mb-4">{s.num}</div>
                  <h3 className="font-heading font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <p className="text-center text-sm text-muted-foreground mb-6">Start with any plan — your first 14 days are on us.</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {tiers.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className={`relative rounded-2xl border p-6 text-center ${t.popular ? "border-primary bg-card shadow-lg" : "border-border bg-card"}`}>
                  {t.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-[10px] font-bold px-3 py-0.5 rounded-full">Most Popular</span>}
                  <p className="font-heading font-extrabold text-foreground text-lg mb-1">{t.name}</p>
                  <p className="font-heading text-3xl font-extrabold text-primary mb-2">{t.price}<span className="text-sm text-muted-foreground font-normal">/mo</span></p>
                  <p className="text-sm text-muted-foreground mb-4">{t.desc}</p>
                  <Link to={`/signup?template=${slug}`}>
                    <Button variant={t.popular ? "hero" : "outline"} size="sm" className="w-full">Try Free</Button>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mb-6">All plans include a custom {data.name.toLowerCase()} website. No contracts.</p>
          <div className="text-center">
            <Link to={`/signup?template=${slug}`}>
              <Button variant="hero" size="xl" className="w-full sm:w-auto">Start Your Free Trial</Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-3">14 days free. No credit card required.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-card/50">
        <div className="container mx-auto max-w-2xl">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-extrabold text-foreground text-center mb-10">Frequently Asked Questions</h2>
          </ScrollReveal>
          {data.faq.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} open={openFaq === i} toggle={() => setOpenFaq(openFaq === i ? null : i)} />
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-maroon">
        <div className="container mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">{data.ctaHeadline}</h2>
            <p className="text-primary-foreground/70 text-lg mb-8">{data.ctaSub}</p>
            <Link to={`/signup?template=${slug}`}><Button variant="hero" size="xl">Start Your Free Trial — No Card Needed</Button></Link>
            <p className="text-sm text-primary-foreground/60 mt-3">14 days free. No credit card required.</p>
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

export default IndustryTemplate;
