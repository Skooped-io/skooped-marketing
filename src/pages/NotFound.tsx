import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-background" />

        <div className="relative container mx-auto px-6 text-center max-w-xl py-24">
          {/* Melting ice cream */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center mb-10"
          >
            <div className="relative flex flex-col items-center">
              {/* Strawberry scoop */}
              <motion.div
                className="w-20 h-20 rounded-full bg-primary relative z-30"
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Drip */}
                <motion.div
                  className="absolute -bottom-3 left-4 w-3 rounded-full bg-primary"
                  animate={{ height: [8, 18, 8], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -bottom-2 right-5 w-2 rounded-full bg-primary"
                  animate={{ height: [6, 14, 6], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
              </motion.div>

              {/* Vanilla scoop */}
              <motion.div
                className="w-18 h-16 rounded-full bg-secondary -mt-4 relative z-20"
                style={{ width: 72, height: 64 }}
                animate={{ y: [0, 2, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              >
                <motion.div
                  className="absolute -bottom-2 left-3 w-2 rounded-full bg-secondary"
                  animate={{ height: [4, 12, 4] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                />
              </motion.div>

              {/* Cone */}
              <div
                className="-mt-3 relative z-10"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "32px solid transparent",
                  borderRight: "32px solid transparent",
                  borderTop: "72px solid hsl(32 38% 65%)",
                }}
              />
              {/* Waffle lines */}
              <div className="absolute bottom-[10px] w-[52px] h-[60px] z-10 pointer-events-none overflow-hidden" style={{ clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)" }}>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 6px, hsl(22 55% 28%) 6px, hsl(22 55% 28%) 7px), repeating-linear-gradient(-45deg, transparent, transparent 6px, hsl(22 55% 28%) 6px, hsl(22 55% 28%) 7px)" }} />
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4"
          >
            Oops — this page got scooped.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-md mx-auto"
          >
            Looks like the page you're looking for melted away. Let's get you back on track.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/">
              <Button variant="hero" size="xl">Go Home</Button>
            </Link>
            <Link to="/plans">
              <Button variant="hero-outline" size="xl">See Our Plans</Button>
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default NotFound;
