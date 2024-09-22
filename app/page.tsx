"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MatrixBackground from './components/MatrixBackground'
import LoadingScreen from './components/LoadingScreen'

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000) // 3 seconds delay

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-mono relative">
      <MatrixBackground />
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <header className="p-4 border-b border-cyan-700">
          <h1 className="text-2xl font-bold">Cryo-Digital Nexus</h1>
        </header>
        <main className="container mx-auto p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-8">Frozen Data Streams</h2>
            <p className="text-lg mb-12">Where information flows like ice through quantum circuits</p>
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-16"
          >
            <div className="w-64 h-64 border-4 border-cyan-400 rounded-full flex items-center justify-center">
              <span className="text-6xl font-bold">❄️</span>
            </div>
          </motion.div>
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h3 className="text-2xl font-bold mb-8">The Vision of Cryo-Digital Nexus</h3>
            <p className="mb-8 leading-relaxed">
              Cryo-Digital Nexus represents the convergence of cryogenic technology and digital innovation. 
              We aim to preserve and process information at the quantum level, pushing the boundaries of data integrity and computational power.
            </p>
            <p className="mb-8 leading-relaxed">
              Through our advanced cryogenic systems, we create an environment where data can exist in its purest form, 
              untouched by the chaos of thermal fluctuations and electromagnetic interference.
            </p>
            <p className="mb-12 leading-relaxed">
              Join us on this journey into the cold depths of digital space, where we unlock the potential of 
              sub-zero computing and redefine the future of information technology.
            </p>
            <div className="mt-12">
              <button className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-300">
                Initiate Cryo-Sync
              </button>
            </div>
          </motion.section>
        </main>
      </motion.div>
    </div>
  )
}