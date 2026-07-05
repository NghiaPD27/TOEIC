import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Plus, X, AlertCircle, Star } from 'lucide-react';
import type { VocabularyWord, UserWordProgress, GrammarProgress } from '../types';
import { formatPOS, getAimLabel, obfuscateText } from '../utils/helpers';

interface LibraryViewProps {
  words: VocabularyWord[];
  progress: Record<string, UserWordProgress>;
  toggleWordStarred: (wordId: string) => void;
  addCustomWord: (word: Omit<VocabularyWord, "id" | "isCustom">) => void;
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
}

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
  navigate
}: LibraryViewProps) {
  // Local Library View Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedProgress, setSelectedProgress] = useState('');

  // Local Add Custom Word Form States
  const [formWord, setFormWord] = useState('');
  const [formPos, setFormPos] = useState<'noun' | 'verb' | 'adjective' | 'adverb'>('noun');
  const [formDefinition, setFormDefinition] = useState('');
  const [formIpa, setFormIpa] = useState('');
  const [formExample, setFormExample] = useState('');
  const [formTranslation, setFormTranslation] = useState('');
  const [formTopic, setFormTopic] = useState<'Office' | 'Marketing' | 'Finance' | 'Personnel' | 'Travel'>('Office');
  const [formDifficulty, setFormDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [formSynonyms, setFormSynonyms] = useState('');
  const [formError, setFormError] = useState('');
  const [resetError, setResetError] = useState(false);

  // Library filtering logic
  const filteredWords = useMemo(() => {
    return words.filter((w) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const inWord = (w.word || '').toLowerCase().includes(q);
        const inDef = (w.definition || '').toLowerCase().includes(q);
        const inIpa = (w.ipa || '').toLowerCase().includes(q);
        const inExample = (w.example || '').toLowerCase().includes(q);
        const inExampleTrans = (w.exampleTranslation || '').toLowerCase().includes(q);
        if (!inWord && !inDef && !inIpa && !inExample && !inExampleTrans) {
          return false;
        }
      }
      if (selectedTopic && w.topic !== selectedTopic) {
        return false;
      }
      if (selectedDifficulty && w.difficulty !== selectedDifficulty) {
        return false;
      }
      if (selectedProgress) {
        const status = progress[w.id]?.status || 'new';
        if (status !== selectedProgress) {
          return false;
        }
      }
      return true;
    });
  }, [words, progress, searchQuery, selectedTopic, selectedDifficulty, selectedProgress]);

  const handleCancelAddWord = () => {
    setFormWord('');
    setFormPos('noun');
    setFormDefinition('');
    setFormIpa('');
    setFormExample('');
    setFormTranslation('');
    setFormSynonyms('');
    setFormTopic('Office');
    setFormDifficulty('medium');
    setFormError('');
    setShowAddWordModal(false);
  };

  const handleAddWordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const word = formWord.trim();
    const definition = formDefinition.trim();
    const ipa = formIpa.trim();
    const example = formExample.trim();
    const translation = formTranslation.trim();

    if (!word || !definition) {
      setFormError('Word and definition are required.');
      return;
    }

    // Checking duplicate rules
    const customOnly = words.filter((w) => w.isCustom);
    const existsInCustom = customOnly.some((w) => w.word.toLowerCase() === word.toLowerCase());
    const defaultMatchInsensitive = words.some((w) => !w.isCustom && w.word.toLowerCase() === word.toLowerCase());
    const defaultMatchExact = words.some((w) => !w.isCustom && w.word === word);

    if (existsInCustom || (defaultMatchInsensitive && !defaultMatchExact)) {
      setFormError('Word already exists in the database.');
      return;
    }

    // Validation for length limits
    if (
      word.length > 100 ||
      definition.length > 1000 ||
      ipa.length > 100 ||
      example.length > 1000 ||
      translation.length > 1000 ||
      formSynonyms.length > 1000
    ) {
      setFormError('Input exceeds maximum string length.');
      return;
    }

    const synonymsArray = formSynonyms
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    addCustomWord({
      word,
      partOfSpeech: formPos,
      ipa,
      definition,
      example,
      exampleTranslation: translation,
      topic: formTopic,
      difficulty: formDifficulty,
      synonyms: synonymsArray
    });

    handleCancelAddWord();
  };

  const renderedLibraryList = useMemo(() => {
    if (filteredWords.length === 0) {
      return (
        <div data-testid="library-empty-state" className="text-center py-16 bg-slate-800 border border-slate-700 rounded-2xl">
          <p className="text-slate-400">No matching words found in the database.</p>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredWords.map((word) => (
          <div
            key={word.id}
            data-testid="dictionary-word"
            className="bg-slate-800 border border-slate-700 p-6 rounded-2xl space-y-4 hover:border-blue-500/50 transition-all flex flex-col justify-between group shadow-md"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    {word.word}
                    <span className="text-xs px-2.5 py-0.5 bg-slate-750 border border-slate-700 rounded-full text-slate-400 font-semibold uppercase">
                      {formatPOS(word.partOfSpeech)}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 font-medium">[{word.ipa}]</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => toggleWordStarred(word.id)}
                    className="p-1 bg-transparent hover:bg-slate-700/50 rounded-lg text-slate-400 hover:text-amber-400 cursor-pointer transition-colors"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        progress[word.id]?.isStarred ? 'fill-amber-400 text-amber-400' : 'text-slate-500 hover:text-amber-400'
                      }`}
                    />
                  </button>
                  {word.isCustom && (
                    <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded text-[10px] font-bold uppercase tracking-wider">
                      Custom
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Definition</div>
                <p data-testid="word-definition" className="text-sm font-semibold text-slate-200">
                  {obfuscateText(word.definition, word.word, searchQuery)}
                </p>
              </div>

              <div className="space-y-1 pt-1.5 border-t border-slate-700/50">
                <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Example Sentence</div>
                <p className="text-xs italic text-slate-300">"{obfuscateText(word.example, word.word, searchQuery)}"</p>
                <p className="text-xs text-slate-400">{obfuscateText(word.exampleTranslation, word.word, searchQuery)}</p>
              </div>

              {word.synonyms && word.synonyms.length > 0 && (
                <div className="space-y-1 pt-1.5 border-t border-slate-700/50">
                  <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Từ đồng nghĩa (Synonyms)</div>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {word.synonyms.map((syn, sIdx) => (
                      <span key={sIdx} className="px-1.5 py-0.5 bg-slate-900 border border-slate-750 text-slate-300 text-[10px] font-medium rounded-md">
                        {syn}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Word status & tags details */}
            <div className="flex justify-between items-center pt-3 border-t border-slate-700/30 text-xs">
              <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                {word.topic} • {getAimLabel(word.difficulty)}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                  (progress[word.id]?.status || 'new') === 'mastered'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : (progress[word.id]?.status || 'new') === 'learning'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-slate-700/20 text-slate-400 border border-slate-700/30'
                }`}
              >
                {progress[word.id]?.status || 'new'}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }, [filteredWords, progress, searchQuery, toggleWordStarred]);

  return (
    <div className="space-y-6">
      {/* Filter toolbar */}
      <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl flex flex-wrap gap-4 items-center justify-between shadow-xl">
        {/* Search bar */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            data-testid="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search TOEIC words..."
            className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 focus:border-blue-500 rounded-xl text-sm placeholder-slate-500 outline-none text-slate-200 transition-all"
          />
        </div>

        {/* Select filters */}
        <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
          <select
            data-testid="topic-select"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-300 outline-none cursor-pointer focus:border-blue-500"
          >
            <option value="">All Topics</option>
            <option value="Office">Office</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="Personnel">Personnel</option>
            <option value="Travel">Travel</option>
          </select>

          <select
            data-testid="difficulty-select"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-300 outline-none cursor-pointer focus:border-blue-500"
          >
            <option value="">All Aim Levels</option>
            <option value="easy">Aim 450+ (Easy)</option>
            <option value="medium">Aim 650+ (Medium)</option>
            <option value="hard">Aim 800+ (Hard)</option>
          </select>

          <select
            data-testid="progress-select"
            value={selectedProgress}
            onChange={(e) => setSelectedProgress(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-300 outline-none cursor-pointer focus:border-blue-500"
          >
            <option value="">All Progress Status</option>
            <option value="new">New</option>
            <option value="learning">Learning</option>
            <option value="mastered">Mastered</option>
          </select>

          <button
            data-testid="clear-filters-btn"
            onClick={() => {
              setSearchQuery('');
              setSelectedTopic('');
              setSelectedDifficulty('');
              setSelectedProgress('');
            }}
            className="py-3 px-5 bg-slate-900 border border-slate-700 hover:bg-slate-950 text-slate-300 rounded-xl text-sm font-semibold flex items-center gap-2 cursor-pointer transition-colors"
          >
            Clear
          </button>

          <button
            data-testid="reset-progress-btn"
            onClick={() => {
              setResetError(false);
              setShowResetConfirm(true);
            }}
            className="py-3 px-5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-rose-500/10 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>

          <button
            data-testid="add-word-btn"
            onClick={() => setShowAddWordModal(true)}
            className="py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/10 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Word
          </button>
        </div>
      </div>

      {/* List dictionary words grid */}
      {renderedLibraryList}

      {/* Custom reset confirmation modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl max-w-sm w-full p-6 space-y-6 shadow-2xl relative text-center">
            <h3 className="text-lg font-bold">Reset Progress?</h3>
            <p className="text-sm text-slate-400">This will clear all streaks and learning stats. Custom words will be retained.</p>
            {resetError && (
              <p data-testid="reset-failed-warning" className="text-rose-400 text-xs">
                Reset failed. Storage quota exceeded.
              </p>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 px-4 bg-slate-900 hover:bg-slate-950 text-slate-300 font-semibold rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                data-testid="confirm-reset-btn"
                onClick={() => {
                  const success = resetProgress();
                  if (success) {
                    setResetError(false);
                    setShowResetConfirm(false);
                    localStorage.removeItem('toeic-grammar-progress');
                    setGrammarProgress({});
                    setIsReviewMode(false);
                    setStarredOnly(false);
                    if (location.pathname.startsWith('/grammar/')) {
                      navigate('/grammar');
                    }
                  } else {
                    setResetError(true);
                  }
                }}
                className="flex-1 py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-lg transition-all cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Word modal dialog form */}
      {showAddWordModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <button
              data-testid="form-close-btn"
              onClick={handleCancelAddWord}
              className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-200 cursor-pointer rounded-lg hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Plus className="w-6 h-6 text-blue-400" />
              Add Custom Vocabulary
            </h3>

            {formError && (
              <div
                data-testid="form-error-message"
                className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-xs font-semibold flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {formError}
              </div>
            )}

            <form onSubmit={handleAddWordSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Word</label>
                  <input
                    data-testid="form-word"
                    type="text"
                    required
                    value={formWord}
                    onChange={(e) => setFormWord(e.target.value)}
                    placeholder="e.g. synergy"
                    className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 focus:border-blue-500 rounded-xl text-slate-200 outline-none text-sm transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Part of Speech</label>
                  <select
                    data-testid="form-pos"
                    value={formPos}
                    onChange={(e) => setFormPos(e.target.value as 'noun' | 'verb' | 'adjective' | 'adverb')}
                    className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 focus:border-blue-500 rounded-xl text-slate-200 outline-none text-sm cursor-pointer transition-all"
                  >
                    <option value="noun">Noun</option>
                    <option value="verb">Verb</option>
                    <option value="adjective">Adjective</option>
                    <option value="adverb">Adverb</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">IPA Phonetics</label>
                  <input
                    data-testid="form-ipa"
                    type="text"
                    value={formIpa}
                    onChange={(e) => setFormIpa(e.target.value)}
                    placeholder="e.g. /ˈsɪn.ə.dʒi/"
                    className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 focus:border-blue-500 rounded-xl text-slate-200 outline-none text-sm transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Topic</label>
                  <select
                    data-testid="form-topic"
                    value={formTopic}
                    onChange={(e) => setFormTopic(e.target.value as 'Office' | 'Marketing' | 'Finance' | 'Personnel' | 'Travel')}
                    className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 focus:border-blue-500 rounded-xl text-slate-200 outline-none text-sm cursor-pointer transition-all"
                  >
                    <option value="Office">Office</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="Personnel">Personnel</option>
                    <option value="Travel">Travel</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Definition</label>
                <input
                  data-testid="form-definition"
                  type="text"
                  required
                  value={formDefinition}
                  onChange={(e) => setFormDefinition(e.target.value)}
                  placeholder="e.g. Combined action or operation"
                  className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 focus:border-blue-500 rounded-xl text-slate-200 outline-none text-sm transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Example Sentence</label>
                  <input
                    data-testid="form-example"
                    type="text"
                    value={formExample}
                    onChange={(e) => setFormExample(e.target.value)}
                    placeholder="e.g. Teamwork creates synergy."
                    className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 focus:border-blue-500 rounded-xl text-slate-200 outline-none text-sm transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Example Translation</label>
                  <input
                    data-testid="form-translation"
                    type="text"
                    value={formTranslation}
                    onChange={(e) => setFormTranslation(e.target.value)}
                    placeholder="e.g. Sự cộng tác"
                    className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 focus:border-blue-500 rounded-xl text-slate-200 outline-none text-sm transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Synonyms (Từ đồng nghĩa - Cách nhau bằng dấu phẩy)</label>
                  <input
                    data-testid="form-synonyms"
                    type="text"
                    value={formSynonyms}
                    onChange={(e) => setFormSynonyms(e.target.value)}
                    placeholder="e.g. coworker, associate, teammate"
                    className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 focus:border-blue-500 rounded-xl text-slate-200 outline-none text-sm transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Difficulty Level</label>
                <select
                  data-testid="form-difficulty"
                  value={formDifficulty}
                  onChange={(e) => setFormDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                  className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 focus:border-blue-500 rounded-xl text-slate-200 outline-none text-sm cursor-pointer transition-all"
                >
                  <option value="easy">Aim 450+ (Easy)</option>
                  <option value="medium">Aim 650+ (Medium)</option>
                  <option value="hard">Aim 800+ (Hard)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCancelAddWord}
                  className="flex-1 py-3 px-4 bg-slate-900 hover:bg-slate-950 text-slate-300 font-semibold rounded-xl transition-all cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  data-testid="form-submit-btn"
                  className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all cursor-pointer text-center"
                >
                  Submit Word
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
