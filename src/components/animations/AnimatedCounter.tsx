'use client'

import { useEffect, useRef } from 'react'
import {
  useMotionValue,
  useTransform,
  animate,
  useInView,
  useReducedMotion,
  motion,
} from 'framer-motion'

interface AnimatedCounterProps {
  target: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export default function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const prefersReducedMotion = useReducedMotion()

  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))

  useEffect(() => {
    if (!isInView) return
    if (prefersReducedMotion) {
      count.set(target)
      return
    }
    const controls = animate(count, target, { duration, ease: 'easeOut' })
    return () => controls.stop()
  }, [isInView, target, duration, prefersReducedMotion, count])

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}
