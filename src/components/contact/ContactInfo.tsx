import { Phone, MapPin, Clock } from 'lucide-react'

export default function ContactInfo() {
  return (
    <div>
      {/* Phone */}
      <div className="flex items-center gap-3 py-3 border-b border-[#E0D4C4]">
        <Phone size={20} className="text-[#D94A7A] shrink-0" />
        <a
          href="tel:6158563871"
          className="text-[#D94A7A] font-bold text-xl hover:underline"
        >
          615-856-3871
        </a>
      </div>

      {/* Location */}
      <div className="flex items-center gap-3 py-3 border-b border-[#E0D4C4]">
        <MapPin size={20} className="text-[#7A6458] shrink-0" />
        <span className="text-[#361C24]">Franklin, TN</span>
      </div>

      {/* Instagram */}
      <div className="flex items-center gap-3 py-3 border-b border-[#E0D4C4]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#7A6458] shrink-0"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
        <span className="text-[#361C24]">@skooped.io</span>
      </div>

      {/* Response time */}
      <div className="flex items-center gap-3 py-3">
        <Clock size={20} className="text-[#7A6458] shrink-0" />
        <span className="text-[#7A6458]">We respond within 1 business day</span>
      </div>

      {/* Text Us button */}
      <a
        href="sms:6158563871"
        className="mt-6 block w-full text-center bg-[#361C24] text-[#FDFAF7] px-6 py-3 rounded-xl font-semibold hover:bg-[#4A2A35] transition-colors"
      >
        Text Us 💬
        <span className="block text-xs text-[#9A8A7E] mt-0.5">(Mobile only)</span>
      </a>

      <p className="text-[#7A6458] text-sm leading-relaxed mt-6">
        Based in Franklin, TN, we serve local businesses across the US. Whether you&apos;re a
        fence company, HVAC tech, plumber, or landscaper — if your phone should be ringing more,
        we can help.
      </p>
    </div>
  )
}
