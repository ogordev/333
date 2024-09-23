"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface GlitchProps {
  children: React.ReactNode
  intensity?: number
}

const Glitch: React.FC<GlitchProps> = ({ children, intensity = 0.1 }) => {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < intensity) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 100 + Math.random() * 100)
      }
    }, 1000)

    return () => clearInterval(glitchInterval)
  }, [intensity])

  if (!isGlitching) {
    return <>{children}</>
  }

  return (
    <span className="relative inline-block">
      <motion.span
        className="absolute top-0 left-0 w-full h-full"
        style={{ clipPath: 'inset(0 33% 0 0)' }}
        animate={{
          x: [0, -3, 3, 0],
          y: [0, 2, -2, 0],
        }}
        transition={{ duration: 0.2, times: [0, 0.33, 0.66, 1] }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 w-full h-full"
        style={{ clipPath: 'inset(0 0 0 66%)' }}
        animate={{
          x: [0, 3, -3, 0],
          y: [0, -2, 2, 0],
        }}
        transition={{ duration: 0.2, times: [0, 0.33, 0.66, 1] }}
      >
        {children}
      </motion.span>
      <span className="invisible">{children}</span>
    </span>
  )
}

export default Glitch