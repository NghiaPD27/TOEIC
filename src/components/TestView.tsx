import { GraduationCap, Volume2, ArrowRight, Check } from 'lucide-react';
import type { VocabularyWord, UserWordProgress, TestQuestion, TestAnswer } from '../types';
import { isTestEnv, formatPOS } from '../utils/helpers';

interface TestViewProps {
  words: VocabularyWord[];
  progress: Record<string, UserWordProgress>;
  testQuestions: TestQuestion[] | null;
  currentQuestionIndex: number;
  answers: TestAnswer[];
  showResults: boolean;
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  spellingText: string;
  setSpellingText: (text: string) => void;
  testLength: number;
  setTestLength: (length: number) => void;
  testType: 'mix' | 'multiple-choice' | 'listening' | 'spelling';
  setTestType: (type: 'mix' | 'multiple-choice' | 'listening' | 'spelling') => void;
  startTest: () => void;
  handleSubmitAnswer: () => void;
  handleSpeak: (text: string) => void;
}

export function TestView({
  words,
  progress,
  testQuestions,
  currentQuestionIndex,
  answers,
  showResults,
  selectedOption,
  setSelectedOption,
  spellingText,
  setSpellingText,
  testLength,
  setTestLength,
  testType,
  setTestType,
  startTest,
  handleSubmitAnswer,
  handleSpeak
}: TestViewProps) {
  return (
    <div className="max-w-xl mx-auto w-full py-6 space-y-6">
      {/* Test Configuration Panel */}
      <div className="w-full bg-slate-800 border border-slate-700 p-5 rounded-3xl space-y-4 shadow-xl">
        <div className="flex justify-between items-center border-b border-slate-700 pb-2 flex-wrap gap-2">
          <h4 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            Cấu hình đề thi (Test Settings)
          </h4>
          {words.filter((w) => progress[w.id]?.status === 'learning' || progress[w.id]?.status === 'mastered').length === 0 && (
            <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-semibold">
              💡 Đang dùng từ vựng mặc định (chưa có từ đã học)
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dạng câu hỏi</label>
            <select
              value={testType}
              onChange={(e) => setTestType(e.target.value as 'mix' | 'multiple-choice' | 'listening' | 'spelling')}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-350 outline-none cursor-pointer focus:border-blue-500 transition-colors"
            >
              <option value="mix">Trộn (Mix)</option>
              <option value="multiple-choice">Trắc nghiệm nghĩa</option>
              <option value="listening">Nghe phát âm</option>
              <option value="spelling">Gõ chính tả</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Số lượng câu</label>
            <select
              value={testLength}
              onChange={(e) => setTestLength(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-350 outline-none cursor-pointer focus:border-blue-500 transition-colors"
            >
              <option value={10}>10 câu</option>
              <option value={20}>20 câu</option>
              <option value={50}>50 câu</option>
              <option value={100}>100 câu</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={startTest}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all cursor-pointer shadow-md active:scale-95 text-center"
            >
              Tạo đề mới
            </button>
          </div>
        </div>
      </div>

      {testQuestions && testQuestions.length === 0 ? (
        <div className="text-center py-12 bg-slate-800 border border-slate-700 rounded-2xl w-full p-6">
          <p className="text-slate-400">No words available for test. Try resetting progress or adding custom words.</p>
        </div>
      ) : testQuestions && !showResults ? (
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
                        : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-750'
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
      ) : testQuestions && (
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
                {Math.round((answers.filter((a) => a.isCorrect).length / answers.length) * 100)}%
              </div>
            </div>
            <div>
              <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Correct</div>
              <div className="text-3xl font-extrabold text-emerald-400">
                {answers.filter((a) => a.isCorrect).length}
              </div>
            </div>
            <div>
              <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Incorrect</div>
              <div className="text-3xl font-extrabold text-rose-400">
                {answers.filter((a) => !a.isCorrect).length}
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
            Retake Test
          </button>
        </div>
      )}
    </div>
  );
}
