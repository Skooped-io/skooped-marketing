import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

const FinalCTA = () => (
  <section className="relative py-24 px-6 bg-maroon overflow-hidden grain-overlay">
    {/* Subtle gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-maroon via-maroon to-primary/20" />

    <div className="relative container mx-auto text-center max-w-2xl">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
          Pick your template. Try it free for 14 days.
        </h2>
        <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
          Your website, your SEO, your social media — all managed by 7 AI specialists. No credit card required to start.
        </p>
        <Link to="/templates">
          <Button variant="hero" size="xl" className="mb-4">
            Start Your Free Trial
          </Button>
        </Link>
        <p className="text-sm text-primary-foreground/60 mb-4">14 days free. No credit card required.</p>
        <div>
          <a
            href="tel:6158563871"
            className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
          >
            Questions? Call us: 615-856-3871
          </a>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default FinalCTA;
