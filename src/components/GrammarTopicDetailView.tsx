import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, AlertCircle, Sparkles, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { grammarTopics } from '../data/grammar';
import type { GrammarProgress } from '../types';

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
    
    // 1. Check for Table block
    if (line.startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      
      if (tableLines.length >= 3) {
        const headers = tableLines[0]
          .split('|')
          .map(c => c.trim())
          .filter((_c, idx, arr) => idx > 0 && idx < arr.length - 1);
          
        const rows = tableLines.slice(2).map(rowLine => {
          return rowLine
            .split('|')
            .map(c => c.trim())
            .filter((_c, idx, arr) => idx > 0 && idx < arr.length - 1);
        });
        
        renderedElements.push(
          <div key={`table-${i}`} className="overflow-x-auto my-5 border border-slate-700/50 rounded-2xl shadow-lg bg-slate-900/40 animate-fadeIn">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-slate-900/90 border-b border-slate-700/80">
                  {headers.map((h, idx) => (
                    <th key={`th-${idx}`} className="px-4 py-3.5 font-bold text-slate-200 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {rows.map((row, rowIdx) => (
                  <tr key={`tr-${rowIdx}`} className="hover:bg-slate-850/40 transition-colors">
                    {row.map((cell, cellIdx) => {
                      const isFormula = cell.includes('+') || cell.match(/\b(S|V|O)\b/);
                      return (
                        <td key={`td-${cellIdx}`} className={`px-4 py-3 text-slate-300 leading-relaxed ${isFormula ? 'font-mono text-indigo-300 bg-slate-900/20' : ''}`}>
                          {formatBoldText(cell)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // 2. Check for Examples and Translations
    const exampleMatch = line.match(/^-\s*Example\s*(\d*:?)\s*(.+)$/i);
    if (exampleMatch) {
      const exampleNum = exampleMatch[1];
      const exampleEnglish = exampleMatch[2];
      
      let translationText = "";
      if (i + 1 < lines.length && lines[i + 1].trim().startsWith('-> Dịch:')) {
        translationText = lines[i + 1].trim().replace(/^->\s*Dịch:\s*/, "");
        i++;
      } else if (i + 1 < lines.length && lines[i + 1].trim().startsWith('->')) {
        translationText = lines[i + 1].trim().replace(/^->\s*/, "");
        i++;
      }
      
      renderedElements.push(
        <div key={`example-${i}`} className="bg-slate-900/30 border border-slate-800 hover:border-slate-700/85 rounded-2xl p-5 my-3.5 transition-all shadow-md hover:shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
              Example {exampleNum.replace(/:$/, '') || ''}
            </span>
          </div>
          <p className="text-slate-200 font-semibold text-sm leading-relaxed">{formatBoldText(exampleEnglish)}</p>
          {translationText && (
            <p className="text-emerald-400 text-xs italic mt-2 flex items-start gap-1.5 leading-normal">
              <span className="text-emerald-500 font-bold select-none">→</span>
              <span>{formatBoldText(translationText)}</span>
            </p>
          )}
        </div>
      );
      i++;
      continue;
    }

    // 3. Check for Sub-headings
    const subHeadingMatch = line.match(/^(\d+\..+?:)$/);
    if (subHeadingMatch) {
      const headingText = subHeadingMatch[1];
      renderedElements.push(
        <h5 key={`sub-heading-${i}`} className="text-sm font-bold text-indigo-300 uppercase tracking-wide mt-5 mb-2">
          {headingText}
        </h5>
      );
      i++;
      continue;
    }

    // 4. Check for Bullet points
    if (line.startsWith('-') || line.startsWith('*')) {
      const cleanContent = line.replace(/^[-*]\s*/, "");
      renderedElements.push(
        <div key={`bullet-${i}`} className="flex items-start gap-2.5 pl-2 py-1 text-sm text-slate-300 leading-relaxed">
          <span className="text-indigo-500 font-bold select-none mt-0.5">•</span>
          <span>{formatBoldText(cleanContent)}</span>
        </div>
      );
      i++;
      continue;
    }

    // Default: Plain paragraph text
    renderedElements.push(
      <p key={`p-${i}`} className="text-slate-300 text-sm leading-relaxed my-2">
        {formatBoldText(line)}
      </p>
    );
    i++;
  }
  
  return renderedElements;
}

function FormattedGrammarContent({ content }: FormattedGrammarContentProps) {
  const lines = content.split('\n');
  const sections: Section[] = [];
  let currentSection: Section = { title: "", lines: [] };
  
  lines.forEach(line => {
    const trimmed = line.trim();
    const majorHeaderMatch = trimmed.match(/^\*\*([IVXLCDM]+\..+?)\*\*/);
    if (majorHeaderMatch) {
      if (currentSection.title || currentSection.lines.length > 0) {
        sections.push(currentSection);
      }
      currentSection = { title: majorHeaderMatch[1], lines: [] };
    } else {
      currentSection.lines.push(line);
    }
  });
  if (currentSection.title || currentSection.lines.length > 0) {
    sections.push(currentSection);
  }

  return (
    <div className="space-y-8">
      {sections.map((section, sectionIdx) => {
        const isIntro = !section.title;
        const isWarning = section.title.includes('III.');
        const isExample = section.title.includes('IV.');
        
        if (isIntro) {
          return (
            <div key={`section-intro-${sectionIdx}`} className="space-y-3">
              {parseSectionLines(section.lines)}
            </div>
          );
        }
        
        let cardBgClass = "";
        let titleColorClass = "text-indigo-400";
        let iconElement = <BookOpen className="w-5 h-5" />;
        
        if (isWarning) {
          cardBgClass = "bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 shadow-md";
          titleColorClass = "text-amber-400";
          iconElement = <AlertCircle className="w-5 h-5" />;
        } else if (isExample) {
          titleColorClass = "text-sky-400";
          iconElement = <Sparkles className="w-5 h-5" />;
        }
        
        if (isWarning) {
          return (
            <div key={`section-${sectionIdx}`} className={`space-y-4 ${cardBgClass}`}>
              <h4 className={`text-sm md:text-md font-bold flex items-center gap-2.5 ${titleColorClass}`}>
                {iconElement}
                {section.title}
              </h4>
              <div className="space-y-4">
                {parseSectionLines(section.lines)}
              </div>
            </div>
          );
        }
        
        if (isExample) {
          return (
            <div key={`section-${sectionIdx}`} className="space-y-4">
              <h4 className={`text-md md:text-lg font-bold flex items-center gap-2.5 pb-3 border-b border-slate-700/50 ${titleColorClass}`}>
                {iconElement}
                {section.title}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {parseSectionLines(section.lines)}
              </div>
            </div>
          );
        }
        
        return (
          <div key={`section-${sectionIdx}`} className="space-y-4">
            <h4 className={`text-md md:text-lg font-bold flex items-center gap-2.5 pb-3 border-b border-slate-700/50 ${titleColorClass}`}>
              {iconElement}
              {section.title}
            </h4>
            <div className="space-y-4">
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
}

export function GrammarTopicDetailView({
  grammarProgress,
  setGrammarProgress,
  setStorageError
}: GrammarTopicDetailViewProps) {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();

  const [grammarSubTab, setGrammarSubTab] = useState<'theory' | 'quiz'>('theory');
  const [currentGrammarQuestionIndex, setCurrentGrammarQuestionIndex] = useState<number>(0);
  const [grammarAnswers, setGrammarAnswers] = useState<string[]>([]);
  const [selectedGrammarOption, setSelectedGrammarOption] = useState<string>('');
  const [showQuizResults, setShowQuizResults] = useState<boolean>(false);

  const currentTopic = grammarTopics.find(t => t.id === topicId);
  if (!currentTopic) return null;
  const progress = grammarProgress[currentTopic.id] || { theoryCompleted: false, maxQuizScore: null };

  return (
    <div className="space-y-6 max-w-3xl mx-auto w-full">
      {/* Back Button and Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/grammar')}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm font-semibold cursor-pointer transition-colors"
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
              ? 'border-b-2 border-blue-500 text-blue-400'
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
              ? 'border-b-2 border-blue-500 text-blue-400'
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
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
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
            const q = currentTopic.questions[currentGrammarQuestionIndex];
            if (!q) return null;
            return (
              <div
                data-testid="grammar-quiz-card"
                className="bg-slate-800 border border-slate-700 rounded-3xl p-8 flex flex-col space-y-6 shadow-2xl"
              >
                <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                  <span className="uppercase tracking-widest text-indigo-400">
                    Practice Quiz
                  </span>
                  <span>
                    Question {currentGrammarQuestionIndex + 1} of 5
                  </span>
                </div>

                <h3 className="text-xl font-bold leading-snug">
                  {q.questionText}
                </h3>

                <div className="grid grid-cols-1 gap-3">
                  {q.options.map((option) => (
                    <button
                      key={option}
                      data-testid="grammar-option-btn"
                      data-selected={selectedGrammarOption === option ? "true" : "false"}
                      onClick={() => setSelectedGrammarOption(option)}
                      className={`w-full py-4 px-4 text-left border rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                        selectedGrammarOption === option
                          ? 'bg-indigo-600 border-indigo-500 text-white'
                          : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-750'
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
                    const updatedAnswers = [...grammarAnswers, selectedGrammarOption];
                    setGrammarAnswers(updatedAnswers);
                    setSelectedGrammarOption('');

                    if (currentGrammarQuestionIndex + 1 < 5) {
                      setCurrentGrammarQuestionIndex(prev => prev + 1);
                    } else {
                      const score = updatedAnswers.reduce((acc, ans, idx) => acc + (ans === currentTopic.questions[idx].correctAnswer ? 1 : 0), 0);
                      const newMaxScore = progress.maxQuizScore === null ? score : Math.max(progress.maxQuizScore, score);
                      const updated = {
                        ...grammarProgress,
                        [currentTopic.id]: {
                          ...progress,
                          maxQuizScore: newMaxScore
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
                      ? 'bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white'
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

              {/* score counts */}
              <div className="text-center border-t border-b border-slate-700 py-6">
                <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Your Score</div>
                <div data-testid="grammar-quiz-score" className="text-4xl font-extrabold text-slate-200">
                  {grammarAnswers.reduce((acc, ans, idx) => acc + (ans === currentTopic.questions[idx].correctAnswer ? 1 : 0), 0)} / 5
                </div>
              </div>

              {/* review list of items */}
              <div className="space-y-4">
                <h4 className="font-bold text-md text-slate-300">Detailed Explanations</h4>
                <div className="space-y-6">
                  {currentTopic.questions.map((q, idx) => {
                    const userAns = grammarAnswers[idx];
                    return (
                      <div
                        key={q.id}
                        data-testid={`grammar-review-item-${q.id}`}
                        className="bg-slate-900/50 border border-slate-700 p-6 rounded-2xl space-y-4"
                      >
                        <h5 className="font-bold text-sm text-slate-100">
                          {idx + 1}. {q.questionText}
                        </h5>

                        <div className="grid grid-cols-1 gap-2 pl-2">
                          {q.options.map((opt) => {
                            const isOptSelected = opt === userAns;
                            const isOptCorrect = opt === q.correctAnswer;
                            let btnStyle = "bg-slate-800/30 border-slate-750 text-slate-400";
                            if (isOptCorrect) {
                              btnStyle = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-medium";
                            } else if (isOptSelected) {
                              btnStyle = "bg-rose-500/10 border-rose-500/30 text-rose-400 font-medium";
                            }
                            return (
                              <div
                                key={opt}
                                className={`py-2.5 px-4 border rounded-xl text-xs flex justify-between items-center ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {isOptCorrect && <span className="text-[10px] uppercase font-bold tracking-wider">Correct</span>}
                                {isOptSelected && !isOptCorrect && <span className="text-[10px] uppercase font-bold tracking-wider">Your Selection</span>}
                              </div>
                            );
                          })}
                        </div>

                        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 text-xs text-slate-300 space-y-1">
                          <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px]">Explanation:</span>
                          <p>{q.explanation}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-4">
                <button
                  data-testid="grammar-retake-btn"
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
  setStorageError
}: GrammarTopicDetailViewProps) {
  const { topicId } = useParams<{ topicId: string }>();
  return (
    <GrammarTopicDetailView
      key={topicId}
      grammarProgress={grammarProgress}
      setGrammarProgress={setGrammarProgress}
      setStorageError={setStorageError}
    />
  );
}
