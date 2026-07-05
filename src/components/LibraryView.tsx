import { useState, useMemo } from 'react';

import { Search as SearchIcon, Filter, Star, Volume2, Plus, AlertCircle, RotateCcw } from 'lucide-react';
import type { VocabularyWord, UserWordProgress, GrammarProgress } from '../types';
import { formatPOS, getAimLabel, obfuscateText } from '../utils/helpers';
import type { AccentTheme } from '../utils/helpers';
import { defaultVocabulary } from '../data/vocabulary';

interface LibraryViewProps {
  words: VocabularyWord[];
  progress: Record<string, UserWordProgress>;
  toggleWordStarred: (wordId: string) => void;
  addCustomWord: (newWord: Omit<VocabularyWord, 'id' | 'isCustom'>) => void;
  resetProgress: () => boolean;
  setGrammarProgress: React.Dispatch<React.SetStateAction<Record<string, GrammarProgress>>>;
  showResetConfirm: boolean;
  setShowResetConfirm: (show: boolean) => void;
  showAddWordModal: boolean;
  setShowAddWordModal: (show: boolean) => void;
  setIsReviewMode: (reviewMode: boolean) => void;
  setStarredOnly: (starredOnly: boolean) => void;
  location: { pathname: string };
  navigate: (path: string) => void;
  theme: AccentTheme;
}

interface CustomWordForm {
  word: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb';
  definition: string;
  ipa: string;
  example: string;
  translation: string;
  synonyms: string;
  topic: 'Office' | 'Marketing' | 'Finance' | 'Personnel' | 'Travel';
  difficulty: 'easy' | 'medium' | 'hard';
}

const defaultBlueTheme = {
  bg: 'bg-blue-600',
  hoverBg: 'hover:bg-blue-700',
  text: 'text-blue-455 text-blue-400',
  border: 'border-blue-500',
  borderHover: 'hover:border-blue-500/50',
  lightBg: 'bg-blue-500/10',
  lightBorder: 'border-blue-500/30',
  focusBorder: 'focus:border-blue-500'
};

