import type { TheorySection } from './types'

/** Lý thuyết — Giới hạn */
export const limitsTheory: TheorySection[] = [
  {
    heading: 'Giới hạn của dãy số',
    kind: 'def',
    body:
      'Dãy số $(u_n)$ có giới hạn $L$ khi $n \\to \\infty$ nếu mọi số hạng, từ một vị trí đủ xa trở đi, nằm trong khoảng bất kỳ (dù hẹp bao nhiêu) quanh $L$. Khi đó dãy hội tụ và ta viết $\\lim_{n\\to\\infty}u_n=L$. Nếu không có giới hạn hữu hạn nào, dãy phân kỳ.',
    table: [
      { sym: '$\\lim_{n\\to\\infty}u_n=L$', meaning: 'dãy $(u_n)$ hội tụ về $L$' },
      { sym: '$u_n \\to +\\infty$', meaning: 'dãy phân kỳ, tăng không giới hạn' },
      { sym: '$\\lim_{n\\to\\infty}q^n=0$', meaning: 'khi $|q|<1$ (cơ sở của Zeno!)' },
      { sym: '$\\lim_{n\\to\\infty}\\left(1+\\frac{1}{n}\\right)^n=e$', meaning: 'định nghĩa số $e \\approx 2{,}71828$' },
    ],
  },
  {
    heading: 'Giới hạn của hàm số',
    kind: 'def',
    body:
      '$\\lim_{x\\to x_0}f(x)=L$ nghĩa là: khi $x$ tiến đủ gần $x_0$ từ hai phía (không cần bằng $x_0$) thì $f(x)$ tiến gần $L$. Giới hạn mô tả xu hướng — hàm có thể không xác định ngay tại $x_0$ nhưng vẫn có giới hạn tại đó, như $f(x)=\\frac{x^2-1}{x-1}$ tại $x_0=1$.',
    table: [
      { sym: '$\\lim_{x\\to x_0^+}f(x)$', meaning: 'giới hạn một bên phải (tiến từ $x>x_0$)' },
      { sym: '$\\lim_{x\\to x_0^-}f(x)$', meaning: 'giới hạn một bên trái' },
      { sym: '$\\lim_{x\\to x_0}f(x)=L$', meaning: 'tồn tại khi và chỉ khi hai giới hạn một bên đều bằng $L$' },
    ],
  },
  {
    heading: 'Ví dụ mẫu — giới hạn "cách đều vô cùng"',
    kind: 'example',
    body:
      'Tính $\\lim_{n\\to\\infty}\\frac{2n^2+1}{n^2-3}$. Chia tử và mẫu cho $n^2$: $\\lim\\frac{2+1/n^2}{1-3/n^2}=\\frac{2+0}{1-0}=2$. Mẹo: khi tử và mẫu cùng bậc, giới hạn bằng tỉ số hệ số bậc cao nhất; mẫu "nhanh" hơn thì bằng 0; tử "nhanh" hơn thì vô cùng.',
  },
  {
    heading: 'Sai lầm thường gặp',
    kind: 'warn',
    body:
      '1) Nhầm "không xác định tại $x_0$" với "không có giới hạn tại $x_0$" — hai việc khác nhau. 2) Tin rằng mọi dãy giảm dần về 0 thì tổng hội tụ: chuỗi điều hòa $1+\\frac12+\\frac13+\\dots$ là phản ví dụ kinh điển. 3) Quên kiểm tra CẢ hai giới hạn một bên trước khi kết luận $\\lim_{x\\to x_0}$ tồn tại.',
  },
  {
    heading: 'Ba giới hạn nên thuộc lòng',
    kind: 'note',
    body:
      '$\\lim_{n\\to\\infty}q^n=0$ nếu $|q|<1$ · $\\lim_{n\\to\\infty}\\left(1+\\frac1n\\right)^n=e$ · $\\lim_{x\\to0}\\frac{\\sin x}{x}=1$. Ba kết quả này xuất hiện xuyên suốt từ giới hạn, đạo hàm đến tích phân.',
  },
]

