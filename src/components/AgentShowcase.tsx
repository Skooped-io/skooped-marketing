import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  MessageSquare, CheckCircle, FolderKanban, Users, ArrowDownUp,
  Search, BarChart3, Globe, FileText, Eye,
  Code, Smartphone, Gauge, Rocket, Wrench,
  Calendar, Pen, Clock, Megaphone, Hash,
  TrendingUp, Target, PieChart, LineChart, Lightbulb,
  Shield, Lock, AlertTriangle, ScanLine, FileCheck,
  DollarSign, Cpu, Bell, Zap, ReceiptText,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { type LucideIcon } from "lucide-react";

import cooperAvatar from "@/assets/agents/cooper.png";
import scoutAvatar from "@/assets/agents/scout.png";
import bobAvatar from "@/assets/agents/bob.png";
import sierraAvatar from "@/assets/agents/sierra.png";
import rileyAvatar from "@/assets/agents/riley.png";
import markAvatar from "@/assets/agents/mark.png";
import sandraAvatar from "@/assets/agents/sandra.png";

interface AgentData {
  name: string;
  title: string;
  bio: string;
  gradientFrom: string;
  gradientTo: string;
  capabilities: string[];
  automations: { icon: LucideIcon; text: string }[];
  stat: string;
  capabilityIcons: LucideIcon[];
  avatar?: string;
}

const agents: AgentData[] = [
  {
    name: "Cooper",
    title: "Operations Lead",
    bio: "Cooper runs the day-to-day. Client communication, quality control, SEO oversight, website QA — if it has Skooped's name on it, Cooper made sure it's right. Think of him as your dedicated account manager who happens to be available 24/7.",
    gradientFrom: "hsl(340 60% 45%)",
    gradientTo: "hsl(330 70% 30%)",
    capabilities: ["Client Communication", "Quality Control", "Project Management", "Task Delegation", "Team Coordination"],
    capabilityIcons: [MessageSquare, CheckCircle, FolderKanban, ArrowDownUp, Users],
    automations: [
      { icon: Clock, text: "Daily performance digest — every morning at 6:30 AM" },
      { icon: Users, text: "Client onboarding workflows — triggered on signup" },
      { icon: FolderKanban, text: "Agent task assignment — auto-delegates based on priority" },
      { icon: AlertTriangle, text: "Escalation alerts — flags urgent items to Jake instantly" },
    ],
    stat: "1,247 actions this month",
    avatar: cooperAvatar,
  },
  {
    name: "Scout",
    title: "SEO Specialist",
    bio: "Scout keeps eyes on your Google rankings, monitors Search Console, researches keywords, and builds the strategy that gets your business found. If your competitors are outranking you, Scout's already fixing that.",
    gradientFrom: "hsl(217 91% 60%)",
    gradientTo: "hsl(224 76% 48%)",
    capabilities: ["Keyword Research", "Rank Tracking", "Google Search Console", "Content Optimization", "Competitor Analysis"],
    capabilityIcons: [Search, BarChart3, Globe, FileText, Eye],
    automations: [
      { icon: BarChart3, text: "Weekly keyword ranking report" },
      { icon: Globe, text: "Google Search Console monitoring — alerts on ranking drops" },
      { icon: FileText, text: "New content SEO scoring — checks every page before publish" },
      { icon: Eye, text: "Competitor movement alerts — tracks rival rankings" },
    ],
    stat: "Monitoring 24/7",
    avatar: scoutAvatar,
  },
  {
    name: "Bob",
    title: "Web Developer",
    bio: "Bob builds every Skooped website from scratch. No templates, no shortcuts. Mobile-responsive, fast-loading, and designed to convert visitors into customers.",
    gradientFrom: "hsl(142 71% 45%)",
    gradientTo: "hsl(142 64% 24%)",
    capabilities: ["Custom Websites", "Mobile Optimization", "Performance Tuning", "Code Deployment", "Site Maintenance"],
    capabilityIcons: [Code, Smartphone, Gauge, Rocket, Wrench],
    automations: [
      { icon: Gauge, text: "Lighthouse performance scans — weekly on every client site" },
      { icon: Rocket, text: "Auto-deploy on code push — zero-downtime deployments" },
      { icon: ScanLine, text: "Broken link detection — scans all pages nightly" },
      { icon: Lock, text: "SSL certificate monitoring — alerts 30 days before expiry" },
    ],
    stat: "847 deploys this month",
    avatar: bobAvatar,
  },
  {
    name: "Sierra",
    title: "Social Media Specialist",
    bio: "Sierra manages your Instagram and Facebook — content calendars, captions, scheduling, and brand voice. Your social media stays active even when you're on a job site.",
    gradientFrom: "hsl(263 70% 50%)",
    gradientTo: "hsl(263 67% 42%)",
    capabilities: ["Content Calendar", "Caption Writing", "Post Scheduling", "Brand Voice", "Platform Management"],
    capabilityIcons: [Calendar, Pen, Clock, Megaphone, Hash],
    automations: [
      { icon: Calendar, text: "Weekly content calendar generation — 7 posts planned" },
      { icon: Megaphone, text: "Auto-post to Instagram & Facebook — on schedule" },
      { icon: Hash, text: "Hashtag research — refreshed monthly per industry" },
      { icon: Bell, text: "Engagement alerts — flags comments that need responses" },
    ],
    stat: "312 posts scheduled",
    avatar: sierraAvatar,
  },
  {
    name: "Riley",
    title: "Analytics & Reporting",
    bio: "Riley tracks everything — website traffic, conversion rates, ad performance, SEO progress. No vanity metrics, no fluff — just the numbers that matter.",
    gradientFrom: "hsl(38 92% 50%)",
    gradientTo: "hsl(33 90% 42%)",
    capabilities: ["Traffic Analysis", "Conversion Tracking", "Custom Reports", "Data Visualization", "Trend Spotting"],
    capabilityIcons: [TrendingUp, Target, PieChart, LineChart, Lightbulb],
    automations: [
      { icon: PieChart, text: "Weekly client performance report — delivered every Monday" },
      { icon: TrendingUp, text: "Traffic anomaly detection — alerts on unusual spikes or drops" },
      { icon: DollarSign, text: "Monthly ROI summary — shows exactly what your marketing earned" },
      { icon: Target, text: "Goal tracking — monitors conversion targets in real-time" },
    ],
    stat: "98 reports generated",
    avatar: rileyAvatar,
  },
  {
    name: "Mark",
    title: "Security",
    bio: "Mark keeps your website secure, your data protected, and your systems running clean. From SSL certificates to vulnerability monitoring, nothing gets past Mark.",
    gradientFrom: "hsl(0 84% 60%)",
    gradientTo: "hsl(0 72% 45%)",
    capabilities: ["Vulnerability Scanning", "SSL Monitoring", "Firewall Rules", "Threat Detection", "Compliance"],
    capabilityIcons: [ScanLine, Lock, Shield, AlertTriangle, FileCheck],
    automations: [
      { icon: ScanLine, text: "Daily security scan — every website, every day" },
      { icon: AlertTriangle, text: "Threat detection — blocks suspicious activity in real-time" },
      { icon: FileCheck, text: "Weekly security digest — full report to the team" },
      { icon: Lock, text: "SSL & certificate monitoring — never let security lapse" },
    ],
    stat: "0 breaches. Ever.",
    avatar: markAvatar,
  },
  {
    name: "Sandra",
    title: "Resource Intelligence",
    bio: "Sandra watches the budget so you don't have to. Every dollar spent on your marketing is tracked and optimized. No wasted spend, no surprises.",
    gradientFrom: "hsl(24 95% 53%)",
    gradientTo: "hsl(20 90% 38%)",
    capabilities: ["Cost Tracking", "API Usage", "Budget Alerts", "Spend Optimization", "Efficiency Reports"],
    capabilityIcons: [DollarSign, Cpu, Bell, Zap, ReceiptText],
    automations: [
      { icon: DollarSign, text: "Daily cost tracking — every API call, every dollar" },
      { icon: Bell, text: "Budget threshold alerts — warns before overspending" },
      { icon: ReceiptText, text: "Monthly efficiency report — where to save, where to invest" },
      { icon: Cpu, text: "Model usage optimization — always uses the cheapest effective AI" },
    ],
    stat: "$0 wasted this month",
    avatar: sandraAvatar,
  },
];

