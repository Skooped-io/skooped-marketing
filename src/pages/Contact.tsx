import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, Instagram, Clock, Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSeo from "@/hooks/use-page-seo";

const serviceOptions = ["Website", "SEO", "Social Media", "Google Ads", "Everything", "Not Sure"];

const FloatingInput = ({ label, name, type = "text", required = false, ...props }: { label: string; name: string; type?: string; required?: boolean; [k: string]: any }) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          active ? "top-1.5 text-[10px] text-primary font-medium" : "top-3.5 text-sm text-muted-foreground"
        }`}
      >
        {label}{required && " *"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-background border border-border rounded-xl pt-5 pb-2 px-4 text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        {...props}
      />
    </div>
  );
};

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [msgFocused, setMsgFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-background" style={{ backgroundImage: "radial-gradient(ellipse at 40% 30%, hsl(340 60% 57% / 0.06), transparent 50%)" }} />
        <div className="relative container mx-auto px-6 text-center max-w-3xl">
          <ScrollReveal>
            <h1 className="text-4xl md:text-[52px] md:leading-tight font-extrabold text-foreground mb-4">
              Let's get your business online.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              No sales pitch — just a real conversation about what your business needs.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Form + Info */}
      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

            {/* Form — 60% */}
            <div className="md:col-span-3">
              <ScrollReveal>
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-card rounded-2xl p-10 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.15 }}
                        className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
                      >
                        <Check size={32} className="text-primary" />
                      </motion.div>
                      <h3 className="font-heading text-2xl font-extrabold text-foreground mb-2">We got your message!</h3>
                      <p className="text-muted-foreground">We'll get back to you within a few hours. Talk soon.</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      exit={{ opacity: 0 }}
                    >
                      <FloatingInput label="Your name" name="name" required />
                      <FloatingInput label="Your business name" name="business" required />
                      <FloatingInput label="Best number to reach you" name="phone" type="tel" required />
                      <FloatingInput label="Your email" name="email" type="email" required />
                      <FloatingInput label="Your website (if you have one)" name="website" />

                      {/* Service select */}
                      <div className="relative">
                        <label htmlFor="service" className="block text-[10px] text-primary font-medium mb-1 pl-1">
                          Services interested in
                        </label>
                        <select
                          id="service"
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className="w-full bg-background border border-border rounded-xl py-3 px-4 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                        >
                          <option value="">Select a service</option>
                          {serviceOptions.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      {/* Textarea */}
                      <div className="relative">
                        <label
                          htmlFor="message"
                          className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                            msgFocused || message.length > 0 ? "top-1.5 text-[10px] text-primary font-medium" : "top-3.5 text-sm text-muted-foreground"
                          }`}
                        >
                          Tell us about your business
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onFocus={() => setMsgFocused(true)}
                          onBlur={() => setMsgFocused(false)}
                          className="w-full bg-background border border-border rounded-xl pt-6 pb-3 px-4 text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                        />
                      </div>

                      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.15 }}>
                        <Button variant="hero" size="xl" type="submit" className="w-full">
                          Let's Talk
                        </Button>
                      </motion.div>
                      <p className="text-xs text-muted-foreground text-center">
                        No spam. No sales calls at dinner. Just a real conversation.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </ScrollReveal>
            </div>

            {/* Info — 40% */}
            <div className="md:col-span-2">
              <ScrollReveal delay={0.2}>
                <div className="space-y-6">
                  <a href="tel:6158563871" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-primary" />
                    </div>
                    <span className="font-heading text-xl font-extrabold text-primary group-hover:underline">615-856-3871</span>
                  </a>

                  {/* Mobile-only text button */}
                  <a href="sms:6158563871" className="md:hidden block">
                    <Button variant="hero-outline" size="lg" className="w-full">Text Us</Button>
                  </a>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-primary" />
                    </div>
                    <span className="text-foreground font-medium">Franklin, Tennessee</span>
                  </div>

                  <a href="https://instagram.com/skooped.io" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Instagram size={18} className="text-primary" />
                    </div>
                    <span className="text-foreground font-medium group-hover:text-primary transition-colors">@skooped.io</span>
                  </a>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock size={18} className="text-primary" />
                    </div>
                    <span className="text-muted-foreground text-sm">We typically respond within a few hours</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Trust signal */}
          <div className="mt-16 text-center flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <Lock size={14} />
            <span>Your info is safe with us. We never share your data.</span>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
