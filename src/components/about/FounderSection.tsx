import { User } from 'lucide-react'

export default function FounderSection() {
  return (
    <section className="bg-[#FDFAF7] py-16 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Photo placeholder */}
        <div className="bg-[#E0D4C4] rounded-2xl w-full aspect-square max-w-sm mx-auto flex items-center justify-center text-[#9A8A7E]">
          <User size={96} />
        </div>

        {/* Bio */}
        <div>
          <p className="text-xs font-bold text-[#D94A7A] tracking-widest mb-2">FOUNDER</p>
          <h2 className="text-3xl font-black text-[#361C24] mb-1">Jake Anderson</h2>
          <p className="text-[#7A6458] mb-4">Founder &amp; CEO, Skooped.io</p>

          <p className="text-[#7A6458] leading-relaxed mb-4">
            Jake started Skooped after watching too many great local businesses lose customers
            simply because their online presence didn&apos;t reflect how good they actually were.
          </p>
          <p className="text-[#7A6458] leading-relaxed">
            With a background in digital marketing and a love for small business, Jake built
            Skooped to give local owners a real team at a fair price—without the agency markup.
          </p>

          <div className="mt-4 flex flex-col gap-1">
            <p className="text-sm text-[#9A8A7E]">📞 615-856-3871</p>
            <p className="text-sm text-[#9A8A7E]">📍 Franklin, TN</p>
          </div>
        </div>
      </div>
    </section>
  )
}
