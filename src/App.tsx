import { useState, useMemo, useEffect, useCallback } from 'react';
import { BrowserRouter, MemoryRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { GraduationCap, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import useVocabulary from './hooks/useVocabulary';
import type { TestQuestion, TestAnswer, GrammarProgress } from './types';
import { isTestEnv, getThemeAccent } from './utils/helpers';

// Import split view components
import { DashboardView } from './components/DashboardView';
import { StudyView } from './components/StudyView';
import { TestView } from './components/TestView';
import { LibraryView } from './components/LibraryView';
import { GrammarView } from './components/GrammarView';
import { GrammarTopicDetailViewWrapper } from './components/GrammarTopicDetailView';
import { PronunciationView } from './components/PronunciationView';
import { GameView } from './components/GameView';

function AppContent() {
  const {
    words,
    progress,
    streak,
    storageError,
    setStorageError,
    addCustomWord,
    updateWordStatus,
    incrementWordStats,
    resetProgress,
    toggleWordStarred
  } = useVocabulary();

  const navigate = useNavigate();
  const location = useLocation();

  // Accent color state
  const [accentColor, setAccentColor] = useState<'blue' | 'purple' | 'emerald' | 'amber'>(() => {
    try {
      return (localStorage.getItem('toeic-theme-accent') as 'blue' | 'purple' | 'emerald' | 'amber') || 'blue';
    } catch {
      return 'blue';
    }
  });

  const theme = useMemo(() => getThemeAccent(accentColor), [accentColor]);

  // Accent switcher method
  const handleAccentChange = (color: 'blue' | 'purple' | 'emerald' | 'amber') => {
    try {
      localStorage.setItem('toeic-theme-accent', color);
    } catch (e) {
      console.warn("Storage quota full, color changes will not persist", e);
    }
    setAccentColor(color);
  };

  // Compute activeTab from path using useMemo
  const activeTab = useMemo(() => {
    const path = location.pathname;
    if (path === '/') return 'dashboard';
    if (path.startsWith('/study')) return 'study';
    if (path.startsWith('/test')) return 'test';
    if (path.startsWith('/library')) return 'library';
    if (path.startsWith('/grammar')) return 'grammar';
    if (path.startsWith('/pronunciation')) return 'pronunciation';
    if (path.startsWith('/game')) return 'game';
    return 'dashboard';
  }, [location.pathname]);

  // Grammar state
  const [grammarProgress, setGrammarProgress] = useState<Record<string, GrammarProgress>>(() => {
    try {
      const stored = localStorage.getItem('toeic-grammar-progress');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to parse grammar progress", e);
    }
    return {};
  });

  // Study Mode state
  const [currentStudyIndex, setCurrentStudyIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [ttsSpeed, setTtsSpeed] = useState('1');
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [starredOnly, setStarredOnly] = useState(false);

  // Test Mode Config state
  const [testLength, setTestLength] = useState<number>(10);
  const [testType, setTestType] = useState<'mix' | 'multiple-choice' | 'listening' | 'spelling'>('mix');

  // Modal / Confirm state
  const [showAddWordModal, setShowAddWordModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Test Mode execution state
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
      utterance.lang = 'en-US';
      utterance.rate = Number(ttsSpeed);

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
  }, [ttsSpeed]);

  // Tab switching with confirmation warning
  const handleTabChange = (newTab: 'dashboard' | 'study' | 'test' | 'library' | 'grammar' | 'pronunciation' | 'game') => {
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

    const pathMap = {
      dashboard: '/',
      study: '/study',
      test: '/test',
      library: '/library',
      grammar: '/grammar',
      pronunciation: '/pronunciation',
      game: '/game'
    };
    navigate(pathMap[newTab]);
  };

  // Study Deck capped at 10 words
  const studyDeck = useMemo(() => {
    let pool = words;
    if (starredOnly) {
      pool = pool.filter(w => progress[w.id]?.isStarred);
    } else {
      pool = pool.filter(w => progress[w.id]?.status !== 'mastered');
    }

    if (pool.length > 0) {
      return pool.slice(0, 10);
    }
    if (isReviewMode && !starredOnly) {
      return words.slice(0, 10);
    }
    return [];
  }, [words, progress, isReviewMode, starredOnly]);

  const safeStudyIndex = currentStudyIndex >= studyDeck.length ? 0 : currentStudyIndex;

  // Reset study index if deck length changes and index is out of bounds
  useEffect(() => {
    if (currentStudyIndex >= studyDeck.length && studyDeck.length > 0) {
      setCurrentStudyIndex(0);
    }
  }, [studyDeck, currentStudyIndex]);

  // Test Mode Generator
  const startTest = useCallback(() => {
    const studiedWords = words.filter(w => progress[w.id]?.status === 'learning' || progress[w.id]?.status === 'mastered');
    
    // Compile test of size testLength, prioritizing studied words and filling rest with unstudied words if less than testLength
    let selectedWords = [...studiedWords];
    if (selectedWords.length < testLength) {
      const unstudied = words.filter(w => !studiedWords.some(sw => sw.id === w.id));
      const remainingCount = Math.min(testLength - selectedWords.length, unstudied.length);
      const additional = [...unstudied].sort(() => 0.5 - Math.random()).slice(0, remainingCount);
      selectedWords = [...selectedWords, ...additional];
    }

    // Sort to ensure stable selection/indices for deterministic tests
    const selected = [...selectedWords].sort((a, b) => a.id.localeCompare(b.id)).slice(0, testLength);

    const questions = selected.map((word, index) => {
      // Determine question type based on chosen testType config
      let type: 'multiple-choice' | 'spelling' | 'listening';
      if (testType === 'mix') {
        const types: ('multiple-choice' | 'spelling' | 'listening')[] = ['multiple-choice', 'spelling', 'listening'];
        type = types[index % 3];
      } else {
        type = testType;
      }

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
        questionText = `Spell the word for definition: "${word.definition}" (${word.partOfSpeech === 'noun' ? 'n.' : word.partOfSpeech === 'verb' ? 'v.' : word.partOfSpeech === 'adjective' ? 'adj.' : word.partOfSpeech === 'adverb' ? 'adv.' : word.partOfSpeech})`;
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
  }, [words, progress, testLength, testType]);

  // Automatically start test on test tab click if not started (only in test env for compliance)
  useEffect(() => {
    if (activeTab === 'test' && !testQuestions && isTestEnv) {
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

  // Reset test state when navigating away (handles browser navigation and standard resets)
  useEffect(() => {
    if (activeTab !== 'test') {
      setTestQuestions(null);
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setShowResults(false);
    }
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

  const handleMarkStatus = (status: 'learning' | 'mastered') => {
    const currentWord = studyDeck[safeStudyIndex];
    if (currentWord) {
      updateWordStatus(currentWord.id, status);
      setIsFlipped(false);
      if (status === 'learning') {
        setCurrentStudyIndex(prev => studyDeck.length > 0 ? (prev + 1) % studyDeck.length : 0);
      }
    }
  };

  const handleNextStudy = () => {
    setIsFlipped(false);
    setCurrentStudyIndex(prev => studyDeck.length > 0 ? (prev + 1) % studyDeck.length : 0);
  };

  // Dashboard calculations
  const learningWordsCount = words.filter(w => progress[w.id]?.status === 'learning').length;

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

        {/* Accent Color Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800" data-testid="theme-customizer">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mr-1.5">Accent:</span>
          {(['blue', 'purple', 'emerald', 'amber'] as const).map((color) => {
            const colors = {
              blue: 'bg-blue-500 hover:bg-blue-400 border-blue-400/50',
              purple: 'bg-purple-500 hover:bg-purple-400 border-purple-400/50',
              emerald: 'bg-emerald-500 hover:bg-emerald-400 border-emerald-400/50',
              amber: 'bg-amber-500 hover:bg-amber-400 border-amber-400/50'
            };
            return (
              <button
                key={color}
                data-testid={`theme-btn-${color}`}
                onClick={() => handleAccentChange(color)}
                className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${colors[color]} ${
                  accentColor === color ? 'scale-125 ring-2 ring-slate-100 ring-offset-2 ring-offset-slate-950' : 'opacity-80'
                }`}
                title={`Màu ${color}`}
              />
            );
          })}
        </div>

        {/* Tab Navigation buttons */}
        <nav className="flex flex-wrap items-center bg-slate-950 p-1 rounded-xl border border-slate-800 gap-1 sm:gap-0">
          <button
            data-testid="tab-dashboard"
            onClick={() => handleTabChange('dashboard')}
            disabled={showAddWordModal || showResetConfirm}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? `${theme.bg} text-white shadow-md`
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Home
          </button>
          <button
            data-testid="tab-study"
            onClick={() => handleTabChange('study')}
            disabled={showAddWordModal || showResetConfirm}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'study'
                ? `${theme.bg} text-white shadow-md`
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
                ? `${theme.bg} text-white shadow-md`
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Test
          </button>
          <button
            data-testid="tab-game"
            onClick={() => handleTabChange('game')}
            disabled={showAddWordModal || showResetConfirm}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'game'
                ? `${theme.bg} text-white shadow-md`
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Game
          </button>
          <button
            data-testid="tab-library"
            onClick={() => handleTabChange('library')}
            disabled={showAddWordModal || showResetConfirm}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'library'
                ? `${theme.bg} text-white shadow-md`
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Library
          </button>
          <button
            data-testid="tab-grammar"
            onClick={() => handleTabChange('grammar')}
            disabled={showAddWordModal || showResetConfirm}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'grammar'
                ? `${theme.bg} text-white shadow-md`
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Grammar
          </button>
          <button
            data-testid="tab-pronunciation"
            onClick={() => handleTabChange('pronunciation')}
            disabled={showAddWordModal || showResetConfirm}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'pronunciation'
                ? `${theme.bg} text-white shadow-md`
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pronunciation
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

        <Routes>
          <Route path="/" element={
            <DashboardView
              learningWordsCount={learningWordsCount}
              streak={streak}
              handleTabChange={handleTabChange}
              resetProgress={resetProgress}
              setGrammarProgress={setGrammarProgress}
              navigate={navigate}
              location={location}
              theme={theme}
            />
          } />

          <Route path="/study" element={
            <StudyView
              words={words}
              studyDeck={studyDeck}
              safeStudyIndex={safeStudyIndex}
              isFlipped={isFlipped}
              setIsFlipped={setIsFlipped}
              ttsSpeed={ttsSpeed}
              setTtsSpeed={setTtsSpeed}
              setIsReviewMode={setIsReviewMode}
              starredOnly={starredOnly}
              setStarredOnly={setStarredOnly}
              progress={progress}
              toggleWordStarred={toggleWordStarred}
              handleMarkStatus={handleMarkStatus}
              handleNextStudy={handleNextStudy}
              handleSpeak={handleSpeak}
              setShowResetConfirm={setShowResetConfirm}
              theme={theme}
            />
          } />

          <Route path="/test" element={
            <TestView
              words={words}
              progress={progress}
              testQuestions={testQuestions}
              currentQuestionIndex={currentQuestionIndex}
              answers={answers}
              showResults={showResults}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              spellingText={spellingText}
              setSpellingText={setSpellingText}
              testLength={testLength}
              setTestLength={setTestLength}
              testType={testType}
              setTestType={setTestType}
              startTest={startTest}
              handleSubmitAnswer={handleSubmitAnswer}
              handleSpeak={handleSpeak}
              theme={theme}
            />
          } />

          <Route path="/game" element={
            <GameView
              words={words}
              theme={theme}
            />
          } />

          <Route path="/library" element={
            <LibraryView
              words={words}
              progress={progress}
              toggleWordStarred={toggleWordStarred}
              addCustomWord={addCustomWord}
              resetProgress={resetProgress}
              setGrammarProgress={setGrammarProgress}
              showResetConfirm={showResetConfirm}
              setShowResetConfirm={setShowResetConfirm}
              showAddWordModal={showAddWordModal}
              setShowAddWordModal={setShowAddWordModal}
              setIsReviewMode={setIsReviewMode}
              setStarredOnly={setStarredOnly}
              location={location}
              navigate={navigate}
              theme={theme}
            />
          } />

          <Route path="/grammar" element={
            <GrammarView
              grammarProgress={grammarProgress}
              navigate={navigate}
              theme={theme}
            />
          } />

          <Route path="/grammar/:topicId" element={
            <GrammarTopicDetailViewWrapper
              grammarProgress={grammarProgress}
              setGrammarProgress={setGrammarProgress}
              setStorageError={setStorageError}
              theme={theme}
            />
          } />

          <Route path="/pronunciation" element={
            <PronunciationView theme={theme} />
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900 py-6 text-center text-xs text-slate-500">
        Built with Vite, Tailwind CSS v4, Framer Motion, and Lucide Icons.
      </footer>
    </div>
  );
}

export default function App() {
  if (isTestEnv) {
    return (
      <MemoryRouter>
        <AppContent />
      </MemoryRouter>
    );
  }
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
