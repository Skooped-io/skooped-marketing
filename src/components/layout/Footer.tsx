import Link from 'next/link'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Plans', href: '/plans' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  return (
    <footer className="bg-[#361C24] text-[#FDFAF7] py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo + tagline */}
        <div className="flex flex-col gap-3">
          <span className="font-heading font-bold text-2xl text-[#FDFAF7]">Skooped.io</span>
          <p className="text-sm text-[#E0D4C4] leading-relaxed max-w-xs">
            We build it. We run it. You answer the phone.
          </p>
        </div>

        {/* Nav links */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#E8C87A]">Navigation</span>
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-[#E0D4C4] hover:text-[#D94A7A] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#E8C87A]">Contact</span>
          <ul className="flex flex-col gap-2 text-sm text-[#E0D4C4]">
            <li>
              <a
                href="tel:6158563871"
                className="hover:text-[#D94A7A] transition-colors duration-200"
              >
                615-856-3871
              </a>
            </li>
            <li>Franklin, TN</li>
            <li>
              <a
                href="https://instagram.com/skooped.io"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D94A7A] transition-colors duration-200"
              >
                @skooped.io
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-[#FDFAF7]/10 text-xs text-[#E0D4C4]/60 text-center">
        © 2025 Skooped.io. All rights reserved.
      </div>
    </footer>
  )
}
