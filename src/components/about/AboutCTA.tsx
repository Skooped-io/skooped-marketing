import Link from 'next/link'

export default function AboutCTA() {
  return (
    <section className="bg-[#361C24] py-20 px-6 text-center">
      <h2 className="text-4xl md:text-5xl font-black text-[#E8C87A] mb-2">
        This is what $49/mo gets you.
      </h2>
      <p className="text-2xl text-[#FDFAF7] mb-8">A full team. 24/7.</p>
      <Link
        href="/plans"
        className="inline-block bg-[#D94A7A] text-white px-10 py-6 text-xl rounded-xl font-semibold hover:bg-[#C23D69] transition-colors"
      >
        See Pricing Plans
      </Link>
    </section>
  )
}
