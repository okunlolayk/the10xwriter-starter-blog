'use client'

import { useEffect, useState } from 'react'
import type { ViewportTier } from './types'

export function useViewportTier(): ViewportTier {
  const [tier, setTier] = useState<ViewportTier>('desktop')

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth
      if (w < 640) setTier('mobile')
      else if (w < 1024) setTier('tablet')
      else setTier('desktop')
    }
    compute()
    let t: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(t)
      t = setTimeout(compute, 150)
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      clearTimeout(t)
    }
  }, [])

  return tier
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', listener)
    return () => mq.removeEventListener('change', listener)
  }, [])

  return reduced
}
