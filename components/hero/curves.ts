import { CENTER } from './types'

export interface Vec2 {
  x: number
  y: number
}

/**
 * Control point for a gentle outward-bowed curve from a to b, so orbit
 * connections read as organic energy arcs rather than rigid spokes —
 * matching the reference art direction.
 */
export function curveControl(a: Vec2, b: Vec2, bow = 0.22): Vec2 {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const dx = b.x - a.x
  const dy = b.y - a.y
  // perpendicular, pointing away from stage center for a consistent outward bow
  const nx = -dy
  const ny = dx
  const len = Math.hypot(nx, ny) || 1
  const toCenterX = mx - CENTER.x
  const toCenterY = my - CENTER.y
  const sign = nx * toCenterX + ny * toCenterY >= 0 ? 1 : -1
  const mag = Math.hypot(dx, dy) * bow
  return {
    x: mx + (nx / len) * mag * sign,
    y: my + (ny / len) * mag * sign,
  }
}

export function quadraticPoint(a: Vec2, c: Vec2, b: Vec2, t: number): Vec2 {
  const it = 1 - t
  return {
    x: it * it * a.x + 2 * it * t * c.x + t * t * b.x,
    y: it * it * a.y + 2 * it * t * c.y + t * t * b.y,
  }
}

export function quadraticPath(a: Vec2, c: Vec2, b: Vec2): string {
  return `M ${a.x} ${a.y} Q ${c.x} ${c.y} ${b.x} ${b.y}`
}
