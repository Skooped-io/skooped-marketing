import ScrollReveal from "./ScrollReveal";

const CaseStudy = () => (
  <section className="py-24 px-6">
    <div className="container mx-auto max-w-3xl">
      <ScrollReveal>
        <div className="border-l-4 border-primary bg-card rounded-lg p-8 md:p-12 relative overflow-hidden">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-chocolate mb-4">
            From invisible to <span className="swoosh-underline">unstoppable</span>
          </h2>
          <blockquote className="text-foreground text-lg leading-relaxed mb-6">
            "One of our clients — a fencing contractor in Tennessee — went from 200 Google Search impressions to over 8,000 in just 3 months. More visibility means more calls, more jobs, more growth."
          </blockquote>

          {/* Simple trend line SVG */}
          <svg width="100%" height="60" viewBox="0 0 400 60" className="mb-6 opacity-40">
            <path
              d="M0 55 Q100 50 150 35 Q200 20 250 22 Q300 18 350 10 L400 5"
              stroke="hsl(340, 60%, 57%)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          <a
            href="#"
            className="text-primary font-semibold inline-flex items-center gap-1 group relative"
          >
            See How We Did It →
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default CaseStudy;
