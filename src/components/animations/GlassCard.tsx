'use client'

import { motion } from 'framer-motion'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
}

export default function GlassCard({
  children,
  className,
  hoverEffect = true,
}: GlassCardProps) {
  const baseClasses = `backdrop-blur-sm bg-white/30 border border-white/20 rounded-xl shadow-sm ${className ?? ''}`

  if (hoverEffect) {
    return (
      <motion.div
        className={baseClasses}
        whileHover={{ scale: 1.02, boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    )
  }

  return <div className={baseClasses}>{children}</div>
}
