import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import skoopedLogo from "@/assets/skooped-logo.png";

const Sparkle = ({ className }: { className?: string }) => (
  <motion.svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
    animate={{ opacity: [0.3, 1, 0.3] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
  >
    <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="currentColor" />
  </motion.svg>
);

const headlineStart = "We build it. We run it. You".split(" ");
const headlineEnd = "answer the phone.";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-background animate-gradient-shift" style={{ backgroundSize: "200% 200%", backgroundImage: "radial-gradient(ellipse at 30% 20%, hsl(340 60% 57% / 0.12), transparent 50%), radial-gradient(ellipse at 70% 80%, hsl(35 56% 50% / 0.08), transparent 50%)" }} />

      <div className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-float-delayed" />

      <Sparkle className="absolute top-32 left-[20%] text-accent" />
      <Sparkle className="absolute top-48 right-[25%] text-accent" />
      <Sparkle className="absolute bottom-40 left-[30%] text-accent" />

      <div className="relative container mx-auto px-6 text-center max-w-3xl py-24">
        <motion.img
          src={skoopedLogo}
          alt="Skooped Media & Marketing"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-80 md:w-[420px] mx-auto mb-8"
        />

        <h1 className="text-4xl md:text-[56px] md:leading-tight font-extrabold text-foreground mb-6">
          {headlineStart.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: headlineStart.length * 0.05, duration: 0.4, ease: "easeOut" }}
            className="inline-block swoosh-underline text-primary"
          >
            {headlineEnd}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Pick your industry. Add your brand. Your website is live in 60 seconds — then your AI team takes over. SEO, social media, Google Ads, analytics. Try it free for 14 days.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/templates">
            <Button variant="hero" size="xl">
              Start Your Free Trial
            </Button>
          </Link>
          <Link to="/plans">
            <Button variant="hero-outline" size="xl">
              See How It Works
            </Button>
          </Link>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.4 }}
          className="text-sm text-muted-foreground mt-4"
        >
          14 days free. No credit card required. Cancel anytime.
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
