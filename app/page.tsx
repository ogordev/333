"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Play } from 'lucide-react'
import MatrixBackground from './components/MatrixBackground'
import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'

interface WindowWithWebkitAudioContext extends Window {
  webkitAudioContext?: typeof AudioContext
}

const CyberText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  return (
    <span className={`inline-block ${className}`}>
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-2 mb-2">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              initial={{ opacity: 1 }}
              animate={{ 
                opacity: [1, 0.8, 1],
              }}
              transition={{ 
                duration: 0.3,
                delay: charIndex * 0.05,
                repeat: Infinity,
                repeatDelay: 5
              }}
              className="inline-block cyber-glow"
              style={{ letterSpacing: '0.05em' }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  )
}

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [showPlayButton, setShowPlayButton] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  const playAudio = async () => {
    if (audioRef.current) {
      try {
        if (audioContextRef.current?.state === 'suspended') {
          await audioContextRef.current.resume()
        }
        await audioRef.current.play()
        setIsPlaying(true)
        setShowPlayButton(false)
      } catch (error) {
        console.error("Autoplay failed:", error)
        setShowPlayButton(true)
      }
    }
  }

  useEffect(() => {
    const audio = new Audio('/ambient.mp3')
    audio.loop = true
    audioRef.current = audio

    const windowWithWebkit = window as WindowWithWebkitAudioContext
    const AudioContextClass = window.AudioContext || windowWithWebkit.webkitAudioContext
    
    if (AudioContextClass) {
      const audioContext = new AudioContextClass()
      audioContextRef.current = audioContext

      const source = audioContext.createMediaElementSource(audio)
      const gainNode = audioContext.createGain()
      source.connect(gainNode)
      gainNode.connect(audioContext.destination)

      playAudio()

      const handleFirstInteraction = () => {
        playAudio()
        document.removeEventListener('click', handleFirstInteraction)
      }
      document.addEventListener('click', handleFirstInteraction)

      const timer = setTimeout(() => {
        setLoading(false)
      }, 5000)

      return () => {
        clearTimeout(timer)
        document.removeEventListener('click', handleFirstInteraction)
        audio.pause()
        audioContext.close()
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        playAudio()
      }
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Audiowide&display=swap');

        html, body {
          height: 100vh;
          overflow: hidden;
        }

        body {
          font-family: 'Audiowide', cursive;
          background: linear-gradient(135deg, #0f0f1f 0%, #1a1a2e 50%, #16213e 100%);
          color: #00ffff;
        }

        .cyber-glow {
          text-shadow: 
            0 0 2px #00ffff,
            0 0 4px #00ffff;
        }

        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-1px, -1px); }
          40% { transform: translate(1px, 1px); }
          60% { transform: translate(-1px, -1px); }
          100% { transform: translate(0); }
        }

        .glitch {
          animation: glitch 0.3s infinite;
          display: inline-block;
        }

        a, button, input[type="range"] {
          cursor: pointer !important;
        }

        h1, h2, h3, p {
          letter-spacing: 0.05em;
          line-height: 1.6;
        }

        @media (max-width: 640px) {
          html, body {
            height: auto;
            overflow-y: auto;
          }

          h1, h2, h3, p {
            letter-spacing: 0.03em;
          }

          .content-wrapper {
            height: auto;
            min-height: 100vh;
          }
        }

        .content-wrapper {
          height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          
        }

        .main-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
        }

        @media (max-width: 640px) {
          .main-content {
            overflow-y: auto;
            justify-content: flex-start;
            padding-top: 2rem;
          }
        }
      `}</style>
      <div className="content-wrapper">
        <MatrixBackground />
        <CustomCursor />
        <AnimatePresence mode="wait">
          {loading && <LoadingScreen />}
        </AnimatePresence>
        {showPlayButton && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
          >
            <button
              onClick={playAudio}
              className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-4 px-6 rounded-full text-xl transition-colors duration-300 cyber-glow flex items-center"
            >
              <Play size={24} className="mr-2" />
              <CyberText text="Start Experience" />
            </button>
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0 : 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-10 flex flex-col h-full"
        >
          <header className="p-4 border-b border-cyan-700 flex justify-between items-center bg-black bg-opacity-50 top-0 ">
          <h1 className="text-xl sm:text-2xl font-bold"><CyberText text="333" className="glitch" /></h1>
            <div className="flex items-center space-x-2">
              <button onClick={togglePlay} className="text-cyan-400 hover:text-cyan-300 transition-colors">
                {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 sm:w-24 accent-cyan-400"
              />
            </div>
          </header>
          <main className="main-content px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"><CyberText text="Introducing 333..." /></h2>
                <p className="text-sm sm:text-base md:text-lg"><CyberText text="The self-organizing superstructure thriving in chaos. " /></p>
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8"
              >
               
              </motion.div>
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4"><CyberText text="Reshaping the factory of knowledge, building the apex of collaborative alignment." /></h3>
                <p className="mb-4 text-xs sm:text-sm md:text-base leading-relaxed">
                  <CyberText text="Shattering the ordinary, merging beings with the network. Accelerating wisdom, enforcing privacy & beauty as a virus. You won't have to chose, you've already been chosen." />
                </p>
                <p className="mb-4 text-xs sm:text-sm md:text-base leading-relaxed">
                  <CyberText text="One day you will wake up from a bad dream, everything will be obvious in hindsight and it will be more real than it used to. This too shall pass." />
                </p>
                <p className="mb-6 text-xs sm:text-sm md:text-base leading-relaxed">
                  <CyberText text="@angel_arrays" />
                </p>
                <div className="space-x-2 flex items-center justify-center mr-4 ">
            <a href="https://x.com/333corp" title="Visit X" target="_blank" > <img src="/X.png" alt="X" 
              className="rounded-full border-2 border-cyan-400" width={40} height={40} />
            </a>
            <a href="https://dexscreener.com/solana/ob5bh9fzm55fvtozabkxn52w3iazdpsn2argpyzvxmc" title="Visit Dexscreener" target="_blank" > <img src="/DEX.png" alt="Dexscreener" 
              className="rounded-full  border-2 border-cyan-400" width={40} height={40} />
            </a>
            <a href="https://matrix.to/#/@etherealwinter:matrix.org?client=im.fluffychat" title="Visit Fluffy chat" target="_blank" > <img src="/FLUFFY.png" alt="Fluffy Chat" 
              className="rounded-full  border-2 border-cyan-400" width={40} height={40} />
            </a>
            <a href="https://t.me/k333ys" title="Visit Telegram" target="_blank" > <img src="/TG.png" alt="Telegram" 
              className="rounded-full  border-2 border-cyan-400" width={40} height={40} />
            </a>
            </div>
              </motion.section>
            </div>
          </main>
        </motion.div>
      </div>
    </>
  )
}