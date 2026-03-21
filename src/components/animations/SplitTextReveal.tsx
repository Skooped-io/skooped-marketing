'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { Easing } from 'framer-motion'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'p'

interface SplitTextRevealProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
  as?: HeadingTag
}

const easeOut: Easing = 'easeOut'

export default function SplitTextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.05,
  as: Tag = 'h1',
}: SplitTextRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const prefersReducedMotion = useReducedMotion()

  const words = text.split(' ')

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement>} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: prefersReducedMotion ? 0 : 20 }
          }
          transition={{
            duration: prefersReducedMotion ? 0 : 0.4,
            delay: prefersReducedMotion ? 0 : delay + i * stagger,
            ease: easeOut,
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  )
}
