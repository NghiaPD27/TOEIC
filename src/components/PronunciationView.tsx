import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Volume2, BookOpen, GraduationCap, Sparkles } from 'lucide-react';
import { ipaData } from '../data/ipa';
import type { IpaSymbol } from '../data/ipa';

interface PronunciationViewProps {
  theme?: {
    bg: string;
    hoverBg: string;
    text: string;
    border: string;
    borderHover: string;
    lightBg: string;
    lightBorder: string;
    focusBorder: string;
  };
}

export function PronunciationView({ theme: themeProp }: PronunciationViewProps) {
  const defaultBlueTheme = {
    bg: 'bg-blue-600',
    hoverBg: 'hover:bg-blue-700',
    text: 'text-blue-400',
    border: 'border-blue-500',
    borderHover: 'hover:border-blue-500/50',
    lightBg: 'bg-blue-500/10',
    lightBorder: 'border-blue-500/30',
    focusBorder: 'focus:border-blue-500'
  };
  const theme = themeProp || defaultBlueTheme;

  const [activeTab, setActiveTab] = useState<'chart' | 'rules'>('chart');
  const [selectedSymbol, setSelectedSymbol] = useState<IpaSymbol | null>(null);

  // Group ipaData by type
  const vowelsShort = useMemo(() => ipaData.filter((s) => s.type === 'vowel' && s.subType === 'short'), []);
  const vowelsLong = useMemo(() => ipaData.filter((s) => s.type === 'vowel' && s.subType === 'long'), []);
  const diphthongs = useMemo(() => ipaData.filter((s) => s.type === 'diphthong'), []);
  const consonantsVoiced = useMemo(() => ipaData.filter((s) => s.type === 'consonant' && s.subType === 'voiced'), []);
  const consonantsVoiceless = useMemo(() => ipaData.filter((s) => s.type === 'consonant' && s.subType === 'voiceless'), []);

  const handlePlaySound = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';

      if (typeof window.speechSynthesis.getVoices === 'function') {
        const voices = window.speechSynthesis.getVoices();
        const enVoice = voices.find(v => v.lang.toLowerCase() === 'en-us') ||
                        voices.find(v => v.lang.toLowerCase().includes('en-us')) ||
                        voices.find(v => v.lang.toLowerCase().startsWith('en'));
        if (enVoice) {
          utterance.voice = enVoice;
        }
      }

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn" data-testid="pronunciation-view">
      <div className="text-center py-6 space-y-2">
        <h2 className="text-3xl font-extrabold text-slate-100 flex justify-center items-center gap-2.5">
          <Volume2 className={`w-8 h-8 ${theme.text}`} />
          Bảng Phiên Âm Quốc Tế (IPA Chart)
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm">
          Làm chủ các quy tắc phát âm đuôi -ed, -s/-es, nhận diện âm vô thanh/hữu thanh và bảng phiên âm quốc tế IPA.
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="flex justify-center border-b border-slate-800 pb-px">
        <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800/80 gap-1.5">
          <button
            onClick={() => setActiveTab('chart')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'chart'
                ? `${theme.bg} text-white shadow-md`
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Bảng âm IPA (Soundboard)
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'rules'
                ? `${theme.bg} text-white shadow-md`
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Quy tắc phát âm (-ed, -s/-es)
          </button>
        </div>
      </div>

      {/* Active Tab View */}
      {activeTab === 'chart' ? (
        <motion.div
          key="chart-view"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
        >
          {/* Left/Middle: IPA Soundboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Nguyên âm đơn (Monophthongs) */}
            <div className="bg-slate-800 border border-slate-700/60 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-md font-bold text-blue-400 border-b border-slate-700/50 pb-2 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                Nguyên âm đơn (Monophthongs)
              </h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider block mb-2 font-semibold">Nguyên âm ngắn (Short Vowels)</span>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                    {vowelsShort.map((s) => (
                      <button
                        key={s.symbol}
                        data-testid={`ipa-symbol-${s.symbol}`}
                        onClick={() => setSelectedSymbol(s)}
                        className={`py-3 px-2 rounded-xl text-lg font-bold transition-all border text-center cursor-pointer ${
                          selectedSymbol?.symbol === s.symbol
                            ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/20 scale-105'
                            : 'bg-slate-900/50 border-slate-700 hover:border-blue-500/50 text-slate-200 hover:bg-slate-800/40'
                        }`}
                      >
                        /{s.symbol}/
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider block mb-2 font-semibold">Nguyên âm dài (Long Vowels)</span>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {vowelsLong.map((s) => (
                      <button
                        key={s.symbol}
                        data-testid={`ipa-symbol-${s.symbol}`}
                        onClick={() => setSelectedSymbol(s)}
                        className={`py-3 px-2 rounded-xl text-lg font-bold transition-all border text-center cursor-pointer ${
                          selectedSymbol?.symbol === s.symbol
                            ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/20 scale-105'
                            : 'bg-slate-900/50 border-slate-700 hover:border-blue-500/50 text-slate-200 hover:bg-slate-800/40'
                        }`}
                      >
                        /{s.symbol}/
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Nguyên âm đôi (Diphthongs) */}
            <div className="bg-slate-800 border border-slate-700/60 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-md font-bold text-purple-400 border-b border-slate-700/50 pb-2 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                Nguyên âm đôi (Diphthongs)
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {diphthongs.map((s) => (
                  <button
                    key={s.symbol}
                    data-testid={`ipa-symbol-${s.symbol}`}
                    onClick={() => setSelectedSymbol(s)}
                    className={`py-3 px-2 rounded-xl text-lg font-bold transition-all border text-center cursor-pointer ${
                      selectedSymbol?.symbol === s.symbol
                        ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-500/20 scale-105'
                        : 'bg-slate-900/50 border-slate-700 hover:border-purple-500/50 text-slate-200 hover:bg-slate-800/40'
                    }`}
                  >
                    /{s.symbol}/
                  </button>
                ))}
              </div>
            </div>

            {/* Phụ âm (Consonants) */}
            <div className="bg-slate-800 border border-slate-700/60 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-md font-bold text-emerald-400 border-b border-slate-700/50 pb-2 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Phụ âm (Consonants)
              </h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider block mb-2 font-semibold">Phụ âm vô thanh (Voiceless)</span>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {consonantsVoiceless.map((s) => (
                      <button
                        key={s.symbol}
                        data-testid={`ipa-symbol-${s.symbol}`}
                        onClick={() => setSelectedSymbol(s)}
                        className={`py-3 px-2 rounded-xl text-lg font-bold transition-all border text-center cursor-pointer ${
                          selectedSymbol?.symbol === s.symbol
                            ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-500/20 scale-105'
                            : 'bg-slate-900/50 border-slate-700 hover:border-emerald-500/50 text-slate-200 hover:bg-slate-800/40'
                        }`}
                      >
                        /{s.symbol}/
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider block mb-2 font-semibold">Phụ âm hữu thanh (Voiced)</span>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {consonantsVoiced.map((s) => (
                      <button
                        key={s.symbol}
                        data-testid={`ipa-symbol-${s.symbol}`}
                        onClick={() => setSelectedSymbol(s)}
                        className={`py-3 px-2 rounded-xl text-lg font-bold transition-all border text-center cursor-pointer ${
                          selectedSymbol?.symbol === s.symbol
                            ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-500/20 scale-105'
                            : 'bg-slate-900/50 border-slate-700 hover:border-emerald-500/50 text-slate-200 hover:bg-slate-800/40'
                        }`}
                      >
                        /{s.symbol}/
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Active Symbol Detail */}
          <div className="lg:col-span-1">
            {selectedSymbol ? (
              <motion.div
                layoutId="ipa-detail-card"
                className="bg-slate-800 border border-slate-700 p-6 rounded-3xl shadow-2xl space-y-6"
                data-testid="ipa-detail-card"
              >
                <div className="text-center pb-4 border-b border-slate-700/50">
                  <span className="text-5xl font-black text-white bg-slate-900/60 py-4 px-6 rounded-2xl inline-block border border-slate-700/45 shadow-inner">
                    /{selectedSymbol.symbol}/
                  </span>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-4">
                    {selectedSymbol.type === 'vowel' && 'Nguyên âm đơn'}
                    {selectedSymbol.type === 'diphthong' && 'Nguyên âm đôi'}
                    {selectedSymbol.type === 'consonant' && 'Phụ âm'}
                    {selectedSymbol.subType === 'short' && ' (Âm ngắn)'}
                    {selectedSymbol.subType === 'long' && ' (Âm dài)'}
                    {selectedSymbol.subType === 'voiceless' && ' (Vô thanh)'}
                    {selectedSymbol.subType === 'voiced' && ' (Hữu thanh)'}
                  </h4>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold">Hướng dẫn cách phát âm:</span>
                    <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/20 p-4 border border-slate-800 rounded-xl whitespace-pre-line">
                      {selectedSymbol.guide}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold">Ví dụ thực tế:</span>
                    <div className="bg-slate-900/40 border border-slate-700/50 rounded-2xl p-4 flex justify-between items-center">
                      <div>
                        <p className="text-lg font-bold text-slate-100">{selectedSymbol.example}</p>
                        <p className="text-xs text-indigo-300 font-mono mt-0.5">{selectedSymbol.exampleIpa}</p>
                      </div>
                      <button
                        onClick={() => handlePlaySound(selectedSymbol.example)}
                        className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl cursor-pointer transition-all shadow-md active:scale-95 flex items-center justify-center"
                        title="Nghe phát âm từ ví dụ"
                        data-testid="play-ipa-example-btn"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handlePlaySound(selectedSymbol.symbol)}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-950 border border-slate-700 hover:border-slate-650 text-indigo-400 font-bold rounded-2xl transition-all cursor-pointer text-center flex items-center justify-center gap-2 active:scale-95 shadow-md"
                    data-testid="play-ipa-symbol-btn"
                  >
                    <Volume2 className="w-4 h-4" />
                    Nghe âm mẫu
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-3xl text-center text-slate-400 space-y-4 shadow-md py-16">
                <div className="p-4 bg-slate-800 border border-slate-700/80 rounded-full w-fit mx-auto text-slate-500">
                  <Volume2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-300">Chưa chọn âm nào</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-[200px] mx-auto leading-relaxed">
                    Vui lòng nhấp chọn bất kỳ âm phiên âm nào trên bảng để xem chi tiết hướng dẫn và nghe ví dụ.
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="rules-view"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-8"
        >
          {/* Section 1: Voiced vs. Voiceless */}
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="border-b border-slate-700/50 pb-4 space-y-1">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-amber-500" />
                1. Phân Biệt Âm Vô Thanh & Âm Hữu Thanh
              </h3>
              <p className="text-xs text-slate-400">
                Đây là nền tảng cốt lõi nhất để hiểu và áp dụng chính xác quy tắc phát âm đuôi -ed và -s/-es.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Voiceless Card */}
              <div className="bg-slate-900/40 border border-slate-700/50 p-5 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-emerald-400">Âm Vô Thanh (Voiceless Sounds)</span>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] rounded font-mono font-bold">KHÔNG rung cổ họng</span>
                </div>
                <p className="text-xs text-slate-350 leading-relaxed">
                  Là những âm được tạo ra bằng hơi gió, luồng hơi đi từ phổi qua thanh quản thoát thẳng ra miệng mà không làm rung dây thanh. Hãy đặt tay lên cổ họng, khi phát âm bạn chỉ thấy luồng hơi mát thoát ra mà không rung.
                </p>
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">9 Phụ âm vô thanh:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { s: 'p', ex: 'pen' },
                      { s: 't', ex: 'tea' },
                      { s: 'k', ex: 'key' },
                      { s: 'f', ex: 'fly' },
                      { s: 's', ex: 'see' },
                      { s: 'ʃ', ex: 'she' },
                      { s: 'tʃ', ex: 'chin' },
                      { s: 'θ', ex: 'thin' },
                      { s: 'h', ex: 'hat' }
                    ].map((item) => (
                      <button
                        key={item.s}
                        onClick={() => handlePlaySound(item.ex)}
                        className="py-1 px-2.5 bg-slate-900 hover:bg-slate-950 border border-slate-700/80 hover:border-slate-650 rounded-xl text-xs font-mono text-slate-300 transition-all flex items-center gap-1 cursor-pointer"
                        title={`Bấm để nghe ví dụ: ${item.ex}`}
                      >
                        /{item.s}/
                        <Volume2 className="w-3 h-3 opacity-60" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Voiced Card */}
              <div className="bg-slate-900/40 border border-slate-700/50 p-5 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-blue-400">Âm Hữu Thanh (Voiced Sounds)</span>
                  <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] rounded font-mono font-bold">RUNG cổ họng</span>
                </div>
                <p className="text-xs text-slate-350 leading-relaxed">
                  Là các âm khi phát ra luồng hơi sẽ đi qua thanh quản và làm rung động dây thanh quản. Khi bạn đặt tay lên cổ họng, bạn sẽ cảm nhận rõ độ rung động rất mạnh của các âm hữu thanh. <strong>Tất cả các nguyên âm đều là hữu thanh!</strong>
                </p>
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Các phụ âm hữu thanh phổ biến:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { s: 'b', ex: 'boat' },
                      { s: 'd', ex: 'dog' },
                      { s: 'g', ex: 'go' },
                      { s: 'v', ex: 'van' },
                      { s: 'z', ex: 'zoo' },
                      { s: 'ʒ', ex: 'television' },
                      { s: 'dʒ', ex: 'june' },
                      { s: 'ð', ex: 'this' },
                      { s: 'm', ex: 'man' },
                      { s: 'n', ex: 'now' },
                      { s: 'ŋ', ex: 'sing' },
                      { s: 'l', ex: 'love' },
                      { s: 'r', ex: 'run' },
                      { s: 'w', ex: 'wet' },
                      { s: 'j', ex: 'yes' }
                    ].map((item) => (
                      <button
                        key={item.s}
                        onClick={() => handlePlaySound(item.ex)}
                        className="py-1 px-2.5 bg-slate-900 hover:bg-slate-950 border border-slate-700/80 hover:border-slate-650 rounded-xl text-xs font-mono text-slate-300 transition-all flex items-center gap-1 cursor-pointer"
                        title={`Bấm để nghe ví dụ: ${item.ex}`}
                      >
                        /{item.s}/
                        <Volume2 className="w-3 h-3 opacity-60" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Quy tắc phát âm đuôi -ed */}
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="border-b border-slate-700/50 pb-4 space-y-1">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                2. Quy Tắc Phát Âm Đuôi "-ed"
              </h3>
              <p className="text-xs text-slate-400">
                Đuôi "-ed" trong tiếng Anh có 3 cách đọc chính là /ɪd/, /t/ hoặc /d/ tuỳ vào âm cuối của động từ gốc.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Rule 1: /ɪd/ */}
              <div className="bg-slate-900/40 border border-slate-700/50 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-black text-indigo-455 text-indigo-400">/ɪd/</span>
                    <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 text-[10px] rounded font-bold uppercase tracking-wider">Đặc biệt</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-300">Điều kiện áp dụng:</span>
                    <p className="text-xs text-slate-400">Khi từ kết thúc bằng các âm: <strong>/t/</strong> hoặc <strong>/d/</strong>.</p>
                  </div>
                  <div className="bg-indigo-900/20 border border-indigo-500/25 p-3 rounded-xl space-y-1">
                    <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest block">💡 Mẹo Nhớ Dân Gian:</span>
                    <p className="text-xs font-semibold text-slate-200">"Tiền Đô" (T, D) hoặc "Trẻ Đẹp"</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-700/40">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Ví dụ thực tế:</span>
                  <div className="space-y-1.5">
                    {[
                      { word: 'wanted', ipa: '/ˈwɒn.tɪd/' },
                      { word: 'needed', ipa: '/ˈniː.dɪd/' },
                      { word: 'started', ipa: '/ˈstɑː.tɪd/' }
                    ].map((item) => (
                      <div key={item.word} className="flex justify-between items-center bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                        <div>
                          <p className="text-xs font-bold text-slate-200">{item.word}</p>
                          <p className="text-[10px] text-indigo-300 font-mono">{item.ipa}</p>
                        </div>
                        <button
                          onClick={() => handlePlaySound(item.word)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer transition-all active:scale-95"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Rule 2: /t/ */}
              <div className="bg-slate-900/40 border border-slate-700/50 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-black text-emerald-400">/t/</span>
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] rounded font-bold uppercase tracking-wider">Âm vô thanh</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-300">Điều kiện áp dụng:</span>
                    <p className="text-xs text-slate-400">Khi từ kết thúc bằng các âm vô thanh: <strong>/p/, /k/, /f/, /s/, /ʃ/, /tʃ/, /θ/</strong>.</p>
                  </div>
                  <div className="bg-emerald-900/20 border border-emerald-500/25 p-3 rounded-xl space-y-1">
                    <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest block">💡 Mẹo Nhớ Dân Gian:</span>
                    <p className="text-xs font-semibold text-slate-200">"Sáng sớm chạy khắp phố phường thấy phạt" (S, Sh, Ch, K, P, F, Th) hoặc "Chính phủ Pháp không thích xem Shark"</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-700/40">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Ví dụ thực tế:</span>
                  <div className="space-y-1.5">
                    {[
                      { word: 'stopped', ipa: '/stɒpt/' },
                      { word: 'looked', ipa: '/lʊkt/' },
                      { word: 'watched', ipa: '/wɒtʃt/' }
                    ].map((item) => (
                      <div key={item.word} className="flex justify-between items-center bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                        <div>
                          <p className="text-xs font-bold text-slate-200">{item.word}</p>
                          <p className="text-[10px] text-emerald-300 font-mono">{item.ipa}</p>
                        </div>
                        <button
                          onClick={() => handlePlaySound(item.word)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer transition-all active:scale-95"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Rule 3: /d/ */}
              <div className="bg-slate-900/40 border border-slate-700/50 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-black text-blue-400">/d/</span>
                    <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] rounded font-bold uppercase tracking-wider">Còn lại (Hữu thanh)</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-300">Điều kiện áp dụng:</span>
                    <p className="text-xs text-slate-400">Khi từ kết thúc bằng các âm hữu thanh còn lại (nguyên âm và phụ âm hữu thanh còn lại).</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-500/25 p-3 rounded-xl space-y-1">
                    <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest block">💡 Mẹo Nhớ Dân Gian:</span>
                    <p className="text-xs font-semibold text-slate-200">Không cần nhớ mẹo, chỉ cần loại trừ các âm thuộc nhóm /ɪd/ và /t/.</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-700/40">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Ví dụ thực tế:</span>
                  <div className="space-y-1.5">
                    {[
                      { word: 'played', ipa: '/pleɪd/' },
                      { word: 'cleaned', ipa: '/kliːnd/' },
                      { word: 'loved', ipa: '/lʌvd/' }
                    ].map((item) => (
                      <div key={item.word} className="flex justify-between items-center bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                        <div>
                          <p className="text-xs font-bold text-slate-200">{item.word}</p>
                          <p className="text-[10px] text-blue-300 font-mono">{item.ipa}</p>
                        </div>
                        <button
                          onClick={() => handlePlaySound(item.word)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer transition-all active:scale-95"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Quy tắc phát âm đuôi -s/ -es */}
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="border-b border-slate-700/50 pb-4 space-y-1">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-purple-400" />
                3. Quy Tắc Phát Âm Đuôi "-s / -es"
              </h3>
              <p className="text-xs text-slate-400">
                Đuôi "-s" hoặc "-es" khi thêm vào danh từ số nhiều hoặc động từ chia ngôi thứ ba số ít sẽ có 3 cách đọc là /s/, /ɪz/, hoặc /z/.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Rule 1: /s/ */}
              <div className="bg-slate-900/40 border border-slate-700/50 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-black text-purple-400">/s/</span>
                    <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 text-[10px] rounded font-bold uppercase tracking-wider">Âm vô thanh</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-300">Điều kiện áp dụng:</span>
                    <p className="text-xs text-slate-400">Khi từ kết thúc bằng các âm vô thanh: <strong>/p/, /t/, /k/, /f/, /θ/</strong>.</p>
                  </div>
                  <div className="bg-purple-900/20 border border-purple-500/25 p-3 rounded-xl space-y-1">
                    <span className="text-[10px] font-bold text-purple-300 uppercase tracking-widest block">💡 Mẹo Nhớ Dân Gian:</span>
                    <p className="text-xs font-semibold text-slate-200">"Thời phong kiến phương Tây" (Th, P, K, F, T) hoặc "Phải thắp kính hương thần"</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-700/40">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Ví dụ thực tế:</span>
                  <div className="space-y-1.5">
                    {[
                      { word: 'books', ipa: '/bʊks/' },
                      { word: 'cats', ipa: '/kæts/' },
                      { word: 'roofs', ipa: '/ruːfs/' }
                    ].map((item) => (
                      <div key={item.word} className="flex justify-between items-center bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                        <div>
                          <p className="text-xs font-bold text-slate-200">{item.word}</p>
                          <p className="text-[10px] text-purple-300 font-mono">{item.ipa}</p>
                        </div>
                        <button
                          onClick={() => handlePlaySound(item.word)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer transition-all active:scale-95"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Rule 2: /ɪz/ */}
              <div className="bg-slate-900/40 border border-slate-700/50 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-black text-amber-400">/ɪz/</span>
                    <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 text-[10px] rounded font-bold uppercase tracking-wider">Âm rít (Sibilants)</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-300">Điều kiện áp dụng:</span>
                    <p className="text-xs text-slate-400">Khi từ kết thúc bằng các âm gió rít: <strong>/s/, /z/, /ʃ/, /tʃ/, /dʒ/, /ʒ/</strong> (thường tận cùng bằng đuôi s, ss, x, sh, ch, ge, ce, z).</p>
                  </div>
                  <div className="bg-amber-900/20 border border-amber-500/25 p-3 rounded-xl space-y-1">
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">💡 Mẹo Nhớ Dân Gian:</span>
                    <p className="text-xs font-semibold text-slate-200">"Sóng giờ chưa xô sập sông" (S, Z, Ch, X, Sh, Ce) hoặc "Sang sông ghé chợ xem Shop"</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-700/40">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Ví dụ thực tế:</span>
                  <div className="space-y-1.5">
                    {[
                      { word: 'buses', ipa: '/ˈbʌs.ɪz/' },
                      { word: 'boxes', ipa: '/ˈbɒk.sɪz/' },
                      { word: 'watches', ipa: '/ˈwɒtʃ.ɪz/' }
                    ].map((item) => (
                      <div key={item.word} className="flex justify-between items-center bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                        <div>
                          <p className="text-xs font-bold text-slate-200">{item.word}</p>
                          <p className="text-[10px] text-amber-300 font-mono">{item.ipa}</p>
                        </div>
                        <button
                          onClick={() => handlePlaySound(item.word)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer transition-all active:scale-95"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Rule 3: /z/ */}
              <div className="bg-slate-900/40 border border-slate-700/50 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-black text-blue-400">/z/</span>
                    <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] rounded font-bold uppercase tracking-wider">Còn lại (Hữu thanh)</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-300">Điều kiện áp dụng:</span>
                    <p className="text-xs text-slate-400">Khi từ kết thúc bằng các âm hữu thanh còn lại (nguyên âm và các phụ âm hữu thanh còn lại).</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-500/25 p-3 rounded-xl space-y-1">
                    <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest block">💡 Mẹo Nhớ Dân Gian:</span>
                    <p className="text-xs font-semibold text-slate-200">Không cần nhớ mẹo, chỉ cần loại trừ các âm thuộc nhóm /s/ và /ɪz/.</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-700/40">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Ví dụ thực tế:</span>
                  <div className="space-y-1.5">
                    {[
                      { word: 'bags', ipa: '/bægz/' },
                      { word: 'days', ipa: '/deɪz/' },
                      { word: 'phones', ipa: '/fəʊnz/' }
                    ].map((item) => (
                      <div key={item.word} className="flex justify-between items-center bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                        <div>
                          <p className="text-xs font-bold text-slate-200">{item.word}</p>
                          <p className="text-[10px] text-blue-300 font-mono">{item.ipa}</p>
                        </div>
                        <button
                          onClick={() => handlePlaySound(item.word)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer transition-all active:scale-95"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
