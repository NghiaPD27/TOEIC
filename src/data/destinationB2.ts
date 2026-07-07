export interface B2PhrasalVerb {
  phrase: string;
  definition: string;
  example: string;
  translation: string;
}

export interface B2Collocation {
  phrase: string;
  type: 'prepositional' | 'collocation' | 'pattern';
  meaning: string;
  example: string;
  translation: string;
}

export interface B2WordFamily {
  verb: string;
  noun: string;
  adjective: string;
  adverb: string;
}

export interface B2VerbPattern {
  verb: string;
  toMeaning: string;
  toExample: string;
  toTranslation: string;
  ingMeaning: string;
  ingExample: string;
  ingTranslation: string;
}

export interface B2TopicWord {
  word: string;
  partOfSpeech: string;
  ipa: string;
  definition: string;
  example: string;
  translation: string;
  topic?: string; // Optional topic field to allow topic filtering
}

export const b2PhrasalVerbs: B2PhrasalVerb[] = [
  { phrase: "add up", definition: "có nghĩa, hợp lý, khớp dữ kiện", example: "Her story just doesn't add up.", translation: "Câu chuyện của cô ấy không hợp lý chút nào." },
  { phrase: "blow up", definition: "phát nổ, làm nổ tung / tức giận", example: "The dynamite blew up the old building.", translation: "Thuốc nổ đã làm nổ tung tòa nhà cũ." },
  { phrase: "call off", definition: "hủy bỏ (cuộc họp, sự kiện)", example: "The manager decided to call off the meeting.", translation: "Quản lý đã quyết định hủy bỏ cuộc họp." },
  { phrase: "carry on", definition: "tiếp tục làm gì đó", example: "Please carry on with your work.", translation: "Xin hãy tiếp tục làm việc của bạn." },
  { phrase: "catch up with", definition: "đuổi kịp, theo kịp ai đó", example: "Go on ahead, I'll catch up with you later.", translation: "Cứ đi trước đi, tôi sẽ đuổi kịp bạn sau." },
  { phrase: "clear up", definition: "thời tiết sáng sủa lên / dọn dẹp sạch", example: "I hope the weather clears up soon.", translation: "Tôi hy vọng thời tiết sẽ sớm sáng sủa lên." },
  { phrase: "come across", definition: "tình cờ gặp, tình cờ thấy", example: "I came across an old photo in the drawer.", translation: "Tôi tình cờ thấy một bức ảnh cũ trong ngăn kéo." },
  { phrase: "count on", definition: "tin cậy vào, trông cậy vào", example: "You can always count on me for help.", translation: "Bạn luôn có thể trông cậy vào sự giúp đỡ của tôi." },
  { phrase: "cut down on", definition: "giảm bớt tiêu thụ/sử dụng", example: "We need to cut down on energy expenses.", translation: "Chúng ta cần giảm bớt chi phí năng lượng." },
  { phrase: "do up", definition: "trang trí, sửa sang / thắt, cài dây", example: "They spent weeks doing up their new office.", translation: "Họ đã dành hàng tuần để sửa sang lại văn phòng mới." },
  { phrase: "fall out with", definition: "bất hòa, cãi cọ với ai đó", example: "He fell out with his partner over money.", translation: "Anh ấy đã bất hòa with cộng sự của mình vì chuyện tiền bạc." },
  { phrase: "find out", definition: "tìm ra, phát hiện ra thông tin", example: "I will call to find out the flight schedule.", translation: "Tôi sẽ gọi điện để tìm hiểu lịch trình chuyến bay." },
  { phrase: "get away with", definition: "thoát tội, không bị phạt", example: "The thief got away with the money.", translation: "Kẻ trộm đã trốn thoát cùng với số tiền." },
  { phrase: "get over", definition: "vượt qua, hồi phục (sau bệnh, cú sốc)", example: "It took her months to get over the loss.", translation: "Cô ấy mất hàng tháng trời để vượt qua sự mất mát." },
  { phrase: "give up", definition: "từ bỏ, ngừng làm gì đó", example: "Never give up on your dreams.", translation: "Đừng bao giờ từ bỏ ước mơ của bạn." },
  { phrase: "go off", definition: "phát nổ / reo chuông / hỏng, ôi thiu", example: "The alarm went off at 6:00 AM.", translation: "Chuông báo thức đã reo vào lúc 6 giờ sáng." },
  { phrase: "grow up", definition: "trưởng thành, lớn lên", example: "He grew up in a small town.", translation: "Anh ấy đã lớn lên ở một thị trấn nhỏ." },
  { phrase: "keep up with", definition: "bắt kịp, theo kịp tốc độ/xu hướng", example: "It is hard to keep up with modern technology.", translation: "Thật khó để bắt kịp công nghệ hiện đại." },
  { phrase: "look after", definition: "chăm sóc, trông nom", example: "Who will look after the pets while you're away?", translation: "Ai sẽ chăm sóc thú cưng khi bạn đi vắng?" },
  { phrase: "look forward to", definition: "mong đợi, trông chờ điều gì", example: "We look forward to working with you.", translation: "Chúng tôi rất mong đợi được hợp tác với bạn." },
  { phrase: "look up to", definition: "ngưỡng mộ, kính trọng ai đó", example: "Young writers look up to him as a role model.", translation: "Các nhà văn trẻ ngưỡng mộ ông như một hình mẫu lý tưởng." },
  { phrase: "make up", definition: "bịa chuyện / trang điểm / làm hòa", example: "They made up an excuse for being late.", translation: "Họ đã bịa ra lý do cho việc đi trễ." },
  { phrase: "put off", definition: "trì hoãn / làm nản lòng", example: "Don't put off what you can do today.", translation: "Đừng trì hoãn những gì bạn có thể làm hôm nay." },
  { phrase: "put up with", definition: "chịu đựng điều gì khó chịu", example: "I can't put up with this noise anymore.", translation: "Tôi không thể chịu đựng tiếng ồn này thêm nữa." },
  { phrase: "run out of", definition: "hết sạch, cạn kiệt thứ gì", example: "We have run out of printer paper.", translation: "Chúng tôi đã hết sạch giấy in." },
  { phrase: "set off", definition: "khởi hành, bắt đầu chuyến đi", example: "They set off early in the morning.", translation: "Họ đã khởi hành từ sáng sớm." },
  { phrase: "show off", definition: "khoe khoang, thể hiện", example: "He always shows off his expensive car.", translation: "Anh ta lúc nào cũng khoe khoang chiếc xe hơi đắt tiền của mình." },
  { phrase: "take off", definition: "cất cánh / cởi quần áo, giày dép / thành công nhanh", example: "The plane took off on time.", translation: "Máy bay đã cất cánh đúng giờ." },
  { phrase: "turn down", definition: "từ chối lời mời/đề xuất / vặn nhỏ âm lượng", example: "She turned down the job offer.", translation: "Cô ấy đã từ chối lời mời nhận việc." },
  { phrase: "work out", definition: "tính toán / tập thể dục / giải quyết ổn thỏa", example: "Things will work out in the end.", translation: "Mọi chuyện rồi sẽ được giải quyết ổn thỏa ở phần cuối." },
  { phrase: "drop out of", definition: "bỏ học nửa chừng", example: "He dropped out of college to start a business.", translation: "Anh ấy đã bỏ học đại học để bắt đầu kinh doanh." },
  { phrase: "hand in", definition: "nộp bài, nộp báo cáo", example: "All students must hand in their assignments by noon.", translation: "Tất cả học sinh phải nộp bài tập trước buổi trưa." },
  { phrase: "look back on", definition: "nhìn lại quá khứ, hồi tưởng", example: "Older people often look back on their youth with nostalgia.", translation: "Người lớn tuổi thường nhìn lại tuổi trẻ của họ với niềm hoài cổ." },
  { phrase: "point out", definition: "chỉ ra điều gì đó rõ ràng", example: "The guide pointed out the historical monuments.", translation: "Hướng dẫn viên đã chỉ ra những di tích lịch sử." },
  { phrase: "run into", definition: "vô tình đụng mặt, gặp ai đó", example: "I ran into my old school friend yesterday.", translation: "Hôm qua tôi vô tình gặp lại người bạn học cũ." },
  { phrase: "stand out", definition: "nổi bật, khác biệt rõ ràng", example: "Her bright red hair made her stand out in the crowd.", translation: "Mái tóc đỏ rực của cô ấy khiến cô ấy nổi bật trong đám đông." },
  { phrase: "think over", definition: "cân nhắc kỹ lưỡng trước khi quyết định", example: "I need some time to think over the job offer.", translation: "Tôi cần thời gian để cân nhắc kỹ lưỡng lời mời nhận việc." },
  { phrase: "turn out", definition: "hóa ra là, thành ra là", example: "The presentation turned out to be a huge success.", translation: "Bài thuyết trình hóa ra lại là một thành công lớn." },
  { phrase: "try out", definition: "thử dùng thử nghiệm", example: "We are trying out a new software application.", translation: "Chúng tôi đang thử dùng thử nghiệm một ứng dụng phần mềm mới." },
  { phrase: "watch out", definition: "cẩn thận, coi chừng nguy hiểm", example: "Watch out! There is a car coming.", translation: "Coi chừng! Có một chiếc xe hơi đang đến." },
  { phrase: "write down", definition: "ghi chép lại vào giấy", example: "Please write down his phone number.", translation: "Xin hãy ghi lại số điện thoại của anh ấy." },
  { phrase: "break down", definition: "hỏng hóc máy móc / suy sụp tinh thần", example: "My car broke down on the freeway.", translation: "Xe hơi của tôi đã bị hỏng trên đường cao tốc." },
  { phrase: "bring up", definition: "nuôi nấng / đề cập chủ đề thảo luận", example: "She brought up three children on her own.", translation: "Cô ấy tự mình nuôi nấng ba đứa con." },
  { phrase: "call back", definition: "gọi điện thoại lại sau", example: "I will call you back in ten minutes.", translation: "Tôi sẽ gọi lại cho bạn sau mười phút." },
  { phrase: "check in", definition: "làm thủ tục nhận phòng/vé", example: "Please check in two hours before your flight.", translation: "Vui lòng làm thủ tục hai tiếng trước chuyến bay." },
  { phrase: "check out", definition: "làm thủ tục trả phòng / kiểm tra thông tin", example: "We must check out of the hotel by 11:00 AM.", translation: "Chúng ta phải trả phòng khách sạn trước 11 giờ sáng." },
  { phrase: "close down", definition: "đóng cửa vĩnh viễn (doanh nghiệp)", example: "The old shop closed down last month.", translation: "Cửa hàng cũ đã đóng cửa vĩnh viễn vào tháng trước." },
  { phrase: "cut off", definition: "cắt đứt kết nối / ngắt điện nước", example: "Our electricity was cut off because of unpaid bills.", translation: "Điện của chúng tôi đã bị cắt vì hóa đơn chưa thanh toán." },
  { phrase: "end up", definition: "kết cục là, kết thúc ở đâu", example: "We got lost and ended up in a deserted area.", translation: "Chúng tôi bị lạc và kết cục là ở một khu hoang vắng." },
  { phrase: "fill in", definition: "điền thông tin vào mẫu đơn", example: "Please fill in this application form.", translation: "Xin vui lòng điền vào mẫu đơn đăng ký này." },
  { phrase: "give away", definition: "tặng miễn phí / tiết lộ bí mật", example: "They are giving away free samples of tea.", translation: "Họ đang tặng miễn phí các gói trà dùng thử." },
  { phrase: "give back", definition: "trả lại thứ gì đã mượn", example: "Could you give back the keys tomorrow?", translation: "Bạn có thể trả lại chìa khóa vào ngày mai không?" },
  { phrase: "hold on", definition: "chờ đợi một lát (điện thoại)", example: "Hold on a minute, I'll check the schedule.", translation: "Chờ một phút, tôi sẽ kiểm tra lịch trình." },
  { phrase: "join in", definition: "tham gia cùng nhóm", example: "Everyone is welcome to join in the discussion.", translation: "Mọi người đều được chào đón tham gia thảo luận." },
  { phrase: "keep on", definition: "tiếp tục làm gì đó liên tục", example: "He kept on talking although no one listened.", translation: "Anh ta cứ tiếp tục nói mặc dù không ai nghe." },
  { phrase: "take after", definition: "giống ai đó (về ngoại hình/tính cách)", example: "She takes after her mother in looks.", translation: "Cô ấy giống mẹ của mình về ngoại hình." },
  { phrase: "break into", definition: "đột nhập vào nhà trái phép", example: "Someone broke into their house last night.", translation: "Ai đó đã đột nhập vào nhà họ đêm qua." },
  { phrase: "catch on", definition: "trở nên phổ biến / hiểu ra vấn đề", example: "The new fashion trend caught on quickly.", translation: "Xu hướng thời trang mới đã nhanh chóng trở nên phổ biến." },
  { phrase: "die out", definition: "tuyệt chủng, biến mất hoàn toàn", example: "Many rare species are dying out.", translation: "Nhiều loài quý hiếm đang dần biến mất hoàn toàn." },
  { phrase: "face up to", definition: "đối mặt chấp nhận sự thật khó khăn", example: "You must face up to the reality of the situation.", translation: "Bạn phải đối mặt với thực tế của tình huống." },
  { phrase: "get along/on with", definition: "hòa hợp, thân thiết với ai", example: "I get along very well with my neighbors.", translation: "Tôi rất hòa hợp với những người hàng xóm của mình." },
  { phrase: "give in", definition: "nhượng bộ, chịu thua", example: "After hours of pressure, the manager finally gave in.", translation: "Sau nhiều giờ chịu áp lực, quản lý cuối cùng đã nhượng bộ." },
  { phrase: "look down on", definition: "coi thường ai đó", example: "Never look down on anyone.", translation: "Đừng bao giờ coi thường bất kỳ ai." },
  { phrase: "make out", definition: "nhìn ra, nghe ra, hiểu được (khó khăn)", example: "I can't make out what he is saying.", translation: "Tôi không thể nghe hiểu anh ta đang nói cái gì." },
  { phrase: "pass away", definition: "qua đời, mất", example: "His grandfather passed away peacefully yesterday.", translation: "Ông nội của anh ấy đã qua đời yên bình vào hôm qua." },
  { phrase: "run over", definition: "tông xe cán qua", example: "The dog was run over by a speeding truck.", translation: "Chú chó đã bị tông bởi một chiếc xe tải chạy quá tốc độ." },
  { phrase: "stand for", definition: "viết tắt của / đại diện cho ý tưởng", example: "UN stands for United Nations.", translation: "UN viết tắt của United Nations (Liên Hợp Quốc)." },
  { phrase: "take over", definition: "tiếp quản, đảm nhiệm chức vụ", example: "The assistant will take over the project leader role.", translation: "Trợ lý sẽ tiếp quản vai trò trưởng dự án." },
  { phrase: "wear out", definition: "mòn, sờn rách / làm mệt nhoài", example: "Walking all day wore out my shoes.", translation: "Đi bộ cả ngày đã làm mòn đôi giày của tôi." },
  { phrase: "call back", definition: "gọi điện thoại lại", example: "I will call you back as soon as I can.", translation: "Tôi sẽ gọi lại cho bạn sớm nhất có thể." }
];

