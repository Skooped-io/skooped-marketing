import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";

const feedItems = [
  { time: "6:30 AM", color: "hsl(142 71% 45%)", agent: "Cooper", text: "generated your morning performance digest" },
  { time: "7:00 AM", color: "hsl(217 91% 60%)", agent: "Scout", text: "checked your Google rankings — up 3 positions" },
  { time: "9:00 AM", color: "hsl(142 71% 45%)", agent: "Sierra", text: 'published your Instagram post — "5 Signs You Need a New Roof"' },
  { time: "11:00 AM", color: "hsl(38 92% 50%)", agent: "Riley", text: "detected a traffic spike — investigating source" },
  { time: "2:00 PM", color: "hsl(217 91% 60%)", agent: "Bob", text: "ran a Lighthouse scan — performance score: 94" },
  { time: "4:00 PM", color: "hsl(263 70% 50%)", agent: "Sandra", text: "flagged: ad spend trending 8% under budget" },
  { time: "6:00 PM", color: "hsl(0 84% 60%)", agent: "Mark", text: "completed daily security scan — all clear" },
  { time: "8:00 PM", color: "hsl(142 71% 45%)", agent: "Scout", text: "identified 3 new keyword opportunities" },
  { time: "11:59 PM", color: "hsl(217 91% 60%)", agent: "Cooper", text: "compiled the daily summary and knowledge update" },
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
            Your Business Runs on Autopilot
          </h2>
          <p className="text-primary-foreground/60 text-center text-lg mb-12">
            Here's what happens behind the scenes — without you lifting a finger.
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
              <span className="text-primary-foreground/40 text-sm font-mono whitespace-nowrap w-20 shrink-0">
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
            This happens every day. For every client. Automatically.
          </p>
          <div className="text-center">
            <Link to="/plans">
              <Button variant="hero" size="xl">Get Your Team</Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AutomationFeed;
