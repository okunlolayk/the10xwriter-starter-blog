export type ToolId =
  | 'notebooklm'
  | 'claude'
  | 'gemini'
  | 'obsidian'
  | 'zotero'
  | 'deep-research'
  | 'prompting'

export type ViewportTier = 'mobile' | 'tablet' | 'desktop'

export interface ToolDef {
  id: ToolId
  label: string
  subtitle: string
  ring: 1 | 2 | 3
  /** starting angle in radians */
  phase: number
  /** radians / second, sign sets direction */
  angularSpeed: number
  /** vertical bob amplitude in px */
  floatAmp: number
  floatSpeed: number
  /** hidden on mobile when true */
  hideOnMobile?: boolean
}

export interface Point {
  x: number
  y: number
  scale: number
  opacity: number
}

/** Virtual coordinate space every layer (SVG + canvas) shares */
export const STAGE = 1300
export const CENTER = { x: STAGE / 2, y: STAGE / 2 }

export const RING_RADIUS: Record<1 | 2 | 3, number> = {
  1: 440,
  2: 295,
  3: 150,
}

export const TOOLS: ToolDef[] = [
  { id: 'notebooklm', label: 'NotebookLM', subtitle: 'Organize & connect your knowledge', ring: 1, phase: 0, angularSpeed: 0.055, floatAmp: 7, floatSpeed: 0.6 },
  { id: 'gemini', label: 'Gemini', subtitle: 'Generate ideas, explore possibilities', ring: 1, phase: (Math.PI * 2) / 3, angularSpeed: 0.055, floatAmp: 6, floatSpeed: 0.5 },
  { id: 'zotero', label: 'Zotero', subtitle: 'Collect, organize, cite with ease', ring: 1, phase: (Math.PI * 4) / 3, angularSpeed: 0.055, floatAmp: 8, floatSpeed: 0.45, hideOnMobile: true },
  { id: 'claude', label: 'Claude', subtitle: 'AI assistant for thinking & writing', ring: 2, phase: Math.PI / 4, angularSpeed: -0.08, floatAmp: 6, floatSpeed: 0.7 },
  { id: 'deep-research', label: 'Deep Research', subtitle: 'Go deeper. Find what matters', ring: 2, phase: Math.PI + Math.PI / 4, angularSpeed: -0.08, floatAmp: 7, floatSpeed: 0.55, hideOnMobile: true },
  { id: 'obsidian', label: 'Obsidian', subtitle: 'Your knowledge, connected forever', ring: 3, phase: Math.PI / 2, angularSpeed: 0.12, floatAmp: 5, floatSpeed: 0.9 },
  { id: 'prompting', label: 'Prompting', subtitle: 'Craft better prompts, get better results', ring: 3, phase: (Math.PI * 3) / 2, angularSpeed: 0.12, floatAmp: 5, floatSpeed: 0.8 },
]

export interface Workflow {
  id: 'research' | 'writing' | 'knowledge'
  label: string
  sequence: ToolId[]
}

export const WORKFLOWS: Workflow[] = [
  { id: 'research', label: 'Research Mode', sequence: ['notebooklm', 'deep-research'] },
  { id: 'writing', label: 'Writing Mode', sequence: ['gemini', 'claude', 'obsidian'] },
  { id: 'knowledge', label: 'Knowledge Mode', sequence: ['zotero', 'obsidian', 'notebooklm'] },
]

/** how long a workflow stays highlighted, and the gap before the next one */
export const WORKFLOW_ACTIVE_MS = 4200
export const WORKFLOW_GAP_MS = 5800
