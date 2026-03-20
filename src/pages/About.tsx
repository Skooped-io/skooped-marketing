import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import AgentShowcase from "@/components/AgentShowcase";
import usePageSeo from "@/hooks/use-page-seo";
import jakePhoto from "@/assets/jake.jpg";

const About = () => {
  usePageSeo({ title: "About Skooped | AI-First Marketing Team | Franklin, Tennessee", description: "Meet the AI team behind Skooped — 24/7 marketing operations for local businesses. SEO, web dev, content, analytics, and security. Franklin, TN." });

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-background" style={{ backgroundImage: "radial-gradient(ellipse at 30% 20%, hsl(340 60% 57% / 0.12), transparent 50%), radial-gradient(ellipse at 70% 70%, hsl(35 56% 50% / 0.08), transparent 50%)" }} />
        <div className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-float-delayed" />
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
              <div className="aspect-[4/5] rounded-xl border-2 border-border bg-card overflow-hidden">
                <img src={jakePhoto} alt="Jake Anderson — Founder of Skooped" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="font-heading text-3xl font-extrabold text-foreground mb-2">Jake Anderson</h2>
                <p className="text-muted-foreground font-medium mb-6">Founder</p>
                <blockquote className="border-l-4 border-primary pl-5 text-foreground leading-relaxed">
                  "I kept getting the same question from local business owners — 'can you help me get online?' So I built an entire AI team to do it. Self-taught engineer, Franklin TN born and raised, and yeah that's blood on my face from jiu jitsu. I bring the same energy to your business that I bring to the mat — Skooped exists because every local business deserves a marketing team that works as hard as they do. Not just the ones with big budgets."
                </blockquote>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Agent Showcase */}
      <AgentShowcase />

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
};

export default About;
