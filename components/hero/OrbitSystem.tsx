import { CENTER, RING_RADIUS, TOOLS, type ToolId, type ViewportTier } from './types'
import ToolNode from './ToolNode'

interface Props {
  tier: ViewportTier
  activeIds: Set<ToolId>
  registerNode: (id: ToolId, el: SVGForeignObjectElement | null) => void
}

export const NODE_W = 210
export const ICON_SIZE_DESKTOP = 136
export const ICON_SIZE_SMALL = 112

export default function OrbitSystem({ tier, activeIds, registerNode }: Props) {
  const visibleTools = TOOLS.filter((t) => !(tier === 'mobile' && t.hideOnMobile))
  const iconSize = tier === 'desktop' ? ICON_SIZE_DESKTOP : ICON_SIZE_SMALL

  return (
    <>
      {/* decorative rings — 3 major (node-bearing) + 2 extra faint inner rings for depth */}
      {[RING_RADIUS[1], RING_RADIUS[2], RING_RADIUS[3]].map((r) => (
        <circle
          key={r}
          cx={CENTER.x}
          cy={CENTER.y}
          r={r}
          fill="none"
          stroke="rgba(245,241,236,0.07)"
          strokeWidth={1}
        />
      ))}
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={(RING_RADIUS[1] + RING_RADIUS[2]) / 2}
        fill="none"
        stroke="rgba(255,122,0,0.05)"
        strokeWidth={1}
        strokeDasharray="2 9"
      />
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={(RING_RADIUS[2] + RING_RADIUS[3]) / 2}
        fill="none"
        stroke="rgba(255,122,0,0.045)"
        strokeWidth={1}
        strokeDasharray="2 9"
      />

      {visibleTools.map((tool) => (
        <foreignObject
          key={tool.id}
          ref={(el) => registerNode(tool.id, el)}
          width={NODE_W}
          height={iconSize + 64}
          style={{ overflow: 'visible' }}
        >
          {/* @ts-expect-error -- xmlns not typed on div but required inside foreignObject */}
          <div xmlns="http://www.w3.org/1999/xhtml">
            <ToolNode
              id={tool.id}
              label={tool.label}
              subtitle={tool.subtitle}
              active={activeIds.has(tool.id)}
              size={iconSize}
            />
          </div>
        </foreignObject>
      ))}
    </>
  )
}
