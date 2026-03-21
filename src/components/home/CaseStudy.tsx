'use client'

import ScrollReveal from '@/components/animations/ScrollReveal'

const resultStats = [
  { value: '8,000+', label: 'Impressions' },
  { value: '3 Months', label: 'Time to Results' },
  { value: '1 Phone Call', label: 'Away' },
]

export default function CaseStudy() {
  return (
    <section className="bg-[#F7F2ED] py-20 px-6">
      <ScrollReveal>
        <div className="max-w-4xl mx-auto bg-[#FDFAF7] rounded-2xl border-l-4 border-[#D94A7A] p-8 md:p-12 shadow-sm">
          <p className="text-xs font-bold text-[#D94A7A] tracking-widest mb-3 uppercase">
            Client Success
          </p>

          <blockquote className="text-xl md:text-2xl text-[#361C24] font-medium leading-relaxed italic">
            &ldquo;Since working with Skooped, our phone hasn&apos;t stopped ringing. We went from basically invisible online to showing up everywhere our customers search.&rdquo;
          </blockquote>

          <p className="text-[#7A6458] mt-4">— Local fencing contractor, Tennessee</p>

          <div className="flex flex-wrap gap-8 mt-8">
            {resultStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-black text-[#D94A7A]">{stat.value}</p>
                <p className="text-sm text-[#7A6458]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
