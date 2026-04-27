'use client'

import { motion, useReducedMotion } from 'framer-motion'

type AnimatedSectionProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  yOffset?: number
  duration?: number
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  yOffset = 24,
  duration = 0.5,
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={`w-full${className ? ` ${className}` : ''}`}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
