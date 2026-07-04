import { render, screen, renderHook, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, describe, beforeEach, vi, afterEach } from 'vitest';
import App from '../../App';
import useVocabulary from '../../hooks/useVocabulary';
import type { VocabularyWord } from '../../types';

// Let mockVocab be mutable so we can test different sizes (including empty or small datasets)
let mockVocab: VocabularyWord[] = [];

// Mock the vocabulary module so useVocabulary loads mockVocab instead of the 100 default words
vi.mock('../../data/vocabulary', () => {
  return {
    get defaultVocabulary() {
      return mockVocab;
    }
  };
});

const defaultTestVocabulary: VocabularyWord[] = [
  {
    id: 'agenda',
    word: 'agenda',
    partOfSpeech: 'noun',
    ipa: '/əˈdʒen.də/',
    definition: 'Chương trình nghị sự',
    example: 'The agenda for the meeting was sent out yesterday.',
    exampleTranslation: 'Chương trình nghị sự cho cuộc họp đã được gửi vào ngày hôm qua.',
    topic: 'Office',
    difficulty: 'easy'
  },
  {
    id: 'promotion',
    word: 'promotion',
    partOfSpeech: 'noun',
    ipa: '/prəˈməʊ.ʃən/',
    definition: 'Sự thăng chức, quảng bá',
    example: 'She received a promotion after working hard.',
    exampleTranslation: 'Cô ấy nhận được sự thăng chức sau khi làm việc chăm chỉ.',
    topic: 'Personnel',
    difficulty: 'easy'
  }
];

