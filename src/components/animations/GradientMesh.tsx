'use client'

import { useReducedMotion } from 'framer-motion'

interface GradientMeshProps {
  className?: string
}

export default function GradientMesh({ className }: GradientMeshProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className ?? ''}`}
      aria-hidden="true"
    >
      <div
        className={`absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl ${
          prefersReducedMotion ? '' : 'animate-blob'
        }`}
        style={{ backgroundColor: '#D94A7A', opacity: 0.15 }}
      />
      <div
        className={`absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl ${
          prefersReducedMotion ? '' : 'animate-blob'
        }`}
        style={{
          backgroundColor: '#E8C87A',
          opacity: 0.2,
          animationDelay: prefersReducedMotion ? undefined : '3s',
        }}
      />
    </div>
  )
}
