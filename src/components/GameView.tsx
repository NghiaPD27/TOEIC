import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Timer, Award, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { VocabularyWord } from '../types';
import type { AccentTheme } from '../utils/helpers';

interface GameViewProps {
  words: VocabularyWord[];
  theme: AccentTheme;
}

interface GameCard {
  id: string;
  wordId: string;
  type: 'en' | 'vi';
  content: string;
  isMatched: boolean;
}

export function GameView({ words, theme }: GameViewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [cards, setCards] = useState<GameCard[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [mismatchedIds, setMismatchedIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize a new game
  const initGame = () => {
    if (words.length < 5) return;
    
    // Select 5 random words from the pool
    const selected = [...words]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);

    // Create English and Vietnamese card representations
    const gameCards: GameCard[] = [];
    selected.forEach((word) => {
      gameCards.push({
        id: `${word.id}-en`,
        wordId: word.id,
        type: 'en',
        content: word.word,
        isMatched: false
      });
      gameCards.push({
        id: `${word.id}-vi`,
        wordId: word.id,
        type: 'vi',
        content: word.definition,
        isMatched: false
      });
    });

    // Shuffle the cards
    const shuffled = gameCards.sort(() => 0.5 - Math.random());

    setCards(shuffled);
    setSelectedIds([]);
    setMismatchedIds([]);
    setMoves(0);
    setTime(0);
    setIsGameOver(false);
    setIsPlaying(true);

    // Start Timer
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };

  // Stop timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleCardClick = (card: GameCard) => {
    if (card.isMatched || selectedIds.includes(card.id) || selectedIds.length >= 2 || mismatchedIds.length > 0) {
      return;
    }

    const nextSelected = [...selectedIds, card.id];
    setSelectedIds(nextSelected);

    if (nextSelected.length === 2) {
      setMoves((prev) => prev + 1);
      
      const firstCard = cards.find((c) => c.id === nextSelected[0])!;
      const secondCard = cards.find((c) => c.id === nextSelected[1])!;

      // Verify pair matches
      if (firstCard.wordId === secondCard.wordId && firstCard.type !== secondCard.type) {
        // MATCH SUCCESS
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) =>
              c.wordId === firstCard.wordId ? { ...c, isMatched: true } : c
            )
          );
          setSelectedIds([]);
        }, 300);
      } else {
        // MISMATCH FAILURE
        setMismatchedIds(nextSelected);
        setTimeout(() => {
          setSelectedIds([]);
          setMismatchedIds([]);
        }, 1000);
      }
    }
  };

  // Check Game Over state
  useEffect(() => {
    if (isPlaying && cards.length > 0 && cards.every((c) => c.isMatched)) {
      setIsGameOver(true);
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);

      // confettis celebration
      try {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.warn('Confetti failed to launch:', e);
      }
    }
  }, [cards, isPlaying]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  return (
    <div className="max-w-3xl mx-auto w-full py-6 space-y-6 animate-fadeIn">
      {/* Title Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-slate-100 flex justify-center items-center gap-2.5">
          <Award className={`w-8 h-8 ${theme.text}`} />
          Trò chơi Ghép từ (Vocabulary Match Game)
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto text-sm">
          Rèn luyện trí nhớ bằng cách ghép đúng cặp từ vựng tiếng Anh với định nghĩa tiếng Việt tương ứng nhanh nhất có thể.
        </p>
      </div>

      {!isPlaying && !isGameOver ? (
        /* Start Screen */
        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-12 text-center space-y-6 shadow-2xl flex flex-col items-center justify-center max-w-xl mx-auto">
          <div className={`p-5 ${theme.lightBg} ${theme.text} rounded-full border ${theme.lightBorder} animate-pulse`}>
            <Award className="w-16 h-16" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-100">Sẵn sàng thử thách?</h3>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
              Trò chơi sẽ lấy ngẫu nhiên 5 từ vựng trong kho học liệu để kiểm tra phản xạ nhận diện từ của bạn.
            </p>
          </div>
          {words.length < 5 ? (
            <p className="text-amber-400 text-xs font-semibold">
              ⚠️ Kho từ vựng cần có tối thiểu 5 từ để bắt đầu chơi. Hãy thêm từ mới hoặc học thêm từ nhé!
            </p>
          ) : (
            <button
              onClick={initGame}
              className={`py-3 px-6 text-white font-bold rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all text-sm ${theme.bg} ${theme.hoverBg}`}
            >
              <Play className="w-4 h-4 fill-white" />
              Bắt đầu chơi (Play Game)
            </button>
          )}
        </div>
      ) : isPlaying ? (
        /* Active Game Arena */
        <div className="space-y-6">
          {/* Game indicators */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex justify-between items-center px-6 shadow-xl gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-semibold text-slate-300">
                Thời gian: <span className="font-mono text-slate-100">{formatTime(time)}</span>
              </span>
            </div>
            <div className="text-sm font-semibold text-slate-300">
              Lượt click: <span className="text-slate-100">{moves}</span>
            </div>
            <button
              onClick={initGame}
              className="py-1.5 px-3 bg-slate-900 border border-slate-700 hover:bg-slate-950 text-slate-350 hover:text-slate-100 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Chơi lại
            </button>
          </div>

          {/* Cards Grid layout */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
            <AnimatePresence>
              {cards.map((card) => {
                const isSelected = selectedIds.includes(card.id);
                const isMismatched = mismatchedIds.includes(card.id);
                
                return (
                  <motion.button
                    key={card.id}
                    layout
                    data-testid={`game-card-${card.id}`}
                    onClick={() => handleCardClick(card)}
                    style={{ visibility: card.isMatched ? 'hidden' : 'visible' }}
                    className={`h-28 rounded-2xl p-3 border font-semibold text-xs flex flex-col items-center justify-center text-center transition-all cursor-pointer shadow-md select-none break-all ${
                      isSelected
                        ? `${theme.bg} ${theme.border} text-white scale-105 shadow-lg`
                        : isMismatched
                          ? 'bg-rose-600/25 border-rose-500 text-rose-300 scale-105 animate-shake'
                          : 'bg-slate-800 border-slate-700 hover:border-slate-600 text-slate-200 hover:bg-slate-750'
                    }`}
                  >
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">
                      {card.type === 'en' ? 'English' : 'Định nghĩa'}
                    </span>
                    <p className="line-clamp-3 leading-tight font-bold text-slate-100">
                      {card.content}
                    </p>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        /* Game Over Success screen */
        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-10 text-center space-y-6 shadow-2xl flex flex-col items-center justify-center max-w-xl mx-auto animate-zoomIn">
          <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
            <CheckCircle2 className="w-16 h-16" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-slate-100">Hoàn thành ghép từ! 🎉</h3>
            <p className="text-sm text-slate-400">Bạn đã phản xạ rất tuyệt vời.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center border-t border-b border-slate-700 py-5 w-full max-w-xs">
            <div>
              <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Thời gian</div>
              <div className="text-2xl font-extrabold text-slate-200 font-mono">{formatTime(time)}</div>
            </div>
            <div>
              <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Lượt click</div>
              <div className="text-2xl font-extrabold text-slate-200">{moves}</div>
            </div>
          </div>

          <div className="flex gap-3 w-full max-w-xs">
            <button
              onClick={initGame}
              className={`flex-1 py-3 px-5 text-white font-bold rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all text-sm ${theme.bg} ${theme.hoverBg}`}
            >
              <RotateCcw className="w-4 h-4" />
              Chơi lại
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
