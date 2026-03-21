'use client'

import { Globe, TrendingUp, Bot, DollarSign } from 'lucide-react'
import ScrollReveal from '@/components/animations/ScrollReveal'

const cards = [
  {
    icon: Globe,
    title: 'Custom Website',
    desc: 'Built for your brand. Optimized for Google. No templates—just clean, fast sites that work.',
  },
  {
    icon: TrendingUp,
    title: 'SEO & Google Business',
    desc: 'We manage your Google Business Profile daily. Posts, responses, and optimization—all handled.',
  },
  {
    icon: Bot,
    title: 'AI-Powered 24/7',
    desc: 'Our AI agents never sleep. They monitor, respond, and optimize while you focus on your customers.',
  },
  {
    icon: DollarSign,
    title: 'Flat Monthly Price',
    desc: 'No surprise invoices. No hourly billing. Just one simple price that covers everything.',
  },
]

export default function ValueProps() {
  return (
    <section className="bg-[#FDFAF7] py-20 px-6">
      <h2 className="text-3xl md:text-4xl font-black text-[#361C24] text-center mb-4">
        Everything your business needs
      </h2>
      <p className="text-[#7A6458] text-center mb-12">
        One team. One price. Zero headaches.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {cards.map((card, i) => {
          const Icon = card.icon
          return (
            <ScrollReveal key={card.title} delay={i * 0.1}>
              <div className="bg-[#F2E8D6] border border-[#E0D4C4] rounded-xl p-6 hover:bg-[#EBDCC5] transition-colors h-full">
                <div className="w-10 h-10 rounded-lg bg-[#D94A7A]/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#D94A7A]" />
                </div>
                <h3 className="text-lg font-bold text-[#361C24] mb-2">{card.title}</h3>
                <p className="text-sm text-[#7A6458] leading-relaxed">{card.desc}</p>
              </div>
            </ScrollReveal>
          )
        })}
      </div>
    </section>
  )
}
