import { Link } from "react-router-dom";
import { Paintbrush, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValueProps from "@/components/ValueProps";
import StatsBar from "@/components/StatsBar";
import CaseStudy from "@/components/CaseStudy";
import HowItWorks from "@/components/HowItWorks";
import AutomationFeed from "@/components/AutomationFeed";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const CustomCallout = () => (
  <section className="py-6 px-6">
    <div className="container mx-auto max-w-4xl">
      <ScrollReveal>
        <Link
          to="/templates"
          className="group flex items-center justify-center gap-3 bg-card border border-border rounded-2xl py-4 px-6 hover:border-primary/40 transition-colors"
        >
          <Paintbrush size={18} className="text-accent shrink-0" />
          <span className="text-sm text-muted-foreground">
            🎨 Need something unique? We build custom websites for any industry. Same platform, same AI team.{" "}
            <span className="text-primary font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              Start your free trial <ArrowRight size={12} />
            </span>
          </span>
        </Link>
      </ScrollReveal>
    </div>
  </section>
);

const Index = () => (
  <>
    <Navbar />
    <HeroSection />
    <ValueProps />
    <CustomCallout />
    <StatsBar />
    <CaseStudy />
    <HowItWorks />
    <AutomationFeed />
    <FinalCTA />
    <Footer />
  </>
);

export default Index;
