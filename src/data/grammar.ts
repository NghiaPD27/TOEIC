import type { GrammarTopic } from '../types';

export const grammarTopics: GrammarTopic[] = [
  {
    id: "basic-tenses",
    title: "1. Basic Tenses",
    description: "Learn how to choose the correct verb tense based on time markers and context in TOEIC texts.",
    theory: `Verb tenses express when an action takes place. In TOEIC, you must distinguish between Simple, Progressive, and Perfect aspects.

**I. QUY TẮC NGỮ PHÁP CHI TIẾT & NGỮ CẢNH SỬ DỤNG (Detailed Grammar Rules & Usage Scenarios)**

1. Hiện tại đơn (Simple Present):
- Diễn tả thói quen, hành động lặp đi lặp lại hàng ngày (habits/routines).
- Diễn tả sự thật hiển nhiên, chân lý không thay đổi (general truths).
- Diễn tả lịch trình, thời khóa biểu cố định (scheduled future events), như lịch tàu xe, máy bay, lịch họp.

2. Quá khứ đơn (Simple Past):
- Diễn tả hành động đã diễn ra và kết thúc hoàn toàn trong quá khứ tại một thời điểm xác định cụ thể (completed past actions with specific time markers).

3. Tương lai đơn (Simple Future):
- Diễn tả quyết định tức thời tại thời điểm nói, lời hứa, lời đe dọa, hoặc dự đoán không có căn cứ rõ ràng (spontaneous decisions, promises, predictions).

4. Hiện tại hoàn thành (Present Perfect):
- Diễn tả hành động bắt đầu trong quá khứ và vẫn đang tiếp diễn ở hiện tại, hoặc hành động vừa mới xảy ra và có ảnh hưởng trực tiếp đến hiện tại.
- Diễn tả kinh nghiệm cá nhân (life experiences).

**II. CÔNG THỨC CHI TIẾT & BẢNG SO SÁNH (Formula/Structure Tables)**

| Thì (Tense) | Khẳng định (Positive) | Phủ định (Negative) | Nghi vấn (Question) | Dấu hiệu nhận biết (Time Markers) |
|---|---|---|---|---|
| Simple Present | S + V(s/es) | S + do/does not + V | Do/Does + S + V? | often, usually, every day, monthly, annually, weekly |
| Simple Past | S + V-ed / V2 | S + did not + V | Did + S + V? | yesterday, ago, last week/month, in 2022, previously |
| Simple Future | S + will + V | S + will not + V | Will + S + V? | tomorrow, next week, soon, shortly, upcoming |
| Present Perfect | S + have/has + V3/ed | S + have/has not + V3/ed | Have/Has + S + V3/ed? | since, for, recently, lately, so far, over the past years |
| Past Perfect | S + had + V3/ed | S + had not + V3/ed | Had + S + V3/ed? | by the time + S + V2, before, after, prior to |`,
    toeicTips: `**III. CÁC BẪY/LỖI THƯỜNG GẶP TRONG BÀI THI TOEIC (Common Pitfalls/Mistakes in TOEIC)**

- Bẫy từ chỉ thời gian (Time Markers): TOEIC thường đưa ra các cụm từ chỉ thời gian như 'since 2021', 'for five years', 'over the last decade' nhưng gài các đáp án thì Hiện tại đơn hoặc Quá khứ đơn. Ghi nhớ: đi với 'since/for' chỉ khoảng/mốc thời gian kéo dài đến hiện tại luôn cần dùng Hiện tại hoàn thành (Present Perfect).
- Bẫy cấu trúc thời gian "By the time":
  - By the time + S + V_quá_khứ_đơn (V2/ed), S + had + V3/ed (Quá khứ hoàn thành).
  - By the time + S + V_hiện_tại_đơn (V(s/es)), S + will have + V3/ed (Tương lai hoàn thành).
- Bẫy động từ trạng thái (Stative Verbs): Các từ chỉ nhận thức, trạng thái như look, seem, understand, believe, know không bao giờ chia ở thì tiếp diễn (Progressive).

**IV. VÍ DỤ THỰC TẾ TRONG KINH DOANH (Business Examples & Translations)**

- Example 1: The marketing department launches a new promotional campaign every quarter to boost sales.
  -> Dịch: Bộ phận tiếp thị triển khai một chiến dịch quảng bá mới mỗi quý để tăng trưởng doanh số.
- Example 2: By the time the external auditor arrived, the accounting team had already prepared all the financial files.
  -> Dịch: Vào lúc kiểm toán viên độc lập đến, nhóm kế toán đã chuẩn bị xong toàn bộ hồ sơ tài chính.
- Example 3: We have worked with this supplier since we established our branch in Hanoi in 2022.
  -> Dịch: Chúng tôi đã hợp tác với nhà cung cấp này kể từ khi thành lập chi nhánh tại Hà Nội vào năm 2022.
- Example 4: The Board of Directors will meet tomorrow to discuss the upcoming merger and acquisition.
  -> Dịch: Ban giám đốc sẽ họp vào ngày mai để thảo luận về việc mua lại và sáp nhập sắp tới.`,
    questions: [
      {
        id: "tense_q1",
        questionText: "By the time the consultant arrived, the team _______ already completed the draft.",
        options: ["has", "had", "have", "having"],
        correctAnswer: "had",
        explanation: "'had' is correct because the past perfect tense ('had completed') is required to show an action that was completed before another past action ('arrived'). 'has' and 'have' are present perfect, and 'having' is a participle."
      },
      {
        id: "tense_q2",
        questionText: "She _______ for this advertising agency since 2021.",
        options: ["works", "worked", "has worked", "is working"],
        correctAnswer: "has worked",
        explanation: "'has worked' is correct because the time expression 'since 2021' triggers the present perfect tense. It denotes an action that started in past and is still true today. 'works' is present simple, 'worked' is past simple, and 'is working' is present progressive."
      },
      {
        id: "tense_q3",
        questionText: "The board of directors _______ tomorrow to discuss the annual budget.",
        options: ["meet", "meets", "will meet", "meeting"],
        correctAnswer: "will meet",
        explanation: "'will meet' is correct because the time adverb 'tomorrow' indicates a future action. 'meet' and 'meets' are present tense, and 'meeting' is a present participle/gerund."
      },
      {
        id: "tense_q4",
        questionText: "Last month, our sales department _______ a new record for quarterly revenue.",
        options: ["sets", "setted", "has set", "set"],
        correctAnswer: "set",
        explanation: "'set' is correct because 'last month' requires the simple past tense. The verb 'set' is irregular and its past simple form is 'set'. 'sets' is present, 'setted' is incorrect grammar, and 'has set' is present perfect."
      },
      {
        id: "tense_q5",
        questionText: "Usually, the receptionist _______ the incoming mail at 9:00 AM.",
        options: ["distribute", "distributes", "is distributing", "distributed"],
        correctAnswer: "distributes",
        explanation: "'distributes' is correct because 'Usually' indicates a regular habit, which requires the simple present tense. Since the subject 'the receptionist' is singular, the verb takes an '-s'. 'distribute' is the plural base form, 'is distributing' is progressive, and 'distributed' is past tense."
      }
    ]
  },
  {
    id: "subject-verb-agreement",
    title: "2. Subject-Verb Agreement",
    description: "Ensure your verbs match their subjects in number, even when separated by modifiers.",
    theory: `**I. QUY TẮC NGỮ PHÁP CHI TIẾT & NGỮ CẢNH SỬ DỤNG (Detailed Grammar Rules & Usage Scenarios)**

1. Quy tắc cơ bản:
- Chủ ngữ số ít đi với động từ số ít (chứa s/es ở thì hiện tại đơn), chủ ngữ số nhiều đi với động từ số nhiều (giữ nguyên mẫu).

2. Danh từ tập hợp (Collective Nouns):
- Các từ như committee (ủy ban), board (ban giám đốc), staff (nhân viên), team (nhóm) thường được xem như một thực thể số ít thống nhất trong TOEIC.

3. Đại từ bất định (Indefinite Pronouns):
- 'each', 'every', 'everyone', 'anyone', 'someone', 'nobody', 'everything' luôn đi kèm động từ số ít.

4. Cấu trúc đồng hành (Accompanied subjects):
- S1 + as well as / along with / together with / in addition to + S2 -> Động từ chính chia theo chủ ngữ thứ nhất (S1).

5. Cấu trúc lựa chọn và tương quan (Correlative Conjunctions):
- 'either S1 or S2', 'neither S1 nor S2', 'not only S1 but also S2' -> Động từ chia theo chủ ngữ gần nó nhất (S2).

**II. CÔNG THỨC & BẢNG TỔNG HỢP CẤU TRÚC (Formula/Structure Tables)**

| Dạng chủ ngữ (Subject Type) | Quy tắc chia động từ (Verb Agreement Rule) | Ví dụ minh họa (Example) |
|---|---|---|
| N1 + Prepositional Phrase + N2 | Động từ chia theo N1 (bỏ qua cụm giới từ ở giữa) | The list of vendors has been updated. |
| Each / Every + N (số ít) | Động từ chia số ít (Singular Verb) | Every applicant is required to submit. |
| Either S1 or S2 / Neither S1 nor S2 | Động từ chia theo S2 (chủ ngữ gần nhất) | Neither the manager nor the staff are here. |
| S1 + along with/as well as + S2 | Động từ chia theo S1 | The director, as well as his staff, is attending. |
| Gerund Phrase (V-ing...) | Động từ chia số ít (Singular Verb) | Analyzing market data requires experience. |`,
    toeicTips: `**III. CÁC BẪY/LỖI THƯỜNG GẶP TRONG BÀI THI TOEIC (Common Pitfalls/Mistakes in TOEIC)**

- Bẫy cụm giới từ chen ngang: Đề thi cực kỳ hay chèn các cụm giới từ dài như "of the newly proposed software applications" ngay sau chủ ngữ chính. Thí sinh thường nhìn vào danh từ số nhiều đứng ngay trước chỗ trống (applications) và chia động từ số nhiều. Ghi nhớ: xác định danh từ chính đứng TRƯỚC giới từ đầu tiên (ví dụ: 'The quality [of the materials] is...').
- Bẫy đại từ bất định đi kèm cụm giới từ: Cụm "Each of the projects..." thường bị chia động từ số nhiều do danh từ "projects". Thực chất "Each" mới là chủ ngữ chính và luôn đi với động từ số ít.
- Bẫy chủ ngữ là Danh động từ (Gerund phrase): Cụm từ bắt đầu bằng V-ing làm chủ ngữ luôn chia động từ ở dạng số ít.

**IV. VÍ DỤ THỰC TẾ TRONG KINH DOANH (Business Examples & Translations)**

- Example 1: The analysis of the market trends suggests that our product will be highly competitive.
  -> Dịch: Bản phân tích các xu hướng thị trường cho thấy sản phẩm của chúng ta sẽ có khả năng cạnh tranh cao.
- Example 2: Every employee in the regional offices is required to attend the safety workshop annually.
  -> Dịch: Mọi nhân viên tại các văn phòng khu vực đều được yêu cầu tham gia hội thảo an toàn hàng năm.
- Example 3: Neither the budget proposal nor the marketing strategies were approved by the steering committee.
  -> Dịch: Cả đề xuất ngân sách lẫn chiến lược tiếp thị đều không được thông qua bởi ban chỉ đạo.
- Example 4: Accessing company files without proper authorization is strictly prohibited.
  -> Dịch: Việc truy cập các tệp bảo mật của công ty mà không có sự cho phép thích hợp bị nghiêm cấm hoàn toàn.`,
    questions: [
      {
        id: "sva_q1",
        questionText: "The list of approved vendors _______ been updated.",
        options: ["has", "have", "having", "are"],
        correctAnswer: "has",
        explanation: "'has' is correct because the subject is 'The list' (singular), not 'vendors' (plural). Therefore, a singular auxiliary verb ('has') is required to form the present perfect passive. 'have' and 'are' are plural, and 'having' is a participle."
      },
      {
        id: "sva_q2",
        questionText: "Every applicant for the open positions _______ required to submit references.",
        options: ["is", "are", "were", "being"],
        correctAnswer: "is",
        explanation: "'is' is correct because subjects preceded by 'every' are singular and take a singular verb. 'are' and 'were' are plural verbs, and 'being' is a participle."
      },
      {
        id: "sva_q3",
        questionText: "Neither the project manager nor the employees _______ informed about the schedule change.",
        options: ["was", "were", "is", "being"],
        correctAnswer: "were",
        explanation: "'were' is correct because in 'neither ... nor ...' structures, the verb agrees in number with the closer subject. 'employees' is plural, so we need a plural past verb. 'was' and 'is' are singular, and 'being' is a participle."
      },
      {
        id: "sva_q4",
        questionText: "The results of the recent market research study _______ very promising.",
        options: ["seems", "seem", "is seeming", "was"],
        correctAnswer: "seem",
        explanation: "'seem' is correct because the subject is 'The results' (plural), not 'study' (singular). Plural subjects take the plural verb form without '-s'. 'seems' is singular, 'is seeming' is singular progressive, and 'was' is singular past."
      },
      {
        id: "sva_q5",
        questionText: "Accessing company files without proper authorization _______ strictly prohibited.",
        options: ["is", "are", "were", "being"],
        correctAnswer: "is",
        explanation: "'is' is correct because a gerund phrase ('Accessing company files...') acts as a singular subject and requires a singular verb. 'are' and 'were' are plural verbs, and 'being' is a participle."
      }
    ]
  },
  {
    id: "passive-voice",
    title: "3. Passive Voice",
    description: "Identify when a subject receives an action rather than performing it, a common TOEIC distractor.",
    theory: `**I. QUY TẮC NGỮ PHÁP CHI TIẾT & NGỮ CẢNH SỬ DỤNG (Detailed Grammar Rules & Usage Scenarios)**

1. Khái niệm thể bị động (Passive Voice):
- Được dùng khi chủ ngữ nhận hành động thay vì thực hiện hành động. Thể bị động rất phổ biến trong tài liệu hành chính, báo cáo kinh doanh để tăng tính trang trọng và khách quan.

2. Điều kiện sử dụng:
- Chỉ ngoại động từ (transitive verbs - động từ bắt buộc có tân ngữ đi kèm) mới dùng được ở thể bị động. Các nội động từ (intransitive verbs như happen, occur, rise, fall, arrive, remain, exist) KHÔNG bao giờ chia ở thể bị động.

3. Cấu trúc cơ bản:
- Bị động luôn có cấu trúc cốt lõi là 'be + V3/ed' (quá khứ phân từ). Thì của câu được chia ở động từ 'be'.

**II. CÔNG THỨC CÁC THÌ BỊ ĐỘNG PHỔ BIẾN (Passive Voice Formula Table)**

| Thì (Tense) | Thể chủ động (Active) | Thể bị động (Passive) |
|---|---|---|
| Present Simple | S + V(s/es) + O | S + is/are/am + V3/ed (+ by O) |
| Past Simple | S + V2/ed + O | S + was/were + V3/ed (+ by O) |
| Future Simple | S + will + V + O | S + will be + V3/ed (+ by O) |
| Present Continuous | S + is/are/am + V-ing + O | S + is/are/am + being + V3/ed (+ by O) |
| Present Perfect | S + have/has + V3/ed + O | S + have/has + been + V3/ed (+ by O) |
| Modal Verbs | S + modal + V + O | S + modal + be + V3/ed (+ by O) |`,
    toeicTips: `**III. CÁC BẪY/LỖI THƯỜNG GẶP TRONG BÀI THI TOEIC (Common Pitfalls/Mistakes in TOEIC)**

- Bẫy phát hiện Tân ngữ (Object-detecting technique):
  - Nhìn ngay sau khoảng trống cần điền động từ. Nếu có một Tân ngữ trực tiếp (danh từ hoặc cụm danh từ) -> Chọn động từ thể Chủ động.
  - Nếu không có Tân ngữ trực tiếp (theo sau bởi một giới từ như 'by', 'to', 'for', hoặc một trạng từ, hoặc dấu chấm câu) -> Chọn động từ thể Bị động.
- Bẫy nội động từ (Intransitive Verbs): Tránh chọn dạng bị động cho các nội động từ như "occur" (was occurred là sai), "exist" (is existed là sai), "remain" (were remained là sai).
- Bẫy cấu trúc bị động đặc biệt với động từ chỉ ý kiến/yêu cầu: 'be requested to-V', 'be scheduled to-V', 'be required to-V'.

**IV. VÍ DỤ THỰC TẾ TRONG KINH DOANH (Business Examples & Translations)**

- Example 1: The annual financial report must be submitted to the Board of Directors by next Monday.
  -> Dịch: Báo cáo tài chính thường niên phải được đệ trình lên Ban giám đốc trước thứ Hai tới.
- Example 2: A new employee onboarding program was introduced by the human resources department last week.
  -> Dịch: Chương trình hội nhập cho nhân viên mới đã được bộ phận nhân sự giới thiệu vào tuần trước.
- Example 3: All factory safety procedures must be strictly followed at all times by the production staff.
  -> Dịch: Tất cả các quy trình an toàn nhà máy phải được tuân thủ nghiêm ngặt mọi lúc bởi nhân viên sản xuất.
- Example 4: The promotional materials are being printed at the local publisher and will be delivered soon.
  -> Dịch: Các tài liệu quảng cáo đang được in tại nhà xuất bản địa phương và sẽ sớm được giao.`,
    questions: [
      {
        id: "pass_q1",
        questionText: "The annual financial report must _______ to the Board of Directors by Monday.",
        options: ["submit", "be submitted", "submitting", "be submitting"],
        correctAnswer: "be submitted",
        explanation: "'be submitted' is correct because the subject 'report' receives the action of submitting, requiring a passive construction. After the modal verb 'must', the passive is formed with 'be + past participle (V3)'. 'submit' is active base, 'submitting' is active participle, and 'be submitting' is active progressive."
      },
      {
        id: "pass_q2",
        questionText: "A new employee training program _______ by the HR department last week.",
        options: ["introduce", "introduced", "was introduced", "is introducing"],
        correctAnswer: "was introduced",
        explanation: "'was introduced' is correct because the program receives the action of being introduced (passive voice), and 'last week' indicates simple past tense. 'introduce' is active base, 'introduced' is active simple past, and 'is introducing' is active progressive."
      },
      {
        id: "pass_q3",
        questionText: "All factory safety procedures _______ followed at all times.",
        options: ["must be", "must", "must having", "must been"],
        correctAnswer: "must be",
        explanation: "'must be' is correct because safety procedures receive the action of being followed, requiring the modal passive 'must be + V3 (followed)'. 'must' alone would make it active, which makes no sense here as procedures cannot follow anything. 'must having' and 'must been' are ungrammatical."
      },
      {
        id: "pass_q4",
        questionText: "The confidential documents _______ to the main server last night.",
        options: ["transferred", "were transferred", "transferring", "were transfer"],
        correctAnswer: "were transferred",
        explanation: "'were transferred' is correct because the documents did not transfer themselves; they were transferred (passive past plural). 'transferred' is active past, 'transferring' is participle, and 'were transfer' is ungrammatical."
      },
      {
        id: "pass_q5",
        questionText: "The contract agreements _______ signed by both business parties next week.",
        options: ["will", "will be", "is signing", "will been"],
        correctAnswer: "will be",
        explanation: "'will be' is correct because the future passive 'will be + V3 (signed)' is needed due to the time indicator 'next week' and the passive agent 'by both business parties'. 'will' alone is active, 'is signing' is active present progressive, and 'will been' is ungrammatical."
      }
    ]
  },
  {
    id: "gerunds-infinitives",
    title: "4. Gerunds & Infinitives",
    description: "Learn which verbs take gerunds (-ing) and which take infinitives (to-V) as objects.",
    theory: `**I. QUY TẮC NGỮ PHÁP CHI TIẾT & NGỮ CẢNH SỬ DỤNG (Detailed Grammar Rules & Usage Scenarios)**

1. Danh động từ (Gerund - V-ing):
- Sử dụng làm chủ ngữ của câu (e.g. 'Advertising is expensive').
- Làm tân ngữ của một số động từ cụ thể.
- Đứng sau bất kỳ giới từ nào (in, on, at, for, about, through, without...).

2. Động từ nguyên mẫu có to (To-Infinitive - to V):
- Diễn tả mục đích thực hiện hành động.
- Làm tân ngữ của một số động từ cụ thể.
- Đi sau các tính từ chỉ thái độ, tính chất (e.g. 'It is difficult to finish').

3. Động từ nguyên mẫu không to (Bare Infinitive - V):
- Đi sau động từ khuyết thiếu (modal verbs) hoặc động từ chỉ giác quan (see, hear, notice).
- Cấu trúc cầu khiến: 'make / let / have + Object + V (bare)'.

**II. CÔNG THỨC & BẢNG PHÂN LOẠI ĐỘNG TỪ (Verb Classification Table)**

| Động từ theo sau bởi Gerund (V-ing) | Động từ theo sau bởi To-Infinitive (to V) | Giới từ + Gerund (Preposition + V-ing) |
|---|---|---|
| avoid, postpone, delay, consider | agree, decide, fail, hope, plan | look forward to + V-ing |
| recommend, suggest, mind, finish | manage, promise, refuse, offer | be committed to + V-ing |
| keep, deny, admit, appreciate | volunteer, tend, hesitate, prepare | apologize for + V-ing |
| involve, risk, discuss, practice | learn, afford, demand, deserve | succeeded in + V-ing |`,
    toeicTips: `**III. CÁC BẪY/LỖI THƯỜNG GẶP TRONG BÀI THI TOEIC (Common Pitfalls/Mistakes in TOEIC)**

- Bẫy từ "To" đóng vai trò làm Giới từ: Trong tiếng Anh có các cụm từ phổ biến mà "to" là giới từ, do đó động từ đi kèm PHẢI ở dạng V-ing. Thí sinh rất dễ chọn to-V theo thói quen.
  - 'look forward to' + V-ing (trông đợi)
  - 'be committed to / be dedicated to / be devoted to' + V-ing (cam kết/cống hiến làm gì)
  - 'object to' + V-ing (phản đối)
- Bẫy danh động từ đứng sau danh từ sở hữu (Possessive adjectives): Cấu trúc 'possessive adjective + V-ing' (ví dụ: 'appreciated his managing the project').
- Động từ thay đổi ý nghĩa:
  - 'Stop + to V': Dừng lại để làm gì. / 'Stop + V-ing': Ngừng hẳn việc đang làm.
  - 'Remember/Forget/Regret + to V': Nhớ/quên/tiếc sẽ phải làm gì. / '+ V-ing': Nhớ/quên/tiếc đã làm gì.

**IV. VÍ DỤ THỰC TẾ TRONG KINH DOANH (Business Examples & Translations)**

- Example 1: The management board decided to postpone the launch of the new product line due to supply chain issues.
  -> Dịch: Ban quản lý đã quyết định hoãn việc ra mắt dòng sản phẩm mới do các vấn đề về chuỗi cung ứng.
- Example 2: She suggested rescheduling the marketing strategy meeting until next Thursday afternoon.
  -> Dịch: Cô ấy đề xuất dời lịch cuộc họp chiến lược tiếp thị sang chiều thứ Năm tuần tới.
- Example 3: We are looking forward to receiving your constructive feedback on the newly proposed marketing budget.
  -> Dịch: Chúng tôi rất mong nhận được những phản hồi mang tính xây dựng của bạn về ngân sách tiếp thị mới được đề xuất.
- Example 4: The IT technician failed to fix the system database error before the backup servers went offline.
  -> Dịch: Kỹ thuật viên CNTT đã không thể sửa được lỗi cơ sở dữ liệu hệ thống trước khi các máy chủ sao lưu ngắt kết nối.`,
    questions: [
      {
        id: "gi_q1",
        questionText: "The company board decided _______ the launch of the new product line.",
        options: ["postponing", "to postpone", "postpone", "postponed"],
        correctAnswer: "to postpone",
        explanation: "'to postpone' is correct because the verb 'decide' must be followed by a to-infinitive. 'postponing' is a gerund, 'postpone' is base form, and 'postponed' is past form."
      },
      {
        id: "gi_q2",
        questionText: "She suggested _______ the strategy meeting until next Thursday afternoon.",
        options: ["rescheduling", "to reschedule", "reschedule", "rescheduled"],
        correctAnswer: "rescheduling",
        explanation: "'rescheduling' is correct because the verb 'suggest' is followed by a gerund (-ing form). 'to reschedule' is an infinitive, 'reschedule' is base form, and 'rescheduled' is past form."
      },
      {
        id: "gi_q3",
        questionText: "We are looking forward to _______ you at the upcoming annual conference.",
        options: ["see", "seeing", "to see", "seen"],
        correctAnswer: "seeing",
        explanation: "'seeing' is correct because in the phrase 'look forward to', 'to' acts as a preposition, which must be followed by a gerund (-ing). 'see' is base form, 'to see' duplicates the 'to', and 'seen' is past participle."
      },
      {
        id: "gi_q4",
        questionText: "The IT technician failed _______ the software system error in time.",
        options: ["fixing", "to fix", "fix", "fixed"],
        correctAnswer: "to fix",
        explanation: "'to fix' is correct because the verb 'fail' must be followed by a to-infinitive. 'fixing' is a gerund, 'fix' is base form, and 'fixed' is past form."
      },
      {
        id: "gi_q5",
        questionText: "All employees are highly encouraged _______ safety goggles while in the factory.",
        options: ["wearing", "to wear", "wear", "wore"],
        correctAnswer: "to wear",
        explanation: "'to wear' is correct because the structure is 'encourage + someone + to-infinitive'. In the passive form, it becomes 'be encouraged + to-infinitive'. 'wearing' is gerund, 'wear' is base form, and 'wore' is past simple."
      }
    ]
  },
  {
    id: "relative-clauses",
    title: "5. Relative Clauses",
    description: "Connect ideas using relative pronouns (who, whom, which, that, whose) correctly.",
    theory: `**I. QUY TẮC NGỮ PHÁP CHI TIẾT & NGỮ CẢNH SỬ DỤNG (Detailed Grammar Rules & Usage Scenarios)**

1. Đại từ quan hệ (Relative Pronouns):
- Dùng để kết nối hai mệnh đề độc lập và bổ nghĩa cho danh từ đứng trước.
  - Who: Thay thế danh từ chỉ người, làm chủ ngữ (theo sau là Động từ).
  - Whom: Thay thế danh từ chỉ người, làm tân ngữ (theo sau là Chủ ngữ + Động từ).
  - Which: Thay thế danh từ chỉ vật/sự việc, làm chủ ngữ hoặc tân ngữ.
  - That: Có thể thay thế cho who, whom, which trong mệnh đề quan hệ xác định (không đứng sau dấu phẩy hoặc giới từ).
  - Whose: Chỉ sở hữu cho cả người và vật. Đứng giữa hai danh từ (N1 + whose + N2).

2. Rút gọn mệnh đề quan hệ (Reduced Relative Clauses):
- Dạng chủ động: Lược bỏ đại từ quan hệ và to-be, chuyển động từ sang dạng V-ing.
- Dạng bị động: Lược bỏ đại từ quan hệ và to-be, giữ nguyên động từ ở dạng V3/ed.

**II. CÔNG THỨC & BẢNG TỔNG HỢP ĐẠI TỪ QUAN HỆ (Relative Pronouns Table)**

| Đại từ (Pronoun) | Danh từ đứng trước (Antecedent) | Vai trò trong mệnh đề (Role) | Cấu trúc câu (Structure) |
|---|---|---|---|
| Who | Người (People) | Chủ ngữ (Subject) | N (people) + WHO + Verb + O |
| Whom | Người (People) | Tân ngữ (Object) | N (people) + WHOM + S + Verb |
| Which | Vật (Things) | Chủ ngữ / Tân ngữ | N (things) + WHICH + Verb/Clause |
| Whose | Người / Vật | Sở hữu (Possessive) | N1 + WHOSE + N2 (danh từ trần) |
| Where | Nơi chốn (Places) | Trạng từ quan hệ | N (place) + WHERE + S + V |`,
    toeicTips: `**III. CÁC BẪY/LỖI THƯỜNG GẶP TRONG BÀI THI TOEIC (Common Pitfalls/Mistakes in TOEIC)**

- Bẫy rút gọn mệnh đề quan hệ (Crucial Trap): Khi trong câu đã có động từ chính hoàn chỉnh, nếu xuất hiện một chỗ trống điền động từ thứ hai bổ nghĩa cho danh từ đứng trước, đó chính là dạng rút gọn mệnh đề quan hệ.
  - Dùng V-ing nếu danh từ tự thực hiện hành động (chủ động).
  - Dùng V3/ed nếu danh từ nhận hành động từ bên ngoài (bị động).
  - Ví dụ: 'The proposal [submitted] by the coordinator is excellent.' (submitted bổ nghĩa cho proposal).
- Bẫy phân biệt "Whose" và "Who/Whom": Để nhận biết 'whose', hãy kiểm tra xem từ đứng ngay sau chỗ trống có phải là một danh từ trần (không có a, an, the, this, these...) hay không. Nếu có danh từ trần, hãy chọn 'whose'.
- Giới từ đi với đại từ quan hệ: Chỉ có 'whom' hoặc 'which' được phép đứng ngay sau giới từ (ví dụ: 'the group with whom', 'the email in which' - không bao giờ dùng 'with who' hoặc 'in that').

**IV. VÍ DỤ THỰC TẾ TRONG KINH DOANH (Business Examples & Translations)**

- Example 1: The job candidate who was interviewed yesterday had excellent professional references.
  -> Dịch: Ứng viên xin việc người mà được phỏng vấn ngày hôm qua có những thư giới thiệu chuyên môn xuất sắc.
- Example 2: This is the modern conference office where the monthly budget review meetings are held.
  -> Dịch: Đây là văn phòng hội nghị hiện đại nơi mà các cuộc họp đánh giá ngân sách hàng tháng được tổ chức.
- Example 3: The client whose project we completed last month was extremely satisfied with our services.
  -> Dịch: Khách hàng có dự án mà chúng tôi hoàn thành tuần trước đã vô cùng hài lòng với dịch vụ của chúng tôi.
- Example 4: The executive manager whom you spoke with yesterday has approved the software purchase request.
  -> Dịch: Giám đốc điều hành người mà bạn đã nói chuyện cùng ngày hôm qua đã phê duyệt yêu cầu mua phần mềm.`,
    questions: [
      {
        id: "rc_q1",
        questionText: "The job candidate _______ was interviewed yesterday had excellent references.",
        options: ["whom", "who", "which", "whose"],
        correctAnswer: "who",
        explanation: "'who' is correct because it serves as the subject of the relative clause modifying a person ('candidate'). 'whom' is an object pronoun, 'which' modifies things, and 'whose' is possessive."
      },
      {
        id: "rc_q2",
        questionText: "This is the office _______ the monthly budget meetings are held.",
        options: ["which", "where", "when", "whose"],
        correctAnswer: "where",
        explanation: "'where' is correct because the relative adverb 'where' is needed to refer to a place ('office') in which an action happens. 'which' would require a preposition like 'in which' or 'at which' to be grammatically correct here. 'when' refers to time, and 'whose' refers to possession."
      },
      {
        id: "rc_q3",
        questionText: "The client _______ project we completed last month was extremely satisfied.",
        options: ["who", "whom", "whose", "which"],
        correctAnswer: "whose",
        explanation: "'whose' is correct because we need a possessive relative pronoun linking the 'client' and their 'project' ('the client's project'). 'who' and 'whom' are subjective/objective pronouns, and 'which' modifies things, not people."
      },
      {
        id: "rc_q4",
        questionText: "The manager _______ you spoke with yesterday has approved the purchase request.",
        options: ["who", "whom", "which", "whose"],
        correctAnswer: "whom",
        explanation: "'whom' is correct because it serves as the object of the preposition 'with' inside the relative clause ('you spoke with him'). In formal English, 'whom' is used for object relative pronouns representing people. 'who' is subjective, 'which' is for things, and 'whose' is possessive."
      },
      {
        id: "rc_q5",
        questionText: "The technical report _______ she wrote was sent directly to the director.",
        options: ["who", "whom", "which", "where"],
        correctAnswer: "which",
        explanation: "'which' is correct because it is a relative pronoun referring to a thing ('report'). 'who' and 'whom' refer to people, and 'where' refers to places."
      }
    ]
  },
  {
    id: "conditionals",
    title: "6. Conditionals",
    description: "Master conditional structures (if clauses) and the demand/request subjunctive structure.",
    theory: `**I. QUY TẮC NGỮ PHÁP CHI TIẾT & NGỮ CẢNH SỬ DỤNG (Detailed Grammar Rules & Usage Scenarios)**

1. Các loại câu điều kiện (Conditional Sentences):
- Loại 1 (Có thật ở hiện tại/tương lai): Dùng để dự đoán các sự kiện có thể xảy ra trong tương lai nếu điều kiện được đáp ứng.
- Loại 2 (Giả định trái với hiện tại): Tình huống giả tưởng, không thể xảy ra ở hiện tại. Lưu ý: Động từ 'be' luôn chia là 'were' cho tất cả các ngôi.
- Loại 3 (Giả định trái với quá khứ): Diễn tả sự tiếc nuối hoặc suy đoán về một sự kiện đã xảy ra và kết thúc trong quá khứ.

2. Thể giả định (Subjunctive Mood):
- Sau các động từ mang tính yêu cầu, đề nghị, khuyên bảo (như suggest, recommend, insist, require, request, demand, mandate) + THAT + S2 + V (nguyên thể không to - base form).
- Sau các tính từ mang tính cấp bách, quan trọng (như essential, vital, crucial, important, imperative, necessary) + THAT + S2 + V (nguyên thể không to - base form).
- Quy tắc này áp dụng cho mọi chủ ngữ ở mệnh đề sau 'that', kể cả chủ ngữ số ít như he/she/it.

**II. CÔNG THỨC CÂU ĐIỀU KIỆN & THỂ GIẢ ĐỊNH (Conditionals & Subjunctive Formulas)**

| Loại điều kiện (Type) | Mệnh đề IF (If-Clause) | Mệnh đề chính (Main Clause) | Dạng đảo ngữ (Inversion) |
|---|---|---|---|
| Conditional Type 1 | If + S + V(s/es) | S + will/can/should + V | Should + S + V, S + will + V |
| Conditional Type 2 | If + S + V2/ed (be -> were) | S + would/could + V | Were + S + to V, S + would + V |
| Conditional Type 3 | If + S + had + V3/ed | S + would have + V3/ed | Had + S + V3/ed, S + would have + V3... |
| Subjunctive Mood | S + suggest/recommend that | S2 + V (base form) | (Cấu trúc giả định không có đảo ngữ) |`,
    toeicTips: `**III. CÁC BẪY/LỖI THƯỜNG GẶP TRONG BÀI THI TOEIC (Common Pitfalls/Mistakes in TOEIC)**

- Bẫy động từ thể giả định (The Subjunctive Trap): Đây là điểm ngữ pháp cực kỳ phổ biến trong TOEIC.
  - Ví dụ: 'It is essential that every employee [follow] the rules.' (Mặc dù 'every employee' là số ít, động từ vẫn là 'follow' nguyên thể, không phải 'follows').
  - Rất nhiều người học chọn dạng số ít hoặc quá khứ theo thói quen ngữ cảnh.
- Đảo ngữ câu điều kiện loại 3 (Inversion of Type 3): Câu đảo ngữ sẽ bỏ 'if' và đưa 'had' lên đầu câu: 'Had we known about the software issue, we would have postponed the launch.' Hãy nhận biết cấu trúc này để chọn mệnh đề chính dạng 'would have + V3'.
- Lẫn lộn giữa loại 2 (hiện tại giả định) và loại 3 (quá khứ giả định): Hãy tìm các trạng từ chỉ thời gian trong câu để xác định đúng loại điều kiện.

**IV. VÍ DỤ THỰC TẾ TRONG KINH DOANH (Business Examples & Translations)**

- Example 1: If the sales department meets the monthly target, everyone in the team will receive a performance bonus.
  -> Dịch: Nếu bộ phận bán hàng đạt được mục tiêu hàng tháng, tất cả mọi người trong nhóm sẽ nhận được tiền thưởng hiệu suất.
- Example 2: The executive director recommended that he attend the leadership training seminar next month.
  -> Dịch: Giám đốc điều hành đã khuyến nghị rằng anh ấy nên tham gia hội thảo đào tạo lãnh đạo vào tháng tới.
- Example 3: If we had had more financial resources last year, we would have completed the infrastructure project on time.
  -> Dịch: Nếu chúng tôi có nhiều tài nguyên tài chính hơn vào năm ngoái, chúng tôi đã hoàn thành dự án cơ sở hạ tầng đúng hạn.
- Example 4: It is essential that each employee follow the newly updated safety regulations in the factory area.
  -> Dịch: Điều thiết yếu là mỗi nhân viên phải tuân thủ các quy định an toàn mới được cập nhật trong khu vực nhà máy.`,
    questions: [
      {
        id: "cs_q1",
        questionText: "If the sales department _______ the monthly target, everyone will receive a bonus.",
        options: ["meets", "meet", "will meet", "met"],
        correctAnswer: "meets",
        explanation: "'meets' is correct because it is a first conditional sentence (real future). The 'if'-clause takes present simple tense ('meets' for third-person singular 'department') while the main clause has 'will + verb'."
      },
      {
        id: "cs_q2",
        questionText: "The executive director recommended that he _______ the leadership training seminar.",
        options: ["attends", "attend", "attended", "should attends"],
        correctAnswer: "attend",
        explanation: "'attend' is correct because the verb 'recommended' triggers the subjunctive mood in the following 'that'-clause. Subjunctive verbs must be in their base form ('attend'), regardless of the subject ('he'). 'attends' is singular present, 'attended' is past, and 'should attends' is ungrammatical."
      },
      {
        id: "cs_q3",
        questionText: "If we _______ more financial resources last year, we would have completed the project on time.",
        options: ["have", "had", "had had", "would have"],
        correctAnswer: "had had",
        explanation: "'had had' is correct because this is a third conditional sentence expressing a hypothetical past condition. The 'if'-clause requires past perfect ('had had') to pair with 'would have completed' in the main clause."
      },
      {
        id: "cs_q4",
        questionText: "It is essential that each employee _______ the newly updated safety regulations.",
        options: ["follows", "follow", "followed", "following"],
        correctAnswer: "follow",
        explanation: "'follow' is correct because the adjective 'essential' triggers the subjunctive mood in the 'that'-clause. The verb must be in its base form ('follow'), despite the singular subject 'each employee'. 'follows' is singular present, 'followed' is past, and 'following' is a participle."
      },
      {
        id: "cs_q5",
        questionText: "If I _______ you, I would accept the job offer immediately.",
        options: ["am", "was", "were", "be"],
        correctAnswer: "were",
        explanation: "'were' is correct because it is a second conditional sentence (hypothetical present). In the 'if'-clause of second conditionals, 'were' is used for all subjects of the verb 'be'. 'am' and 'was' are not used in hypothetical conditions, and 'be' is base form."
      }
    ]
  },
  {
    id: "conjunctions-prepositions",
    title: "7. Conjunctions & Prepositions",
    description: "Learn to distinguish between conjunctions (followed by a clause) and prepositions (followed by a noun phrase).",
    theory: `**I. QUY TẮC NGỮ PHÁP CHI TIẾT & NGỮ CẢNH SỬ DỤNG (Detailed Grammar Rules & Usage Scenarios)**

1. Bản chất ngữ pháp cốt lõi:
- Liên từ (Conjunctions): Được dùng để liên kết các mệnh đề phụ với mệnh đề chính. Theo sau liên từ luôn là một mệnh đề hoàn chỉnh chứa Chủ ngữ và Động từ chia thì (S + V).
  - Ví dụ: 'Although the weather was bad, we started our trip.'
- Giới từ (Prepositions): Được dùng để chỉ mối quan hệ giữa danh từ với các thành phần khác. Theo sau giới từ luôn là Danh từ, Cụm danh từ hoặc Danh động từ (Noun / Noun Phrase / V-ing).
  - Ví dụ: 'Despite the bad weather, we started our trip.'

2. Phương pháp làm bài TOEIC:
- Nhìn vào cụm từ đứng ngay sau khoảng trống cần điền:
  - Nếu xuất hiện một động từ đã được chia thì -> Chọn Liên từ (Conjunction).
  - Nếu chỉ thấy cụm danh từ hoặc V-ing (không có động từ chia thì của mệnh đề) -> Chọn Giới từ (Preposition).

**II. CẤU TRÚC & BẢNG SO SÁNH LIÊN TỪ VỚI GIỚI TỪ (Conjunction vs Preposition Tables)**

| Ý nghĩa (Meaning) | Liên từ (+ Mệnh đề: S + V) | Giới từ (+ Cụm danh từ / V-ing) |
|---|---|---|
| Bởi vì (Because/Since) | because, since, as, now that | because of, due to, owing to, on account of |
| Mặc dù (Although/Despite) | although, even though, though | despite, in spite of, regardless of |
| Trong khi (While/During) | while, whereas | during |
| Trừ khi / Nếu không (Unless) | unless | without |`,
    toeicTips: `**III. CÁC BẪY/LỖI THƯỜNG GẶP TRONG BÀI THI TOEIC (Common Pitfalls/Mistakes in TOEIC)**

- Bẫy danh từ tận cùng bằng mệnh đề quan hệ (Modifier Trap):
  - TOEIC thường chèn thêm mệnh đề quan hệ phía sau để làm câu trông có vẻ như một mệnh đề đầy đủ.
  - Ví dụ: '_______ the economic downturn that has affected many businesses, we managed to grow.'
  - 'downturn' là danh từ chính, còn 'that has affected...' chỉ là mệnh đề quan hệ bổ nghĩa. Vì không có động từ chính cho 'downturn', vị trí này cần điền Giới từ (Despite/Because of) chứ không phải Liên từ (Although/Because).
- Bẫy từ mang cả hai vai trò (Dual-role words): Một số từ như 'since', 'until', 'before', 'after' vừa đóng vai trò là liên từ vừa là giới từ nên có thể đứng trước cả mệnh đề và cụm danh từ.
- Bẫy "Unless" vs "Without": Cả hai đều mang nghĩa điều kiện phủ định (trừ khi / nếu không có), nhưng 'unless' là liên từ (+ mệnh đề) and 'without' là giới từ (+ danh từ/V-ing).

**IV. VÍ DỤ THỰC TẾ TRONG KINH DOANH (Business Examples & Translations)**

- Example 1: The outdoor corporate event was canceled because of the sudden heavy rain forecast.
  -> Dịch: Sự kiện ngoài trời của công ty đã bị hủy do dự báo thời tiết có mưa lớn đột ngột.
- Example 2: Although the marketing team worked overtime last week, they could not meet the tight project deadline.
  -> Dịch: Mặc dù nhóm tiếp thị đã làm việc tăng ca vào tuần trước, họ vẫn không thể đáp ứng thời hạn dự án gấp rút.
- Example 3: Employees are not allowed to access the laboratory area unless they show their security ID cards.
  -> Dịch: Nhân viên không được phép truy cập vào khu vực phòng thí nghiệm trừ khi họ xuất trình thẻ ID an ninh.
- Example 4: Mr. Kim was chosen to lead the strategy committee due to his extensive experience in international relations.
  -> Dịch: Ông Kim được chọn để dẫn dắt ủy ban chiến lược nhờ vào kinh nghiệm dày dặn của ông trong quan hệ quốc tế.`,
    questions: [
      {
        id: "cp_q1",
        questionText: "The outdoor event was canceled _______ the heavy rain forecast.",
        options: ["because", "because of", "although", "despite"],
        correctAnswer: "because of",
        explanation: "'because of' is correct because 'the heavy rain forecast' is a noun phrase, requiring a preposition. 'because' and 'although' are conjunctions that must be followed by a clause (subject + verb)."
      },
      {
        id: "cp_q2",
        questionText: "_______ the marketing team worked overtime, they could not meet the project deadline.",
        options: ["Although", "Despite", "Because", "In spite of"],
        correctAnswer: "Although",
        explanation: "'Although' is correct because 'the marketing team worked overtime' is a complete clause (subject + verb), which requires a subordinating conjunction. 'Despite' and 'In spite of' are prepositions and must be followed by a noun phrase or gerund."
      },
      {
        id: "cp_q3",
        questionText: "Employees are not allowed to access the building _______ they show their security ID cards.",
        options: ["unless", "without", "except", "if not"],
        correctAnswer: "unless",
        explanation: "'unless' is correct because it is a conjunction meaning 'if... not' and introduces a clause ('they show their security ID cards'). 'without' is a preposition, and 'except' is usually a preposition."
      },
      {
        id: "cp_q4",
        questionText: "Mr. Kim was chosen to lead the committee _______ his extensive experience in international relations.",
        options: ["due to", "because", "since", "as"],
        correctAnswer: "due to",
        explanation: "'due to' is correct because 'his extensive experience in international relations' is a noun phrase, which must be introduced by a preposition. 'because', 'since', and 'as' are conjunctions."
      },
      {
        id: "cp_q5",
        questionText: "The company reported high profits last quarter _______ the economic downturn.",
        options: ["despite", "although", "because", "while"],
        correctAnswer: "despite",
        explanation: "'despite' is correct because 'the economic downturn' is a noun phrase, requiring a preposition to express contrast. 'although' and 'while' are conjunctions that must introduce a clause."
      }
    ]
  }
];
