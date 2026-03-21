import type { Metadata } from 'next'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'

export const metadata: Metadata = {
  title: 'Contact Us | Skooped.io',
  description: "Get started with Skooped.io. Let's get your business online.",
}

export default function ContactPage() {
  return (
    <div className="bg-[#F7F2ED] min-h-screen">
      {/* Header */}
      <div className="pt-32 pb-8 px-6 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-[#361C24]">
          Let&apos;s get your business online
        </h1>
        <p className="text-[#7A6458] text-lg mt-3">
          We&apos;ll set up everything. You just show up.
        </p>
      </div>

      {/* Two-column section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto px-6 pb-20 pt-4">
        {/* Left: Contact Form */}
        <div className="bg-[#FDFAF7] rounded-2xl p-8 shadow-sm border border-[#E0D4C4]">
          <ContactForm />
        </div>

        {/* Right: Contact Info */}
        <div className="bg-[#F2E8D6] rounded-2xl p-8 border border-[#E0D4C4]">
          <ContactInfo />
        </div>
      </div>
    </div>
  )
}
