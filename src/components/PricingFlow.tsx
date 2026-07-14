import { Link } from "react-router-dom";
import { Hammer, RefreshCcw, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CallTextLink } from "@/components/CallTextButton";
import ScrollReveal from "./ScrollReveal";

const buildOptions = [
  { name: "Cake Cone", price: "$500", blurb: "The Launch build — 5-page custom site, on-page SEO, lead form wired to your phone" },
  { name: "Waffle Cone", price: "$1,000", blurb: "The Establish build — Cake Cone + Google Business Profile, reviews & local SEO" },
  { name: "The Sundae", price: "from $2,000", blurb: "Custom — fixed quote via a $300 Sample Spoon session, credited to your build" },
];

const monthlyOptions = [
  { name: "Single", price: "$49/mo", blurb: "Hosting, security, every lead texted to you, monthly report" },
  { name: "Double", price: "$149/mo", blurb: "Single + ongoing local SEO, reviews & content" },
  { name: "Triple", price: "$299/mo", blurb: "Double + ads management & social media" },
];

const StepCard = ({ step, title, note, icon: Icon, options }: {
  step: string;
  title: string;
  note: string;
  icon: typeof Hammer;
  options: typeof buildOptions;
}) => (
  <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-7 flex flex-col h-full shadow-md">
    <div className="flex items-center gap-3 mb-1">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <Icon size={20} className="text-primary" />
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">{step}</p>
        <h3 className="font-heading text-xl font-extrabold text-foreground">{title}</h3>
      </div>
    </div>
    <p className="text-xs text-muted-foreground mb-4">{note}</p>
    <div className="space-y-3 flex-1">
      {options.map((o) => (
        <div key={o.name} className="flex items-baseline justify-between gap-3 border-t border-border pt-3">
          <div>
            <span className="font-heading font-bold text-foreground">{o.name}</span>
            <p className="text-xs text-muted-foreground leading-relaxed">{o.blurb}</p>
          </div>
          <span className="font-heading font-extrabold text-primary whitespace-nowrap">{o.price}</span>
        </div>
      ))}
    </div>
  </div>
);

const PricingFlow = () => (
  <section className="py-20 px-6 relative overflow-hidden">
    <div className="absolute top-10 -left-32 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-primary/8 blur-2xl pointer-events-none" />
    <div className="container mx-auto px-0 max-w-5xl relative">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-3">
          One build. One monthly plan. <span className="swoosh-underline">Every client, both.</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          It's not either/or. The one-time build gets you online; the monthly plan keeps it running,
          ranking, and texting you every lead. Same prices as the plans page — no surprises.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-5 items-stretch">
        <ScrollReveal>
          <StepCard
            step="Step 1 · One-time"
            title="Pick your cone"
            note="Pay it once, own the site. Never billed again."
            icon={Hammer}
            options={buildOptions}
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex md:h-full items-center justify-center py-1">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
              <Plus size={26} strokeWidth={3} />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <StepCard
            step="Step 2 · Recurring"
            title="Pick your scoops"
            note="Keeps your site live, secure, and sending leads to your phone."
            icon={RefreshCcw}
            options={monthlyOptions}
          />
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.25}>
        <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 text-center mt-8">
          <p className="font-heading text-lg md:text-xl font-extrabold text-foreground">
            Most clients start here: Cake Cone + Single ={" "}
            <span className="text-primary">$500 today, then $49/mo.</span>
          </p>
          <p className="text-sm text-muted-foreground mt-1">That's the whole bill. No setup fees, no hourly surprises. Toppings optional.</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <div className="text-center mt-8">
          <Link to="/plans">
            <Button variant="hero" size="lg">See Full Plans &amp; Pricing</Button>
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