/* ─── Marquee ─── */
const tickerItems = [
  "SEO Monitoring", "Content Scheduling", "Security Scanning", "Website QA",
  "Analytics Reporting", "Cost Optimization", "Google Ads", "Social Media",
  "Keyword Research", "Performance Reports", "Threat Detection", "Budget Tracking",
];

export const Marquee = () => (
  <div className="relative overflow-hidden py-4 mt-6">
    <motion.div
      className="flex gap-8 whitespace-nowrap"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      {[...tickerItems, ...tickerItems].map((item, i) => (
        <span key={i} className="text-sm text-muted-foreground/50 font-medium">
          {item} •
        </span>
      ))}
    </motion.div>
  </div>
);

/* ─── Avatar or Gradient Fallback ─── */
const AgentAvatar = ({ agent, size = "lg" }: { agent: AgentData; size?: "lg" | "sm" | "xs" }) => {
  const sizeClasses = size === "lg" ? "w-48 h-48" : size === "sm" ? "w-14 h-14" : "w-14 h-14";
  const textSize = size === "lg" ? "text-6xl" : "text-xl";

  if (agent.avatar) {
    return (
      <div
        className={`${sizeClasses} rounded-full overflow-hidden relative z-10`}
        style={{ boxShadow: `0 0 60px ${agent.gradientFrom}40` }}
      >
        <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses} rounded-full flex items-center justify-center relative z-10`}
      style={{
        background: `linear-gradient(135deg, ${agent.gradientFrom}, ${agent.gradientTo})`,
        boxShadow: `0 0 60px ${agent.gradientFrom}40`,
      }}
    >
      <span className={`${textSize} font-heading font-extrabold text-white/90`}>{agent.name[0]}</span>
    </div>
  );
};

/* ─── Desktop Agent Section ─── */
const AgentSection = ({ agent }: { agent: AgentData; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-20% 0px" });

  return (
    <div
      ref={ref}
      className="min-h-[70vh] hidden md:flex items-center py-12 px-6"
      style={{
        background: `linear-gradient(135deg, ${agent.gradientFrom}10, transparent 40%, ${agent.gradientTo}08)`,
      }}
    >
      <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-16 items-center">
        {/* Left — Visual */}
        <motion.div
          className="relative flex flex-col items-center justify-center"
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="absolute font-heading font-extrabold text-[180px] leading-none select-none pointer-events-none"
            style={{ color: agent.gradientFrom, opacity: 0.08 }}
          >
            {agent.name[0]}
          </span>
          <AgentAvatar agent={agent} size="lg" />
          <h3 className="font-heading text-2xl font-extrabold text-foreground mt-6">{agent.name}</h3>
          <p className="text-muted-foreground text-sm">{agent.title}</p>
        </motion.div>

        {/* Right — Details */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-green-600 font-semibold">Active 24/7</span>
          </div>
          <h3 className="font-heading text-3xl font-extrabold text-foreground mb-1">{agent.name}</h3>
          <p className="text-muted-foreground mb-4">{agent.title}</p>
          <p className="text-foreground leading-relaxed mb-6">{agent.bio}</p>

          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">What I Do</p>
            <div className="flex flex-wrap gap-2">
              {agent.capabilities.map((cap, j) => {
                const CapIcon = agent.capabilityIcons[j];
                return (
                  <span key={cap} className="inline-flex items-center gap-1.5 text-xs font-medium bg-card border border-border rounded-full px-3 py-1.5 text-foreground">
                    <CapIcon size={12} className="text-primary" /> {cap}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Automations I Run</p>
            <div className="space-y-2">
              {agent.automations.map((auto) => {
                const AutoIcon = auto.icon;
                return (
                  <div key={auto.text} className="flex items-start gap-2 text-sm text-foreground">
                    <AutoIcon size={14} className="text-primary mt-0.5 shrink-0" />
                    <span>{auto.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="inline-block text-xs font-bold px-4 py-2 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${agent.gradientFrom}15, ${agent.gradientTo}15)`,
              color: agent.gradientFrom,
            }}
          >
            {agent.stat}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* ─── Mobile Agent Card ─── */
