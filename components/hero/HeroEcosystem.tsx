'use client'

import { useEffect, useRef, useState } from 'react'
import BackgroundEffects from './BackgroundEffects'
import OrbitSystem, { NODE_W, ICON_SIZE_DESKTOP, ICON_SIZE_SMALL } from './OrbitSystem'
import YouCore from './YouCore'
import StatusPill from './StatusPill'
import ConnectionLines, { type ConnectionLinesHandle } from './ConnectionLines'
import ParticleCanvas, { type ParticleCanvasHandle, type CurveSegment } from './ParticleCanvas'
import { useWorkflowCycle } from './WorkflowManager'
import { useReducedMotion, useViewportTier } from './hooks'
import { CENTER, RING_RADIUS, STAGE, TOOLS, type ToolId, type ViewportTier } from './types'
import { curveControl, type Vec2 } from './curves'

function computePosition(tool: (typeof TOOLS)[number], t: number) {
  const angle = tool.phase + tool.angularSpeed * t
  const radius = RING_RADIUS[tool.ring]
  const x = CENTER.x + radius * Math.cos(angle)
  const y =
    CENTER.y + radius * Math.sin(angle) + Math.sin(t * tool.floatSpeed + tool.phase) * tool.floatAmp
  return { x, y }
}

function iconSizeFor(tier: ViewportTier) {
  return tier === 'desktop' ? ICON_SIZE_DESKTOP : ICON_SIZE_SMALL
}

export default function HeroEcosystem() {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const nodeRefs = useRef<Partial<Record<ToolId, SVGForeignObjectElement | null>>>({})
  const linesRef = useRef<ConnectionLinesHandle>(null)
  const particlesRef = useRef<ParticleCanvasHandle>(null)
  const rafRef = useRef<number>(0)
  const startRef = useRef<number>(0)
  const [rippleKey, setRippleKey] = useState(0)

  const tier = useViewportTier()
  const reducedMotion = useReducedMotion()
  const { workflow, strength } = useWorkflowCycle(reducedMotion)

  const activeIds = new Set<ToolId>(workflow?.sequence ?? [])
  const iconSize = iconSizeFor(tier)

  useEffect(() => {
    if (workflow) setRippleKey((k) => k + 1)
  }, [workflow])

  const registerNode = (id: ToolId, el: SVGForeignObjectElement | null) => {
    nodeRefs.current[id] = el
    if (el) {
      const tool = TOOLS.find((t) => t.id === id)
      if (tool) {
        const p = computePosition(tool, 0)
        el.setAttribute('x', String(p.x - NODE_W / 2))
        el.setAttribute('y', String(p.y - iconSize / 2))
      }
    }
  }

  useEffect(() => {
    if (reducedMotion) return
    if (!startRef.current) startRef.current = performance.now()

    const tick = (now: number) => {
      const t = (now - startRef.current) / 1000
      const positions: Partial<Record<ToolId, Vec2>> = {}

      for (const tool of TOOLS) {
        const el = nodeRefs.current[tool.id]
        const p = computePosition(tool, t)
        positions[tool.id] = p
        if (el) {
          el.setAttribute('x', String(p.x - NODE_W / 2))
          el.setAttribute('y', String(p.y - iconSize / 2))
        }
      }

      linesRef.current?.update(positions, workflow?.sequence ?? [], strength)

      if (workflow) {
        const chain: Vec2[] = workflow.sequence
          .map((id) => positions[id])
          .filter((p): p is Vec2 => !!p)
        chain.push(CENTER)
        const segments: CurveSegment[] = []
        for (let i = 0; i < chain.length - 1; i++) {
          const a = chain[i]
          const b = chain[i + 1]
          segments.push({ a, c: curveControl(a, b, 0.24), b })
        }
        particlesRef.current?.setActivePath(segments)
      } else {
        particlesRef.current?.setActivePath([])
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, workflow, strength, iconSize])

  const maxParticles = tier === 'desktop' ? 22 : tier === 'tablet' ? 10 : 5

  return (
    <div ref={stageRef} className="relative h-full w-full">
      <BackgroundEffects />
      <svg
        viewBox={`0 0 ${STAGE} ${STAGE}`}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <ConnectionLines ref={linesRef} tier={tier} />
        <OrbitSystem tier={tier} activeIds={activeIds} registerNode={registerNode} />
      </svg>
      <ParticleCanvas ref={particlesRef} maxParticles={maxParticles} reducedMotion={reducedMotion} />
      <YouCore size={tier === 'desktop' ? 66 : 52} rippleKey={rippleKey} />
      <StatusPill />
    </div>
  )
}
