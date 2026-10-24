import type { Lesson } from './types'
import { LimitsScene } from '../lessons/LimitsLesson'
import { limitsTheory } from './theory'

export const limitsLesson: Lesson = {
  id: 'gioi-han',
  number: 1,
  title: 'Giới hạn',
  subtitle: 'Gần tùy ý — nền móng của giải tích',
  kind: 'calc',
  accent: '#b28ddd',
  glyph: 'Σ',
  steps: [
    {
      title: 'Nghịch lý Zeno — một nửa, rồi một nửa nữa',
      body:
        'Muốn đi từ 0 tới 1: trước hết đi nửa đường, rồi nửa phần còn lại, rồi lại nửa phần của phần đó... Zeno nói bạn sẽ chẳng bao giờ tới đích. Cộng dồn các phần: $S_n=\\frac{1}{2}+\\frac{1}{4}+\\frac{1}{8}+\\dots+\\frac{1}{2^n}$ — mỗi lần cộng, phần "còn thiếu" lại teo đi đúng một nửa.',
      duration: 10,
      funFact: {
        title: 'Achilles và con rùa',
        body:
          'Zeno (thế kỷ 5 TCN) kể: Achilles chạy nhanh gấp rấp rùa nhưng cho rùa xuất phát trước. Khi Achilles tới chỗ rùa vừa ở, rùa đã bò thêm một đoạn; cứ thế "mãi mãi" không với kịp. Nghịch lý này chỉ được giải quyết trọn vẹn sau hơn 2000 năm — khi con người có khái niệm giới hạn. Câu trả lời: vô số bước, nhưng tổng thời gian hội tụ về một số hữu hạn!',
      },
    },
    {
      title: 'Phóng to khoảng trống',
      body:
        'Trong số thập phân, $S_n$ tiến sát 1 đến mức gần như không thể phân biệt. Hãy phóng mạnh ống kính lên chỗ còn thiếu: khoảng trống vẫn ở đó — nhưng nhỏ dần không ngừng. Ta nói giới hạn của $S_n$ là 1: $\\lim_{n\\to\\infty}S_n=1$. "Không bao giờ chạm tới", nhưng "gần tùy ý" — đó chính là ý nghĩa thật của giới hạn.',
      duration: 14,
    },
    {
      title: 'Giới hạn của hàm số',
      body:
        'Với hàm số cũng vậy. Xét $f(x)=\\frac{x^2-1}{x-1}$: tại $x=1$ hàm không xác định — đồ thị có một khoảng trống. Nhưng khi $x$ tiến về 1 từ hai phía, $f(x)$ tiến về 2. Ta viết $\\lim_{x\\to 1}f(x)=2$: giới hạn mô tả xu hướng, không cần điểm đó có tồn tại hay không.',
      duration: 10,
    },
    {
      title: 'Dải $\\varepsilon$ — định nghĩa nghiêm ngặt',
      body:
        'Nói "tiến về 2" nghĩa là gì, chính xác? Với mọi dải hẹp $\\varepsilon$ quanh giá trị 2 — kể cả cực nhỏ — luôn tìm được một lân cận $\\delta$ quanh 1 sao cho toàn bộ $f(x)$ nằm gọn trong dải. Xem dải $\\varepsilon$ co lại: cửa sổ $\\delta$ co theo, nhưng lúc nào cũng tồn tại. Đó là định nghĩa $(\\varepsilon,\\delta)$ trong sách giáo khoa.',
      duration: 12,
      funFact: {
        title: 'Định nghĩa đến muộn 150 năm',
        body:
          'Newton và Leibniz dựng nên giải tích từ thế kỷ 17 bằng trực giác về "vô cùng bé" — và bị chỉ trích dữ dội vì thiếu chặt chẽ. Mãi đến 1821 Cauchy mới hình thức hóa khái niệm giới hạn, rồi Weierstrass hoàn thiện ngôn ngữ $(\\varepsilon, \\delta)$ vào những năm 1870. Toán học mất 150 năm để nói chính xác điều mà hoạt hình của bạn vừa xem diễn tả trong 12 giây!',
      },
    },
    {
      title: 'Chuỗi Leibniz — phân số chạm tới π',
      body:
        'Cộng trừ luân phiên các phân số lẻ: $S_n=1-\\frac{1}{3}+\\frac{1}{5}-\\frac{1}{7}+\\dots$ Các tổng riêng nhảy qua lại quanh một điểm — và điểm đó chính là $\\frac{\\pi}{4}$! Xem các điểm dao động: mỗi lần vọt qua, khoảng cách lại ngắn hơn.',
      duration: 12,
      funFact: {
        title: 'Leibniz, Newton và một chuỗi lừng danh',
        body:
          'Leibniz tìm ra chuỗi này năm 1674 — cùng thời ông và Newton đang tranh cãi gay gắt về việc ai phát minh ra giải tích (cả hai đều đúng, độc lập nhau!). Điều kỳ diệu: chỉ toàn phân số hữu hạn đơn giản, vậy mà tổng hội tụ về $\\pi$ — số vô tỉ không bao giờ viết hết được. Cái giá của sự kỳ diệu: chuỗi hội tụ rất chậm — muốn 10 chữ số đúng của $\\pi$, bạn cần cộng tới hàng tỷ số hạng!',
      },
    },
    {
      title: 'Số $e$ — từ lãi kép đến hằng số của thiên nhiên',
      body:
        'Gửi 1 đồng với lãi suất 100%/năm. Trả lãi một lần cuối năm: bạn có 2 đồng. Chia thành $n$ kỳ, mỗi kỳ lãi $\\frac{1}{n}$: bạn có $\\left(1+\\frac{1}{n}\\right)^n$ đồng. Càng chia nhỏ, càng giàu — nhưng không bao giờ vượt qua $e=2{,}71828\\dots$ Giới hạn ấy chính là hằng số $e$.',
      duration: 12,
      funFact: {
        title: 'Bernoulli hỏi, Euler trả lời',
        body:
          'Năm 1683, Jacob Bernoulli nghiên cứu lãi kép và phát hiện con số này — nhưng không biết nó "là ai". Năm 1737, Euler đặt tên nó là $e$, chứng minh $e$ là số vô tỉ, và sau đó cả số siêu việt. Hôm nay $e$ hiện diện khắp nơi: tăng trưởng dân số, phân rã phóng xạ, đường cong chuông Gaussian — và cả trong bài toán "chọn thư ký" nổi tiếng của lý thuyết xác suất.',
      },
    },
    {
      title: 'Hai con đường: hội tụ và phân kỳ',
      body:
        '$1+\\frac{1}{2}+\\frac{1}{4}+\\frac{1}{8}+\\dots \\to 2$ — teo đúng một nửa, hội tụ như Zeno. Nhưng $1+\\frac{1}{2}+\\frac{1}{3}+\\frac{1}{4}+\\dots$ thì khác: các bước nhỏ dần nhưng tổng vẫn leo không ngừng — chuỗi điều hòa phân kỳ! Đây là cặp bẫy kinh điển của mọi đề thi.',
      duration: 12,
      funFact: {
        title: 'Chuỗi điều hòa — chậm mà không dừng',
        body:
          'Nicole Oresme chứng minh chuỗi điều hòa phân kỳ từ thế kỷ 14 bằng cách gom nhóm ($\\frac13+\\frac14 > \\frac12$; $\\frac15+\\dots+\\frac18 > \\frac12$; ...). Nhưng nó leo chậm đến khó tin: cần hơn 12.000 số hạng mới vượt 10, và khoảng $10^{43}$ số hạng để vượt 100! Chuỗi này cũng chính là "họa âm" của dây đàn: tần số các họa âm là 1, 2, 3, 4... lần tần số cơ bản.',
      },
    },
    {
      title: 'Giới hạn là nền của mọi thứ',
      body:
        'Đạo hàm là giới hạn của tỉ số hiệu: $f\'(a)=\\lim_{\\Delta x\\to 0}\\frac{f(a+\\Delta x)-f(a)}{\\Delta x}$. Tích phân là giới hạn của tổng: $\\int_a^b f(x)dx=\\lim_{n\\to\\infty}\\sum f(x_i)\\,\\Delta x$. Hai khái niệm ở các bài sau đều đứng trên ý tưởng "gần tùy ý" mà bạn vừa được nhìn thấy — qua Zeno, Leibniz, Euler và chuỗi điều hòa.',
      duration: 14,
    },
  ],
  Scene: LimitsScene,
  theory: limitsTheory,
}
