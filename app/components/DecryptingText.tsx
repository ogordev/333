"use client"

import React, { useState, useEffect } from 'react'

interface DecryptingTextProps {
  text: string
  duration: number
}

const DecryptingText: React.FC<DecryptingTextProps> = ({ text, duration }) => {
  const [displayText, setDisplayText] = useState('')
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'

  useEffect(() => {
    let startTime: number
    let animationFrameId: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime

      if (progress < duration) {
        let result = ''
        for (let i = 0; i < text.length; i++) {
          if (progress / duration > i / text.length) {
            result += text[i]
          } else {
            result += characters[Math.floor(Math.random() * characters.length)]
          }
        }
        setDisplayText(result)
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setDisplayText(text)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [text, duration])

  return <span className="font-mono">{displayText}</span>
}

export default DecryptingText