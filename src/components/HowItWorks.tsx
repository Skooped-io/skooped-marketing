import { Layout, Paintbrush, Rocket, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    num: "01",
    icon: Layout,
    heading: "Pick your industry.",
    text: "Browse templates built for your business. Each one converts visitors into customers.",
  },
  {
    num: "02",
    icon: Paintbrush,
    heading: "Add your brand.",
    text: "Logo, colors, services, business details. Live preview updates in real-time. Takes 3 minutes.",
  },
  {
    num: "03",
    icon: Rocket,
    heading: "Your website is live.",
    text: "Not in a few days. Right now. Hit 'Go Live' and you're online immediately.",
    glow: true,
  },
  {
    num: "04",
    icon: Bot,
    heading: "7 AI specialists get to work.",
    text: "Scout tracks rankings. Sierra schedules social. Mark runs security. Riley sets up analytics. 24/7 autopilot.",
  },
];

const HowItWorks = () => (
  <section className="py-24 px-6">
    <div className="container mx-auto max-w-5xl">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-2">
          From signup to live website in <span className="text-primary">60 seconds.</span>
        </h2>
        <p className="text-center text-muted-foreground mb-16">Not days. Not weeks. Sixty. Seconds.</p>
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
          <Link to="/templates">
            <Button variant="hero" size="xl">Start Your Free Trial</Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-3">14 days free. No credit card required.</p>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default HowItWorks;
