'use client'

import { useReducedMotion } from 'framer-motion'

interface SparkleIconProps {
  size?: number
  color?: string
  delay?: number
  className?: string
}

export default function SparkleIcon({
  size = 24,
  color = '#D94A7A',
  delay = 0,
  className,
}: SparkleIconProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={prefersReducedMotion ? className : `animate-sparkle ${className ?? ''}`}
      style={prefersReducedMotion ? undefined : { animationDelay: `${delay}s` }}
      aria-hidden="true"
    >
      {/* 4-pointed star with smaller diagonal points */}
      <path
        d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z"
        fill={color}
      />
      <path
        d="M19 3L19.7 6.3L23 7L19.7 7.7L19 11L18.3 7.7L15 7L18.3 6.3L19 3Z"
        fill={color}
        opacity="0.6"
      />
      <path
        d="M5 16L5.5 18.5L8 19L5.5 19.5L5 22L4.5 19.5L2 19L4.5 18.5L5 16Z"
        fill={color}
        opacity="0.5"
      />
    </svg>
  )
}
