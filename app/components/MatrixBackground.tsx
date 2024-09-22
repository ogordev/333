"use client"

import React, { useRef, useEffect } from 'react'

const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const columns = Math.floor(canvas.width / 20)
    const drops: number[] = new Array(columns).fill(1)

    const matrix = '333ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?'

    function draw() {
      if (!ctx || !canvas) return

      ctx.fillStyle = 'rgba(0, 10, 30, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#0F0'
      ctx.font = '15px monospace'

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)]
        ctx.fillText(text, i * 20, drops[i] * 20)

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0" />
}

export default MatrixBackground