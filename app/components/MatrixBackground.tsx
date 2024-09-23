"use client"

import React, { useRef, useEffect } from 'react'

const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

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

      ctx.font = '15px monospace'

      for (let i = 0; i < drops.length; i++) {
        const x = i * 20
        const y = drops[i] * 20

        const dx = x - mouseRef.current.x
        const dy = y - mouseRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        const maxDistance = 200 // Radius of effect
        const repelForce = Math.max(0, 1 - distance / maxDistance)

        // Create a gradient effect from cyan to cold blue-white
        const red = Math.floor(200 * repelForce)
        const green = Math.floor(255 * (0.8 + 0.2 * repelForce))
        const blue = 255
        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${0.8 + repelForce * 0.2})`

        const text = matrix[Math.floor(Math.random() * matrix.length)]
        
        // Keep the same repulsion effect
        const offsetX = repelForce * dx * 0.7
        const offsetY = repelForce * dy * 0.7
        
        ctx.fillText(text, x + offsetX, y + offsetY)

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed bg-black inset-0 w-full h-full z-0" />
}

export default MatrixBackground