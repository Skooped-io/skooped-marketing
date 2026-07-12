import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import AgentShowcase, { Marquee } from "@/components/AgentShowcase";
import usePageSeo from "@/hooks/use-page-seo";

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

        {/* The human behind it */}
        <section className="relative py-10 px-6">
          <div className="container mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-border text-center">
                <h2 className="font-heading text-2xl font-extrabold text-foreground mb-1">Joseph Anderson</h2>
                <p className="text-muted-foreground font-medium text-sm mb-4">Owner &amp; Operator — Franklin, TN</p>
                <p className="text-foreground text-sm leading-relaxed max-w-xl mx-auto">
                  The AI team above does the heavy lifting, but a real person runs Skooped and stands behind
                  every build. When you call or text, you reach Joseph — not a ticket queue.
                </p>
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
                <p className="text-muted-foreground text-sm mb-5">Builds from $500, plans from $49/mo — and every lead texted to your phone.</p>
                <a href="tel:6153151541">
                  <Button variant="hero" size="xl">Call or Text 615-315-1541</Button>
                </a>
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