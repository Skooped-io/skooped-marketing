'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

function IceCreamCone({ scoops }: { scoops: string[] }) {
  return (
    <div className="flex flex-col items-center mb-6">
      {scoops.map((color, i) => (
        <div
          key={i}
          className="w-12 h-12 rounded-full"
          style={{
            backgroundColor: color,
            marginTop: i > 0 ? '-1rem' : undefined,
          }}
        />
      ))}
      <div
        className="w-4 h-6 rounded-b-full"
        style={{ backgroundColor: '#C99035', marginTop: '-0.25rem' }}
      />
    </div>
  )
}

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-sm">
      <Check className="w-4 h-4 text-[#4CAF50] mt-0.5 shrink-0" />
      <span>{text}</span>
    </li>
  )
}

export default function PricingCards() {
  return (
    <section className="bg-[#FDFAF7] py-16 px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {/* Card 1 — One Scoop */}
        <motion.div
          whileHover={{ rotate: 1, scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="bg-[#F2E8D6] border border-[#E0D4C4] rounded-2xl p-8 flex flex-col"
        >
          <IceCreamCone scoops={['#E8C87A']} />
          <p className="text-2xl font-black text-[#361C24]">One Scoop</p>
          <p className="text-[#7A6458] text-sm mb-4">Starter</p>
          <div className="flex items-end gap-1 mb-6">
            <span className="text-5xl font-black text-[#D94A7A]">$49</span>
            <span className="text-xl text-[#7A6458] mb-1">/mo</span>
          </div>
          <ul className="flex flex-col gap-3 mb-8 flex-1">
            <FeatureItem text="Custom 3-page website" />
            <FeatureItem text="Google Business Profile setup" />
            <FeatureItem text="Monthly SEO content" />
            <FeatureItem text="AI review responses" />
            <FeatureItem text="Basic analytics dashboard" />
          </ul>
          <Button
            render={<Link href="/contact" />}
            variant="outline"
            className="w-full border-[#D94A7A] text-[#D94A7A] hover:bg-[#D94A7A]/10 bg-transparent"
          >
            Get Started
          </Button>
        </motion.div>

        {/* Card 2 — Double Scoop (Most Popular) */}
        <motion.div
          whileHover={{ rotate: -1, scale: 1.03 }}
          transition={{ duration: 0.2 }}
          className="relative bg-[#361C24] border-2 border-[#C99035] rounded-2xl p-8 flex flex-col"
        >
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C99035] text-[#361C24] px-4 py-1 rounded-full text-sm font-bold whitespace-nowrap">
            Most Popular
          </span>
          <IceCreamCone scoops={['#E8C87A', '#D94A7A']} />
          <p className="text-2xl font-black text-white">Double Scoop</p>
          <p className="text-[#9A8A7E] text-sm mb-4">Growth</p>
          <div className="flex items-end gap-1 mb-6">
            <span className="text-5xl font-black text-[#E8C87A]">$99</span>
            <span className="text-xl text-[#9A8A7E] mb-1">/mo</span>
          </div>
          <ul className="flex flex-col gap-3 mb-8 flex-1">
            <FeatureItem text="Custom 5-page website" />
            <FeatureItem text="Weekly Google Business posts" />
            <FeatureItem text="Local SEO optimization" />
            <FeatureItem text="AI chat widget (coming soon)" />
            <FeatureItem text="Monthly performance report" />
            <FeatureItem text="Priority support" />
          </ul>
          <Button
            render={<Link href="/contact" />}
            className="w-full bg-[#D94A7A] text-white hover:bg-[#C23D69] h-auto py-2.5"
          >
            Get Double Scoop
          </Button>
        </motion.div>

        {/* Card 3 — Triple Scoop */}
        <motion.div
          whileHover={{ rotate: 1, scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="bg-[#F2E8D6] border border-[#E0D4C4] rounded-2xl p-8 flex flex-col"
        >
          <IceCreamCone scoops={['#6E3D20', '#E8C87A', '#D94A7A']} />
          <p className="text-2xl font-black text-[#361C24]">Triple Scoop</p>
          <p className="text-[#7A6458] text-sm mb-4">Premium</p>
          <div className="flex items-end gap-1 mb-6">
            <span className="text-5xl font-black text-[#D94A7A]">$149</span>
            <span className="text-xl text-[#7A6458] mb-1">/mo</span>
          </div>
          <ul className="flex flex-col gap-3 mb-8 flex-1">
            <FeatureItem text="Custom 10-page website" />
            <FeatureItem text="Daily Google Business management" />
            <FeatureItem text="Advanced local SEO + backlinks" />
            <FeatureItem text="Social media content (2x/week)" />
            <FeatureItem text="Google Ads management (ad spend separate)" />
            <FeatureItem text="Dedicated account manager" />
          </ul>
          <Button
            render={<Link href="/contact" />}
            variant="outline"
            className="w-full border-[#D94A7A] text-[#D94A7A] hover:bg-[#D94A7A]/10 bg-transparent"
          >
            Get Started
          </Button>
        </motion.div>

      </div>

      <p className="text-center text-sm text-[#7A6458] mt-8">
        Website build fee: One-time $199–$499 depending on complexity. Included in first 3 months for new signups.
      </p>
    </section>
  )
}
