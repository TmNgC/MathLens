import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import type { Lesson, LessonClock } from '../content/types'
import { LessonChips, LessonRail } from './LessonRail'
import { ScrubBar } from './ScrubBar'
import { Formula } from './Formula'
import { markDone } from '../lib/progress'

export const LessonClockContext = createContext<LessonClock | null>(null)

/** Scenes read the animation clock from context inside their draw loop. */
export const useLessonClock = (): LessonClock => {
  const clock = useContext(LessonClockContext)
  if (!clock) throw new Error('useLessonClock must be used inside LessonShell')
  return clock
}

/**
 * LessonShell — persistent stage + narrative steps + animation clock.
 * Owns: current step, looping playhead (0..1 per step), pause state,
 * keyboard navigation, and progress marking.
 */
export function LessonShell({ lesson }: { lesson: Lesson }) {
  const [step, setStep] = useState(0)
  const [paused, setPaused] = useState(
    () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false,
  )
  const playheadRef = useRef(0)
  const pausedRef = useRef(paused)
  pausedRef.current = paused
  const stepRef = useRef(step)
  stepRef.current = step
  const navigate = useNavigate()

  const lastStep = lesson.steps.length - 1
  const clock = useMemo<LessonClock>(
    () => ({ step, playheadRef, pausedRef }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [step],
  )

  // advance the playhead every frame while playing
  useEffect(() => {
    let raf = 0
    let last = performance.now()
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (!pausedRef.current) {
        const dur = lesson.steps[stepRef.current]?.duration ?? 6
        playheadRef.current = (playheadRef.current + dt / dur) % 1
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [lesson])

  const go = (delta: number) => {
    const next = Math.min(lastStep, Math.max(0, step + delta))
    if (next !== step) {
      setStep(next)
      playheadRef.current = 0
    }
  }

  // reaching the final step completes the lesson
  useEffect(() => {
    if (step === lastStep) markDone(lesson.id)
  }, [step, lastStep, lesson.id])

  // keyboard: ← → change step, Space toggles pause
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t?.closest?.('input, textarea, math-field, [contenteditable]')) return
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
      } else if (e.key === ' ') {
        e.preventDefault()
        setPaused((p) => !p)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const current = lesson.steps[step]

  // Lab lessons have no narrative steps — the scene is a self-contained playground.
  if (lesson.kind === 'lab') {
    return (
      <div className="flex h-full flex-col md:flex-row">
        <LessonRail activeId={lesson.id} />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <LessonChips activeId={lesson.id} />
          <div className="relative min-h-0 flex-1 bg-bg">
            <lesson.Scene step={0} />
            <div className="pointer-events-none absolute left-4 top-3 md:left-6 md:top-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">
                Phòng thí nghiệm
              </p>
              <h1 className="text-lg font-bold md:text-xl">{lesson.title}</h1>
            </div>
          </div>
          <footer className="border-t border-edge bg-bg-soft/95 px-4 py-2.5 md:px-6">
            <p className="mx-auto max-w-5xl text-center text-[12px] text-faint">
              Nhập hàm số bất kỳ · kéo điểm vàng để di chuyển · bật/tắt các lớp hiển
              thị phía dưới — toán học là của bạn, hãy nghịch phá!
            </p>
          </footer>
        </div>
      </div>
    )
  }

  return (
    <LessonClockContext.Provider value={clock}>
      <div className="flex h-full flex-col md:flex-row">
        <LessonRail activeId={lesson.id} />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <LessonChips activeId={lesson.id} />

          {/* stage — the scene owns its canvas here */}
          <div className="relative min-h-0 flex-1 bg-bg">
            <lesson.Scene step={step} />
            <div className="pointer-events-none absolute left-4 top-3 md:left-6 md:top-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">
                Bài {lesson.number}
              </p>
              <h1 className="text-lg font-bold md:text-xl">{lesson.title}</h1>
            </div>
            {step === lastStep && (
              <button
                onClick={() => navigate('/')}
                className="absolute right-4 top-4 rounded-full border border-mint/40 bg-mint/10 px-3.5 py-1.5 text-[12px] font-semibold text-mint transition-colors hover:bg-mint/20 md:right-6 md:top-5"
              >
                ✓ Hoàn thành — về trang chủ
              </button>
            )}
          </div>

          {/* narrative step card */}
          <footer className="border-t border-edge bg-bg-soft/95 px-4 py-3.5 md:px-6">
            <div className="mx-auto max-w-5xl">
              <div className="mb-2.5 flex items-center gap-3">
                <div className="flex items-center gap-1.5" role="tablist" aria-label="Các bước">
                  {lesson.steps.map((s, i) => (
                    <button
                      key={i}
                      role="tab"
                      aria-selected={i === step}
                      aria-label={`Bước ${i + 1}: ${s.title.replace(/\$(.+?)\$/g, '$1')}`}
                      onClick={() => {
                        setStep(i)
                        playheadRef.current = 0
                      }}
                      className={`h-1.5 rounded-full transition-all ${
                        i === step ? 'w-7 bg-curve' : i < step ? 'w-3 bg-curve/40' : 'w-3 bg-edge'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-faint">
                  Bước {step + 1}/{lesson.steps.length}
                </p>
              </div>

              <div key={step} className="rise">
                <h2 className="text-[15px] font-bold text-ink">{current.title}</h2>
                <p className="mt-1 max-w-3xl text-[13.5px] leading-relaxed text-dim">
                  <Formula text={current.body} />
                </p>
              </div>

              <div className="mt-3 max-w-xl">
                <ScrubBar
                  playheadRef={playheadRef}
                  paused={paused}
                  onTogglePause={() => setPaused((p) => !p)}
                  onStep={go}
                />
              </div>
            </div>
          </footer>
        </div>
      </div>
    </LessonClockContext.Provider>
  )
}
