import { Link, NavLink } from 'react-router-dom'
import { useSyncExternalStore } from 'react'
import { lessons } from '../content'
import { getProgress, subscribe } from '../lib/progress'

/** Left chapter rail (tablet/desktop). */
export function LessonRail({ activeId }: { activeId?: string }) {
  const progress = useSyncExternalStore(subscribe, getProgress)
  const done = lessons.filter((l) => progress[l.id]).length

  return (
    <nav className="hidden h-full w-64 shrink-0 flex-col border-r border-edge bg-bg-soft md:flex">
      <Link
        to="/"
        className="flex items-center gap-2.5 px-5 pb-5 pt-6 transition-colors hover:bg-panel"
      >
        <span className="grid size-9 place-items-center rounded-xl bg-curve/15 text-lg text-curve">
          ∫
        </span>
        <span>
          <span className="block text-[15px] font-bold tracking-wide">MathLens</span>
          <span className="block text-[11px] text-dim">Giải tích thị giác</span>
        </span>
      </Link>

      <div className="px-5 pb-4">
        <div className="h-1 overflow-hidden rounded-full bg-edge">
          <div
            className="h-full rounded-full bg-gradient-to-r from-curve to-teal transition-all duration-500"
            style={{ width: `${(done / lessons.length) * 100}%` }}
          />
        </div>
        <p className="mt-1.5 text-[11px] text-faint">
          {done}/{lessons.length} bài hoàn thành
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4">
        {lessons.map((l) => (
          <NavLink
            key={l.id}
            to={`/lesson/${l.id}`}
            className={({ isActive }) =>
              `group mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                isActive ? 'bg-panel text-ink' : 'text-dim hover:bg-panel/60 hover:text-ink'
              }`
            }
          >
            <span
              className="grid size-8 shrink-0 place-items-center rounded-lg text-[15px] font-semibold"
              style={{
                background: `${l.accent}1f`,
                color: l.accent,
                outline: activeId === l.id ? `1.5px solid ${l.accent}55` : 'none',
              }}
            >
              {l.glyph}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-semibold">{l.title}</span>
              <span className="block truncate text-[11px] text-faint">{l.subtitle}</span>
            </span>
            {progress[l.id] && (
              <svg viewBox="0 0 16 16" className="size-4 shrink-0 text-mint" aria-label="hoàn thành">
                <path
                  fill="currentColor"
                  d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM6.8 11.6 3.5 8.3l1.2-1.2 2.1 2.1 4.5-4.5 1.2 1.2-5.7 5.7Z"
                />
              </svg>
            )}
          </NavLink>
        ))}
      </div>

      <p className="border-t border-edge px-5 py-3 text-[10.5px] leading-relaxed text-faint">
        Làm cho học sinh Việt Nam <em>nhìn thấy</em> toán học.
      </p>
    </nav>
  )
}

/** Horizontal chapter chips (mobile). */
export function LessonChips({ activeId }: { activeId?: string }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto border-b border-edge bg-bg-soft px-3 py-2 md:hidden">
      <Link
        to="/"
        className="grid size-8 shrink-0 place-items-center rounded-lg bg-curve/15 text-sm font-bold text-curve"
      >
        ∫
      </Link>
      {lessons.map((l) => (
        <NavLink
          key={l.id}
          to={`/lesson/${l.id}`}
          className={({ isActive }) =>
            `flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
              isActive ? 'text-ink' : 'text-dim'
            }`
          }
          style={({ isActive }: { isActive: boolean }) => ({
            background: isActive ? `${l.accent}26` : 'transparent',
            outline: activeId === l.id && !isActive ? `1px solid ${l.accent}44` : 'none',
          })}
        >
          <span style={{ color: l.accent }}>{l.glyph}</span>
          {l.title}
        </NavLink>
      ))}
    </div>
  )
}
