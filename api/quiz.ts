import { chatJSON, json, llmConfig } from './_lib/llm.ts'

/**
 * POST /api/quiz  { lessonIds: string[], count: number, difficulty?: 'easy'|'mixed'|'hard' }
 * → { questions: QuizQuestion[] }   (501 when no LLM_API_KEY configured)
 */

const LESSON_TOPICS: Record<string, string> = {
  'gioi-han':
    'Giới hạn: tính giới hạn dãy hữu tỉ, lim q^n với |q|<1, lim(1+1/n)^n=e, giới hạn hàm số & hai giới hạn một bên, chuỗi hội tụ/phân kỳ (Zeno, chuỗi điều hòa), ý nghĩa epsilon-delta',
  'gioi-han-nang-cao':
    'Giới hạn nâng cao: nguyên lý kẹp, các giới hạn tiêu chuẩn (sinx/x, ln(1+x)/x, (1+a/x)^x→e^a), quy tắc L\'Hôpital (dạng 0/0, ∞/∞ và các bẫy), khai triển Taylor, tiêu chuẩn Weierstrass cho dãy truy hồi u_{n+1}=f(u_n), định lý Stolz–Cesàro',
  'dao-ham':
    'Đạo hàm: định nghĩa bằng giới hạn của tỉ số hiệu, bảng đạo hàm cơ bản, ý nghĩa đơn điệu, điều kiện cực trị, phương trình tiếp tuyến',
  'quy-tac-dao-ham':
    'Quy tắc tính đạo hàm: quy tắc tổng hiệu (u±v)\', quy tắc tích (uv)\'=u\'v+uv\', quy tắc thương (u/v)\', hệ quả (1/u)\', quy tắc chuỗi (f(g(x)))\'=f\'(g)·g\' với ví dụ hàm hợp như sin(3x), √(x²+1), (x³-x+1)^5',
  'tich-phan':
    'Tích phân: nguyên hàm cơ bản, định lý cơ bản của giải tích ∫=F(b)−F(a), diện tích có dấu khi f đổi dấu, tổng Riemann, ứng dụng vận tốc–quãng đường',
  'khoi-tron-xoay':
    'Khối tròn xoay: thể tích V=π∫f²(x)dx khi quay quanh Ox, π∫φ²(y)dy khi quay quanh Oy, phương pháp đĩa, bài toán vòng xuyến R²−r²',
  'thiet-dien':
    'Thiết diện: công thức V=∫S(x)dx, nguyên lý Cavalieri (hai khối cùng diện tích thiết diện thì cùng thể tích), thể tích nón ⅓πR²H và khối cầu 4/3πR³ qua tích phân',
}

interface GenQuestion {
  lessonId?: string
  skillTag?: string
  question?: string
  options?: unknown
  correctIndex?: number
  explanation?: string
}

function validate(raw: unknown, lessonIds: string[]) {
  const arr = Array.isArray(raw) ? raw : []
  const out = []
  for (let i = 0; i < arr.length; i++) {
    const q = arr[i] as GenQuestion
    const opts = Array.isArray(q.options) ? q.options.map(String) : []
    const ci = Number(q.correctIndex)
    if (
      typeof q.question === 'string' &&
      typeof q.explanation === 'string' &&
      opts.length === 4 &&
      Number.isInteger(ci) &&
      ci >= 0 &&
      ci <= 3 &&
      lessonIds.includes(q.lessonId ?? '')
    ) {
      out.push({
        id: `ai-${Date.now()}-${i}`,
        lessonId: q.lessonId!,
        skillTag: String(q.skillTag ?? 'chung'),
        question: q.question,
        options: opts,
        correctIndex: ci,
        explanation: q.explanation,
      })
    }
  }
  return out
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405)

  const cfg = llmConfig()
  if (!cfg) {
    return json({ error: 'no_api_key', hint: 'Đặt biến môi trường LLM_API_KEY trên Vercel để bật AI.' }, 501)
  }

  let body: { lessonIds?: string[]; count?: number; difficulty?: string }
  try {
    body = await req.json()
  } catch {
    return json({ error: 'invalid JSON body' }, 400)
  }

  const lessonIds = (body.lessonIds ?? []).filter((id) => id in LESSON_TOPICS)
  const count = Math.min(15, Math.max(3, Number(body.count) || 10))
  const difficulty = body.difficulty === 'easy' || body.difficulty === 'hard' ? body.difficulty : 'mixed'
  if (lessonIds.length === 0) return json({ error: 'no valid lessonIds' }, 400)

  const topicList = lessonIds.map((id) => `- ${id}: ${LESSON_TOPICS[id]}`).join('\n')

  try {
    const out = await chatJSON(
      cfg,
      [
        {
          role: 'system',
          content:
            'Bạn là giáo viên Toán THPT Việt Nam nhiều kinh nghiệm ra đề. Bạn soạn câu hỏi trắc nghiệm chính xác về mặt toán học, bám chương trình lớp 11-12, bằng tiếng Việt. Công thức toán viết trong cặp $...$ (LaTeX). LUÔN trả về một JSON object duy nhất, không thêm chữ nào khác.',
        },
        {
          role: 'user',
          content: `Soạn đúng ${count} câu hỏi trắc nghiệm (độ khó: ${difficulty}) về các chủ đề sau:

${topicList}

Yêu cầu:
- Mỗi câu đúng 4 phương án, chỉ một đúng; các phương án sai phải "hấp dẫn" (phản ánh lỗi thường gặp thật).
- skillTag: nhãn kỹ năng ngắn bằng tiếng Việt (2-4 từ, ví dụ "cực trị", "bảng đạo hàm").
- explanation: giải thích ngắn (2-3 câu) vì sao chọn đúng, có công thức khi cần.
- Phân bố câu đều giữa các lessonId được chọn.

Trả về JSON đúng dạng:
{"questions":[{"lessonId":"...","skillTag":"...","question":"... $x^2$ ...","options":["...","...","...","..."],"correctIndex":0,"explanation":"..."}]}`,
        },
      ],
      { temperature: 0.9, maxTokens: 6000 },
    )
    const questions = validate(out.questions, lessonIds)
    if (questions.length === 0) return json({ error: 'generation_failed_validation' }, 502)
    return json({ questions })
  } catch (e) {
    return json({ error: 'llm_error', detail: String((e as Error).message).slice(0, 300) }, 502)
  }
}
