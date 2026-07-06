import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { ipaData } from '../data/ipa';
import type { IpaSymbol } from '../data/ipa';

export function PronunciationView() {
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
          <Volume2 className="w-8 h-8 text-blue-500" />
          Bảng Phiên Âm Quốc Tế (IPA Chart)
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm">
          Nhấp chọn bất kỳ âm nào để xem hướng dẫn cách mở khẩu hình miệng phát âm chuẩn bản xứ và nghe ví dụ thực tế.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
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
      </div>
    </div>
  );
}
