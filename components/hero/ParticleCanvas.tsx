'use client'

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { STAGE } from './types'
import { quadraticPoint, type Vec2 } from './curves'

export interface CurveSegment {
  a: Vec2
  c: Vec2
  b: Vec2
}

export interface ParticleCanvasHandle {
  setActivePath: (segments: CurveSegment[]) => void
}

interface Particle {
  segment: number
  t: number
  speed: number
  size: number
}

const ParticleCanvas = forwardRef<ParticleCanvasHandle, { maxParticles: number; reducedMotion: boolean }>(
  function ParticleCanvas({ maxParticles, reducedMotion }, ref) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const segmentsRef = useRef<CurveSegment[]>([])
    const particlesRef = useRef<Particle[]>([])
    const rafRef = useRef<number>(0)
    const spawnTimerRef = useRef(0)

    useImperativeHandle(ref, () => ({
      setActivePath(segments) {
        segmentsRef.current = segments
      },
    }))

    useEffect(() => {
      if (reducedMotion) return
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      let dpr = Math.min(window.devicePixelRatio || 1, 2)
      const resize = () => {
        const rect = canvas.getBoundingClientRect()
        dpr = Math.min(window.devicePixelRatio || 1, 2)
        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
      }
      resize()
      window.addEventListener('resize', resize)

      let last = performance.now()

      const spawn = () => {
        if (particlesRef.current.length >= maxParticles) return
        const segments = segmentsRef.current.length
        if (segments < 1) return
        particlesRef.current.push({
          segment: Math.floor(Math.random() * segments),
          t: 0,
          speed: 0.55 + Math.random() * 0.35,
          size: 1.6 + Math.random() * 1.4,
        })
      }

      const tick = (now: number) => {
        const dt = Math.min((now - last) / 1000, 0.05)
        last = now

        const rect = canvas.getBoundingClientRect()
        const scale = rect.width / STAGE
        ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0)
        ctx.clearRect(0, 0, STAGE, STAGE)

        const segments = segmentsRef.current
        if (segments.length >= 1) {
          spawnTimerRef.current += dt
          if (spawnTimerRef.current > 0.28) {
            spawnTimerRef.current = 0
            spawn()
          }

          particlesRef.current = particlesRef.current.filter((p) => {
            p.t += dt * p.speed
            if (p.t >= 1) {
              if (p.segment < segments.length - 1) {
                p.segment += 1
                p.t = 0
              } else {
                return false
              }
            }
            const seg = segments[p.segment]
            if (!seg) return false
            const { x, y } = quadraticPoint(seg.a, seg.c, seg.b, p.t)

            const grad = ctx.createRadialGradient(x, y, 0, x, y, p.size * 4)
            grad.addColorStop(0, 'rgba(255,170,90,0.9)')
            grad.addColorStop(1, 'rgba(255,122,0,0)')
            ctx.fillStyle = grad
            ctx.beginPath()
            ctx.arc(x, y, p.size * 4, 0, Math.PI * 2)
            ctx.fill()

            ctx.fillStyle = 'rgba(255,200,150,0.95)'
            ctx.beginPath()
            ctx.arc(x, y, p.size, 0, Math.PI * 2)
            ctx.fill()

            return true
          })
        } else if (particlesRef.current.length) {
          particlesRef.current = []
        }

        rafRef.current = requestAnimationFrame(tick)
      }

      rafRef.current = requestAnimationFrame(tick)
      return () => {
        cancelAnimationFrame(rafRef.current)
        window.removeEventListener('resize', resize)
      }
    }, [maxParticles, reducedMotion])

    if (reducedMotion) return null

    return (
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
    )
  }
)

export default ParticleCanvas
