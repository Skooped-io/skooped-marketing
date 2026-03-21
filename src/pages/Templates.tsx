import { Link } from "react-router-dom";
import {
  Hammer, TreePine, Grid3X3, HardHat, Heart, Compass,
  Wrench, Home, Dumbbell, Scissors, Droplets, Zap, ArrowRight, Sparkles, ExternalLink,
  Crown, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSeo from "@/hooks/use-page-seo";

interface Industry {
  name: string;
  icon: typeof Hammer;
  tagline: string;
  href: string;
  available: boolean;
  previewSlug?: string;
}

const industries: Industry[] = [
  { name: "Roofing", icon: Hammer, tagline: "Professional online presence for roofing contractors", href: "/templates/roofing", available: true, previewSlug: "roofing" },
  { name: "Landscaping", icon: TreePine, tagline: "Grow your online presence and book more jobs", href: "/templates/landscaping", available: true, previewSlug: "landscaping" },
  { name: "Fencing", icon: Grid3X3, tagline: "Build your digital boundary and attract local leads", href: "/templates/fencing", available: true, previewSlug: "fencing" },
  { name: "Therapy & Counseling", icon: Heart, tagline: "Connect with clients who need you most", href: "/templates/therapy-counseling", available: true, previewSlug: "therapy" },
  { name: "Construction", icon: HardHat, tagline: "Construct your online empire and win more bids", href: "/templates/construction", available: true, previewSlug: "construction" },
  { name: "Auto Repair", icon: Wrench, tagline: "Drive more customers to your shop", href: "/templates/auto-repair", available: true, previewSlug: "auto-repair" },
  { name: "Life Coaching", icon: Compass, tagline: "Guide more people to find you online", href: "/templates/life-coaching", available: true, previewSlug: "life-coaching" },
  { name: "Real Estate Services", icon: Home, tagline: "List your business and generate quality leads", href: "/templates/real-estate", available: true, previewSlug: "real-estate-agent" },
  { name: "Personal Training", icon: Dumbbell, tagline: "Flex your online presence and book more clients", href: "/templates/personal-training", available: true, previewSlug: "personal-training" },
  { name: "Salon & Barbershop", icon: Scissors, tagline: "Cut through the competition with a stunning site", href: "/templates/salon-barbershop", available: true, previewSlug: "salon-barber-shop" },
  { name: "Plumbing", icon: Droplets, tagline: "Stop leaking leads and get found locally", href: "/templates/plumbing", available: true, previewSlug: "plumbing" },
  { name: "Electrical", icon: Zap, tagline: "Power up your marketing and win more jobs", href: "/templates/electrical", available: true, previewSlug: "electrical" },
];

const Templates = () => {
  usePageSeo({
    title: "Website Templates by Industry | Skooped — AI Marketing Platform",
    description: "Browse Skooped's industry-specific website templates. Roofing, landscaping, construction, therapy, coaching & more. Try any template free for 14 days.",
  });

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-16 -left-20 w-72 h-72 rounded-full bg-primary/12 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-[-3rem] w-56 h-56 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="relative container mx-auto px-6 text-center max-w-3xl">
          <ScrollReveal>
            <h1 className="text-4xl md:text-[52px] md:leading-tight font-extrabold text-foreground mb-4">
              Pick your industry. Try it free.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Every template comes with a custom website, SEO, social media, and your own AI marketing team. 14 days free — no credit card required.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <p className="mt-4 text-sm font-semibold text-primary">
              ⚡ Every template goes live in 60 seconds after signup. No waiting.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Compact Template Grid */}
      <section className="pb-12 px-6">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="font-heading text-2xl font-extrabold text-foreground mb-6">Browse Templates</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              const previewUrl = ind.previewSlug
                ? `https://skooped-io.github.io/${ind.previewSlug}-template/`
                : undefined;
              return (
                <ScrollReveal key={ind.name} delay={i * 0.04}>
                  <div className="group relative rounded-xl border border-border bg-card/60 backdrop-blur-sm px-5 py-4 transition-all duration-300 hover:shadow-md hover:border-primary hover:-translate-y-0.5 h-full flex flex-col">
                    {/* Title row with icon inline */}
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-primary" />
                      </div>
                      <h3 className="font-heading font-bold text-foreground">{ind.name}</h3>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 leading-snug">{ind.tagline}</p>

                    {/* Single CTA + hover demo link */}
                    <div className="mt-auto flex items-center gap-3">
                      <Link to={ind.href} className="flex-1">
                        <Button variant="hero" size="sm" className="w-full text-sm py-2">
                          Try Free <ArrowRight size={13} />
                        </Button>
                      </Link>
                      {previewUrl && (
                        <a
                          href={previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-primary hover:underline opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0 flex items-center gap-1"
                        >
                          Demo <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Custom Website Cards */}
      <section className="pb-12 px-6">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="font-heading text-2xl font-extrabold text-foreground mb-6">Custom Builds</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Standard Custom Build */}
            <ScrollReveal>
              <div className="relative rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-primary to-accent text-primary-foreground h-full flex flex-col">
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: "radial-gradient(circle at 20% 50%, hsl(0 0% 100% / 0.15), transparent 50%)",
                }} />
                <div className="relative flex-1 flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-primary-foreground/15 flex items-center justify-center mb-4">
                    <Sparkles size={24} className="text-primary-foreground" />
                  </div>
                  <h3 className="font-heading text-xl font-extrabold mb-1">Custom Build with Cooper</h3>
                  <p className="text-3xl font-extrabold mb-2">$299 <span className="text-sm font-semibold text-primary-foreground/70">one-time</span></p>
                  <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">
                    Cooper and the AI team design and build a completely custom website tailored to your brand and business.
                  </p>
                  <ul className="space-y-2 mb-6 text-sm text-primary-foreground/80">
                    <li className="flex items-start gap-2"><Check size={16} className="text-primary-foreground mt-0.5 shrink-0" /> Custom design & development</li>
                    <li className="flex items-start gap-2"><Check size={16} className="text-primary-foreground mt-0.5 shrink-0" /> Delivered in 24-48 hours</li>
                    <li className="flex items-start gap-2"><Check size={16} className="text-primary-foreground mt-0.5 shrink-0" /> Includes 14-day free trial</li>
                  </ul>
                  <div className="mt-auto">
                    <Link to="/signup?template=custom">
                      <Button variant="secondary" size="lg" className="w-full bg-primary-foreground text-foreground hover:bg-primary-foreground/90 font-extrabold">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Concierge / Premium Build */}
            <ScrollReveal delay={0.1}>
              <div className="relative rounded-2xl overflow-hidden p-8 border-2 border-accent bg-card h-full flex flex-col">
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-accent/15 text-accent px-2.5 py-1 rounded-full">
                    <Crown size={12} /> Concierge
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Crown size={24} className="text-accent" />
                </div>
                <h3 className="font-heading text-xl font-extrabold text-foreground mb-1">Build with Cooper + Jake</h3>
                <p className="text-3xl font-extrabold text-foreground mb-2">Custom Pricing</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Want the founder involved? Get hands-on strategy, design, and development — personally built for businesses ready to scale fast.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><Check size={16} className="text-accent mt-0.5 shrink-0" /> 1-on-1 strategy session with Jake</li>
                  <li className="flex items-start gap-2"><Check size={16} className="text-accent mt-0.5 shrink-0" /> Custom design + development</li>
                  <li className="flex items-start gap-2"><Check size={16} className="text-accent mt-0.5 shrink-0" /> Priority support & dedicated attention</li>
                  <li className="flex items-start gap-2"><Check size={16} className="text-accent mt-0.5 shrink-0" /> Built for businesses ready to invest in growth</li>
                </ul>
                <div className="mt-auto">
                  <Link to="/contact">
                    <Button variant="outline" size="lg" className="w-full border-accent text-accent hover:bg-accent/10 font-extrabold">
                      Schedule a Call
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-24 px-6 text-center">
        <ScrollReveal>
          <h2 className="font-heading text-2xl font-extrabold text-foreground mb-2">Don't see your industry?</h2>
          <p className="text-muted-foreground mb-6">No problem. Cooper can build a custom site tailored to any business.</p>
          <Link to="/signup?template=custom">
            <Button variant="hero" size="xl">Build Custom — $299</Button>
          </Link>
        </ScrollReveal>
      </section>

      <Footer />
    </>
  );
};

export default Templates;
