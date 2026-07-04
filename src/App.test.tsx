import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { expect, test, describe, vi } from 'vitest';

describe('App smoke and mock validation tests', () => {
  test('renders Vite + React header or Vocabulary Learner', () => {
    render(<App />);
    // Support either the Vite + React header or the Vocabulary Learner header
    const heading = screen.getByRole('heading', { name: /Vocabulary Learner|Vite \+ React/i });
    expect(heading).toBeInTheDocument();
  });

  test('increments count on click', async () => {
    render(<App />);
    const user = userEvent.setup();
    
    // Navigate to Study Mode
    const tabStudy = screen.getByTestId('tab-study');
    await user.click(tabStudy);
    
    // Check initial count on study card or progress
    const learningBtn = screen.getByTestId('learning-btn');
    expect(learningBtn).toBeInTheDocument();
    
    await user.click(learningBtn);
    
    // Navigate back to Dashboard to verify status count updated
    const tabDashboard = screen.getByTestId('tab-dashboard');
    await user.click(tabDashboard);
    
    const countText = screen.getByTestId('words-learning').textContent;
    expect(Number(countText)).toBeGreaterThanOrEqual(1);
  });

  test('localStorage mock is functional', () => {
    localStorage.setItem('test-key', 'test-value');
    expect(localStorage.getItem('test-key')).toBe('test-value');
    localStorage.removeItem('test-key');
    expect(localStorage.getItem('test-key')).toBeNull();
  });

  test('speechSynthesis mock is functional with async onend callback', async () => {
    const utterance = new SpeechSynthesisUtterance('Hello world');
    const onendMock = vi.fn();
    utterance.onend = onendMock;

    window.speechSynthesis.speak(utterance);

    expect(onendMock).not.toHaveBeenCalled();

    // Wait for the mock's async callback to trigger
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(onendMock).toHaveBeenCalled();
  });
});
