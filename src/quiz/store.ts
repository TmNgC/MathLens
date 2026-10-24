import type { AttemptSummary } from './types'

const KEY = 'mathlens:quiz'
const MAX = 20

export function getAttempts(): AttemptSummary[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]') as AttemptSummary[]
  } catch {
    return []
  }
}

export function saveAttempt(a: AttemptSummary) {
  const all = [a, ...getAttempts()].slice(0, MAX)
  try {
    localStorage.setItem(KEY, JSON.stringify(all))
  } catch {
    /* private mode */
  }
}