/** Lý thuyết — Đạo hàm */
export const derivativeTheory: TheorySection[] = [
  {
    heading: 'Đạo hàm tại một điểm',
    kind: 'def',
    body:
      'Cho hàm số $f$ xác định quanh $x_0$. Đạo hàm của $f$ tại $x_0$ là $f\'(x_0)=\\lim_{\\Delta x\\to0}\\frac{f(x_0+\\Delta x)-f(x_0)}{\\Delta x}$, nếu giới hạn này tồn tại. Về hình học: độ dốc của tiếp tuyến với đồ thị tại điểm $A(x_0,\\,f(x_0))$. Về vật lý: vận tốc tức thời nếu $f$ là quãng đường.',
    table: [
      { sym: '$f\'(x)$', meaning: 'hàm số phái sinh — đạo hàm tại mỗi điểm' },
      { sym: '$\\frac{dy}{dx}$, $y\'$', meaning: 'cách viết khác của đạo hàm (Leibniz / Lagrange)' },
      { sym: '$f\'\'(x)$', meaning: 'đạo hàm cấp hai — độ cong, gia tốc' },
    ],
  },
  {
    heading: 'Tiếp tuyến & ý nghĩa đơn điệu',
    kind: 'def',
    body:
      'Phương trình tiếp tuyến tại $x_0$: $y=f(x_0)+f\'(x_0)(x-x_0)$. Trên khoảng nào đó: $f\'>0 \\Rightarrow f$ đồng biến; $f\'<0 \\Rightarrow f$ nghịch biến; $f\'(x_0)=0$ là ứng viên cực trị (điểm "phẳng" — như bạn thấy ở bước 5 của phần trực quan).',
  },
  {
    heading: 'Suy ra công thức chuẩn từ định nghĩa',
    kind: 'example',
    body:
      'Mọi công thức trong bảng dưới đều chui ra từ một chỗ duy nhất — định nghĩa $f\'(x)=\\lim_{\\Delta x\\to0}\\frac{f(x+\\Delta x)-f(x)}{\\Delta x}$. Xem $(x^2)\'$ ra đời: $\\lim_{h\\to0}\\frac{(x+h)^2-x^2}{h}=\\lim_{h\\to0}\\frac{2xh+h^2}{h}=\\lim_{h\\to0}(2x+h)=2x$. Tương tự khai triển $(x+h)^3=x^3+3x^2h+3xh^2+h^3$ cho ra $3x^2$ — và quy luật tổng quát là $(x^n)\'=nx^{n-1}$. Với lượng giác, dùng công thức cộng: $\\frac{\\sin(x+h)-\\sin x}{h}=\\frac{2\\cos\\left(x+\\frac{h}{2}\\right)\\sin\\frac{h}{2}}{h}\\xrightarrow{h\\to0}\\cos x$ (nhờ $\\lim_{t\\to0}\\frac{\\sin t}{t}=1$). Còn $(e^x)\'=e^x$ — hàm duy nhất bằng chính đạo hàm của mình — là món quà của số $e$.',
  },
  {
    heading: 'Bảng đạo hàm cơ bản',
    kind: 'note',
    body: 'Đây là "bảng cửu chương" của giải tích — phải thuộc nằm lòng trước mọi bài kiểm tra.',
    table: [
      { sym: '$x^n$', meaning: '$nx^{n-1}$' },
      { sym: '$\\sin x$', meaning: '$\\cos x$' },
      { sym: '$\\cos x$', meaning: '$-\\sin x$' },
      { sym: '$e^x$', meaning: '$e^x$ (duy nhất bằng chính nó!)' },
      { sym: '$\\ln x$', meaning: '$1/x$' },
      { sym: '$u\\cdot v$', meaning: '$u\'v+uv\'$ (tích)' },
      { sym: '$\\frac{u}{v}$', meaning: '$\\frac{u\'v-uv\'}{v^2}$ (thương)' },
      { sym: '$f(g(x))$', meaning: '$f\'(g(x))\\cdot g\'(x)$ (quy tắc chuỗi)' },
    ],
  },
  {
    heading: 'Ví dụ mẫu — từ định nghĩa đến công thức',
    kind: 'example',
    body:
      'Tính đạo hàm của $f(x)=x^2$ bằng định nghĩa: $f\'(x)=\\lim_{h\\to0}\\frac{(x+h)^2-x^2}{h}=\\lim_{h\\to0}\\frac{2xh+h^2}{h}=\\lim_{h\\to0}(2x+h)=2x$ — khớp với hàng $x^n$ của bảng. Đúng như hoạt hình: độ dốc đường parabol $y=x^2/4$ tại $x=a$ là $a/2$.',
  },
  {
    heading: 'Sai lầm thường gặp',
    kind: 'warn',
    body:
      '1) Kết luận cực trị chỉ vì $f\'(x_0)=0$ — điều kiện cần chứ không đủ; phải xét dấu $f\'$ đổi qua $x_0$ (hoặc dùng $f\'\'$). 2) Quên quy tắc chuỗi với hàm hợp như $\\sin(3x)$ — kết quả phải là $3\\cos(3x)$, không phải $\\cos(3x)$. 3) Đạo hàm của tích: KHÔNG phải $u\'v\'$.',
  },
]

