import type { Lesson } from './types'
import { lazy, Suspense } from 'react'
import { limitsLesson } from './gioi-han'
import { advancedLimitsLesson } from './gioi-han-nang-cao'
import { derivativeLesson } from './dao-ham'
import { derivativeRulesLesson } from './quy-tac-dao-ham'
import { integralLesson } from './tich-phan'
import { revolutionLesson } from './khoi-tron-xoay'
import { crossSectionLesson } from './thiet-dien'
import { mathPhysicsLesson } from './toan-ly'
import { preCalculusLesson } from './tien-giai-tich'

/** Graph Lab pulls in MathLive + mathjs — load it only when opened. */
const LabScene = lazy(() => import('../lessons/GraphLab'))

const labLesson: Lesson = {
  id: 'lab',
  number: 9,
  title: 'Phòng thí nghiệm',
  subtitle: 'Tự vẽ đồ thị, tự khám phá',
  kind: 'lab',
  accent: '#45e0ff',
  glyph: 'λ',
  steps: [
    {
      title: 'Sân chơi của riêng bạn',
      body: 'Nhập hàm số bất kỳ, kéo điểm, bật/tắt các lớp hiển thị.',
    },
  ],
  Scene: (props) => (
    <Suspense fallback={<div className="absolute inset-0 grid place-items-center text-dim">đang tải…</div>}>
      <LabScene {...props} />
    </Suspense>
  ),
}

/** The lesson program, in intended learning order. */
export const lessons: Lesson[] = [
  preCalculusLesson, // 1
  limitsLesson, // 2
  advancedLimitsLesson, // 3
  derivativeLesson, // 4
  derivativeRulesLesson, // 5
  integralLesson, // 6
  revolutionLesson, // 7
  crossSectionLesson, // 8
  labLesson, // 9
  mathPhysicsLesson, // 10
]

export function lessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id)
}
