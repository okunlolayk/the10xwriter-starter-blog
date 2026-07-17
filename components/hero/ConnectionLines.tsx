'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'
import { CENTER, TOOLS, type ToolId } from './types'
import { curveControl, quadraticPath, type Vec2 } from './curves'

export interface ConnectionLinesHandle {
  update: (
    positions: Partial<Record<ToolId, Vec2>>,
    activeSequence: ToolId[],
    activeStrength: number
  ) => void
}

const ConnectionLines = forwardRef<ConnectionLinesHandle, { tier: string }>(function ConnectionLines(
  _props,
  ref
) {
  const faintRefs = useRef<Partial<Record<ToolId, SVGPathElement | null>>>({})
  const activePathRef = useRef<SVGPathElement | null>(null)

  useImperativeHandle(ref, () => ({
    update(positions, activeSequence, activeStrength) {
      for (const tool of TOOLS) {
        const el = faintRefs.current[tool.id]
        const p = positions[tool.id]
        if (el && p) {
          const c = curveControl(CENTER, p, 0.16)
          el.setAttribute('d', quadraticPath(CENTER, c, p))
        }
      }

      const pathEl = activePathRef.current
      if (pathEl) {
        if (activeSequence.length > 0) {
          const chain: Vec2[] = activeSequence
            .map((id) => positions[id])
            .filter((p): p is Vec2 => !!p)
          chain.push(CENTER)

          let d = ''
          for (let i = 0; i < chain.length - 1; i++) {
            const a = chain[i]
            const b = chain[i + 1]
            const c = curveControl(a, b, 0.24)
            d += (i === 0 ? `M ${a.x} ${a.y} ` : '') + `Q ${c.x} ${c.y} ${b.x} ${b.y} `
          }
          pathEl.setAttribute('d', d)
          pathEl.style.opacity = String(activeStrength)
        } else {
          pathEl.style.opacity = '0'
        }
      }
    },
  }))

  return (
    <>
      <defs>
        <filter id="line-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* faint always-on curved links, center to every node */}
      {TOOLS.map((tool) => (
        <path
          key={tool.id}
          ref={(el) => {
            faintRefs.current[tool.id] = el
          }}
          d=""
          fill="none"
          stroke="rgba(245,241,236,0.10)"
          strokeWidth={1}
          className="faint-link"
        />
      ))}

      {/* glowing active-workflow path */}
      <path
        ref={activePathRef}
        d=""
        fill="none"
        stroke="#FF7A00"
        strokeWidth={1.5}
        strokeLinecap="round"
        filter="url(#line-glow)"
        className="active-path"
        style={{ opacity: 0, transition: 'opacity 900ms ease' }}
      />

      <style>{`
        .faint-link { stroke-dasharray: 1 0; animation: dash-cycle 9s ease-in-out infinite; }
        .faint-link:nth-of-type(2n) { animation-delay: 2.4s; }
        .faint-link:nth-of-type(3n) { animation-delay: 4.8s; }
        @keyframes dash-cycle {
          0%, 70%, 100% { stroke-dasharray: 1 0; }
          80%, 90% { stroke-dasharray: 4 6; }
        }
        .active-path { stroke-dasharray: 7 6; animation: flow 1.4s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .faint-link, .active-path { animation: none; }
        }
        @keyframes flow { to { stroke-dashoffset: -26; } }
      `}</style>
    </>
  )
})

export default ConnectionLines
