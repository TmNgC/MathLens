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
| 1 | **Giới hạn** Σ | Nghịch lý Zeno, phóng to khoảng trống ×2¹⁷, giới hạn hàm số, dải ε |
| 2 | **Đạo hàm** ƒ′ | Cát tuyến → tiếp tuyến (kéo được), vẽ hàm phái sinh f′, cực trị |
| 3 | **Tích phân** ∫ | Riemann (4 phương pháp), diện tích có dấu, hàm tích lũy, định lý cơ bản, vận tốc → quãng đường, nguyên hàm |
| 4 | **Khối tròn xoay** ◉ | 3D: quay φ 0→2π, phương pháp đĩa, lát cắt, V = π∫f² |
| 5 | **Thiết diện** ◫ | 3D: cắt trụ/nón, nguyên lý Cavalieri, bán cầu ⅔πR³ |
| 6 | **Phòng thí nghiệm** λ | Nhập hàm số bất kỳ (MathLive), tiếp tuyến, f′, diện tích |

Tiến độ được lưu tự động trong `localStorage` — không cần đăng ký.

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
├── components/   # LessonShell (clock + step card), LessonRail, ScrubBar, Formula
├── content/      # mỗi bài một file: steps[] tiếng Việt + LaTeX + Scene
├── lessons/      # scene của từng bài (Canvas 2D hoặc R3F)
└── lib/          # progress (localStorage)
```

Thêm bài mới: tạo `content/<id>.ts` (định nghĩa steps + Scene) rồi đăng ký vào
`content/index.tsx` — rail, trang chủ và tiến độ tự động cập nhật.

## Ghi nhận

Lấy cảm hứng từ [3Blue1Brown](https://www.3blue1brown.com) (Essence of Calculus),
[Mathigon](https://mathigon.org) và [Arduino-Learner](https://learn-arduino-red.vercel.app).
Là bản tái xây dựng hoàn toàn của dự án MathLens cũ (2026) — code cũ đã ngừng sử dụng.
