'use client'

import { useReducedMotion } from 'framer-motion'

interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  delay?: string
}

export default function FloatingElement({
  children,
  className,
  delay = '0s',
}: FloatingElementProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className={prefersReducedMotion ? className : `animate-float ${className ?? ''}`}
      style={prefersReducedMotion ? undefined : { animationDelay: delay }}
    >
      {children}
    </div>
  )
}
