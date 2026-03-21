import AnimatedCounter from '@/components/animations/AnimatedCounter'

const stats = [
  {
    display: 'counter',
    target: 8000,
    suffix: '+',
    label: 'Google Impressions in 3 Months',
  },
  {
    display: 'text',
    value: '24/7',
    label: 'AI-Powered Management',
  },
  {
    display: 'counter',
    target: 49,
    prefix: '$',
    suffix: '/mo',
    label: 'Custom Sites Starting At',
  },
  {
    display: 'text',
    value: 'Franklin, TN',
    label: 'Based & Trusted Locally',
  },
] as const

export default function StatsBar() {
  return (
    <section className="bg-[#361C24] text-[#FDFAF7] py-10 px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-center">
        {stats.map((stat, i) => (
          <div key={i}>
            {stat.display === 'counter' ? (
              <AnimatedCounter
                target={stat.target}
                prefix={'prefix' in stat ? stat.prefix : ''}
                suffix={stat.suffix}
                duration={2}
                className="text-3xl md:text-4xl font-black text-[#E8C87A]"
              />
            ) : (
              <p className="text-3xl md:text-4xl font-black text-[#E8C87A]">
                {stat.value}
              </p>
            )}
            <p className="text-sm text-[#9A8A7E] mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