/** Lý thuyết — Tích phân */
export const integralTheory: TheorySection[] = [
  {
    heading: 'Tích phân xác định',
    kind: 'def',
    body:
      '$\\int_a^b f(x)\\,dx=\\lim_{n\\to\\infty}\\sum_{i=1}^{n}f(x_i)\\,\\Delta x$ với $\\Delta x=\\frac{b-a}{n}$ — giới hạn của tổng Riemann. Về hình học: diện tích có dấu của hình thang cong giới hạn bởi đồ thị $f$, trục $Ox$ và hai đường $x=a$, $x=b$.',
  },
  {
    heading: 'Nguyên hàm & định lý cơ bản',
    kind: 'def',
    body:
      '$F$ là nguyên hàm của $f$ trên khoảng $K$ nếu $F\'(x)=f(x)$ với mọi $x\\in K$. Định lý cơ bản của giải tích: $\\int_a^bf(x)\\,dx=F(b)-F(a)$, với $F$ là một nguyên hàm BẤT KỲ của $f$ (hằng số $C$ tự triệt tiêu khi trừ). Đây chính là chiếc chìa khóa "tính nhanh" ở bước 8 phần trực quan.',
    table: [
      { sym: '$\\int f(x)\\,dx$', meaning: 'họ nguyên hàm $F(x)+C$ (tích phân bất định)' },
      { sym: '$\\int_a^b f(x)\\,dx$', meaning: 'tích phân xác định — một SỐ' },
      { sym: '$F(x)\\Big|_a^b$', meaning: 'viết gọn của $F(b)-F(a)$' },
    ],
  },
  {
    heading: 'Bảng nguyên hàm cơ bản',
    kind: 'note',
    body: 'Đọc từ phải sang trái chính là bảng đạo hàm — hai bảng là một.',
    table: [
      { sym: '$x^n$', meaning: '$\\frac{x^{n+1}}{n+1}+C$ ($n\\ne-1$)' },
      { sym: '$\\frac{1}{x}$', meaning: '$\\ln|x|+C$' },
      { sym: '$\\sin x$', meaning: '$-\\cos x+C$' },
      { sym: '$\\cos x$', meaning: '$\\sin x+C$' },
      { sym: '$e^x$', meaning: '$e^x+C$' },
    ],
  },
  {
    heading: 'Ví dụ mẫu',
    kind: 'example',
    body:
      'Tính $\\int_0^2(x^2+1)\\,dx$. Nguyên hàm: $F(x)=\\frac{x^3}{3}+x$. Vậy $\\int_0^2=F(2)-F(0)=\\left(\\frac83+2\\right)-0=\\frac{14}{3}\\approx4{,}667$. Kiểm tra bằng trực quan: diện tích dưới parabol dịch chuyển lên 1 đơn vị trên $[0,2]$ — đúng bằng con số này.',
  },
  {
    heading: 'Sai lầm thường gặp',
    kind: 'warn',
    body:
      '1) Khi $f$ đổi dấu trên $[a,b]$: $\\int_a^b f$ là diện tích CÓ DẤU (phần dưới trục bị trừ) — muốn diện tích hình học phải tách khoảng theo nghiệm của $f(x)=0$ rồi lấy $|\\int|$. 2) Quên ghi $dx$ hoặc quên đổi chiều khi hoán vị cận: $\\int_a^b=-\\int_b^a$. 3) Tính $\\int_a^b$ bằng $F(a)-F(b)$ — sai dấu.',
  },
]

