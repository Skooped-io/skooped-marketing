import { Link } from "react-router-dom";
import { Rocket, TrendingUp, Puzzle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

const doors = [
  {
    icon: Rocket,
    label: "Get me online",
    price: "$500",
    priceNote: "one-time + Single plan from $49/mo",
    text: "A 5-page custom website, on-page SEO, your domain handled, and a lead form that texts your phone. Built and live in about a week.",
    cta: "Start My Build",
    href: "/contact",
  },
  {
    icon: TrendingUp,
    label: "Run my marketing",
    price: "$149/mo",
    priceNote: "Double — or Triple at $299/mo",
    text: "Already have a site — or just bought one? We run the local SEO, reviews, content, and ads so your phone keeps ringing.",
    cta: "Pick My Plan",
    href: "/plans",
    popular: true,
  },
  {
    icon: Puzzle,
    label: "I need something custom",
    price: "$300",
    priceNote: "Discovery — 100% credited to your build",
    text: "Booking systems, quoting tools, online stores, multi-location. A 1-hour sit-down, then a written roadmap and fixed quote within 7 days.",
    cta: "Book My Session",
    href: "/contact",
  },
];

const ThreeDoors = () => (
  <section className="py-20 px-6 relative overflow-hidden">
    <div className="absolute top-10 -left-32 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-primary/8 blur-2xl pointer-events-none" />
    <div className="container mx-auto max-w-5xl relative">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-3">
          Three ways to start. <span className="swoosh-underline">One easy decision.</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          One number, one button each. If you're not sure which fits, call us and we'll tell you straight.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {doors.map((door, i) => (
          <ScrollReveal key={door.label} delay={i * 0.1}>
            <div
              className={`relative rounded-2xl p-7 flex flex-col h-full ${
                door.popular
                  ? "bg-card border-2 border-primary shadow-xl"
                  : "bg-card/80 backdrop-blur-sm border border-border shadow-md"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <door.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-heading text-xl font-extrabold text-foreground mb-2">
                "{door.label}"
              </h3>
              <p className="mb-1">
                <span className="font-heading text-4xl font-extrabold text-primary">{door.price}</span>
              </p>
              <p className="text-xs text-muted-foreground mb-4">{door.priceNote}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{door.text}</p>
              <Link to={door.href}>
                <Button variant={door.popular ? "hero" : "hero-outline"} size="lg" className="w-full">
                  {door.cta}
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ThreeDoors;
