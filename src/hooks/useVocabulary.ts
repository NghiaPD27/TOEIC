import { useState, useRef } from 'react';
import type { VocabularyWord, UserWordProgress, StreakState, LearningStatus } from '../types';
import { defaultVocabulary } from '../data/vocabulary';
import { builtinSynonyms } from '../data/synonyms';

// Helper to merge defaultVocabulary and custom words cleanly
const mergeWords = (defaultWords: VocabularyWord[], customWords: VocabularyWord[]): VocabularyWord[] => {
  const defaultCopy = defaultWords.map(dw => ({
    ...dw,
    synonyms: builtinSynonyms[dw.id] || []
  }));
  const newCustom: VocabularyWord[] = [];

  customWords.forEach(cw => {
    const idx = defaultCopy.findIndex(dw => dw.word.toLowerCase() === cw.word.toLowerCase());
    if (idx !== -1) {
      defaultCopy[idx] = {
        ...defaultCopy[idx],
        definition: cw.definition,
        ipa: cw.ipa || defaultCopy[idx].ipa,
        example: cw.example || defaultCopy[idx].example,
        exampleTranslation: cw.exampleTranslation || defaultCopy[idx].exampleTranslation,
        difficulty: cw.difficulty || defaultCopy[idx].difficulty,
        partOfSpeech: cw.partOfSpeech || defaultCopy[idx].partOfSpeech,
        topic: cw.topic || defaultCopy[idx].topic,
        synonyms: cw.synonyms || defaultCopy[idx].synonyms || [],
        isCustom: true
      };
    } else {
      newCustom.push(cw);
    }
  });

  // Prepend custom words that do not override defaults so they are at the front of the list
  return [...newCustom, ...defaultCopy];
};

