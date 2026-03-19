import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const agents = [
  { name: "Cooper", title: "Operations Lead", bio: "Cooper runs the day-to-day. Client communication, quality control, SEO oversight, website QA — if it has Skooped's name on it, Cooper made sure it's right. Think of him as your dedicated account manager who happens to be available 24/7.", gradient: "from-primary to-accent" },
  { name: "Scout", title: "SEO Specialist", bio: "Scout keeps eyes on your Google rankings, monitors Search Console, researches keywords, and builds the strategy that gets your business found. If your competitors are outranking you, Scout's already fixing that.", gradient: "from-accent to-secondary" },
  { name: "Bob", title: "Web Developer", bio: "Bob builds every Skooped website from scratch. No templates, no shortcuts. Mobile-responsive, fast-loading, and designed to convert visitors into customers.", gradient: "from-secondary to-primary" },
  { name: "Sierra", title: "Social Media Specialist", bio: "Sierra manages your Instagram and Facebook — content calendars, captions, scheduling, and brand voice. Your social media stays active even when you're on a job site.", gradient: "from-primary to-secondary" },
  { name: "Riley", title: "Analytics & Reporting", bio: "Riley tracks everything — website traffic, conversion rates, ad performance, SEO progress. No vanity metrics, no fluff — just the numbers that matter.", gradient: "from-accent to-primary" },
  { name: "Mark", title: "Security", bio: "Mark keeps your website secure, your data protected, and your systems running clean. From SSL certificates to vulnerability monitoring, nothing gets past Mark.", gradient: "from-[hsl(22_55%_28%)] to-primary" },
  { name: "Sandra", title: "Resource Intelligence", bio: "Sandra watches the budget so you don't have to. Every dollar spent on your marketing is tracked and optimized. No wasted spend, no surprises.", gradient: "from-secondary to-accent" },
];

const About = () => (
  <>
    <Navbar />

    {/* Header */}
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-background" style={{ backgroundImage: "radial-gradient(ellipse at 40% 30%, hsl(340 60% 57% / 0.06), transparent 50%)" }} />
      <div className="relative container mx-auto px-6 text-center max-w-3xl">
        <ScrollReveal>
          <h1 className="text-4xl md:text-[52px] md:leading-tight font-extrabold text-foreground mb-4">
            Meet the team that never sleeps.
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Skooped isn't your typical marketing agency. We're an AI-first team built from the ground up to give local businesses a full marketing operation that runs 24/7, at a price that makes sense.
          </p>
        </ScrollReveal>
      </div>
    </section>

    {/* Founder */}
    <section className="pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="aspect-[4/5] rounded-xl border-2 border-border bg-card flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Photo coming soon</span>
            </div>
            <div>
              <h2 className="font-heading text-3xl font-extrabold text-foreground mb-2">Jake Anderson</h2>
              <p className="text-muted-foreground font-medium mb-6">Founder & Builder</p>
              <blockquote className="border-l-4 border-primary pl-5 text-foreground leading-relaxed">
                "Jake built Skooped because he kept getting the same question from local business owners: 'Can you help me get online?' A self-taught software engineer from Franklin, TN, Jake built the entire Skooped platform and AI team from scratch. His vision: every local business deserves a marketing team, not just the ones with big budgets."
              </blockquote>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* AI Team */}
    <section className="pb-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <ScrollReveal>
          <h2 className="font-heading text-3xl font-extrabold text-foreground text-center mb-2">Powered by Skooped</h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Every member of our team was built to do one thing really well. Together, they run your entire online presence.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, i) => (
            <ScrollReveal key={agent.name} delay={i * 0.1}>
              <motion.div
                className={`rounded-xl p-6 h-full border border-transparent hover:border-primary transition-colors duration-300 ${
                  i % 2 === 0 ? "bg-card" : "bg-background"
                }`}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${agent.gradient} mb-4 mx-auto`} />
                <h3 className="font-heading text-lg font-extrabold text-foreground text-center">{agent.name}</h3>
                <p className="text-sm text-muted-foreground text-center mb-3">{agent.title}</p>
                <p className="text-sm text-foreground leading-relaxed">{agent.bio}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Bottom CTA */}
    <section className="pb-24 px-6">
      <div className="container mx-auto max-w-2xl">
        <ScrollReveal>
          <div className="bg-card rounded-2xl p-10 text-center">
            <p className="font-heading text-2xl font-extrabold text-foreground mb-6">
              This is what $49/mo gets you. A full team. 24/7. No days off.
            </p>
            <Link to="/plans">
              <Button variant="hero" size="xl">See Our Plans</Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <Footer />
  </>
);

export default About;
