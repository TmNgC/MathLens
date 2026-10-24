/**
 * Canvas palette — kept in sync with the @theme tokens in index.css.
 * Canvas cannot read CSS variables cheaply, so these are the same hexes.
 */
export const C = {
  bg: '#0c1022',
  bgSoft: '#10152c',
  grid: '#1c2344',
  axis: '#414c80',
  ink: '#e9edff',
  dim: '#98a1c9',
  faint: '#5f6890',
  curve: '#58c4dd',
  gold: '#ffd35c',
  mint: '#97e3a2',
  coral: '#ff8b8b',
  teal: '#5cd6c0',
  violet: '#b28ddd',
} as const

export const MONO = '"JetBrains Mono", ui-monospace, monospace'
export const SANS = '"Be Vietnam Pro", sans-serif'
