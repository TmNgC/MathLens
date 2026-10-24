/**
 * Lesson progress, persisted in localStorage (no accounts, like the
 * Arduino-Learner reference). Tiny pub/sub so React views stay in sync.
 */
const KEY = 'mathlens:progress'

export type Progress = Record<string, boolean>

const listeners = new Set<() => void>()

/** cached snapshot so useSyncExternalStore gets a stable reference */
let cache: Progress | null = null

function read(): Progress {
  if (cache) return cache
  try {
    cache = JSON.parse(localStorage.getItem(KEY) ?? '{}') as Progress
  } catch {
    cache = {}
  }
  return cache
}

function write(p: Progress) {
  cache = p
  try {
    localStorage.setItem(KEY, JSON.stringify(p))
  } catch {
    /* private mode — progress just won't persist */
  }
  listeners.forEach((fn) => fn())
}

export function getProgress(): Progress {
  return read()
}

export function isDone(lessonId: string): boolean {
  return !!read()[lessonId]
}

export function markDone(lessonId: string) {
  const p = read()
  if (!p[lessonId]) write({ ...p, [lessonId]: true })
}

export function resetProgress() {
  write({})
}

export function subscribe(fn: () => void): () => void {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
