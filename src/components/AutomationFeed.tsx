import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";

const feedItems = [
  { time: "2:14 PM", color: "hsl(217 91% 60%)", agent: "Your website", text: 'captures a lead — "Need a quote on a backyard fence, ~120 ft."' },
  { time: "2:14 PM", color: "hsl(142 71% 45%)", agent: "Skooped", text: "texts it to your phone — name, number, and what they asked for" },
  { time: "2:16 PM", color: "hsl(38 92% 50%)", agent: "You", text: "call them back while your competitors' inboxes sit unread" },
  { time: "2:31 PM", color: "hsl(263 70% 50%)", agent: "You", text: "book the walkthrough. That's the whole point." },
  { time: "Month's end", color: "hsl(340 60% 57%)", agent: "Skooped", text: "sends your plain-English report — visits, leads, and what we changed" },
];

const AutomationFeed = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section className="py-20 px-6 bg-maroon relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <div className="relative container mx-auto max-w-3xl">
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary-foreground text-center mb-3">
            A lead lands. Your phone buzzes.
          </h2>
          <p className="text-primary-foreground/60 text-center text-lg mb-12">
            Here's what happens when someone fills out the form on your website.
          </p>
        </ScrollReveal>

        {/* Feed */}
        <div ref={ref} className="space-y-0 mb-12">
          {feedItems.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-4 py-3 border-b border-primary-foreground/10 last:border-0"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-primary-foreground/40 text-sm font-mono whitespace-nowrap w-24 shrink-0">
                {item.time}
              </span>
              <span className="text-primary-foreground/90 text-sm">
                <strong className="text-primary-foreground">{item.agent}</strong>{" "}
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>

        <ScrollReveal delay={1.2}>
          <p className="text-primary-foreground/50 text-center text-sm mb-8">
            Leads that sit in an inbox go cold. Leads that hit your pocket get booked.
          </p>
          <div className="text-center">
            <a href="tel:6158563871">
              <Button variant="hero" size="xl">Call or Text 615-856-3871</Button>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AutomationFeed;
