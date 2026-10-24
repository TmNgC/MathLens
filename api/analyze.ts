import { chatJSON, json, llmConfig } from './_lib/llm.ts'

/**
 * POST /api/analyze  { score, count, totalMs, answers: [{skillTag, correct, ms}] }
 * → { overall, strengths[], weaknesses[], advice[] }
 */

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405)

  const cfg = llmConfig()
  if (!cfg) {
    return json({ error: 'no_api_key', hint: 'Đặt LLM_API_KEY để bật phân tích bằng AI.' }, 501)
  }

  let body: {
    score?: number
    count?: number
    totalMs?: number
    answers?: Array<{ skillTag?: string; correct?: boolean; ms?: number }>
  }
  try {
    body = await req.json()
  } catch {
    return json({ error: 'invalid JSON body' }, 400)
  }

  const answers = Array.isArray(body.answers) ? body.answers : []
  if (answers.length === 0) return json({ error: 'no answers' }, 400)

  const summary = answers
    .map(
      (a, i) =>
        `Câu ${i + 1}: kỹ năng "${a.skillTag ?? '?'}" — ${a.correct ? 'đúng' : 'SAI'}, ${((a.ms ?? 0) / 1000).toFixed(1)}s`,
    )
    .join('\n')
  const score = Number(body.score) || 0
  const count = Number(body.count) || answers.length
  const totalS = ((Number(body.totalMs) || 0) / 1000).toFixed(0)

  try {
    const out = await chatJSON(
      cfg,
      [
        {
          role: 'system',
          content:
            'Bạn là cố vấn học tập môn Toán THPT Việt Nam. Phân tích kết quả bài trắc nghiệm của học sinh: ấm áp, cụ thể, khích lệ nhưng thẳng thắn. LUÔN trả về một JSON object duy nhất.',
        },
        {
          role: 'user',
          content: `Kết quả: ${score}/${count} câu đúng, tổng thời gian ${totalS}s.

Chi tiết từng câu:
${summary}

Hãy phân tích và trả về JSON đúng dạng:
{"overall":"nhận xét tổng quan 2-3 câu, nhắc đúng/sai ratio và tốc độ","strengths":["kỹ năng chắc tay, dựa trên dữ liệu"],"weaknesses":["kỹ năng yếu hoặc chậm, kèm số liệu"],"advice":["2-4 việc cụ thể nên làm, ví dụ xem lại bài nào"]}

Các bài học trên web: gioi-han (Giới hạn), dao-ham (Đạo hàm), tich-phan (Tích phân), khoi-tron-xoay (Khối tròn xoay), thiet-dien (Thiết diện). Mỗi bài có phần "Trực quan" và "Lý thuyết".`,
        },
      ],
      { temperature: 0.7, maxTokens: 1200 },
    )

    const strs = (v: unknown) => (Array.isArray(v) ? v.map(String).slice(0, 6) : [])
    return json({
      overall: String(out.overall ?? ''),
      strengths: strs(out.strengths),
      weaknesses: strs(out.weaknesses),
      advice: strs(out.advice),
    })
  } catch (e) {
    return json({ error: 'llm_error', detail: String((e as Error).message).slice(0, 300) }, 502)
  }
}
