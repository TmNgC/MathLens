import type { QuizQuestion } from './types'

/**
 * Offline question bank — used when the AI endpoint is unreachable or no
 * API key is configured. Same shape the serverless generator returns.
 */
export const FALLBACK_BANK: QuizQuestion[] = [
  // ---------- Giới hạn ----------
  {
    id: 'gh-1',
    lessonId: 'gioi-han',
    skillTag: 'giới hạn dãy số',
    question: 'Tính $\\lim_{n\\to\\infty}\\frac{2n^2+1}{n^2-3}$?',
    options: ['$0$', '$2$', '$+\\infty$', '$\\frac{1}{3}$'],
    correctIndex: 1,
    explanation:
      'Tử và mẫu cùng bậc 2 nên giới hạn bằng tỉ số hệ số bậc cao nhất: $\\frac{2}{1}=2$. Hoặc chia cả tử và mẫu cho $n^2$.',
  },
  {
    id: 'gh-2',
    lessonId: 'gioi-han',
    skillTag: 'giới hạn nổi tiếng',
    question: '$\\lim_{n\\to\\infty}\\left(1+\\frac{1}{n}\\right)^n$ bằng bao nhiêu?',
    options: ['$1$', '$2$', '$e\\approx 2{,}71828$', '$+\\infty$'],
    correctIndex: 2,
    explanation:
      'Đây chính là định nghĩa của số $e$ — "lãi kép 100% chia thành $n$ kỳ" không bao giờ vượt qua $e$.',
  },
  {
    id: 'gh-3',
    lessonId: 'gioi-han',
    skillTag: 'hội tụ & phân kỳ',
    question: 'Chuỗi $1+\\frac{1}{2}+\\frac{1}{3}+\\frac{1}{4}+\\dots$ (chuỗi điều hòa) có tính chất gì?',
    options: [
      'Hội tụ về 2',
      'Hội tụ về một số nhỏ hơn 10',
      'Phân kỳ — tổng tăng không ngừng',
      'Hội tụ về $e$',
    ],
    correctIndex: 2,
    explanation:
      'Mặc dù các số hạng nhỏ dần về 0, tổng vẫn phân kỳ (Oresme, thế kỷ 14). Cần hơn 12.000 số hạng mới vượt 10 — chậm nhưng không bao giờ dừng. Chuỗi $1+\\frac12+\\frac14+\\dots$ mới hội tụ về 2.',
  },
  // ---------- Đạo hàm ----------
  {
    id: 'dh-1',
    lessonId: 'dao-ham',
    skillTag: 'bảng đạo hàm',
    question: 'Cho $f(x)=x^3$. Tính $f\'(2)$?',
    options: ['$6$', '$8$', '$12$', '$4$'],
    correctIndex: 2,
    explanation: '$f\'(x)=3x^2$ nên $f\'(2)=3\\cdot4=12$. Đạo hàm cho độ dốc tiếp tuyến, không phải giá trị hàm số.',
  },
  {
    id: 'dh-2',
    lessonId: 'dao-ham',
    skillTag: 'cực trị',
    question: 'Biết $f\'(x_0)=0$. Kết luận nào CHÍNH XÁC?',
    options: [
      '$x_0$ chắc chắn là điểm cực trị',
      'Hàm số đạt cực tiểu tại $x_0$',
      'Chưa đủ kết luận — cần xét dấu $f\'$ đổi qua $x_0$',
      'Hàm số không có cực trị',
    ],
    correctIndex: 2,
    explanation:
      '$f\'(x_0)=0$ chỉ là điều kiện CẦN. Ví dụ $f(x)=x^3$ có $f\'(0)=0$ nhưng không có cực trị tại 0 vì $f\'$ không đổi dấu.',
  },
  {
    id: 'dh-3',
    lessonId: 'dao-ham',
    skillTag: 'quy tắc chuỗi',
    question: 'Đạo hàm của $y=\\sin(3x)$ là?',
    options: ['$\\cos(3x)$', '$3\\cos(3x)$', '$-3\\cos(3x)$', '$3\\cos x$'],
    correctIndex: 1,
    explanation:
      'Quy tắc chuỗi: $(f(g(x)))\'=f\'(g(x))\\cdot g\'(x)$. Ở đây $f=\\sin$, $g=3x$ nên kết quả là $\\cos(3x)\\cdot 3$. Quên nhân $g\'$ là lỗi phổ biến nhất!',
  },
  // ---------- Tích phân ----------
  {
    id: 'tp-1',
    lessonId: 'tich-phan',
    skillTag: 'nguyên hàm cơ bản',
    question: 'Tính $\\int_0^2 (x^2+1)\\,dx$?',
    options: ['$\\frac{14}{3}$', '$6$', '$\\frac{10}{3}$', '$4$'],
    correctIndex: 0,
    explanation:
      'Nguyên hàm $F(x)=\\frac{x^3}{3}+x$; $F(2)-F(0)=\\frac83+2=\\frac{14}{3}$. Định lý cơ bản: $\\int_a^b f = F(b)-F(a)$.',
  },
  {
    id: 'tp-2',
    lessonId: 'tich-phan',
    skillTag: 'diện tích có dấu',
    question:
      'Trên $[a,b]$, đồ thị $f$ có đoạn nằm dưới trục $Ox$. Khi đó $\\int_a^b f(x)\\,dx$ cho ta điều gì?',
    options: [
      'Tổng diện tích hình học (mọi phần đều dương)',
      'Diện tích có dấu — phần dưới trục bị TRỪ đi',
      'Chỉ diện tích phần trên trục',
      'Chu vi của hình',
    ],
    correctIndex: 1,
    explanation:
      'Hình chữ nhật nằm dưới trục có chiều cao âm nên đóng góp âm vào tích phân. Muốn diện tích hình học: tách khoảng theo nghiệm $f(x)=0$ rồi lấy $\\left|\\int\\right|$ từng đoạn.',
  },
  {
    id: 'tp-3',
    lessonId: 'tich-phan',
    skillTag: 'định lý cơ bản',
    question: 'Nếu $F\'(x)=f(x)$ thì $\\int_a^b f(x)\\,dx$ bằng?',
    options: ['$F(a)-F(b)$', '$F(a)+F(b)$', '$F(b)-F(a)$', '$f(b)-f(a)$'],
    correctIndex: 2,
    explanation:
      'Định lý cơ bản của giải tích: tích phân và đạo hàm là hai phép ngược nhau — chỉ cần trừ hai số $F(b)-F(a)$. Sai dấu ($F(a)-F(b)$) là lỗi "ăn điểm" kinh điển.',
  },
  // ---------- Khối tròn xoay ----------
  {
    id: 'ktx-1',
    lessonId: 'khoi-tron-xoay',
    skillTag: 'thể tích tròn xoay',
    question:
      'Cho $y=\\sqrt{x}$ trên $[0;4]$ quay quanh trục $Ox$. Thể tích khối tròn xoay bằng?',
    options: ['$4\\pi$', '$8\\pi$', '$16\\pi$', '$\\frac{16\\pi}{3}$'],
    correctIndex: 1,
    explanation:
      '$V=\\pi\\int_0^4(\\sqrt{x})^2dx=\\pi\\int_0^4x\\,dx=\\pi\\cdot\\frac{16}{2}=8\\pi$. Nhớ bình phương hàm trước khi tích phân!',
  },
  {
    id: 'ktx-2',
    lessonId: 'khoi-tron-xoay',
    skillTag: 'công thức thể tích',
    question: 'Công thức thể tích khi quay hình phẳng giới hạn bởi $y=f(x)\\ (f\\ge0)$, $Ox$, $x=a$, $x=b$ quanh $Ox$?',
    options: [
      '$V=\\pi\\int_a^b f(x)\\,dx$',
      '$V=\\int_a^b f^2(x)\\,dx$',
      '$V=\\pi\\int_a^b f^2(x)\\,dx$',
      '$V=\\left(\\pi\\int_a^b f(x)\\,dx\\right)^2$',
    ],
    correctIndex: 2,
    explanation:
      'Mỗi đĩa mỏng có thể tích $dV=\\pi f^2(x)\\,dx$ (bán kính $f(x)$ thì diện tích $\\pi f^2$). Cần cả hệ số $\\pi$ lẫn bình phương.',
  },
  {
    id: 'ktx-3',
    lessonId: 'khoi-tron-xoay',
    skillTag: 'thể tích tròn xoay',
    question: 'Quay $y=x^2$ trên $[0;2]$ quanh $Ox$, thể tích bằng?',
    options: ['$\\frac{32\\pi}{5}$', '$\\frac{8\\pi}{3}$', '$\\frac{16\\pi}{3}$', '$4\\pi$'],
    correctIndex: 0,
    explanation:
      '$V=\\pi\\int_0^2(x^2)^2dx=\\pi\\int_0^2x^4\\,dx=\\pi\\cdot\\frac{32}{5}$. Bình phương $x^2$ thành $x^4$ — nhiều bạn quên đúng ở bước này.',
  },
  // ---------- Thiết diện ----------
  {
    id: 'td-1',
    lessonId: 'thiet-dien',
    skillTag: 'công thức thiết diện',
    question: 'Công thức $V=\\int_a^b S(x)\\,dx$ (với $S(x)$ là diện tích thiết diện tại $x$) có ý nghĩa gì?',
    options: [
      'Cộng dồn vô số lát mỏng dày $dx$ để được thể tích',
      'Tính diện tích bề mặt khối',
      'Tìm trọng tâm của khối',
      'Tính chu vi thiết diện lớn nhất',
    ],
    correctIndex: 0,
    explanation:
      'Cắt khối thành lát dày vô cùng mỏng $dx$, mỗi lát có thể tích $S(x)\\,dx$ — cộng lại (tích phân) thành thể tích. Đây là ý tưởng thống nhất của mọi công thức thể tích.',
  },
  {
    id: 'td-2',
    lessonId: 'thiet-dien',
    skillTag: 'nguyên lý Cavalieri',
    question:
      'Hai khối nằm giữa hai mặt phẳng song song, mọi thiết diện tương ứng có diện tích bằng nhau. Theo nguyên lý Cavalieri?',
    options: [
      'Hai khối đồng dạng',
      'Hai khối có thể tích bằng nhau',
      'Hai khối có khối lượng bằng nhau',
      'Chưa kết luận được gì',
    ],
    correctIndex: 1,
    explanation:
      'Cavalieri: cùng diện tích thiết diện tại mọi độ cao ⇒ cùng thể tích — dù hình dáng ngoài khác hẳn (như hai chồng đồng xu: xếp thẳng và xếp lệch).',
  },
  {
    id: 'td-3',
    lessonId: 'thiet-dien',
    skillTag: 'thể tích nón',
    question:
      'Hình nón cao $H=3$, bán kính đáy $R=2$. Dùng $V=\\int_0^H\\pi R^2(1-\\frac{h}{H})^2dh$, thể tích bằng?',
    options: ['$4\\pi$', '$6\\pi$', '$12\\pi$', '$\\frac{8\\pi}{3}$'],
    correctIndex: 0,
    explanation:
      '$V=\\frac{1}{3}\\pi R^2H=\\frac13\\pi\\cdot4\\cdot3=4\\pi$. Tích phân các lát tròn co dần sinh ra đúng công thức nón quen thuộc $\\frac13\\pi R^2H$.',
  },
  // ---------- Quy tắc tính đạo hàm ----------
  {
    id: 'qt-1',
    lessonId: 'quy-tac-dao-ham',
    skillTag: 'quy tắc chuỗi',
    question: 'Đạo hàm của $f(x)=\\sqrt{x^2+1}$ là?',
    options: ['$\\frac{1}{2\\sqrt{x^2+1}}$', '$\\frac{x}{\\sqrt{x^2+1}}$', '$\\frac{2x}{\\sqrt{x^2+1}}$', '$\\sqrt{2x}$'],
    correctIndex: 1,
    explanation:
      'Chuỗi: lớp ngoài $\\sqrt{u}$ có đạo hàm $\\frac{u\'}{2\\sqrt{u}}$, với $u=x^2+1$, $u\'=2x$. Kết quả $\\frac{2x}{2\\sqrt{x^2+1}}=\\frac{x}{\\sqrt{x^2+1}}$.',
  },
  {
    id: 'qt-2',
    lessonId: 'quy-tac-dao-ham',
    skillTag: 'quy tắc tích & thương',
    question: 'Đạo hàm của $f(x)=x^2\\sin x$ là?',
    options: ['$2x\\cos x$', '$2x\\sin x+x^2\\cos x$', '$2x\\sin x-x^2\\cos x$', '$x^2\\cos x$'],
    correctIndex: 1,
    explanation:
      'Quy tắc tích: $(uv)\'=u\'v+uv\'$ — lấy "cộng chéo": $(2x)(\\sin x)+(x^2)(\\cos x)$. Đáp án $2x\\sin x+x^2\\cos x$ — chú ý KHÔNG phải $u\'v\'$.',
  },
  // ---------- Giới hạn nâng cao ----------
  {
    id: 'ghnc-1',
    lessonId: 'gioi-han-nang-cao',
    skillTag: "quy tắc L'Hôpital",
    question: 'Tính $\\lim_{x\\to0}\\frac{\\ln(1+x)}{x}$ bằng L\'Hôpital. Kết quả là?',
    options: ['$0$', '$1$', '$e$', 'không tồn tại'],
    correctIndex: 1,
    explanation:
      'Dạng $\\frac00$ thỏa điều kiện: đạo hàm tử $\\frac{1}{1+x}$, đạo hàm mẫu $1$ → giới hạn $\\frac{1}{1+0}=1$. Đây cũng là một trong các giới hạn tiêu chuẩn nên nằm lòng.',
  },
  {
    id: 'ghnc-2',
    lessonId: 'gioi-han-nang-cao',
    skillTag: "bẫy L'Hôpital",
    question: 'Xét $\\lim_{x\\to+\\infty}\\frac{x+\\sin x}{x}$. Khẳng định nào ĐÚNG?',
    options: [
      'L\'Hôpital cho $\\frac{1+\\cos x}{1}$ không giới hạn nên giới hạn gốc không tồn tại',
      'Giới hạn bằng 1 — không thể kết luận từ L\'Hôpital, nhưng viết $1+\\frac{\\sin x}{x}$ ra ngay kết quả',
      'Giới hạn bằng 0',
      'Phải dùng khai triển Taylor',
    ],
    correctIndex: 1,
    explanation:
      'Bẫy kinh điển: L\'Hôpital chỉ cho kết luận KHI giới hạn của $f\'/g\'$ tồn tại — ở đây nó không tồn tại, nhưng giới hạn gốc vẫn tồn tại: $\\frac{x+\\sin x}{x}=1+\\frac{\\sin x}{x}\\to1+0=1$.',
  },
  {
    id: 'ghnc-3',
    lessonId: 'gioi-han-nang-cao',
    skillTag: 'dãy truy hồi Weierstrass',
    question: 'Dãy $u_1=\\sqrt2$, $u_{n+1}=\\sqrt{2u_n}$. Nếu $(u_n)$ hội tụ về $L$ thì $L$ bằng?',
    options: ['$L=1$', '$L=2$', '$L=4$', '$L=\\sqrt2$'],
    correctIndex: 1,
    explanation:
      'Cho $n\\to\\infty$ trong công thức truy hồi: $L=\\sqrt{2L}$ ⇒ $L^2=2L$ ⇒ $L=0$ hoặc $L=2$. Dãy tăng từ $\\sqrt2$ nên loại 0 → $L=2$ (đúng như bước Zeno: nhân đôi mãi "gần" 2).',
  },
]
