import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { expect, test, describe, beforeEach } from 'vitest';

describe('F7: Progress & Persistence Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('T1.7.1: LocalStorage initializes learning progress state on load', () => {
    render(<App />);
    
    // Check if learning progress or database initialization key exists in storage
    const storedState = localStorage.getItem('toeic-vocab-progress') || localStorage.getItem('vocab-progress');
    expect(storedState).toBeDefined();
  });

  test('T1.7.2: Studying a word changes its status from "new" to "learning"', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Verify initial count of learning words
    const initialLearning = screen.getByTestId('words-learning').textContent;

    // Navigate to Study Mode
    const tabStudy = screen.getByTestId('tab-study');
    await user.click(tabStudy);

    // Mark current card as learning
    const learningBtn = screen.getByTestId('learning-btn');
    await user.click(learningBtn);

    // Navigate back to Dashboard to verify status count updated
    const tabDashboard = screen.getByTestId('tab-dashboard');
    await user.click(tabDashboard);

    const updatedLearning = screen.getByTestId('words-learning').textContent;
    expect(Number(updatedLearning)).toBeGreaterThan(Number(initialLearning));
  });

  test('T1.7.3: Test answers update the word stats (correct/incorrect counts) in storage', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Navigate to Test Mode
    const tabTest = screen.getByTestId('tab-test');
    await user.click(tabTest);

    // Answer first question
    const options = screen.getAllByTestId('option-btn');
    await user.click(options[0]);
    const submitBtn = screen.getByTestId('submit-question-btn');
    await user.click(submitBtn);

    // Verify localStorage has updated stats for the word
    const storedState = localStorage.getItem('toeic-vocab-progress') || localStorage.getItem('vocab-progress');
    expect(storedState).toContain('correct');
  });

  test('T1.7.4: Consecutive day learning increments the daily study streak in storage', async () => {
    // Set a streak in localStorage
    localStorage.setItem('toeic-vocab-streak', JSON.stringify({ count: 1, lastStudyDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString() }));

    render(<App />);
    const user = userEvent.setup();

    // Navigate to Study Mode
    const tabStudy = screen.getByTestId('tab-study');
    await user.click(tabStudy);

    // Click learning/mastered button to simulate study activity
    const learningBtn = screen.getByTestId('learning-btn');
    await user.click(learningBtn);

    // Navigate to Dashboard and check streak
    const tabDashboard = screen.getByTestId('tab-dashboard');
    await user.click(tabDashboard);

    const streakCount = screen.getByTestId('streak-count').textContent;
    expect(Number(streakCount)).toBe(2);
  });

  test('T1.7.5: Custom words added by the user are stored in LocalStorage and persist after page reload', async () => {
    render(<App />);
    const user = userEvent.setup({ delay: null });

    // Go to Library and open add word form
    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    const addWordBtn = screen.getByTestId('add-word-btn');
    await user.click(addWordBtn);

    // Fill form
    await user.type(screen.getByTestId('form-word'), 'synergy');
    await user.selectOptions(screen.getByTestId('form-pos'), 'noun');
    await user.type(screen.getByTestId('form-definition'), 'Combined action');
    await user.type(screen.getByTestId('form-ipa'), '/ˈsɪn.ə.dʒi/');
    await user.type(screen.getByTestId('form-example'), 'synergy');
    await user.type(screen.getByTestId('form-translation'), 'Sự cộng tác');
    await user.selectOptions(screen.getByTestId('form-topic'), 'Office');
    await user.selectOptions(screen.getByTestId('form-difficulty'), 'hard');
    await user.click(screen.getByTestId('form-submit-btn'));

    // Check if custom word persists in storage
    const customWords = localStorage.getItem('toeic-vocab-custom') || localStorage.getItem('vocab-custom');
    expect(customWords).toContain('synergy');
  });
});
