import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest';

describe('Tier 3: Pairwise Cross-Feature Combination Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.setConfig({ testTimeout: 30000 });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const createCustomWord = async (user: ReturnType<typeof userEvent.setup>, wordDetails: Record<string, string>) => {
    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);
    const addWordBtn = screen.getByTestId('add-word-btn');
    await user.click(addWordBtn);

    await user.type(screen.getByTestId('form-word'), wordDetails.word);
    await user.selectOptions(screen.getByTestId('form-pos'), wordDetails.pos);
    await user.type(screen.getByTestId('form-definition'), wordDetails.definition);
    await user.type(screen.getByTestId('form-ipa'), wordDetails.ipa);
    await user.type(screen.getByTestId('form-example'), wordDetails.example);
    await user.type(screen.getByTestId('form-translation'), wordDetails.translation);
    await user.selectOptions(screen.getByTestId('form-topic'), wordDetails.topic);
    await user.selectOptions(screen.getByTestId('form-difficulty'), wordDetails.difficulty);

    const submitBtn = screen.getByTestId('form-submit-btn');
    await user.click(submitBtn);
  };

  test('T3.1: Custom word creation (F6) immediately synchronizes with the Library (F5) search/filters and LocalStorage (F7)', async () => {
    render(<App />);
    const user = userEvent.setup({ delay: null });

    const wordDetails = {
      word: 'synergy',
      pos: 'noun',
      definition: 'Combined action or cooperation',
      ipa: '/ˈsɪn.ə.dʒi/',
      example: 'Teamwork creates synergy.',
      translation: 'Sự cộng tác',
      topic: 'Office',
      difficulty: 'hard',
    };

    await createCustomWord(user, wordDetails);

    // Verify LocalStorage
    const customWords = localStorage.getItem('toeic-vocab-custom') || localStorage.getItem('vocab-custom');
    expect(customWords).toContain('synergy');

    // Search in Library
    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'synergy');
    let words = screen.getAllByTestId('dictionary-word');
    expect(words.some(w => w.textContent?.includes('synergy'))).toBe(true);

    // Filter by Topic & Difficulty
    const topicSelect = screen.getByTestId('topic-select');
    const difficultySelect = screen.getByTestId('difficulty-select');
    await user.selectOptions(topicSelect, 'Office');
    await user.selectOptions(difficultySelect, 'hard');
    words = screen.getAllByTestId('dictionary-word');
    expect(words.some(w => w.textContent?.includes('synergy'))).toBe(true);
  });

  test('T3.2: Custom word creation (F6) adds the word to the learning queue, making it available in Study Mode (F2)', async () => {
    render(<App />);
    const user = userEvent.setup({ delay: null });

    const wordDetails = {
      word: 'collaboration',
      pos: 'noun',
      definition: 'Working together',
      ipa: '/kəˌlæb.əˈreɪ.ʃən/',
      example: 'Successful collaboration is key.',
      translation: 'Sự hợp tác',
      topic: 'Office',
      difficulty: 'medium',
    };

    await createCustomWord(user, wordDetails);

    // Go to Study Tab
    const tabStudy = screen.getByTestId('tab-study');
    await user.click(tabStudy);

    // Cycle through active deck (max 10 words) to verify custom word exists
    let found = false;
    const nextBtn = screen.getByTestId('next-btn');
    for (let i = 0; i < 10; i++) {
      const frontFace = screen.getByTestId('flashcard-front');
      if (frontFace.textContent?.includes('collaboration')) {
        found = true;
        break;
      }
      await user.click(nextBtn);
    }
    expect(found).toBe(true);
  });

  test('T3.3: Studying a custom word in Study Mode (F2) changes its progress status in the Library (F5) and updates storage (F7)', async () => {
    render(<App />);
    const user = userEvent.setup({ delay: null });

    const wordDetails = {
      word: 'innovation',
      pos: 'noun',
      definition: 'New idea or method',
      ipa: '/ˌɪn.əˈveɪ.ʃən/',
      example: 'Innovation drives progress.',
      translation: 'Sự đổi mới',
      topic: 'Marketing',
      difficulty: 'easy',
    };

    await createCustomWord(user, wordDetails);

    // Navigate to Study Mode
    const tabStudy = screen.getByTestId('tab-study');
    await user.click(tabStudy);

    // Cycle to card
    const nextBtn = screen.getByTestId('next-btn');
    for (let i = 0; i < 10; i++) {
      const frontFace = screen.getByTestId('flashcard-front');
      if (frontFace.textContent?.includes('innovation')) break;
      await user.click(nextBtn);
    }

    // Set status to learning
    const learningBtn = screen.getByTestId('learning-btn');
    await user.click(learningBtn);

    // Check storage updates status
    const progressState = localStorage.getItem('toeic-vocab-progress') || localStorage.getItem('vocab-progress');
    expect(progressState).toContain('learning');

    // Check Library progress status filters
    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);
    const progressSelect = screen.getByTestId('progress-select');
    await user.selectOptions(progressSelect, 'learning');

    const words = screen.getAllByTestId('dictionary-word');
    expect(words.some(w => w.textContent?.includes('innovation'))).toBe(true);
  });

  test('T3.4: Custom words are successfully integrated into Test Mode (F3) question pools, updating test results (F4)', async () => {
    render(<App />);
    const user = userEvent.setup({ delay: null });

    // Add and Study Word
    await createCustomWord(user, {
      word: 'negotiate',
      pos: 'verb',
      definition: 'Discuss to reach agreement',
      ipa: '/nəˈɡəʊ.ʃi.eɪt/',
      example: 'We need to negotiate.',
      translation: 'Đàm phán',
      topic: 'Finance',
      difficulty: 'hard',
    });

    const tabStudy = screen.getByTestId('tab-study');
    await user.click(tabStudy);
    const nextBtn = screen.getByTestId('next-btn');
    for (let i = 0; i < 10; i++) {
      const frontFace = screen.getByTestId('flashcard-front');
      if (frontFace.textContent?.includes('negotiate')) break;
      await user.click(nextBtn);
    }
    await user.click(screen.getByTestId('learning-btn'));

    // Test Mode
    const tabTest = screen.getByTestId('tab-test');
    await user.click(tabTest);

    // Answering 10 questions
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

    // Verify Results screen
    expect(screen.getByTestId('test-results')).toBeInTheDocument();
    const progressState = localStorage.getItem('toeic-vocab-progress') || localStorage.getItem('vocab-progress');
    expect(progressState).toContain('negotiate');
  });

  test('T3.5: Test performance updates learning state to "mastered" (F7), removing it from Study queue (F2) and updating Library (F5)', async () => {
    // Seed initial progress for "agenda" as 'learning'
    const initialProgress = [
      { wordId: 'agenda', status: 'learning', correctCount: 2, incorrectCount: 0 }
    ];
    localStorage.setItem('toeic-vocab-progress', JSON.stringify(initialProgress));

    render(<App />);
    const user = userEvent.setup({ delay: null });

    const tabTest = screen.getByTestId('tab-test');
    await user.click(tabTest);

    // Complete test answering "agenda" correctly if present
    for (let i = 0; i < 10; i++) {
      const questionCard = screen.getByTestId('test-question');
      const options = screen.queryAllByTestId('option-btn');
      if (questionCard.textContent?.includes('agenda')) {
        const correctOption = options.find(opt => opt.textContent?.includes('Chương trình nghị sự') || opt.getAttribute('data-correct') === 'true');
        if (correctOption) {
          await user.click(correctOption);
        } else if (options.length > 0) {
          await user.click(options[0]);
        } else {
          const input = screen.queryByTestId('spelling-input');
          if (input) await user.type(input, 'agenda');
        }
      } else {
        if (options.length > 0) {
          await user.click(options[0]);
        } else {
          const input = screen.queryByTestId('spelling-input');
          if (input) await user.type(input, 'test');
        }
      }
      await user.click(screen.getByTestId('submit-question-btn'));
    }

    // Assert LocalStorage progress sets "agenda" status to "mastered"
    const progress = JSON.parse(localStorage.getItem('toeic-vocab-progress') || '[]');
    const agendaProg = progress.find((p: { wordId: string; status: string }) => p.wordId === 'agenda');
    expect(agendaProg.status).toBe('mastered');

    // Go to Study Tab and verify excluded
    const tabStudy = screen.getByTestId('tab-study');
    await user.click(tabStudy);
    const nextBtn = screen.getByTestId('next-btn');
    let found = false;
    for (let i = 0; i < 10; i++) {
      const frontFace = screen.getByTestId('flashcard-front');
      if (frontFace.textContent?.includes('agenda')) {
        found = true;
        break;
      }
      await user.click(nextBtn);
    }
    expect(found).toBe(false);

    // Go to Library and verify listed in 'mastered'
    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);
    const progressSelect = screen.getByTestId('progress-select');
    await user.selectOptions(progressSelect, 'mastered');
    const words = screen.getAllByTestId('dictionary-word');
    expect(words.some(w => w.textContent?.includes('agenda'))).toBe(true);
  });

  test('T3.6: Deleting/Resetting progress data in the Library (F5) resets streaks and stats (F7) and clears the study deck (F2)', async () => {
    localStorage.setItem('toeic-vocab-streak', JSON.stringify({ count: 5, lastStudyDate: new Date().toDateString() }));
    localStorage.setItem('toeic-vocab-progress', JSON.stringify([{ wordId: 'agenda', status: 'learning', correctCount: 1, incorrectCount: 1 }]));

    render(<App />);
    const user = userEvent.setup({ delay: null });

    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    const resetBtn = screen.getByTestId('reset-progress-btn');
    await user.click(resetBtn);

    const confirmBtn = screen.queryByTestId('confirm-reset-btn') || screen.queryByText(/confirm|yes/i);
    if (confirmBtn) await user.click(confirmBtn);

    // Streak & Progress cleared
    const streak = JSON.parse(localStorage.getItem('toeic-vocab-streak') || '{}');
    expect(streak.count).toBe(0);
    const progress = JSON.parse(localStorage.getItem('toeic-vocab-progress') || '[]');
    expect(progress.length).toBe(0);
  });

  test('T3.7: Adding a custom word with the same spelling as a built-in word behaves as a modification of the built-in definition and updates persistence', async () => {
    render(<App />);
    const user = userEvent.setup({ delay: null });

    // Overwrite default 'agenda' definition
    await createCustomWord(user, {
      word: 'agenda',
      pos: 'noun',
      definition: 'Lịch trình cuộc họp chi tiết',
      ipa: '/əˈdʒen.də/',
      example: 'Modified agenda.',
      translation: 'Chương trình nghị sự mới.',
      topic: 'Office',
      difficulty: 'easy',
    });

    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'agenda');

    const definitionEl = screen.getByTestId('word-definition');
    expect(definitionEl).toHaveTextContent('Lịch trình cuộc họp chi tiết');

    const customWords = localStorage.getItem('toeic-vocab-custom') || localStorage.getItem('vocab-custom');
    expect(customWords).toContain('Lịch trình cuộc họp chi tiết');
  });
});