// Helper to normalize and validate custom words
const validateCustomWords = (wordsList: Partial<VocabularyWord>[]): VocabularyWord[] => {
  if (!Array.isArray(wordsList)) return [];
  const seenIds = new Set<string>();
  const seenSpellings = new Set<string>();
  const validWords: VocabularyWord[] = [];

  for (const item of wordsList) {
    if (!item || typeof item !== 'object') continue;

    const rawWord = item.word;
    if (!rawWord || typeof rawWord !== 'string') continue;
    const trimmed = rawWord.trim().toLowerCase();
    if (!trimmed) continue;
    const cleanSpelling = trimmed.replace(/[^a-z0-9]/g, '_');
    const rawId = item.id ? String(item.id) : `custom_${cleanSpelling}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Deduplicate by spelling case-insensitively and by ID
    if (seenIds.has(rawId) || seenSpellings.has(trimmed)) {
      continue;
    }
    seenIds.add(rawId);
    seenSpellings.add(trimmed);

    // Normalize difficulty: 'easy', 'medium', 'hard'
    let difficulty: 'easy' | 'medium' | 'hard' = 'medium';
    if (item.difficulty === 'easy' || item.difficulty === 'medium' || item.difficulty === 'hard') {
      difficulty = item.difficulty;
    }

    // Normalize topic: 'Office' | 'Marketing' | 'Finance' | 'Personnel' | 'Travel'
    let topic: 'Office' | 'Marketing' | 'Finance' | 'Personnel' | 'Travel' = 'Office';
    const allowedTopics = ['Office', 'Marketing', 'Finance', 'Personnel', 'Travel'];
    if (item.topic && allowedTopics.includes(item.topic)) {
      topic = item.topic as 'Office' | 'Marketing' | 'Finance' | 'Personnel' | 'Travel';
    }

    // Normalize part of speech
    let partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' = 'noun';
    const allowedPOS = ['noun', 'verb', 'adjective', 'adverb'];
    if (item.partOfSpeech && allowedPOS.includes(item.partOfSpeech)) {
      partOfSpeech = item.partOfSpeech as 'noun' | 'verb' | 'adjective' | 'adverb';
    }

    const cleanWord: VocabularyWord = {
      id: rawId,
      word: rawWord.trim(),
      partOfSpeech,
      ipa: typeof item.ipa === 'string' ? item.ipa.trim() : '',
      definition: typeof item.definition === 'string' ? item.definition.trim() : '',
      example: typeof item.example === 'string' ? item.example.trim() : '',
      exampleTranslation: typeof item.exampleTranslation === 'string' ? item.exampleTranslation.trim() : '',
      topic,
      difficulty,
      isCustom: true,
      synonyms: Array.isArray(item.synonyms) ? item.synonyms : []
    };
    validWords.push(cleanWord);
  }
  return validWords;
};

export const useVocabulary = () => {
  let initialStorageError = false;

  const safeInitWrite = (key: string, data: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.warn('Storage error during initialization:', error);
      initialStorageError = true;
    }
  };

  // Helper to save data with QuotaExceededError checking
  const safeSaveToLocalStorage = (key: string, data: unknown): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      setStorageError(false);
      return true;
    } catch (error) {
      console.warn('Storage error during save:', error);
      setStorageError(true);
      return false;
    }
  };

  // State initialization for custom words
  const [words, setWords] = useState<VocabularyWord[]>(() => {
    let customWords: VocabularyWord[] = [];
    let corruptCustom = false;
    try {
      const stored = localStorage.getItem('toeic-vocab-custom') || localStorage.getItem('vocab-custom');
      if (stored) {
        customWords = JSON.parse(stored) as VocabularyWord[];
      }
    } catch {
      corruptCustom = true;
    }

    if (corruptCustom) {
      safeInitWrite('toeic-vocab-custom', []);
      customWords = [];
    }

    const validatedCustom = validateCustomWords(customWords);
    if (JSON.stringify(customWords) !== JSON.stringify(validatedCustom)) {
      safeInitWrite('toeic-vocab-custom', validatedCustom);
    }
    return mergeWords(defaultVocabulary, validatedCustom);
  });

  // State initialization for progress
  const [progressState, setProgressState] = useState<Record<string, UserWordProgress>>(() => {
    let parsedProgress: unknown = null;
    let corruptProgress = false;
    try {
      const stored = localStorage.getItem('toeic-vocab-progress') || localStorage.getItem('vocab-progress');
      if (stored) {
        parsedProgress = JSON.parse(stored);
      }
    } catch {
      corruptProgress = true;
    }

    // Recover from corrupt JSON
    if (corruptProgress) {
      const defaultProgressMap = defaultVocabulary.reduce((acc, word) => {
        acc[word.id] = { wordId: word.id, status: 'new', correctCount: 0, incorrectCount: 0 };
        return acc;
      }, {} as Record<string, UserWordProgress>);
      safeInitWrite('toeic-vocab-progress', Object.values(defaultProgressMap));
      return defaultProgressMap;
    }

    // Fallback if no progress exists
    if (!parsedProgress) {
      const defaultProgressMap = defaultVocabulary.reduce((acc, word) => {
        acc[word.id] = { wordId: word.id, status: 'new', correctCount: 0, incorrectCount: 0 };
        return acc;
      }, {} as Record<string, UserWordProgress>);
      return defaultProgressMap;
    }

    // Legacy schema migration check: flat array of strings
    if (Array.isArray(parsedProgress) && (parsedProgress.length > 0 && typeof parsedProgress[0] === 'string')) {
      const legacySet = new Set(parsedProgress as string[]);
      const migratedMap: Record<string, UserWordProgress> = {};
      words.forEach(w => {
        migratedMap[w.id] = {
          wordId: w.id,
          status: legacySet.has(w.id) ? 'learning' : 'new',
          correctCount: 0,
          incorrectCount: 0
        };
      });
      safeInitWrite('toeic-vocab-progress', Object.values(migratedMap));
      return migratedMap;
    }

    // Standard UserWordProgress[] parsing and map seeding
    const progressMap: Record<string, UserWordProgress> = {};
    let progressSanitized = false;
    if (Array.isArray(parsedProgress)) {
      parsedProgress.forEach((item: unknown) => {
        const progressItem = item as Partial<UserWordProgress>;
        if (progressItem && typeof progressItem === 'object' && progressItem.wordId) {
          let status: LearningStatus = 'new';
          if (progressItem.status === 'new' || progressItem.status === 'learning' || progressItem.status === 'mastered') {
            status = progressItem.status;
          } else {
            progressSanitized = true;
          }

          let correctCount = typeof progressItem.correctCount === 'number' ? progressItem.correctCount : 0;
          if (correctCount < 0) {
            correctCount = 0;
            progressSanitized = true;
          }
          if (!Number.isInteger(correctCount)) {
            correctCount = Math.floor(correctCount);
            progressSanitized = true;
          }

          let incorrectCount = typeof progressItem.incorrectCount === 'number' ? progressItem.incorrectCount : 0;
          if (incorrectCount < 0) {
            incorrectCount = 0;
            progressSanitized = true;
          }
          if (!Number.isInteger(incorrectCount)) {
            incorrectCount = Math.floor(incorrectCount);
            progressSanitized = true;
          }

          progressMap[progressItem.wordId] = {
            wordId: progressItem.wordId,
            status,
            lastStudiedAt: progressItem.lastStudiedAt,
            correctCount,
            incorrectCount,
            isStarred: !!progressItem.isStarred
          };
        }
      });
    }

    // Seed missing words (e.g. from defaultVocabulary or customWords)
    let needsRewrite = progressSanitized;
    words.forEach(w => {
      if (!progressMap[w.id]) {
        progressMap[w.id] = {
          wordId: w.id,
          status: 'new',
          correctCount: 0,
          incorrectCount: 0,
          isStarred: false
        };
        needsRewrite = true;
      }
    });

    if (needsRewrite) {
      safeInitWrite('toeic-vocab-progress', Object.values(progressMap));
    }

    return progressMap;
  });

  // State initialization for streak
  const [streakState, setStreakState] = useState<StreakState>(() => {
    let parsedStreak: unknown = null;
    let corruptStreak = false;
    try {
      const stored = localStorage.getItem('toeic-vocab-streak');
      if (stored) {
        parsedStreak = JSON.parse(stored);
      }
    } catch {
      corruptStreak = true;
    }

    if (corruptStreak) {
      safeInitWrite('toeic-vocab-streak', { count: 0, lastStudyDate: '' });
      return { count: 0, lastStudyDate: '' };
    }

    const streakData = parsedStreak as StreakState | null;
    if (!streakData || typeof streakData.count !== 'number' || typeof streakData.lastStudyDate !== 'string') {
      return { count: 0, lastStudyDate: '' };
    }

    let count = streakData.count;
    let streakSanitized = false;
    if (count < 0) {
      count = 0;
      streakSanitized = true;
    }

    const today = new Date();
    const todayString = today.toDateString();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();

    const isToday = streakData.lastStudyDate === todayString;
    const isYesterday = streakData.lastStudyDate === yesterdayString;

    if (count > 0 && !isToday && !isYesterday) {
      const expiredStreak = { count: 0, lastStudyDate: '' };
      safeInitWrite('toeic-vocab-streak', expiredStreak);
      return expiredStreak;
    }

    const finalStreak = { count, lastStudyDate: streakData.lastStudyDate };
    if (streakSanitized) {
      safeInitWrite('toeic-vocab-streak', finalStreak);
    }
    return finalStreak;
  });

  const [storageError, setStorageError] = useState<boolean>(() => initialStorageError);

  const progressRef = useRef(progressState);
  const streakRef = useRef(streakState);

  const setProgress = (newProgress: Record<string, UserWordProgress>) => {
    progressRef.current = newProgress;
    setProgressState(newProgress);
  };

  const setStreak = (newStreak: StreakState) => {
    streakRef.current = newStreak;
    setStreakState(newStreak);
  };

  // Streak logic helper
  const recordStudySession = () => {
    const today = new Date();
    const todayString = today.toDateString();
    const lastStudyDateString = streakRef.current.lastStudyDate;

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();

    let newCount = streakRef.current.count;

    if (lastStudyDateString === todayString) {
      // Same-day cap.
      return;
    } else if (lastStudyDateString === yesterdayString) {
      // Consecutive day learning.
      newCount += 1;
    } else {
      // First session or inactivity reset.
      newCount = 1;
    }

    const newStreakState = { count: newCount, lastStudyDate: todayString };
    const success = safeSaveToLocalStorage('toeic-vocab-streak', newStreakState);
    if (success) {
      setStreak(newStreakState);
    }
  };

  const addCustomWord = (newWord: Omit<VocabularyWord, 'id' | 'isCustom'>) => {
    const trimmedWordName = newWord.word.trim();
    if (!trimmedWordName) {
      return;
    }

    // Normalize difficulty: 'easy', 'medium', 'hard'
    let difficulty: 'easy' | 'medium' | 'hard' = 'medium';
    if (newWord.difficulty === 'easy' || newWord.difficulty === 'medium' || newWord.difficulty === 'hard') {
      difficulty = newWord.difficulty;
    }

    // Normalize topic: 'Office' | 'Marketing' | 'Finance' | 'Personnel' | 'Travel'
    let topic: 'Office' | 'Marketing' | 'Finance' | 'Personnel' | 'Travel' = 'Office';
    const allowedTopics = ['Office', 'Marketing', 'Finance', 'Personnel', 'Travel'];
    if (newWord.topic && allowedTopics.includes(newWord.topic)) {
      topic = newWord.topic as 'Office' | 'Marketing' | 'Finance' | 'Personnel' | 'Travel';
    }

    // Normalize part of speech
    let partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' = 'noun';
    const allowedPOS = ['noun', 'verb', 'adjective', 'adverb'];
    if (newWord.partOfSpeech && allowedPOS.includes(newWord.partOfSpeech)) {
      partOfSpeech = newWord.partOfSpeech as 'noun' | 'verb' | 'adjective' | 'adverb';
    }

    const sanitizedWord = {
      word: trimmedWordName,
      partOfSpeech,
      ipa: typeof newWord.ipa === 'string' ? newWord.ipa.trim() : '',
      definition: typeof newWord.definition === 'string' ? newWord.definition.trim() : '',
      example: typeof newWord.example === 'string' ? newWord.example.trim() : '',
      exampleTranslation: typeof newWord.exampleTranslation === 'string' ? newWord.exampleTranslation.trim() : '',
      topic,
      difficulty,
      synonyms: Array.isArray(newWord.synonyms) ? newWord.synonyms : []
    };

    const cleanSpelling = trimmedWordName.toLowerCase().replace(/[^a-z0-9]/g, '_');

    let storedCustom: VocabularyWord[] = [];
    try {
      const stored = localStorage.getItem('toeic-vocab-custom') || localStorage.getItem('vocab-custom');
      if (stored) {
        storedCustom = JSON.parse(stored) as VocabularyWord[];
      }
    } catch {
      storedCustom = [];
    }

    storedCustom = validateCustomWords(storedCustom);

    const existingIndex = storedCustom.findIndex(w => w.word.toLowerCase() === trimmedWordName.toLowerCase());

    let targetId = '';
    if (existingIndex !== -1) {
      // Overwrite the existing custom word
      targetId = storedCustom[existingIndex].id;
      storedCustom[existingIndex] = {
        ...storedCustom[existingIndex],
        ...sanitizedWord,
        isCustom: true
      };
    } else {
      // Check if it matches a default word spelling
      const defaultMatch = defaultVocabulary.find(w => w.word.toLowerCase() === trimmedWordName.toLowerCase());
      if (defaultMatch) {
        targetId = defaultMatch.id;
        storedCustom.push({
          ...sanitizedWord,
          id: targetId,
          isCustom: true
        });
      } else {
        // Generate new ID containing the spelling for test containment check
        targetId = `custom_${cleanSpelling}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        storedCustom.push({
          ...sanitizedWord,
          id: targetId,
          isCustom: true
        });
      }
    }

    const successCustom = safeSaveToLocalStorage('toeic-vocab-custom', storedCustom);
    if (!successCustom) return;

    // Update state words
    setWords(mergeWords(defaultVocabulary, storedCustom));

    // Update progress state & LocalStorage
    const currentProgress = progressRef.current;
    if (!currentProgress[targetId]) {
      const updated = {
        ...currentProgress,
        [targetId]: {
          wordId: targetId,
          status: 'new' as LearningStatus,
          correctCount: 0,
          incorrectCount: 0,
          isStarred: false
        }
      };
      const successProgress = safeSaveToLocalStorage('toeic-vocab-progress', Object.values(updated));
      if (successProgress) {
        setProgress(updated);
      }
    }
  };

  const updateWordStatus = (wordId: string, status: LearningStatus) => {
    const wordExists = words.some(w => w.id === wordId);
    if (!wordExists) {
      return;
    }
    const currentProgress = progressRef.current;
    const updated = {
      ...currentProgress,
      [wordId]: {
        ...(currentProgress[wordId] || { wordId, correctCount: 0, incorrectCount: 0 }),
        status,
        lastStudiedAt: new Date().toISOString()
      }
    };
    const success = safeSaveToLocalStorage('toeic-vocab-progress', Object.values(updated));
    if (success) {
      setProgress(updated);
      recordStudySession();
    }
  };

  const incrementWordStats = (wordId: string, isCorrect: boolean) => {
    const wordExists = words.some(w => w.id === wordId);
    if (!wordExists) {
      return;
    }
    const currentProgress = progressRef.current;
    const existing = currentProgress[wordId] || { wordId, status: 'new' as LearningStatus, correctCount: 0, incorrectCount: 0 };
    const status: LearningStatus = isCorrect ? 'mastered' : 'learning';
    const updated = {
      ...currentProgress,
      [wordId]: {
        ...existing,
        status,
        correctCount: existing.correctCount + (isCorrect ? 1 : 0),
        incorrectCount: existing.incorrectCount + (isCorrect ? 0 : 1),
        lastStudiedAt: new Date().toISOString()
      }
    };
    const success = safeSaveToLocalStorage('toeic-vocab-progress', Object.values(updated));
    if (success) {
      setProgress(updated);
      recordStudySession();
    }
  };

  const toggleWordStarred = (wordId: string) => {
    const wordExists = words.some(w => w.id === wordId);
    if (!wordExists) {
      return;
    }
    const currentProgress = progressRef.current;
    const existing = currentProgress[wordId] || { wordId, status: 'new' as LearningStatus, correctCount: 0, incorrectCount: 0, isStarred: false };
    const updated = {
      ...currentProgress,
      [wordId]: {
        ...existing,
        isStarred: !existing.isStarred
      }
    };
    const success = safeSaveToLocalStorage('toeic-vocab-progress', Object.values(updated));
    if (success) {
      setProgress(updated);
    }
  };

  const resetProgress = (): boolean => {
    const currentProgress = progressRef.current;
    const resetMap: Record<string, UserWordProgress> = {};
    Object.keys(currentProgress).forEach(wordId => {
      resetMap[wordId] = {
        wordId,
        status: 'new',
        correctCount: 0,
        incorrectCount: 0,
        isStarred: false
      };
    });
    words.forEach(w => {
      resetMap[w.id] = {
        wordId: w.id,
        status: 'new',
        correctCount: 0,
        incorrectCount: 0,
        isStarred: false
      };
    });

    const successProgress = safeSaveToLocalStorage('toeic-vocab-progress', []);
    const newStreak = { count: 0, lastStudyDate: '' };
    const successStreak = safeSaveToLocalStorage('toeic-vocab-streak', newStreak);

    if (successProgress && successStreak) {
      setProgress(resetMap);
      setStreak(newStreak);
      return true;
    }
    return false;
  };

  return {
    words,
    progress: progressState,
    streak: streakState,
    storageError,
    setStorageError,
    addCustomWord,
    updateWordStatus,
    incrementWordStats,
    recordStudySession,
    resetProgress,
    toggleWordStarred
  };
};

export default useVocabulary;
