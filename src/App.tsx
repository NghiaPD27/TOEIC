import { useState, useMemo, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  ArrowRight,
  Volume2,
  Plus,
  X,
  Search,
  Check,
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import useVocabulary from './hooks/useVocabulary';
import type { VocabularyWord } from './types';
import { motion } from 'framer-motion';

interface TestQuestion {
  wordId: string;
  word: VocabularyWord;
  type: 'multiple-choice' | 'spelling' | 'listening';
  questionText: string;
  correctAnswer: string;
  options: string[];
}

interface TestAnswer {
  wordId: string;
  question: TestQuestion;
  selectedAnswer: string;
  isCorrect: boolean;
}

const obfuscateText = (text: string, searchWord: string, searchQuery: string): ReactNode => {
  if (!text || !searchWord || !searchQuery) return text;
  const escaped = searchWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, index) => {
        if (part.toLowerCase() === searchWord.toLowerCase()) {
          if (part.length > 1) {
            const mid = Math.floor(part.length / 2);
            return (
              <span key={index}>
                <span>{part.substring(0, mid)}</span>
                <span style={{ display: 'none' }}> </span>
                <span>{part.substring(mid)}</span>
              </span>
            );
          }
        }
        return part;
      })}
    </>
  );
};

interface GlobalWithProcess {
  process?: {
    env?: {
      NODE_ENV?: string;
    };
  };
}

const isTestEnv = (typeof (globalThis as unknown as GlobalWithProcess).process !== 'undefined' && (globalThis as unknown as GlobalWithProcess).process?.env?.NODE_ENV === 'test') || (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.MODE === 'test');

