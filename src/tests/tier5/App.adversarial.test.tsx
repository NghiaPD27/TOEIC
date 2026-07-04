import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest';
import type { VocabularyWord, UserWordProgress } from '../../types';

// Control variables for dynamic state injection
let mockWords: VocabularyWord[] = [];
let mockProgress: Record<string, UserWordProgress> = {};
let mockStreak = { count: 0, lastStudyDate: '' };
let mockStorageError = false;

const mockAddCustomWord = vi.fn();
const mockUpdateWordStatus = vi.fn();
const mockIncrementWordStats = vi.fn();
const mockResetProgress = vi.fn();

vi.mock('../../hooks/useVocabulary', () => {
  const mockHook = () => ({
    words: mockWords,
    progress: mockProgress,
    streak: mockStreak,
    storageError: mockStorageError,
    addCustomWord: mockAddCustomWord,
    updateWordStatus: mockUpdateWordStatus,
    incrementWordStats: mockIncrementWordStats,
    resetProgress: mockResetProgress,
  });
  return {
    default: mockHook,
    useVocabulary: mockHook,
  };
});

describe('Tier 5: Adversarial UI and State Sync Tests', () => {
  beforeEach(() => {
    // Reset mock variables to healthy defaults
    mockWords = [
      { id: '1', word: 'synergy', partOfSpeech: 'noun', ipa: '/s/', definition: 'synergy def', example: 'synergy ex', exampleTranslation: 'synergy trans', topic: 'Office', difficulty: 'easy' },
      { id: '2', word: 'agenda', partOfSpeech: 'noun', ipa: '/a/', definition: 'agenda def', example: 'agenda ex', exampleTranslation: 'agenda trans', topic: 'Office', difficulty: 'easy' },
      { id: '3', word: 'cherry', partOfSpeech: 'noun', ipa: '/c/', definition: 'cherry def', example: 'cherry ex', exampleTranslation: 'cherry trans', topic: 'Office', difficulty: 'easy' },
      { id: '4', word: 'date', partOfSpeech: 'noun', ipa: '/d/', definition: 'date def', example: 'date ex', exampleTranslation: 'date trans', topic: 'Office', difficulty: 'easy' },
      { id: '5', word: 'elderberry', partOfSpeech: 'noun', ipa: '/e/', definition: 'elderberry def', example: 'elderberry ex', exampleTranslation: 'elderberry trans', topic: 'Office', difficulty: 'easy' },
      { id: '6', word: 'fig', partOfSpeech: 'noun', ipa: '/f/', definition: 'fig def', example: 'fig ex', exampleTranslation: 'fig trans', topic: 'Office', difficulty: 'easy' },
      { id: '7', word: 'grape', partOfSpeech: 'noun', ipa: '/g/', definition: 'grape def', example: 'grape ex', exampleTranslation: 'grape trans', topic: 'Office', difficulty: 'easy' },
      { id: '8', word: 'honeydew', partOfSpeech: 'noun', ipa: '/h/', definition: 'honeydew def', example: 'honeydew ex', exampleTranslation: 'honeydew trans', topic: 'Office', difficulty: 'easy' },
      { id: '9', word: 'itinerary', partOfSpeech: 'noun', ipa: '/i/', definition: 'itinerary def', example: 'itinerary ex', exampleTranslation: 'itinerary trans', topic: 'Office', difficulty: 'easy' },
      { id: '10', word: 'jargon', partOfSpeech: 'noun', ipa: '/j/', definition: 'jargon def', example: 'jargon ex', exampleTranslation: 'jargon trans', topic: 'Office', difficulty: 'easy' },
      { id: '11', word: 'kumquat', partOfSpeech: 'noun', ipa: '/k/', definition: 'kumquat def', example: 'kumquat ex', exampleTranslation: 'kumquat trans', topic: 'Office', difficulty: 'easy' }
    ];
    mockProgress = {
      '1': { wordId: '1', status: 'new', correctCount: 0, incorrectCount: 0 },
      '2': { wordId: '2', status: 'new', correctCount: 0, incorrectCount: 0 },
      '3': { wordId: '3', status: 'new', correctCount: 0, incorrectCount: 0 },
      '4': { wordId: '4', status: 'new', correctCount: 0, incorrectCount: 0 },
      '5': { wordId: '5', status: 'new', correctCount: 0, incorrectCount: 0 },
      '6': { wordId: '6', status: 'new', correctCount: 0, incorrectCount: 0 },
      '7': { wordId: '7', status: 'new', correctCount: 0, incorrectCount: 0 },
      '8': { wordId: '8', status: 'new', correctCount: 0, incorrectCount: 0 },
      '9': { wordId: '9', status: 'new', correctCount: 0, incorrectCount: 0 },
      '10': { wordId: '10', status: 'new', correctCount: 0, incorrectCount: 0 },
      '11': { wordId: '11', status: 'new', correctCount: 0, incorrectCount: 0 }
    };
    mockStreak = { count: 3, lastStudyDate: new Date().toDateString() };
    mockStorageError = false;

    mockAddCustomWord.mockReset();
    mockUpdateWordStatus.mockReset();
    mockIncrementWordStats.mockReset();
    mockResetProgress.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('T5.1: Test Tab Self-Navigation Confirmation Warning Bug', async () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false);
    render(<App />);
    const user = userEvent.setup();

    // Navigate to Test tab
    const tabTest = screen.getByTestId('tab-test');
    await user.click(tabTest);

    // Verify we are in Test Mode (question is rendered)
    expect(screen.getByTestId('test-question')).toBeInTheDocument();

    // Click the active Test tab button AGAIN
    confirmSpy.mockClear();
    await user.click(tabTest);

    // Expected behavior: Since we are not leaving the Test tab, window.confirm should NOT be called.
    // Buggy behavior: It gets called anyway because it checks activeTab === 'test' without checking newTab.
    expect(confirmSpy).not.toHaveBeenCalled();
  });

  test('T5.2: SpeechSynthesis Auto-Pronunciation Memory Leak/Audio Bleed Across Tab Transitions', async () => {
    const cancelSpy = vi.spyOn(window.speechSynthesis, 'cancel');
    render(<App />);
    const user = userEvent.setup();

    // Navigate to Test tab
    const tabTest = screen.getByTestId('tab-test');
    await user.click(tabTest);

    // Advance to Question 3 (index 2), which is the Listening question type
    // Index 0: Multiple-choice, Index 1: Spelling, Index 2: Listening
    const submitBtn = screen.getByTestId('submit-question-btn');
    await user.click(submitBtn); // Submit Q1
    await user.click(submitBtn); // Submit Q2

    // Now we are on Q3 (Listening), which auto-triggers speak()
    expect(screen.getByText(/Listen to the pronunciation/i)).toBeInTheDocument();

    // Reset cancel spy to watch tab transition behavior
    cancelSpy.mockClear();

    // Navigate away to Dashboard tab
    const tabDashboard = screen.getByTestId('tab-dashboard');
    await user.click(tabDashboard);

    // Expected behavior: Speech should be immediately cancelled to avoid background audio bleed.
    // Buggy behavior: speech is left orphan/playing in the background.
    expect(cancelSpy).toHaveBeenCalled();
  });

  test('T5.3: Navigation Header Controls Bypass During Modal Display', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Go to Library tab
    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    // Open Add Custom Word modal
    const addWordBtn = screen.getByTestId('add-word-btn');
    await user.click(addWordBtn);
    expect(screen.getByTestId('form-word')).toBeInTheDocument();

    // Check if the Dashboard tab is disabled or throws/prevents click
    const tabDashboard = screen.getByTestId('tab-dashboard');
    
    // Expected behavior: Tab buttons should be disabled (or have disabled attribute/pointer-events-none)
    // when a modal overlays the screen.
    // Buggy behavior: Navigation remains fully active.
    expect(tabDashboard).toBeDisabled();
  });

  test('T5.4: Inconsistent Case-Insensitive Validation for Duplicate Custom Words', async () => {
    // Setup mockWords containing a custom word "mycustomword"
    mockWords = [
      {
        id: 'custom-1',
        word: 'mycustomword',
        partOfSpeech: 'noun',
        ipa: '/m/',
        definition: 'custom def',
        example: 'custom ex',
        exampleTranslation: 'custom trans',
        topic: 'Office',
        difficulty: 'easy',
        isCustom: true
      }
    ];
    mockProgress = {
      'custom-1': { wordId: 'custom-1', status: 'new', correctCount: 0, incorrectCount: 0 }
    };

    render(<App />);
    const user = userEvent.setup();

    // Go to Library tab
    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    // Open Add Custom Word modal
    const addWordBtn = screen.getByTestId('add-word-btn');
    await user.click(addWordBtn);

    // Fill out form with word "MyCustomWord" (case-insensitive duplicate of the existing custom word)
    await user.type(screen.getByTestId('form-word'), 'MyCustomWord');
    await user.selectOptions(screen.getByTestId('form-pos'), 'noun');
    await user.type(screen.getByTestId('form-definition'), 'Another definition');
    await user.type(screen.getByTestId('form-ipa'), '/m/');
    await user.type(screen.getByTestId('form-example'), 'Example sentence');
    await user.type(screen.getByTestId('form-translation'), 'Translation');

    const submitBtn = screen.getByTestId('form-submit-btn');
    await user.click(submitBtn);

    // Expected behavior: Form validation blocks it and shows an error "Word already exists"
    const errorMsg = screen.queryByTestId('form-error-message');
    expect(errorMsg).toBeInTheDocument();
    expect(errorMsg?.textContent).toContain('Word already exists');
  });

  test('T5.5: SpeechSynthesis Exception Safety in Unsupported/Restricted Environments', async () => {
    // Directly assign window.speechSynthesis to undefined to simulate unsupported environment
    const originalSpeechSynthesis = window.speechSynthesis;
    (window as unknown as { speechSynthesis: SpeechSynthesis | undefined }).speechSynthesis = undefined;

    render(<App />);
    const user = userEvent.setup();

    // Navigate to Study tab
    const tabStudy = screen.getByTestId('tab-study');
    await user.click(tabStudy);

    // Flip card to reveal back face containing the speaker button
    const flashcard = screen.getByTestId('flashcard');
    await user.click(flashcard);

    const speakerBtn = screen.getByTestId('speaker-btn');

    // Expected behavior: Clicking the speaker should fail gracefully without throwing a crash
    // Buggy behavior: Code tries to read properties of undefined (cancel) and crashes React
    let threwError = false;
    try {
      await user.click(speakerBtn);
    } catch {
      threwError = true;
    }

    // Restore original
    (window as unknown as { speechSynthesis: SpeechSynthesis | undefined }).speechSynthesis = originalSpeechSynthesis;

    expect(threwError).toBe(false);
  });

  test('T5.6: Study Mode Index Out-of-Bounds Crash on Dynamic Pool Shrinkage', async () => {
    // Start with 3 words
    mockWords = [
      { id: '1', word: 'synergy', partOfSpeech: 'noun', ipa: '/s/', definition: 'synergy def', example: 'synergy ex', exampleTranslation: 'synergy trans', topic: 'Office', difficulty: 'easy' },
      { id: '2', word: 'agenda', partOfSpeech: 'noun', ipa: '/a/', definition: 'agenda def', example: 'agenda ex', exampleTranslation: 'agenda trans', topic: 'Office', difficulty: 'easy' },
      { id: '3', word: 'cherry', partOfSpeech: 'noun', ipa: '/c/', definition: 'cherry def', example: 'cherry ex', exampleTranslation: 'cherry trans', topic: 'Office', difficulty: 'easy' }
    ];
    mockProgress = {
      '1': { wordId: '1', status: 'new', correctCount: 0, incorrectCount: 0 },
      '2': { wordId: '2', status: 'new', correctCount: 0, incorrectCount: 0 },
      '3': { wordId: '3', status: 'new', correctCount: 0, incorrectCount: 0 }
    };

    const { rerender } = render(<App />);
    const user = userEvent.setup();

    // Go to Study tab
    const tabStudy = screen.getByTestId('tab-study');
    await user.click(tabStudy);

    // Deck size should be 3
    expect(screen.getByText(/Card 1 of 3/i)).toBeInTheDocument();

    // Go to Card 3 (index 2)
    const nextBtn = screen.getByTestId('next-btn');
    await user.click(nextBtn);
    await user.click(nextBtn);
    expect(screen.getByText(/Card 3 of 3/i)).toBeInTheDocument();

    // Now shrink mockWords to 1 word dynamically (simulating dynamic pool shrinkage)
    mockWords = [
      { id: '1', word: 'synergy', partOfSpeech: 'noun', ipa: '/s/', definition: 'synergy def', example: 'synergy ex', exampleTranslation: 'synergy trans', topic: 'Office', difficulty: 'easy' }
    ];
    mockProgress = {
      '1': { wordId: '1', status: 'new', correctCount: 0, incorrectCount: 0 }
    };

    // Expected behavior: Re-rendering does not crash, index is normalized to 0 safely.
    // Buggy behavior: Tries to render studyDeck[2].difficulty immediately and crashes with a TypeError.
    let threwError = false;
    try {
      rerender(<App />);
    } catch {
      threwError = true;
    }

    expect(threwError).toBe(false);
  });

  test('T5.7: Reset Progress Failure State Synchronization under Storage Quota Limits', async () => {
    // When resetProgress is called, our mock implementation does mockResetProgress().
    // If it fails to sync properly or mockResetProgress is called but state isn't reset, let's see.
    // Wait, since we are mocking the hook, we want to test if App component handles the case where reset progress is triggered but fails.
    // Wait! In App.tsx:
    // When "Confirm" is clicked in the resetProgress modal:
    // It calls resetProgress() from useVocabulary.
    // But since resetProgress() does not return anything, does App know if it succeeded or failed?
    // Let's check App.tsx line 1054:
    // ```tsx
    // <button
    //   data-testid="confirm-reset-btn"
    //   onClick={() => {
    //     resetProgress();
    //     setShowResetConfirm(false);
    //   }}
    // ```
    // It calls resetProgress() and closes the modal immediately! It doesn't check if it was successful or show any error.
    // If resetProgress fails internally, the progressState remains un-reset.
    // Let's test that if resetProgress() is called, but localStorage throws a QuotaExceededError (which we can simulate), the app warns the user or handles it gracefully.
    // Wait! Let's check what the actual useVocabulary hook does when resetProgress fails.
    // If `safeSaveToLocalStorage` returns `false`, `setProgress(resetMap)` is NOT called in `useVocabulary.ts`.
    // So the in-memory React state is NOT reset.
    // But the modal closed, and no error message is displayed on the screen! The user has no idea why their progress is still there.
    // Let's assert that if resetProgress fails (e.g. mockResetProgress does not change progressState because it failed), the UI shows an error or keeps the modal open/warns.
    // Currently, it does neither. The test will expect the UI to handle the failure (e.g., keeping modal open or showing error), which will fail, documenting the bug.
    
    render(<App />);
    const user = userEvent.setup();

    // Go to Library tab
    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    // Click reset progress button
    const resetBtn = screen.getByTestId('reset-progress-btn');
    await user.click(resetBtn);

    // Click confirm reset
    const confirmResetBtn = screen.getByTestId('confirm-reset-btn');
    await user.click(confirmResetBtn);

    // Expected behavior: If resetProgress fails to clear storage, the UI should indicate a failure or warning.
    // Since we didn't update the mock progress state (simulating a failed reset), we expect the UI to show a warning or not close the modal.
    // Buggy behavior: The modal closes silently, and the UI remains completely un-reset with no error message.
    expect(screen.queryByTestId('quota-warning') || screen.queryByText(/failed/i)).toBeInTheDocument();
  });
});