export const b2Collocations: B2Collocation[] = [
  { phrase: "by chance", type: "prepositional", meaning: "tình cờ, ngẫu nhiên", example: "We met at the airport by chance.", translation: "Chúng tôi đã gặp nhau ở sân bay một cách tình cờ." },
  { phrase: "on purpose", type: "prepositional", meaning: "cố ý, có chủ đích", example: "He broke the glass on purpose.", translation: "Anh ta đã cố ý làm vỡ chiếc cốc." },
  { phrase: "at risk", type: "prepositional", meaning: "gặp nguy hiểm, rủi ro", example: "Many companies are at risk of bankruptcy.", translation: "Nhiều công ty đang đứng trước rủi ro phá sản." },
  { phrase: "for instance", type: "prepositional", meaning: "ví dụ như là", example: "We need some tools, for instance, a hammer.", translation: "Chúng tôi cần một số dụng cụ, ví dụ như búa." },
  { phrase: "in common", type: "prepositional", meaning: "có điểm chung", example: "They have a lot of hobbies in common.", translation: "Họ có rất nhiều sở thích chung." },
  { phrase: "on time", type: "prepositional", meaning: "đúng giờ", example: "The train arrived exactly on time.", translation: "Tàu đã đến chính xác đúng giờ." },
  { phrase: "in progress", type: "prepositional", meaning: "đang được tiến hành", example: "The construction work is still in progress.", translation: "Công trình xây dựng vẫn đang được tiến hành." },
  { phrase: "under pressure", type: "prepositional", meaning: "chịu áp lực lớn", example: "Employees are working under pressure to meet the deadline.", translation: "Nhân viên đang làm việc dưới áp lực để kịp thời hạn." },
  { phrase: "agree with sb/sth", type: "pattern", meaning: "đồng ý với ai/cái gì", example: "I agree with your suggestion.", translation: "Tôi đồng ý với đề xuất của bạn." },
  { phrase: "apologise to sb for sth", type: "pattern", meaning: "xin lỗi ai về việc gì", example: "He apologised for being late.", translation: "Anh ấy đã xin lỗi vì đến muộn." },
  { phrase: "believe in sth/sb", type: "pattern", meaning: "tin tưởng vào điều gì/ai", example: "You must believe in yourself.", translation: "Bạn phải tin tưởng vào chính mình." },
  { phrase: "belong to sb/sth", type: "pattern", meaning: "thuộc về ai/cái gì", example: "This book belongs to the library.", translation: "Cuốn sách này thuộc về thư viện." },
  { phrase: "depend on sb/sth", type: "pattern", meaning: "phụ thuộc vào ai/cái gì", example: "Success depends on your hard work.", translation: "Thành công phụ thuộc vào sự chăm chỉ của bạn." },
  { phrase: "listen to sb/sth", type: "pattern", meaning: "lắng nghe ai/cái gì", example: "Please listen to the instructions carefully.", translation: "Xin hãy lắng nghe kỹ các hướng dẫn." },
  { phrase: "rely on sb/sth", type: "pattern", meaning: "dựa dẫm, trông cậy vào", example: "We can't rely on public transport.", translation: "Chúng ta không thể dựa dẫm vào phương tiện công cộng." },
  { phrase: "congratulate sb on sth", type: "pattern", meaning: "chúc mừng ai vì điều gì", example: "They congratulated her on passing the exam.", translation: "Họ đã chúc mừng cô ấy vì thi đỗ." },
  { phrase: "pay for sth", type: "pattern", meaning: "thanh toán cho cái gì", example: "Who is going to pay for the meal?", translation: "Ai sẽ là người thanh toán cho bữa ăn?" },
  { phrase: "suffer from sth", type: "pattern", meaning: "chịu đựng, đau đớn vì", example: "He suffers from extreme stress.", translation: "Anh ấy đang phải chịu đựng sự căng thẳng tột độ." },
  { phrase: "take care of sb/sth", type: "collocation", meaning: "chăm sóc, lo liệu", example: "She takes care of the marketing reports.", translation: "Cô ấy chịu trách nhiệm lo liệu các báo cáo tiếp thị." },
  { phrase: "make a decision", type: "collocation", meaning: "đưa ra quyết định", example: "It is time to make a final decision.", translation: "Đã đến lúc phải đưa ra quyết định cuối cùng." },
  { phrase: "do business", type: "collocation", meaning: "làm ăn, kinh doanh", example: "We do business with clients overseas.", translation: "Chúng tôi kinh doanh với khách hàng nước ngoài." },
  { phrase: "have an influence on sth", type: "collocation", meaning: "có ảnh hưởng lên cái gì", example: "Advertising has an influence on consumers.", translation: "Quảng cáo có ảnh hưởng lên người tiêu dùng." },
  { phrase: "make progress", type: "collocation", meaning: "tiến bộ, đạt bước tiến", example: "He is making great progress in English.", translation: "Anh ấy đang có sự tiến bộ lớn trong tiếng Anh." },
  { phrase: "take part in sth", type: "collocation", meaning: "tham gia vào việc gì", example: "Over 100 delegates took part in the seminar.", translation: "Hơn 100 đại biểu đã tham gia vào buổi hội thảo." },
  { phrase: "in advance", type: "prepositional", meaning: "trước, sớm trước thời hạn", example: "You should book the tickets in advance.", translation: "Bạn nên đặt vé trước." },
  { phrase: "by heart", type: "prepositional", meaning: "học thuộc lòng, ghi nhớ trong tim", example: "I learned the entire poem by heart.", translation: "Tôi đã học thuộc lòng toàn bộ bài thơ." },
  { phrase: "for good", type: "prepositional", meaning: "mãi mãi, vĩnh viễn", example: "He decided to leave the country for good.", translation: "Anh ấy quyết định rời khỏi đất nước vĩnh viễn." },
  { phrase: "in public", type: "prepositional", meaning: "nơi công cộng, trước mọi người", example: "It is embarrassing to talk in public.", translation: "Thật đáng xấu hổ khi nói chuyện trước công chúng." },
  { phrase: "at first", type: "prepositional", meaning: "lúc đầu, ban đầu", example: "At first, I didn't like the new schedule.", translation: "Lúc đầu, tôi không thích lịch trình mới." },
  { phrase: "in general", type: "prepositional", meaning: "nói chung, nhìn chung", example: "In general, the proposal is good.", translation: "Nhìn chung, đề xuất này tốt." },
  { phrase: "by mistake", type: "prepositional", meaning: "do nhầm lẫn, sơ suất", example: "I deleted the file by mistake.", translation: "Tôi đã xóa file do nhầm lẫn." },
  { phrase: "for sale", type: "prepositional", meaning: "để bán", example: "Is this house for sale?", translation: "Ngôi nhà này có bán không?" },
  { phrase: "on loan", type: "prepositional", meaning: "được cho mượn tạm thời", example: "The book is on loan from the library.", translation: "Cuốn sách đang được cho mượn từ thư viện." },
  { phrase: "out of date", type: "prepositional", meaning: "lỗi thời, hết hạn sử dụng", example: "This software manual is out of date.", translation: "Sách hướng dẫn phần mềm này đã lỗi thời." },
  { phrase: "complain about sth", type: "pattern", meaning: "phàn nàn về điều gì", example: "The customer complained about the service.", translation: "Khách hàng phàn nàn về dịch vụ." },
  { phrase: "apply for a job", type: "pattern", meaning: "nộp đơn ứng tuyển công việc", example: "She applied for the accountant position.", translation: "Cô ấy đã nộp đơn ứng tuyển vị trí kế toán." },
  { phrase: "insist on sth", type: "pattern", meaning: "khăng khăng, đòi làm gì bằng được", example: "He insisted on paying for the meal.", translation: "Anh ta khăng khăng đòi trả tiền cho bữa ăn." },
  { phrase: "accuse sb of sth", type: "pattern", meaning: "buộc tội ai vì điều gì", example: "They accused him of leaking secrets.", translation: "Họ buộc tội anh ta làm lộ bí mật." },
  { phrase: "prevent sb from sth", type: "pattern", meaning: "ngăn cản ai làm việc gì", example: "The guard prevented us from entering.", translation: "Bảo vệ đã ngăn cản chúng tôi đi vào." },
  { phrase: "search for sth", type: "pattern", meaning: "tìm kiếm, tra lục thứ gì", example: "We searched for the missing documents.", translation: "Chúng tôi đã tìm kiếm tài liệu bị mất." },
  { phrase: "approve of sth", type: "pattern", meaning: "tán thành, đồng ý với điều gì", example: "My parents approve of my career choice.", translation: "Bố mẹ tôi tán thành lựa chọn sự nghiệp của tôi." },
  { phrase: "borrow sth from sb", type: "pattern", meaning: "mượn cái gì từ ai", example: "I borrowed a calculator from my classmate.", translation: "Tôi đã mượn một chiếc máy tính bỏ túi từ bạn cùng lớp." },
  { phrase: "lead to sth", type: "pattern", meaning: "dẫn tới kết quả gì", example: "Hard work will lead to success.", translation: "Luyện tập chăm chỉ sẽ dẫn đến thành công." },
  { phrase: "protect sb from sth", type: "pattern", meaning: "bảo vệ ai khỏi mối nguy hiểm", example: "This umbrella protects you from the sun.", translation: "Chiếc ô này bảo vệ bạn khỏi ánh nắng mặt trời." },
  { phrase: "make an effort", type: "collocation", meaning: "nỗ lực, cố gắng hết sức", example: "We must make an effort to improve sales.", translation: "Chúng ta phải nỗ lực để cải thiện doanh số." },
  { phrase: "take an interest in", type: "collocation", meaning: "quan tâm, có hứng thú với", example: "The manager takes an interest in employee wellness.", translation: "Quản lý quan tâm đến sức khỏe của nhân viên." },
  { phrase: "pay attention to", type: "collocation", meaning: "chú ý tới cái gì", example: "Please pay attention to the slide presentation.", translation: "Xin hãy chú ý vào phần trình chiếu slide." },
  { phrase: "take advantage of", type: "collocation", meaning: "tận dụng, lợi dụng thời cơ", example: "We should take advantage of the low prices.", translation: "Chúng ta nên tận dụng mức giá rẻ." },
  { phrase: "have a look at", type: "collocation", meaning: "nhìn qua, ngó qua", example: "Can you have a look at my report?", translation: "Bạn có thể xem qua báo cáo của tôi không?" },
  { phrase: "take place", type: "collocation", meaning: "diễn ra, xảy ra (có kế hoạch trước)", example: "The annual conference takes place in July.", translation: "Hội nghị thường niên diễn ra vào tháng Bảy." },
  { phrase: "make a mistake", type: "collocation", meaning: "mắc lỗi, phạm sai lầm", example: "I made a huge mistake in the ledger.", translation: "Tôi đã mắc một sai lầm lớn trong sổ cái." },
  { phrase: "do homework", type: "collocation", meaning: "làm bài tập về nhà / chuẩn bị thông tin trước", example: "He did his homework before the negotiation.", translation: "Anh ấy đã chuẩn bị thông tin kỹ càng trước cuộc đàm phán." },
  { phrase: "take a taxi/bus", type: "collocation", meaning: "bắt taxi, xe bus", example: "She decided to take a taxi to the train station.", translation: "Cô ấy quyết định đi taxi đến ga tàu." },
  { phrase: "keep a secret", type: "collocation", meaning: "giữ bí mật", example: "You can trust me to keep a secret.", translation: "Bạn có thể tin tưởng tôi giữ bí mật." },
  { phrase: "lose track of time", type: "collocation", meaning: "mất dấu thời gian, quên giờ giấc", example: "I lost track of time while reading.", translation: "Tôi quên hết giờ giấc khi đang đọc sách." },
  { phrase: "keep in touch with", type: "collocation", meaning: "giữ liên lạc với ai đó", example: "We still keep in touch with former colleagues.", translation: "Chúng tôi vẫn giữ liên lạc với đồng nghiệp cũ." },
  { phrase: "make fun of", type: "collocation", meaning: "trêu chọc, chế giễu ai", example: "It is wrong to make fun of others.", translation: "Chế giễu người khác là sai trái." },
  { phrase: "tell the truth", type: "collocation", meaning: "nói thật, kể sự thật", example: "You should always tell the truth.", translation: "Bạn lúc nào cũng nên nói sự thật." },
  { phrase: "pay a visit", type: "collocation", meaning: "ghé thăm, đi thăm", example: "We paid a visit to the local museum.", translation: "Chúng tôi đã ghé thăm bảo tàng địa phương." },
  { phrase: "have a word with sb", type: "collocation", meaning: "nói chuyện nhanh với ai", example: "Can I have a word with you in private?", translation: "Tôi có thể nói chuyện nhanh với bạn một chút được không?" },
  { phrase: "take action", type: "collocation", meaning: "hành động, thực hiện biện pháp", example: "We need to take action to stop the pollution.", translation: "Chúng ta cần hành động để ngăn chặn ô nhiễm." },
  { phrase: "make sense", type: "collocation", meaning: "có ý nghĩa, hợp lý", example: "His explanation makes complete sense.", translation: "Lời giải thích của anh ấy hoàn toàn hợp lý." },
  { phrase: "go bankrupt", type: "collocation", meaning: "bị phá sản, vỡ nợ", example: "The travel agency went bankrupt last winter.", translation: "Đại lý du lịch đã phá sản vào mùa đông năm ngoái." },
  { phrase: "get ready", type: "collocation", meaning: "chuẩn bị sẵn sàng", example: "Get ready, we are leaving in five minutes.", translation: "Chuẩn bị đi, chúng ta sẽ đi trong năm phút nữa." },
  { phrase: "keep a promise", type: "collocation", meaning: "giữ lời hứa", example: "He always keeps his promises.", translation: "Anh ấy luôn luôn giữ lời hứa." },
  { phrase: "make a phone call", type: "collocation", meaning: "gọi điện thoại", example: "I need to make a quick phone call.", translation: "Tôi cần gọi một cuộc điện thoại nhanh." },
  { phrase: "tell a lie", type: "collocation", meaning: "nói dối", example: "It is hard to trust him because he often tells lies.", translation: "Thật khó tin anh ta vì anh ta hay nói dối." },
  { phrase: "give a presentation", type: "collocation", meaning: "thuyết trình, trình bày", example: "She gave a great presentation on sales figures.", translation: "Cô ấy đã thuyết trình rất tuyệt vời về số liệu doanh số." },
  { phrase: "run out of time", type: "collocation", meaning: "hết thời gian làm bài/nhiệm vụ", example: "We ran out of time and couldn't finish the test.", translation: "Chúng tôi đã hết thời gian và không thể hoàn thành bài thi." }
];

