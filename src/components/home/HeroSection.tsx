'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import GradientMesh from '@/components/animations/GradientMesh'
import FloatingElement from '@/components/animations/FloatingElement'
import SparkleIcon from '@/components/animations/SparkleIcon'
import SplitTextReveal from '@/components/animations/SplitTextReveal'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#F7F2ED]">
      <GradientMesh />

      {/* Decorative floating blobs */}
      <FloatingElement className="absolute top-8 left-4 w-64 h-64 rounded-full bg-[#D94A7A] opacity-20 blur-2xl pointer-events-none" delay="0s">
        <span />
      </FloatingElement>
      <FloatingElement className="absolute bottom-16 right-8 w-80 h-80 rounded-full bg-[#E8C87A] opacity-15 blur-2xl pointer-events-none" delay="1.5s">
        <span />
      </FloatingElement>

      {/* Sparkle icons */}
      <SparkleIcon
        size={32}
        color="#D94A7A"
        delay={0.3}
        className="absolute top-36 right-16 md:right-32 pointer-events-none"
      />
      <SparkleIcon
        size={20}
        color="#C99035"
        delay={0.8}
        className="absolute top-48 right-8 md:right-20 pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto pt-32 pb-20 px-6 text-center">
        <SplitTextReveal
          text="We build it. We run it. You answer the phone."
          as="h1"
          className="text-4xl md:text-6xl lg:text-7xl font-black text-[#361C24] leading-tight font-nunito"
          delay={0.1}
          stagger={0.06}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-lg md:text-xl text-[#7A6458] max-w-2xl mx-auto mt-6"
        >
          Full-service website + AI-powered Google Business management. From $49/mo. No contracts. No tech skills needed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <Button
            render={<Link href="/contact" />}
            className="bg-[#D94A7A] text-white hover:bg-[#C23D69] px-8 py-6 text-lg rounded-xl font-semibold h-auto"
          >
            Get Started Today
          </Button>

          <Button
            render={<Link href="/plans" />}
            variant="outline"
            className="border-[#D94A7A] text-[#D94A7A] hover:bg-[#D94A7A]/10 px-8 py-6 text-lg rounded-xl font-semibold h-auto bg-transparent"
          >
            See Our Plans
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="text-sm text-[#9A8A7E] mt-4"
        >
          🍦 Serving local businesses in Franklin, TN &amp; beyond
        </motion.p>
      </div>
    </section>
  )
}
