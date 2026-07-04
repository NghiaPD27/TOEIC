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
}

export interface UserWordProgress {
  wordId: string;
  status: LearningStatus;
  lastStudiedAt?: string;
  correctCount: number;
  incorrectCount: number;
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
