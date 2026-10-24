import type { SceneProps } from '../content/types'
import { useLessonClock } from '../components/LessonShell'
import { SceneCanvas } from '../components/SceneCanvas'
import { PlaneView, drawHud } from '../engine/PlaneView'
import type { Stage } from '../engine/Stage'
import { C, MONO } from '../engine/palette'
import { easeInOutCubic, easeInOutSine, lerp } from '../engine/easing'

const BAR_COLORS = [C.curve, C.teal, C.mint, C.gold, C.violet]

/**
 * Bài "Giới hạn" — the convergence story salvaged from MathLens 1:
 * 0 — Zeno square-filling (partial sums ½+¼+⅛+…)
 * 1 — auto-zoom camera into the vanishing gap (up to ×2^17)
 * 2 — limit of a function: f(x)=(x²−1)/(x−1) approaching from both sides
 * 3 — the ε band shrinking while the dots stay inside
 * 4 — recap: derivative & integral are both limits (dual mini scenes)
 */
export function LimitsScene({ step }: SceneProps) {
  const { playheadRef } = useLessonClock()

  const draw = (st: Stage) => {
    const ph = playheadRef.current
    const W = st.width
    const H = st.height
    const ctx = st.ctx!

    // era visibilities
    const vSq = st.smooth('vSq', step <= 1 ? 1 : 0, 6)
    const vFn = st.smooth('vFn', step === 2 || step === 3 ? 1 : 0, 6)
    const vRc = st.smooth('vRc', step === 4 ? 1 : 0, 6)
    const vEps = st.smooth('vEps', step === 3 ? 1 : 0, 6)

    /* ---------------- Zeno square (steps 0–1) ---------------- */
    if (vSq > 0.02) {
      const n = step === 0
        ? Math.max(1, Math.round(lerp(1, 12, easeInOutSine(ph))))
        : Math.round(lerp(12, 21, easeInOutSine(ph)))
      const gap = Math.pow(2, -n)
      // zoom grows to keep the gap a visible sliver (capped for float sanity)
      const zoom = step === 0 ? 1 : Math.min(0.22 / gap, Math.pow(2, 17))

      const size = Math.min(W * 0.52, H * 0.72)
      const cx = W / 2
      const cy = H / 2 - 14
      const x0 = cx - size / 2
      const y0 = cy - size / 2
      const focusX = x0 + size // gap lives at the right edge
      const focusY = cy

      ctx.save()
      ctx.globalAlpha = vSq
      // clip a soft region around the square (screen space)
      ctx.beginPath()
      ctx.rect(x0 - 70, y0 - 46, size + 140, size + 92)
      ctx.clip()
      // zoom camera
      ctx.translate(focusX, focusY)
      ctx.scale(zoom, zoom)
      ctx.translate(-focusX, -focusY)

      const lw = 1.5 / zoom

      // backdrop: the "unreached" region [1-g_prev .. 1] in faint
      ctx.fillStyle = 'rgba(255, 139, 139, 0.05)'
      ctx.fillRect(x0, y0, size, size)

      // bars: bar j occupies [1-2^-(j-1), 1-2^-j]
      for (let j = 1; j <= n; j++) {
        const bx = x0 + (1 - Math.pow(2, -(j - 1))) * size
        const bw = Math.pow(2, -j) * size
        ctx.fillStyle = BAR_COLORS[(j - 1) % BAR_COLORS.length]
        ctx.globalAlpha = vSq * 0.82
        ctx.fillRect(bx, y0, bw, size)
        ctx.globalAlpha = vSq
        ctx.strokeStyle = C.bg
        ctx.lineWidth = lw
        ctx.strokeRect(bx, y0, bw, size)
      }

      // the remaining gap, pulsing coral outline
      const pulse = 0.6 + 0.4 * Math.sin(st.time * 4)
      ctx.globalAlpha = vSq * pulse
      ctx.strokeStyle = C.coral
      ctx.lineWidth = 2 / zoom
      ctx.strokeRect(x0 + (1 - gap) * size, y0, gap * size, size)
      ctx.globalAlpha = vSq

      // width labels for the first bars (only while not zoomed)
      if (zoom < 2.5) {
        ctx.font = `600 ${13}px ${MONO}`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'bottom'
        ctx.fillStyle = C.dim
        const nLabels = Math.min(n, 6)
        for (let j = 1; j <= nLabels; j++) {
          const bx = x0 + (1 - Math.pow(2, -(j - 1))) * size
          const bw = Math.pow(2, -j) * size
          ctx.fillText(`1/${Math.pow(2, j)}`, bx + bw / 2, y0 - 8)
        }
      }

      // axis ticks 0 and 1 below the square
      ctx.font = `600 ${13}px ${MONO}`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      ctx.fillStyle = C.faint
      if (zoom < 2.5) {
        ctx.fillText('0', x0, y0 + size + 10)
        ctx.fillText('1', x0 + size, y0 + size + 10)
      } else {
        ctx.fillText(`×${zoom >= 1000 ? Math.pow(2, Math.round(Math.log2(zoom))).toLocaleString('vi') : Math.round(zoom)}`, focusX - 60 / zoom < x0 ? x0 + 40 : focusX - 60, y0 + size + 10)
      }
      ctx.restore()

      const sn = 1 - gap
      drawHud(
        ctx,
        W - 218,
        14,
        200,
        [
          `n      = ${n}`,
          `Sₙ     = ${sn.toFixed(12)}`,
          `1 − Sₙ = ${gap.toExponential(3)}`,
          step === 1 ? `phóng  = ×${Math.round(zoom).toLocaleString('vi')}` : '',
        ].filter(Boolean),
        step === 0 ? C.curve : C.teal,
      )
    }

    /* ---------------- function limit (steps 2–3) ---------------- */
    if (vFn > 0.02) {
      const a = vFn
      const p = new PlaneView(
        st,
        { x: W * 0.08, y: 10, w: W * 0.84, h: H - 20 },
        { x: [-1.6, 3.6], y: [-0.6, 4.6] },
      )
      p.grid()
      p.axes('x', 'y')
      const g = (x: number) => x + 1

      // ε band around L=2
      if (vEps > 0.03) {
        const eps = lerp(0.45, 0.04, easeInOutSine(ph))
        const ctx2 = st.ctx!
        ctx2.save()
        ctx2.globalAlpha = vEps * a * 0.13
        ctx2.fillStyle = C.gold
        ctx2.fillRect(p.rect.x, p.sy(2 + eps), p.rect.w, p.sy(2 - eps) - p.sy(2 + eps))
        ctx2.restore()
        p.hline(2 + eps, { color: C.gold, width: 1, dash: [4, 5], alpha: vEps * a * 0.8 })
        p.hline(2 - eps, { color: C.gold, width: 1, dash: [4, 5], alpha: vEps * a * 0.8 })
        p.text(p.rect.x + 10, p.sy(2 + eps) - 6, `L + ε  (ε = ${eps.toFixed(3)})`, {
          color: C.gold, size: 12, mono: true,
        })
        p.text(p.rect.x + 10, p.sy(2 - eps) + 16, `L − ε`, {
          color: C.gold, size: 12, mono: true,
        })
      }

      // the line y = x+1 with a hole at x = 1
      p.curve((x) => (Math.abs(x - 1) < 0.001 ? NaN : g(x)), {
        color: C.curve, width: 3, alpha: a,
      })
      // hole marker
      p.point(1, 2, { color: C.bg, r: 6 })
      st.ctx!.save()
      st.ctx!.globalAlpha = a
      st.ctx!.strokeStyle = C.coral
      st.ctx!.lineWidth = 2
      st.ctx!.beginPath()
      st.ctx!.arc(p.sx(1), p.sy(2), 6, 0, Math.PI * 2)
      st.ctx!.stroke()
      st.ctx!.restore()

      // two dots approaching from both sides
      const d = lerp(0.9, 0.015, easeInOutCubic(ph))
      const xl = 1 - d
      const xr = 1 + d
      p.point(xl, g(xl), { color: C.mint, halo: true })
      p.point(xr, g(xr), { color: C.violet, halo: true })
      p.vline(xl, { color: C.mint, width: 1, dash: [3, 5], alpha: 0.5 * a })
      p.vline(xr, { color: C.violet, width: 1, dash: [3, 5], alpha: 0.5 * a })

      p.hud(
        'tr',
        [
          `x trái  = ${xl.toFixed(4)} → f = ${g(xl).toFixed(4)}`,
          `x phải = ${xr.toFixed(4)} → f = ${g(xr).toFixed(4)}`,
          `lim x→1 f(x) = 2`,
        ],
        { color: C.ink, width: 235 },
      )

      p.text(p.sx(1) + 12, p.sy(2) - 14, 'khoảng trống tại x = 1', {
        color: C.coral, size: 12, mono: true, bg: 'rgba(12,16,34,0.85)',
      })
    }

    /* ---------------- recap (step 4) ---------------- */
    if (vRc > 0.02) {
      const a = vRc
      const half = (W - 30) / 2
      const p1 = new PlaneView(st, { x: 14, y: 10, w: half, h: H - 20 }, {
        x: [-0.8, 4.6],
        y: [-0.9, 5.7],
      })
      const p2 = new PlaneView(st, { x: 14 + half + 16, y: 10, w: half, h: H - 20 }, {
        x: [-0.4, 6.4],
        y: [-0.55, 3.8],
      })

      // left: h → 0 (derivative)
      p1.grid()
      p1.axes('x', 'y')
      const f1 = (x: number) => (x * x) / 4
      p1.curve(f1, { color: C.curve, width: 3, alpha: a })
      const axv = 1.6
      const h = lerp(1.9, 0.02, easeInOutCubic(ph))
      const slope = (f1(axv + h) - f1(axv)) / h
      p1.ray(axv, f1(axv), slope, { color: C.violet, width: 2, dash: [8, 7], alpha: a })
      p1.point(axv, f1(axv), { color: C.gold })
      p1.point(axv + h, f1(axv + h), { color: C.coral })
      p1.hud('tr', [`Δx = ${h.toFixed(3)}`, `độ dốc = ${slope.toFixed(3)}`], {
        color: C.violet, width: 170,
      })
      p1.text(p1.rect.x + 10, p1.rect.y + p1.rect.h - 16, 'Δx → 0 ⇒ đạo hàm', {
        color: C.dim, size: 12, mono: true,
      })

      // right: n → ∞ (integral)
      p2.grid()
      p2.axes('x', 'y')
      const f2 = (x: number) => 1 + 0.9 * Math.sin(1.2 * x) + x / 5
      p2.curve(f2, { color: C.curve, width: 3, alpha: a })
      const n = Math.round(Math.exp(lerp(Math.log(2), Math.log(120), easeInOutSine(ph))))
      p2.riemann(f2, 1, 5, n, 'midpoint', {
        fill: C.teal, alpha: 0.3, stroke: C.teal, strokeAlpha: 0.5,
      })
      p2.hud('tr', [`n = ${n}`, `Δx → 0 ⇒ tích phân`], { color: C.teal, width: 190 })
    }
  }

  return <SceneCanvas draw={draw} />
}