export const b2WordFamilies: B2WordFamily[] = [
  { verb: "enable", noun: "ability / disability", adjective: "able / unable / disabled", adverb: "ably" },
  { verb: "act", noun: "action / actor / activity", adjective: "active / inactive", adverb: "actively" },
  { verb: "agree / disagree", noun: "agreement / disagreement", adjective: "agreeable", adverb: "agreeably" },
  { verb: "assist", noun: "assistance / assistant", adjective: "assisted", adverb: "" },
  { verb: "beautify", noun: "beauty", adjective: "beautiful", adverb: "beautifully" },
  { verb: "care", noun: "care / carefulness", adjective: "careful / careless", adverb: "carefully / carelessly" },
  { verb: "create", noun: "creation / creator / creativity", adjective: "creative", adverb: "creatively" },
  { verb: "decide", noun: "decision", adjective: "decisive / indecisive", adverb: "decisively" },
  { verb: "develop", noun: "development / developer", adjective: "developed / developing", adverb: "" },
  { verb: "employ", noun: "employer / employee / employment", adjective: "employed / unemployed", adverb: "" },
  { verb: "hope", noun: "hope", adjective: "hopeful / hopeless", adverb: "hopefully / hopelessly" },
  { verb: "invent", noun: "invention / inventor", adjective: "inventive", adverb: "inventively" },
  { verb: "please", noun: "pleasure", adjective: "pleasant / unpleasant", adverb: "pleasantly" },
  { verb: "produce", noun: "product / production / productivity", adjective: "productive", adverb: "productively" },
  { verb: "succeed", noun: "success", adjective: "successful", adverb: "successfully" },
  { verb: "accept", noun: "acceptance / acceptability", adjective: "acceptable / unacceptable", adverb: "acceptably" },
  { verb: "admire", noun: "admiration / admirer", adjective: "admirable", adverb: "admirably" },
  { verb: "advise", noun: "advice / adviser", adjective: "advisable / inadvisable", adverb: "advisedly" },
  { verb: "allow", noun: "allowance", adjective: "allowable", adverb: "" },
  { verb: "amuse", noun: "amusement", adjective: "amused / amusing", adverb: "amusingly" },
  { verb: "attract", noun: "attraction / attractiveness", adjective: "attractive / unattractive", adverb: "attractively" },
  { verb: "choose", noun: "choice", adjective: "chosen", adverb: "" },
  { verb: "comfort", noun: "comfort / discomfort", adjective: "comfortable / uncomfortable", adverb: "comfortably" },
  { verb: "compete", noun: "competition / competitor", adjective: "competitive", adverb: "competitively" },
  { verb: "connect / disconnect", noun: "connection / disconnection", adjective: "connected / disconnected", adverb: "" },
  { verb: "destroy", noun: "destruction", adjective: "destructive", adverb: "destructively" },
  { verb: "educate", noun: "education / educator", adjective: "educational", adverb: "educationally" },
  { verb: "explain", noun: "explanation", adjective: "explanatory / unexplained", adverb: "" },
  { verb: "finance", noun: "finance / finances", adjective: "financial", adverb: "financially" },
  { verb: "govern", noun: "government / governor", adjective: "governmental", adverb: "" },
  { verb: "imagine", noun: "imagination", adjective: "imaginary / imaginative", adverb: "imaginatively" },
  { verb: "judge", noun: "judgment / judge", adjective: "judgmental", adverb: "" },
  { verb: "know", noun: "knowledge", adjective: "knowledgeable / known / unknown", adverb: "knowledgeably" },
  { verb: "manage", noun: "management / manager", adjective: "managerial / manageable", adverb: "manageably" },
  { verb: "organise", noun: "organisation / organiser", adjective: "organised / disorganised", adverb: "" },
  { verb: "pay", noun: "payment / payee", adjective: "paid / unpaid", adverb: "" },
  { verb: "pollute", noun: "pollution / pollutant", adjective: "polluted / unpolluted", adverb: "" },
  { verb: "qualify / disqualify", noun: "qualification / disqualification", adjective: "qualified / unqualified", adverb: "" },
  { verb: "satisfy", noun: "satisfaction / dissatisfaction", adjective: "satisfactory / unsatisfactory", adverb: "satisfactorily" },
  { verb: "value", noun: "value / valuation", adjective: "valuable / invaluable / worthless", adverb: "" }
];

export const b2VerbPatterns: B2VerbPattern[] = [
  {
    verb: "remember",
    toMeaning: "Nhớ phải làm gì (nhiệm vụ, bổn phận chưa xảy ra)",
    toExample: "Remember to lock the door before you leave.",
    toTranslation: "Hãy nhớ khóa cửa trước khi bạn rời đi.",
    ingMeaning: "Nhớ lại đã làm gì (kỷ niệm, hành động đã xảy ra trong quá khứ)",
    ingExample: "I clearly remember locking the door this morning.",
    ingTranslation: "Tôi nhớ rõ ràng là đã khóa cửa sáng nay rồi."
  },
  {
    verb: "forget",
    toMeaning: "Quên phải làm gì (bỏ sót nhiệm vụ)",
    toExample: "Don't forget to submit the report by Friday.",
    toTranslation: "Đừng quên nộp báo cáo trước thứ Sáu nhé.",
    ingMeaning: "Quên đã làm gì (quên đi một kỷ niệm đã xảy ra)",
    ingExample: "I will never forget meeting the CEO for the first time.",
    ingTranslation: "Tôi sẽ không bao giờ quên lần đầu tiên gặp Giám đốc điều hành."
  },
  {
    verb: "stop",
    toMeaning: "Dừng lại để thực hiện mục đích khác",
    toExample: "We stopped to have lunch at a local restaurant.",
    toTranslation: "Chúng tôi đã dừng lại để ăn trưa ở một nhà hàng địa phương.",
    ingMeaning: "Ngừng hoàn toàn hành động đang diễn ra",
    ingExample: "Please stop talking during the presentation.",
    ingTranslation: "Xin vui lòng ngừng nói chuyện trong lúc thuyết trình."
  },
  {
    verb: "try",
    toMeaning: "Cố gắng, nỗ lực hết sức để làm gì",
    toExample: "I am trying to solve this complex database error.",
    toTranslation: "Tôi đang cố gắng giải quyết lỗi cơ sở dữ liệu phức tạp này.",
    ingMeaning: "Thử làm gì (thử một phương án xem có kết quả không)",
    ingExample: "Try restarting the computer to see if it works.",
    ingTranslation: "Hãy thử khởi động lại máy tính xem nó có hoạt động không."
  },
  {
    verb: "regret",
    toMeaning: "Lấy làm tiếc vì sắp phải báo tin xấu",
    toExample: "We regret to inform you that your application was unsuccessful.",
    toTranslation: "Chúng tôi rất tiếc phải thông báo rằng đơn ứng tuyển của bạn đã không thành công.",
    ingMeaning: "Hối hận vì một điều đã làm trong quá khứ",
    ingExample: "He regrets signing the contract without reading it carefully.",
    ingTranslation: "Anh ấy hối hận vì đã ký hợp đồng mà không đọc kỹ."
  },
  {
    verb: "go on",
    toMeaning: "Chuyển sang làm việc mới (sau khi xong việc cũ)",
    toExample: "After finishing the slides, she went on to write the speech.",
    toTranslation: "Sau khi hoàn thành các slide, cô ấy chuyển sang viết bài phát biểu.",
    ingMeaning: "Tiếp tục làm việc đang làm dở dang",
    ingExample: "He went on talking for hours despite the cold weather.",
    ingTranslation: "Anh ta tiếp tục nói chuyện hàng giờ liền mặc cho thời tiết lạnh giá."
  },
  {
    verb: "mean",
    toMeaning: "Dự định, có ý định làm gì",
    toExample: "I didn't mean to hurt your feelings.",
    toTranslation: "Tôi không có ý làm tổn thương cảm xúc của bạn.",
    ingMeaning: "Có nghĩa là, kéo theo kết quả là gì",
    ingExample: "Taking this job means moving to a different city.",
    ingTranslation: "Nhận công việc này đồng nghĩa với việc phải chuyển sang thành phố khác."
  },
  {
    verb: "propose",
    toMeaning: "Có ý định làm gì đó",
    toExample: "We propose to start the project next month.",
    toTranslation: "Chúng tôi có ý định bắt đầu dự án vào tháng tới.",
    ingMeaning: "Đề xuất, gợi ý một ý kiến",
    ingExample: "She proposed holding the conference in Tokyo.",
    ingTranslation: "Cô ấy đề xuất tổ chức hội nghị ở Tokyo."
  },
  {
    verb: "dread",
    toMeaning: "Lo sợ điều gì sắp xảy ra (dùng với động từ chỉ suy nghĩ)",
    toExample: "I dread to think what would happen if the server crashed.",
    toTranslation: "Tôi sợ khi nghĩ tới chuyện gì sẽ xảy ra nếu máy chủ bị sập.",
    ingMeaning: "Lo sợ, kinh hãi việc gì đó nói chung",
    ingExample: "She dreads going to the dentist.",
    ingTranslation: "Cô ấy lo sợ việc phải đi khám nha sĩ."
  },
  {
    verb: "like",
    toMeaning: "Thích vì thấy điều đó là tốt, là nên làm",
    toExample: "I like to wash the dishes immediately after meals.",
    toTranslation: "Tôi thích rửa bát đĩa ngay sau bữa ăn (vì sự sạch sẽ, ngăn nắp).",
    ingMeaning: "Thích làm việc gì (đam mê, sở thích)",
    ingExample: "I like swimming in the morning.",
    ingTranslation: "Tôi thích bơi lội vào buổi sáng."
  },
  {
    verb: "hate",
    toMeaning: "Ghét phải làm gì (thường vì nghĩa vụ, bắt buộc)",
    toExample: "I hate to disturb you, but there is an urgent call.",
    toTranslation: "Tôi rất ghét phải làm phiền bạn, nhưng có một cuộc gọi khẩn cấp.",
    ingMeaning: "Ghét làm gì (sở thích cá nhân)",
    ingExample: "I hate waiting in long queues at the supermarket.",
    ingTranslation: "Tôi ghét việc phải chờ đợi ở hàng dài tại siêu thị."
  }
];

