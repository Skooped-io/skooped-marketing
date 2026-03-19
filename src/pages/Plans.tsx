import { motion } from "framer-motion";
import { Check, X, ChevronDown, Phone } from "lucide-react";
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

/* ───── Pricing card ───── */
interface PlanCardProps {
  name: string;
  tagline: string;
  price: string;
  tierImage: string;
  features: string[];
  whoFor: string;
  popular?: boolean;
  delay: number;
}

const PlanCard = ({ name, tagline, price, tierImage, features, whoFor, popular, delay }: PlanCardProps) => (
  <ScrollReveal delay={delay}>
    <motion.div
      className={`relative rounded-2xl p-8 flex flex-col h-full transition-shadow duration-300 ${
        popular
          ? "bg-card border-2 border-primary shadow-xl scale-[1.03] z-10"
          : "bg-card border border-border shadow-md"
      }`}
      whileHover={{
        perspective: 1000,
        rotateY: 2,
        boxShadow: "0 20px 40px -12px hsl(340 60% 57% / 0.15)",
      }}
      transition={{ duration: 0.3 }}
    >
      {popular && (
        <span className="absolute -top-3 right-6 bg-accent text-accent-foreground text-xs font-bold px-4 py-1 rounded-full shadow">
          Most Popular
        </span>
      )}

      {/* Tier image */}
      <div className="flex justify-center mb-4">
        <motion.img
          src={tierImage}
          alt={`${name} plan`}
          className="w-24 h-auto drop-shadow-lg"
          whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <h3 className="font-heading text-2xl font-extrabold text-foreground text-center">{name}</h3>
      <p className="text-muted-foreground text-sm text-center mb-4">{tagline}</p>
      <p className="text-center mb-6">
        <span className="font-heading text-4xl font-extrabold text-primary">{price}</span>
        <span className="text-muted-foreground text-sm">/mo</span>
      </p>

      <ul className="space-y-3 mb-6 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-foreground">
            <Check size={16} className="text-primary shrink-0 mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <p className="text-xs text-muted-foreground italic mb-6 border-t border-border pt-4">{whoFor}</p>

      <Link to="/contact">
        <Button variant="hero" size="lg" className="w-full">Get Started</Button>
      </Link>
    </motion.div>
  </ScrollReveal>
);

/* ───── FAQ accordion ───── */
const faqData = [
  { q: "Do I need to know anything about websites or marketing?", a: "Nope. That's literally why we exist. We handle everything — you just keep running your business." },
  { q: "How is this different from Wix or Squarespace?", a: "Those platforms give you a template and say 'good luck.' We build your site from scratch, optimize it for Google, manage your social media, and run your ads. You get an entire marketing team — not a DIY tool." },
  { q: "Do I own my website?", a: "Yes. Your website, your content, your data. Always." },
  { q: "How long does it take to get my website up?", a: "Most sites are live within 1-2 weeks. We move fast because we know your business can't wait." },
  { q: "Is there a contract or setup fee?", a: "No long-term contracts. No hidden fees. We earn your business every month." },
  { q: "How long does SEO take to work?", a: "You'll start seeing movement within 30-60 days. One client went from 200 to 8,000+ Google impressions in three months." },
  { q: "Will my phone actually ring more?", a: "That's the goal and the standard. If our work isn't driving real leads, we adjust." },
  { q: "Wait — your team is AI?", a: "Yes, and that's what makes us different. Our AI team works 24/7, never takes a day off, and costs a fraction of a traditional agency. But don't confuse AI with generic — every strategy is built specifically for your business." },
  { q: "Who do I talk to if I have a question?", a: "Cooper is your main point of contact. You can also call or text us at 615-856-3871." },
  { q: "What if I already have a website?", a: "We can work with it or rebuild from scratch — whatever makes sense. We'll do a free review and give you an honest recommendation." },
];

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

/* ───── Comparison table ───── */
const compRows = [
  { label: "Website build", trad: "$3,000 – $8,000", skoop: "Under $1,000" },
  { label: "Monthly retainer", trad: "$100 – $800/mo", skoop: "$49 – $149/mo" },
  { label: "Available", trad: "Business hours", skoop: "24/7" },
  { label: "Your dashboard", trad: false, skoop: true },
  { label: "AI-powered", trad: false, skoop: true },
  { label: "Contracts", trad: "6–12 months", skoop: "None" },
];

