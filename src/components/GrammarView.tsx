import type { GrammarProgress } from '../types';
import { grammarTopics } from '../data/grammar';

interface GrammarViewProps {
  grammarProgress: Record<string, GrammarProgress>;
  navigate: (path: string) => void;
}

export function GrammarView({ grammarProgress, navigate }: GrammarViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Grammar Topics</h2>
          <p className="text-sm text-slate-400">Master key TOEIC grammar concepts and challenge yourself with practice quizzes.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {grammarTopics.map((topic) => {
          const progress = grammarProgress[topic.id] || { theoryCompleted: false, maxQuizScore: null };
          return (
            <div
              key={topic.id}
              data-testid={`grammar-topic-${topic.id}`}
              onClick={() => {
                navigate(`/grammar/${topic.id}`);
              }}
              className="bg-slate-800 border border-slate-700 hover:border-blue-500/50 p-6 rounded-2xl cursor-pointer transition-colors flex flex-col justify-between h-48 group shadow-md"
            >
              <div>
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-sm text-slate-400 mt-2 line-clamp-2">
                  {topic.description}
                </p>
              </div>

              <div className="flex justify-between items-center border-t border-slate-700/50 pt-4 mt-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <span data-testid={`theory-status-${topic.id}`}>
                  Theory Read: {progress.theoryCompleted ? 'Yes' : 'No'}
                </span>
                <span data-testid={`quiz-status-${topic.id}`}>
                  Highest Score: {progress.maxQuizScore !== null ? `${progress.maxQuizScore}/5` : 'N/A'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
