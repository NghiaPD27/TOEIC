import { motion } from 'framer-motion';
import { Sparkles, Star, Volume2, ArrowRight } from 'lucide-react';
import type { VocabularyWord, UserWordProgress } from '../types';
import { formatPOS, getAimLabel } from '../utils/helpers';

interface StudyViewProps {
  words: VocabularyWord[];
  studyDeck: VocabularyWord[];
  safeStudyIndex: number;
  isFlipped: boolean;
  setIsFlipped: (flipped: boolean) => void;
  ttsSpeed: string;
  setTtsSpeed: (speed: string) => void;
  setIsReviewMode: (reviewMode: boolean) => void;
  starredOnly: boolean;
  setStarredOnly: (starredOnly: boolean) => void;
  progress: Record<string, UserWordProgress>;
  toggleWordStarred: (wordId: string) => void;
  handleMarkStatus: (status: 'learning' | 'mastered') => void;
  handleNextStudy: () => void;
  handleSpeak: (text: string) => void;
  setShowResetConfirm: (show: boolean) => void;
}

export function StudyView({
  words,
  studyDeck,
  safeStudyIndex,
  isFlipped,
  setIsFlipped,
  ttsSpeed,
  setTtsSpeed,
  setIsReviewMode,
  starredOnly,
  setStarredOnly,
  progress,
  toggleWordStarred,
  handleMarkStatus,
  handleNextStudy,
  handleSpeak,
  setShowResetConfirm
}: StudyViewProps) {
  return (
    <div className="flex flex-col items-center justify-center max-w-xl mx-auto w-full py-6 space-y-6">
      {studyDeck.length === 0 ? (
        starredOnly ? (
          <div className="text-center py-12 bg-slate-800 border border-slate-700 rounded-3xl w-full p-8 flex flex-col items-center justify-center space-y-6 shadow-2xl animate-fadeIn">
            <div className="p-4 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20">
              <Star className="w-10 h-10 animate-pulse text-amber-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-100">Không có từ đã lưu</h3>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed text-center">
                Bạn chưa gắn sao cho từ vựng nào hoặc tất cả các từ gắn sao đã thuộc. Hãy gắn sao cho các từ khó nhớ trong Thư viện để học riêng nhé!
              </p>
            </div>
            <button
              onClick={() => setStarredOnly(false)}
              className="py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all cursor-pointer text-sm"
            >
              Xem tất cả từ vựng
            </button>
          </div>
        ) : words.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 border border-slate-700 rounded-2xl w-full p-6">
            <p className="text-slate-400 mb-4">No words available for study. Try resetting progress or adding custom words.</p>
          </div>
        ) : (
          <div data-testid="study-deck-complete" className="text-center py-12 bg-slate-800 border border-slate-700 rounded-3xl w-full p-8 flex flex-col items-center justify-center space-y-6 shadow-2xl animate-fadeIn">
            <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
              <Sparkles className="w-10 h-10 animate-bounce" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-slate-100 font-bold">Chúc mừng! 🎉</h3>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                Bạn đã hoàn thành thuộc toàn bộ từ vựng TOEIC trong hệ thống học tập!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full max-w-xs justify-center">
              <button
                onClick={() => setIsReviewMode(true)}
                className="py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all cursor-pointer shadow-md active:scale-95 text-center text-sm"
              >
                Ôn tập từ đã thuộc
              </button>
              <button
                onClick={() => {
                  setShowResetConfirm(true);
                }}
                className="py-3 px-5 bg-slate-900 hover:bg-slate-950 border border-slate-700 text-rose-400 font-semibold rounded-xl transition-all cursor-pointer text-center text-sm"
              >
                Học lại từ đầu
              </button>
            </div>
          </div>
        )
      ) : (
        <>
          {/* Speech & Star Customization Toolbar */}
          <div className="w-full flex justify-between items-center bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-blue-400" />
                TTS Speed:
              </span>
              <select
                data-testid="speed-select"
                value={ttsSpeed}
                onChange={(e) => setTtsSpeed(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1 text-sm text-slate-200 outline-none cursor-pointer focus:border-blue-500"
              >
                <option value="0.5">Slow (0.5x)</option>
                <option value="0.75">Custom (0.75x)</option>
                <option value="1">Normal (1.0x)</option>
                <option value="1.25">Fast (1.25x)</option>
                <option value="1.5">Very Fast (1.5x)</option>
              </select>
            </div>

            <button
              onClick={() => setStarredOnly(!starredOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                starredOnly
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${starredOnly ? 'fill-amber-400 text-amber-400' : ''}`} />
              Chỉ từ đã lưu
            </button>
          </div>

          {/* 3D Flipping Flashcard */}
          <div
            data-testid="flashcard"
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-80 cursor-pointer relative"
            style={{ perspective: '1000px' }}
          >
            <motion.div
              className="w-full h-full relative"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
               {/* Front Face */}
               <div
                 data-testid="flashcard-front"
                 className="absolute inset-0 bg-slate-800 border border-slate-700 p-8 rounded-3xl flex flex-col justify-between shadow-2xl backface-hidden"
                 style={{ backfaceVisibility: 'hidden' }}
               >
                 <div className="flex justify-between items-start w-full">
                   <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-semibold uppercase tracking-wider">
                     {studyDeck[safeStudyIndex] && getAimLabel(studyDeck[safeStudyIndex].difficulty)}
                   </span>
                   <div className="flex items-center gap-2">
                     <span className="text-slate-500 text-xs font-semibold">
                       Card {safeStudyIndex + 1} of {studyDeck.length}
                     </span>
                     <button
                       data-testid="star-btn"
                       onClick={(e) => {
                         e.stopPropagation();
                         if (studyDeck[safeStudyIndex]) {
                           toggleWordStarred(studyDeck[safeStudyIndex].id);
                         }
                       }}
                       className="p-1 bg-transparent hover:bg-slate-700/50 rounded-lg text-slate-400 hover:text-amber-400 cursor-pointer transition-colors"
                     >
                       <Star
                         className={`w-4 h-4 ${
                           studyDeck[safeStudyIndex] && progress[studyDeck[safeStudyIndex].id]?.isStarred
                             ? 'fill-amber-400 text-amber-400'
                             : 'text-slate-500 hover:text-amber-400'
                         }`}
                       />
                     </button>
                   </div>
                 </div>
                 <div className="text-center space-y-3 my-auto">
                   <h3 className="text-4xl font-extrabold tracking-tight">
                     {studyDeck[safeStudyIndex]?.word}
                   </h3>
                   <p className="text-slate-400 font-medium text-sm">
                     {studyDeck[safeStudyIndex] && formatPOS(studyDeck[safeStudyIndex].partOfSpeech)} • [{studyDeck[safeStudyIndex]?.ipa}]
                   </p>
                 </div>
                 <div className="text-center text-xs text-slate-500 font-medium">
                   Click card to flip definition
                 </div>
               </div>

               {/* Back Face */}
               <div
                 data-testid="flashcard-back"
                 className="absolute inset-0 bg-slate-800 border border-slate-700 p-8 rounded-3xl flex flex-col justify-between shadow-2xl backface-hidden"
                 style={{
                   backfaceVisibility: 'hidden',
                   transform: 'rotateY(180deg)'
                 }}
               >
                 <div className="flex justify-between items-start w-full">
                   <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-semibold uppercase tracking-wider">
                     {studyDeck[safeStudyIndex]?.topic}
                   </span>
                   <div className="flex items-center gap-2">
                     <button
                       onClick={(e) => {
                         e.stopPropagation();
                         if (studyDeck[safeStudyIndex]) {
                           toggleWordStarred(studyDeck[safeStudyIndex].id);
                         }
                       }}
                       className="p-1 bg-transparent hover:bg-slate-700/50 rounded-lg text-slate-400 hover:text-amber-400 cursor-pointer transition-colors"
                     >
                       <Star
                         className={`w-4 h-4 ${
                           studyDeck[safeStudyIndex] && progress[studyDeck[safeStudyIndex].id]?.isStarred
                             ? 'fill-amber-400 text-amber-400'
                             : 'text-slate-500 hover:text-amber-400'
                         }`}
                       />
                     </button>
                     <button
                       data-testid="speaker-btn"
                       onClick={(e) => {
                         e.stopPropagation();
                         handleSpeak(studyDeck[safeStudyIndex]?.word || '');
                       }}
                       className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg cursor-pointer transition-colors"
                     >
                       <Volume2 className="w-4 h-4" />
                     </button>
                   </div>
                 </div>
                 <div className="space-y-3 my-auto w-full">
                   <div>
                     <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Definition</div>
                     <p className="text-lg font-bold text-slate-100">{studyDeck[safeStudyIndex]?.definition}</p>
                   </div>
                   <div className="border-t border-slate-700/50 pt-2">
                     <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Example Sentence</div>
                     <p className="text-xs italic text-slate-200 mt-0.5">"{studyDeck[safeStudyIndex]?.example}"</p>
                     <p className="text-xs text-slate-400 mt-0.5">{studyDeck[safeStudyIndex]?.exampleTranslation}</p>
                   </div>
                   {studyDeck[safeStudyIndex]?.synonyms && studyDeck[safeStudyIndex]!.synonyms!.length > 0 && (
                     <div className="border-t border-slate-700/50 pt-2">
                       <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Từ đồng nghĩa (Synonyms)</div>
                       <div className="flex flex-wrap gap-1 mt-1">
                         {studyDeck[safeStudyIndex]!.synonyms!.map((syn, sIdx) => (
                           <span key={sIdx} className="px-1.5 py-0.5 bg-slate-900 border border-slate-700 text-slate-300 text-[10px] font-medium rounded-md">
                             {syn}
                           </span>
                         ))}
                       </div>
                     </div>
                   )}
                 </div>
                 <div className="text-center text-xs text-slate-500 font-medium">
                   Click card to flip to front
                 </div>
               </div>
            </motion.div>
          </div>

          {/* Operations & Study Actions */}
          <div className="w-full grid grid-cols-3 gap-3">
            <button
              data-testid="learning-btn"
              onClick={() => handleMarkStatus('learning')}
              className="py-3 px-4 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-sm font-semibold rounded-xl cursor-pointer transition-all text-center"
            >
              Keep Studying
            </button>
            <button
              onClick={() => handleMarkStatus('mastered')}
              className="py-3 px-4 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-sm font-semibold rounded-xl cursor-pointer transition-all text-center"
            >
              Mastered
            </button>
            <button
              data-testid="next-btn"
              onClick={handleNextStudy}
              className="py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              Next Card
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
