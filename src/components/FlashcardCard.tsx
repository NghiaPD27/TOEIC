import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, Star, Sparkles } from 'lucide-react';
import { formatPOS } from '../utils/helpers';
import type { AccentTheme } from '../utils/helpers';

export interface FlashcardCardProps {
  word: string;
  partOfSpeech: string;
  ipa: string;
  badgeLabel?: string;
  cardIndexText?: string;
  isStarred?: boolean;
  isMastered?: boolean;
  onToggleStarred?: () => void;
  onSpeak?: (text: string) => void;

  isFlipped: boolean;
  setIsFlipped: (flipped: boolean) => void;

  backContent: React.ReactNode;
  theme: AccentTheme;

  heightClass?: string;
  testIdCard?: string;
  testIdFront?: string;
  testIdBack?: string;
  starTestIdFront?: string;
}

export function FlashcardCard({
  word,
  partOfSpeech,
  ipa,
  badgeLabel,
  cardIndexText,
  isStarred,
  isMastered,
  onToggleStarred,
  onSpeak,
  isFlipped,
  setIsFlipped,
  backContent,
  theme,
  heightClass = "h-80 sm:h-96",
  testIdCard = "flashcard",
  testIdFront = "flashcard-front",
  testIdBack = "flashcard-back",
  starTestIdFront = "star-btn"
}: FlashcardCardProps) {
  return (
    <div
      data-testid={testIdCard}
      onClick={() => setIsFlipped(!isFlipped)}
      className={`w-full ${heightClass} cursor-pointer relative select-none`}
      style={{ perspective: '1200px' }}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Front Face */}
        <div
          data-testid={testIdFront}
          className={`absolute inset-0 bg-slate-800/95 border-2 ${
            isMastered ? 'border-emerald-500/50 bg-slate-800' : 'border-slate-700/80 hover:border-blue-500/40'
          } p-6 sm:p-8 rounded-3xl flex flex-col justify-between shadow-2xl transition-colors`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          <div className="flex justify-between items-start w-full">
            {badgeLabel ? (
              <span className={`px-3 py-1 ${theme.lightBg} ${theme.text} border ${theme.lightBorder} rounded-full text-xs font-bold uppercase tracking-wider`}>
                {badgeLabel}
              </span>
            ) : (
              <div />
            )}
            <div className="flex items-center gap-2">
              {cardIndexText && (
                <span className="text-slate-400 text-xs font-semibold bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-700/50">
                  {cardIndexText}
                </span>
              )}
              {onToggleStarred && (
                <button
                  data-testid={starTestIdFront}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleStarred();
                  }}
                  className={`p-1.5 rounded-xl border transition-all ${
                    isStarred
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                      : 'bg-slate-900/60 border-slate-700/50 text-slate-400 hover:text-amber-400'
                  }`}
                  title="Gắn sao từ này"
                >
                  <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
                </button>
              )}
            </div>
          </div>

          <div className="text-center space-y-3 py-4">
            <h3 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight break-all">
              {word}
            </h3>
            <div className="flex justify-center items-center gap-2">
              {partOfSpeech && (
                <span className="text-blue-400 font-semibold italic text-sm bg-blue-500/10 px-2.5 py-0.5 rounded-md border border-blue-500/20">
                  ({formatPOS(partOfSpeech)})
                </span>
              )}
              {ipa && (
                <span className="text-indigo-300 font-mono text-sm bg-slate-900/60 px-3 py-0.5 rounded-md border border-slate-700/50">
                  /{ipa}/
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center w-full pt-3 border-t border-slate-700/50">
            {onSpeak ? (
              <button
                data-testid="speaker-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onSpeak(word);
                }}
                className="p-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 rounded-xl cursor-pointer transition-all flex items-center justify-center"
                title="Phát âm từ vựng"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            ) : (
              <div />
            )}
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              Bấm vào thẻ để xem nghĩa & ví dụ
            </span>
          </div>
        </div>

        {/* Back Face */}
        <div
          data-testid={testIdBack}
          className={`absolute inset-0 bg-slate-800 border-2 ${
            isMastered ? 'border-emerald-500/50' : 'border-blue-500/40'
          } p-6 sm:p-7 rounded-3xl flex flex-col justify-between shadow-2xl overflow-hidden`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {backContent}
        </div>
      </motion.div>
    </div>
  );
}
