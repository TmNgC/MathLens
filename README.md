# MathLens — Giải tích thị giác

**Nhìn thấy đạo hàm & tích phân bằng hoạt hình.**

MathLens là trang web học toán tương tác dành cho học sinh trung học Việt Nam:
mỗi khái niệm là một hoạt hình mượt mà mà bạn có thể **kéo, tua và nghịch phá** —
trình bày theo phong cách 3Blue1Brown, chứ không chỉ vẽ hình tĩnh như GeoGebra
hay trả lời kết quả như WolframAlpha.

> Bạn có thể *thấy* hình hài của toán học. — tagline của dự án

## Chương trình

| # | Bài | Nội dung |
|---|-----|----------|
| 1 | **Giới hạn** Σ | Zeno ×2¹⁷, dồn dần về 1 trên trục số, giới hạn hàm số, ε-δ, chuỗi Leibniz π, số e & lãi kép, điều hòa vs cấp số nhân — kèm mục "💡 Bạn có biết?" |
| 2 | **Giới hạn nâng cao** ∞ | Lý thuyết chuyên đề: nguyên lý kẹp, công thức thiết yếu, L'Hôpital & các bẫy, khai triển Taylor, Weierstrass & dãy truy hồi, Stolz–Cesàro |
| 3 | **Đạo hàm** ƒ′ | Cát tuyến → tiếp tuyến (kéo được), vẽ hàm phái sinh f′, cực trị |
| 4 | **Quy tắc tính đạo hàm** ⚙ | Lý thuyết: tổng/tích/thương/chuỗi kèm chứng minh, bảng hàm hợp, bài mẫu hai tầng |
| 5 | **Tích phân** ∫ | Riemann (4 phương pháp), diện tích có dấu, hàm tích lũy, định lý cơ bản, vận tốc → quãng đường, nguyên hàm |
| 6 | **Khối tròn xoay** ◉ | 3D: quay φ 0→2π, phương pháp đĩa, lát cắt, V = π∫f² |
| 7 | **Thiết diện** ◫ | 3D: cắt trụ/nón, nguyên lý Cavalieri, bán cầu ⅔πR³ |
| 8 | **Phòng thí nghiệm** λ | Nhập hàm số bất kỳ (MathLive), tiếp tuyến, f′, diện tích |
| 9 | **Từ toán học đến vật lý** Φ | Cầu nối Vật lí 10–11 (GDPT 2018): đạo hàm = tốc độ biến đổi (v, a, I, e, P), tích phân = cộng dồn (độ dời, điện tích, công), dao động điều hòa, Faraday |

Mỗi bài (trừ Lab) có hai tab: **🎬 Trực quan** (hoạt hình từng bước) và
**📖 Lý thuyết** (định nghĩa, bảng ký hiệu, ví dụ mẫu, sai lầm thường gặp —
định dạng đề THPT). Tiến độ lưu tự động trong `localStorage`.

## ⚡ Kiểm tra kiến thức (AI)

`#/quiz` — phòng kiểm tra có chấm bài bằng AI:

- **AI soạn câu hỏi**: chọn bài + số câu, mỗi lần một bộ câu mới (trắc nghiệm
  tiếng Việt, kèm giải thích).
- **Bấm giờ**: thời gian từng câu và tổng thời gian được ghi lại.
- **Phân tích kết quả**: điểm mạnh / điểm yếu theo từng kỹ năng, tốc độ làm
  bài, và lộ trình ôn tập gợi ý (kèm link về đúng phần Lý thuyết cần xem lại).

### Bật AI (biến môi trường trên Vercel)

| Biến | Ý nghĩa |
|------|---------|
| `LLM_API_KEY` | **bắt buộc** — API key của nhà cung cấp |
| `LLM_BASE_URL` | mặc định `https://api.openai.com/v1`; đổi nếu dùng GLM, Groq, Together… (bất kỳ endpoint tương thích OpenAI) |
| `LLM_MODEL` | mặc định `gpt-4o-mini` |

Không có key (hoặc lỗi mạng), quiz tự chuyển sang **ngân hàng câu hỏi offline**
và phân tích bằng bộ máy quy tắc nội bộ — trang vẫn dùng được đầy đủ.

## Công nghệ

- **Vite 8 + React 19 + TypeScript** — SPA với hash-router (deep-link từng bài)
- **Engine 2D tự viết** (`src/engine/`) — Canvas 2D, rAF timeline, scrub bar,
  immediate-mode drag, d3-scale cho hệ trục
- **three.js + react-three-fiber + drei** — các bài 3D (LatheGeometry cho khối
  tròn xoay, instanced meshes cho chồng đĩa)
- **KaTeX** (công thức), **MathLive** (nhập công thức), **math.js** (đạo hàm
  biểu thức) — lazy-load chỉ khi mở Phòng thí nghiệm
- **Tailwind CSS 4** — theme tối lấy cảm hứng 3B1B, font Be Vietnam Pro

## Chạy dự án

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # xuất static vào dist/
npm run preview  # xem bản build
```

## Triển khai

### Vercel
1. Đẩy code lên GitHub repo mới.
2. Vercel → *Add New Project* → chọn repo → framework **Vite** (tự nhận) → Deploy.
   Không cần cấu hình gì thêm vì app dùng hash-router.

### GitHub Pages
```bash
npm run build
# push thư mục dist/ lên nhánh gh-pages, hoặc dùng action deploy tĩnh
```

## Cấu trúc

```
src/
├── engine/       # Stage (canvas/rAF/drag), PlaneView (trục, đường cong, Riemann)
├── components/   # LessonShell (clock + step card + theory tab), TheoryPanel, FunFact, ScrubBar
├── content/      # mỗi bài một file (steps + funFacts + theory) + theory.ts (tài liệu lý thuyết)
├── lessons/      # scene của từng bài (Canvas 2D hoặc R3F)
├── pages/        # Home, QuizSpace (setup → quiz → kết quả → phân tích AI)
├── quiz/         # types, ngân hàng offline, lưu lịch sử làm bài
└── lib/          # progress (localStorage)
api/
├── quiz.ts       # serverless: AI soạn câu hỏi (Vercel tự nhận thư mục api/)
├── analyze.ts    # serverless: AI phân tích kết quả
└── _lib/llm.ts   # client tương thích OpenAI (LLM_API_KEY / LLM_BASE_URL / LLM_MODEL)
```

Thêm bài mới: tạo `content/<id>.ts` (định nghĩa steps + Scene) rồi đăng ký vào
`content/index.tsx` — rail, trang chủ và tiến độ tự động cập nhật.

## Ghi nhận

Lấy cảm hứng từ [3Blue1Brown](https://www.3blue1brown.com) (Essence of Calculus),
[Mathigon](https://mathigon.org) và [Arduino-Learner](https://learn-arduino-red.vercel.app).
Là bản tái xây dựng hoàn toàn của dự án MathLens cũ (2026) — code cũ đã ngừng sử dụng.
