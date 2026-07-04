import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { expect, test, describe, vi } from 'vitest';
import confetti from 'canvas-confetti';

describe('F4: Test Results & Confetti Tests', () => {
  // Helper to complete a 10-question test
  const completeTest = async (user: ReturnType<typeof userEvent.setup>) => {
    // Navigate to Test Tab
    const tabTest = screen.getByTestId('tab-test');
    await user.click(tabTest);

    for (let i = 0; i < 10; i++) {
      // Find options or spelling input
      const options = screen.queryAllByTestId('option-btn');
      if (options.length > 0) {
        await user.click(options[0]);
      } else {
        const input = screen.queryByTestId('spelling-input');
        if (input) {
          await user.type(input, 'test');
        }
      }
      
      const submitBtn = screen.getByTestId('submit-question-btn');
      await user.click(submitBtn);
    }
  };

  test('T1.4.1: Results page renders automatically upon submission of the 10th question', async () => {
    render(<App />);
    const user = userEvent.setup();

    await completeTest(user);

    const testResults = screen.getByTestId('test-results');
    expect(testResults).toBeInTheDocument();
  });

  test('T1.4.2: Results screen shows a detailed breakdown of correct vs incorrect answers', async () => {
    render(<App />);
    const user = userEvent.setup();

    await completeTest(user);

    const testResults = screen.getByTestId('test-results');
    expect(testResults).toHaveTextContent(/Score/i);
    expect(testResults).toHaveTextContent(/Correct/i);
    expect(testResults).toHaveTextContent(/Incorrect/i);
  });

  test('T1.4.3: Review list is displayed allowing users to see their answers alongside correct answers', async () => {
    render(<App />);
    const user = userEvent.setup();

    await completeTest(user);

    const reviewItems = screen.getAllByTestId('review-item');
    expect(reviewItems.length).toBeGreaterThan(0);
    expect(reviewItems[0]).toHaveTextContent(/Your answer/i);
    expect(reviewItems[0]).toHaveTextContent(/Correct answer/i);
  });

  test('T1.4.4: Clicking a word in the review list triggers SpeechSynthesis audio', async () => {
    const speakSpy = vi.spyOn(window.speechSynthesis, 'speak');
    render(<App />);
    const user = userEvent.setup();

    await completeTest(user);

    // Look for speaker button inside the review list
    const reviewItems = screen.getAllByTestId('review-item');
    const speakerBtn = reviewItems[0].querySelector('[data-testid="speaker-btn"]') || screen.getAllByTestId('speaker-btn')[0];
    await user.click(speakerBtn);

    expect(speakSpy).toHaveBeenCalled();
    speakSpy.mockRestore();
  });

  test('T1.4.5: Complete test triggers canvas-confetti canvas firework overlay', async () => {
    vi.mocked(confetti).mockClear();
    render(<App />);
    const user = userEvent.setup();

    await completeTest(user);

    expect(confetti).toHaveBeenCalled();
  });
});
