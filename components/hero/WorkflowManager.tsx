'use client'

import { useEffect, useRef, useState } from 'react'
import { WORKFLOWS, WORKFLOW_ACTIVE_MS, WORKFLOW_GAP_MS, type Workflow } from './types'

interface WorkflowState {
  workflow: Workflow | null
  /** 0 -> 1 fade-in, holds at 1, then fades back to 0 near the end */
  strength: number
}

export function useWorkflowCycle(paused: boolean): WorkflowState {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'idle' | 'active'>('idle')
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    if (paused) return

    function scheduleActive() {
      timerRef.current = setTimeout(() => {
        setPhase('active')
        timerRef.current = setTimeout(() => {
          setPhase('idle')
          setIndex((i) => (i + 1) % WORKFLOWS.length)
          scheduleActive()
        }, WORKFLOW_ACTIVE_MS)
      }, WORKFLOW_GAP_MS)
    }

    scheduleActive()
    return () => clearTimeout(timerRef.current)
  }, [paused])

  return {
    workflow: phase === 'active' ? WORKFLOWS[index] : null,
    strength: phase === 'active' ? 1 : 0,
  }
}