/* ───── Page ───── */
const Plans = () => {
  usePageSeo({ title: "Marketing & Website Pricing | Plans from $49/mo | Skooped Franklin TN", description: "Transparent pricing for custom websites, SEO, Google Ads & social media. Website builds under $1,000. Monthly plans from $49. No contracts." });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Navbar />

      {/* ── Header ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-background" style={{ backgroundImage: "radial-gradient(ellipse at 40% 30%, hsl(340 60% 57% / 0.06), transparent 50%), radial-gradient(ellipse at 60% 70%, hsl(35 56% 50% / 0.05), transparent 50%)" }} />
        <div className="relative container mx-auto px-6 text-center max-w-3xl">
          <ScrollReveal>
            <h1 className="text-4xl md:text-[52px] md:leading-tight font-extrabold text-foreground mb-4">
              Plans that grow with your business.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Every plan comes with a custom-built website, real SEO, and a team that works 24/7. No contracts. No hidden fees. Just results.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Pricing cards ── */}
      <section className="pb-20 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl items-stretch">
          <PlanCard
            name="Single Skoop"
            tagline="Get online and look legit."
            price="$49"
            tierImage={tier1Img}
            features={[
              "Custom-built website (not a template)",
              "Mobile-responsive design",
              "Basic SEO setup",
              "Google Business Profile setup",
              "Monthly performance check-in",
              "Hosting & maintenance included",
            ]}
            whoFor="You're just getting started or running your business off a Facebook page. This gets you a real website for less than your phone bill."
            delay={0}
          />
          <PlanCard
            name="Double Skoop"
            tagline="Start showing up and standing out."
            price="$99"
            tierImage={tier2Img}
            features={[
              "Everything in Single Skoop, plus:",
              "Ongoing SEO monitoring & optimization",
              "Google Search Console management",
              "Monthly content updates",
              "Social media (Instagram + Facebook)",
              "Google Analytics setup",
              "Priority support",
            ]}
            whoFor="You have a website but nobody can find you. This puts you on the map — literally."
            popular
            delay={0.1}
          />
          <PlanCard
            name="Triple Skoop"
            tagline="The full operation. We run it all."
            price="$149"
            tierImage={tier3Img}
            features={[
              "Everything in Double Skoop, plus:",
              "Google Local Service Ads management",
              "Advanced SEO pages (service + city targeting)",
              "Advanced analytics & conversion tracking",
              "Call/text back system integration",
              "Scheduling integration",
              "Weekly performance reports",
              "Dedicated account management",
            ]}
            whoFor="You're ready to dominate your market. Ads, SEO, analytics, scheduling — the works."
            delay={0.2}
          />
        </div>
      </section>

      {/* ── Build pricing note ── */}
      <section className="pb-16 px-6 text-center">
        <ScrollReveal>
          <p className="font-heading font-extrabold text-xl text-foreground mb-1">
            Website builds start under $1,000 — or $0 down with any monthly plan.
          </p>
          <p className="text-muted-foreground">Every site is custom-built. No templates. No compromises.</p>
        </ScrollReveal>
      </section>

      {/* ── Comparison table ── */}
      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-card">
                    <th className="text-left py-4 px-5 font-heading font-bold text-foreground" />
                    <th className="text-center py-4 px-5 font-heading font-bold text-foreground">Traditional Agency</th>
                    <th className="text-center py-4 px-5 font-heading font-bold text-primary border-l-2 border-primary/30">Skooped</th>
                  </tr>
                </thead>
                <tbody>
                  {compRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-card"}>
                      <td className="py-3.5 px-5 font-medium text-foreground">{row.label}</td>
                      <td className="py-3.5 px-5 text-center text-muted-foreground">
                        {typeof row.trad === "boolean" ? (
                          row.trad ? <Check size={18} className="mx-auto text-green-600" /> : <X size={18} className="mx-auto text-muted-foreground/40" />
                        ) : row.trad}
                      </td>
                      <td className="py-3.5 px-5 text-center font-semibold text-foreground border-l-2 border-primary/30">
                        {typeof row.skoop === "boolean" ? (
                          row.skoop ? <Check size={18} className="mx-auto text-green-600" /> : <X size={18} className="mx-auto text-muted-foreground/40" />
                        ) : row.skoop}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-2xl">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-extrabold text-foreground text-center mb-10">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>
          {faqData.map((item, i) => (
            <FaqItem
              key={i}
              q={item.q}
              a={item.a}
              open={openFaq === i}
              toggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
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
            <Link to="/contact">
              <Button variant="hero" size="xl">Get Started</Button>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </>
  );
};

export default Plans;
