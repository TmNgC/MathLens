import type { Lesson } from './types'

/**
 * Bài "Tiền giải tích" — theory-only, bài đầu tiên của chương trình.
 * Ngôn ngữ, hàm số, các họ hàm cơ bản, hàm hợp/ngược và tư duy giải tích —
 * hành trang trước khi vào giới hạn và đạo hàm.
 */
export const preCalculusLesson: Lesson = {
  id: 'tien-giai-tich',
  number: 1,
  title: 'Tiền giải tích',
  subtitle: 'Hàm số & tư duy trước giải tích',
  kind: 'theory',
  accent: '#ffa94d',
  glyph: '∈',
  steps: [
    {
      title: 'Tài liệu nền tảng',
      body: 'Ngôn ngữ, hàm số và tư duy — hành trang trước khi vào giải tích.',
    },
  ],
  theory: [
    {
      heading: 'Từ con số đến hàm số',
      kind: 'history',
      body:
        'Con số ra đời từ việc đếm và đo của người Babylon, Ai Cập hàng nghìn năm trước Công nguyên. Người Hy Lạp nâng toán học thành khoa học suy diễn (Euclid, khoảng 300 TCN) nhưng tư duy chủ yếu bằng hình học. Bước ngoặt thứ nhất: Al-Khwarizmi (thế kỷ 9) hệ thống hóa cách giải phương trình — chữ "algorithm" đặt theo tên ông. Bước ngoặt thứ hai: Viète (thế kỷ 16) dùng chữ cái cho ẩn số; Descartes (1637) ghép đại số với hình học qua hệ tọa độ — từ đó mỗi phương trình có một đồ thị. Euler (1748) đưa ra ký hiệu $f(x)$ và coi hàm số là đối tượng nghiên cứu trung tâm; Dirichlet (1837) định nghĩa hiện đại: hàm số là quy tắc gán mỗi đầu vào đúng một đầu ra, không nhất thiết là một công thức. Toàn bộ giải tích đứng trên nền này.',
    },
    {
      heading: 'Ngôn ngữ của toán học',
      kind: 'def',
      body:
        'Giải tích viết dày đặc ký hiệu — mỗi ký hiệu là một từ rút gọn, cần đọc trôi chảy trước khi vào bài. Bộ từ vựng quan trọng nhất: tập hợp, lượng từ và khoảng số.',
      table: [
        { sym: '$x \\in A$', meaning: '$x$ là một phần tử của tập hợp $A$' },
        { sym: '$A \\subset B$', meaning: '$A$ là tập con của $B$ (mọi phần tử của $A$ đều thuộc $B$)' },
        { sym: '$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$', meaning: 'chuỗi tập số mở dần: tự nhiên → nguyên → hữu tỉ → thực' },
        { sym: '$(a; b)$ · $[a; b]$', meaning: 'khoảng mở (không gồm đầu mút) · đoạn đóng (gồm đầu mút)' },
        { sym: '$\\forall x$ · $\\exists x$', meaning: 'với mọi $x$ · tồn tại (ít nhất một) $x$' },
        { sym: '$|x - a| < \\varepsilon$', meaning: '$x$ gần $a$ hơn khoảng cách $\\varepsilon$ — ngôn ngữ của giới hạn' },
      ],
    },
    {
      heading: 'Hàm số — đối tượng trung tâm của giải tích',
      kind: 'def',
      body:
        'Cho tập $D$ khác rỗng. Hàm số $f: D \\to \\mathbb{R}$ gán cho mỗi $x \\in D$ đúng một số thực, ký hiệu $f(x)$. Hãy nghĩ $f$ là một cỗ máy: đầu vào $x$, đầu ra $f(x)$ — và "đúng một" nghĩa là cùng một đầu vào không bao giờ cho hai kết quả khác nhau. Miền xác định $D(f)$ là tập mọi đầu vào hợp lệ (mẫu khác 0, biểu thức dưới căn không âm, đối số của logarit dương). Đồ thị là tập các điểm $(x; f(x))$: đường thẳng đứng chỉ được cắt nó một điểm.',
      table: [
        { sym: '$f(x)$', meaning: 'giá trị của hàm tại $x$ (một SỐ, không phải hàm)' },
        { sym: '$D(f)$', meaning: 'miền xác định — tập đầu vào hợp lệ' },
        { sym: '$y = f(x)$', meaning: 'phương trình đồ thị trong mặt phẳng $Oxy$' },
        { sym: '$f(a) = 0$', meaning: '$a$ là nghiệm của phương trình $f(x) = 0$ (đồ thị cắt trục $Ox$)' },
      ],
    },
    {
      heading: 'Các họ hàm số cần thuộc',
      kind: 'note',
      body: 'Đồ thị của sáu họ sau phải hiện ra trong đầu chỉ cần nhìn công thức — giải tích soi mọi họ này bằng cùng một bộ câu hỏi:',
      table: [
        { sym: '$y = ax + b$', meaning: 'đường thẳng, độ dốc $a$ — tăng đều đều' },
        { sym: '$y = ax^2 + bx + c$ ($a \\ne 0$)', meaning: 'parabol, đỉnh ở $x = -\\frac{b}{2a}$, mở lên khi $a > 0$' },
        { sym: '$y = \\dfrac{P(x)}{Q(x)}$', meaning: 'phân thức — mẫu bằng 0 thì hàm không xác định' },
        { sym: '$y = \\sin x$ · $\\cos x$', meaning: 'đường hình sin, chu kì $2\\pi$, giá trị trong $[-1; 1]$' },
        { sym: '$y = e^x$', meaning: 'luôn dương, đi qua $(0; 1)$, tăng nhanh hơn mọi đa thức' },
        { sym: '$y = \\ln x$', meaning: 'chỉ xác định khi $x > 0$, đi qua $(1; 0)$, tăng chậm dần' },
      ],
    },
    {
      heading: 'Hàm hợp — khái niệm đứng sau quy tắc chuỗi',
      kind: 'def',
      body:
        'Hàm hợp lấy đầu ra của hàm này làm đầu vào của hàm kia: $(g \\circ f)(x) = g(f(x))$. Ví dụ $\\sin(3x)$: hàm $\\sin$ nhận đầu vào là $3x$; hay $e^{x^2}$: hàm mũ nhận đầu vào $x^2$. Tách một biểu thức phức tạp thành các lớp "trong — ngoài" là kĩ năng đọc đề đầu tiên của mọi bài giải tích; đạo hàm của hàm hợp chính là quy tắc chuỗi ở bài Quy tắc tính đạo hàm.',
    },
    {
      heading: 'Hàm ngược',
      kind: 'def',
      body:
        'Nếu $f$ gán $x \\to y$ theo cách mỗi đầu ra chỉ đến từ một đầu vào, thì hàm ngược $f^{-1}$ gán ngược $y \\to x$: $f^{-1}(f(x)) = x$. Các cặp quen thuộc: $e^x$ với $\\ln x$; $x^2$ (với $x \\ge 0$) với $\\sqrt{x}$; $\\sin$ trên $\\left[-\\frac{\\pi}{2}; \\frac{\\pi}{2}\\right]$ với $\\arcsin$. Đồ thị của hai hàm ngược đối xứng nhau qua đường $y = x$. Logarit thực chất là phép "hỏi ngược" lũy thừa: $\\log_a y = x$ nghĩa là $a^x = y$.',
    },
    {
      heading: 'Biến đổi đồ thị',
      kind: 'note',
      body:
        'Từ đồ thị của $y = f(x)$: $y = f(x) + c$ nâng cả đồ thị lên $c$ đơn vị; $y = f(x - c)$ dịch phải $c$ đơn vị; $y = c\\,f(x)$ co giãn theo phương dọc, và $c < 0$ lật đồ thị qua trục hoành. Đọc một đồ thị lạ bằng cách bóc từng lớp biến đổi ra khỏi hàm đã quen — cùng thao tác "bóc lớp" như khi tách hàm hợp.',
    },
    {
      heading: 'Tư duy giải tích — bốn câu hỏi',
      kind: 'def',
      body:
        'Toán học trước giải tích trả lời "bằng bao nhiêu". Giải tích trả lời "đang thay đổi ra sao". Trước khi vào chương trình, hãy làm quen bốn câu hỏi sẽ quay lại trong mọi bài: (1) Khi $x$ dịch đi một chút, $f(x)$ thay đổi nhanh hay chậm — nhanh BAO NHIÊU? (2) Nếu cộng dồn một đại lượng mãi, kết quả TIẾN VỀ ĐÂU? (3) Điều gì xảy ra khi $x$ tiến đủ gần một điểm mà không cần chạm tới? (4) Gần một điểm, đồ thị có thể thay bằng đường thẳng nào? Bốn câu trả lời nghiêm ngặt — tốc độ thay đổi, tích lũy, giới hạn, xấp xỉ tuyến tính — chính là đạo hàm, tích phân, phép lấy giới hạn và tiếp tuyến của chín bài tiếp theo.',
    },
    {
      heading: 'Tự kiểm tra trước khi vào bài Giới hạn',
      kind: 'warn',
      body:
        '1) Giải được $x^2 - 5x + 6 = 0$ và $\\sin x = \\frac{1}{2}$. 2) Với $f(x) = \\frac{x+1}{x-3}$: tính được $f(2)$ và giải thích được vì sao $x = 3$ bị loại khỏi miền xác định. 3) Vẽ được không cần suy nghĩ đồ thị của $x^2$, $\\frac{1}{x}$, $\\sin x$, $e^x$, $\\ln x$. 4) Với $f(x) = x + 1$ và $g(x) = x^2$, tính được $(g \\circ f)(x)$. Chưa chắc chỗ nào thì ôn đúng chỗ đó — mỗi bài sau đều dùng trực tiếp những thứ này.',
    },
  ],
}
