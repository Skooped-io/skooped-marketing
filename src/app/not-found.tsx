'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const drips = [
  { left: 'calc(50% - 28px)', delay: 0 },
  { left: 'calc(50% - 6px)', delay: 0.4 },
  { left: 'calc(50% + 16px)', delay: 0.8 },
]

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7F2ED] flex flex-col items-center justify-center px-6 text-center">
      {/* Ice cream animation */}
      <div className="relative w-32 mx-auto mb-8">
        {/* Scoop */}
        <motion.div
          className="w-24 h-24 rounded-full bg-[#D94A7A] mx-auto relative z-10"
          animate={{ rotate: [0, -3, 3, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Drips */}
        {drips.map((drip, i) => (
          <motion.div
            key={i}
            className="w-3 rounded-full bg-[#D94A7A] absolute"
            style={{ left: drip.left, bottom: 0 }}
            animate={{ height: ['4px', '32px', '32px'] }}
            transition={{
              duration: 1.5,
              delay: drip.delay,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeIn',
            }}
          />
        ))}

        {/* Cone */}
        <div
          className="w-0 h-0 mx-auto relative z-0 -mt-2"
          style={{
            borderLeft: '32px solid transparent',
            borderRight: '32px solid transparent',
            borderBottom: '56px solid #C99035',
          }}
        />
      </div>

      <h1 className="text-4xl md:text-5xl font-black text-[#361C24] mt-8 mb-4">
        Oops — this page got scooped
      </h1>
      <p className="text-[#7A6458] text-lg mb-8">
        Looks like this page melted away. Let&apos;s get you back on track.
      </p>

      <div className="flex gap-4 justify-center flex-wrap">
        <Link
          href="/"
          className="bg-[#D94A7A] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#C23D69] transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/plans"
          className="border-2 border-[#D94A7A] text-[#D94A7A] px-8 py-4 rounded-xl font-semibold hover:bg-[#D94A7A]/10 transition-colors"
        >
          See Our Plans
        </Link>
      </div>
    </div>
  )
}
