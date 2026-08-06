import { Link } from "react-router-dom";
import { Hammer, RefreshCcw, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CallTextLink } from "@/components/CallTextButton";
import ScrollReveal from "./ScrollReveal";

/* Compact pricing teaser — the full menu and interactive builder live on /plans.
   This section only teaches the two-number model and hands off; no option lists here. */
const PricingFlow = () => (
  <section className="py-20 px-6 relative overflow-hidden">
    <div className="absolute top-10 -left-32 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-primary/8 blur-2xl pointer-events-none" />
    <div className="container mx-auto px-0 max-w-4xl relative">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-3">
          One build. One monthly plan. <span className="swoosh-underline">Every client, both.</span>
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          The one-time build gets you online; the monthly plan keeps it running,
          ranking, and texting you every lead. That's the whole model.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-8">
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/80 backdrop-blur-sm px-5 py-4 shadow-md flex-1 sm:max-w-xs">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Hammer size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-heading font-extrabold text-foreground leading-tight">Pick your build</p>
              <p className="text-sm text-muted-foreground">One-time, from <strong className="text-primary">$500</strong></p>
            </div>
          </div>
          <div className="hidden sm:flex w-10 h-10 rounded-full bg-primary text-primary-foreground items-center justify-center shadow-lg shrink-0 mx-auto">
            <Plus size={22} strokeWidth={3} />
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/80 backdrop-blur-sm px-5 py-4 shadow-md flex-1 sm:max-w-xs">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <RefreshCcw size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-heading font-extrabold text-foreground leading-tight">Pick your scoops</p>
              <p className="text-sm text-muted-foreground">Monthly, from <strong className="text-primary">$49/mo</strong></p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 text-center">
          <p className="font-heading text-lg md:text-xl font-extrabold text-foreground">
            Most clients start here: Cup + Single ={" "}
            <span className="text-primary">$500 today, then $49/mo.</span>
          </p>
          <p className="text-sm text-muted-foreground mt-1">That's the whole bill. No setup fees, no hourly surprises. Toppings optional.</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="text-center mt-8">
          <Link to="/plans">
            <Button variant="hero" size="lg">
              <span className="sm:hidden">Build your sundae &rarr;</span>
              <span className="hidden sm:inline">Build your sundae — see full pricing &rarr;</span>
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-3">
            Not sure which fits?{" "}
            <CallTextLink className="text-primary font-semibold hover:underline">Call or text 615-315-1541 →</CallTextLink>
          </p>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default PricingFlow;
