import { Monitor, TrendingUp, Share2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

const cards = [
  {
    icon: Monitor,
    heading: "No templates. No drag-and-drop headaches.",
    text: "Every Skooped site is built from scratch to match your business. Not a cookie-cutter template — a real website designed to convert visitors into customers.",
  },
  {
    icon: TrendingUp,
    heading: "Show up when your customers are searching.",
    text: "We monitor your Google rankings, optimize your content, and build the pages that get you found. One client went from 200 Google impressions to over 8,000 in three months.",
  },
  {
    icon: Share2,
    heading: "Consistent content without lifting a finger.",
    text: "Instagram, Facebook — planned, created, and scheduled by our AI content team. Your online presence stays active even when you're busy.",
  },
  {
    icon: MapPin,
    heading: "Get found. Get calls. Get booked.",
    text: "Google Local Service Ads, Business Profile optimization, and analytics tracking. We drive the right traffic that turns into paying customers.",
  },
];

const ValueProps = () => (
  <section className="py-24 px-6">
    <div className="container mx-auto">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-bold text-chocolate text-center mb-16">
          Everything your business needs to{" "}
          <span className="swoosh-underline">grow</span>
        </h2>
      </ScrollReveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="group bg-card rounded-lg p-6 border border-border hover:-translate-y-1 hover:border-primary hover:shadow-[0_2px_8px_rgba(54,28,36,0.06)] transition-all duration-200 h-full">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <card.icon size={20} className="text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-2">{card.heading}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{card.text}</p>
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

export default ValueProps;
