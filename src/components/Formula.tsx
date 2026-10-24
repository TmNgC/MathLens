import { useMemo } from 'react'
import katex from 'katex'

const escapeHtml = (s: string) =>
  s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')

/**
 * Renders prose containing inline math: "độ dốc $\\frac{dy}{dx}$ của đường cong".
 * $...$ segments are rendered with KaTeX; the rest is plain text.
 */
export function Formula({ text, className }: { text: string; className?: string }) {
  const html = useMemo(() => {
    return text
      .split(/\$(.+?)\$/g)
      .map((part, i) =>
        i % 2 === 1
          ? katex.renderToString(part, { throwOnError: false })
          : escapeHtml(part),
      )
      .join('')
  }, [text])
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />
}
