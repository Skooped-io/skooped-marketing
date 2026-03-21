import ScrollReveal from '@/components/ScrollReveal'
import { motion } from 'framer-motion'

const results = [
  {
    metric: '200 → 8,000+',
    context: 'Google Search impressions in 3 months',
    industry: 'Fencing',
    location: 'Tennessee',
  },
  {
    metric: '3x more calls',
    context: 'After launching SEO + Google Business Profile',
    industry: 'Landscaping',
    location: 'Middle Tennessee',
  },
  {
    metric: 'Page 1 in 60 days',
    context: 'For 12 local service keywords',
    industry: 'Roofing',
    location: 'Illinois',
  },
]

export default function CaseStudy() {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Decorative blots */}
      <div className="absolute top-10 -right-16 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-12 w-48 h-48 rounded-full bg-primary/8 blur-3xl pointer-events-none" />

      <div className="relative container mx-auto max-w-5xl">
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground text-center mb-3">
            What Happens When We Get to Work
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Real results from real businesses. No fluff — just numbers.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {results.map((r, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <motion.div
                className="relative rounded-2xl bg-card/60 backdrop-blur-sm border border-border p-8 text-center h-full flex flex-col items-center"
                whileHover={{
                  y: -4,
                  boxShadow: '0 16px 32px -8px hsl(340 60% 57% / 0.12)',
                }}
                transition={{ duration: 0.25 }}
              >
                {/* Industry badge */}
                <span className="inline-block text-[11px] font-bold tracking-wide uppercase bg-primary/10 text-primary px-3 py-1 rounded-full mb-5">
                  {r.industry} · {r.location}
                </span>

                {/* Big metric */}
                <p className="font-heading text-3xl md:text-4xl font-extrabold text-primary leading-tight mb-3">
                  {r.metric}
                </p>

                {/* Context */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {r.context}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
