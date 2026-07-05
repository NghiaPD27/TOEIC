import type { GrammarProgress } from '../types';
import { grammarTopics } from '../data/grammar';
import type { AccentTheme } from '../utils/helpers';

interface GrammarViewProps {
  grammarProgress: Record<string, GrammarProgress>;
  navigate: (path: string) => void;
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

export function GrammarView({ grammarProgress, navigate, theme: themeProp }: GrammarViewProps) {
  const theme = themeProp || defaultBlueTheme;
  const textAccent = theme.text.includes(' ') ? theme.text.split(' ').pop() : theme.text;

  return (
    <div className="space-y-6 animate-fadeIn" data-testid="grammar-view">
      <div className="border-b border-slate-800 pb-5">
        <h2 className="text-2xl font-black text-slate-100">
          Grammar Topics
        </h2>
        <p className="text-slate-450 text-xs mt-1">
          Học lý thuyết kĩ càng, xem mẹo làm bài TOEIC và luyện tập trắc nghiệm giải thích đáp án chi tiết.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {grammarTopics.map((topic) => {
          const progress = grammarProgress[topic.id];
          const hasStudied = progress?.theoryCompleted || false;
          const score = progress?.maxQuizScore ?? null;

          return (
            <div
              key={topic.id}
              data-testid={`grammar-topic-${topic.id}`}
              onClick={() => navigate(`/grammar/${topic.id}`)}
              className={`bg-slate-800 border border-slate-700 ${theme.borderHover} p-6 rounded-2xl cursor-pointer transition-colors flex flex-col justify-between h-48 group shadow-md`}
            >
              <div>
                <h3 className={`text-xl font-bold text-slate-100 group-hover:${textAccent} transition-colors`}>
                  {topic.title}
                </h3>
                <p className="text-xs text-slate-450 mt-1 line-clamp-2 leading-relaxed">
                  {topic.description}
                </p>
              </div>

              <div className="flex justify-between items-center border-t border-slate-700/50 pt-4 mt-4">
                <span data-testid={`theory-status-${topic.id}`} className={`text-[10px] font-bold uppercase tracking-wider ${
                  hasStudied ? 'text-emerald-400' : 'text-slate-500'
                }`}>
                  {hasStudied ? 'Đã học lý thuyết / Theory Read: Yes' : 'Chưa học / Theory Read: No'}
                </span>
                
                {score !== null ? (
                  <span data-testid={`quiz-status-${topic.id}`} className="text-xs font-bold text-indigo-400 bg-indigo-500/10 py-1 px-2.5 rounded-lg border border-indigo-500/20">
                    Quiz: {score}/5 / Highest Score: {score}/5
                  </span>
                ) : (
                  <span data-testid={`quiz-status-${topic.id}`} className="text-xs text-slate-500 font-semibold">Quiz: --/5 / Highest Score: N/A</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