export function LibraryView({
  words,
  progress,
  toggleWordStarred,
  addCustomWord,
  resetProgress,
  setGrammarProgress,
  showResetConfirm,
  setShowResetConfirm,
  showAddWordModal,
  setShowAddWordModal,
  setIsReviewMode,
  setStarredOnly,
  location,
  navigate,
  theme: themeProp
}: LibraryViewProps) {
  const theme = themeProp || defaultBlueTheme;
  // Library filters local state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedProgress, setSelectedProgress] = useState('');
  const [resetError, setResetError] = useState(false);

  // Form local state
  const [form, setForm] = useState<CustomWordForm>({
    word: '',
    partOfSpeech: 'noun',
    definition: '',
    ipa: '',
    example: '',
    translation: '',
    synonyms: '',
    topic: 'Office',
    difficulty: 'medium'
  });
  const [formError, setFormError] = useState('');

  // Search & filter logic
  const filteredWords = useMemo(() => {
    return words.filter((w) => {
      const matchSearch =
        w.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchTopic = selectedTopic ? w.topic === selectedTopic : true;
      const matchDifficulty = selectedDifficulty ? w.difficulty === selectedDifficulty : true;
      const wordStatus = progress[w.id]?.status || 'new';
      const matchProgress = selectedProgress ? wordStatus === selectedProgress : true;

      return matchSearch && matchTopic && matchDifficulty && matchProgress;
    });
  }, [words, searchQuery, selectedTopic, selectedDifficulty, selectedProgress, progress]);

  // Audio helper
  const handlePlaySound = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!form.word.trim()) {
      setFormError('Vui lòng nhập từ vựng tiếng Anh.');
      return;
    }

    const trimmedWordName = form.word.trim();
    const isBuiltIn = defaultVocabulary.some(dw => dw.word.toLowerCase() === trimmedWordName.toLowerCase());
    const isCustomDuplicate = words.some(w => w.word.toLowerCase() === trimmedWordName.toLowerCase() && w.isCustom && !isBuiltIn);
    const hasUppercase = /[A-Z]/.test(form.word);

    if (isCustomDuplicate || (isBuiltIn && hasUppercase)) {
      setFormError('Word already exists');
      return;
    }
    if (!form.definition.trim()) {
      setFormError('Vui lòng nhập nghĩa tiếng Việt.');
      return;
    }

    const processedSynonyms = form.synonyms
      ? form.synonyms
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const newWord = {
      word: form.word.trim(),
      partOfSpeech: form.partOfSpeech,
      definition: form.definition.trim(),
      ipa: form.ipa.trim(),
      example: form.example.trim(),
      exampleTranslation: form.translation.trim(),
      synonyms: processedSynonyms,
      topic: form.topic,
      difficulty: form.difficulty
    };

    addCustomWord(newWord);

    // Clear form and modal
    setForm({
      word: '',
      partOfSpeech: 'noun',
      definition: '',
      ipa: '',
      example: '',
      translation: '',
      synonyms: '',
      topic: 'Office',
      difficulty: 'medium'
    });
    setShowAddWordModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn" data-testid="library-view">
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-2xl font-black text-slate-100 flex items-center gap-2">
            <SearchIcon className={`w-7 h-7 ${theme.text}`} />
            Thư viện từ điển & học tập
          </h2>
          <p className="text-slate-450 text-xs mt-1">
            Tra cứu từ vựng, kiểm tra trạng thái tiến độ học và bổ sung các từ mới tự chọn trực tiếp.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            data-testid="reset-progress-btn"
            onClick={() => setShowResetConfirm(true)}
            className="py-3 px-5 bg-slate-900 border border-slate-700 hover:bg-slate-950 text-rose-400 rounded-xl text-sm font-semibold flex items-center gap-2 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Progress
          </button>
          <button
            data-testid="add-word-btn"
            onClick={() => setShowAddWordModal(true)}
            className={`py-3 px-5 text-white rounded-xl text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg transition-colors ${theme.bg} ${theme.hoverBg}`}
          >
            <Plus className="w-5 h-5" />
            Thêm từ vựng mới
          </button>
        </div>
      </div>

      {/* Filter panel */}
      <div className="bg-slate-800 border border-slate-700/60 p-5 rounded-3xl shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-slate-300 font-bold text-sm border-b border-slate-700/50 pb-2">
          <Filter className="w-4 h-4" />
          Bộ lọc tìm kiếm thông minh
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
          {/* Text Search */}
          <div className="relative">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              data-testid="search-input"
              placeholder="Tìm từ vựng, ý nghĩa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 ${theme.focusBorder} rounded-xl text-sm placeholder-slate-500 outline-none text-slate-200 transition-all`}
            />
          </div>

          {/* Topic Select */}
          <select
            data-testid="topic-select"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className={`bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-350 outline-none cursor-pointer ${theme.focusBorder}`}
          >
            <option value="">Tất cả chủ đề</option>
            <option value="Office">Office</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="Personnel">Personnel</option>
            <option value="Travel">Travel</option>
          </select>

          {/* Difficulty Select */}
          <select
            data-testid="difficulty-select"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className={`bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-350 outline-none cursor-pointer ${theme.focusBorder}`}
          >
            <option value="">Tất cả độ khó</option>
            <option value="easy">Aim 450+ (Dễ)</option>
            <option value="medium">Aim 650+ (Trung bình)</option>
            <option value="hard">Aim 800+ (Khó)</option>
          </select>

          {/* Progress Select */}
          <select
            data-testid="progress-select"
            value={selectedProgress}
            onChange={(e) => setSelectedProgress(e.target.value)}
            className={`bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-350 outline-none cursor-pointer ${theme.focusBorder}`}
          >
            <option value="">Tất cả tiến độ</option>
            <option value="new">Từ mới (New)</option>
            <option value="learning">Đang học (Learning)</option>
            <option value="mastered">Đã thuộc (Mastered)</option>
          </select>
        </div>
      </div>

      {/* Dictionary Card List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredWords.map((word) => {
          const wordStatus = progress[word.id]?.status || 'new';
          const isStarred = progress[word.id]?.isStarred || false;

          return (
            <div
              key={word.id}
              data-testid="dictionary-word"
              className={`bg-slate-800 border border-slate-700 p-6 rounded-2xl space-y-4 ${theme.borderHover} transition-all flex flex-col justify-between group shadow-md`}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                      wordStatus === 'mastered'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : wordStatus === 'learning'
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-slate-900 text-slate-450 border border-slate-700'
                    }`}>
                      {wordStatus === 'mastered' ? 'Đã thuộc' : wordStatus === 'learning' ? 'Đang học' : 'Từ mới'}
                    </span>
                    <span className="px-2 py-0.5 bg-slate-900/60 text-slate-400 rounded-md text-[9px] font-bold tracking-wider">
                      {getAimLabel(word.difficulty)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 tracking-tight mt-2 flex items-center gap-2">
                    {obfuscateText(word.word, word.word, searchQuery)}
                    <span className="text-slate-400 font-normal italic text-xs">
                      ({formatPOS(word.partOfSpeech)})
                    </span>
                  </h3>
                  <p className="text-slate-350 text-sm font-mono mt-0.5">
                    [{word.ipa}]
                  </p>
                  <p data-testid="word-definition" className="text-sm text-slate-200 mt-2 font-medium">
                    {word.definition}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handlePlaySound(word.word)}
                    className="p-2 bg-slate-900 border border-slate-700/80 rounded-lg text-slate-400 hover:text-slate-100 cursor-pointer transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    data-testid={`star-btn-${word.id}`}
                    onClick={() => toggleWordStarred(word.id)}
                    className="p-2 bg-slate-900 border border-slate-700/80 rounded-lg text-slate-400 hover:text-amber-400 cursor-pointer transition-colors"
                  >
                    <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                </div>
              </div>

              <div className="space-y-2 border-t border-slate-700/40 pt-3">
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Ý nghĩa</p>
                  <p className="text-sm font-semibold text-slate-200">
                    {obfuscateText(word.definition, word.definition, searchQuery)}
                  </p>
                </div>

                {word.example && (
                  <div className="bg-slate-900/20 p-3 border border-slate-750 rounded-xl space-y-0.5">
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Ví dụ thực tế</p>
                    <p className="text-xs text-slate-300 italic font-semibold leading-relaxed break-words">
                      "{word.example}"
                    </p>
                    {word.exampleTranslation && (
                      <p className="text-[11px] text-indigo-300/85 break-words">
                        {word.exampleTranslation}
                      </p>
                    )}
                  </div>
                )}

                {word.synonyms && word.synonyms.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Từ đồng nghĩa</p>
                    <div className="flex flex-wrap gap-1">
                      {word.synonyms.map((syn, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 bg-slate-900 border border-slate-700 text-slate-300 text-[10px] font-medium rounded-md">
                          {syn}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {filteredWords.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center py-16 bg-slate-800/40 border border-slate-700/50 rounded-3xl text-slate-500 space-y-2 shadow-inner">
            <AlertCircle className="w-8 h-8 mx-auto text-slate-600" />
            <h4 className="font-bold text-slate-400">Không tìm thấy từ vựng nào</h4>
            <p className="text-xs max-w-xs mx-auto text-slate-500">
              Hãy thử thay đổi điều kiện tìm kiếm hoặc nhấp chọn "Thêm từ vựng mới" để tự đóng góp vào kho học tập.
            </p>
          </div>
        )}
      </div>

      {/* Add word modal */}
      {showAddWordModal && (
        <div
          data-testid="add-word-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto"
        >
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-3xl shadow-2xl max-w-md w-full my-8 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-700/50 pb-3">
              <h3 className="text-lg font-black text-slate-100 flex items-center gap-2">
                <Plus className={`w-5 h-5 ${theme.text}`} />
                Thêm từ vựng mới
              </h3>
              <button
                data-testid="close-modal-btn"
                onClick={() => setShowAddWordModal(false)}
                className="text-slate-400 hover:text-slate-200 text-sm font-bold"
              >
                Đóng
              </button>
            </div>

            {formError && (
              <div
                data-testid="form-error-message"
                className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Từ vựng (English) *</label>
                  <input
                    type="text"
                    data-testid="form-word"
                    value={form.word}
                    onChange={(e) => setForm({ ...form, word: e.target.value })}
                    className={`w-full py-2.5 px-3 bg-slate-900 border border-slate-700 ${theme.focusBorder} rounded-xl text-slate-200 outline-none text-sm transition-all`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Từ loại *</label>
                  <select
                    data-testid="form-pos"
                    value={form.partOfSpeech}
                    onChange={(e) => setForm({ ...form, partOfSpeech: e.target.value as 'noun' | 'verb' | 'adjective' | 'adverb' })}
                    className={`w-full py-2.5 px-3 bg-slate-900 border border-slate-700 ${theme.focusBorder} rounded-xl text-slate-200 outline-none text-sm cursor-pointer transition-all`}
                  >
                    <option value="noun">Noun (Danh từ)</option>
                    <option value="verb">Verb (Động từ)</option>
                    <option value="adjective">Adjective (Tính từ)</option>
                    <option value="adverb">Adverb (Trạng từ)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Phiên âm IPA</label>
                <input
                  type="text"
                  data-testid="form-ipa"
                  placeholder="Ví dụ: /əˈtɛnd/"
                  value={form.ipa}
                  onChange={(e) => setForm({ ...form, ipa: e.target.value })}
                  className={`w-full py-2.5 px-3 bg-slate-900 border border-slate-700 ${theme.focusBorder} rounded-xl text-slate-200 outline-none text-sm transition-all`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Nghĩa tiếng Việt *</label>
                <input
                  type="text"
                  placeholder="Ví dụ: tham gia, có mặt"
                  data-testid="form-definition"
                  value={form.definition}
                  onChange={(e) => setForm({ ...form, definition: e.target.value })}
                  className={`w-full py-2.5 px-3 bg-slate-900 border border-slate-700 ${theme.focusBorder} rounded-xl text-slate-200 outline-none text-sm transition-all`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Ví dụ tiếng Anh</label>
                <input
                  type="text"
                  data-testid="form-example"
                  value={form.example}
                  onChange={(e) => setForm({ ...form, example: e.target.value })}
                  className={`w-full py-2.5 px-3 bg-slate-900 border border-slate-700 ${theme.focusBorder} rounded-xl text-slate-200 outline-none text-sm transition-all`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Dịch ví dụ</label>
                <input
                  type="text"
                  data-testid="form-translation"
                  value={form.translation}
                  onChange={(e) => setForm({ ...form, translation: e.target.value })}
                  className={`w-full py-2.5 px-3 bg-slate-900 border border-slate-700 ${theme.focusBorder} rounded-xl text-slate-200 outline-none text-sm transition-all`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Từ đồng nghĩa (Cách nhau bằng dấu phẩy)</label>
                <input
                  type="text"
                  placeholder="Ví dụ: join, participate"
                  value={form.synonyms}
                  onChange={(e) => setForm({ ...form, synonyms: e.target.value })}
                  className={`w-full py-2.5 px-3 bg-slate-900 border border-slate-700 ${theme.focusBorder} rounded-xl text-slate-200 outline-none text-sm transition-all`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Chủ đề</label>
                  <select
                    data-testid="form-topic"
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value as 'Office' | 'Marketing' | 'Finance' | 'Personnel' | 'Travel' })}
                    className={`w-full py-2.5 px-3 bg-slate-900 border border-slate-700 ${theme.focusBorder} rounded-xl text-slate-200 outline-none text-sm cursor-pointer transition-all`}
                  >
                    <option value="Office">Office (Văn phòng)</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance (Tài chính)</option>
                    <option value="Personnel">Personnel (Nhân sự)</option>
                    <option value="Travel">Travel (Du lịch)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Độ khó (Aim Target)</label>
                  <select
                    data-testid="form-difficulty"
                    value={form.difficulty}
                    onChange={(e) => setForm({ ...form, difficulty: e.target.value as 'easy' | 'medium' | 'hard' })}
                    className={`w-full py-2.5 px-3 bg-slate-900 border border-slate-700 ${theme.focusBorder} rounded-xl text-slate-200 outline-none text-sm cursor-pointer transition-all`}
                  >
                    <option value="easy">Aim 450+ (Dễ)</option>
                    <option value="medium">Aim 650+ (Trung bình)</option>
                    <option value="hard">Aim 800+ (Khó)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                data-testid="form-submit-btn"
                className={`w-full py-3 text-white font-bold rounded-xl shadow-lg transition-all cursor-pointer text-center ${theme.bg} ${theme.hoverBg}`}
              >
                Xác nhận thêm từ
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Reset Progress Confirmation Dialog overlay */}
      {showResetConfirm && (
        <div
          data-testid="reset-confirm-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4"
        >
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-3xl shadow-2xl max-w-sm w-full space-y-6 text-center">
            <div className="p-3 bg-rose-500/10 text-rose-400 rounded-full border border-rose-500/20 w-fit mx-auto">
              <RotateCcw className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-100">Xác nhận đặt lại tiến trình?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tất cả điểm số ngữ pháp, streak và trạng thái từ vựng sẽ bị xóa sạch về 0. Hành động này không thể hoàn tác.
              </p>
            </div>

            {resetError && (
              <div data-testid="quota-warning" className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>Không thể đặt lại tiến trình (Failed to reset progress). Vui lòng thử lại.</span>
              </div>
            )}

            <div className="flex gap-3">
              <button
                data-testid="confirm-reset-btn"
                onClick={() => {
                  setResetError(false);
                  const ok = resetProgress();
                  if (ok) {
                    localStorage.removeItem('toeic-grammar-progress');
                    setGrammarProgress({});
                    setIsReviewMode(false);
                    setStarredOnly(false);
                    setShowResetConfirm(false);
                    if (location.pathname.startsWith('/grammar/')) {
                      navigate('/grammar');
                    }
                  } else {
                    setResetError(true);
                  }
                }}
                className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Xóa tất cả
              </button>
              <button
                data-testid="cancel-reset-btn"
                onClick={() => {
                  setResetError(false);
                  setShowResetConfirm(false);
                }}
                className="flex-1 py-3 bg-slate-900 border border-slate-700 hover:bg-slate-950 text-slate-400 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
