export interface IpaSymbol {
  symbol: string;
  type: 'vowel' | 'diphthong' | 'consonant';
  subType?: 'short' | 'long' | 'voiced' | 'voiceless';
  guide: string;
  example: string;
  exampleIpa: string;
}

export const ipaData: IpaSymbol[] = [
  // --- Vowels (Short) ---
  {
    symbol: "ɪ",
    type: "vowel",
    subType: "short",
    guide: "Phát âm ngắn, môi hơi mở sang hai bên, lưỡi hạ thấp. Giống âm 'i' của tiếng Việt nhưng phát âm nhanh, dứt khoát hơn.",
    example: "sit",
    exampleIpa: "/sɪt/"
  },
  {
    symbol: "e",
    type: "vowel",
    subType: "short",
    guide: "Mở rộng miệng vừa phải, lưỡi hạ tự nhiên, phát âm ngắn. Khá tương đồng với âm 'e' tiếng Việt nhưng dứt khoát hơn.",
    example: "desk",
    exampleIpa: "/desk/"
  },
  {
    symbol: "æ",
    type: "vowel",
    subType: "short",
    guide: "Mở rộng miệng hết cỡ (khẩu hình chữ A, phát âm hơi lai giữa A và E), lưỡi hạ thấp chạm chân hàm răng dưới.",
    example: "cat",
    exampleIpa: "/cat/"
  },
  {
    symbol: "ɒ",
    type: "vowel",
    subType: "short",
    guide: "Hơi tròn môi, lưỡi thụt về phía sau, phát âm ngắn dứt khoát. Gần giống âm 'o' ngắn trong tiếng Việt.",
    example: "hot",
    exampleIpa: "/hɒt/"
  },
  {
    symbol: "ʊ",
    type: "vowel",
    subType: "short",
    guide: "Môi hơi tròn và đưa ra phía trước, phát âm ngắn dứt khoát từ cổ họng. Khá giống âm 'u' nhẹ trong tiếng Việt.",
    example: "foot",
    exampleIpa: "/fʊt/"
  },
  {
    symbol: "ʌ",
    type: "vowel",
    subType: "short",
    guide: "Miệng mở tự nhiên, hơi mở rộng một chút, phát âm ngắn. Hơi giống sự lai giữa âm 'ă' và âm 'ơ' tiếng Việt.",
    example: "cup",
    exampleIpa: "/kʌp/"
  },
  {
    symbol: "ə",
    type: "vowel",
    subType: "short",
    guide: "Âm yếu nhất (Schwa), thả lỏng toàn bộ cơ miệng, phát âm nhẹ, ngắn. Giống âm 'ơ' rất ngắn và không nhấn trọng âm.",
    example: "about",
    exampleIpa: "/əˈbaʊt/"
  },

  // --- Vowels (Long) ---
  {
    symbol: "i:",
    type: "vowel",
    subType: "long",
    guide: "Căng khóe miệng sang hai bên như đang cười mỉm, lưỡi nâng cao, kéo dài âm hơi dài hơn âm 'i' bình thường.",
    example: "meet",
    exampleIpa: "/mi:t/"
  },
  {
    symbol: "ɑ:",
    type: "vowel",
    subType: "long",
    guide: "Mở miệng rộng theo chiều dọc, lưỡi hạ thấp và thụt nhẹ về sau, phát âm âm 'a' trầm sâu từ vòm họng.",
    example: "smart",
    exampleIpa: "/smɑ:t/"
  },
  {
    symbol: "ɔ:",
    type: "vowel",
    subType: "long",
    guide: "Tròn môi và nhô môi ra phía trước, lưỡi thụt về sau, phát âm âm 'o' kéo dài sâu từ cổ họng.",
    example: "talk",
    exampleIpa: "/tɔ:k/"
  },
  {
    symbol: "u:",
    type: "vowel",
    subType: "long",
    guide: "Tròn môi nhỏ như đang chuẩn bị huýt sáo, nâng cuống lưỡi lên cao, phát âm âm 'u' kéo dài tròn trịa.",
    example: "boot",
    exampleIpa: "/bu:t/"
  },
  {
    symbol: "ɜ:",
    type: "vowel",
    subType: "long",
    guide: "Môi mở hờ tự nhiên, lưỡi uốn cong nhẹ về phía sau (không chạm vòm họng), phát âm âm 'ơ' kéo dài rung nhẹ giọng.",
    example: "bird",
    exampleIpa: "/bɜ:d/"
  },

  // --- Diphthongs ---
  {
    symbol: "ɪə",
    type: "diphthong",
    guide: "Nguyên âm đôi. Phát âm bắt đầu bằng âm nguyên âm ngắn /ɪ/, sau đó lướt mượt mà sang âm Schwa /ə/.",
    example: "clear",
    exampleIpa: "/klɪə/"
  },
  {
    symbol: "eə",
    type: "diphthong",
    guide: "Nguyên âm đôi. Phát âm bắt đầu bằng âm nguyên âm ngắn /e/, sau đó lướt mượt mà sang âm Schwa /ə/.",
    example: "there",
    exampleIpa: "/ðeə/"
  },
  {
    symbol: "ʊə",
    type: "diphthong",
    guide: "Nguyên âm đôi. Phát âm bắt đầu bằng âm nguyên âm ngắn /ʊ/, sau đó lướt mượt mà sang âm Schwa /ə/.",
    example: "tour",
    exampleIpa: "/tʊə/"
  },
  {
    symbol: "eɪ",
    type: "diphthong",
    guide: "Nguyên âm đôi. Phát âm bắt đầu bằng âm /e/, sau đó lướt nhanh sang âm /ɪ/. Nghe khá giống âm 'ây' trong tiếng Việt.",
    example: "late",
    exampleIpa: "/leɪt/"
  },
  {
    symbol: "aɪ",
    type: "diphthong",
    guide: "Nguyên âm đôi. Phát âm bắt đầu bằng âm /a/ rộng, sau đó lướt nhanh sang âm /ɪ/. Gần giống âm 'ai' trong tiếng Việt.",
    example: "fine",
    exampleIpa: "/faɪn/"
  },
  {
    symbol: "ɔɪ",
    type: "diphthong",
    guide: "Nguyên âm đôi. Phát âm bắt đầu bằng âm /ɔ:/ tròn, sau đó lướt nhanh sang âm /ɪ/. Gần giống âm 'oi' trong tiếng Việt.",
    example: "boy",
    exampleIpa: "/bɔɪ/"
  },
  {
    symbol: "əʊ",
    type: "diphthong",
    guide: "Nguyên âm đôi. Phát âm bắt đầu bằng âm Schwa /ə/, sau đó lướt nhanh sang âm /ʊ/. Hơi giống âm 'âu' hoặc 'ô' tiếng Việt.",
    example: "go",
    exampleIpa: "/ɡəʊ/"
  },
  {
    symbol: "aʊ",
    type: "diphthong",
    guide: "Nguyên âm đôi. Phát âm bắt đầu bằng âm /a/, sau đó lướt nhanh sang âm /ʊ/. Gần giống âm 'au' hoặc 'ao' tiếng Việt.",
    example: "now",
    exampleIpa: "/naʊ/"
  },

  // --- Consonants (Voiceless) ---
  {
    symbol: "p",
    type: "consonant",
    subType: "voiceless",
    guide: "Phụ âm vô thanh. Mím chặt hai môi lại rồi bật luồng hơi mạnh ra ngoài. Dây thanh quản hoàn toàn không rung.",
    example: "pen",
    exampleIpa: "/pen/"
  },
  {
    symbol: "t",
    type: "consonant",
    subType: "voiceless",
    guide: "Phụ âm vô thanh. Đặt đầu lưỡi chạm vào chân răng hàm trên, sau đó bật luồng hơi mạnh từ khe răng ra ngoài.",
    example: "tea",
    exampleIpa: "/ti:/"
  },
  {
    symbol: "k",
    type: "consonant",
    subType: "voiceless",
    guide: "Phụ âm vô thanh. Nâng cuống lưỡi lên chạm vào ngạc mềm phía sau, hạ nhanh đầu lưỡi để bật luồng hơi dứt khoát.",
    example: "key",
    exampleIpa: "/ki:/"
  },
  {
    symbol: "f",
    type: "consonant",
    subType: "voiceless",
    guide: "Phụ âm vô thanh. Đặt nhẹ răng cửa hàm trên lên môi dưới, đẩy luồng hơi thoát ra qua khe răng và môi.",
    example: "fine",
    exampleIpa: "/faɪn/"
  },
  {
    symbol: "θ",
    type: "consonant",
    subType: "voiceless",
    guide: "Phụ âm vô thanh. Đặt đầu lưỡi nhô nhẹ giữa răng cửa trên và răng dưới, đẩy luồng hơi nhẹ nhàng qua khe răng.",
    example: "think",
    exampleIpa: "/θɪŋk/"
  },
  {
    symbol: "s",
    type: "consonant",
    subType: "voiceless",
    guide: "Phụ âm vô thanh. Hai hàm răng gần như khép khít, đặt đầu lưỡi gần chân răng trên, đẩy luồng hơi xì qua khe răng.",
    example: "see",
    exampleIpa: "/si:/"
  },
  {
    symbol: "ʃ",
    type: "consonant",
    subType: "voiceless",
    guide: "Phụ âm vô thanh. Tròn môi nhô ra phía trước, lưỡi cong nhẹ lùi về sau, đẩy luồng hơi xì mạnh ra ngoài.",
    example: "ship",
    exampleIpa: "/ʃɪp/"
  },
  {
    symbol: "tʃ",
    type: "consonant",
    subType: "voiceless",
    guide: "Phụ âm vô thanh kết hợp. Bắt đầu bằng âm chặn hơi /t/ rồi bật nhanh sang âm phát luồng hơi /ʃ/.",
    example: "chair",
    exampleIpa: "/tʃeə/"
  },
  {
    symbol: "h",
    type: "consonant",
    subType: "voiceless",
    guide: "Phụ âm vô thanh. Mở miệng tự nhiên, đẩy luồng hơi nhẹ nhàng từ sâu trong lồng ngực ra ngoài như đang thở dốc.",
    example: "hot",
    exampleIpa: "/hɒt/"
  },

  // --- Consonants (Voiced) ---
  {
    symbol: "b",
    type: "consonant",
    subType: "voiced",
    guide: "Phụ âm hữu thanh. Mím hai môi lại, rung dây thanh quản trong cổ họng và bật âm phát ra ngoài (khẩu hình giống âm /p/).",
    example: "bed",
    exampleIpa: "/bed/"
  },
  {
    symbol: "d",
    type: "consonant",
    subType: "voiced",
    guide: "Phụ âm hữu thanh. Đặt đầu lưỡi chạm chân răng trên, rung dây thanh quản mạnh và bật âm phát ra (khẩu hình giống /t/).",
    example: "day",
    exampleIpa: "/deɪ/"
  },
  {
    symbol: "g",
    type: "consonant",
    subType: "voiced",
    guide: "Phụ âm hữu thanh. Nâng cuống lưỡi chặn ngạc mềm, rung dây thanh quản mạnh và hạ lưỡi phát âm (khẩu hình giống /k/).",
    example: "good",
    exampleIpa: "/ɡʊd/"
  },
  {
    symbol: "v",
    type: "consonant",
    subType: "voiced",
    guide: "Phụ âm hữu thanh. Đặt nhẹ răng cửa trên lên môi dưới, rung mạnh dây thanh quản đồng thời đẩy hơi nhẹ ra (giống /f/).",
    example: "very",
    exampleIpa: "/ˈveri/"
  },
  {
    symbol: "ð",
    type: "consonant",
    subType: "voiced",
    guide: "Phụ âm hữu thanh. Đặt nhẹ đầu lưỡi ở giữa răng cửa trên và dưới, rung dây thanh quản mạnh và đẩy hơi ra (giống /θ/).",
    example: "there",
    exampleIpa: "/ðeə/"
  },
  {
    symbol: "z",
    type: "consonant",
    subType: "voiced",
    guide: "Phụ âm hữu thanh. Khép nhẹ răng, đặt đầu lưỡi gần chân răng trên, rung mạnh dây thanh quản đẩy hơi ra (giống /s/).",
    example: "zoo",
    exampleIpa: "/zu:/"
  },
  {
    symbol: "ʒ",
    type: "consonant",
    subType: "voiced",
    guide: "Phụ âm hữu thanh. Tròn môi nhô ra trước, uốn lưỡi lùi sau, rung dây thanh quản mạnh đẩy âm thoát ra (giống /ʃ/).",
    example: "measure",
    exampleIpa: "/ˈmeʒə/"
  },
  {
    symbol: "dʒ",
    type: "consonant",
    subType: "voiced",
    guide: "Phụ âm hữu thanh kết hợp. Bắt đầu bằng âm chặn hơi /d/ rồi chuyển mượt mà sang rung âm /ʒ/ (giống /tʃ/).",
    example: "job",
    exampleIpa: "/dʒɒb/"
  },
  {
    symbol: "m",
    type: "consonant",
    subType: "voiced",
    guide: "Phụ âm hữu thanh (âm mũi). Mím hai môi lại để luồng hơi đi lên hốc mũi phát ra ngoài, dây thanh rung.",
    example: "map",
    exampleIpa: "/mæp/"
  },
  {
    symbol: "n",
    type: "consonant",
    subType: "voiced",
    guide: "Phụ âm hữu thanh (âm mũi). Đặt đầu lưỡi lên chân răng trên chặn hơi ở miệng, đẩy luồng hơi đi lên mũi.",
    example: "now",
    exampleIpa: "/naʊ/"
  },
  {
    symbol: "ŋ",
    type: "consonant",
    subType: "voiced",
    guide: "Phụ âm hữu thanh (âm mũi). Nâng cuống lưỡi chạm ngạc mềm chặn hoàn toàn hơi ở họng, đẩy luồng hơi đi lên mũi.",
    example: "sing",
    exampleIpa: "/sɪŋ/"
  },
  {
    symbol: "l",
    type: "consonant",
    subType: "voiced",
    guide: "Phụ âm hữu thanh (âm cạnh). Đặt đầu lưỡi chạm chân răng hàm trên, rung dây thanh cho luồng hơi thoát ra hai bên rìa lưỡi.",
    example: "late",
    exampleIpa: "/leɪt/"
  },
  {
    symbol: "r",
    type: "consonant",
    subType: "voiced",
    guide: "Phụ âm hữu thanh. Tròn môi nhô ra trước, uốn cong đầu lưỡi lùi về sau vòm họng mà không chạm, phát âm hơi rung nhẹ.",
    example: "red",
    exampleIpa: "/red/"
  },
  {
    symbol: "w",
    type: "consonant",
    subType: "voiced",
    guide: "Phụ âm hữu thanh. Tròn môi nhô ra trước giống âm /u:/ rồi chuyển nhanh sang phát âm nguyên âm đi sau nó.",
    example: "we",
    exampleIpa: "/wi:/"
  },
  {
    symbol: "j",
    type: "consonant",
    subType: "voiced",
    guide: "Phụ âm hữu thanh. Nâng phần thân lưỡi lên cao chạm ngạc cứng trên rồi hạ nhanh lưỡi xuống đồng thời phát âm rung.",
    example: "yes",
    exampleIpa: "/yes/"
  }
];
