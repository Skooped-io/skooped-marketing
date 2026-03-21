import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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
  <div className="relative overflow-hidden py-4 mt-4">
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

/* ─── Agent Avatar ─── */
const AgentAvatar = ({ agent, size = "md" }: { agent: AgentData; size?: "md" | "sm" }) => {
  const sizeClasses = size === "md" ? "w-20 h-20" : "w-10 h-10";

  if (agent.avatar) {
    return (
      <div
        className={`${sizeClasses} rounded-full overflow-hidden shrink-0`}
        style={{ boxShadow: `0 0 20px ${agent.gradientFrom}30` }}
      >
        <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses} rounded-full flex items-center justify-center shrink-0`}
      style={{
        background: `linear-gradient(135deg, ${agent.gradientFrom}, ${agent.gradientTo})`,
        boxShadow: `0 0 20px ${agent.gradientFrom}30`,
      }}
    >
      <span className={`${size === "md" ? "text-2xl" : "text-base"} font-heading font-extrabold text-white/90`}>
        {agent.name[0]}
      </span>
    </div>
  );
};

/* ─── Tabbed Agent Showcase ─── */
const AgentShowcase = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const agent = agents[activeIdx];

  return (
    <section className="relative pb-12 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Agent selector pills */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {agents.map((a, i) => (
              <button
                key={a.name}
                onClick={() => setActiveIdx(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                  i === activeIdx
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-card/60 text-foreground border-border hover:border-primary/40"
                }`}
              >
                <div className="w-6 h-6 rounded-full overflow-hidden shrink-0">
                  {a.avatar ? (
                    <img src={a.avatar} alt={a.name} className="w-full h-full object-cover" />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ background: `linear-gradient(135deg, ${a.gradientFrom}, ${a.gradientTo})` }}
                    >
                      {a.name[0]}
                    </div>
                  )}
                </div>
                <span className="hidden sm:inline">{a.name}</span>
                <span className="sm:hidden">{a.name}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Active agent detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={agent.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${agent.gradientFrom}08, transparent 50%, ${agent.gradientTo}05)`,
            }}
          >
            <div className="grid md:grid-cols-[auto_1fr] gap-6 p-6 md:p-8">
              {/* Left: Avatar + identity */}
              <div className="flex md:flex-col items-center md:items-center gap-4 md:gap-3 md:min-w-[120px]">
                <AgentAvatar agent={agent} size="md" />
                <div className="md:text-center">
                  <div className="flex items-center gap-2 md:justify-center mb-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[11px] text-green-600 font-semibold">Active 24/7</span>
                  </div>
                  <h3 className="font-heading text-xl font-extrabold text-foreground">{agent.name}</h3>
                  <p className="text-sm text-muted-foreground">{agent.title}</p>
                </div>
                <div
                  className="hidden md:inline-block text-[11px] font-bold px-3 py-1.5 rounded-full mt-2"
                  style={{
                    background: `linear-gradient(135deg, ${agent.gradientFrom}15, ${agent.gradientTo}15)`,
                    color: agent.gradientFrom,
                  }}
                >
                  {agent.stat}
                </div>
              </div>

              {/* Right: Content */}
              <div className="space-y-4">
                <p className="text-foreground leading-relaxed text-sm">{agent.bio}</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Capabilities */}
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2 font-semibold">What I Do</p>
                    <div className="flex flex-wrap gap-1.5">
                      {agent.capabilities.map((cap, j) => {
                        const CapIcon = agent.capabilityIcons[j];
                        return (
                          <span key={cap} className="inline-flex items-center gap-1 text-[11px] font-medium bg-background/80 border border-border rounded-full px-2.5 py-1 text-foreground">
                            <CapIcon size={10} className="text-primary" /> {cap}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Automations */}
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2 font-semibold">Automations I Run</p>
                    <div className="space-y-1.5">
                      {agent.automations.map((auto) => {
                        const AutoIcon = auto.icon;
                        return (
                          <div key={auto.text} className="flex items-start gap-1.5 text-[12px] text-foreground">
                            <AutoIcon size={11} className="text-primary mt-0.5 shrink-0" />
                            <span>{auto.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Mobile stat badge */}
                <div
                  className="md:hidden inline-block text-[11px] font-bold px-3 py-1.5 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${agent.gradientFrom}15, ${agent.gradientTo}15)`,
                    color: agent.gradientFrom,
                  }}
                >
                  {agent.stat}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {[
            { value: "5,000+", label: "actions per month" },
            { value: "24/7/365", label: "availability" },
            { value: "7 specialists", label: "1 goal" },
          ].map((s) => (
            <ScrollReveal key={s.value}>
              <div className="text-center bg-card/60 border border-border rounded-xl p-4">
                <p className="font-heading text-2xl md:text-3xl font-extrabold text-primary mb-0.5">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <p className="text-muted-foreground text-center text-sm mt-4">
            This is what $49/mo gets you. Not a chatbot. Not a template. A real team.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AgentShowcase;