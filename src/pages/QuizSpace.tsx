import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { lessons, lessonById } from '../content'
import { Formula } from '../components/Formula'
import { LessonChips, LessonRail } from '../components/LessonRail'
import { getAttempts, saveAttempt } from '../quiz/store'
import { FALLBACK_BANK } from '../quiz/fallback'
import type { AnswerRecord, QuizAnalysis, QuizQuestion } from '../quiz/types'

type Phase = 'setup' | 'loading' | 'quiz' | 'results'

const quizLessons = lessons.filter((l) => l.id !== 'lab')
const COUNTS = [6, 10, 15]

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const fmtMs = (ms: number) => {
  const s = Math.round(ms / 1000)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

export function QuizSpace() {
  const [phase, setPhase] = useState<Phase>('setup')
  const [selected, setSelected] = useState<string[]>(quizLessons.map((l) => l.id))
  const [count, setCount] = useState(10)
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [offline, setOffline] = useState(false)
  const [qIndex, setQIndex] = useState(0)
  const [answers, setAnswers] = useState<AnswerRecord[]>([])
  const [chosen, setChosen] = useState<number | null>(null)
  const [qStart, setQStart] = useState(0)
  const quizStart = useRef(0)
  const [elapsed, setElapsed] = useState(0)
  const [analysis, setAnalysis] = useState<QuizAnalysis | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const savedRef = useRef(false)

  // live timer during the quiz
  useEffect(() => {
    if (phase !== 'quiz') return
    const t = setInterval(() => setElapsed(Date.now() - quizStart.current), 200)
    return () => clearInterval(t)
  }, [phase])

  // keyboard: 1–4 answer, Enter continue
  useEffect(() => {
    if (phase !== 'quiz') return
    const onKey = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '4') answer(Number(e.key) - 1)
      if (e.key === 'Enter' && chosen !== null) next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  async function startQuiz() {
    setPhase('loading')
    setAnalysis(null)
    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonIds: selected, count }),
      })
      if (!res.ok) throw new Error(`status ${res.status}`)
      const data = await res.json()
      if (!Array.isArray(data.questions) || data.questions.length === 0) throw new Error('empty')
      setQuestions(data.questions)
      setOffline(false)
    } catch {
      const pool = FALLBACK_BANK.filter((q) => selected.includes(q.lessonId))
      setQuestions(shuffle(pool).slice(0, Math.min(count, pool.length)))
      setOffline(true)
    }
    setPhase('quiz')
    setQIndex(0)
    setAnswers([])
    setChosen(null)
    savedRef.current = false
    const now = Date.now()
    quizStart.current = now
    setQStart(now)
  }

  function answer(i: number) {
    if (chosen !== null || !questions[qIndex]) return
    const q = questions[qIndex]
    setChosen(i)
    setAnswers((a) => [
      ...a,
      { questionId: q.id, skillTag: q.skillTag, chosen: i, correct: i === q.correctIndex, ms: Date.now() - qStart },
    ])
  }

  function next() {
    if (qIndex + 1 >= questions.length) {
      setPhase('results')
      return
    }
    setQIndex((i) => i + 1)
    setChosen(null)
    setQStart(Date.now())
  }

  const score = answers.filter((a) => a.correct).length
  const totalMs = answers.reduce((s, a) => s + a.ms, 0)

  // persist the attempt once when results open
  useEffect(() => {
    if (phase !== 'results' || savedRef.current || questions.length === 0) return
    savedRef.current = true
    const weak = skillStats(answers)
      .filter((s) => s.correct < s.total)
      .map((s) => s.tag)
    saveAttempt({
      date: Date.now(),
      lessonIds: selected,
      score,
      count: questions.length,
      totalMs,
      weakSkills: weak,
    })
  }, [phase, answers, questions, score, totalMs, selected])

  async function runAnalysis() {
    setAnalyzing(true)
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          score,
          count: questions.length,
          totalMs,
          answers: answers.map((a) => ({ skillTag: a.skillTag, correct: a.correct, ms: a.ms })),
        }),
      })
      if (!res.ok) throw new Error(`status ${res.status}`)
      setAnalysis((await res.json()) as QuizAnalysis)
    } catch {
      setAnalysis(localAnalysis(answers, questions))
    }
    setAnalyzing(false)
  }

  return (
    <div className="flex h-full flex-col md:flex-row">
      <LessonRail />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <LessonChips />
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl px-5 pb-20 pt-8 md:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
              Ôn tập có tính giờ
            </p>
            <h1 className="mt-1 text-2xl font-extrabold">
              Kiểm tra <span className="text-curve">kiến thức</span>
            </h1>

            {phase === 'setup' && (
              <SetupScreen
                selected={selected}
                setSelected={setSelected}
                count={count}
                setCount={setCount}
                onStart={startQuiz}
              />
            )}
            {phase === 'loading' && <LoadingScreen />}
            {phase === 'quiz' && (
              <QuizScreen
                questions={questions}
                qIndex={qIndex}
                chosen={chosen}
                answers={answers}
                elapsed={elapsed}
                offline={offline}
                onAnswer={answer}
                onNext={next}
              />
            )}
            {phase === 'results' && (
              <ResultsScreen
                questions={questions}
                answers={answers}
                elapsed={totalMs}
                offline={offline}
                analysis={analysis}
                analyzing={analyzing}
                onAnalyze={runAnalysis}
                onRestart={() => setPhase('setup')}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------ setup ------------------------------ */

function SetupScreen({
  selected,
  setSelected,
  count,
  setCount,
  onStart,
}: {
  selected: string[]
  setSelected: (v: string[]) => void
  count: number
  setCount: (v: number) => void
  onStart: () => void
}) {
  const attempts = getAttempts()
  const all = selected.length === quizLessons.length

  return (
    <>
      <div className="mt-6 rounded-2xl border border-edge bg-panel p-5">
        <p className="mb-2 text-[13px] font-bold">Chọn phạm vi</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelected(all ? [] : quizLessons.map((l) => l.id))}
            className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors ${
              all ? 'bg-curve/20 text-curve' : 'bg-panel-2 text-dim hover:text-ink'
            }`}
          >
            ✦ Tất cả
          </button>
          {quizLessons.map((l) => {
            const on = selected.includes(l.id)
            return (
              <button
                key={l.id}
                onClick={() =>
                  setSelected(on ? selected.filter((x) => x !== l.id) : [...selected, l.id])
                }
                className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors ${
                  on ? 'text-ink' : 'bg-panel-2 text-dim hover:text-ink'
                }`}
                style={on ? { background: `${l.accent}26`, color: l.accent } : undefined}
              >
                {l.glyph} {l.title}
              </button>
            )
          })}
        </div>

        <p className="mb-2 mt-5 text-[13px] font-bold">Số câu hỏi</p>
        <div className="flex gap-2">
          {COUNTS.map((c) => (
            <button
              key={c}
              onClick={() => setCount(c)}
              className={`rounded-xl px-4 py-2 text-[13px] font-bold transition-colors ${
                count === c ? 'bg-curve/20 text-curve' : 'bg-panel-2 text-dim hover:text-ink'
              }`}
            >
              {c} câu
            </button>
          ))}
        </div>

        <button
          onClick={onStart}
          disabled={selected.length === 0}
          className="mt-6 w-full rounded-xl bg-curve py-3 text-[14px] font-bold text-[#08101c] transition-transform hover:scale-[1.01] disabled:opacity-40"
        >
          ⚡ Bắt đầu — AI soạn câu hỏi riêng cho bạn
        </button>
        <p className="mt-2.5 text-center text-[11px] leading-relaxed text-faint">
          Mỗi câu đều bấm giờ riêng · không có API key thì tự dùng ngân hàng câu hỏi offline
        </p>
      </div>

      {attempts.length > 0 && (
        <div className="mt-5 rounded-2xl border border-edge bg-panel p-5">
          <p className="mb-3 text-[13px] font-bold">Lần làm gần nhất</p>
          <div className="space-y-2">
            {attempts.slice(0, 5).map((a, i) => (
              <div key={i} className="flex items-center gap-3 text-[12.5px]">
                <span className="font-mono text-faint">{new Date(a.date).toLocaleDateString('vi')}</span>
                <span className="min-w-0 flex-1 truncate text-dim">
                  {a.lessonIds.length > 1
                    ? 'trộn tất cả'
                    : (lessonById(a.lessonIds[0])?.title ?? a.lessonIds[0])}
                </span>
                <span className="font-mono font-bold" style={{ color: a.score / a.count >= 0.7 ? '#97e3a2' : a.score / a.count >= 0.4 ? '#ffd35c' : '#ff8b8b' }}>
                  {a.score}/{a.count}
                </span>
                <span className="font-mono text-faint">{fmtMs(a.totalMs)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

/* ----------------------------- loading ----------------------------- */

function LoadingScreen() {
  return (
    <div className="mt-10 grid place-items-center gap-4 rounded-2xl border border-edge bg-panel py-16">
      <div className="size-10 animate-spin rounded-full border-[3px] border-edge border-t-curve" />
      <p className="text-[13.5px] font-semibold text-dim">AI đang soạn câu hỏi…</p>
      <p className="text-[11.5px] text-faint">vài giây thôi — mỗi lần là một bộ câu mới</p>
    </div>
  )
}

/* ------------------------------ quiz ------------------------------- */

function QuizScreen({
  questions,
  qIndex,
  chosen,
  answers,
  elapsed,
  offline,
  onAnswer,
  onNext,
}: {
  questions: QuizQuestion[]
  qIndex: number
  chosen: number | null
  answers: AnswerRecord[]
  elapsed: number
  offline: boolean
  onAnswer: (i: number) => void
  onNext: () => void
}) {
  const q = questions[qIndex]
  if (!q) return null
  const answered = chosen !== null

  return (
    <>
      <div className="mt-6 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-edge">
          <div
            className="h-full rounded-full bg-gradient-to-r from-curve to-teal transition-all duration-300"
            style={{ width: `${((qIndex + (answered ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>
        <span className="font-mono text-[12.5px] text-dim">
          {qIndex + 1}/{questions.length}
        </span>
        <span className="rounded-full bg-panel-2 px-3 py-1 font-mono text-[12.5px] font-bold text-gold">
          ⏱ {fmtMs(elapsed)}
        </span>
        {offline && (
          <span className="rounded-full bg-panel-2 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide text-faint">
            offline
          </span>
        )}
      </div>

      <div key={q.id} className="rise mt-4 rounded-2xl border border-edge bg-panel p-5 md:p-6">
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded-full bg-violet/15 px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-violet">
            {lessonById(q.lessonId)?.title ?? q.lessonId}
          </span>
          <span className="text-[11px] text-faint">{q.skillTag}</span>
        </div>
        <h2 className="text-[16px] font-semibold leading-relaxed">
          <Formula text={q.question} />
        </h2>

        <div className="mt-4 space-y-2.5">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correctIndex
            const isChosen = i === chosen
            let cls = 'border-edge bg-panel-2 hover:border-curve/50 text-ink'
            if (answered) {
              if (isCorrect) cls = 'border-mint/70 bg-mint/15 text-mint'
              else if (isChosen) cls = 'border-coral/70 bg-coral/15 text-coral'
              else cls = 'border-edge bg-panel-2 text-faint'
            }
            return (
              <button
                key={i}
                onClick={() => onAnswer(i)}
                disabled={answered}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-[14px] font-medium transition-colors ${cls}`}
              >
                <span className="grid size-6 shrink-0 place-items-center rounded-md bg-bg/60 font-mono text-[12px] font-bold">
                  {answered && isCorrect ? '✓' : answered && isChosen ? '✕' : String.fromCharCode(65 + i)}
                </span>
                <Formula text={opt} />
              </button>
            )
          })}
        </div>

        {answered && (
          <div className="rise mt-4 rounded-xl border border-edge bg-bg-soft p-4">
            <p className="text-[12px] font-bold uppercase tracking-wide text-dim">Giải thích</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-dim">
              <Formula text={q.explanation} />
            </p>
            <button
              onClick={onNext}
              className="mt-3.5 rounded-full bg-curve px-5 py-2 text-[13px] font-bold text-[#08101c] transition-transform hover:scale-[1.02]"
            >
              {qIndex + 1 >= questions.length ? 'Xem kết quả →' : 'Câu tiếp theo →'}{' '}
              <span className="opacity-60">(Enter)</span>
            </button>
          </div>
        )}
        {!answered && (
          <p className="mt-3 text-[11px] text-faint">nhấn 1–4 để chọn nhanh · thời gian mỗi câu đang được ghi lại</p>
        )}
        <span className="hidden">{answers.length}</span>
      </div>
    </>
  )
}

/* ----------------------------- results ----------------------------- */

function skillStats(answers: AnswerRecord[]) {
  const map = new Map<string, { tag: string; correct: number; total: number; ms: number }>()
  for (const a of answers) {
    const s = map.get(a.skillTag) ?? { tag: a.skillTag, correct: 0, total: 0, ms: 0 }
    s.total++
    if (a.correct) s.correct++
    s.ms += a.ms
    map.set(a.skillTag, s)
  }
  return [...map.values()].sort((a, b) => a.correct / a.total - b.correct / b.total)
}

function ResultsScreen({
  questions,
  answers,
  elapsed,
  offline,
  analysis,
  analyzing,
  onAnalyze,
  onRestart,
}: {
  questions: QuizQuestion[]
  answers: AnswerRecord[]
  elapsed: number
  offline: boolean
  analysis: QuizAnalysis | null
  analyzing: boolean
  onAnalyze: () => void
  onRestart: () => void
}) {
  const score = answers.filter((a) => a.correct).length
  const pct = answers.length ? score / answers.length : 0
  const avg = answers.length ? elapsed / answers.length : 0
  const skills = skillStats(answers)
  const wrong = answers
    .map((a, i) => ({ a, q: questions[i] }))
    .filter((x) => !x.a.correct)
  const fastest = answers.length ? Math.min(...answers.map((a) => a.ms)) : 0
  const slowest = answers.length ? Math.max(...answers.map((a) => a.ms)) : 0
  const ring = 2 * Math.PI * 52

  return (
    <>
      <div className="mt-6 grid gap-4 md:grid-cols-[auto_1fr]">
        <div className="grid place-items-center rounded-2xl border border-edge bg-panel p-6">
          <svg viewBox="0 0 120 120" className="size-32 -rotate-90">
            <circle cx="60" cy="60" r="52" fill="none" stroke="#262f57" strokeWidth="10" />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke={pct >= 0.7 ? '#97e3a2' : pct >= 0.4 ? '#ffd35c' : '#ff8b8b'}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={ring}
              strokeDashoffset={ring * (1 - pct)}
              style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.2,0.8,0.2,1)' }}
            />
          </svg>
          <p className="-mt-24 mb-12 text-center">
            <span className="block text-3xl font-extrabold">
              {score}/{answers.length}
            </span>
            <span className="text-[11.5px] text-faint">câu đúng</span>
          </p>
          <p className="font-mono text-[13px] text-gold">⏱ tổng {fmtMs(elapsed)}</p>
        </div>

        <div className="rounded-2xl border border-edge bg-panel p-5">
          <p className="mb-3 text-[13px] font-bold">Theo kỹ năng</p>
          <div className="space-y-3">
            {skills.map((s) => {
              const p = s.correct / s.total
              return (
                <div key={s.tag}>
                  <div className="mb-1 flex justify-between text-[12px]">
                    <span className="font-semibold text-dim">{s.tag}</span>
                    <span className="font-mono text-faint">
                      {s.correct}/{s.total} · {(s.ms / s.total / 1000).toFixed(1)}s/câu
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-edge">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${p * 100}%`,
                        background: p >= 0.7 ? '#97e3a2' : p >= 0.4 ? '#ffd35c' : '#ff8b8b',
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-edge pt-3.5 text-center">
            <Stat label="trung bình" value={`${(avg / 1000).toFixed(1)}s`} />
            <Stat label="nhanh nhất" value={`${(fastest / 1000).toFixed(1)}s`} />
            <Stat label="chậm nhất" value={`${(slowest / 1000).toFixed(1)}s`} />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={onAnalyze}
          disabled={analyzing}
          className="rounded-full bg-violet px-6 py-3 text-[14px] font-bold text-[#140b1f] transition-transform hover:scale-[1.02] disabled:opacity-50"
        >
          {analyzing ? '🤖 đang phân tích…' : '🤖 Phân tích bằng AI'}
        </button>
        <button
          onClick={onRestart}
          className="rounded-full border border-edge bg-panel px-6 py-3 text-[14px] font-bold text-dim transition-colors hover:text-ink"
        >
          Làm lần nữa
        </button>
        {offline && (
          <span className="self-center rounded-full bg-panel-2 px-3 py-1.5 text-[11px] text-faint">
            chế độ offline — phân tích dùng máy nội bộ
          </span>
        )}
      </div>

      {analysis && <AnalysisCard analysis={analysis} />}

      {wrong.length > 0 && (
        <div className="mt-6">
          <p className="mb-3 text-[13px] font-bold">Xem lại câu sai</p>
          <div className="space-y-3">
            {wrong.map(({ a, q }) => (
              <details key={q.id} className="rounded-2xl border border-edge bg-panel">
                <summary className="flex cursor-pointer list-none items-center gap-2.5 px-4 py-3 text-[13.5px] font-semibold text-dim [&::-webkit-details-marker]:hidden">
                  <span className="text-coral">✕</span>
                  <Formula text={q.question} />
                </summary>
                <div className="border-t border-edge px-4 py-3 text-[12.5px] leading-relaxed text-dim">
                  <p>
                    Bạn chọn: <Formula text={q.options[a.chosen]} /> · Đáp án đúng:{' '}
                    <span className="font-semibold text-mint">
                      <Formula text={q.options[q.correctIndex]} />
                    </span>
                  </p>
                  <p className="mt-1.5">
                    <Formula text={q.explanation} />
                  </p>
                  <Link
                    to={`/lesson/${q.lessonId}/theory`}
                    className="mt-2 inline-block font-semibold text-curve hover:underline"
                  >
                    → Xem lý thuyết {lessonById(q.lessonId)?.title}
                  </Link>
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[15px] font-bold text-ink">{value}</p>
      <p className="text-[10.5px] uppercase tracking-wide text-faint">{label}</p>
    </div>
  )
}

function AnalysisCard({ analysis }: { analysis: QuizAnalysis }) {
  return (
    <div className="rise mt-4 rounded-2xl border border-violet/40 bg-violet/[0.07] p-5">
      <p className="flex items-center gap-2 text-[14px] font-bold text-violet">
        🤖 Phân tích của AI
        {analysis.offline && (
          <span className="rounded-full bg-panel-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-faint">
            offline
          </span>
        )}
      </p>
      <p className="mt-2 text-[13.5px] leading-relaxed text-dim">
        <Formula text={analysis.overall} />
      </p>
      {(analysis.strengths.length > 0 || analysis.weaknesses.length > 0) && (
        <div className="mt-3.5 grid gap-3 md:grid-cols-2">
          {analysis.strengths.length > 0 && (
            <div className="rounded-xl border border-mint/25 bg-mint/[0.07] p-3.5">
              <p className="mb-1.5 text-[11.5px] font-bold uppercase tracking-wide text-mint">Điểm mạnh</p>
              <ul className="list-inside list-disc space-y-1 text-[12.5px] leading-relaxed text-dim">
                {analysis.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
          {analysis.weaknesses.length > 0 && (
            <div className="rounded-xl border border-coral/25 bg-coral/[0.07] p-3.5">
              <p className="mb-1.5 text-[11.5px] font-bold uppercase tracking-wide text-coral">Cần cải thiện</p>
              <ul className="list-inside list-disc space-y-1 text-[12.5px] leading-relaxed text-dim">
                {analysis.weaknesses.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {analysis.advice.length > 0 && (
        <div className="mt-3 rounded-xl border border-gold/25 bg-gold/[0.06] p-3.5">
          <p className="mb-1.5 text-[11.5px] font-bold uppercase tracking-wide text-gold">Lộ trình ôn tập</p>
          <ul className="list-inside list-disc space-y-1 text-[12.5px] leading-relaxed text-dim">
            {analysis.advice.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

/* ------------------- offline rule-based analysis ------------------- */

function localAnalysis(answers: AnswerRecord[], questions: QuizQuestion[]): QuizAnalysis {
  const skills = skillStats(answers)
  const score = answers.filter((a) => a.correct).length
  const avg = answers.reduce((s, a) => s + a.ms, 0) / Math.max(1, answers.length)
  const strengths = skills.filter((s) => s.correct === s.total).map((s) => `Kỹ năng "${s.tag}" chắc tay`)
  const weak = skills.filter((s) => s.correct < s.total)
  const weaknesses = weak.map((s) => `"${s.tag}": đúng ${s.correct}/${s.total}`)
  const slowest = answers.reduce((m, a) => (a.ms > m.ms ? a : m), answers[0])
  if (slowest && slowest.ms > avg * 1.5) {
    weaknesses.push(`Chậm ở câu thuộc "${slowest.skillTag}" (${(slowest.ms / 1000).toFixed(1)}s so với ${(avg / 1000).toFixed(1)}s trung bình)`)
  }
  const lessonFor = (tag: string) =>
    questions.find((q) => q.skillTag === tag)?.lessonId
  const advice = weak.slice(0, 3).map((s) => {
    const lid = lessonFor(s.tag)
    const l = lid ? lessonById(lid) : undefined
    return l ? `Xem lại bài ${l.title} (phần Lý thuyết + Trực quan) để khắc phục "${s.tag}"` : `Ôn lại chủ đề "${s.tag}"`
  })
  if (advice.length === 0) advice.push('Tuyệt đối! Thử tăng số câu hoặc phạm vi "Tất cả" để thử thách hơn')
  return {
    overall: `Bạn đúng ${score}/${answers.length} câu trong ${fmtMs(
      answers.reduce((s, a) => s + a.ms, 0),
    )}. ${weak.length === 0 ? 'Không có kỹ năng nào sai — xuất sắc!' : `Các kỹ năng cần chú ý: ${weak.map((w) => w.tag).join(', ')}.`}`,
    strengths,
    weaknesses,
    advice,
    offline: true,
  }
}
