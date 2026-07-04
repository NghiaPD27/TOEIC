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
    
    // Find either the default template counter button or the actual "Learn Next Word" button
    const button = screen.queryByRole('button', { name: /count is 0/i }) || 
                   screen.queryByRole('button', { name: /Learn Next Word/i });
    
    expect(button).toBeInTheDocument();

    if (button) {
      await userEvent.click(button);
      
      // Verify count is incremented in either template style
      const incrementedButton = screen.queryByRole('button', { name: /count is 1/i });
      if (incrementedButton) {
        expect(incrementedButton).toBeInTheDocument();
      } else {
        // For Vocabulary Learner, the learned words counter should increment to 1
        const countText = screen.getByText('1');
        expect(countText).toBeInTheDocument();
      }
    }
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
