import { Link } from "react-router-dom";
import CallTextButton from "@/components/CallTextButton";
import ScrollReveal from "./ScrollReveal";

const FinalCTA = () => (
  <section className="relative py-24 px-6 bg-maroon overflow-hidden grain-overlay">
    <div className="absolute inset-0 bg-gradient-to-br from-maroon via-maroon to-primary/20" />

    <div className="relative container mx-auto px-0 text-center max-w-2xl">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
          Ready when you are.
        </h2>
        <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
          A custom build from $500 plus a monthly plan from $49 — every client gets both, and every lead reaches you the moment it lands. One call and we'll tell you exactly what fits.
        </p>
        <CallTextButton withIcon className="mb-4" />
        <div>
          <Link
            to="/contact"
            className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm underline"
          >
            Prefer to type? Send us a message →
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default FinalCTA;
