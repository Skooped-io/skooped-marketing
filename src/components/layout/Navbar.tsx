'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Plans', href: '/plans' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-md bg-[#F7F2ED]/80 shadow-sm' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 md:px-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-heading font-bold text-xl text-[#361C24]">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <ellipse cx="14" cy="11" rx="8" ry="7" fill="#D94A7A" opacity="0.9" />
              <rect x="11" y="17" width="6" height="9" rx="3" fill="#C99035" />
              <ellipse cx="14" cy="11" rx="4" ry="3" fill="#E8C87A" opacity="0.7" />
            </svg>
            Skooped
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-[#361C24] hover:text-[#D94A7A] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="px-5 py-2 rounded-full text-sm font-semibold bg-[#D94A7A] text-white hover:bg-[#c03d6a] transition-colors duration-200"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#361C24] text-2xl leading-none"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-[#F7F2ED] flex flex-col items-center justify-center gap-8">
          <button
            className="absolute top-6 right-6 text-3xl text-[#361C24]"
            onClick={closeMobile}
            aria-label="Close menu"
          >
            ✕
          </button>
          <nav className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className="text-2xl font-heading font-bold text-[#361C24] hover:text-[#D94A7A] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={closeMobile}
              className="mt-4 px-8 py-3 rounded-full text-base font-semibold bg-[#D94A7A] text-white hover:bg-[#c03d6a] transition-colors duration-200"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
