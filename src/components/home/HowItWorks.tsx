'use client'

import ScrollReveal from '@/components/animations/ScrollReveal'

const steps = [
  {
    number: '1',
    title: 'Pick Your Plan',
    desc: 'Choose One Scoop, Double Scoop, or Triple Scoop based on your goals.',
  },
  {
    number: '2',
    title: 'We Build Everything',
    desc: 'Your site goes live in days. We handle design, copy, SEO setup—everything.',
  },
  {
    number: '3',
    title: 'Sit Back & Grow',
    desc: 'Our AI team manages your online presence daily. You just answer the calls that come in.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-[#FDFAF7] py-20 px-6">
      <h2 className="text-3xl md:text-4xl font-black text-[#361C24] text-center mb-4">
        How It Works
      </h2>
      <p className="text-[#7A6458] text-center mb-12">
        From signup to first call in days, not months.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((step, i) => (
          <ScrollReveal key={step.title} delay={i * 0.15}>
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-[#D94A7A] text-white text-2xl font-black flex items-center justify-center mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-[#361C24] mb-2">{step.title}</h3>
              <p className="text-[#7A6458]">{step.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
