import { motion } from "framer-motion";
import { Check, X, ChevronDown, Phone, CreditCard, Rocket, Heart } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSeo from "@/hooks/use-page-seo";
import tier1Img from "@/assets/skooped-tier-1.png";
import tier2Img from "@/assets/skooped-tier-2.png";
import tier3Img from "@/assets/skooped-tier-3.png";

/* ───── Pricing card (compact) ───── */
interface PlanCardProps {
  name: string;
  tagline: string;
  price: string;
  features: string[];
  popular?: boolean;
  delay: number;
  accentColor?: string;
  image: string;
  expanded: boolean;
  onToggleExpand: () => void;
  isMobile: boolean;
}

const PlanCard = ({ name, tagline, price, features, popular, delay, image, expanded, onToggleExpand, isMobile }: PlanCardProps) => {
  const visibleFeatures = expanded ? features : features.slice(0, 5);

  return (
    <ScrollReveal delay={delay}>
      <motion.div
        className={`relative rounded-2xl p-6 flex flex-col h-full transition-shadow duration-300 ${
          popular
            ? "bg-card border-2 border-primary shadow-xl scale-[1.03] z-10"
            : "bg-card/80 backdrop-blur-sm border border-border shadow-md"
        }`}
        whileHover={{
          boxShadow: "0 20px 40px -12px hsl(340 60% 57% / 0.15)",
        }}
        transition={{ duration: 0.3 }}
      >
        {popular && (
          <span className="absolute -top-3 right-6 bg-accent text-accent-foreground text-xs font-bold px-4 py-1 rounded-full shadow">
            Most Popular
          </span>
        )}

        <img src={image} alt={`${name} plan`} className="w-24 h-24 object-contain mx-auto mb-2" />
        <h3 className="font-heading text-xl font-extrabold text-foreground text-center">{name}</h3>
        <p className="text-muted-foreground text-xs text-center mb-3">{tagline}</p>
        <p className="text-center mb-4">
          <span className="font-heading text-4xl font-extrabold text-primary">{price}</span>
          <span className="text-muted-foreground text-sm">/mo</span>
        </p>

        <ul className="space-y-2 mb-3 flex-1">
          {visibleFeatures.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground">
              <Check size={14} className="text-primary shrink-0 mt-0.5" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {features.length > 5 && !isMobile && (
          <button
            onClick={onToggleExpand}
            className="text-xs text-primary font-semibold mb-4 hover:underline flex items-center gap-1 mx-auto"
          >
            {expanded ? "Show less" : `See all ${features.length} features`}
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={12} />
            </motion.span>
          </button>
        )}

        <Link to="/signup">
          <Button variant="hero" size="lg" className="w-full">Try Free — 14 Days</Button>
        </Link>
        <p className="text-[11px] text-muted-foreground text-center mt-1.5">No credit card required</p>
      </motion.div>
    </ScrollReveal>
  );
};

/* ───── FAQ data (grouped, trimmed to 8) ───── */
const faqGroups = [
  {
    title: "Getting Started",
    items: [
      { q: "Is the free trial really free?", a: "Yes. No credit card, no hidden fees. Pick a template, sign up, and your website is live in 60 seconds. You get 14 full days with your AI team." },
      { q: "How is this different from Wix or Squarespace?", a: "Those platforms give you a template and say 'good luck.' We build your site, optimize it for Google, manage your social media, and run your ads. You get an entire marketing team — not a DIY tool." },
      { q: "How long does SEO take to work?", a: "You'll start seeing movement within 30-60 days. One client went from 200 to 8,000+ Google impressions in three months." },
    ],
  },
  {
    title: "What's Included",
    items: [
      { q: "Do I own my website?", a: "Yes. Your website, your content, your data. Always." },
      { q: "Will my phone actually ring more?", a: "That's the goal and the standard. If our work isn't driving real leads, we adjust." },
      { q: "Wait — your team is AI?", a: "Yes, and that's what makes us different. Our AI team works 24/7, never takes a day off, and costs a fraction of a traditional agency. But every strategy is built specifically for your business." },
    ],
  },
  {
    title: "Billing & Contracts",
    items: [
      { q: "Is there a contract or setup fee?", a: "No long-term contracts. No hidden fees. We earn your business every month." },
      { q: "What if I already have a website?", a: "We can work with it or rebuild from scratch — whatever makes sense. We'll do a free review and give you an honest recommendation." },
    ],
  },
];

/* ───── Comparison table ───── */
const compRows = [
  { label: "Setup fee", trad: "$3,000 – $8,000", skoop: "$0 (templates) / $299 (custom)" },
  { label: "Website delivery", trad: "4-8 weeks", skoop: "60 seconds / 24-48 hrs" },
  { label: "Monthly cost", trad: "$100 – $800/mo", skoop: "$49 – $149/mo" },
  { label: "Availability", trad: "Business hours", skoop: "24/7" },
  { label: "Free trial", trad: false, skoop: "14 days free" },
  { label: "Your dashboard", trad: false, skoop: true },
  { label: "AI-powered", trad: false, skoop: true },
  { label: "Contracts", trad: "6–12 months", skoop: "None" },
];

/* ───── How trial works steps ───── */
const trialSteps = [
  { icon: CreditCard, title: "Pick a template & plan", desc: "Browse our industry templates, choose one, and select the plan that fits your business. You won't be charged anything today." },
  { icon: Rocket, title: "Your AI team builds your site", desc: "Your website goes live in 60 seconds. Your 7-person AI team starts working — SEO, social media, analytics, everything." },
  { icon: Heart, title: "Decide if it's for you", desc: "After 14 days, add a payment method to keep your team working. No card on file? Your site goes to sleep (not deleted) — come back anytime." },
];

/* ───── Page ───── */
const Plans = () => {
  const isMobile = useIsMobile();
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const allExpanded = isMobile || featuresExpanded;
  const toggleExpand = () => setFeaturesExpanded(prev => !prev);
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
              Plans that grow with your business.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Every plan comes with a custom website, real SEO, and a team that works 24/7. No contracts. No hidden fees.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Trial banner ── */}
      <section className="px-6 mb-6">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-primary rounded-xl py-3 px-6 text-center">
            <p className="font-heading font-extrabold text-primary-foreground text-base">
              🎉 Try any plan free for 14 days — no credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* ── Pricing cards (compact) ── */}
      <section className="pb-16 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl items-stretch">
          <PlanCard
            name="Single"
            tagline="Get online and look legit."
            price="$49"
            features={[
              "Instant website — live in 60 seconds",
              "Custom-built website (not a template)",
              "Mobile-responsive design",
              "Basic SEO setup",
              "Google Business Profile setup",
              "Monthly performance check-in",
              "Hosting & maintenance included",
            ]}
            delay={0}
            image={tier1Img}
            expanded={allExpanded}
            onToggleExpand={toggleExpand}
            isMobile={isMobile}
          />
          <PlanCard
            name="Double"
            tagline="Start showing up and standing out."
            price="$99"
            features={[
              "Everything in Single, plus:",
              "Ongoing SEO monitoring & optimization",
              "Google Search Console management",
              "Monthly content updates",
              "Social media (Instagram + Facebook)",
              "Google Analytics setup",
              "Priority support",
            ]}
            popular
            delay={0.1}
            image={tier2Img}
            expanded={allExpanded}
            onToggleExpand={toggleExpand}
            isMobile={isMobile}
          />
          <PlanCard
            name="Triple"
            tagline="The full operation. We run it all."
            price="$149"
            features={[
              "Everything in Double, plus:",
              "Google Local Service Ads management",
              "Advanced SEO pages (service + city)",
              "Advanced analytics & conversion tracking",
              "Call/text back system integration",
              "Scheduling integration",
              "Weekly performance reports",
              "Dedicated account management",
            ]}
            delay={0.2}
            image={tier3Img}
            expanded={allExpanded}
            onToggleExpand={toggleExpand}
            isMobile={isMobile}
          />
        </div>
      </section>

      {/* ── Build pricing note ── */}
      <section className="pb-12 px-6 text-center">
        <ScrollReveal>
          <p className="font-heading font-extrabold text-xl text-foreground mb-1">
            Templates: $0 to go live. Custom builds: $299 one-time.
          </p>
          <p className="text-muted-foreground">Pick a template, add your details, live instantly. Or get a one-of-a-kind design in 24-48 hours.</p>
        </ScrollReveal>
      </section>

      {/* ── How the free trial works ── */}
      <section className="pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-extrabold text-foreground text-center mb-8">How the free trial works</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {trialSteps.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <s.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span>🔒 No credit card required</span>
            <span>❌ Cancel anytime</span>
            <span>✅ Your data is always yours</span>
          </div>
        </div>
      </section>

      {/* ── Comparison table (enhanced) ── */}
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
          <h2 className="font-heading text-2xl font-extrabold text-foreground mb-3">Still have questions?</h2>
          <a href="tel:6158563871" className="inline-flex items-center gap-2 text-2xl md:text-3xl font-heading font-extrabold text-primary hover:underline mb-6">
            <Phone size={24} /> 615-856-3871
          </a>
          <div>
            <Link to="/templates">
              <Button variant="hero" size="xl">Start Your Free Trial</Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-3">14 days free. No credit card required.</p>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </>
  );
};

export default Plans;
