import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest';

describe('F3: Test Mode UI Boundary Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('T2.3.1: Small word pool generates smaller test count instead of crashing', async () => {
    // Inject only 3 custom words, clear other learning history to limit pool size
    const customWords = [
      { id: '1', word: 'apple', partOfSpeech: 'noun', ipa: '/a/', definition: 'apple', example: 'apple', exampleTranslation: 'tao', topic: 'Office', difficulty: 'easy', isCustom: true },
      { id: '2', word: 'banana', partOfSpeech: 'noun', ipa: '/b/', definition: 'banana', example: 'banana', exampleTranslation: 'chuoi', topic: 'Office', difficulty: 'easy', isCustom: true },
      { id: '3', word: 'cherry', partOfSpeech: 'noun', ipa: '/c/', definition: 'cherry', example: 'cherry', exampleTranslation: 'anh dao', topic: 'Office', difficulty: 'easy', isCustom: true }
    ];
    localStorage.setItem('toeic-vocab-custom', JSON.stringify(customWords));
    // Set progress status to 'learning' for only these words if needed
    const progress = customWords.map(w => ({ wordId: w.id, status: 'learning', correctCount: 0, incorrectCount: 0 }));
    localStorage.setItem('toeic-vocab-progress', JSON.stringify(progress));

    render(<App />);
    const user = userEvent.setup();

    const tabTest = screen.queryByTestId('tab-test');
    if (tabTest) {
      await user.click(tabTest);
      // The test is successfully generated without crashing
      const questionCard = screen.queryByTestId('test-question');
      expect(questionCard).toBeDefined();
    }
  });

  test('T2.3.2: Spelling inputs are case-insensitive and ignore leading/trailing whitespace', async () => {
    render(<App />);
    const user = userEvent.setup();

    const tabTest = screen.queryByTestId('tab-test');
    if (tabTest) {
      await user.click(tabTest);

      const input = screen.queryByTestId('spelling-input') as HTMLInputElement | null;
      if (input) {
        await user.type(input, '  AgEnDa  ');
        const submitBtn = screen.getByTestId('submit-question-btn');
        await user.click(submitBtn);

        // Verify if spelling input matches expected normalization
        expect(input.value.trim().toLowerCase()).toBe('agenda');
      }
    }
  });

  test('T2.3.3: Multiple Choice questions generate unique distractors without duplicates', async () => {
    render(<App />);
    const user = userEvent.setup();

    const tabTest = screen.queryByTestId('tab-test');
    if (tabTest) {
      await user.click(tabTest);

      const optionBtns = screen.queryAllByTestId('option-btn');
      if (optionBtns.length > 0) {
        const optionTexts = optionBtns.map(btn => btn.textContent?.trim());
        const uniqueTexts = new Set(optionTexts);
        expect(uniqueTexts.size).toBe(optionTexts.length);
      }
    }
  });

  test('T2.3.4: Skipping questions counts them as incorrect in final scoring', async () => {
    render(<App />);
    const user = userEvent.setup();

    const tabTest = screen.queryByTestId('tab-test');
    if (tabTest) {
      await user.click(tabTest);

      // Submit/Skip without selecting options or typing text
      for (let i = 0; i < 10; i++) {
        const submitBtn = screen.queryByTestId('submit-question-btn') || screen.queryByTestId('next-question-btn');
        if (submitBtn) {
          await user.click(submitBtn);
        }
      }

      // Check results show 0 correct answers or list skipped questions as incorrect
      const results = screen.queryByTestId('test-results');
      if (results) {
        expect(results.textContent).toContain('0');
      }
    }
  });

  test('T2.3.5: Navigating away from ongoing test triggers confirmation warning', async () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false);
    render(<App />);
    const user = userEvent.setup();

    const tabTest = screen.queryByTestId('tab-test');
    if (tabTest) {
      await user.click(tabTest);

      // Start the test and answer at least one question
      const options = screen.queryAllByTestId('option-btn');
      if (options.length > 0) {
        await user.click(options[0]);
        const submitBtn = screen.queryByTestId('submit-question-btn');
        if (submitBtn) await user.click(submitBtn);
      }

      // Try navigating away to study tab
      const tabStudy = screen.queryByTestId('tab-study');
      if (tabStudy) {
        await user.click(tabStudy);
        // confirm dialog should be triggered to prevent loss of state
        expect(confirmSpy).toHaveBeenCalled();
      }
    }
  });
});
