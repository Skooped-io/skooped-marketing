'use client'

import ScrollReveal from '@/components/animations/ScrollReveal'

interface Agent {
  name: string
  title: string
  bio: string
}

const agents: Agent[] = [
  {
    name: 'Cooper',
    title: 'Lead Developer',
    bio: 'Builds and maintains your website with precision. Cooper handles every code change, performance optimization, and new feature without you lifting a finger.',
  },
  {
    name: 'Scout',
    title: 'SEO Specialist',
    bio: 'Scout monitors your Google rankings daily, finds opportunities, and crafts content strategies that bring your business to the top of local searches.',
  },
  {
    name: 'Bob',
    title: 'Site Architect',
    bio: 'Bob designs the structure and experience of your website, making sure every page guides visitors toward picking up the phone.',
  },
  {
    name: 'Sierra',
    title: 'Content Writer',
    bio: 'Sierra writes your website copy, blog posts, and Google Business updates in a voice that sounds like you—professional, friendly, and local.',
  },
  {
    name: 'Riley',
    title: 'Review Manager',
    bio: 'Riley monitors your Google reviews in real time, drafts thoughtful responses, and helps you build the social proof that converts browsers into buyers.',
  },
  {
    name: 'Mark',
    title: 'Analytics Lead',
    bio: "Mark tracks every visitor, click, and call. He turns raw data into clear monthly reports so you always know what's working.",
  },
  {
    name: 'Sandra',
    title: 'Client Success',
    bio: 'Sandra keeps everything running smoothly. She coordinates between team members and makes sure your account stays on track with your goals.',
  },
]

const delays = [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3]

export default function AITeamGrid() {
  return (
    <section className="bg-[#F7F2ED] py-16 px-6">
      <h2 className="text-3xl font-black text-center mb-2 text-[#361C24]">
        Your AI-Powered Team
      </h2>
      <p className="text-[#7A6458] text-center mb-10">Always on. Always optimizing.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {agents.map((agent, index) => {
          const isEven = index % 2 === 0
          return (
            <ScrollReveal key={agent.name} delay={delays[index]}>
              <div
                className={`rounded-xl border border-[#E0D4C4] p-6 hover:shadow-md transition-shadow ${
                  isEven ? 'bg-[#F2E8D6]' : 'bg-[#FDFAF7]'
                }`}
              >
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-[#D94A7A]/20 flex items-center justify-center mb-4">
                  <span className="text-2xl font-black text-[#D94A7A]">
                    {agent.name.charAt(0)}
                  </span>
                </div>

                <p className="font-bold text-[#361C24] text-lg">{agent.name}</p>
                <p className="text-sm text-[#D94A7A] font-medium mb-2">{agent.title}</p>
                <p className="text-sm text-[#7A6458] leading-relaxed">{agent.bio}</p>
              </div>
            </ScrollReveal>
          )
        })}
      </div>
    </section>
  )
}
