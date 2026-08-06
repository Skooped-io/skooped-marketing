import { Link } from "react-router-dom";
import {
  Hammer, TreePine, Grid3X3, HardHat, Heart, Compass,
  Wrench, Home, Dumbbell, Scissors, Droplets, Zap, ArrowRight, ExternalLink,
  Puzzle, Check,
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
  { name: "Real Estate Services", icon: Home, tagline: "List your business and generate quality leads", href: "/templates/real-estate", available: true, previewSlug: "real-estate" },
  { name: "Personal Training", icon: Dumbbell, tagline: "Flex your online presence and book more clients", href: "/templates/personal-training", available: true, previewSlug: "personal-training" },
  { name: "Salon & Barbershop", icon: Scissors, tagline: "Cut through the competition with a stunning site", href: "/templates/salon-barbershop", available: true, previewSlug: "salon" },
  { name: "Plumbing", icon: Droplets, tagline: "Stop leaking leads and get found locally", href: "/templates/plumbing", available: true, previewSlug: "plumbing" },
  { name: "Electrical", icon: Zap, tagline: "Power up your marketing and win more jobs", href: "/templates/electrical", available: true, previewSlug: "electrical" },
];

const Templates = () => {
  usePageSeo({
    title: "Website Examples by Industry | Skooped — Franklin TN",
    description: "See the websites Skooped builds for roofers, landscapers, contractors, therapists, coaches & more. Custom builds from $500 — every lead texted to your phone.",
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
              The websites we build.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Every Skooped build starts from a proven industry design and gets customized to your business — your brand,
              your services, your service area. A Cup build is $500 flat, live in about a week.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <p className="mt-4 text-sm font-semibold text-primary">
              Browse the live demos below, then call or text 615-315-1541 to start yours.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Compact Template Grid */}
      <section className="pb-12 px-6">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="font-heading text-2xl font-extrabold text-foreground mb-6">Browse by industry</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              const previewUrl = ind.previewSlug
                ? `https://preview-${ind.previewSlug}.skooped.io`
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
                          See Details <ArrowRight size={13} />
                        </Button>
                      </Link>
                      {previewUrl && (
                        <a
                          href={previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-primary hover:underline p-2 -m-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 shrink-0 flex items-center gap-1"
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
            <h2 className="font-heading text-2xl font-extrabold text-foreground mb-6">Need something beyond a website?</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Custom / Integration */}
            <ScrollReveal>
              <div className="relative rounded-2xl overflow-hidden p-8 bg-gradient-to-br from-primary to-accent text-primary-foreground h-full flex flex-col">
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: "radial-gradient(circle at 20% 50%, hsl(0 0% 100% / 0.15), transparent 50%)",
                }} />
                <div className="relative flex-1 flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-primary-foreground/15 flex items-center justify-center mb-4">
                    <Puzzle size={24} className="text-primary-foreground" />
                  </div>
                  <h3 className="font-heading text-xl font-extrabold mb-1">The Sundae — Custom Builds & Integrations</h3>
                  <p className="text-3xl font-extrabold mb-2">from $2,000</p>
                  <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">
                    Booking systems, quoting tools, online stores, dashboards, AI integrations, multi-location businesses.
                  </p>
                  <ul className="space-y-2 mb-6 text-sm text-primary-foreground/80">
                    <li className="flex items-start gap-2"><Check size={16} className="text-primary-foreground mt-0.5 shrink-0" /> Fixed quote — never estimated on the spot</li>
                    <li className="flex items-start gap-2"><Check size={16} className="text-primary-foreground mt-0.5 shrink-0" /> Milestone billing: 50% start, 50% launch</li>
                    <li className="flex items-start gap-2"><Check size={16} className="text-primary-foreground mt-0.5 shrink-0" /> Scoped through a Sample Spoon session</li>
                  </ul>
                  <div className="mt-auto">
                    <Link to="/contact">
                      <Button variant="secondary" size="lg" className="w-full bg-primary-foreground text-foreground hover:bg-primary-foreground/90 font-extrabold">
                        Book a Sample Spoon Session
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Discovery */}
            <ScrollReveal delay={0.1}>
              <div className="relative rounded-2xl overflow-hidden p-8 border-2 border-accent bg-card h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Check size={24} className="text-accent" />
                </div>
                <h3 className="font-heading text-xl font-extrabold text-foreground mb-1">The Sample Spoon — Discovery Session</h3>
                <p className="text-3xl font-extrabold text-foreground mb-2">$300 <span className="text-sm font-semibold text-muted-foreground">credited to your build</span></p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  How custom work starts. One hour on your business, then a written roadmap and fixed quote within 7 days.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><Check size={16} className="text-accent mt-0.5 shrink-0" /> 1-hour sit-down about your business</li>
                  <li className="flex items-start gap-2"><Check size={16} className="text-accent mt-0.5 shrink-0" /> Written roadmap + fixed quote in 7 days</li>
                  <li className="flex items-start gap-2"><Check size={16} className="text-accent mt-0.5 shrink-0" /> 100% credited if you sign within 30 days</li>
                </ul>
                <div className="mt-auto">
                  <Link to="/contact">
                    <Button variant="outline" size="lg" className="w-full border-accent text-accent hover:bg-accent/10 font-extrabold">
                      Book My Session
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
          <p className="text-muted-foreground mb-6">We build custom for any local business — the Cup build is still $500 flat.</p>
          <Link to="/contact">
            <Button variant="hero" size="xl">Start My Build</Button>
          </Link>
        </ScrollReveal>
      </section>

      <Footer />
    </>
  );
};

export default Templates;
