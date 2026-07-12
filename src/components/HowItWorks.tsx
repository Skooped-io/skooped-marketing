import { Phone, ClipboardList, Rocket, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    num: "01",
    icon: Phone,
    heading: "Call, text, or send the form.",
    text: "Tell us what you need. We'll tell you straight which plan fits — no pitch, no pressure.",
  },
  {
    num: "02",
    icon: ClipboardList,
    heading: "One page of paper.",
    text: "Your scope and price on a single page. Pay the flat build price and we start same-week.",
  },
  {
    num: "03",
    icon: Rocket,
    heading: "Live in about a week.",
    text: "Your custom site, on-page SEO, domain and hosting handled. We launch it with you on the phone.",
    glow: true,
  },
  {
    num: "04",
    icon: MessageSquareText,
    heading: "You answer the phone.",
    text: "Every lead from your site is texted to you the moment it lands. A plain-English report hits your inbox monthly.",
  },
];

const HowItWorks = () => (
  <section className="py-24 px-6 relative overflow-hidden">
    <div className="absolute top-20 right-[-5rem] w-64 h-64 rounded-full bg-primary/12 blur-3xl pointer-events-none" />
    <div className="absolute bottom-10 left-[-4rem] w-48 h-48 rounded-full bg-accent/10 blur-2xl pointer-events-none" />
    <div className="container mx-auto max-w-5xl relative">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-2">
          From first call to live website in <span className="text-primary">about a week.</span>
        </h2>
        <p className="text-center text-muted-foreground mb-16">No 8-week agency timelines. No DIY homework. We build, you approve.</p>
      </ScrollReveal>

      <div className="grid md:grid-cols-4 gap-8 md:gap-6 relative">
        {/* Connector line (desktop only) */}
        <div className="hidden md:block absolute top-16 left-[12%] right-[12%] h-px border-t-2 border-dashed border-border" />

        {steps.map((step, i) => (
          <ScrollReveal key={i} delay={i * 0.12}>
            <div className={`text-center relative ${step.glow ? "md:scale-105" : ""}`}>
              <div className="text-5xl font-heading font-extrabold text-accent/60 mb-4">
                {step.num}
              </div>
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4 ${step.glow ? "bg-primary/20 ring-2 ring-primary/30 shadow-lg shadow-primary/20" : "bg-primary/10"}`}>
                <step.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">{step.heading}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">{step.text}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.5}>
        <div className="text-center mt-12">
          <a href="tel:6153151541">
            <Button variant="hero" size="xl">Call or Text 615-315-1541</Button>
          </a>
          <p className="text-sm text-muted-foreground mt-3">Builds from $500. Plans from $49/mo.</p>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default HowItWorks;
