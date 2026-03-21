import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function FinalCTA() {
  return (
    <section className="relative bg-[#6D1326] py-24 px-6 text-center overflow-hidden">
      {/* Decorative blurred circles */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: '#E8C87A', opacity: 0.1 }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: '#D94A7A', opacity: 0.1 }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <h2 className="text-4xl md:text-5xl font-black text-[#FDFAF7] mb-4">
          Ready to get skooped?
        </h2>
        <p className="text-[#E8C87A] text-lg mb-8">
          Join local businesses already growing with Skooped.
        </p>

        <Button
          render={<Link href="/contact" />}
          className="bg-[#D94A7A] text-white hover:bg-[#C23D69] px-10 py-6 text-xl rounded-xl font-semibold h-auto"
        >
          Get Started Today →
        </Button>

        <p className="mt-6 text-sm" style={{ color: 'rgba(232,200,122,0.7)' }}>
          Or call us:{' '}
          <a
            href="tel:6158563871"
            className="underline underline-offset-2 hover:opacity-90 transition-opacity"
          >
            615-856-3871
          </a>
        </p>
      </div>
    </section>
  )
}
