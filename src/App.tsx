import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, GraduationCap, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

function App() {
  const [learnedCount, setLearnedCount] = useState(0);

  const handleLearnWord = () => {
    setLearnedCount((prev) => prev + 1);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6 selection:bg-blue-500 selection:text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl flex flex-col items-center text-center"
      >
        {/* Header Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="p-4 bg-blue-500/10 text-blue-400 rounded-2xl mb-6 cursor-pointer"
        >
          <GraduationCap className="w-12 h-12" />
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Vocabulary Learner
        </h1>
        <p className="text-slate-400 mb-8 text-sm leading-relaxed">
          Master your vocabulary step-by-step with interactive learning and instant feedback.
        </p>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
            <BookOpen className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-200">100</div>
            <div className="text-xs text-slate-500 font-medium">Total Words</div>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
            <Sparkles className="w-5 h-5 text-amber-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-amber-400">{learnedCount}</div>
            <div className="text-xs text-slate-500 font-medium">Words Learned</div>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          onClick={handleLearnWord}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Learn Next Word</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.4 }}
        className="text-xs text-slate-500 mt-8"
      >
        Built with Vite, Tailwind CSS v4, Framer Motion, and Lucide Icons.
      </motion.p>
    </div>
  );
}

export default App;
