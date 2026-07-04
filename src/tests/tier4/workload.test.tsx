import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest';
import confetti from 'canvas-confetti';
import { defaultVocabulary } from '../../data/vocabulary';

describe('Tier 4: Real-world User Scenario Workloads', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.setConfig({ testTimeout: 30000 });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test('T4.1: New User Journey', async () => {
    vi.mocked(confetti).mockClear();
    render(<App />);
    const user = userEvent.setup({ delay: null });

    // 1. Initialized database verification
    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);
    const totalWords = screen.getAllByTestId('dictionary-word');
    expect(totalWords.length).toBeGreaterThanOrEqual(100);

    // 2. Search for "agenda"
    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'agenda');
    expect(screen.getByText(/agenda/i)).toBeInTheDocument();
    await user.clear(searchInput);

    // 3. Study 10 words
    const tabStudy = screen.getByTestId('tab-study');
    await user.click(tabStudy);

    const nextBtn = screen.getByTestId('next-btn');
    const learningBtn = screen.getByTestId('learning-btn');
    const flashcard = screen.getByTestId('flashcard');
    const speakSpy = vi.spyOn(window.speechSynthesis, 'speak');

    for (let i = 0; i < 10; i++) {
      await user.click(flashcard); // Flip
      const speakerBtn = screen.getByTestId('speaker-btn');
      await user.click(speakerBtn); // TTS
      expect(speakSpy).toHaveBeenCalled();
      speakSpy.mockClear();

      await user.click(learningBtn); // Mark learning
      if (i < 9) await user.click(nextBtn);
    }

    // 4. Take first Test
    const tabTest = screen.getByTestId('tab-test');
    await user.click(tabTest);

    for (let i = 0; i < 10; i++) {
      const options = screen.queryAllByTestId('option-btn');
      if (options.length > 0) {
        await user.click(options[0]);
      } else {
        const input = screen.queryByTestId('spelling-input');
        if (input) await user.type(input, 'test');
      }
      await user.click(screen.getByTestId('submit-question-btn'));
    }

    // 5. Results & Confetti
    expect(screen.getByTestId('test-results')).toBeInTheDocument();
    expect(confetti).toHaveBeenCalled();

    // 6. Check Dashboard Streak
    const tabDashboard = screen.getByTestId('tab-dashboard');
    await user.click(tabDashboard);
    const streakCount = screen.getByTestId('streak-count');
    expect(Number(streakCount.textContent)).toBe(1);
  });

  test('T4.2: Customization and Mastery Loop', async () => {
    render(<App />);
    const user = userEvent.setup({ delay: null });

    // 1. Add custom word "incentive"
    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);
    const addWordBtn = screen.getByTestId('add-word-btn');
    await user.click(addWordBtn);

    await user.type(screen.getByTestId('form-word'), 'incentive');
    await user.selectOptions(screen.getByTestId('form-pos'), 'noun');
    await user.type(screen.getByTestId('form-definition'), 'Something that encourages action');
    await user.type(screen.getByTestId('form-ipa'), '/ɪnˈsen.tɪv/');
    await user.type(screen.getByTestId('form-example'), 'Money is a good incentive.');
    await user.type(screen.getByTestId('form-translation'), 'Sự khuyến khích');
    await user.selectOptions(screen.getByTestId('form-topic'), 'Finance');
    await user.selectOptions(screen.getByTestId('form-difficulty'), 'easy');
    await user.click(screen.getByTestId('form-submit-btn'));

    // Search and verify presence
    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'incentive');
    expect(screen.getAllByTestId('dictionary-word')[0]).toHaveTextContent('incentive');
    await user.clear(searchInput);

    // 2. Study "incentive"
    const tabStudy = screen.getByTestId('tab-study');
    await user.click(tabStudy);
    const nextBtn = screen.getByTestId('next-btn');
    for (let i = 0; i < 10; i++) {
      const frontFace = screen.getByTestId('flashcard-front');
      if (frontFace.textContent?.includes('incentive')) break;
      await user.click(nextBtn);
    }
    await user.click(screen.getByTestId('learning-btn'));

    // 3. Take test and answer correctly
    const tabTest = screen.getByTestId('tab-test');
    await user.click(tabTest);

    for (let i = 0; i < 10; i++) {
      const questionCard = screen.getByTestId('test-question');
      const wordId = questionCard.getAttribute('data-word-id') || '';
      const options = screen.queryAllByTestId('option-btn');
      if (questionCard.textContent?.includes('incentive') || wordId.includes('incentive')) {
        const correctOption = options.find(opt => opt.textContent?.includes('Something that encourages action') || opt.getAttribute('data-correct') === 'true');
        if (correctOption) {
          await user.click(correctOption);
        } else if (options.length > 0) {
          await user.click(options[0]);
        } else {
          const input = screen.queryByTestId('spelling-input');
          if (input) await user.type(input, 'incentive');
        }
      } else {
        if (options.length > 0) {
          await user.click(options[0]);
        } else {
          const input = screen.queryByTestId('spelling-input');
          const wordObj = defaultVocabulary.find(w => w.id === wordId);
          if (wordObj && input) {
            await user.type(input, wordObj.word);
          } else if (input) {
            await user.type(input, 'test');
          }
        }
      }
      await user.click(screen.getByTestId('submit-question-btn'));
    }

    // 4. Verify Library status is mastered
    await user.click(tabLibrary);
    const searchInputOnRemount = screen.getByTestId('search-input');
    await user.type(searchInputOnRemount, 'incentive');
    const progressSelect = screen.getByTestId('progress-select');
    await user.selectOptions(progressSelect, 'mastered');
    expect(screen.getAllByTestId('dictionary-word')[0]).toHaveTextContent('incentive');
    await user.clear(searchInputOnRemount);

    // 5. Excluded from next study deck
    await user.click(tabStudy);
    let found = false;
    for (let i = 0; i < 10; i++) {
      const frontFace = screen.getByTestId('flashcard-front');
      if (frontFace.textContent?.includes('incentive')) {
        found = true;
        break;
      }
      await user.click(nextBtn);
    }
    expect(found).toBe(false);
  });

  test('T4.3: Multi-day Streaks (mock time shifts)', async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    const baseTime = new Date('2026-07-04T10:00:00Z');
    vi.setSystemTime(baseTime);

    render(<App />);
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime, delay: null });

    // Day 1 Study
    const tabStudy = screen.getByTestId('tab-study');
    await user.click(tabStudy);
    await user.click(screen.getByTestId('learning-btn'));
    const tabDashboard = screen.getByTestId('tab-dashboard');
    await user.click(tabDashboard);
    expect(Number(screen.getByTestId('streak-count').textContent)).toBe(1);

    // Day 2 (Advance 26 hours)
    vi.setSystemTime(new Date(baseTime.getTime() + 26 * 60 * 60 * 1000));
    await user.click(tabStudy);
    await user.click(screen.getByTestId('learning-btn'));
    await user.click(tabDashboard);
    expect(Number(screen.getByTestId('streak-count').textContent)).toBe(2);

    // Day 4 (Advance 50 hours - miss Day 3)
    vi.setSystemTime(new Date(baseTime.getTime() + 76 * 60 * 60 * 1000));
    await user.click(tabStudy);
    await user.click(screen.getByTestId('learning-btn'));
    await user.click(tabDashboard);
    expect(Number(screen.getByTestId('streak-count').textContent)).toBe(1);
    
    vi.useRealTimers();
  });

  test('T4.4: Test Mastery Loop', async () => {
    render(<App />);
    const user = userEvent.setup({ delay: null });

    // Study 20 words (2 iterations of study loading)
    const tabStudy = screen.getByTestId('tab-study');
    await user.click(tabStudy);
    const nextBtn = screen.getByTestId('next-btn');
    const learningBtn = screen.getByTestId('learning-btn');

    for (let i = 0; i < 10; i++) {
      await user.click(learningBtn);
      if (i < 9) await user.click(nextBtn);
    }
    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);
    await user.click(tabStudy);

    for (let i = 0; i < 10; i++) {
      await user.click(learningBtn);
      if (i < 9) await user.click(nextBtn);
    }

    // Start Test
    const tabTest = screen.getByTestId('tab-test');
    await user.click(tabTest);

    // Record the first 3 words to fail them
    const failedWordIds: string[] = [];

    for (let i = 0; i < 10; i++) {
      const questionCard = screen.getByTestId('test-question');
      const wordId = questionCard.getAttribute('data-word-id') || '';
      const options = screen.queryAllByTestId('option-btn');

      if (i < 3) {
        failedWordIds.push(wordId);
        // Answer wrong choice
        const wrongOption = options.find(opt => opt.getAttribute('data-correct') === 'false');
        if (wrongOption) {
          await user.click(wrongOption);
        } else if (options.length > 0) {
          await user.click(options[0]);
        } else {
          const input = screen.queryByTestId('spelling-input');
          if (input) await user.type(input, 'wrongspelling');
        }
      } else {
        const correctOption = options.find(opt => opt.getAttribute('data-correct') === 'true');
        if (correctOption) {
          await user.click(correctOption);
        } else if (options.length > 0) {
          await user.click(options[0]);
        } else {
          const input = screen.queryByTestId('spelling-input');
          const wordObj = defaultVocabulary.find(w => w.id === wordId);
          if (wordObj && input) {
            await user.type(input, wordObj.word);
          }
        }
      }
      await user.click(screen.getByTestId('submit-question-btn'));
    }

    // Verify 3 words are failed in Review
    expect(screen.getByTestId('test-results')).toBeInTheDocument();
    const reviewItems = screen.getAllByTestId('review-item');
    failedWordIds.forEach(id => {
      const item = reviewItems.find(r => r.getAttribute('data-word-id') === id);
      expect(item).toHaveAttribute('data-status', 'incorrect');
    });

    // Retake Test
    const retakeBtn = screen.getByTestId('retake-test-btn');
    await user.click(retakeBtn);

    // Answer correctly now
    let containsFailedWords = false;
    for (let i = 0; i < 10; i++) {
      const questionCard = screen.getByTestId('test-question');
      const wordId = questionCard.getAttribute('data-word-id') || '';
      if (failedWordIds.includes(wordId)) containsFailedWords = true;

      const options = screen.queryAllByTestId('option-btn');
      const correctOption = options.find(opt => opt.getAttribute('data-correct') === 'true');
      if (correctOption) {
        await user.click(correctOption);
      } else if (options.length > 0) {
        await user.click(options[0]);
      } else {
        const input = screen.queryByTestId('spelling-input');
        const wordObj = defaultVocabulary.find(w => w.id === wordId);
        if (wordObj && input) {
          await user.type(input, wordObj.word);
        }
      }
      await user.click(screen.getByTestId('submit-question-btn'));
    }
    expect(containsFailedWords).toBe(true);

    // Validate progress stats
    const progress = JSON.parse(localStorage.getItem('toeic-vocab-progress') || '[]');
    failedWordIds.forEach(id => {
      const wordP = progress.find((p: { wordId: string; correctCount: number }) => p.wordId === id);
      expect(wordP.correctCount).toBeGreaterThanOrEqual(1);
    });
  });

  test('T4.5: Data Recovery (Reload App Persistence)', async () => {
    const { unmount } = render(<App />);
    const user = userEvent.setup({ delay: null });

    // Add custom word
    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);
    const addWordBtn = screen.getByTestId('add-word-btn');
    await user.click(addWordBtn);

    await user.type(screen.getByTestId('form-word'), 'synergy');
    await user.selectOptions(screen.getByTestId('form-pos'), 'noun');
    await user.type(screen.getByTestId('form-definition'), 'Combined action');
    await user.type(screen.getByTestId('form-ipa'), '/ˈsɪn.ə.dʒi/');
    await user.type(screen.getByTestId('form-example'), 'Teamwork creates synergy.');
    await user.type(screen.getByTestId('form-translation'), 'Sự cộng tác');
    await user.selectOptions(screen.getByTestId('form-topic'), 'Office');
    await user.selectOptions(screen.getByTestId('form-difficulty'), 'hard');
    await user.click(screen.getByTestId('form-submit-btn'));

    // Establish streak
    const tabStudy = screen.getByTestId('tab-study');
    await user.click(tabStudy);
    await user.click(screen.getByTestId('learning-btn'));

    const tabDashboard = screen.getByTestId('tab-dashboard');
    await user.click(tabDashboard);
    const initialStreak = screen.getByTestId('streak-count').textContent;

    // Simulate reload
    unmount();

    render(<App />);

    // Assert states recovered
    const tabDashboard2 = screen.getByTestId('tab-dashboard');
    await user.click(tabDashboard2);
    expect(screen.getByTestId('streak-count').textContent).toBe(initialStreak);

    const tabLibrary2 = screen.getByTestId('tab-library');
    await user.click(tabLibrary2);
    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'synergy');
    expect(screen.getAllByTestId('dictionary-word')[0]).toHaveTextContent('synergy');
  });
});