/** Lý thuyết — Khối tròn xoay */
export const revolutionTheory: TheorySection[] = [
  {
    heading: 'Thể tích khối tròn xoay',
    kind: 'def',
    body:
      'Khi hình phẳng giới hạn bởi đồ thị $y=f(x)$ ($f\\ge0$), trục $Ox$ và hai đường $x=a$, $x=b$ quay quanh $Ox$, ta được khối tròn xoay với thể tích $V=\\pi\\int_a^bf^2(x)\\,dx$. Tương tự khi quay quanh $Oy$: $V=\\pi\\int_c^d\\varphi^2(y)\\,dy$.',
    table: [
      { sym: '$V=\\pi\\int_a^bf^2(x)\\,dx$', meaning: 'quay quanh trục $Ox$' },
      { sym: '$V=\\pi\\int_c^d\\varphi^2(y)\\,dy$', meaning: 'quay quanh trục $Oy$' },
      { sym: '$dV=\\pi f^2(x)\\,dx$', meaning: 'thể tích đĩa vô cùng mỏng (phương pháp đĩa)' },
      { sym: '$V=\\pi\\int_a^b\\left(R^2-r^2\\right)dx$', meaning: 'vòng xuyến (washer) — khi khối có "lỗ"' },
    ],
  },
  {
    heading: 'Ví dụ mẫu',
    kind: 'example',
    body:
      'Cho $y=\\sqrt{x}$ trên $[0,4]$ quay quanh $Ox$: $V=\\pi\\int_0^4\\left(\\sqrt{x}\\right)^2dx=\\pi\\int_0^4x\\,dx=\\pi\\cdot\\frac{16}{2}=8\\pi$. Mỗi đĩa bán kính $\\sqrt{x}$ — đúng như hoạt hình ở bước 3.',
  },
  {
    heading: 'Sai lầm thường gặp',
    kind: 'warn',
    body:
      '1) Quên bình phương: $\\pi\\int f^2(x)dx$ chứ không phải $\\pi\\int f(x)dx$. 2) Bài "vòng xuyến" (miền giữa hai đường $y=f$ và $y=g$): phải dùng $R^2-r^2=\\left(f^2-g^2\\right)$, không thể lấy $\\pi\\int f^2$ trừ dần tùy hứng. 3) Quay quanh $Oy$ mà vẫn tích phân theo $x$ — phải đổi biến sang $y$.',
  },
  {
    heading: 'Liên hệ với bài Thiết diện',
    kind: 'note',
    body:
      'Khối tròn xoay chỉ là trường hợp đặc biệt của công thức tổng quát $V=\\int_a^bS(x)\\,dx$ với $S(x)$ là diện tích thiết diện: ở đây mỗi thiết diện là hình tròn nên $S(x)=\\pi f^2(x)$. Hiểu được điều này là hiểu được toàn bộ chương "thể tích" của chương trình 12.',
  },
]

/** Lý thuyết — Thiết diện */
export const crossSectionTheory: TheorySection[] = [
  {
    heading: 'Thiết diện & công thức thể tích tổng quát',
    kind: 'def',
    body:
      'Thiết diện của khối $H$ bởi mặt phẳng $(P)$ là phần chung của $(P)$ và $H$. Nếu mọi thiết diện vuông góc với trục $Ox$ tại $x$ đều có diện tích $S(x)$ (liên tục), thì $V=\\int_a^bS(x)\\,dx$. Toàn bộ phép tính thể tích trong chương trình 12 là một câu duy nhất: "cắt mỏng, cộng lại".',
    table: [
      { sym: '$S(x)$', meaning: 'diện tích thiết diện tại vị trí $x$' },
      { sym: '$V=\\int_a^bS(x)\\,dx$', meaning: 'công thức thể tích tổng quát' },
      { sym: '$S(h)=\\pi r^2(h)$', meaning: 'thiết diện tròn — khối tròn xoay, hình nón, hình cầu' },
    ],
  },
  {
    heading: 'Nguyên lý Cavalieri',
    kind: 'def',
    body:
      'Hai khối nằm giữa hai mặt phẳng song song. Nếu mọi thiết diện tương ứng (cắt bởi mặt phẳng song song với hai mặt trên) có diện tích bằng nhau thì hai khối có thể tích bằng nhau. Hình dáng bên ngoài có thể khác hẳn nhau — như hai chồng đồng xu ở phần trực quan.',
  },
  {
    heading: 'Ví dụ mẫu — hình nón',
    kind: 'example',
    body:
      'Nón cao $H$, bán kính đáy $R$: thiết diện ở độ cao $h$ là hình tròn bán kính $r(h)=R\\left(1-\\frac{h}{H}\\right)$. Vậy $V=\\int_0^H\\pi R^2\\left(1-\\frac{h}{H}\\right)^2dh=\\frac13\\pi R^2H$ — công thức quen thuộc của tiểu học được sinh ra từ một tích phân.',
  },
  {
    heading: 'Sai lầm thường gặp',
    kind: 'warn',
    body:
      '1) Trong bài hình hộp/lăng trụ ("thiết diện qua ba điểm"), vẽ nhầm thiết diện vì quên tìm giao tuyến của mặt phẳng với các mặt còn lại — hãy kéo dài các đường và tìm điểm chung trước. 2) Cavalieri chỉ bảo đảm THỂ TÍCH bằng nhau, không bảo đảm hai khối đồng dạng. 3) Với hình cầu: $S(h)=\\pi(R^2-h^2)$ — quên bình phương bán kính là mất ngay hệ số $\\frac43$.',
  },
  {
    heading: 'Khoảnh khắc đẹp nhất: khối cầu',
    kind: 'note',
    body:
      'Áp dụng cho bán kính $R$: $V=\\int_{-R}^{R}\\pi(R^2-h^2)\\,dh=\\frac43\\pi R^3$. Người ta đã biết công thức này hơn 2000 năm (Archimedes chứng minh bằng cách cân khối cầu với hình nón và hình trụ) — nhưng chỉ với thiết diện + tích phân, bạn tự chứng minh lại nó trong ba dòng.',
  },
]
