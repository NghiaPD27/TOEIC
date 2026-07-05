import { useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, AlertCircle, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { grammarTopics } from '../data/grammar';
import type { GrammarProgress } from '../types';
import type { AccentTheme } from '../utils/helpers';

interface Section {
  title: string;
  lines: string[];
}

interface FormattedGrammarContentProps {
  content: string;
}

function formatBoldText(text: string): ReactNode {
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return (
    <>
      {parts.map((part, idx) => {
        if (idx % 2 === 1) {
          return <strong key={idx} className="text-slate-100 font-bold">{part}</strong>;
        }
        return part;
      })}
    </>
  );
}

function parseSectionLines(lines: string[]): ReactNode[] {
  const renderedElements: ReactNode[] = [];
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i].trim();
    
    if (!line) {
      i++;
      continue;
    }

    // 1. Table support (starts with |)
    if (line.startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length > 0) {
        // Parse rows
        const rows = tableLines.map((row) =>
          row
            .split('|')
            .map((cell) => cell.trim())
            .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
        );

        if (rows.length > 0) {
          const headers = rows[0];
          const dataRows = rows.slice(2);

          renderedElements.push(
            <div key={`table-${i}`} className="my-5 overflow-x-auto border border-slate-700/60 rounded-2xl shadow-inner">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-750">
                    {headers.map((h, idx) => (
                      <th key={idx} className="p-3.5 font-extrabold text-slate-200 tracking-wide">
                        {formatBoldText(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {dataRows.map((r, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-900/40 transition-colors">
                      {r.map((cell, cIdx) => (
                        <td key={cIdx} className="p-3 text-slate-300 leading-relaxed font-medium">
                          {formatBoldText(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
      }
      continue;
    }

    // 2. Alert blocks (starts with > [!WARNING] or > [!NOTE])
    if (line.startsWith('>')) {
      const alertLines: string[] = [];
      let isWarning = false;
      let isNote = false;

      while (i < lines.length && lines[i].trim().startsWith('>')) {
        const rawLine = lines[i].trim();
        const cleaned = rawLine.substring(1).trim();

        if (cleaned.startsWith('[!WARNING]')) {
          isWarning = true;
        } else if (cleaned.startsWith('[!NOTE]')) {
          isNote = true;
        } else {
          alertLines.push(cleaned);
        }
        i++;
      }

      if (alertLines.length > 0) {
        renderedElements.push(
          <div
            key={`alert-${i}`}
            className={`my-4 p-4 border rounded-2xl flex gap-3 shadow-md ${
              isWarning
                ? 'bg-rose-500/5 border-rose-500/20 text-rose-350'
                : isNote
                  ? 'bg-indigo-500/5 border-indigo-500/20 text-indigo-350'
                  : 'bg-slate-900/50 border-slate-750 text-slate-300'
            }`}
          >
            <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
              isWarning ? 'text-rose-400' : 'text-indigo-400'
            }`} />
            <div className="space-y-1 text-xs md:text-sm leading-relaxed">
              {alertLines.map((al, idx) => (
                <p key={idx}>{formatBoldText(al)}</p>
              ))}
            </div>
          </div>
        );
      }
      continue;
    }

    // 3. Unordered list items (starts with - or *)
    if (line.startsWith('-') || line.startsWith('*')) {
      const listItems: string[] = [];
      while (i < lines.length && (lines[i].trim().startsWith('-') || lines[i].trim().startsWith('*'))) {
        const rawLine = lines[i].trim();
        listItems.push(rawLine.substring(1).trim());
        i++;
      }

      if (listItems.length > 0) {
        renderedElements.push(
          <ul key={`list-${i}`} className="list-disc pl-6 space-y-2 text-xs md:text-sm text-slate-350 leading-relaxed my-3 font-medium">
            {listItems.map((item, idx) => (
              <li key={idx} className="pl-1">
                {formatBoldText(item)}
              </li>
            ))}
          </ul>
        );
      }
      continue;
    }

    // 4. Practical examples block (starts with e.g. or Example:)
    if (line.toLowerCase().startsWith('e.g.') || line.toLowerCase().startsWith('example:')) {
      renderedElements.push(
        <div key={`example-${i}`} className="my-3 pl-4 border-l-4 border-slate-600 space-y-1">
          <p className="text-xs text-slate-450 uppercase font-bold tracking-wider">Ví dụ minh họa</p>
          <p className="text-xs md:text-sm text-slate-200 font-semibold italic">
            {formatBoldText(line)}
          </p>
        </div>
      );
      i++;
      continue;
    }

    // 5. Standard paragraph text (fallback)
    renderedElements.push(
      <p key={`para-${i}`} className="text-xs md:text-sm text-slate-350 leading-relaxed font-medium">
        {formatBoldText(line)}
      </p>
    );
    i++;
  }

  return renderedElements;
}

export function FormattedGrammarContent({ content }: FormattedGrammarContentProps) {
  // Parse grammar lesson theory block into sections based on "# " or "## " headers
  const sections = useMemo(() => {
    const rawLines = content.split('\n');
    const parsedSections: Section[] = [];
    let currentSection: Section | null = null;

    rawLines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('#') || trimmed.startsWith('##')) {
        // Save previous section if exists
        if (currentSection) {
          parsedSections.push(currentSection);
        }
        
        // Start a new section
        const title = trimmed.replace(/^#+\s*/, '');
        currentSection = { title, lines: [] };
      } else {
        if (!currentSection) {
          currentSection = { title: 'Tổng quan bài học', lines: [] };
        }
        currentSection.lines.push(line);
      }
    });

    if (currentSection) {
      parsedSections.push(currentSection);
    }

    return parsedSections;
  }, [content]);

  return (
    <div className="space-y-6">
      {sections.map((section, sIdx) => {
        // Skip rendering section header if it's the default overview
        const isOverview = section.title === 'Tổng quan bài học';

        return (
          <div key={sIdx} className="space-y-3.5">
            {!isOverview && (
              <h4 className="text-md md:text-lg font-black text-slate-100 border-l-4 border-indigo-500 pl-3">
                {section.title}
              </h4>
            )}
            <div className="space-y-2.5">
              {parseSectionLines(section.lines)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface GrammarTopicDetailViewProps {
  grammarProgress: Record<string, GrammarProgress>;
  setGrammarProgress: React.Dispatch<React.SetStateAction<Record<string, GrammarProgress>>>;
  setStorageError: (err: boolean) => void;
  theme: AccentTheme;
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

export function GrammarTopicDetailView({
  grammarProgress,
  setGrammarProgress,
  setStorageError,
  theme: themeProp
}: GrammarTopicDetailViewProps) {
  const theme = themeProp || defaultBlueTheme;
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();

  const [grammarSubTab, setGrammarSubTab] = useState<'theory' | 'quiz'>('theory');

  // Quiz running state
  const [currentGrammarQuestionIndex, setCurrentGrammarQuestionIndex] = useState(0);
  const [selectedGrammarOption, setSelectedGrammarOption] = useState('');
  const [grammarAnswers, setGrammarAnswers] = useState<{ isCorrect: boolean; selectedOption: string }[]>([]);
  const [showQuizResults, setShowQuizResults] = useState(false);

  const currentTopic = grammarTopics.find((t) => t.id === topicId);

  if (!currentTopic) {
    return (
      <div className="text-center py-16 bg-slate-800 border border-slate-700 rounded-3xl text-slate-400 space-y-4 shadow-md max-w-xl mx-auto">
        <AlertCircle className="w-12 h-12 mx-auto text-rose-500" />
        <h4 className="text-lg font-bold">Chuyên đề không tồn tại</h4>
        <button
          onClick={() => navigate('/grammar')}
          className="py-2.5 px-4 bg-slate-900 border border-slate-700 hover:bg-slate-950 text-slate-200 text-sm font-semibold rounded-xl cursor-pointer transition-colors"
        >
          Quay lại danh mục
        </button>
      </div>
    );
  }

  const progress = grammarProgress[currentTopic.id] || {
    theoryCompleted: false,
    maxQuizScore: null
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto w-full py-4">
      {/* Title & Back Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <button
          data-testid="back-to-grammar-btn"
          onClick={() => navigate('/grammar')}
          className="text-xs text-slate-450 hover:text-slate-200 font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          ← Back to Topics
        </button>
        <h2 className="text-2xl font-bold text-slate-100">{currentTopic.title}</h2>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex border-b border-slate-800">
        <button
          data-testid="grammar-theory-tab"
          onClick={() => setGrammarSubTab('theory')}
          className={`px-6 py-3 font-bold text-sm cursor-pointer transition-all ${
            grammarSubTab === 'theory'
              ? 'border-b-2 ' + theme.border + ' ' + theme.text
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Theory
        </button>
        <button
          data-testid="grammar-quiz-tab"
          onClick={() => {
            setGrammarSubTab('quiz');
            setCurrentGrammarQuestionIndex(0);
            setGrammarAnswers([]);
            setSelectedGrammarOption('');
            setShowQuizResults(false);
          }}
          className={`px-6 py-3 font-bold text-sm cursor-pointer transition-all ${
            grammarSubTab === 'quiz'
              ? 'border-b-2 ' + theme.border + ' ' + theme.text
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Practice Quiz
        </button>
      </div>

      {/* Theory Content */}
      {grammarSubTab === 'theory' && (
        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-700/50">
            <BookOpen className="w-6 h-6 text-indigo-400" />
            <h3 className="text-lg md:text-xl font-extrabold text-slate-100">Theory Lesson & Tips</h3>
          </div>

          <FormattedGrammarContent content={currentTopic.theory + '\n\n' + currentTopic.toeicTips} />

          <div className="flex justify-between items-center pt-6 border-t border-slate-700/50">
            <span className="text-sm text-slate-400">
              Status: {progress.theoryCompleted ? '✓ Completed' : 'Not read yet'}
            </span>
            <button
              data-testid="mark-theory-read-btn"
              onClick={() => {
                const updated = {
                  ...grammarProgress,
                  [currentTopic.id]: {
                    ...progress,
                    theoryCompleted: true
                  }
                };
                try {
                  localStorage.setItem('toeic-grammar-progress', JSON.stringify(updated));
                  setGrammarProgress(updated);
                  setStorageError(false);
                } catch (error) {
                  console.error("Failed to save grammar progress", error);
                  setStorageError(true);
                }
              }}
              className={`px-5 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                progress.theoryCompleted
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : theme.bg + ' ' + theme.hoverBg + ' text-white'
              }`}
            >
              {progress.theoryCompleted ? 'Theory Read' : 'Mark as Read'}
            </button>
          </div>
        </div>
      )}

      {/* Quiz Content */}
      {grammarSubTab === 'quiz' && (
        <div className="space-y-6">
          {!showQuizResults ? (() => {
            const activeQuestion = currentTopic.questions[currentGrammarQuestionIndex];
            if (!activeQuestion) return null;

            return (
              <div data-testid="grammar-quiz-card" className="bg-slate-800 border border-slate-700 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
                <div className="flex justify-between items-center border-b border-slate-700/50 pb-4">
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                    Question {currentGrammarQuestionIndex + 1} of {currentTopic.questions.length}
                  </span>
                  <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 py-1 px-2.5 rounded-lg border border-indigo-500/20">
                    TOEIC Style
                  </span>
                </div>

                <div className="space-y-4">
                  <p className="text-lg font-bold text-slate-100 leading-normal">
                    {activeQuestion.questionText}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {activeQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      data-testid="grammar-option-btn"
                      onClick={() => setSelectedGrammarOption(option)}
                      className={`w-full py-3.5 px-4 rounded-xl text-left text-sm font-semibold border transition-all cursor-pointer ${
                        selectedGrammarOption === option
                          ? theme.bg + ' ' + theme.border + ' text-white shadow-md'
                          : 'bg-slate-900 border-slate-750 hover:bg-slate-750 text-slate-350 hover:border-slate-600'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <button
                  data-testid="grammar-submit-q-btn"
                  disabled={!selectedGrammarOption}
                  onClick={() => {
                    const isCorrect = selectedGrammarOption === activeQuestion.correctAnswer;
                    const nextAnswers = [...grammarAnswers, { isCorrect, selectedOption: selectedGrammarOption }];
                    setGrammarAnswers(nextAnswers);

                    if (currentGrammarQuestionIndex + 1 < currentTopic.questions.length) {
                      setCurrentGrammarQuestionIndex((prev) => prev + 1);
                      setSelectedGrammarOption('');
                    } else {
                      // Quiz finished
                      const score = nextAnswers.filter((a) => a.isCorrect).length;
                      const currentMax = progress.maxQuizScore || 0;
                      const newHighScore = Math.max(currentMax, score);

                      const updated = {
                        ...grammarProgress,
                        [currentTopic.id]: {
                          ...progress,
                          maxQuizScore: newHighScore
                        }
                      };

                      try {
                        localStorage.setItem('toeic-grammar-progress', JSON.stringify(updated));
                        setGrammarProgress(updated);
                        setStorageError(false);
                      } catch (error) {
                        console.error("Failed to save grammar progress", error);
                        setStorageError(true);
                      }
                      setShowQuizResults(true);

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
                  }}
                  className={`w-full py-4 px-6 font-bold rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    selectedGrammarOption
                      ? 'text-white ' + theme.bg + ' ' + theme.hoverBg
                      : 'bg-slate-750 text-slate-500 border border-slate-700 cursor-not-allowed'
                  }`}
                >
                  Submit & Next
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            );
          })() : (
            /* Detailed Explanation page */
            <div data-testid="grammar-quiz-results" className="bg-slate-800 border border-slate-700 rounded-3xl p-8 flex flex-col space-y-6 shadow-2xl">
              <div className="text-center space-y-2">
                <div className="inline-block p-4 bg-emerald-500/10 text-emerald-400 rounded-full mb-2">
                  <Check className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                <p className="text-sm text-slate-400">Here is your score and detailed explanations.</p>
              </div>

              {/* Score Display */}
              <div className="bg-slate-900/50 border border-slate-750 rounded-2xl p-5 text-center max-w-xs w-full mx-auto shadow-inner">
                <p className="text-[10px] text-slate-550 uppercase tracking-widest font-extrabold mb-1">SCORE RECEIVED</p>
                <div data-testid="grammar-quiz-score" className="text-3xl font-black text-slate-100">
                  {grammarAnswers.filter((a) => a.isCorrect).length}
                  <span className="text-slate-550 text-lg"> / {currentTopic.questions.length}</span>
                </div>
                <p className="text-xs text-indigo-400 font-semibold mt-1">
                  High score: {progress.maxQuizScore || 0} / 5
                </p>
              </div>

              {/* Explanations List */}
              <div className="space-y-4 pt-4 border-t border-slate-750/70">
                <h4 className="font-bold text-slate-350 text-sm">Xem giải thích đáp án chi tiết:</h4>
                <div className="grid grid-cols-1 gap-3.5 max-h-96 overflow-y-auto pr-1">
                  {currentTopic.questions.map((q, idx) => {
                    const ans = grammarAnswers[idx];
                    const isCorrect = ans?.isCorrect || false;

                    return (
                      <div
                        key={idx}
                        data-testid={`grammar-review-item-${q.id}`}
                        className={`p-4 border rounded-2xl flex flex-col gap-2 ${
                          isCorrect
                            ? 'bg-emerald-500/5 border-emerald-500/20'
                            : 'bg-rose-500/5 border-rose-500/20'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <p className="text-sm font-bold text-slate-200 leading-tight">
                            Câu {idx + 1}: {q.questionText}
                          </p>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                            isCorrect ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
                          }`}>
                            {isCorrect ? 'Correct' : 'Incorrect'}
                          </span>
                        </div>

                        <div className="text-xs space-y-1.5 pt-1.5 border-t border-slate-800">
                          <p className="text-slate-350">
                            Đáp án đã chọn: <span className={isCorrect ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>{ans?.selectedOption}</span>
                          </p>
                          {!isCorrect && (
                            <p className="text-slate-350">
                              Đáp án đúng: <span className="text-emerald-400 font-semibold">{q.correctAnswer}</span>
                            </p>
                          )}
                          <div className="bg-slate-900/40 p-3 border border-slate-800 rounded-xl mt-2 space-y-1">
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold">Giải thích chi tiết</p>
                            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                              {q.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  data-testid="retake-quiz-btn"
                  onClick={() => {
                    setCurrentGrammarQuestionIndex(0);
                    setGrammarAnswers([]);
                    setSelectedGrammarOption('');
                    setShowQuizResults(false);
                  }}
                  className="flex-1 py-4 px-6 bg-slate-700 hover:bg-slate-655 text-white font-bold rounded-xl transition-all cursor-pointer text-center"
                >
                  Retake Quiz
                </button>
                <button
                  onClick={() => navigate('/grammar')}
                  className="flex-1 py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all cursor-pointer text-center"
                >
                  Back to Topics
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function GrammarTopicDetailViewWrapper({
  grammarProgress,
  setGrammarProgress,
  setStorageError,
  theme
}: GrammarTopicDetailViewProps) {
  const { topicId } = useParams<{ topicId: string }>();
  return (
    <GrammarTopicDetailView
      key={topicId}
      grammarProgress={grammarProgress}
      setGrammarProgress={setGrammarProgress}
      setStorageError={setStorageError}
      theme={theme}
    />
  );
}
