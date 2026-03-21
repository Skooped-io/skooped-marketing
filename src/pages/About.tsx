import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import AgentShowcase, { Marquee } from "@/components/AgentShowcase";
import usePageSeo from "@/hooks/use-page-seo";
import jakePhoto from "@/assets/jake.jpg";

const About = () => {
  usePageSeo({ title: "About Skooped | AI-First Marketing Team | Franklin, Tennessee", description: "Meet the AI team behind Skooped — 24/7 marketing operations for local businesses. SEO, web dev, content, analytics, and security. Franklin, TN." });

  return (
    <>
      <Navbar />

      <div className="relative">
        <div className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute top-[40%] -right-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-float-delayed" />

        {/* Header */}
        <section className="relative pt-28 pb-6">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <ScrollReveal>
              <h1 className="text-4xl md:text-[48px] md:leading-tight font-extrabold text-foreground mb-3">
                Meet the team that never sleeps.
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Skooped isn't your typical marketing agency. We're an AI-first team built from the ground up to give local businesses a full marketing operation that runs 24/7, at a price that makes sense.
              </p>
            </ScrollReveal>
            <Marquee />
          </div>
        </section>

        {/* Agent Showcase */}
        <AgentShowcase />

        {/* Founder */}
        <section className="relative py-10 px-6">
          <div className="container mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 items-center">
                <div className="aspect-[4/5] max-h-[340px] rounded-xl border-2 border-border bg-card overflow-hidden mx-auto md:mx-0">
                  <img src={jakePhoto} alt="Jake Anderson — Founder of Skooped" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-extrabold text-foreground mb-1">Jake Anderson</h2>
                  <p className="text-muted-foreground font-medium text-sm mb-4">Founder</p>
                  <blockquote className="border-l-4 border-primary pl-5 text-foreground text-sm leading-relaxed">
                    "I kept getting the same question from local business owners — 'can you help me get online?' So I built an entire AI team to do it. Self-taught engineer, Franklin TN born and raised, and yeah that's blood on my face from jiu jitsu. I bring the same energy to your business that I bring to the mat — Skooped exists because every local business deserves a marketing team that works as hard as they do. Not just the ones with big budgets."
                  </blockquote>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="relative pb-16 px-6">
          <div className="container mx-auto max-w-2xl">
            <ScrollReveal>
              <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 text-center border border-border">
                <p className="font-heading text-xl font-extrabold text-foreground mb-2">
                  Every business is different. That's why we build custom.
                </p>
                <p className="text-muted-foreground text-sm mb-5">From industry templates or from scratch — your AI team is ready. Free for 14 days.</p>
                <Link to="/templates">
                  <Button variant="hero" size="xl">Start Your Free Trial</Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default About;