export const b2TopicVocabulary: B2TopicWord[] = [
  // Travel (15 words)
  {
    word: "accommodation",
    partOfSpeech: "noun",
    ipa: "/əˌkɒm.əˈdeɪ.ʃən/",
    definition: "Chỗ ở, phòng trú ngụ",
    example: "The travel agent arranged our accommodation for the trip.",
    translation: "Đại lý du lịch đã sắp xếp chỗ ở cho chúng tôi cho chuyến đi.",
    topic: "Travel"
  },
  {
    word: "itinerary",
    partOfSpeech: "noun",
    ipa: "/aɪˈtɪn.ər.ər.i/",
    definition: "Lịch trình chi tiết chuyến đi",
    example: "Please email me a copy of your travel itinerary.",
    translation: "Vui lòng email cho tôi bản sao lịch trình chuyến đi của bạn.",
    topic: "Travel"
  },
  {
    word: "destination",
    partOfSpeech: "noun",
    ipa: "/ˌdes.tɪˈneɪ.ʃən/",
    definition: "Điểm đến, nơi hướng tới",
    example: "Hawaii is a popular holiday destination for families.",
    translation: "Hawaii là một điểm đến kỳ nghỉ phổ biến cho các gia đình.",
    topic: "Travel"
  },
  {
    word: "immigration",
    partOfSpeech: "noun",
    ipa: "/ˌɪm.ɪˈɡreɪ.ʃən/",
    definition: "Sự nhập cảnh, phòng di trú",
    example: "All travelers must go through passport control and immigration.",
    translation: "Tất cả du khách phải đi qua kiểm tra hộ chiếu và phòng di trú.",
    topic: "Travel"
  },
  {
    word: "expedition",
    partOfSpeech: "noun",
    ipa: "/ˌek.spəˈdɪʃ.ən/",
    definition: "Chuyến thám hiểm, thám du",
    example: "They are organizing a scientific expedition to the Amazon.",
    translation: "Họ đang tổ chức một chuyến thám hiểm khoa học đến vùng Amazon.",
    topic: "Travel"
  },
  {
    word: "passenger",
    partOfSpeech: "noun",
    ipa: "/ˈpæs.ən.dʒər/",
    definition: "Hành khách",
    example: "All passengers must wear seatbelts during takeoff.",
    translation: "Tất cả hành khách phải thắt dây an toàn khi cất cánh.",
    topic: "Travel"
  },
  {
    word: "departure",
    partOfSpeech: "noun",
    ipa: "/dɪˈpɑː.tʃər/",
    definition: "Sự khởi hành, xuất phát",
    example: "Please check the departure board for gate changes.",
    translation: "Vui lòng kiểm tra bảng khởi hành để biết các thay đổi về cổng.",
    topic: "Travel"
  },
  {
    word: "arrival",
    partOfSpeech: "noun",
    ipa: "/əˈraɪ.vəl/",
    definition: "Sự đến nơi, hạ cánh",
    example: "We awaited the arrival of the train on platform four.",
    translation: "Chúng tôi đợi đoàn tàu đến ở sân ga số bốn.",
    topic: "Travel"
  },
  {
    word: "sightseeing",
    partOfSpeech: "noun",
    ipa: "/ˈsaɪtˌsiː.ɪŋ/",
    definition: "Việc đi tham quan phong cảnh",
    example: "We did some sightseeing in Paris during the afternoon.",
    translation: "Chúng tôi đã đi tham quan một số phong cảnh ở Paris vào buổi chiều.",
    topic: "Travel"
  },
  {
    word: "excursion",
    partOfSpeech: "noun",
    ipa: "/ɪkˈskɜː.ʃən/",
    definition: "Chuyến tham quan dã ngoại",
    example: "The package includes a guided excursion to the ancient ruins.",
    translation: "Gói du lịch bao gồm một chuyến tham quan có hướng dẫn đến các di tích cổ.",
    topic: "Travel"
  },
  {
    word: "layover",
    partOfSpeech: "noun",
    ipa: "/ˈleɪˌəʊ.vər/",
    definition: "Điểm dừng chân, thời gian chờ chuyến bay tiếp",
    example: "I have a four-hour layover in Frankfurt before my next flight.",
    translation: "Tôi có thời gian chờ bốn tiếng ở Frankfurt trước chuyến bay tiếp theo.",
    topic: "Travel"
  },
  {
    word: "embarkation",
    partOfSpeech: "noun",
    ipa: "/ˌem.bɑːˈkeɪ.ʃən/",
    definition: "Sự lên tàu, lên máy bay",
    example: "The embarkation process was smooth and well-organized.",
    translation: "Quy trình lên tàu diễn ra suôn sẻ và được tổ chức tốt.",
    topic: "Travel"
  },
  {
    word: "souvenir",
    partOfSpeech: "noun",
    ipa: "/ˌsuː.vənˈɪər/",
    definition: "Đồ lưu niệm, quà lưu niệm",
    example: "She bought a small model of the Eiffel Tower as a souvenir.",
    translation: "Cô ấy đã mua một mô hình tháp Eiffel nhỏ làm quà lưu niệm.",
    topic: "Travel"
  },
  {
    word: "passport",
    partOfSpeech: "noun",
    ipa: "/ˈpɑːs.pɔːt/",
    definition: "Hộ chiếu",
    example: "You need a valid passport to travel abroad.",
    translation: "Bạn cần một hộ chiếu còn hạn để đi du lịch nước ngoài.",
    topic: "Travel"
  },
  {
    word: "baggage",
    partOfSpeech: "noun",
    ipa: "/ˈbæɡ.ɪdʒ/",
    definition: "Hành lý du lịch",
    example: "You can check your baggage at the airport counter.",
    translation: "Bạn có thể ký gửi hành lý của mình tại quầy sân bay.",
    topic: "Travel"
  },

  // Hobbies & Leisure (15 words)
  {
    word: "photography",
    partOfSpeech: "noun",
    ipa: "/fəˈtɒɡ.rə.fi/",
    definition: "Nhiếp ảnh, kỹ thuật chụp ảnh",
    example: "She took up photography as a hobby last year.",
    translation: "Cô ấy đã bắt đầu học nhiếp ảnh như một sở thích vào năm ngoái.",
    topic: "Hobbies"
  },
  {
    word: "gardening",
    partOfSpeech: "noun",
    ipa: "/ˈɡɑː.dən.ɪŋ/",
    definition: "Làm vườn, chăm sóc cây cảnh",
    example: "Gardening is a relaxing activity that gets you close to nature.",
    translation: "Làm vườn là một hoạt động thư giãn giúp bạn gần gũi với thiên nhiên.",
    topic: "Hobbies"
  },
  {
    word: "hiking",
    partOfSpeech: "noun",
    ipa: "/ˈhaɪ.kɪŋ/",
    definition: "Đi bộ đường dài dã ngoại",
    example: "We spent the weekend hiking in the national park.",
    translation: "Chúng tôi đã dành cả cuối tuần để đi bộ đường dài ở công viên quốc gia.",
    topic: "Hobbies"
  },
  {
    word: "cycling",
    partOfSpeech: "noun",
    ipa: "/ˈsaɪ.klɪŋ/",
    definition: "Đi xe đạp giải trí hoặc thi đấu",
    example: "Cycling is great exercise for cardiovascular health.",
    translation: "Đi xe đạp là bài tập tuyệt vời cho sức khỏe tim mạch.",
    topic: "Hobbies"
  },
  {
    word: "culinary",
    partOfSpeech: "adjective",
    ipa: "/ˈkʌl.ɪ.nər.i/",
    definition: "Thuộc về nấu nướng, bếp núc, nghệ thuật ẩm thực",
    example: "He enrolled in a culinary school to improve his cooking skills.",
    translation: "Anh ấy đã đăng ký học một trường ẩm thực để nâng cao kỹ năng nấu ăn của mình.",
    topic: "Hobbies"
  },
  {
    word: "recreation",
    partOfSpeech: "noun",
    ipa: "/ˌrek.riˈeɪ.ʃən/",
    definition: "Sự giải trí, tiêu khiển, tái tạo sức lao động",
    example: "The park provides facilities for outdoor recreation.",
    translation: "Công viên cung cấp các trang thiết bị cho hoạt động giải trí ngoài trời.",
    topic: "Hobbies"
  },
  {
    word: "amusement",
    partOfSpeech: "noun",
    ipa: "/əˈmjuːz.mənt/",
    definition: "Sự vui chơi giải trí, sự thích thú",
    example: "To our amusement, the dog started chasing its own tail.",
    translation: "Trước sự thích thú của chúng tôi, chú chó bắt đầu đuổi theo cái đuôi của chính nó.",
    topic: "Hobbies"
  },
  {
    word: "entertainment",
    partOfSpeech: "noun",
    ipa: "/ˌen.təˈteɪn.mənt/",
    definition: "Sự giải trí, chương trình biểu diễn giải trí",
    example: "The hotel offers live entertainment every evening.",
    translation: "Khách sạn cung cấp các chương trình giải trí trực tiếp mỗi buổi tối.",
    topic: "Hobbies"
  },
  {
    word: "pastime",
    partOfSpeech: "noun",
    ipa: "/ˈpɑːs.taɪm/",
    definition: "Trò tiêu khiển, sở thích lúc rảnh rỗi",
    example: "Reading is her favorite pastime during long journeys.",
    translation: "Đọc sách là trò tiêu khiển yêu thích của cô ấy trong những hành trình dài.",
    topic: "Hobbies"
  },
  {
    word: "amateur",
    partOfSpeech: "noun",
    ipa: "/ˈæm.ə.tər/",
    definition: "Người chơi nghiệp dư, người không chuyên",
    example: "The tournament is open to both professionals and amateurs.",
    translation: "Giải đấu mở cửa cho cả người chuyên nghiệp lẫn người nghiệp dư.",
    topic: "Hobbies"
  },
  {
    word: "enthusiasm",
    partOfSpeech: "noun",
    ipa: "/ɪnˈθjuː.zi.æz.əm/",
    definition: "Sự hăng hái, nhiệt tình, đam mê",
    example: "He showed great enthusiasm for the new project.",
    translation: "Anh ấy đã thể hiện sự nhiệt tình rất lớn đối với dự án mới.",
    topic: "Hobbies"
  },
  {
    word: "tournament",
    partOfSpeech: "noun",
    ipa: "/ˈtʊə.nə.mənt/",
    definition: "Giải đấu thể thao",
    example: "She won first place in the local chess tournament.",
    translation: "Cô ấy đã giành giải nhất trong giải đấu cờ vua địa phương.",
    topic: "Hobbies"
  },
  {
    word: "champion",
    partOfSpeech: "noun",
    ipa: "/ˈtʃæm.pi.ən/",
    definition: "Nhà vô địch, quán quân",
    example: "He is the current world champion in swimming.",
    translation: "Anh ấy là nhà vô địch thế giới hiện tại ở môn bơi lội.",
    topic: "Hobbies"
  },
  {
    word: "exhibition",
    partOfSpeech: "noun",
    ipa: "/ˌek.sɪˈbɪʃ.ən/",
    definition: "Cuộc triển lãm nghệ thuật, sản phẩm",
    example: "We went to see the new art exhibition at the national gallery.",
    translation: "Chúng tôi đã đi xem cuộc triển lãm nghệ thuật mới tại phòng trưng bày quốc gia.",
    topic: "Hobbies"
  },
  {
    word: "leisure",
    partOfSpeech: "noun",
    ipa: "/ˈleɪ.ʒər/",
    definition: "Thời gian thư nhàn, nhàn rỗi",
    example: "In our modern society, people have less leisure time.",
    translation: "Trong xã hội hiện đại của chúng ta, mọi người có ít thời gian nhàn rỗi hơn.",
    topic: "Hobbies"
  },

  // Science & Technology (15 words)
  {
    word: "laboratory",
    partOfSpeech: "noun",
    ipa: "/ləˈbɒr.ə.tər.i/",
    definition: "Phòng thí nghiệm khoa học",
    example: "The researchers are working in the chemistry laboratory.",
    translation: "Các nhà nghiên cứu đang làm việc trong phòng thí nghiệm hóa học.",
    topic: "Science"
  },
  {
    word: "hypothesis",
    partOfSpeech: "noun",
    ipa: "/haɪˈpɒθ.ə.sɪs/",
    definition: "Giả thuyết khoa học",
    example: "The experiment was designed to test the scientific hypothesis.",
    translation: "Thí nghiệm được thiết kế để kiểm tra giả thuyết khoa học.",
    topic: "Science"
  },
  {
    word: "experiment",
    partOfSpeech: "noun",
    ipa: "/ɪkˈsper.ɪ.mənt/",
    definition: "Cuộc thí nghiệm",
    example: "We carried out an experiment to study the chemical reaction.",
    translation: "Chúng tôi đã tiến hành một cuộc thí nghiệm để nghiên cứu phản ứng hóa học.",
    topic: "Science"
  },
  {
    word: "discovery",
    partOfSpeech: "noun",
    ipa: "/dɪˈskʌv.ər.i/",
    definition: "Sự phát hiện, khám phá ra",
    example: "The discovery of penicillin changed the history of medicine.",
    translation: "Sự phát hiện ra penicillin đã thay đổi lịch sử y học.",
    topic: "Science"
  },
  {
    word: "innovation",
    partOfSpeech: "noun",
    ipa: "/ˌɪn.əˈveɪ.ʃən/",
    definition: "Sự đổi mới, sáng kiến cải tiến",
    example: "Product innovation is crucial for keeping market share.",
    translation: "Sự cải tiến sản phẩm là vô cùng quan trọng để giữ vững thị phần.",
    topic: "Science"
  },
  {
    word: "software",
    partOfSpeech: "noun",
    ipa: "/ˈsɒft.weər/",
    definition: "Phần mềm máy tính",
    example: "You must install the latest software updates for security.",
    translation: "Bạn phải cài đặt các bản cập nhật phần mềm mới nhất để bảo mật.",
    topic: "Science"
  },
  {
    word: "hardware",
    partOfSpeech: "noun",
    ipa: "/ˈhɑːd.weər/",
    definition: "Phần cứng máy tính, thiết bị cơ lý",
    example: "Upgrading the hardware will speed up database operations.",
    translation: "Nâng cấp phần cứng sẽ tăng tốc độ các thao tác cơ sở dữ liệu.",
    topic: "Science"
  },
  {
    word: "database",
    partOfSpeech: "noun",
    ipa: "/ˈdeɪ.tə.beɪs/",
    definition: "Cơ sở dữ liệu lưu trữ thông tin",
    example: "All customer records are stored in a secure central database.",
    translation: "Tất cả hồ sơ khách hàng đều được lưu trữ trong một cơ sở dữ liệu trung tâm an toàn.",
    topic: "Science"
  },
  {
    word: "network",
    partOfSpeech: "noun",
    ipa: "/ˈnet.wɜːk/",
    definition: "Mạng lưới kết nối",
    example: "The company's computer network was down for two hours.",
    translation: "Mạng máy tính của công ty đã bị sập trong hai tiếng.",
    topic: "Science"
  },
  {
    word: "evolution",
    partOfSpeech: "noun",
    ipa: "/ˌiː.vəˈluː.ʃən/",
    definition: "Sự tiến hóa sinh học, sự phát triển dần",
    example: "Darwin's theory of evolution explains natural selection.",
    translation: "Thuyết tiến hóa của Darwin giải thích về sự chọn lọc tự nhiên.",
    topic: "Science"
  },
  {
    word: "breakthrough",
    partOfSpeech: "noun",
    ipa: "/ˈbreɪk.θruː/",
    definition: "Bước tiến vượt bậc, đột phá khoa học",
    example: "Scientists made a major breakthrough in cancer research.",
    translation: "Các nhà khoa học đã tạo ra một bước đột phá lớn trong nghiên cứu ung thư.",
    topic: "Science"
  },
  {
    word: "theory",
    partOfSpeech: "noun",
    ipa: "/ˈθɪə.ri/",
    definition: "Học thuyết, lý thuyết khoa học",
    example: "His theory is interesting but lacks empirical evidence.",
    translation: "Lý thuyết của anh ấy rất thú vị nhưng thiếu bằng chứng thực nghiệm.",
    topic: "Science"
  },
  {
    word: "analysis",
    partOfSpeech: "noun",
    ipa: "/əˈnæl.ə.sɪs/",
    definition: "Sự phân tích dữ liệu, thành phần",
    example: "The laboratory performs detailed chemical analysis of soil samples.",
    translation: "Phòng thí nghiệm thực hiện phân tích hóa học chi tiết các mẫu đất.",
    topic: "Science"
  },
  {
    word: "gadget",
    partOfSpeech: "noun",
    ipa: "/ˈɡædʒ.ɪt/",
    definition: "Thiết bị công nghệ nhỏ, tiện ích",
    example: "He loves buying the latest electronic gadgets.",
    translation: "Anh ấy thích mua những thiết bị điện tử nhỏ tiện ích mới nhất.",
    topic: "Science"
  },
  {
    word: "cybernetics",
    partOfSpeech: "noun",
    ipa: "/ˌsaɪ.bəˈnet.ɪks/",
    definition: "Điều khiển học, nghiên cứu hệ thống tự động",
    example: "Cybernetics studies control systems in technology and living organisms.",
    translation: "Điều khiển học nghiên cứu các hệ thống kiểm soát trong công nghệ và sinh vật sống.",
    topic: "Science"
  },

  // Media & Communication (15 words)
  {
    word: "editorial",
    partOfSpeech: "noun",
    ipa: "/ˌed.ɪˈtɔː.ri.əl/",
    definition: "Bài xã luận, bài viết ý kiến của tòa soạn",
    example: "The newspaper published a critical editorial on the new trade laws.",
    translation: "Tờ báo đã xuất bản một bài xã luận phê bình về luật thương mại mới.",
    topic: "Media"
  },
  {
    word: "broadcast",
    partOfSpeech: "verb",
    ipa: "/ˈbrɔːd.kɑːst/",
    definition: "Phát sóng chương trình (trên TV/radio)",
    example: "The interview was broadcast live to millions of viewers.",
    translation: "Cuộc phỏng vấn đã được phát sóng trực tiếp tới hàng triệu người xem.",
    topic: "Media"
  },
  {
    word: "commercial",
    partOfSpeech: "noun",
    ipa: "/kəˈmɜː.ʃəl/",
    definition: "Quảng cáo thương mại ngắn trên đài, truyền hình",
    example: "The TV commercial attracted thousands of new customers.",
    translation: "Quảng cáo truyền hình đã thu hút hàng ngàn khách hàng mới.",
    topic: "Media"
  },
  {
    word: "journalism",
    partOfSpeech: "noun",
    ipa: "/ˈdʒɜː.nə.lɪz.əm/",
    definition: "Nghề làm báo, ngành báo chí",
    example: "She decided to study journalism at university.",
    translation: "Cô ấy quyết định học ngành báo chí ở trường đại học.",
    topic: "Media"
  },
  {
    word: "censorship",
    partOfSpeech: "noun",
    ipa: "/ˈsen.sə.ʃɪp/",
    definition: "Sự kiểm duyệt thông tin, tác phẩm",
    example: "Internet censorship is a major debate topic in the digital age.",
    translation: "Kiểm duyệt Internet là một chủ đề tranh luận lớn trong kỷ nguyên số.",
    topic: "Media"
  },
  {
    word: "advertisement",
    partOfSpeech: "noun",
    ipa: "/ədˈvɜː.tɪs.mənt/",
    definition: "Mục quảng cáo, thông báo quảng bá",
    example: "We placed an advertisement in the local paper for a new developer.",
    translation: "Chúng tôi đã đăng quảng cáo trên tờ báo địa phương để tìm lập trình viên mới.",
    topic: "Media"
  },
  {
    word: "article",
    partOfSpeech: "noun",
    ipa: "/ˈɑː.tɪ.kl̩/",
    definition: "Bài viết, bài báo",
    example: "He wrote an informative article about climate change.",
    translation: "Anh ấy đã viết một bài báo nhiều thông tin bổ ích về biến đổi khí hậu.",
    topic: "Media"
  },
  {
    word: "review",
    partOfSpeech: "noun",
    ipa: "/rɪˈvjuː/",
    definition: "Sự đánh giá, phê bình phim ảnh/sách",
    example: "The movie received positive reviews from major critics.",
    translation: "Bộ phim đã nhận được những đánh giá tích cực từ các nhà phê bình lớn.",
    topic: "Media"
  },
  {
    word: "subscriber",
    partOfSpeech: "noun",
    ipa: "/səbˈskraɪ.bər/",
    definition: "Người đăng ký sử dụng dịch vụ lâu dài",
    example: "Our YouTube channel has reached one million subscribers.",
    translation: "Kênh YouTube của chúng tôi đã đạt mốc một triệu người đăng ký.",
    topic: "Media"
  },
  {
    word: "channel",
    partOfSpeech: "noun",
    ipa: "/ˈtʃæn.əl/",
    definition: "Kênh truyền thông, truyền hình",
    example: "Switch over to channel five to watch the football match.",
    translation: "Hãy chuyển sang kênh số năm để xem trận đấu bóng đá.",
    topic: "Media"
  },
  {
    word: "interview",
    partOfSpeech: "noun",
    ipa: "/ˈɪn.tə.vjuː/",
    definition: "Cuộc phỏng vấn báo chí hoặc tuyển dụng",
    example: "The president gave a brief interview to foreign reporters.",
    translation: "Tổng thống đã có cuộc phỏng vấn ngắn với các phóng viên nước ngoài.",
    topic: "Media"
  },
  {
    word: "publication",
    partOfSpeech: "noun",
    ipa: "/ˌpʌb.lɪˈkeɪ.ʃən/",
    definition: "Sự xuất bản, ấn phẩm được in",
    example: "The academic publication is released twice a year.",
    translation: "Ấn phẩm học thuật được phát hành hai lần một năm.",
    topic: "Media"
  },
  {
    word: "coverage",
    partOfSpeech: "noun",
    ipa: "/ˈkʌv.ər.ɪdʒ/",
    definition: "Tin tức báo chí đưa về một sự kiện",
    example: "The media coverage of the election was very intensive.",
    translation: "Tin tức truyền thông đưa về cuộc bầu cử rất rầm rộ.",
    topic: "Media"
  },
  {
    word: "editor",
    partOfSpeech: "noun",
    ipa: "/ˈed.ɪ.tər/",
    definition: "Biên tập viên báo chí, xuất bản",
    example: "The editor made several corrections to the front-page story.",
    translation: "Biên tập viên đã sửa đổi một số lỗi ở câu chuyện trang nhất.",
    topic: "Media"
  },
  {
    word: "publicity",
    partOfSpeech: "noun",
    ipa: "/pʌbˈlɪs.ə.ti/",
    definition: "Sự công khai quảng bá, tiếng tăm truyền thông",
    example: "The marketing campaign generated huge publicity for the product.",
    translation: "Chiến dịch tiếp thị đã tạo ra sự quảng bá lớn cho sản phẩm.",
    topic: "Media"
  },

  // People & Society (15 words)
  {
    word: "community",
    partOfSpeech: "noun",
    ipa: "/kəˈmjuː.nə.ti/",
    definition: "Cộng đồng dân cư",
    example: "We aim to build a strong local community of learners.",
    translation: "Chúng tôi đặt mục tiêu xây dựng một cộng đồng người học địa phương lớn mạnh.",
    topic: "People"
  },
  {
    word: "citizen",
    partOfSpeech: "noun",
    ipa: "/ˈsɪt.ɪ.zən/",
    definition: "Công dân của một quốc gia",
    example: "All citizens are entitled to free healthcare services.",
    translation: "Tất cả công dân đều được hưởng các dịch vụ y tế miễn phí.",
    topic: "People"
  },
  {
    word: "minority",
    partOfSpeech: "noun",
    ipa: "/maɪˈnɒr.ə.ti/",
    definition: "Nhóm thiểu số, số ít",
    example: "Ethnic minorities have the right to protect their languages.",
    translation: "Các dân tộc thiểu số có quyền bảo vệ ngôn ngữ của họ.",
    topic: "People"
  },
  {
    word: "heritage",
    partOfSpeech: "noun",
    ipa: "/ˈher.ɪ.tɪdʒ/",
    definition: "Di sản lịch sử, văn hóa truyền lại",
    example: "We must protect our cultural heritage for future generations.",
    translation: "Chúng ta phải bảo vệ di sản văn hóa của mình cho các thế hệ tương lai.",
    topic: "People"
  },
  {
    word: "custom",
    partOfSpeech: "noun",
    ipa: "/ˈkʌs.təm/",
    definition: "Tục lệ, phong tục tập quán",
    example: "It is a local custom to remove shoes before entering a house.",
    translation: "Cởi giày trước khi vào nhà là một phong tục địa phương.",
    topic: "People"
  },
  {
    word: "tradition",
    partOfSpeech: "noun",
    ipa: "/trəˈdɪʃ.ən/",
    definition: "Truyền thống văn hóa, tập quán lâu đời",
    example: "This family tradition has been passed down for centuries.",
    translation: "Truyền thống gia đình này đã được truyền lại qua nhiều thế kỷ.",
    topic: "People"
  },
  {
    word: "generation",
    partOfSpeech: "noun",
    ipa: "/ˌdʒen.əˈreɪ.ʃən/",
    definition: "Thế hệ loài người, khoảng 30 năm",
    example: "The younger generation is more comfortable with technology.",
    translation: "Thế hệ trẻ hơn cảm thấy thoải mái hơn với công nghệ.",
    topic: "People"
  },
  {
    word: "population",
    partOfSpeech: "noun",
    ipa: "/ˌpɒp.jəˈleɪ.ʃən/",
    definition: "Dân số, lượng cư dân",
    example: "The city's population is growing at an alarming rate.",
    translation: "Dân số của thành phố đang tăng ở mức báo động.",
    topic: "People"
  },
  {
    word: "behavior",
    partOfSpeech: "noun",
    ipa: "/bɪˈheɪ.vjər/",
    definition: "Hành vi, cách cư xử, đối xử",
    example: "Good behavior at school is rewarded with certificates.",
    translation: "Hành vi tốt ở trường được khen thưởng bằng các chứng nhận.",
    topic: "People"
  },
  {
    word: "attitude",
    partOfSpeech: "noun",
    ipa: "/ˈæt.ɪ.tʃuːd/",
    definition: "Thái độ, cách nhìn nhận vấn đề",
    example: "Having a positive attitude helps in overcoming challenges.",
    translation: "Có một thái độ tích cực giúp ích trong việc vượt qua thử thách.",
    topic: "People"
  },
  {
    word: "character",
    partOfSpeech: "noun",
    ipa: "/ˈkær.ək.tər/",
    definition: "Đặc điểm tính cách hoặc nhân vật",
    example: "She has a very strong character and never gives up.",
    translation: "Cô ấy có tính cách rất mạnh mẽ và không bao giờ bỏ cuộc.",
    topic: "People"
  },
  {
    word: "personality",
    partOfSpeech: "noun",
    ipa: "/ˌpɜː.sənˈæl.ə.ti/",
    definition: "Cá tính riêng biệt, nhân cách",
    example: "His friendly personality makes him popular among colleagues.",
    translation: "Cá tính thân thiện khiến anh ấy được lòng các đồng nghiệp.",
    topic: "People"
  },
  {
    word: "relationship",
    partOfSpeech: "noun",
    ipa: "/rɪˈleɪ.ʃən.ʃɪp/",
    definition: "Mối quan hệ qua lại",
    example: "Building a trustful relationship with clients takes time.",
    translation: "Xây dựng mối quan hệ tin cậy với khách hàng cần thời gian.",
    topic: "People"
  },
  {
    word: "interaction",
    partOfSpeech: "noun",
    ipa: "/ˌɪn.təˈræk.ʃən/",
    definition: "Sự tương tác, trao đổi",
    example: "Social interaction is essential for children's development.",
    translation: "Sự tương tác xã hội là rất cần thiết cho sự phát triển của trẻ em.",
    topic: "People"
  },
  {
    word: "multicultural",
    partOfSpeech: "adjective",
    ipa: "/ˌmʌl.tiˈkʌl.tʃər.əl/",
    definition: "Đa văn hóa",
    example: "London is a multicultural city with diverse communities.",
    translation: "Luân Đôn là một thành phố đa văn hóa với các cộng đồng đa dạng.",
    topic: "People"
  },

  // Education (15 words)
  {
    word: "curriculum",
    partOfSpeech: "noun",
    ipa: "/kəˈrɪk.jə.ləm/",
    definition: "Khung chương trình giảng dạy học tập",
    example: "The school is reviewing its English curriculum.",
    translation: "Trường học đang xem xét lại chương trình giảng dạy tiếng Anh của mình.",
    topic: "Education"
  },
  {
    word: "tuition",
    partOfSpeech: "noun",
    ipa: "/tʃuːˈɪʃ.ən/",
    definition: "Học phí hoặc sự giảng dạy riêng",
    example: "Private tuition can help students who are falling behind.",
    translation: "Học thêm riêng có thể giúp những học sinh đang bị tụt lại phía sau.",
    topic: "Education"
  },
  {
    word: "scholarship",
    partOfSpeech: "noun",
    ipa: "/ˈskɒl.ə.ʃɪp/",
    definition: "Học bổng trợ giúp học tập",
    example: "She won a full scholarship to study computer science in Boston.",
    translation: "Cô ấy đã giành được một học bổng toàn phần để học khoa học máy tính tại Boston.",
    topic: "Education"
  },
  {
    word: "degree",
    partOfSpeech: "noun",
    ipa: "/dɪˈɡriː/",
    definition: "Bằng cấp đại học",
    example: "He holds a master's degree in business administration.",
    translation: "Anh ấy có bằng thạc sĩ về quản trị kinh doanh.",
    topic: "Education"
  },
  {
    word: "certificate",
    partOfSpeech: "noun",
    ipa: "/səˈtɪf.ɪ.kət/",
    definition: "Chứng chỉ hoàn thành khóa học",
    example: "A certificate of completion will be emailed to all participants.",
    translation: "Chứng chỉ hoàn thành khóa học sẽ được gửi qua email cho tất cả những người tham gia.",
    topic: "Education"
  },
  {
    word: "academic",
    partOfSpeech: "adjective",
    ipa: "/ˌæk.əˈdem.ɪk/",
    definition: "Thuộc về lĩnh vực học thuật, nhà trường",
    example: "The academic year starts in September.",
    translation: "Năm học bắt đầu vào tháng Chín.",
    topic: "Education"
  },
  {
    word: "enrollment",
    partOfSpeech: "noun",
    ipa: "/ɪnˈrəʊl.mənt/",
    definition: "Sự đăng ký học, tuyển sinh",
    example: "School enrollment numbers increased significantly this year.",
    translation: "Số lượng tuyển sinh học sinh nhập học đã tăng đáng kể trong năm nay.",
    topic: "Education"
  },
  {
    word: "graduate",
    partOfSpeech: "verb",
    ipa: "/ˈɡrædʒ.ju.eɪt/",
    definition: "Tốt nghiệp khóa học/trường",
    example: "She graduated from university with honors.",
    translation: "Cô ấy đã tốt nghiệp đại học với bằng danh dự.",
    topic: "Education"
  },
  {
    word: "lecture",
    partOfSpeech: "noun",
    ipa: "/ˈlek.tʃər/",
    definition: "Bài giảng thuyết trên giảng đường",
    example: "The history lecture was very engaging.",
    translation: "Bài giảng lịch sử rất lôi cuốn.",
    topic: "Education"
  },
  {
    word: "seminar",
    partOfSpeech: "noun",
    ipa: "/ˈsem.ɪ.nɑːr/",
    definition: "Hội thảo học tập chuyên đề nhóm nhỏ",
    example: "We will hold a seminar on digital marketing next Monday.",
    translation: "Chúng tôi sẽ tổ chức một buổi hội thảo chuyên đề về tiếp thị kỹ thuật số vào thứ Hai tới.",
    topic: "Education"
  },
  {
    word: "tutorial",
    partOfSpeech: "noun",
    ipa: "/tʃuːˈtɔː.ri.əl/",
    definition: "Lớp học hướng dẫn thực hành nhóm nhỏ",
    example: "The online tutorial explains how to set up the environment.",
    translation: "Bài hướng dẫn trực tuyến giải thích cách thiết lập môi trường.",
    topic: "Education"
  },
  {
    word: "assignment",
    partOfSpeech: "noun",
    ipa: "/əˈsaɪn.mənt/",
    definition: "Nhiệm vụ, bài tập lớn được giao",
    example: "Our homework assignment is due tomorrow morning.",
    translation: "Bài tập về nhà của chúng tôi phải nộp vào sáng mai.",
    topic: "Education"
  },
  {
    word: "assessment",
    partOfSpeech: "noun",
    ipa: "/əˈses.mənt/",
    definition: "Sự đánh giá, kiểm tra năng lực",
    example: "The final assessment is worth fifty percent of the grade.",
    translation: "Bài đánh giá cuối khóa chiếm 50% tổng số điểm.",
    topic: "Education"
  },
  {
    word: "faculty",
    partOfSpeech: "noun",
    ipa: "/ˈfæk.əl.ti/",
    definition: "Toàn bộ giảng viên hoặc ngành/khoa",
    example: "She joined the law faculty as a senior lecturer.",
    translation: "Cô ấy đã gia nhập khoa luật với vai trò giảng viên cao cấp.",
    topic: "Education"
  },
  {
    word: "discipline",
    partOfSpeech: "noun",
    ipa: "/ˈdɪs.ə.plɪn/",
    definition: "Tính kỷ luật hoặc một ngành khoa học học thuật",
    example: "Scientific discipline is required to obtain accurate data.",
    translation: "Kỷ luật khoa học là cần thiết để thu thập dữ liệu chính xác.",
    topic: "Education"
  },

  // Weather & Environment (15 words)
  {
    word: "forecast",
    partOfSpeech: "noun",
    ipa: "/ˈfɔː.kɑːst/",
    definition: "Sự dự báo thời tiết trước",
    example: "The weather forecast predicts heavy rain tomorrow.",
    translation: "Dự báo thời tiết dự đoán ngày mai sẽ có mưa lớn.",
    topic: "Weather"
  },
  {
    word: "climate",
    partOfSpeech: "noun",
    ipa: "/ˈklaɪ.mət/",
    definition: "Khí hậu vùng, thời tiết trung bình",
    example: "Global warming is changing the earth's climate patterns.",
    translation: "Sự nóng lên toàn cầu đang làm thay đổi các quy luật khí hậu trái đất.",
    topic: "Weather"
  },
  {
    word: "temperature",
    partOfSpeech: "noun",
    ipa: "/ˈtem.prə.tʃər/",
    definition: "Nhiệt độ môi trường, cơ thể",
    example: "The temperature dropped to freezing point overnight.",
    translation: "Nhiệt độ đã giảm xuống mức đóng băng qua đêm.",
    topic: "Weather"
  },
  {
    word: "humidity",
    partOfSpeech: "noun",
    ipa: "/hjuːˈmɪd.ə.ti/",
    definition: "Độ ẩm không khí",
    example: "High humidity makes the summer heat feel worse.",
    translation: "Độ ẩm cao làm cho cái nóng mùa hè có cảm giác tồi tệ hơn.",
    topic: "Weather"
  },
  {
    word: "precipitation",
    partOfSpeech: "noun",
    ipa: "/prɪˌsɪp.ɪˈteɪ.ʃən/",
    definition: "Lượng mưa, tuyết rơi (các dạng ngưng tụ hơi nước)",
    example: "The annual precipitation in this desert is very low.",
    translation: "Lượng mưa hàng năm ở sa mạc này rất thấp.",
    topic: "Weather"
  },
  {
    word: "breeze",
    partOfSpeech: "noun",
    ipa: "/briːz/",
    definition: "Cơn gió nhẹ mát",
    example: "A cool sea breeze refreshed the tourists.",
    translation: "Một cơn gió biển mát lành đã làm sảng khoái các du khách.",
    topic: "Weather"
  },
  {
    word: "drought",
    partOfSpeech: "noun",
    ipa: "/draʊt/",
    definition: "Hạn hán kéo dài",
    example: "The severe drought caused major crop failures.",
    translation: "Đợt hạn hán nghiêm trọng đã gây ra mất mùa lớn.",
    topic: "Weather"
  },
  {
    word: "ecosystem",
    partOfSpeech: "noun",
    ipa: "/ˈiː.kəʊˌsɪs.təm/",
    definition: "Hệ sinh thái sinh học",
    example: "Deforestation destroys the forest ecosystem.",
    translation: "Nạn phá rừng phá hủy hệ sinh thái rừng.",
    topic: "Weather"
  },
  {
    word: "conservation",
    partOfSpeech: "noun",
    ipa: "/ˌhɒn.səˈveɪ.ʃən/",
    definition: "Sự bảo tồn thiên nhiên, năng lượng",
    example: "Water conservation is essential in dry seasons.",
    translation: "Bảo tồn nước là rất cần thiết trong mùa khô.",
    topic: "Weather"
  },
  {
    word: "pollution",
    partOfSpeech: "noun",
    ipa: "/pəˈluː.ʃən/",
    definition: "Sự ô nhiễm môi trường",
    example: "Air pollution in big cities has reached critical levels.",
    translation: "Ô nhiễm không khí ở các thành phố lớn đã chạm mức nghiêm trọng.",
    topic: "Weather"
  },
  {
    word: "biodiversity",
    partOfSpeech: "noun",
    ipa: "/ˌbaɪ.əʊ.daɪˈvɜː.sə.ti/",
    definition: "Sự đa dạng sinh học",
    example: "Coral reefs support a high level of biodiversity.",
    translation: "Các rạn san hô hỗ trợ một mức độ đa dạng sinh học rất cao.",
    topic: "Weather"
  },
  {
    word: "glacier",
    partOfSpeech: "noun",
    ipa: "/ˈɡlæs.i.ər/",
    definition: "Sông băng tích tụ",
    example: "Many glaciers are melting due to global warming.",
    translation: "Nhiều sông băng đang tan chảy do sự nóng lên toàn cầu.",
    topic: "Weather"
  },
  {
    word: "atmosphere",
    partOfSpeech: "noun",
    ipa: "/ˈæt.məs.fɪər/",
    definition: "Bầu khí quyển hoặc bầu không khí",
    example: "Greenhouse gases trap heat in the earth's atmosphere.",
    translation: "Khí nhà kính giữ nhiệt trong bầu khí quyển trái đất.",
    topic: "Weather"
  },
  {
    word: "disaster",
    partOfSpeech: "noun",
    ipa: "/dɪˈzɑː.stər/",
    definition: "Thảm họa thiên tai, tai họa",
    example: "The earthquake was a major natural disaster.",
    translation: "Trận động đất là một thảm họa thiên nhiên lớn.",
    topic: "Weather"
  },
  {
    word: "ecology",
    partOfSpeech: "noun",
    ipa: "/iˈhɒl.ə.dʒi/",
    definition: "Sinh thái học, nghiên cứu sinh thái",
    example: "Ecology explores relations of organisms to one another.",
    translation: "Sinh thái học khám phá các mối quan hệ của sinh vật với nhau.",
    topic: "Weather"
  },

  // Health & Medicine (15 words)
  {
    word: "diagnosis",
    partOfSpeech: "noun",
    ipa: "/ˌdaɪ.əɡˈnəʊ.sɪs/",
    definition: "Sự chẩn đoán bệnh trạng",
    example: "The physician confirmed the diagnosis after several tests.",
    translation: "Bác sĩ đã xác nhận chẩn đoán sau khi làm một số xét nghiệm.",
    topic: "Health"
  },
  {
    word: "treatment",
    partOfSpeech: "noun",
    ipa: "/ˈtriːt.mənt/",
    definition: "Cách điều trị, chữa trị",
    example: "The patient responded well to the medical treatment.",
    translation: "Bệnh nhân đã đáp ứng tốt với phương pháp điều trị y tế.",
    topic: "Health"
  },
  {
    word: "prescription",
    partOfSpeech: "noun",
    ipa: "/prɪˈskrɪp.ʃən/",
    definition: "Đơn thuốc của bác sĩ",
    example: "You need a prescription to buy these strong antibiotics.",
    translation: "Bạn cần một đơn thuốc để mua những loại kháng sinh mạnh này.",
    topic: "Health"
  },
  {
    word: "symptom",
    partOfSpeech: "noun",
    ipa: "/ˈsɪmp.təm/",
    definition: "Triệu chứng lâm sàng của bệnh",
    example: "A high fever is a common symptom of the flu.",
    translation: "Sốt cao là triệu chứng phổ biến của bệnh cúm.",
    topic: "Health"
  },
  {
    word: "infection",
    partOfSpeech: "noun",
    ipa: "/ɪnˈfek.ʃən/",
    definition: "Sự lây nhiễm trùng",
    example: "Wash the wound to prevent a bacterial infection.",
    translation: "Hãy rửa sạch vết thương để ngăn ngừa nhiễm trùng vi khuẩn.",
    topic: "Health"
  },
  {
    word: "hygiene",
    partOfSpeech: "noun",
    ipa: "/ˈhaɪ.dʒiːn/",
    definition: "Hoạt động vệ sinh, giữ sạch sẽ",
    example: "Good personal hygiene prevents the spread of diseases.",
    translation: "Vệ sinh cá nhân tốt giúp ngăn ngừa sự lây lan của bệnh tật.",
    topic: "Health"
  },
  {
    word: "nutrition",
    partOfSpeech: "noun",
    ipa: "/njuːˈtrɪʃ.ən/",
    definition: "Sự dinh dưỡng, chất dinh dưỡng",
    example: "Good nutrition is essential for growing children.",
    translation: "Dinh dưỡng tốt là rất cần thiết cho trẻ em đang phát triển.",
    topic: "Health"
  },
  {
    word: "fitness",
    partOfSpeech: "noun",
    ipa: "/ˈfɪt.nəs/",
    definition: "Sự sung sức, thể lực khỏe mạnh",
    example: "He goes to the gym daily to maintain physical fitness.",
    translation: "Anh ấy đến phòng tập mỗi ngày để duy trì thể lực.",
    topic: "Health"
  },
  {
    word: "therapy",
    partOfSpeech: "noun",
    ipa: "/ˈθer.ə.pi/",
    definition: "Liệu pháp, trị liệu y học",
    example: "Physical therapy helped him walk again after the accident.",
    translation: "Vật lý trị liệu đã giúp anh ấy đi lại được sau tai nạn.",
    topic: "Health"
  },
  {
    word: "physician",
    partOfSpeech: "noun",
    ipa: "/fɪˈzɪʃ.ən/",
    definition: "Bác sĩ đa khoa, nội khoa",
    example: "Consult your family physician before starting a new diet.",
    translation: "Hãy tham khảo ý kiến bác sĩ gia đình trước khi bắt đầu một chế độ ăn mới.",
    topic: "Health"
  },
  {
    word: "patient",
    partOfSpeech: "noun",
    ipa: "/ˈaɪ.ʃənt/",
    definition: "Người bệnh, bệnh nhân",
    example: "The nurse is taking care of the elderly patient.",
    translation: "Y tá đang chăm sóc bệnh nhân lớn tuổi.",
    topic: "Health"
  },
  {
    word: "clinic",
    partOfSpeech: "noun",
    ipa: "/ˈklɪn.ɪk/",
    definition: "Phòng khám đa khoa, chuyên khoa",
    example: "She works at a local dental clinic.",
    translation: "Cô ấy làm việc tại một phòng khám nha khoa địa phương.",
    topic: "Health"
  },
  {
    word: "disease",
    partOfSpeech: "noun",
    ipa: "/dɪˈziːz/",
    definition: "Bệnh tật nói chung",
    example: "Prevention is better than curing a disease.",
    translation: "Phòng bệnh hơn chữa bệnh.",
    topic: "Health"
  },
  {
    word: "epidemic",
    partOfSpeech: "noun",
    ipa: "/ˌep.ɪˈdem.ɪk/",
    definition: "Đợt dịch bệnh bùng phát",
    example: "Health authorities are trying to control the flu epidemic.",
    translation: "Các cơ quan y tế đang cố gắng kiểm soát dịch cúm bùng phát.",
    topic: "Health"
  },
  {
    word: "recovery",
    partOfSpeech: "noun",
    ipa: "/rɪˈhʌv.ər.i/",
    definition: "Sự hồi phục sức khỏe",
    example: "We wish you a speedy and complete recovery.",
    translation: "Chúng tôi chúc bạn mau chóng hồi phục hoàn toàn.",
    topic: "Health"
  },

  // Food & Drink (15 words)
  {
    word: "recipe",
    partOfSpeech: "noun",
    ipa: "/ˈres.ɪ.pi/",
    definition: "Công thức nấu món ăn",
    example: "She shared her secret chocolate cake recipe with me.",
    translation: "Cô ấy đã chia sẻ công thức bí mật làm bánh sô cô la với tôi.",
    topic: "Food"
  },
  {
    word: "ingredient",
    partOfSpeech: "noun",
    ipa: "/ɪnˈɡriː.di.ənt/",
    definition: "Nguyên liệu chế biến món ăn",
    example: "Fresh ingredients are key to a tasty meal.",
    translation: "Nguyên liệu tươi là chìa khóa để có một bữa ăn ngon miệng.",
    topic: "Food"
  },
  {
    word: "flavor",
    partOfSpeech: "noun",
    ipa: "/ˈfleɪ.vər/",
    definition: "Hương vị, mùi vị món ăn",
    example: "The soup has a rich, savory flavor.",
    translation: "Món súp có hương vị đậm đà, thơm ngon.",
    topic: "Food"
  },
  {
    word: "vegetarian",
    partOfSpeech: "noun",
    ipa: "/ˌvedʒ.ɪˈteər.i.ən/",
    definition: "Người ăn chay không ăn thịt",
    example: "He became a vegetarian for ethical reasons.",
    translation: "Anh ấy đã trở thành một người ăn chay vì lý do đạo đức.",
    topic: "Food"
  },
  {
    word: "organic",
    partOfSpeech: "adjective",
    ipa: "/ɔːˈɡæn.ɪk/",
    definition: "Thức ăn hữu cơ, tự nhiên không hóa chất",
    example: "Organic vegetables are more expensive but healthier.",
    translation: "Rau hữu cơ đắt hơn nhưng tốt cho sức khỏe hơn.",
    topic: "Food"
  },
  {
    word: "cuisine",
    partOfSpeech: "noun",
    ipa: "/kwɪˈziːn/",
    definition: "Nghệ thuật ẩm thực một vùng miền, đất nước",
    example: "I really love traditional Vietnamese cuisine.",
    translation: "Tôi thực sự yêu thích ẩm thực truyền thống Việt Nam.",
    topic: "Food"
  },
  {
    word: "beverage",
    partOfSpeech: "noun",
    ipa: "/ˈbev.ər.ɪdʒ/",
    definition: "Các loại đồ uống nói chung",
    example: "No alcoholic beverages are allowed inside the stadium.",
    translation: "Không được mang đồ uống có cồn vào bên trong sân vận động.",
    topic: "Food"
  },
  {
    word: "dessert",
    partOfSpeech: "noun",
    ipa: "/dɪˈzɜːt/",
    definition: "Món tráng miệng sau bữa ăn",
    example: "We had fruit salad and ice cream for dessert.",
    translation: "Chúng tôi đã ăn salad trái cây và kem cho món tráng miệng.",
    topic: "Food"
  },
  {
    word: "banquet",
    partOfSpeech: "noun",
    ipa: "/ˈbæŋ.kwɪt/",
    definition: "Bữa tiệc lớn, yến tiệc",
    example: "A royal banquet was held in honor of the visitors.",
    translation: "Một bữa yến tiệc hoàng gia đã được tổ chức để vinh danh các vị khách.",
    topic: "Food"
  },
  {
    word: "appetite",
    partOfSpeech: "noun",
    ipa: "/ˈæp.ə.taɪt/",
    definition: "Sự thèm ăn, cảm giác ngon miệng",
    example: "All that walking has given me a huge appetite.",
    translation: "Đi bộ nhiều thế đã cho tôi cảm giác rất thèm ăn.",
    topic: "Food"
  },
  {
    word: "buffet",
    partOfSpeech: "noun",
    ipa: "/ˈbʊf.eɪ/",
    definition: "Bữa tiệc ăn buffet tự chọn",
    example: "The hotel provides a complimentary breakfast buffet.",
    translation: "Khách sạn cung cấp một bữa buffet sáng tự chọn miễn phí.",
    topic: "Food"
  },
  {
    word: "chef",
    partOfSpeech: "noun",
    ipa: "/ʃef/",
    definition: "Đầu bếp trưởng chuyên nghiệp",
    example: "The head chef prepares all signature dishes.",
    translation: "Đầu bếp trưởng chuẩn bị tất cả các món ăn đặc trưng.",
    topic: "Food"
  },
  {
    word: "dietary",
    partOfSpeech: "adjective",
    ipa: "/ˈdaɪ.ə.tər.i/",
    definition: "Thuộc về chế độ ăn uống hàng ngày",
    example: "Please inform us if you have any special dietary requirements.",
    translation: "Vui lòng thông báo cho chúng tôi nếu bạn có bất kỳ yêu cầu ăn kiêng đặc biệt nào.",
    topic: "Food"
  },
  {
    word: "delicacy",
    partOfSpeech: "noun",
    ipa: "/ˈdel.ɪ.hə.si/",
    definition: "Cao lương mỹ vị, món ăn đặc sản ngon lạ",
    example: "Caviar is considered a luxury delicacy worldwide.",
    translation: "Trứng cá muối được coi là món mỹ vị xa xỉ trên toàn thế giới.",
    topic: "Food"
  },
  {
    word: "nourishment",
    partOfSpeech: "noun",
    ipa: "/ˈnʌr.ɪʃ.mənt/",
    definition: "Sự nuôi dưỡng, chất dinh dưỡng cần thiết",
    example: "Young children need proper nourishment to grow healthy.",
    translation: "Trẻ nhỏ cần được nuôi dưỡng đầy đủ để lớn lên khỏe mạnh.",
    topic: "Food"
  },

  // Money & Finance (15 words)
  {
    word: "budget",
    partOfSpeech: "noun",
    ipa: "/ˈbʌdʒ.ɪt/",
    definition: "Ngân sách chi tiêu được duyệt",
    example: "We must stay within our marketing budget for this quarter.",
    translation: "Chúng ta phải giữ trong giới hạn ngân sách tiếp thị cho quý này.",
    topic: "Money"
  },
  {
    word: "expense",
    partOfSpeech: "noun",
    ipa: "/ɪkˈspens/",
    definition: "Chi phí, chi tiêu tài chính",
    example: "The project expense exceeded our initial expectations.",
    translation: "Chi phí dự án đã vượt quá mong đợi ban đầu của chúng tôi.",
    topic: "Money"
  },
  {
    word: "revenue",
    partOfSpeech: "noun",
    ipa: "/ˈrev.ən.juː/",
    definition: "Tổng doanh thu bán hàng, dịch vụ",
    example: "The firm's annual revenue reached a record high.",
    translation: "Doanh thu hàng năm của công ty đã đạt mức cao kỷ lục.",
    topic: "Money"
  },
  {
    word: "investment",
    partOfSpeech: "noun",
    ipa: "/ɪnˈvest.mənt/",
    definition: "Khoản đầu tư sinh lời",
    example: "Real estate is generally a safe long-term investment.",
    translation: "Bất động sản thường là một khoản đầu tư dài hạn an toàn.",
    topic: "Money"
  },
  {
    word: "debt",
    partOfSpeech: "noun",
    ipa: "/det/",
    definition: "Khoản tiền nợ",
    example: "He managed to pay off his student debts within three years.",
    translation: "Anh ấy đã xoay xở trả hết các khoản nợ sinh viên trong ba năm.",
    topic: "Money"
  },
  {
    word: "profit",
    partOfSpeech: "noun",
    ipa: "/ˈprɒf.ɪt/",
    definition: "Lợi nhuận ròng có được",
    example: "The shop made a decent profit last month.",
    translation: "Cửa hàng đã đạt được lợi nhuận khá tốt vào tháng trước.",
    topic: "Money"
  },
  {
    word: "transaction",
    partOfSpeech: "noun",
    ipa: "/trænˈzæk.ʃən/",
    definition: "Giao dịch thanh toán tiền bạc",
    example: "You will receive a confirmation email after each transaction.",
    translation: "Bạn sẽ nhận được email xác nhận sau mỗi giao dịch.",
    topic: "Money"
  },
  {
    word: "bankruptcy",
    partOfSpeech: "noun",
    ipa: "/ˈbæŋ.krəpt.si/",
    definition: "Sự phá sản doanh nghiệp, cá nhân",
    example: "The airline declared bankruptcy due to rising fuel costs.",
    translation: "Hãng hàng không tuyên bố phá sản do chi phí nhiên liệu tăng cao.",
    topic: "Money"
  },
  {
    word: "pension",
    partOfSpeech: "noun",
    ipa: "/ˈpen.ʃən/",
    definition: "Lương hưu tuổi già",
    example: "Many retired workers live on their state pensions.",
    translation: "Nhiều công nhân nghỉ hưu sống nhờ vào lương hưu nhà nước.",
    topic: "Money"
  },
  {
    word: "subsidy",
    partOfSpeech: "noun",
    ipa: "/ˈsʌb.sɪ.di/",
    definition: "Tiền trợ giá, trợ cấp tài chính từ chính phủ",
    example: "The government offers a subsidy for electric cars.",
    translation: "Chính phủ cung cấp một khoản trợ giá cho xe điện.",
    topic: "Money"
  },
  {
    word: "audit",
    partOfSpeech: "noun",
    ipa: "/ˈɔː.dɪt/",
    definition: "Hoạt động kiểm toán tài chính",
    example: "The annual tax audit took place in early March.",
    translation: "Cuộc kiểm toán thuế hàng năm diễn ra vào đầu tháng Ba.",
    topic: "Money"
  },
  {
    word: "dividend",
    partOfSpeech: "noun",
    ipa: "/ˈdɪv.ɪ.dend/",
    definition: "Cổ tức chia cho cổ đông",
    example: "Shareholders will receive a dividend of five cents per share.",
    translation: "Các cổ đông sẽ nhận được cổ tức 5 xu trên mỗi cổ phiếu.",
    topic: "Money"
  },
  {
    word: "interest",
    partOfSpeech: "noun",
    ipa: "/ˈɪn.trəst/",
    definition: "Tiền lãi suất ngân hàng",
    example: "The bank offers a high interest rate on savings accounts.",
    translation: "Ngân hàng cung cấp mức lãi suất cao cho tài khoản tiết kiệm.",
    topic: "Money"
  },
  {
    word: "mortgage",
    partOfSpeech: "noun",
    ipa: "/ˈmɔː.ɡɪdʒ/",
    definition: "Khoản vay thế chấp mua nhà đất",
    example: "They took out a thirty-year mortgage to buy their first home.",
    translation: "Họ đã vay thế chấp ba mươi năm để mua ngôi nhà đầu tiên.",
    topic: "Money"
  },
  {
    word: "currency",
    partOfSpeech: "noun",
    ipa: "/ˈhʌr.ən.si/",
    definition: "Đơn vị tiền tệ lưu hành",
    example: "You should exchange some local currency before traveling.",
    translation: "Bạn nên đổi một ít tiền tệ địa phương trước khi đi du lịch.",
    topic: "Money"
  },

  // Work & Employment (15 words)
  {
    word: "occupation",
    partOfSpeech: "noun",
    ipa: "/ˌɒk.jəˈpeɪ.ʃən/",
    definition: "Nghề nghiệp chính, công việc sinh sống",
    example: "Please state your age, name, and occupation on this form.",
    translation: "Vui lòng ghi rõ tuổi, tên, và nghề nghiệp của bạn trên biểu mẫu này.",
    topic: "Work"
  },
  {
    word: "redundant",
    partOfSpeech: "adjective",
    ipa: "/rɪˈdʌn.dənt/",
    definition: "Bị sa thải do thừa nhân sự",
    example: "Fifty workers were made redundant when the branch closed.",
    translation: "Năm mươi công nhân đã bị sa thải do dư thừa khi chi nhánh đóng cửa.",
    topic: "Work"
  },
  {
    word: "qualification",
    partOfSpeech: "noun",
    ipa: "/ˌkwɒl.ɪ.fɪˈkeɪ.ʃən/",
    definition: "Bằng cấp, chứng chỉ năng lực chuyên môn",
    example: "Academic qualifications are important, but experience matters too.",
    translation: "Bằng cấp học thuật quan trọng, nhưng kinh nghiệm cũng rất đáng kể.",
    topic: "Work"
  },
  {
    word: "headhunter",
    partOfSpeech: "noun",
    ipa: "/ˈhedˌhʌn.tər/",
    definition: "Người săn đầu người, tìm nhân sự giỏi",
    example: "A headhunter approached him about a manager position.",
    translation: "Một chuyên viên săn đầu người đã tiếp cận anh ấy về vị trí quản lý.",
    topic: "Work"
  },
  {
    word: "applicant",
    partOfSpeech: "noun",
    ipa: "/ˈæp.lɪ.kənt/",
    definition: "Người nộp hồ sơ xin việc, ứng viên",
    example: "There were over one hundred applicants for the junior design job.",
    translation: "Có hơn một trăm ứng viên nộp hồ sơ cho công việc thiết kế trẻ.",
    topic: "Work"
  },
  {
    word: "employer",
    partOfSpeech: "noun",
    ipa: "/ɪmˈplɔɪ.ər/",
    definition: "Người sử dụng lao động, người chủ",
    example: "The employer offers healthy benefits and flexible working hours.",
    translation: "Người chủ cung cấp phúc lợi tốt và giờ làm việc linh hoạt.",
    topic: "Work"
  },
  {
    word: "employee",
    partOfSpeech: "noun",
    ipa: "/ɪmˈplɔɪ.iː/",
    definition: "Người làm thuê, nhân viên",
    example: "The company values employee feedback and suggestions.",
    translation: "Công ty trân trọng ý kiến phản hồi và đề xuất của nhân viên.",
    topic: "Work"
  },
  {
    word: "salary",
    partOfSpeech: "noun",
    ipa: "/ˈsæl.ər.i/",
    definition: "Tiền lương tháng cố định",
    example: "She negotiated a higher starting salary during the interview.",
    translation: "Cô ấy đã thương thảo mức lương khởi điểm cao hơn trong buổi phỏng vấn.",
    topic: "Work"
  },
  {
    word: "wage",
    partOfSpeech: "noun",
    ipa: "/weɪdʒ/",
    definition: "Tiền lương trả theo giờ, ngày, tuần",
    example: "The minimum wage is adjusted annually to cope with inflation.",
    translation: "Mức lương tối thiểu được điều chỉnh hàng năm để đối phó với lạm phát.",
    topic: "Work"
  },
  {
    word: "promotion",
    partOfSpeech: "noun",
    ipa: "/prəˈməʊ.ʃən/",
    definition: "Sự thăng chức trong công việc",
    example: "He earned a promotion to senior manager within one year.",
    translation: "Anh ấy đã đạt được thăng chức lên quản lý cấp cao trong vòng một năm.",
    topic: "Work"
  },
  {
    word: "resignation",
    partOfSpeech: "noun",
    ipa: "/ˌrez.ɪɡˈneɪ.ʃən/",
    definition: "Đơn xin thôi việc, sự từ chức",
    example: "The CEO announced his resignation this morning.",
    translation: "Giám đốc điều hành đã công bố quyết định từ chức sáng nay.",
    topic: "Work"
  },
  {
    word: "retirement",
    partOfSpeech: "noun",
    ipa: "/rɪˈtaɪə.mənt/",
    definition: "Sự nghỉ hưu",
    example: "After retirement, she wants to travel around the world.",
    translation: "Sau khi nghỉ hưu, cô ấy muốn đi du lịch vòng quanh thế giới.",
    topic: "Work"
  },
  {
    word: "trade",
    partOfSpeech: "noun",
    ipa: "/treɪd/",
    definition: "Hoạt động giao thương, thương mại",
    example: "International trade boosts the economic growth of both nations.",
    translation: "Thương mại quốc tế thúc đẩy sự tăng trưởng kinh tế của cả hai quốc gia.",
    topic: "Work"
  },
  {
    word: "industry",
    partOfSpeech: "noun",
    ipa: "/ˈnɪn.də.stri/",
    definition: "Ngành công nghiệp hoặc công nghiệp nói chung",
    example: "The software industry is growing rapidly worldwide.",
    translation: "Ngành công nghiệp phần mềm đang phát triển nhanh chóng trên toàn thế giới.",
    topic: "Work"
  },
  {
    word: "manufacture",
    partOfSpeech: "verb",
    ipa: "/ˌmæn.jəˈfæk.tʃər/",
    definition: "Sản xuất hàng hóa công nghiệp",
    example: "The factory manufactures electronic parts for export.",
    translation: "Nhà máy sản xuất các linh kiện điện tử để xuất khẩu.",
    topic: "Work"
  },

  // General B2 (15 words)
  {
    word: "criticism",
    partOfSpeech: "noun",
    ipa: "/ˈkrɪt.ɪ.sɪ.zəm/",
    definition: "Sự chỉ trích, lời phê bình đánh giá",
    example: "The program faced heavy criticism for its poor content.",
    translation: "Chương trình đối mặt với sự chỉ trích nặng nề vì nội dung kém chất lượng.",
    topic: "General"
  },
  {
    word: "sponsorship",
    partOfSpeech: "noun",
    ipa: "/ˈspɒn.sə.ʃɪp/",
    definition: "Sự tài trợ, gói tài trợ thương mại",
    example: "The event is organized under the sponsorship of a local bank.",
    translation: "Sự kiện được tổ chức dưới sự tài trợ của một ngân hàng địa phương.",
    topic: "General"
  },
  {
    word: "consumerism",
    partOfSpeech: "noun",
    ipa: "/kənˈsjuː.mə.rɪ.zəm/",
    definition: "Chủ nghĩa tiêu dùng, bảo vệ quyền lợi người mua",
    example: "Our seminar will discuss modern consumerism and brand choice.",
    translation: "Hội thảo của chúng tôi sẽ thảo luận về chủ nghĩa tiêu dùng hiện đại và sự lựa chọn thương hiệu.",
    topic: "General"
  },
  {
    word: "perspective",
    partOfSpeech: "noun",
    ipa: "/pəˈspek.tɪv/",
    definition: "Góc nhìn cá nhân, quan điểm nhìn nhận",
    example: "Traveling opens your mind to different cultural perspectives.",
    translation: "Đi du lịch mở mang trí óc của bạn với các quan điểm văn hóa khác nhau.",
    topic: "General"
  },
  {
    word: "emphasize",
    partOfSpeech: "verb",
    ipa: "/ˈem.fə.saɪz/",
    definition: "Nhấn mạnh tầm quan trọng điều gì",
    example: "The teacher emphasized the importance of regular review.",
    translation: "Giáo viên nhấn mạnh tầm quan trọng của việc ôn tập thường xuyên.",
    topic: "General"
  },
  {
    word: "category",
    partOfSpeech: "noun",
    ipa: "/ˈhæt.ə.ɡri/",
    definition: "Hạng mục phân loại, thể loại",
    example: "Books are classified into different categories in the catalog.",
    translation: "Sách được phân loại thành các danh mục khác nhau trong danh mục tra cứu.",
    topic: "General"
  },
  {
    word: "justification",
    partOfSpeech: "noun",
    ipa: "/ˌdʒʌs.tɪ.fɪˈkeɪ.ʃən/",
    definition: "Sự biện hộ, lý do chính đáng",
    example: "There is no justification for such unprofessional behavior.",
    translation: "Không có lý do chính đáng nào cho hành vi thiếu chuyên nghiệp như vậy.",
    topic: "General"
  },
  {
    word: "guarantee",
    partOfSpeech: "verb",
    ipa: "/ˌɡær.ənˈtiː/",
    definition: "Bảo hành, cam đoan chắc chắn",
    example: "We guarantee that all our products are organic.",
    translation: "Chúng tôi bảo đảm rằng tất cả các sản phẩm của chúng tôi đều là hữu cơ.",
    topic: "General"
  },
  {
    word: "fundamental",
    partOfSpeech: "adjective",
    ipa: "/ˌfʌn.dəˈmen.təl/",
    definition: "Cơ bản, thiết yếu, nền tảng",
    example: "Freedom of speech is a fundamental human right.",
    translation: "Tự do ngôn luận là một quyền cơ bản của con người.",
    topic: "General"
  },
  {
    word: "decline",
    partOfSpeech: "verb",
    ipa: "/dɪˈhlaɪn/",
    definition: "Từ chối khéo / suy giảm số lượng",
    example: "She declined the job offer because the salary was too low.",
    translation: "Cô ấy đã từ chối lời mời nhận việc vì mức lương quá thấp.",
    topic: "General"
  },
  {
    word: "objective",
    partOfSpeech: "adjective",
    ipa: "/əbˈdʒek.tɪv/",
    definition: "Khách quan, không định kiến",
    example: "We need an objective assessment of the project's success.",
    translation: "Chúng ta cần một đánh giá khách quan về thành công của dự án.",
    topic: "General"
  },
  {
    word: "neutral",
    partOfSpeech: "adjective",
    ipa: "/ˈnjuː.trəl/",
    definition: "Trung lập, không theo phe nào",
    example: "Journalists must remain neutral during political conflicts.",
    translation: "Các nhà báo phải giữ thái độ trung lập trong các cuộc xung đột chính trị.",
    topic: "General"
  },
  {
    word: "logical",
    partOfSpeech: "adjective",
    ipa: "/ˈlɒdʒ.ɪ.həl/",
    definition: "Hợp lý, đúng đắn về mặt logic",
    example: "His argument is clear, logical, and easy to follow.",
    translation: "Lập luận của anh ấy rõ ràng, logic và dễ theo dõi.",
    topic: "General"
  },
  {
    word: "concept",
    partOfSpeech: "noun",
    ipa: "/ˈhɒn.sept/",
    definition: "Khái niệm lý thuyết, ý niệm",
    example: "The basic concept of the app is simplicity and speed.",
    translation: "Khái niệm cơ bản của ứng dụng là sự đơn giản và tốc độ.",
    topic: "General"
  },
  {
    word: "outcome",
    partOfSpeech: "noun",
    ipa: "/ˈaʊt.hʌm/",
    definition: "Kết quả cuối cùng của sự việc",
    example: "We are waiting for the final outcome of the negotiation.",
    translation: "Chúng tôi đang chờ đợi kết quả cuối cùng của cuộc đàm phán.",
    topic: "General"
  }
];
