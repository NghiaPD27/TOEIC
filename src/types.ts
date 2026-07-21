export type LearningStatus = 'new' | 'learning' | 'mastered';

export interface VocabularyWord {
  id: string;
  word: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb';
  ipa: string;
  definition: string;
  example: string;
  exampleTranslation: string;
  topic: 'Office' | 'Marketing' | 'Finance' | 'Personnel' | 'Travel';
  difficulty: 'easy' | 'medium' | 'hard';
  isCustom?: boolean;
  synonyms?: string[];
}

export interface UserWordProgress {
  wordId: string;
  status: LearningStatus;
  lastStudiedAt?: string;
  correctCount: number;
  incorrectCount: number;
  isStarred?: boolean;
}

export interface UserStats {
  streak: number;
  lastActiveDate?: string;
  totalSessionsCompleted: number;
}

export interface StreakState {
  count: number;
  lastStudyDate: string; // toDateString() format
}

export interface GrammarQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface GrammarTopic {
  id: string;
  title: string;
  description: string;
  theory: string;
  toeicTips: string;
  questions: GrammarQuestion[];
}

export interface GrammarProgress {
  theoryCompleted: boolean;
  maxQuizScore: number | null;
}

export interface TestQuestion {
  wordId: string;
  word: VocabularyWord;
  type: 'multiple-choice' | 'spelling' | 'listening';
  questionText: string;
  correctAnswer: string;
  options: string[];
}

export interface TestAnswer {
  wordId: string;
  question: TestQuestion;
  selectedAnswer: string;
  isCorrect: boolean;
}

export interface Vocal900Example {
  example: string;
  translation: string;
}

export interface Vocal900Word {
  id: string;
  word: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb';
  ipa: string;
  definitions: string[];
  examples: Vocal900Example[];
  lessonId: number;
}

export interface Vocal900Lesson {
  id: number;
  title: string;
  description?: string;
  words: Vocal900Word[];
}