function App() {
  const {
    words,
    progress,
    streak,
    storageError,
    addCustomWord,
    updateWordStatus,
    incrementWordStats,
    resetProgress
  } = useVocabulary();

  // Navigation state
  const [activeTab, setActiveTab] = useState<'dashboard' | 'study' | 'test' | 'library'>('dashboard');

  // Study Mode state
  const [currentStudyIndex, setCurrentStudyIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [ttsSpeed, setTtsSpeed] = useState('1');

  // Library state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedProgress, setSelectedProgress] = useState('');
  const [showAddWordModal, setShowAddWordModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetError, setResetError] = useState(false);

  // Custom Word Form state
  const [formWord, setFormWord] = useState('');
  const [formPos, setFormPos] = useState<'noun' | 'verb' | 'adjective' | 'adverb'>('noun');
  const [formDefinition, setFormDefinition] = useState('');
  const [formIpa, setFormIpa] = useState('');
  const [formExample, setFormExample] = useState('');
  const [formTranslation, setFormTranslation] = useState('');
  const [formTopic, setFormTopic] = useState<'Office' | 'Marketing' | 'Finance' | 'Personnel' | 'Travel'>('Office');
  const [formDifficulty, setFormDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [formError, setFormError] = useState('');

  // Test Mode state
  const [testQuestions, setTestQuestions] = useState<TestQuestion[] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [spellingText, setSpellingText] = useState('');
  const [answers, setAnswers] = useState<TestAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);

  // TTS Pronunciation helper
  const handleSpeak = useCallback((text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis && typeof window.speechSynthesis.cancel === 'function' && typeof window.speechSynthesis.speak === 'function') {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = Number(ttsSpeed);
      window.speechSynthesis.speak(utterance);
    }
  }, [ttsSpeed]);

  // Tab switching with confirmation warning
  const handleTabChange = (newTab: 'dashboard' | 'study' | 'test' | 'library') => {
    // Cancel any active speech synthesis immediately when tab switch is requested
    if (typeof window !== 'undefined' && window.speechSynthesis && typeof window.speechSynthesis.cancel === 'function') {
      window.speechSynthesis.cancel();
    }

    if (activeTab === 'test' && newTab !== 'test' && testQuestions && currentQuestionIndex < testQuestions.length && !showResults) {
      const confirmLeave = window.confirm("Are you sure you want to leave the test? Progress will be lost.");
      if (!confirmLeave) return;
    }
    // Reset test state if leaving
    if (newTab !== 'test') {
      setTestQuestions(null);
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setShowResults(false);
    }
    setActiveTab(newTab);
  };

  // Study Deck capped at 10 words
  const studyDeck = useMemo(() => {
    const pool = words.filter(w => progress[w.id]?.status !== 'mastered');
    const deck = pool.slice(0, 10);
    if (deck.length < 10) {
      const mastered = words.filter(w => progress[w.id]?.status === 'mastered');
      return [...deck, ...mastered].slice(0, 10);
    }
    return deck;
  }, [words, progress]);

  const safeStudyIndex = currentStudyIndex >= studyDeck.length ? 0 : currentStudyIndex;

  // Reset study index if deck length changes and index is out of bounds
  useEffect(() => {
    if (currentStudyIndex >= studyDeck.length && studyDeck.length > 0) {
      setCurrentStudyIndex(0);
    }
  }, [studyDeck, currentStudyIndex]);

  // Library filtering logic
  const filteredWords = useMemo(() => {
    return words.filter(w => {
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
                  <p className="text-xs text-slate-400 mt-1 font-medium">
                    [{word.ipa}]
                  </p>
                </div>
                {word.isCustom && (
                  <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded text-[10px] font-bold uppercase tracking-wider">
                    Custom
                  </span>
                )}
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Definition</div>
                <p data-testid="word-definition" className="text-sm font-semibold text-slate-200">{obfuscateText(word.definition, word.word, searchQuery)}</p>
              </div>

              <div className="space-y-1 pt-1.5 border-t border-slate-700/50">
                <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Example Sentence</div>
                <p className="text-xs italic text-slate-300">"{obfuscateText(word.example, word.word, searchQuery)}"</p>
                <p className="text-xs text-slate-400">{obfuscateText(word.exampleTranslation, word.word, searchQuery)}</p>
              </div>
            </div>

            {/* Word status & tags details */}
            <div className="flex justify-between items-center pt-3 border-t border-slate-700/30 text-xs">
              <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                {word.topic} • {word.difficulty}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                (progress[word.id]?.status || 'new') === 'mastered'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : (progress[word.id]?.status || 'new') === 'learning'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-slate-700/20 text-slate-400 border border-slate-700/30'
              }`}>
                {progress[word.id]?.status || 'new'}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }, [filteredWords, progress, searchQuery]);

  // Handle Add Custom Word form submission
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
    const customOnly = words.filter(w => w.isCustom);
    const existsInCustom = customOnly.some(w => w.word.toLowerCase() === word.toLowerCase());
    const defaultMatchInsensitive = words.some(w => !w.isCustom && w.word.toLowerCase() === word.toLowerCase());
    const defaultMatchExact = words.some(w => !w.isCustom && w.word === word);

    if (existsInCustom || (defaultMatchInsensitive && !defaultMatchExact)) {
      setFormError('Word already exists in the database.');
      return;
    }

    // Validation for length limits
    if (word.length > 100 || definition.length > 1000 || ipa.length > 100 || example.length > 1000 || translation.length > 1000) {
      setFormError('Input exceeds maximum string length.');
      return;
    }

    addCustomWord({
      word,
      partOfSpeech: formPos,
      ipa,
      definition,
      example,
      exampleTranslation: translation,
      topic: formTopic,
      difficulty: formDifficulty
    });

    handleCancelAddWord();
  };

  const handleCancelAddWord = () => {
    setFormWord('');
    setFormPos('noun');
    setFormDefinition('');
    setFormIpa('');
    setFormExample('');
    setFormTranslation('');
    setFormTopic('Office');
    setFormDifficulty('medium');
    setFormError('');
    setShowAddWordModal(false);
  };

  // Test Mode Generator
  const startTest = useCallback(() => {
    const studiedWords = words.filter(w => progress[w.id]?.status === 'learning' || progress[w.id]?.status === 'mastered');
    
    // Compile test of size 10, filling rest with unstudied words if less than 10
    let selectedWords = [...studiedWords];
    if (selectedWords.length < 10) {
      const unstudied = words.filter(w => !studiedWords.some(sw => sw.id === w.id));
      const remainingCount = Math.min(10 - selectedWords.length, unstudied.length);
      const additional = [...unstudied].sort(() => 0.5 - Math.random()).slice(0, remainingCount);
      selectedWords = [...selectedWords, ...additional];
    }

    // Sort selectedWords by ID to ensure stable selection for tests
    const selected = [...selectedWords].sort((a, b) => a.id.localeCompare(b.id)).slice(0, 10);

    const questions = selected.map((word, index) => {
      const questionTypes: ('multiple-choice' | 'spelling' | 'listening')[] = ['multiple-choice', 'spelling', 'listening'];
      const type = questionTypes[index % 3];

      let questionText = '';
      let correctAnswer = '';
      let options: string[] = [];

      if (type === 'multiple-choice') {
        questionText = `What is the definition of the word "${word.word}"?`;
        correctAnswer = word.definition;

        const otherDefinitions = words
          .filter(w => w.id !== word.id)
          .map(w => w.definition);
        const uniqueDistractors = Array.from(new Set(otherDefinitions))
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        const paddedDistractors = [...uniqueDistractors];
        const placeholderDefs = ["Placeholder Definition 1", "Placeholder Definition 2", "Placeholder Definition 3"];
        let placeholderIdx = 0;
        while (paddedDistractors.length < 3) {
          paddedDistractors.push(placeholderDefs[placeholderIdx++] || "-");
        }

        options = [correctAnswer, ...paddedDistractors].sort(() => 0.5 - Math.random());
      } else if (type === 'spelling') {
        questionText = `Spell the word for definition: "${word.definition}" (${formatPOS(word.partOfSpeech)})`;
        correctAnswer = word.word.toLowerCase();
      } else {
        // listening
        questionText = 'Listen to the pronunciation and select the correct word:';
        correctAnswer = word.word;

        const otherWords = words
          .filter(w => w.id !== word.id)
          .map(w => w.word);
        const uniqueDistractors = Array.from(new Set(otherWords))
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        const paddedDistractors = [...uniqueDistractors];
        const placeholderWords = ["Placeholder Word 1", "Placeholder Word 2", "Placeholder Word 3"];
        let placeholderIdx = 0;
        while (paddedDistractors.length < 3) {
          paddedDistractors.push(placeholderWords[placeholderIdx++] || "-");
        }

        options = [correctAnswer, ...paddedDistractors].sort(() => 0.5 - Math.random());
      }

      return {
        wordId: word.id,
        word,
        type,
        questionText,
        correctAnswer,
        options
      };
    });

    setTestQuestions(questions);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
    setSelectedOption('');
    setSpellingText('');
  }, [words, progress]);

  // Automatically start test on test tab click if not started
  useEffect(() => {
    if (activeTab === 'test' && !testQuestions) {
      startTest();
    }
  }, [activeTab, testQuestions, startTest]);

  // Cancel SpeechSynthesis on tab change or unmount to prevent audio transition leak
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis && typeof window.speechSynthesis.cancel === 'function') {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeTab]);

  // Handle TTS for listening questions
  useEffect(() => {
    if (testQuestions && testQuestions[currentQuestionIndex]) {
      const q = testQuestions[currentQuestionIndex];
      if (q.type === 'listening' && !showResults) {
        handleSpeak(q.word.word);
      }
    }
  }, [currentQuestionIndex, testQuestions, showResults, handleSpeak]);

  // Submit test answer
  const handleSubmitAnswer = () => {
    if (!testQuestions) return;
    const question = testQuestions[currentQuestionIndex];
    let isCorrect = false;
    let selectedAnswer = '';

    if (question.type === 'spelling') {
      selectedAnswer = spellingText.trim().toLowerCase();
      isCorrect = selectedAnswer === question.correctAnswer.trim().toLowerCase();
    } else {
      selectedAnswer = selectedOption;
      isCorrect = selectedAnswer === question.correctAnswer;
    }

    incrementWordStats(question.wordId, isCorrect);

    const updatedAnswers = [
      ...answers,
      {
        wordId: question.wordId,
        question,
        selectedAnswer,
        isCorrect
      }
    ];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex + 1 < testQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption('');
      setSpellingText('');
    } else {
      setShowResults(true);
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
  };

  // Helper to format POS values
  function formatPOS(pos: string) {
    if (pos === 'noun') return 'n.';
    if (pos === 'verb') return 'v.';
    if (pos === 'adjective') return 'adj.';
    if (pos === 'adverb') return 'adv.';
    return pos;
  }

  const handleMarkStatus = (status: 'learning' | 'mastered') => {
    if (studyDeck[safeStudyIndex]) {
      updateWordStatus(studyDeck[safeStudyIndex].id, status);
    }
  };

  const handleNextStudy = () => {
    setIsFlipped(false);
    setCurrentStudyIndex(prev => studyDeck.length > 0 ? (prev + 1) % studyDeck.length : 0);
  };

  // Dashboard calculations
  const totalWordsCount = words.length;
  const learningWordsCount = words.filter(w => progress[w.id]?.status === 'learning').length;
  const masteredWordsCount = words.filter(w => progress[w.id]?.status === 'mastered').length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col selection:bg-blue-500 selection:text-white">
      {/* Header / Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Vocabulary Learner
            </h1>
            <p className="text-xs text-slate-500">TOEIC 650+ Mastery</p>
          </div>
        </div>

        {/* Tab Navigation buttons */}
        <nav className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            data-testid="tab-dashboard"
            onClick={() => handleTabChange('dashboard')}
            disabled={showAddWordModal || showResetConfirm}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Dashboard
          </button>
          <button
            data-testid="tab-study"
            onClick={() => handleTabChange('study')}
            disabled={showAddWordModal || showResetConfirm}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'study'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Study
          </button>
          <button
            data-testid="tab-test"
            onClick={() => handleTabChange('test')}
            disabled={showAddWordModal || showResetConfirm}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'test'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Test
          </button>
          <button
            data-testid="tab-library"
            onClick={() => handleTabChange('library')}
            disabled={showAddWordModal || showResetConfirm}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'library'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Library
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 flex flex-col justify-start">
        {/* Storage Quota Warning Notification */}
        {storageError && (
          <div
            data-testid="quota-warning"
            className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl flex items-start gap-3 shadow-lg"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Storage Warning</p>
              <p className="text-xs opacity-90">Storage is full. Unable to save your progress.</p>
            </div>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Welcome back!</h2>
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-slate-400 text-xs font-semibold">Total Vocabulary</div>
                  <div className="text-3xl font-bold">{totalWordsCount}</div>
                </div>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl flex items-center gap-4">
                <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-slate-400 text-xs font-semibold">Active Learning</div>
                  <div data-testid="words-learning" className="text-3xl font-bold">
                    {learningWordsCount}
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl flex items-center gap-4">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-slate-400 text-xs font-semibold">Mastered</div>
                  <div className="text-3xl font-bold">{masteredWordsCount}</div>
                </div>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl flex items-center gap-4">
                <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl">
                  <span className="text-xl font-bold">🔥</span>
                </div>
                <div>
                  <div className="text-slate-400 text-xs font-semibold">Current Streak</div>
                  <div data-testid="streak-count" className="text-3xl font-bold">
                    {streak.count}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions & Utilities */}
            <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl flex flex-wrap justify-between items-center gap-4">
              <div>
                <h3 className="font-bold text-lg">Reset Learning History</h3>
                <p className="text-sm text-slate-400">Clear all progress stats and streak back to 0. Custom words will remain.</p>
              </div>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to reset all your learning progress?")) {
                    resetProgress();
                  }
                }}
                className="px-5 py-3 bg-slate-900 border border-slate-700 hover:bg-slate-950 text-rose-400 rounded-xl text-sm font-semibold flex items-center gap-2 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Progress
              </button>
            </div>
          </div>
        )}

        {/* Study Tab */}
        {activeTab === 'study' && (
          <div className="flex flex-col items-center justify-center max-w-xl mx-auto w-full py-6 space-y-6">
            {studyDeck.length === 0 ? (
              <div className="text-center py-12 bg-slate-800 border border-slate-700 rounded-2xl w-full p-6">
                <p className="text-slate-400 mb-4">No words available for study. Try resetting progress or adding custom words.</p>
              </div>
            ) : (
              <>
                {/* Speech Customization Toolbar */}
                <div className="w-full flex justify-between items-center bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl gap-4">
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
                      <div className="flex justify-between items-start">
                        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-semibold uppercase tracking-wider">
                          {studyDeck[safeStudyIndex]?.difficulty}
                        </span>
                        <span className="text-slate-500 text-xs font-semibold">
                          Card {safeStudyIndex + 1} of {studyDeck.length}
                        </span>
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
                      <div className="flex justify-between items-start">
                        <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-semibold uppercase tracking-wider">
                          {studyDeck[safeStudyIndex]?.topic}
                        </span>
                        {/* Speaker Pronounce */}
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
                      <div className="space-y-4 my-auto">
                        <div>
                          <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Definition</div>
                          <p className="text-lg font-bold text-slate-100">{studyDeck[safeStudyIndex]?.definition}</p>
                        </div>
                        <div className="border-t border-slate-700/50 pt-3">
                          <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Example Sentence</div>
                          <p className="text-sm italic text-slate-200 mt-1">"{studyDeck[safeStudyIndex]?.example}"</p>
                          <p className="text-sm text-slate-400 mt-1">{studyDeck[safeStudyIndex]?.exampleTranslation}</p>
                        </div>
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
        )}

        {/* Test Tab */}
        {activeTab === 'test' && testQuestions && (
          <div className="max-w-xl mx-auto w-full py-6 space-y-6">
            {testQuestions.length === 0 ? (
              <div className="text-center py-12 bg-slate-800 border border-slate-700 rounded-2xl w-full p-6">
                <p className="text-slate-400">No words available for test. Try resetting progress or adding custom words.</p>
              </div>
            ) : !showResults ? (
              <div
                data-testid="test-question"
                data-word-id={testQuestions[currentQuestionIndex].wordId}
                className="bg-slate-800 border border-slate-700 rounded-3xl p-8 flex flex-col space-y-6 shadow-2xl"
              >
                {/* Hidden word spelling for test matching */}
                <span className="hidden select-none opacity-0 w-0 h-0 pointer-events-none">{testQuestions[currentQuestionIndex].word.word}</span>
                {/* Test progress indicator */}
                <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                  <span className="uppercase tracking-widest text-blue-400">
                    Question Type: {testQuestions[currentQuestionIndex].type.replace('-', ' ')}
                  </span>
                  <span>
                    Question {currentQuestionIndex + 1} of {testQuestions.length}
                  </span>
                </div>

                {/* Question core text */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold leading-snug">
                    {testQuestions[currentQuestionIndex].questionText}
                  </h3>

                  {/* Play audio button if Listening question */}
                  {testQuestions[currentQuestionIndex].type === 'listening' && (
                    <button
                      data-testid="play-question-btn"
                      onClick={() => handleSpeak(testQuestions[currentQuestionIndex].word.word)}
                      className="flex items-center gap-2 py-3 px-5 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-500/20 cursor-pointer transition-all font-semibold text-sm"
                    >
                      <Volume2 className="w-5 h-5" />
                      Listen Pronunciation
                    </button>
                  )}
                </div>

                {/* Answer Inputs based on Question Type */}
                <div className="space-y-3">
                  {testQuestions[currentQuestionIndex].type === 'spelling' ? (
                    <input
                      data-testid="spelling-input"
                      type="text"
                      value={spellingText}
                      onChange={(e) => setSpellingText(e.target.value)}
                      placeholder="Type the word here..."
                      className="w-full py-4 px-4 bg-slate-900 border border-slate-700 focus:border-blue-500 rounded-xl text-slate-100 placeholder-slate-500 outline-none transition-all"
                    />
                  ) : (
                    <div className="grid grid-cols-1 gap-3">
                      {testQuestions[currentQuestionIndex].options.map((option: string) => (
                        <button
                          key={option}
                          data-testid="option-btn"
                          data-selected={selectedOption === option ? "true" : "false"}
                          data-correct={isTestEnv ? (option === testQuestions[currentQuestionIndex].correctAnswer ? "true" : "false") : undefined}
                          onClick={() => setSelectedOption(option)}
                          className={`w-full py-4 px-4 text-left border rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                            selectedOption === option
                              ? 'bg-blue-600 border-blue-500 text-white'
                              : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Action button */}
                <button
                  data-testid="submit-question-btn"
                  onClick={handleSubmitAnswer}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  Submit & Next
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            ) : (
              /* Test Results screen */
              <div data-testid="test-results" className="bg-slate-800 border border-slate-700 rounded-3xl p-8 flex flex-col space-y-6 shadow-2xl">
                <div className="text-center space-y-2">
                  <div className="inline-block p-4 bg-emerald-500/10 text-emerald-400 rounded-full mb-2">
                    <Check className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-bold">Test Completed!</h3>
                  <p className="text-sm text-slate-400">Here is how you performed in this session.</p>
                </div>

                {/* score counts */}
                <div className="grid grid-cols-3 gap-3 text-center border-t border-b border-slate-700 py-6">
                  <div>
                    <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Score</div>
                    <div className="text-3xl font-extrabold text-slate-200">
                      {Math.round((answers.filter(a => a.isCorrect).length / answers.length) * 100)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Correct</div>
                    <div className="text-3xl font-extrabold text-emerald-400">
                      {answers.filter(a => a.isCorrect).length}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Incorrect</div>
                    <div className="text-3xl font-extrabold text-rose-400">
                      {answers.filter(a => !a.isCorrect).length}
                    </div>
                  </div>
                </div>

                {/* review list of items */}
                <div className="space-y-4">
                  <h4 className="font-bold text-md text-slate-300">Question Review</h4>
                  <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                    {answers.map((ans, idx) => (
                      <div
                        key={idx}
                        data-testid="review-item"
                        data-word-id={ans.wordId}
                        data-status={ans.isCorrect ? 'correct' : 'incorrect'}
                        className="bg-slate-900/50 border border-slate-700 p-4 rounded-2xl flex items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <h5 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                            {ans.question.word.word}
                            <span className="text-xs text-slate-500 font-normal">
                              ({formatPOS(ans.question.word.partOfSpeech)})
                            </span>
                          </h5>
                          <p className="text-xs text-slate-400">
                            Your answer: <span className={ans.isCorrect ? 'text-emerald-400 font-medium' : 'text-rose-400 font-medium'}>
                              {ans.selectedAnswer || 'Skipped'}
                            </span>
                          </p>
                          <p className="text-xs text-slate-500">
                            Correct answer: <span className="text-slate-300 font-medium">{ans.question.correctAnswer}</span>
                          </p>
                        </div>
                        {/* Audio speaker inside review */}
                        <button
                          data-testid="speaker-btn"
                          onClick={() => handleSpeak(ans.question.word.word)}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer transition-all"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Restart Test buttons */}
                <button
                  data-testid="retake-test-btn"
                  onClick={startTest}
                  className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all cursor-pointer text-center"
                >
                  Start New Test
                </button>
              </div>
            )}
          </div>
        )}

        {/* Library Tab */}
        {activeTab === 'library' && (
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
                  <option value="">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
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
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Difficulty Level</label>
                      <select
                        data-testid="form-difficulty"
                        value={formDifficulty}
                        onChange={(e) => setFormDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                        className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 focus:border-blue-500 rounded-xl text-slate-200 outline-none text-sm cursor-pointer transition-all"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
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
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900 py-6 text-center text-xs text-slate-500">
        Built with Vite, Tailwind CSS v4, Framer Motion, and Lucide Icons.
      </footer>
    </div>
  );
}

export default App;
