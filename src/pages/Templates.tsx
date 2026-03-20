import { Link } from "react-router-dom";
import {
  Hammer, TreePine, Grid3X3, HardHat, Heart, Compass,
  Wrench, Home, Dumbbell, Scissors, Droplets, Zap, ArrowRight,
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
}

const industries: Industry[] = [
  { name: "Roofing", icon: Hammer, tagline: "Get on top of local search", href: "/templates/roofing", available: true },
  { name: "Landscaping", icon: TreePine, tagline: "Grow your online presence", href: "/templates/landscaping", available: true },
  { name: "Therapy & Counseling", icon: Heart, tagline: "Connect with clients who need you", href: "/templates/therapy-counseling", available: true },
  { name: "Salon & Barbershop", icon: Scissors, tagline: "Cut through the competition", href: "/templates/salon-barbershop", available: true },
  { name: "Plumbing", icon: Droplets, tagline: "Stop leaking leads", href: "/templates/plumbing", available: true },
  { name: "Fencing", icon: Grid3X3, tagline: "Build your digital boundary", href: "/contact", available: false },
  { name: "Construction", icon: HardHat, tagline: "Construct your online empire", href: "/contact", available: false },
  { name: "Life Coaching", icon: Compass, tagline: "Guide more people to find you", href: "/contact", available: false },
  { name: "Auto Repair", icon: Wrench, tagline: "Drive more customers to your shop", href: "/contact", available: false },
  { name: "Real Estate Services", icon: Home, tagline: "List your business, not just properties", href: "/contact", available: false },
  { name: "Personal Training", icon: Dumbbell, tagline: "Flex your online presence", href: "/contact", available: false },
  { name: "Electrical", icon: Zap, tagline: "Power up your marketing", href: "/contact", available: false },
];

const availableIndustries = industries.filter((i) => i.available);
const requestIndustries = industries.filter((i) => !i.available);

const Templates = () => {
  usePageSeo({
    title: "Website Templates by Industry | Skooped — AI Marketing Platform",
    description: "Browse Skooped's industry-specific website templates. Roofing, landscaping, construction, therapy, coaching & more. Pick your template and be online in minutes.",
  });

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-background"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 40% 30%, hsl(340 72% 52% / 0.06), transparent 50%), radial-gradient(ellipse at 60% 70%, hsl(34 68% 48% / 0.05), transparent 50%)",
          }}
        />
        <div className="relative container mx-auto px-6 text-center max-w-3xl">
          <ScrollReveal>
            <h1 className="text-4xl md:text-[52px] md:leading-tight font-extrabold text-foreground mb-4">
              Pick your industry. Get your website.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Every template comes with a custom website, SEO, social media, and your own AI marketing team. Choose your industry and be online in minutes.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Available Templates */}
      <section className="pb-12 px-6">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="font-heading text-2xl font-extrabold text-foreground mb-6">Available Now</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableIndustries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <ScrollReveal key={ind.name} delay={i * 0.05}>
                  <Link
                    to={ind.href}
                    className="group relative block rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-primary hover:-translate-y-1 h-full"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-foreground mb-1">{ind.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{ind.tagline}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                      View Template <ArrowRight size={14} />
                    </span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Available Upon Request */}
      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <div className="border-t border-border pt-10 mb-6">
              <h2 className="font-heading text-2xl font-extrabold text-foreground mb-1">Available Upon Request</h2>
              <p className="text-sm text-muted-foreground">Contact us and we'll have your template ready fast.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {requestIndustries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <ScrollReveal key={ind.name} delay={i * 0.05}>
                  <Link
                    to={ind.href}
                    className="relative block rounded-2xl border border-border bg-card p-6 opacity-70 h-full"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-primary/60" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-foreground mb-1">{ind.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{ind.tagline}</p>
                    <span className="inline-block text-[11px] font-bold bg-accent/15 text-accent px-3 py-1 rounded-full">
                      Available Upon Request
                    </span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-24 px-6 text-center">
        <ScrollReveal>
          <h2 className="font-heading text-2xl font-extrabold text-foreground mb-2">Need a template for a different industry?</h2>
          <p className="text-muted-foreground mb-6">We build custom templates for any business. Tell us your industry and we'll have it ready for you.</p>
          <Link to="/contact">
            <Button variant="hero" size="xl">Contact Us</Button>
          </Link>
        </ScrollReveal>
      </section>

      <Footer />
    </>
  );
};

export default Templates;
