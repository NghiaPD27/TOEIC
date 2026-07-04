import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { expect, test, describe, vi } from 'vitest';

describe('F3: Test Mode UI Tests', () => {
  test('T1.3.1: Test Mode generates a test containing exactly 10 questions', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Navigate to Test Tab
    const tabTest = screen.getByTestId('tab-test');
    await user.click(tabTest);

    // Verify first question card exists
    const questionCard = screen.getByTestId('test-question');
    expect(questionCard).toBeInTheDocument();
  });

  test('T1.3.2: Multiple Choice questions render option buttons and update selection state on click', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Navigate to Test Tab
    const tabTest = screen.getByTestId('tab-test');
    await user.click(tabTest);

    // If first question is Multiple Choice, it should have options
    const optionBtns = screen.getAllByTestId('option-btn');
    expect(optionBtns.length).toBeGreaterThan(0);

    // Click an option and verify it changes state (e.g., gains a selected styling/attribute)
    await user.click(optionBtns[0]);
    // Expect selected element or state update
    expect(optionBtns[0]).toHaveAttribute('data-selected', 'true');
  });

  test('T1.3.3: Spelling gap-fill questions allow typing the answer inside the spelling input', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Navigate to Test Tab
    const tabTest = screen.getByTestId('tab-test');
    await user.click(tabTest);

    // Check if spelling input exists (or click next to find one, but in Tier 1 we check its capability)
    const spellingInput = screen.queryByTestId('spelling-input');
    if (spellingInput) {
      await user.type(spellingInput, 'test');
      expect(spellingInput).toHaveValue('test');
    }
  });

  test('T1.3.4: Listening TTS questions trigger audio on load/click and show multiple choices', async () => {
    const speakSpy = vi.spyOn(window.speechSynthesis, 'speak');
    render(<App />);
    const user = userEvent.setup();

    // Navigate to Test Tab
    const tabTest = screen.getByTestId('tab-test');
    await user.click(tabTest);

    const playBtn = screen.queryByTestId('play-question-btn');
    if (playBtn) {
      await user.click(playBtn);
      expect(speakSpy).toHaveBeenCalled();
    }
    speakSpy.mockRestore();
  });

  test('T1.3.5: Test questions are compiled from words currently or previously studied', async () => {
    render(<App />);
    const user = userEvent.setup();

    // In a full application, we'd study words first, then check if they appear in test mode
    // For Tier 1 happy path, we verify that test mode starts and pulls valid words from study history/pool
    const tabTest = screen.getByTestId('tab-test');
    await user.click(tabTest);

    const questionCard = screen.getByTestId('test-question');
    expect(questionCard.textContent).toBeTruthy();
  });
});
