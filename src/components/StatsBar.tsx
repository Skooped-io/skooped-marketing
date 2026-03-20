import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";

const stats = [
  { value: "60 seconds", label: "From signup to live website" },
  { value: "8,000+", label: "Google impressions in 3 months" },
  { value: "24/7", label: "AI-powered management" },
  { value: "$49", label: "Custom sites from $49/mo" },
];

const AnimatedNumber = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState(value);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const numMatch = value.match(/^[\$]?(\d[\d,]*)/);
    if (!numMatch || hasAnimated) return;

    const target = parseInt(numMatch[1].replace(/,/g, ""));
    const prefix = value.startsWith("$") ? "$" : "";
    const suffix = value.replace(/^[\$]?\d[\d,]*/, "");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1500;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * eased);
            setDisplayed(`${prefix}${current.toLocaleString()}${suffix}`);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return <span ref={ref}>{displayed}</span>;
};

const StatsBar = () => (
  <section className="py-16 bg-card px-6">
    <div className="container mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div>
              <div className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-1">
                <AnimatedNumber value={stat.value} />
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default StatsBar;