const MobileAgentCard = ({ agent }: { agent: AgentData }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="rounded-2xl border border-border bg-card overflow-hidden"
      layout
    >
      <button
        className="w-full p-5 flex items-center gap-4 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <AgentAvatar agent={agent} size="sm" />
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-bold text-foreground">{agent.name}</h3>
          <p className="text-sm text-muted-foreground">{agent.title}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            className="text-muted-foreground"
          >
            ▾
          </motion.span>
        </div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 space-y-4">
          <p className="text-sm text-foreground leading-relaxed">{agent.bio}</p>

          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">What I Do</p>
            <div className="flex flex-wrap gap-1.5">
              {agent.capabilities.map((cap) => (
                <span key={cap} className="text-[11px] font-medium bg-background border border-border rounded-full px-2.5 py-1 text-foreground">
                  {cap}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Automations I Run</p>
            <div className="space-y-1.5">
              {agent.automations.map((auto) => {
                const AutoIcon = auto.icon;
                return (
                  <div key={auto.text} className="flex items-start gap-2 text-xs text-foreground">
                    <AutoIcon size={12} className="text-primary mt-0.5 shrink-0" />
                    <span>{auto.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="inline-block text-[11px] font-bold px-3 py-1.5 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${agent.gradientFrom}15, ${agent.gradientTo}15)`,
              color: agent.gradientFrom,
            }}
          >
            {agent.stat}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Main Export ─── */
const AgentShowcase = () => (
  <section className="relative">

    <div className="hidden md:block">
      {agents.map((agent, i) => (
        <AgentSection key={agent.name} agent={agent} index={i} />
      ))}
    </div>

    <div className="md:hidden px-6 space-y-3">
      {agents.map((agent) => (
        <MobileAgentCard key={agent.name} agent={agent} />
      ))}
    </div>

    <div className="container mx-auto px-6 max-w-3xl text-center pt-12">
      <ScrollReveal>
        <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-8">
          That's your team. All 7 of them. Working right now.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {[
            { value: "5,000+", label: "actions per month" },
            { value: "24/7/365", label: "availability" },
            { value: "7 specialists", label: "1 goal" },
          ].map((s) => (
            <div key={s.value} className="text-center bg-card border border-border rounded-2xl p-6">
              <p className="font-heading text-3xl font-extrabold text-primary mb-1">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="text-muted-foreground mb-8">
          This is what $49/mo gets you. Not a chatbot. Not a template. A real team.
        </p>
      </ScrollReveal>
    </div>
  </section>
);

export default AgentShowcase;
