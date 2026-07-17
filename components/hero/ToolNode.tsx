import { TOOL_ICONS } from './icons'
import type { ToolId } from './types'

interface Props {
  id: ToolId
  label: string
  subtitle: string
  active: boolean
  size: number
}

export default function ToolNode({ id, label, subtitle, active, size }: Props) {
  const Icon = TOOL_ICONS[id]

  return (
    <div
      className="flex flex-col items-center text-center transition-transform duration-300"
      style={{ transform: active ? 'scale(1.08)' : 'scale(1)', width: 210 }}
    >
      {/* glossy glass sphere */}
      <div
        className="tool-node-glass relative flex items-center justify-center rounded-full transition-shadow duration-500"
        style={{
          width: size,
          height: size,
          background:
            'radial-gradient(circle at 32% 26%, rgba(255,255,255,0.16), rgba(20,20,22,0.55) 42%, rgba(6,6,8,0.9) 78%)',
          border: active ? '1px solid rgba(255,138,40,0.85)' : '1px solid rgba(245,241,236,0.16)',
          boxShadow: active
            ? '0 0 26px 4px rgba(255,122,0,0.4), inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -6px 10px rgba(0,0,0,0.5)'
            : '0 6px 20px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.18), inset 0 -6px 10px rgba(0,0,0,0.45)',
        }}
      >
        {/* top gloss highlight */}
        <span
          className="pointer-events-none absolute rounded-full"
          style={{
            top: '10%',
            left: '18%',
            width: '38%',
            height: '22%',
            background: 'rgba(255,255,255,0.35)',
            filter: 'blur(3px)',
            transform: 'rotate(-18deg)',
          }}
        />
        <Icon style={{ width: '54%', height: '54%', position: 'relative' }} />
      </div>

      <span
        className="mt-2.5 font-sans text-[13px] font-semibold whitespace-nowrap transition-colors duration-300"
        style={{ color: active ? '#FF9E42' : '#F5F1EC' }}
      >
        {label}
      </span>
      <span className="mt-0.5 max-w-[195px] font-sans text-[10.5px] leading-[1.35] text-[rgba(245,241,236,0.55)]">
        {subtitle}
      </span>
    </div>
  )
}
