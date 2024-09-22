"use client"

import React from 'react'
import { motion } from 'framer-motion'
import DecryptingText from './DecryptingText'

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-cyan-400">
          <DecryptingText text="CRYO-DIGITAL NEXUS" duration={2500} />
        </h1>
      </motion.div>
    </div>
  )
}

export default LoadingScreen