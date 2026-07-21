import { useState, useMemo } from 'react';
import {
  BookOpen,
  Volume2,
  Star,
  CheckCircle,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  Search,
  Check,
  BookMarked
} from 'lucide-react';
import type { Vocal900Lesson, Vocal900Word } from '../types';
import { vocal900Lessons } from '../data/vocal900';
import { formatPOS } from '../utils/helpers';
import type { AccentTheme } from '../utils/helpers';
import { FlashcardCard } from './FlashcardCard';

interface Vocal900ViewProps {
  handleSpeak: (text: string) => void;
  ttsSpeed: string;
  setTtsSpeed: (speed: string) => void;
  theme: AccentTheme;
}

export function Vocal900View({
  handleSpeak,
  ttsSpeed,
  setTtsSpeed,
  theme
}: Vocal900ViewProps) {
  // State for active lesson (defaults to Lesson 1)
  const [selectedLessonId, setSelectedLessonId] = useState<number>(1);
  
  // View modes: 'flashcard' | 'list'
  const [viewMode, setViewMode] = useState<'flashcard' | 'list'>('flashcard');

  // Flashcard index & flip state
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Search filter for List view
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Progress state saved in localStorage for Vocal 900 words
  const [vocalProgress, setVocalProgress] = useState<Record<string, { mastered: boolean; starred: boolean }>>(() => {
    try {
      const stored = localStorage.getItem('vocal900_progress');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to load vocal900 progress', e);
    }
    return {};
  });

  const saveProgress = (newProgress: Record<string, { mastered: boolean; starred: boolean }>) => {
    setVocalProgress(newProgress);
    try {
      localStorage.setItem('vocal900_progress', JSON.stringify(newProgress));
    } catch (e) {
      console.warn('Failed to save vocal900 progress', e);
    }
  };

  const activeLesson: Vocal900Lesson = useMemo(() => {
    return vocal900Lessons.find(l => l.id === selectedLessonId) || vocal900Lessons[0];
  }, [selectedLessonId]);

  const currentWord: Vocal900Word | undefined = activeLesson.words[currentCardIndex];

  // Lesson stats
  const lessonStats = useMemo(() => {
    const total = activeLesson.words.length;
    const masteredCount = activeLesson.words.filter(w => vocalProgress[w.id]?.mastered).length;
    const percent = total > 0 ? Math.round((masteredCount / total) * 100) : 0;
    return { total, masteredCount, percent };
  }, [activeLesson, vocalProgress]);

  const handleLessonChange = (lessonId: number) => {
    setSelectedLessonId(lessonId);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    if (currentCardIndex < activeLesson.words.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
    } else {
      setCurrentCardIndex(activeLesson.words.length - 1);
    }
  };

  const toggleMastered = (wordId: string) => {
    const current = vocalProgress[wordId] || { mastered: false, starred: false };
    const updated = {
      ...vocalProgress,
      [wordId]: { ...current, mastered: !current.mastered }
    };
    saveProgress(updated);
  };

  const toggleStarred = (wordId: string) => {
    const current = vocalProgress[wordId] || { mastered: false, starred: false };
    const updated = {
      ...vocalProgress,
      [wordId]: { ...current, starred: !current.starred }
    };
    saveProgress(updated);
  };

  const handleResetLessonProgress = () => {
    const updated = { ...vocalProgress };
    activeLesson.words.forEach(w => {
      if (updated[w.id]) {
        updated[w.id] = { ...updated[w.id], mastered: false };
      }
    });
    saveProgress(updated);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const filteredWordsInList = useMemo(() => {
    if (!searchTerm.trim()) return activeLesson.words;
    const term = searchTerm.toLowerCase();
    return activeLesson.words.filter(
      w =>
        w.word.toLowerCase().includes(term) ||
        w.definitions.some(d => d.toLowerCase().includes(term))
    );
  }, [activeLesson, searchTerm]);

  return (
    <div className="space-y-6 animate-fadeIn" data-testid="vocal900-view">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl ${theme.lightBg} border ${theme.lightBorder} text-blue-400 shadow-md`}>
              <BookMarked className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30">
                  Target 900+
                </span>
                <span className="text-xs text-slate-400 font-medium">TOEIC Vocal 900</span>
              </div>
              <h1 className="text-2xl font-extrabold text-white mt-0.5 tracking-tight">
                Vocal 900 - Học Từ Vựng Theo Bài
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="bg-slate-800 border border-slate-700 p-1 rounded-xl flex items-center shadow-inner">
              <button
                onClick={() => setViewMode('flashcard')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'flashcard'
                    ? `${theme.bg} text-white shadow-md`
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Thẻ Học
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'list'
                    ? `${theme.bg} text-white shadow-md`
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Danh Sách
              </button>
            </div>

            {/* Speech speed select */}
            <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl text-xs text-slate-300">
              <Volume2 className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={ttsSpeed}
                onChange={e => setTtsSpeed(e.target.value)}
                className="bg-transparent text-slate-200 outline-none cursor-pointer text-xs"
              >
                <option value="0.75" className="bg-slate-800">0.75x</option>
                <option value="1" className="bg-slate-800">1.0x (Chuẩn)</option>
                <option value="1.25" className="bg-slate-800">1.25x</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar: Lessons List */}
        <aside className="lg:col-span-4 xl:col-span-3 bg-slate-900/90 border border-slate-800 rounded-3xl p-4 shadow-xl space-y-4">
          <div className="flex items-center justify-between px-2 pt-1">
            <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              Danh Sách Bài Học
            </h2>
            <span className="text-xs px-2 py-0.5 bg-slate-800 border border-slate-700 text-slate-400 rounded-full font-medium">
              {vocal900Lessons.length} Lesson
            </span>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
            {vocal900Lessons.map(lesson => {
              const isActive = lesson.id === selectedLessonId;
              const masteredInLesson = lesson.words.filter(w => vocalProgress[w.id]?.mastered).length;
              const isFullyMastered = masteredInLesson === lesson.words.length && lesson.words.length > 0;

              return (
                <button
                  key={lesson.id}
                  onClick={() => handleLessonChange(lesson.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2 relative overflow-hidden group ${
                    isActive
                      ? `bg-gradient-to-r from-blue-900/40 to-slate-800 ${theme.border} text-white shadow-lg`
                      : 'bg-slate-800/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-blue-500 rounded-r-full" />
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold tracking-tight group-hover:text-blue-400 transition-colors">
                      {lesson.title}
                    </span>
                    {isFullyMastered && (
                      <span className="text-emerald-400 bg-emerald-500/10 p-1 rounded-full border border-emerald-500/20" title="Đã hoàn thành bài này">
                        <CheckCircle className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  {lesson.description && (
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {lesson.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/80">
                    <span className="font-medium">{lesson.words.length} từ vựng</span>
                    <span className={`font-semibold ${isFullyMastered ? 'text-emerald-400' : 'text-blue-400'}`}>
                      {masteredInLesson}/{lesson.words.length} đã thuộc
                    </span>
                  </div>

                  {/* Progress bar per lesson */}
                  <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isFullyMastered ? 'bg-emerald-500' : theme.bg
                      }`}
                      style={{ width: `${(masteredInLesson / lesson.words.length) * 100}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-slate-800/40 border border-slate-800 rounded-2xl text-xs text-slate-400 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Các bài học mới sẽ tự động cập nhật tại đây khi được thêm vào hệ thống!
            </p>
          </div>
        </aside>

        {/* Right Main Panel: Flashcard or List view */}
        <main className="lg:col-span-8 xl:col-span-9 space-y-6">
          {/* Lesson Title & Progress header */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-100">
                  {activeLesson.title}
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Tiến độ: <span className="text-slate-200 font-semibold">{lessonStats.masteredCount}</span> / {lessonStats.total} từ đã thuộc ({lessonStats.percent}%)
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-36 bg-slate-800 rounded-full h-3 p-0.5 border border-slate-700">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    lessonStats.percent === 100 ? 'bg-emerald-500' : theme.bg
                  }`}
                  style={{ width: `${lessonStats.percent}%` }}
                />
              </div>

              <button
                onClick={handleResetLessonProgress}
                className="p-2 text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors cursor-pointer text-xs flex items-center gap-1.5"
                title="Đặt lại tiến độ bài học này"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Làm lại</span>
              </button>
            </div>
          </div>

          {/* Mode 1: Flashcard View */}
          {viewMode === 'flashcard' && (
            <div className="space-y-6 flex flex-col items-center">
              {currentWord ? (
                <div className="w-full max-w-2xl">
                  {/* Card Navigation Top Info */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3 px-2">
                    <span className="font-semibold text-slate-300">
                      Thẻ {currentCardIndex + 1} / {activeLesson.words.length}
                    </span>
                    <div className="flex items-center gap-2">
                      {vocalProgress[currentWord.id]?.mastered && (
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Đã thuộc
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Shared 3D Flipping Flashcard */}
                  <FlashcardCard
                    word={currentWord.word}
                    partOfSpeech={currentWord.partOfSpeech}
                    ipa={currentWord.ipa}
                    badgeLabel={activeLesson.title.split(':')[0]}
                    cardIndexText={`Thẻ ${currentCardIndex + 1} / ${activeLesson.words.length}`}
                    isStarred={vocalProgress[currentWord.id]?.starred}
                    isMastered={vocalProgress[currentWord.id]?.mastered}
                    onToggleStarred={() => toggleStarred(currentWord.id)}
                    onSpeak={handleSpeak}
                    isFlipped={isFlipped}
                    setIsFlipped={setIsFlipped}
                    theme={theme}
                    heightClass="h-[420px] sm:h-[450px]"
                    testIdCard="vocal-flashcard"
                    backContent={
                      <div className="h-full flex flex-col justify-between overflow-y-auto custom-scrollbar">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
                            <div className="flex items-center gap-2">
                              <h4 className="text-2xl font-bold text-white">{currentWord.word}</h4>
                              <span className="text-xs text-blue-400 font-semibold bg-blue-500/10 px-2.5 py-0.5 rounded-md">
                                {formatPOS(currentWord.partOfSpeech)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={e => {
                                  e.stopPropagation();
                                  toggleStarred(currentWord.id);
                                }}
                                className="text-slate-400 hover:text-amber-400 p-1"
                              >
                                <Star className={`w-4 h-4 ${vocalProgress[currentWord.id]?.starred ? 'fill-amber-400 text-amber-400' : ''}`} />
                              </button>
                              <button
                                onClick={e => {
                                  e.stopPropagation();
                                  handleSpeak(currentWord.word);
                                }}
                                className="p-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 rounded-xl transition-all"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Meanings */}
                          <div className="space-y-1.5">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Nghĩa tiếng Việt:</p>
                            <ul className="list-disc list-inside space-y-1 text-sm text-slate-100 font-medium bg-slate-900/60 p-3 rounded-2xl border border-slate-700/40">
                              {currentWord.definitions.map((def, idx) => (
                                <li key={idx} className="leading-relaxed">
                                  {def}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Examples */}
                          <div className="space-y-2">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Ví dụ minh họa:</p>
                            <div className="space-y-2">
                              {currentWord.examples.map((ex, idx) => (
                                <div key={idx} className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-3 space-y-1 text-xs">
                                  <div className="flex items-start justify-between gap-2">
                                    <p className="text-slate-200 font-medium leading-relaxed italic">
                                      <span className="text-blue-400 font-bold not-italic mr-1">{String.fromCharCode(97 + idx)}.</span> "{ex.example}"
                                    </p>
                                    <button
                                      onClick={e => {
                                        e.stopPropagation();
                                        handleSpeak(ex.example);
                                      }}
                                      className="text-slate-400 hover:text-blue-400 p-1 flex-shrink-0"
                                      title="Nghe ví dụ"
                                    >
                                      <Volume2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                  <p className="text-blue-300/90 pl-3 border-l-2 border-blue-500/40">
                                    → {ex.translation}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="text-center text-xs text-slate-500 pt-3 border-t border-slate-700/50">
                          Bấm lại để lật về mặt trước
                        </div>
                      </div>
                    }
                  />

                  {/* Controls below card */}
                  <div className="flex items-center justify-between gap-4 mt-6">
                    <button
                      onClick={handlePrevCard}
                      className="p-3 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 rounded-2xl transition-all cursor-pointer shadow-md flex items-center justify-center"
                      title="Từ trước đó"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-3 flex-1 max-w-sm">
                      <button
                        onClick={() => {
                          if (vocalProgress[currentWord.id]?.mastered) {
                            toggleMastered(currentWord.id);
                          }
                          handleNextCard();
                        }}
                        className="flex-1 py-3 px-4 bg-slate-800 border border-slate-700 hover:bg-red-500/20 hover:border-red-500/40 text-slate-300 hover:text-red-400 font-bold rounded-2xl transition-all cursor-pointer text-xs sm:text-sm shadow-md active:scale-95 text-center"
                      >
                        Chưa thuộc
                      </button>

                      <button
                        onClick={() => {
                          if (!vocalProgress[currentWord.id]?.mastered) {
                            toggleMastered(currentWord.id);
                          }
                          handleNextCard();
                        }}
                        className={`flex-1 py-3 px-4 font-bold text-white rounded-2xl transition-all cursor-pointer text-xs sm:text-sm shadow-md active:scale-95 text-center ${
                          vocalProgress[currentWord.id]?.mastered
                            ? 'bg-emerald-600 hover:bg-emerald-700'
                            : `${theme.bg} ${theme.hoverBg}`
                        }`}
                      >
                        {vocalProgress[currentWord.id]?.mastered ? 'Đã Thuộc ✓' : 'Đánh Dấu Thuộc'}
                      </button>
                    </div>

                    <button
                      onClick={handleNextCard}
                      className="p-3 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 rounded-2xl transition-all cursor-pointer shadow-md flex items-center justify-center"
                      title="Từ tiếp theo"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-800 border border-slate-700 rounded-3xl p-8 space-y-4">
                  <p className="text-slate-400">Không có từ vựng trong bài học này.</p>
                </div>
              )}
            </div>
          )}

          {/* Mode 2: List View */}
          {viewMode === 'list' && (
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm từ vựng trong bài học..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors shadow-inner"
                />
              </div>

              <div className="space-y-3">
                {filteredWordsInList.map((w, index) => {
                  const isMastered = vocalProgress[w.id]?.mastered;
                  const isStarred = vocalProgress[w.id]?.starred;

                  return (
                    <div
                      key={w.id}
                      className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
                        isMastered
                          ? 'bg-slate-900/60 border-slate-800/80 opacity-90'
                          : 'bg-slate-800/80 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-slate-500 w-6">
                            #{index + 1}
                          </span>
                          <h4 className="text-lg font-bold text-white tracking-tight">
                            {w.word}
                          </h4>
                          <span className="text-xs bg-blue-500/10 text-blue-400 px-2.5 py-0.5 rounded-full font-semibold border border-blue-500/20">
                            {formatPOS(w.partOfSpeech)}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            {w.ipa}
                          </span>
                          <button
                            onClick={() => handleSpeak(w.word)}
                            className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Meanings */}
                        <div className="text-xs text-slate-300 pl-9 space-y-1">
                          <p className="font-semibold text-slate-400">Nghĩa:</p>
                          <p className="text-slate-200 leading-relaxed font-medium">
                            {w.definitions.join(' • ')}
                          </p>
                        </div>

                        {/* Examples */}
                        <div className="pl-9 space-y-1.5 pt-1">
                          {w.examples.map((ex, exIdx) => (
                            <div key={exIdx} className="text-xs text-slate-400 space-y-0.5">
                              <p className="italic text-slate-300">
                                <span className="text-blue-400 font-bold not-italic">{String.fromCharCode(97 + exIdx)}.</span> "{ex.example}"
                              </p>
                              <p className="text-blue-300/80 pl-3">→ {ex.translation}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-start">
                        <button
                          onClick={() => toggleStarred(w.id)}
                          className={`p-2.5 rounded-xl border transition-all ${
                            isStarred
                              ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                              : 'bg-slate-700/50 border-slate-600/50 text-slate-400 hover:text-amber-400'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-400' : ''}`} />
                        </button>

                        <button
                          onClick={() => toggleMastered(w.id)}
                          className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                            isMastered
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                              : 'bg-slate-700/60 border-slate-600 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          {isMastered ? 'Đã thuộc' : 'Đánh dấu thuộc'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
