import type { Lesson } from './types'
import { LimitsScene } from '../lessons/LimitsLesson'

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
        'Muốn đi từ 0 tới 1: trước hết đi nửa đường, rồi nửa phần còn lại, rồi lại nửa phần của phần đó... Zeno nói bạn sẽ chẳng bao giờ tới đích. Cộng dồn các phần: $S_n=\\frac{1}{2}+\\frac{1}{4}+\\frac{1}{8}+\\dots+\\frac{1}{2^n}$ — mỗi lần cộng, phần \"còn thiếu\" lại teo đi đúng một nửa.',
      duration: 10,
    },
    {
      title: 'Phóng to khoảng trống',
      body:
        'Trong số thập phân, $S_n$ tiến sát 1 đến mức gần như không thể phân biệt. Hãy phóng mạnh ống kính lên chỗ còn thiếu: khoảng trống vẫn ở đó — nhưng nhỏ dần không ngừng. Ta nói giới hạn của $S_n$ là 1: $\\lim_{n\\to\\infty}S_n=1$. \"Không bao giờ chạm tới\", nhưng \"gần tùy ý\" — đó chính là ý nghĩa thật của giới hạn.',
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
        'Nói \"tiến về 2\" nghĩa là gì, chính xác? Với mọi dải hẹp $\\varepsilon$ quanh giá trị 2 — kể cả cực nhỏ — luôn tìm được một lân cận $\\delta$ quanh 1 sao cho toàn bộ $f(x)$ nằm gọn trong dải. Xem dải $\\varepsilon$ co lại: cửa sổ $\\delta$ co theo, nhưng lúc nào cũng tồn tại. Đó là định nghĩa $(\\varepsilon,\\delta)$ trong sách giáo khoa.',
      duration: 12,
    },
    {
      title: 'Giới hạn là nền của mọi thứ',
      body:
        'Đạo hàm là giới hạn của tỉ số hiệu: $f\'(a)=\\lim_{\\Delta x\\to 0}\\frac{f(a+\\Delta x)-f(a)}{\\Delta x}$. Tích phân là giới hạn của tổng: $\\int_a^b f(x)dx=\\lim_{n\\to\\infty}\\sum f(x_i)\\,\\Delta x$. Hai khái niệm ở các bài sau đều đứng trên ý tưởng \"gần tùy ý\" mà bạn vừa nhìn thấy.',
      duration: 14,
    },
  ],
  Scene: LimitsScene,
}
