import type { VocabularyWord } from '../types';

export const defaultVocabulary: VocabularyWord[] = [
  // ==========================================
  // DIFFICULTY: EASY (35 words)
  // ==========================================
  
  // Topic: Office (7)
  {
    id: "agenda",
    word: "agenda",
    partOfSpeech: "noun",
    ipa: "/əˈdʒen.də/",
    definition: "Chương trình nghị sự",
    example: "The agenda for the meeting was sent out yesterday.",
    exampleTranslation: "Chương trình nghị sự cho cuộc họp đã được gửi vào ngày hôm qua.",
    topic: "Office",
    difficulty: "easy"
  },
  {
    id: "colleague",
    word: "colleague",
    partOfSpeech: "noun",
    ipa: "/ˈkɒl.iːɡ/",
    definition: "Đồng nghiệp",
    example: "She discussed the project with her colleague.",
    exampleTranslation: "Cô ấy đã thảo luận dự án với đồng nghiệp của mình.",
    topic: "Office",
    difficulty: "easy"
  },
  {
    id: "document",
    word: "document",
    partOfSpeech: "noun",
    ipa: "/ˈdɒk.jə.mənt/",
    definition: "Tài liệu",
    example: "Please sign this document before submitting it.",
    exampleTranslation: "Vui lòng ký tài liệu này trước khi nộp.",
    topic: "Office",
    difficulty: "easy"
  },
  {
    id: "equipment",
    word: "equipment",
    partOfSpeech: "noun",
    ipa: "/ɪˈkwɪp.mənt/",
    definition: "Thiết bị",
    example: "The office needs new computer equipment.",
    exampleTranslation: "Văn phòng cần thiết bị máy tính mới.",
    topic: "Office",
    difficulty: "easy"
  },
  {
    id: "memo",
    word: "memo",
    partOfSpeech: "noun",
    ipa: "/ˈmem.əʊ/",
    definition: "Bản ghi nhớ",
    example: "The manager sent a memo about the new policy.",
    exampleTranslation: "Quản lý đã gửi một bản ghi nhớ về chính sách mới.",
    topic: "Office",
    difficulty: "easy"
  },
  {
    id: "schedule",
    word: "schedule",
    partOfSpeech: "noun",
    ipa: "/ˈʃedʒ.uːl/",
    definition: "Lịch trình",
    example: "Our schedule is very tight this week.",
    exampleTranslation: "Lịch trình của chúng tôi rất bận rộn tuần này.",
    topic: "Office",
    difficulty: "easy"
  },
  {
    id: "submit",
    word: "submit",
    partOfSpeech: "verb",
    ipa: "/səbˈmɪt/",
    definition: "Nộp, đệ trình",
    example: "You must submit the report by Friday.",
    exampleTranslation: "Bạn phải nộp báo cáo trước thứ Sáu.",
    topic: "Office",
    difficulty: "easy"
  },

  // Topic: Marketing (7)
  {
    id: "advertise",
    word: "advertise",
    partOfSpeech: "verb",
    ipa: "/ˈæd.və.taɪz/",
    definition: "Quảng cáo",
    example: "We plan to advertise our products online.",
    exampleTranslation: "Chúng tôi lên kế hoạch quảng cáo sản phẩm của mình trực tuyến.",
    topic: "Marketing",
    difficulty: "easy"
  },
  {
    id: "brand",
    word: "brand",
    partOfSpeech: "noun",
    ipa: "/brænd/",
    definition: "Thương hiệu",
    example: "Building a strong brand takes time.",
    exampleTranslation: "Xây dựng một thương hiệu mạnh cần có thời gian.",
    topic: "Marketing",
    difficulty: "easy"
  },
  {
    id: "consumer",
    word: "consumer",
    partOfSpeech: "noun",
    ipa: "/kənˈsjuː.mər/",
    definition: "Người tiêu dùng",
    example: "Consumer feedback is vital for product improvement.",
    exampleTranslation: "Phản hồi của người tiêu dùng là cực kỳ quan trọng để cải thiện sản phẩm.",
    topic: "Marketing",
    difficulty: "easy"
  },
  {
    id: "market",
    word: "market",
    partOfSpeech: "noun",
    ipa: "/ˈmɑː.kɪt/",
    definition: "Thị trường",
    example: "The target market for this app is young professionals.",
    exampleTranslation: "Thị trường mục tiêu của ứng dụng này là những chuyên gia trẻ.",
    topic: "Marketing",
    difficulty: "easy"
  },
  {
    id: "product",
    word: "product",
    partOfSpeech: "noun",
    ipa: "/ˈprɒd.ʌkt/",
    definition: "Sản phẩm",
    example: "The new product will be launched next week.",
    exampleTranslation: "Sản phẩm mới sẽ được ra mắt vào tuần tới.",
    topic: "Marketing",
    difficulty: "easy"
  },
  {
    id: "promote",
    word: "promote",
    partOfSpeech: "verb",
    ipa: "/prəˈməʊt/",
    definition: "Thúc đẩy, quảng bá",
    example: "They hired a celebrity to promote the brand.",
    exampleTranslation: "Họ đã thuê một người nổi tiếng để quảng bá thương hiệu.",
    topic: "Marketing",
    difficulty: "easy"
  },
  {
    id: "strategy",
    word: "strategy",
    partOfSpeech: "noun",
    ipa: "/ˈstræt.ə.dʒi/",
    definition: "Chiến lược",
    example: "We need a new marketing strategy to boost sales.",
    exampleTranslation: "Chúng ta cần một chiến lược tiếp thị mới để thúc đẩy doanh số.",
    topic: "Marketing",
    difficulty: "easy"
  },

  // Topic: Finance (7)
  {
    id: "budget",
    word: "budget",
    partOfSpeech: "noun",
    ipa: "/ˈbʌdʒ.ɪt/",
    definition: "Ngân sách",
    example: "We need to stick to the approved budget.",
    exampleTranslation: "Chúng ta cần bám sát ngân sách đã được phê duyệt.",
    topic: "Finance",
    difficulty: "easy"
  },
  {
    id: "cost",
    word: "cost",
    partOfSpeech: "noun",
    ipa: "/kɒst/",
    definition: "Chi phí",
    example: "The cost of raw materials has increased.",
    exampleTranslation: "Chi phí nguyên vật liệu đã tăng lên.",
    topic: "Finance",
    difficulty: "easy"
  },
  {
    id: "debt",
    word: "debt",
    partOfSpeech: "noun",
    ipa: "/det/",
    definition: "Khoản nợ",
    example: "The company is trying to pay off its debt.",
    exampleTranslation: "Công ty đang cố gắng trả hết khoản nợ của mình.",
    topic: "Finance",
    difficulty: "easy"
  },
  {
    id: "income",
    word: "income",
    partOfSpeech: "noun",
    ipa: "/ˈɪn.kʌm/",
    definition: "Thu nhập ròng",
    example: "Our net income rose significantly last quarter.",
    exampleTranslation: "Thu nhập ròng của chúng tôi đã tăng đáng kể trong quý trước.",
    topic: "Finance",
    difficulty: "easy"
  },
  {
    id: "investment",
    word: "investment",
    partOfSpeech: "noun",
    ipa: "/ɪnˈvest.mənt/",
    definition: "Khoản đầu tư",
    example: "Real estate is considered a safe investment.",
    exampleTranslation: "Bất động sản được coi là một khoản đầu tư an toàn.",
    topic: "Finance",
    difficulty: "easy"
  },
  {
    id: "payment",
    word: "payment",
    partOfSpeech: "noun",
    ipa: "/ˈpeɪ.mənt/",
    definition: "Khoản thanh toán",
    example: "Payment is due within thirty days of the invoice.",
    exampleTranslation: "Khoản thanh toán đến hạn trong vòng ba mươi ngày kể từ ngày xuất hóa đơn.",
    topic: "Finance",
    difficulty: "easy"
  },
  {
    id: "profit",
    word: "profit",
    partOfSpeech: "noun",
    ipa: "/ˈprɒf.ɪt/",
    definition: "Lợi nhuận",
    example: "We expect to make a profit by the end of the year.",
    exampleTranslation: "Chúng tôi mong đợi sẽ đạt được lợi nhuận vào cuối năm.",
    topic: "Finance",
    difficulty: "easy"
  },

  // Topic: Personnel (7)
  {
    id: "apply",
    word: "apply",
    partOfSpeech: "verb",
    ipa: "/əˈplaɪ/",
    definition: "Nộp đơn xin việc",
    example: "You should apply for the job online.",
    exampleTranslation: "Bạn nên nộp đơn xin việc trực tuyến.",
    topic: "Personnel",
    difficulty: "easy"
  },
  {
    id: "candidate",
    word: "candidate",
    partOfSpeech: "noun",
    ipa: "/ˈkæn.dɪ.dət/",
    definition: "Ứng viên",
    example: "She is a strong candidate for the manager position.",
    exampleTranslation: "Cô ấy là một ứng viên sáng giá cho vị trí quản lý.",
    topic: "Personnel",
    difficulty: "easy"
  },
  {
    id: "hire",
    word: "hire",
    partOfSpeech: "verb",
    ipa: "/haɪər/",
    definition: "Tuyển dụng, thuê",
    example: "We need to hire more staff for the summer.",
    exampleTranslation: "Chúng ta cần tuyển dụng thêm nhân viên cho mùa hè.",
    topic: "Personnel",
    difficulty: "easy"
  },
  {
    id: "interview",
    word: "interview",
    partOfSpeech: "noun",
    ipa: "/ˈɪn.tə.vjuː/",
    definition: "Cuộc phỏng vấn",
    example: "His job interview is scheduled for tomorrow morning.",
    exampleTranslation: "Cuộc phỏng vấn xin việc của anh ấy được lên lịch vào sáng mai.",
    topic: "Personnel",
    difficulty: "easy"
  },
  {
    id: "payroll",
    word: "payroll",
    partOfSpeech: "noun",
    ipa: "/ˈpeɪ.rəʊl/",
    definition: "Bảng lương",
    example: "The new employee has been added to the payroll.",
    exampleTranslation: "Nhân viên mới đã được thêm vào bảng lương.",
    topic: "Personnel",
    difficulty: "easy"
  },
  {
    id: "promotion",
    word: "promotion",
    partOfSpeech: "noun",
    ipa: "/prəˈməʊ.ʃən/",
    definition: "Sự thăng chức",
    example: "He received a promotion after working hard.",
    exampleTranslation: "Anh ấy đã được thăng chức sau khi làm việc chăm chỉ.",
    topic: "Personnel",
    difficulty: "easy"
  },
  {
    id: "resume",
    word: "resume",
    partOfSpeech: "noun",
    ipa: "/ˈrez.ju.meɪ/",
    definition: "Sơ yếu lý lịch",
    example: "Please attach your resume to the application email.",
    exampleTranslation: "Vui lòng đính kèm sơ yếu lý lịch của bạn vào email đăng ký.",
    topic: "Personnel",
    difficulty: "easy"
  },

  // Topic: Travel (7)
  {
    id: "baggage",
    word: "baggage",
    partOfSpeech: "noun",
    ipa: "/ˈbæɡ.ɪdʒ/",
    definition: "Hành lý",
    example: "You can check your baggage at the counter.",
    exampleTranslation: "Bạn có thể ký gửi hành lý của mình tại quầy.",
    topic: "Travel",
    difficulty: "easy"
  },
  {
    id: "flight",
    word: "flight",
    partOfSpeech: "noun",
    ipa: "/flaɪt/",
    definition: "Chuyến bay",
    example: "Her flight was delayed due to bad weather.",
    exampleTranslation: "Chuyến bay của cô ấy đã bị hoãn do thời tiết xấu.",
    topic: "Travel",
    difficulty: "easy"
  },
  {
    id: "hotel",
    word: "hotel",
    partOfSpeech: "noun",
    ipa: "/həʊˈtel/",
    definition: "Khách sạn",
    example: "We booked a hotel near the convention center.",
    exampleTranslation: "Chúng tôi đã đặt một khách sạn gần trung tâm hội nghị.",
    topic: "Travel",
    difficulty: "easy"
  },
  {
    id: "itinerary",
    word: "itinerary",
    partOfSpeech: "noun",
    ipa: "/aɪˈtɪn.ər.ər.i/",
    definition: "Lịch trình chuyến đi",
    example: "Please email me a copy of your travel itinerary.",
    exampleTranslation: "Vui lòng email cho tôi bản sao lịch trình chuyến đi của bạn.",
    topic: "Travel",
    difficulty: "easy"
  },
  {
    id: "passenger",
    word: "passenger",
    partOfSpeech: "noun",
    ipa: "/ˈpæs.ən.dʒər/",
    definition: "Hành khách",
    example: "All passengers must wear seatbelts during takeoff.",
    exampleTranslation: "Tất cả hành khách phải thắt dây an toàn khi cất cánh.",
    topic: "Travel",
    difficulty: "easy"
  },
  {
    id: "ticket",
    word: "ticket",
    partOfSpeech: "noun",
    ipa: "/ˈtɪk.ɪt/",
    definition: "Vé",
    example: "He bought a round-trip ticket to Chicago.",
    exampleTranslation: "Anh ấy đã mua một chiếc vé khứ hồi đi Chicago.",
    topic: "Travel",
    difficulty: "easy"
  },
  {
    id: "transportation",
    word: "transportation",
    partOfSpeech: "noun",
    ipa: "/ˌtræn.spɔːˈteɪ.ʃən/",
    definition: "Phương tiện di chuyển",
    example: "Public transportation is very convenient in Tokyo.",
    exampleTranslation: "Giao thông công cộng rất thuận tiện ở Tokyo.",
    topic: "Travel",
    difficulty: "easy"
  },

  // ==========================================
  // DIFFICULTY: MEDIUM (35 words)
  // ==========================================

  // Topic: Office (7)
  {
    id: "attendee",
    word: "attendee",
    partOfSpeech: "noun",
    ipa: "/ə.tenˈdiː/",
    definition: "Người tham dự",
    example: "Every attendee will receive a name tag at registration.",
    exampleTranslation: "Mỗi người tham dự sẽ nhận được một thẻ tên khi đăng ký.",
    topic: "Office",
    difficulty: "medium"
  },
  {
    id: "collaborate",
    word: "collaborate",
    partOfSpeech: "verb",
    ipa: "/kəˈlæb.ə.reɪt/",
    definition: "Hợp tác",
    example: "We need to collaborate on this design project.",
    exampleTranslation: "Chúng ta cần hợp tác trong dự án thiết kế này.",
    topic: "Office",
    difficulty: "medium"
  },
  {
    id: "confidential",
    word: "confidential",
    partOfSpeech: "adjective",
    ipa: "/ˌkɒn.fɪˈden.ʃəl/",
    definition: "Bảo mật",
    example: "These files are highly confidential.",
    exampleTranslation: "Những hồ sơ này cực kỳ bảo mật.",
    topic: "Office",
    difficulty: "medium"
  },
  {
    id: "duplicate",
    word: "duplicate",
    partOfSpeech: "verb",
    ipa: "/ˈdʒuː.plɪ.keɪt/",
    definition: "Nhân đôi, sao chép",
    example: "Do not duplicate the efforts of other team members.",
    exampleTranslation: "Đừng lặp lại những nỗ lực của các thành viên khác trong nhóm.",
    topic: "Office",
    difficulty: "medium"
  },
  {
    id: "efficiency",
    word: "efficiency",
    partOfSpeech: "noun",
    ipa: "/ɪˈfɪʃ.ən.si/",
    definition: "Hiệu suất, hiệu quả",
    example: "New software will improve office efficiency.",
    exampleTranslation: "Phần mềm mới sẽ cải thiện hiệu suất văn phòng.",
    topic: "Office",
    difficulty: "medium"
  },
  {
    id: "implement",
    word: "implement",
    partOfSpeech: "verb",
    ipa: "/ˈɪm.plɪ.ment/",
    definition: "Triển khai, thực hiện",
    example: "We will implement the new guidelines next month.",
    exampleTranslation: "Chúng tôi sẽ triển khai các hướng dẫn mới vào tháng tới.",
    topic: "Office",
    difficulty: "medium"
  },
  {
    id: "postpone",
    word: "postpone",
    partOfSpeech: "verb",
    ipa: "/pəʊstˈpəʊn/",
    definition: "Hoãn lại",
    example: "The committee decided to postpone the meeting.",
    exampleTranslation: "Ủy ban quyết định hoãn cuộc họp lại.",
    topic: "Office",
    difficulty: "medium"
  },

  // Topic: Marketing (7)
  {
    id: "attract",
    word: "attract",
    partOfSpeech: "verb",
    ipa: "/əˈtrækt/",
    definition: "Thu hút",
    example: "The campaign was designed to attract new customers.",
    exampleTranslation: "Chiến dịch được thiết kế để thu hút khách hàng mới.",
    topic: "Marketing",
    difficulty: "medium"
  },
  {
    id: "campaign",
    word: "campaign",
    partOfSpeech: "noun",
    ipa: "/kæmˈpeɪn/",
    definition: "Chiến dịch",
    example: "The advertising campaign was very successful.",
    exampleTranslation: "Chiến dịch quảng cáo đã rất thành công.",
    topic: "Marketing",
    difficulty: "medium"
  },
  {
    id: "competitor",
    word: "competitor",
    partOfSpeech: "noun",
    ipa: "/kəmˈpet.ɪ.tər/",
    definition: "Đối thủ cạnh tranh",
    example: "We must analyze our main competitor's price.",
    exampleTranslation: "Chúng ta phải phân tích giá của đối thủ cạnh tranh chính.",
    topic: "Marketing",
    difficulty: "medium"
  },
  {
    id: "survey",
    word: "survey",
    partOfSpeech: "noun",
    ipa: "/ˈsɜː.veɪ/",
    definition: "Cuộc khảo sát",
    example: "We are conducting a survey on customer satisfaction.",
    exampleTranslation: "Chúng tôi đang tiến hành một cuộc khảo sát về sự hài lòng của khách hàng.",
    topic: "Marketing",
    difficulty: "medium"
  },
  {
    id: "launch",
    word: "launch",
    partOfSpeech: "verb",
    ipa: "/lɔːntʃ/",
    definition: "Ra mắt, khai trương",
    example: "The company plans to launch a new perfume line.",
    exampleTranslation: "Công ty có kế hoạch ra mắt một dòng nước hoa mới.",
    topic: "Marketing",
    difficulty: "medium"
  },
  {
    id: "persuade",
    word: "persuade",
    partOfSpeech: "verb",
    ipa: "/pəˈsweɪd/",
    definition: "Thuyết phục",
    example: "It is difficult to persuade users to switch brands.",
    exampleTranslation: "Rất khó để thuyết phục người dùng đổi thương hiệu.",
    topic: "Marketing",
    difficulty: "medium"
  },
  {
    id: "segment",
    word: "segment",
    partOfSpeech: "noun",
    ipa: "/ˈseɡ.mənt/",
    definition: "Phân khúc",
    example: "We are targeting the luxury segment of the market.",
    exampleTranslation: "Chúng tôi đang nhắm vào phân khúc cao cấp của thị trường.",
    topic: "Marketing",
    difficulty: "medium"
  },

  // Topic: Finance (7)
  {
    id: "audit",
    word: "audit",
    partOfSpeech: "noun",
    ipa: "/ˈɔː.dɪt/",
    definition: "Kiểm toán",
    example: "The company underwent an independent financial audit.",
    exampleTranslation: "Công ty đã trải qua một cuộc kiểm toán tài chính độc lập.",
    topic: "Finance",
    difficulty: "medium"
  },
  {
    id: "balance",
    word: "balance",
    partOfSpeech: "noun",
    ipa: "/ˈbæl.əns/",
    definition: "Số dư tài khoản",
    example: "You can check your account balance online.",
    exampleTranslation: "Bạn có thể kiểm tra số dư tài khoản của mình trực tuyến.",
    topic: "Finance",
    difficulty: "medium"
  },
  {
    id: "expense",
    word: "expense",
    partOfSpeech: "noun",
    ipa: "/ɪkˈspens/",
    definition: "Chi phí, khoản chi",
    example: "Travel expense claims must include receipts.",
    exampleTranslation: "Yêu cầu thanh toán chi phí đi lại phải kèm theo hóa đơn.",
    topic: "Finance",
    difficulty: "medium"
  },
  {
    id: "revenue",
    word: "revenue",
    partOfSpeech: "noun",
    ipa: "/ˈrev.ən.juː/",
    definition: "Doanh thu",
    example: "Annual revenue exceeded our expectations this year.",
    exampleTranslation: "Doanh thu hàng năm đã vượt quá mong đợi của chúng tôi năm nay.",
    topic: "Finance",
    difficulty: "medium"
  },
  {
    id: "portfolio",
    word: "portfolio",
    partOfSpeech: "noun",
    ipa: "/ˌpɔːtˈfəʊ.li.əʊ/",
    definition: "Danh mục đầu tư",
    example: "He manages a diverse stock portfolio.",
    exampleTranslation: "Anh ấy quản lý một danh mục đầu tư cổ phiếu đa dạng.",
    topic: "Finance",
    difficulty: "medium"
  },
  {
    id: "transaction",
    word: "transaction",
    partOfSpeech: "noun",
    ipa: "/trænˈzæk.ʃən/",
    definition: "Giao dịch",
    example: "The online transaction was completed successfully.",
    exampleTranslation: "Giao dịch trực tuyến đã được hoàn thành thành công.",
    topic: "Finance",
    difficulty: "medium"
  },
  {
    id: "bankrupt",
    word: "bankrupt",
    partOfSpeech: "adjective",
    ipa: "/ˈbæŋ.krʌpt/",
    definition: "Phá sản",
    example: "The retail chain went bankrupt last month.",
    exampleTranslation: "Chuỗi cửa hàng bán lẻ đã bị phá sản vào tháng trước.",
    topic: "Finance",
    difficulty: "medium"
  },

  // Topic: Personnel (7)
  {
    id: "benefit",
    word: "benefit",
    partOfSpeech: "noun",
    ipa: "/ˈben.ɪ.fɪt/",
    definition: "Phúc lợi, lợi ích",
    example: "Dental insurance is a standard benefit here.",
    exampleTranslation: "Bảo hiểm nha khoa là một phúc lợi tiêu chuẩn ở đây.",
    topic: "Personnel",
    difficulty: "medium"
  },
  {
    id: "compensation",
    word: "compensation",
    partOfSpeech: "noun",
    ipa: "/ˌkɒm.penˈseɪ.ʃən/",
    definition: "Lương bổng, sự đền bù",
    example: "The compensation package includes a base salary and bonus.",
    exampleTranslation: "Gói thù lao bao gồm lương cơ bản và tiền thưởng.",
    topic: "Personnel",
    difficulty: "medium"
  },
  {
    id: "evaluator",
    word: "evaluator",
    partOfSpeech: "noun",
    ipa: "/ɪˈvæl.ju.eɪ.tər/",
    definition: "Người đánh giá",
    example: "The evaluator reviewed the employee performance reviews.",
    exampleTranslation: "Người đánh giá đã xem xét các bản đánh giá hiệu suất của nhân viên.",
    topic: "Personnel",
    difficulty: "medium"
  },
  {
    id: "qualification",
    word: "qualification",
    partOfSpeech: "noun",
    ipa: "/ˌkwɒl.ɪ.fɪˈkeɪ.ʃən/",
    definition: "Bằng cấp, năng lực",
    example: "Experience is a key qualification for this role.",
    exampleTranslation: "Kinh nghiệm là một năng lực cốt lõi cho vai trò này.",
    topic: "Personnel",
    difficulty: "medium"
  },
  {
    id: "recruit",
    word: "recruit",
    partOfSpeech: "verb",
    ipa: "/rɪˈkruːt/",
    definition: "Tuyển dụng",
    example: "We are looking to recruit software developers.",
    exampleTranslation: "Chúng tôi đang tìm kiếm để tuyển dụng các nhà phát triển phần mềm.",
    topic: "Personnel",
    difficulty: "medium"
  },
  {
    id: "retire",
    word: "retire",
    partOfSpeech: "verb",
    ipa: "/rɪˈtaɪər/",
    definition: "Nghỉ hưu",
    example: "The senior engineer plans to retire next year.",
    exampleTranslation: "Kỹ sư cấp cao có kế hoạch nghỉ hưu vào năm tới.",
    topic: "Personnel",
    difficulty: "medium"
  },
  {
    id: "termination",
    word: "termination",
    partOfSpeech: "noun",
    ipa: "/ˌtɜː.mɪˈneɪ.ʃən/",
    definition: "Sự chấm dứt hợp đồng",
    example: "The contract outlines conditions for termination.",
    exampleTranslation: "Hợp đồng vạch ra các điều kiện để chấm dứt.",
    topic: "Personnel",
    difficulty: "medium"
  },

  // Topic: Travel (7)
  {
    id: "accommodation",
    word: "accommodation",
    partOfSpeech: "noun",
    ipa: "/əˌkɒm.əˈdeɪ.ʃən/",
    definition: "Chỗ ở",
    example: "The travel agent arranged our accommodation.",
    exampleTranslation: "Đại lý du lịch đã sắp xếp chỗ ở cho chúng tôi.",
    topic: "Travel",
    difficulty: "medium"
  },
  {
    id: "boarding",
    word: "boarding",
    partOfSpeech: "noun",
    ipa: "/ˈbɔː.dɪŋ/",
    definition: "Sự lên máy bay/tàu",
    example: "Boarding will begin twenty minutes before departure.",
    exampleTranslation: "Việc lên máy bay sẽ bắt đầu hai mươi phút trước giờ khởi hành.",
    topic: "Travel",
    difficulty: "medium"
  },
  {
    id: "customs",
    word: "customs",
    partOfSpeech: "noun",
    ipa: "/ˈkʌs.təmz/",
    definition: "Hải quan",
    example: "It took an hour to clear customs at the airport.",
    exampleTranslation: "Mất một giờ để làm thủ tục hải quan tại sân bay.",
    topic: "Travel",
    difficulty: "medium"
  },
  {
    id: "delay",
    word: "delay",
    partOfSpeech: "noun",
    ipa: "/dɪˈleɪ/",
    definition: "Sự trì hoãn",
    example: "Heavy snow caused a delay in train services.",
    exampleTranslation: "Tuyết rơi dày đã gây ra sự trì hoãn trong các dịch vụ tàu hỏa.",
    topic: "Travel",
    difficulty: "medium"
  },
  {
    id: "destination",
    word: "destination",
    partOfSpeech: "noun",
    ipa: "/ˌdes.tɪˈneɪ.ʃən/",
    definition: "Điểm đến",
    example: "Paris is a popular travel destination.",
    exampleTranslation: "Paris là một điểm đến du lịch phổ biến.",
    topic: "Travel",
    difficulty: "medium"
  },
  {
    id: "reservation",
    word: "reservation",
    partOfSpeech: "noun",
    ipa: "/ˌrez.əˈveɪ.ʃən/",
    definition: "Sự đặt chỗ trước",
    example: "I made a reservation for a table of four.",
    exampleTranslation: "Tôi đã đặt chỗ trước cho một bàn bốn người.",
    topic: "Travel",
    difficulty: "medium"
  },
  {
    id: "departure",
    word: "departure",
    partOfSpeech: "noun",
    ipa: "/dɪˈpɑː.tʃər/",
    definition: "Sự khởi hành",
    example: "Passengers should check the departure board for gate changes.",
    exampleTranslation: "Hành khách nên kiểm tra bảng khởi hành để biết các thay đổi về cổng.",
    topic: "Travel",
    difficulty: "medium"
  },

  // ==========================================
  // DIFFICULTY: HARD (30 words)
  // ==========================================

  // Topic: Office (6)
  {
    id: "bureaucracy",
    word: "bureaucracy",
    partOfSpeech: "noun",
    ipa: "/bjʊəˈrɒk.rə.si/",
    definition: "Thủ tục hành chính, quan liêu",
    example: "We need to reduce bureaucracy to speed up approvals.",
    exampleTranslation: "Chúng ta cần giảm bớt thủ tục hành chính để đẩy nhanh các phê duyệt.",
    topic: "Office",
    difficulty: "hard"
  },
  {
    id: "discrepancy",
    word: "discrepancy",
    partOfSpeech: "noun",
    ipa: "/dɪˈskrep.ən.si/",
    definition: "Sự khác biệt, không nhất quán",
    example: "There is a discrepancy between the two reports.",
    exampleTranslation: "Có một sự khác biệt giữa hai bản báo cáo.",
    topic: "Office",
    difficulty: "hard"
  },
  {
    id: "facilitate",
    word: "facilitate",
    partOfSpeech: "verb",
    ipa: "/fəˈsɪl.ɪ.teɪt/",
    definition: "Tạo điều kiện, làm cho dễ dàng",
    example: "Structured templates facilitate better communication.",
    exampleTranslation: "Các biểu mẫu có cấu trúc tạo điều kiện cho giao tiếp tốt hơn.",
    topic: "Office",
    difficulty: "hard"
  },
  {
    id: "infrastructure",
    word: "infrastructure",
    partOfSpeech: "noun",
    ipa: "/ˈin.frəˌstrʌk.tʃər/",
    definition: "Cơ sở hạ tầng",
    example: "The company is investing in upgrading its IT infrastructure.",
    exampleTranslation: "Công ty đang đầu tư nâng cấp cơ sở hạ tầng CNTT của mình.",
    topic: "Office",
    difficulty: "hard"
  },
  {
    id: "mandatory",
    word: "mandatory",
    partOfSpeech: "adjective",
    ipa: "/ˈmæn.də.tər.i/",
    definition: "Bắt buộc",
    example: "Attendance at the safety seminar is mandatory.",
    exampleTranslation: "Tham dự hội thảo an toàn là bắt buộc.",
    topic: "Office",
    difficulty: "hard"
  },
  {
    id: "superfluous",
    word: "superfluous",
    partOfSpeech: "adjective",
    ipa: "/suːˈpɜː.flu.əs/",
    definition: "Thừa thãi, không cần thiết",
    example: "Please delete any superfluous information from the slides.",
    exampleTranslation: "Vui lòng xóa bất kỳ thông tin thừa thãi nào khỏi các trang slide.",
    topic: "Office",
    difficulty: "hard"
  },

  // Topic: Marketing (6)
  {
    id: "penetration",
    word: "penetration",
    partOfSpeech: "noun",
    ipa: "/ˌpen.ɪˈtreɪ.ʃən/",
    definition: "Sự thâm nhập",
    example: "Our market penetration has increased by five percent.",
    exampleTranslation: "Sự thâm nhập thị trường của chúng tôi đã tăng 5%.",
    topic: "Marketing",
    difficulty: "hard"
  },
  {
    id: "demographics",
    word: "demographics",
    partOfSpeech: "noun",
    ipa: "/ˌdem.əˈɡræf.ɪks/",
    definition: "Nhân khẩu học",
    example: "The demographics of our buyer base are shifting.",
    exampleTranslation: "Nhân khẩu học của cơ sở người mua của chúng tôi đang thay đổi.",
    topic: "Marketing",
    difficulty: "hard"
  },
  {
    id: "endorsement",
    word: "endorsement",
    partOfSpeech: "noun",
    ipa: "/ɪnˈdɔːs.mənt/",
    definition: "Sự tán thành, quảng cáo từ người nổi tiếng",
    example: "Celebrity endorsement can significantly boost sales.",
    exampleTranslation: "Sự quảng cáo từ người nổi tiếng có thể tăng đáng kể doanh số.",
    topic: "Marketing",
    difficulty: "hard"
  },
  {
    id: "monopolize",
    word: "monopolize",
    partOfSpeech: "verb",
    ipa: "/məˈnɒp.əl.aɪz/",
    definition: "Độc chiếm, độc quyền",
    example: "The giant firm attempts to monopolize the retail industry.",
    exampleTranslation: "Công ty khổng lồ cố gắng độc chiếm ngành bán lẻ.",
    topic: "Marketing",
    difficulty: "hard"
  },
  {
    id: "questionnaire",
    word: "questionnaire",
    partOfSpeech: "noun",
    ipa: "/ˌkwes.tʃənˈeər/",
    definition: "Bảng câu hỏi khảo sát",
    example: "Please fill out this questionnaire to give us feedback.",
    exampleTranslation: "Vui lòng điền vào bảng câu hỏi này để gửi phản hồi cho chúng tôi.",
    topic: "Marketing",
    difficulty: "hard"
  },
  {
    id: "ubiquitous",
    word: "ubiquitous",
    partOfSpeech: "adjective",
    ipa: "/juːˈbɪk.wɪ.təs/",
    definition: "Khắp nơi, phổ biến",
    example: "Mobile advertising has become ubiquitous nowadays.",
    exampleTranslation: "Quảng cáo trên di động đã trở nên phổ biến khắp nơi ngày nay.",
    topic: "Marketing",
    difficulty: "hard"
  },

  // Topic: Finance (6)
  {
    id: "depreciation",
    word: "depreciation",
    partOfSpeech: "noun",
    ipa: "/dɪˌpriː.ʃiˈeɪ.ʃən/",
    definition: "Sự khấu hao",
    example: "Depreciation of equipment should be calculated annually.",
    exampleTranslation: "Sự khấu hao của thiết bị nên được tính toán hàng năm.",
    topic: "Finance",
    difficulty: "hard"
  },
  {
    id: "acquisition",
    word: "acquisition",
    partOfSpeech: "noun",
    ipa: "/ˌæk.wɪˈzɪʃ.ən/",
    definition: "Sự thâu tóm, mua lại",
    example: "The company announced the acquisition of its rival.",
    exampleTranslation: "Công ty đã công bố việc mua lại đối thủ cạnh tranh của mình.",
    topic: "Finance",
    difficulty: "hard"
  },
  {
    id: "dividend",
    word: "dividend",
    partOfSpeech: "noun",
    ipa: "/ˈdɪv.ɪ.dend/",
    definition: "Cổ tức",
    example: "Shareholders will receive a dividend next month.",
    exampleTranslation: "Các cổ đông sẽ nhận được cổ tức vào tháng tới.",
    topic: "Finance",
    difficulty: "hard"
  },
  {
    id: "liabilities",
    word: "liabilities",
    partOfSpeech: "noun",
    ipa: "/ˌlaɪ.əˈbɪl.ɪ.tiz/",
    definition: "Nợ phải trả, nghĩa vụ pháp lý",
    example: "The auditor examined the firm's assets and liabilities.",
    exampleTranslation: "Kiểm toán viên đã kiểm tra tài sản và các khoản nợ phải trả của công ty.",
    topic: "Finance",
    difficulty: "hard"
  },
  {
    id: "subsidy",
    word: "subsidy",
    partOfSpeech: "noun",
    ipa: "/ˈsʌb.sɪ.di/",
    definition: "Tiền trợ cấp",
    example: "The government offers a subsidy for green energy.",
    exampleTranslation: "Chính phủ cung cấp một khoản trợ cấp cho năng lượng xanh.",
    topic: "Finance",
    difficulty: "hard"
  },
  {
    id: "fluctuate",
    word: "fluctuate",
    partOfSpeech: "verb",
    ipa: "/ˈflʌk.tʃu.eɪt/",
    definition: "Dao động, biến động",
    example: "Oil prices fluctuate due to market demand.",
    exampleTranslation: "Giá dầu biến động do nhu cầu thị trường.",
    topic: "Finance",
    difficulty: "hard"
  },

  // Topic: Personnel (6)
  {
    id: "appraisal",
    word: "appraisal",
    partOfSpeech: "noun",
    ipa: "/əˈpreɪ.zəl/",
    definition: "Sự đánh giá hiệu suất",
    example: "Annual performance appraisal helps set career goals.",
    exampleTranslation: "Đánh giá hiệu suất hàng năm giúp thiết lập các mục tiêu nghề nghiệp.",
    topic: "Personnel",
    difficulty: "hard"
  },
  {
    id: "demote",
    word: "demote",
    partOfSpeech: "verb",
    ipa: "/dɪˈməʊt/",
    definition: "Giáng chức",
    example: "The board decided to demote the manager for negligence.",
    exampleTranslation: "Hội đồng quản trị đã quyết định giáng chức quản lý vì sự cẩu thả.",
    topic: "Personnel",
    difficulty: "hard"
  },
  {
    id: "grievance",
    word: "grievance",
    partOfSpeech: "noun",
    ipa: "/ˈgriː.vəns/",
    definition: "Sự khiếu nại, phàn nàn",
    example: "The union handles worker grievance claims formally.",
    exampleTranslation: "Công đoàn giải quyết các khiếu nại của công nhân một cách chính thức.",
    topic: "Personnel",
    difficulty: "hard"
  },
  {
    id: "severance",
    word: "severance",
    partOfSpeech: "noun",
    ipa: "/ˈsev.ər.əns/",
    definition: "Trợ cấp thôi việc",
    example: "Laid-off employees received three months of severance pay.",
    exampleTranslation: "Nhân viên bị sa thải nhận được ba tháng lương trợ cấp thôi việc.",
    topic: "Personnel",
    difficulty: "hard"
  },
  {
    id: "nepotism",
    word: "nepotism",
    partOfSpeech: "noun",
    ipa: "/ˈnep.ə.tɪ.zəm/",
    definition: "Sự nâng đỡ người nhà, gia đình trị",
    example: "The company policy strictly forbids nepotism in hiring.",
    exampleTranslation: "Chính sách công ty nghiêm cấm sự nâng đỡ người nhà trong tuyển dụng.",
    topic: "Personnel",
    difficulty: "hard"
  },
  {
    id: "redundancy",
    word: "redundancy",
    partOfSpeech: "noun",
    ipa: "/rɪˈdʌn.dən.si/",
    definition: "Sự dư thừa nhân sự",
    example: "Restructuring led to several redundancies in administrative roles.",
    exampleTranslation: "Tái cơ cấu dẫn đến một vài sự dư thừa nhân sự trong các vai trò hành chính.",
    topic: "Personnel",
    difficulty: "hard"
  },

  // Topic: Travel (6)
  {
    id: "layover",
    word: "layover",
    partOfSpeech: "noun",
    ipa: "/ˈleɪˌəʊ.vər/",
    definition: "Điểm dừng, thời gian chờ chuyến bay",
    example: "I have a four-hour layover in Frankfurt.",
    exampleTranslation: "Tôi có một điểm dừng đóng vai trò thời gian chờ ở Frankfurt.",
    topic: "Travel",
    difficulty: "hard"
  },
  {
    id: "embarkation",
    word: "embarkation",
    partOfSpeech: "noun",
    ipa: "/ˌem.bɑːˈkeɪ.ʃən/",
    definition: "Sự lên tàu, máy bay",
    example: "The embarkation process was smooth and organized.",
    exampleTranslation: "Quy trình lên tàu diễn ra suôn sẻ và có tổ chức.",
    topic: "Travel",
    difficulty: "hard"
  },
  {
    id: "reimburse",
    word: "reimburse",
    partOfSpeech: "verb",
    ipa: "/ˌriː.ɪmˈbɜːs/",
    definition: "Hoàn lại, bồi hoàn",
    example: "The firm will reimburse your travel expenses.",
    exampleTranslation: "Công ty sẽ hoàn lại chi phí đi lại của bạn.",
    topic: "Travel",
    difficulty: "hard"
  },
  {
    id: "excursion",
    word: "excursion",
    partOfSpeech: "noun",
    ipa: "/ɪkˈskɜː.ʃən/",
    definition: "Chuyến tham quan dã ngoại",
    example: "The package includes a guided excursion to the ruins.",
    exampleTranslation: "Gói bao gồm một chuyến tham quan có hướng dẫn đến các tàn tích.",
    topic: "Travel",
    difficulty: "hard"
  },
  {
    id: "sojourn",
    word: "sojourn",
    partOfSpeech: "noun",
    ipa: "/ˈsɒdʒ.ɜːn/",
    definition: "Sự lưu trú tạm thời",
    example: "During his sojourn in Paris, he studied art history.",
    exampleTranslation: "Trong suốt thời gian lưu trú tạm thời ở Paris, anh ấy đã học lịch sử nghệ thuật.",
    topic: "Travel",
    difficulty: "hard"
  },
  {
    id: "indemnify",
    word: "indemnify",
    partOfSpeech: "verb",
    ipa: "/inˈdem.nɪ.faɪ/",
    definition: "Bồi thường, bảo đảm thiệt hại",
    example: "The airline will indemnify passengers for lost baggage.",
    exampleTranslation: "Hãng hàng không sẽ bồi thường cho hành khách về hành lý bị thất lạc.",
    topic: "Travel",
    difficulty: "hard"
  }
];
