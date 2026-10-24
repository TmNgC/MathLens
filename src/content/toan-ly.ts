import type { Lesson } from './types'

/**
 * Bài "Từ toán học đến vật lý" — theory-only (khung cơ bản).
 * Cầu nối giải tích ↔ Vật lí 10–11 (chương trình GDPT 2018):
 * đạo hàm = tốc độ biến thiên, tích phân = phép cộng dồn.
 */
export const mathPhysicsLesson: Lesson = {
  id: 'toan-ly',
  number: 9,
  title: 'Từ toán học đến vật lý',
  subtitle: 'Đạo hàm & tích phân trong Vật lí 10–11',
  kind: 'theory',
  accent: '#b78bff',
  glyph: 'Φ',
  steps: [
    {
      title: 'Tài liệu liên môn',
      body: 'Mỗi đại lượng vật lý chỉ là một phía của đạo hàm hoặc tích phân.',
    },
  ],
  theory: [
    {
      heading: 'Quan điểm của bài học',
      kind: 'def',
      body:
        'Mọi đại lượng vật lý trong chương trình phổ thông chia thành hai họ. Họ thứ nhất trả lời câu hỏi "nhanh hay chậm đến mức nào" — vận tốc, gia tốc, dòng điện, công suất, suất điện động cảm ứng: tất cả là đạo hàm theo thời gian. Họ thứ hai trả lời câu hỏi "cộng dồn được bao nhiêu" — quãng đường, điện tích, công: tất cả là tích phân. Nắm hai phép toán của giải tích là giải được cả hai họ trong một khung duy nhất.',
      table: [
        { sym: '$\\dfrac{d}{dt}$', meaning: 'họ "tốc độ biến đổi": $v$, $a$, $I$, $e$, $P$' },
        { sym: '$\\int \\dots\\,dt$', meaning: 'họ "cộng dồn": $s$, $q$, $W$' },
      ],
    },
    {
      heading: 'Vận tốc tức thời — đạo hàm theo thời gian',
      kind: 'def',
      body:
        'Chuyển động thẳng có phương trình tọa độ $x(t)$. Vận tốc tức thời và gia tốc là các đạo hàm: $v(t)=\\dfrac{dx}{dt}$ và $a(t)=\\dfrac{dv}{dt}=\\dfrac{d^2x}{dt^2}$. Ví dụ rơi tự do: $x=\\dfrac{1}{2}gt^2$ nên $v=gt$ và $a=g$ — trọng lực tạo gia tốc không đổi chính là hệ số $g$ đứng trước $t^2$. "Vận tốc trung bình $\\dfrac{\\Delta x}{\\Delta t}$" trong SGK Vật lí 10 chính là tỉ số hiệu; khi $\\Delta t\\to0$ nó trở thành đạo hàm — đúng như cát tuyến tiến hóa thành tiếp tuyến ở bài Đạo hàm.',
    },
    {
      heading: 'Quãng đường — tích phân theo thời gian',
      kind: 'def',
      body:
        'Biết vận tốc thì lấy tích phân để có độ dời: $\\Delta x=\\displaystyle\\int_{t_1}^{t_2}v(t)\\,dt$. Trên đồ thị vận tốc – thời gian, tích phân chính là diện tích có dấu giữa đồ thị và trục thời gian: phần trên trục cộng vào, phần dưới trục trừ đi. Muốn quãng đường (không âm) thì tách theo thời điểm $v=0$ và lấy giá trị tuyệt đối từng đoạn — hoàn toàn giống diện tích có dấu của bài Tích phân. Đây là kĩ năng đọc đồ thị $v$–$t$ được kiểm tra nhiều nhất trong chương trình Vật lí 10.',
    },
    {
      heading: 'Một bài tích phân dựng lại toàn bộ chuyển động biến đổi đều',
      kind: 'example',
      body:
        'Xuất phát từ một dữ kiện duy nhất: gia tốc $a$ không đổi. Lần thứ nhất: $v=\\displaystyle\\int a\\,dt=v_0+at$. Lần thứ hai: $x=\\displaystyle\\int(v_0+at)\\,dt=x_0+v_0t+\\dfrac{1}{2}at^2$. Hai công thức được dùng nhiều nhất của Vật lí 10 chính là kết quả của hai lần tích phân liên tiếp — và quan hệ ngược lại $a=\\dfrac{dv}{dt}$ cho phép kiểm tra: đạo hàm của $x$ trả về đúng $v$, đạo hàm của $v$ trả về đúng $a$.',
    },
    {
      heading: 'Dao động điều hòa — đạo hàm của hàm lượng giác',
      kind: 'def',
      body:
        'Phương trình dao động: $x=A\\cos(\\omega t+\\varphi)$. Đạo hàm lần một cho vận tốc $v=-A\\omega\\sin(\\omega t+\\varphi)$, lần hai cho gia tốc $a=-\\omega^2A\\cos(\\omega t+\\varphi)=-\\omega^2x$. Kết quả thứ hai chính là đặc trưng định nghĩa của dao động điều hòa: gia tốc tỉ lệ với li độ theo hệ số âm — mọi hàm có tính chất $x^{\\prime\\prime}=-\\omega^2x$ đều dao động điều hòa. Đạo hàm hàm hợp $(\\cos u)\'=-u\'\\sin u$ với $u=\\omega t+\\varphi$ là công cụ duy nhất cần nhớ.',
    },
    {
      heading: 'Công của lực biến thiên — diện tích dưới đồ thị lực',
      kind: 'def',
      body:
        'Với lực không đổi: $A=Fs\\cos\\alpha$. Với lực biến thiên theo vị trí: $A=\\displaystyle\\int_{s_1}^{s_2}F(s)\\,ds$ — công là diện tích dưới đồ thị $F$–$s$. Ví dụ kinh điển: kéo lò xo từ tự nhiên đến độ biến dạng $x$, lực đàn hồi $F=ks$ tăng tuyến tính, diện tích tam giác dưới đường $F=kx$ bằng $\\dfrac{1}{2}kx^2$ — chính là công thức thế năng đàn hồi. Một tích phân thay cho việc học thuộc công thức.',
    },
    {
      heading: 'Dòng điện và điện tích — cùng một cặp đạo hàm/tích phân',
      kind: 'def',
      body:
        'Cường độ dòng điện tức thời là tốc độ biến thiên của điện tích: $I=\\dfrac{dq}{dt}$; ngược lại $q=\\displaystyle\\int I\\,dt$. Với dòng không đổi, $q=It$ là trường hợp riêng. Trên đồ thị $I$–$t$, điện tích di qua tiết diện dây dẫn là diện tích dưới đường cong — cách chuẩn để xử lí đường nạp/xả của tụ điện (một đường cong mũ) mà không cần công thức giải tích của nó.',
    },
    {
      heading: 'Cảm ứng điện từ — định luật Faraday',
      kind: 'def',
      body:
        'Suất điện động cảm ứng xuất hiện khi từ thông qua mạch biến thiên: $e=-N\\dfrac{d\\Phi}{dt}$. SGK Vật Lí 11 viết $e=-N\\dfrac{\\Delta\\Phi}{\\Delta t}$ — đây là giá trị trung bình trong khoảng $\\Delta t$; khi $\\Delta t\\to0$ tỉ số ấy trở thành đạo hàm, cho suất điện động tức thời. Ví dụ thanh dẫn dài $l$ trượt với vận tốc $v$ vuông góc với $B$: từ thông $\\Phi=Blx$ nên $e=-Bl\\dfrac{dx}{dt}=-Blv$ — công thức quen thuộc xuất phát trực tiếp từ đạo hàm theo thời gian.',
    },
    {
      heading: 'Công suất tức thời',
      kind: 'note',
      body:
        'Công suất là tốc độ sinh công: $P=\\dfrac{dW}{dt}$. Trong cơ học nó dẫn tới $P=Fv$ (lực cùng phương chuyển động); trong điện học $P=UI$ cùng một bản chất — tỉ số công trên thời gian, tức đạo hàm của công theo thời gian. Đơn vị watt chính là jun trên giây: đạo hàm mang đơn vị của thương.',
    },
    {
      heading: 'Điều kiện áp dụng và sai lầm thường gặp',
      kind: 'warn',
      body:
        '1) Đạo hàm và tích phân yêu cầu đại lượng là hàm số "đủ mịn" theo thời gian — mô hình vật lý phải cho phép coi $x(t)$, $q(t)$ liên tục. 2) Giữ hệ đơn vị SI nhất quán trước khi lấy đạo hàm: nếu $x$ tính bằng xentimét thì $v$ nhận về xentimét trên giây, không phải mét trên giây. 3) Phân biệt giá trị trung bình $\\dfrac{\\Delta\\Phi}{\\Delta t}$ và giá trị tức thời $\\dfrac{d\\Phi}{dt}$: câu hỏi đề bài yêu cầu cái nào thì trả lời cái đó. 4) Đồ thị $v$–$t$ chạm trục: độ dời dừng tăng nhưng quãng đường vẫn tăng — đổi dấu vận tốc phải tách đoạn trước khi lấy diện tích.',
    },
    {
      heading: 'Bản đồ liên hệ toán – vật lý',
      kind: 'note',
      body: 'Bảng đối chiếu tổng kết — mỗi khái niệm giải tính ứng vào ít nhất một đại lượng vật lý quen thuộc:',
      table: [
        { sym: 'Đạo hàm $f\'(t)$', meaning: 'tốc độ biến đổi: $v=x\'$, $a=v\'$, $I=q\'$, $e=-N\\Phi\'$, $P=W\'' },
        { sym: 'Đạo hàm cấp hai $x^{\\prime\\prime}$', meaning: 'gia tốc; đặc trưng $a=-\\omega^2x$ của dao động điều hòa' },
        { sym: 'Tích phân $\\int v\\,dt$', meaning: 'cộng dồn: độ dời, quãng đường' },
        { sym: 'Tích phân $\\int I\\,dt$', meaning: 'điện tích qua tiết diện' },
        { sym: 'Tích phân $\\int F\\,ds$', meaning: 'công của lực biến thiên; thế năng đàn hồi $\\frac{1}{2}kx^2$' },
        { sym: 'Diện tích dưới đồ thị', meaning: '$v$–$t$ → độ dời; $F$–$s$ → công; $I$–$t$ → điện tích' },
        { sym: 'Hàm số $\\cos(\\omega t+\\varphi)$', meaning: 'phương trình dao động điều hòa' },
        { sym: 'Hàm số mũ $e^x$', meaning: 'đường nạp/xả của tụ điện và sự tăng trưởng liên tục' },
      ],
    },
    {
      heading: 'Lời kết',
      kind: 'note',
      body:
        'Vật lý không phải là một danh sách công thức cần ghi nhớ — mỗi công thức trong bài này đều là một đạo hàm hoặc một tích phân đã quen thuộc. Khi gặp một đại lượng mới, hãy hỏi nó là "tốc độ biến đổi của gì" hay "cộng dồn của gì": câu trả lời chính là công thức.',
    },
  ],
}