describe('Tier 5: useVocabulary & App Adversarial Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    // Default mockVocab to have our 2 test words
    mockVocab = [...defaultTestVocabulary];
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2026-07-04T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  // ==========================================
  // CATEGORY 1: Local Storage Corruption & Type Pollution
  // ==========================================

  test('ADV-1.1: Malformed progress state allows status type pollution and negative counts (Asserting Expected Sanitization)', () => {
    const malformedProgress = [
      {
        wordId: 'agenda',
        status: 'invalid-status-value', // Type pollution
        correctCount: -10,              // Malformed negative count
        incorrectCount: 5
      }
    ];
    localStorage.setItem('toeic-vocab-progress', JSON.stringify(malformedProgress));

    const { result } = renderHook(() => useVocabulary());

    // EXPECTED: The hook should sanitize the status to 'new' and negative counts to 0.
    // ACTUAL (BUG): It loads the polluted status and negative count directly.
    expect(result.current.progress['agenda'].status).toBe('new');
    expect(result.current.progress['agenda'].correctCount).toBe(0);
  });

  test('ADV-1.2: Corrupt custom words (non-array) local storage recovers gracefully', () => {
    localStorage.setItem('toeic-vocab-custom', JSON.stringify({ error: 'not-an-array' }));

    const { result } = renderHook(() => useVocabulary());

    // Recovery is successful in useVocabulary.ts (falls back to defaultVocabulary)
    expect(result.current.words.length).toBe(mockVocab.length);
  });

  // ==========================================
  // CATEGORY 2: Learning Streak Calculations & Date Edge Cases
  // ==========================================

  test('ADV-2.1: Negative streak count is sanitized on initialization (Asserting Expected Sanitization)', () => {
    localStorage.setItem(
      'toeic-vocab-streak',
      JSON.stringify({ count: -5, lastStudyDate: new Date('2026-07-03T12:00:00Z').toDateString() })
    );

    const { result } = renderHook(() => useVocabulary());

    // EXPECTED: Streak count should be sanitized to 0.
    // ACTUAL (BUG): Negative count -5 is loaded directly.
    expect(result.current.streak.count).toBe(0);
  });

  test('ADV-2.2: Future date streak count is reset on initialization', () => {
    localStorage.setItem(
      'toeic-vocab-streak',
      JSON.stringify({ count: 5, lastStudyDate: new Date('2026-07-05T12:00:00Z').toDateString() })
    );

    const { result } = renderHook(() => useVocabulary());

    // This passes because useVocabulary has a check resetting expired/future streaks
    expect(result.current.streak.count).toBe(0);
    expect(result.current.streak.lastStudyDate).toBe('');
  });

  // ==========================================
  // CATEGORY 3: Adding Duplicate or Empty Custom Words
  // ==========================================

  test('ADV-3.1: Whitespace-only custom words are rejected in addCustomWord (Asserting Expected Rejection)', () => {
    const { result } = renderHook(() => useVocabulary());

    act(() => {
      result.current.addCustomWord({
        word: '   ', // whitespace only
        partOfSpeech: 'noun',
        ipa: '/ /',
        definition: 'Blank word definition',
        example: 'example text',
        exampleTranslation: 'translation text',
        topic: 'Office',
        difficulty: 'easy'
      });
    });

    // EXPECTED: The custom word with empty spelling should be rejected and not added.
    // ACTUAL (BUG): The hook trims it to "" and successfully adds and saves it.
    const emptyWord = result.current.words.find(w => w.word.trim() === '');
    expect(emptyWord).toBeUndefined();
  });

  test('ADV-3.2: Custom word sanitization is applied during addCustomWord insertion (Asserting Expected Sanitization)', () => {
    const { result } = renderHook(() => useVocabulary());

    act(() => {
      result.current.addCustomWord({
        word: 'SanitizationTest',
        partOfSpeech: 'noun',
        ipa: '/ /',
        definition: 'definition text',
        example: 'example text',
        exampleTranslation: 'translation text',
        topic: 'InvalidTopic' as unknown as 'Office',      // Invalid topic
        difficulty: 'super-hard' as unknown as 'easy'    // Invalid difficulty
      });
    });

    const customWord = result.current.words.find(w => w.word === 'SanitizationTest');
    expect(customWord).toBeDefined();

    // EXPECTED: Invalid fields should be normalized to defaults ('Office' and 'medium').
    // ACTUAL (BUG): The newly added word is inserted directly without sanitization, leaving raw invalid fields.
    expect(customWord?.topic).toBe('Office');
    expect(customWord?.difficulty).toBe('medium');
  });

  // ==========================================
  // CATEGORY 4: State Synchronization & Orphaned Records
  // ==========================================

  test('ADV-4.1: Orphaned progress records are not generated for invalid/non-existent word IDs (Asserting Expected Behavior)', () => {
    const { result } = renderHook(() => useVocabulary());

    act(() => {
      result.current.updateWordStatus('non-existent-word-id', 'learning');
    });

    // EXPECTED: No progress record should be created for a word that does not exist in vocabulary.
    // ACTUAL (BUG): Progress record is created, saved to LocalStorage, causing orphaned record bloat.
    expect(result.current.progress['non-existent-word-id']).toBeUndefined();
  });

  // ==========================================
  // CATEGORY 5: Study/Test List Generation with Small/Empty Datasets
  // ==========================================

  test('ADV-5.1: Empty vocabulary does not crash the App and is handled gracefully', () => {
    // Completely empty vocabulary database
    mockVocab = [];

    // EXPECTED: The App renders without crashing and shows an empty state or handles it safely.
    // ACTUAL: Clicking the Test tab with an empty vocabulary will trigger a TypeError and crash.
    render(<App />);

    // Check that we can navigate to study mode safely without crashing
    const studyTab = screen.getByTestId('tab-study');
    act(() => {
      studyTab.click();
    });
    expect(screen.getByText(/No words available for study/i)).toBeInTheDocument();
  });

  test('ADV-5.2: Test Mode crashes when database is completely empty (Asserting App Crash)', async () => {
    mockVocab = [];
    render(<App />);
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime, delay: null });

    const testTab = screen.getByTestId('tab-test');

    // EXPECTED: App should show an empty test state or a warning.
    // ACTUAL (BUG): It crashes with a TypeError: Cannot read properties of undefined (reading 'type')
    // We let the test fail due to the unhandled TypeError, documenting the bug.
    await user.click(testTab);
  });

  test('ADV-5.3: Multiple choice test questions contain insufficient distractors with small vocabulary (Asserting Distractor Contract)', async () => {
    // Vocabulary pool size is 2 (less than 4)
    mockVocab = [...defaultTestVocabulary];
    render(<App />);
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime, delay: null });

    // Navigate to Test Mode to generate questions
    const testTab = screen.getByTestId('tab-test');
    await user.click(testTab);

    // Verify first question is multiple choice
    const questionText = screen.getByTestId('test-question');
    expect(questionText).toBeInTheDocument();

    // Find option buttons
    const options = screen.getAllByTestId('option-btn');

    // EXPECTED: Multiple choice questions must always offer exactly 4 choices (1 correct + 3 unique distractors).
    // ACTUAL (BUG): With only 2 words, it only displays 2 choices.
    expect(options.length).toBe(4);
  });

  // ==========================================
  // CATEGORY 6: Storage QuotaExceededError Handling
  // ==========================================

  test('ADV-6.1: safeSaveToLocalStorage sets storageError state upon QuotaExceededError', () => {
    const { result } = renderHook(() => useVocabulary());

    const setItemSpy = vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new DOMException('The quota has been exceeded.', 'QuotaExceededError');
    });

    act(() => {
      result.current.updateWordStatus('agenda', 'learning');
    });

    // This passes because useVocabulary correctly catches and sets storageError
    expect(result.current.storageError).toBe(true);

    setItemSpy.mockRestore();
  });
});
