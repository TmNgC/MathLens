import type { ComponentType } from 'react'

/** Props every lesson scene receives from the shell. */
export interface SceneProps {
  /** current step index (drives React re-render) */
  step: number
}

/**
 * The shared lesson clock, provided by LessonShell. Scenes read these
 * refs inside their draw loop — playhead advances at 60fps without
 * re-rendering React.
 */
export interface LessonClock {
  step: number
  /** 0..1 progress through the current step's animation, looping */
  playheadRef: { current: number }
  pausedRef: { current: boolean }
}

export interface LessonStep {
  title: string
  /** Vietnamese prose; $...$ segments render as inline KaTeX */
  body: string
  /** seconds for one full playhead sweep (default 6) */
  duration?: number
}

export interface Lesson {
  id: string
  number: number
  title: string
  subtitle: string
  /** 'calc' 2D canvas · 'geo3d' R3F canvas · 'lab' free playground */
  kind: 'calc' | 'geo3d' | 'lab'
  /** accent color (hex) for cards and rail */
  accent: string
  /** emoji or short glyph for cards */
  glyph: string
  steps: LessonStep[]
  Scene: ComponentType<SceneProps>
}
