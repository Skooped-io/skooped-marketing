import { ClipboardList, Rocket, PhoneIncoming } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    num: "01",
    icon: ClipboardList,
    heading: "Tell us about your business",
    text: "We learn what you do, who you serve, and what success looks like.",
  },
  {
    num: "02",
    icon: Rocket,
    heading: "Start your free trial",
    text: "Sign up with just your email. No credit card, no commitment. You get 14 days to experience your full AI marketing team in action.",
  },
  {
    num: "03",
    icon: PhoneIncoming,
    heading: "Watch your phone ring",
    text: "Our AI team manages everything 24/7. You focus on your business.",
  },
];

const HowItWorks = () => (
  <section className="py-24 px-6">
    <div className="container mx-auto">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-bold text-chocolate text-center mb-16">
          How it <span className="swoosh-underline">works</span>
        </h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
        {/* Connector line (desktop only) */}
        <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-px border-t-2 border-dashed border-border" />

        {steps.map((step, i) => (
          <ScrollReveal key={i} delay={i * 0.15}>
            <div className="text-center relative">
              <div className="text-5xl font-heading font-extrabold text-accent/60 mb-4">
                {step.num}
              </div>
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
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
