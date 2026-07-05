import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { expect, test, describe, beforeEach } from 'vitest';

describe('Grammar Module Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('T1.G.1: Navigate to Grammar tab and display 7 topics', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Verify Home tab displays the navigation grids
    const wordsLearning = screen.getByTestId('words-learning');
    expect(wordsLearning).toBeDefined();

    // Click tab-grammar in header
    const tabGrammar = screen.getByTestId('tab-grammar');
    await user.click(tabGrammar);

    // Verify topics are rendered
    const topics = [
      "basic-tenses",
      "subject-verb-agreement",
      "passive-voice",
      "gerunds-infinitives",
      "relative-clauses",
      "conditionals",
      "conjunctions-prepositions"
    ];

    for (const topicId of topics) {
      const topicElement = screen.getByTestId(`grammar-topic-${topicId}`);
      expect(topicElement).toBeDefined();
    }
  });

  test('T1.G.2: Read theory, mark as read, and save to LocalStorage', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Navigate to Grammar
    await user.click(screen.getByTestId('tab-grammar'));

    // Open first topic
    await user.click(screen.getByTestId('grammar-topic-basic-tenses'));

    // Verify inside theory tab
    expect(screen.getByTestId('grammar-theory-tab')).toBeDefined();
    expect(screen.getByText(/Verb tenses express when/)).toBeDefined();

    // Mark as read
    const markBtn = screen.getByTestId('mark-theory-read-btn');
    await user.click(markBtn);

    // Check localStorage
    const stored = JSON.parse(localStorage.getItem('toeic-grammar-progress') || '{}');
    expect(stored['basic-tenses']?.theoryCompleted).toBe(true);

    // Back to topics
    await user.click(screen.getByText(/Back to Topics/));

    // Verify updated status displayed
    const theoryStatus = screen.getByTestId('theory-status-basic-tenses');
    expect(theoryStatus.textContent).toContain('Theory Read: Yes');
  });

  test('T1.G.3: Complete grammar quiz and show detailed explanations', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Navigate to Grammar
    await user.click(screen.getByTestId('tab-grammar'));
    await user.click(screen.getByTestId('grammar-topic-basic-tenses'));

    // Go to practice quiz sub-tab
    await user.click(screen.getByTestId('grammar-quiz-tab'));

    // Answer 5 questions
    // Q1 correct: had
    const options1 = screen.getAllByTestId('grammar-option-btn');
    const optionHad = options1.find(opt => opt.textContent?.trim() === 'had');
    await user.click(optionHad!);
    await user.click(screen.getByTestId('grammar-submit-q-btn'));

    // Q2 correct: has worked
    const options2 = screen.getAllByTestId('grammar-option-btn');
    const optionHasWorked = options2.find(opt => opt.textContent?.trim() === 'has worked');
    await user.click(optionHasWorked!);
    await user.click(screen.getByTestId('grammar-submit-q-btn'));

    // Q3 correct: will meet
    const options3 = screen.getAllByTestId('grammar-option-btn');
    const optionWillMeet = options3.find(opt => opt.textContent?.trim() === 'will meet');
    await user.click(optionWillMeet!);
    await user.click(screen.getByTestId('grammar-submit-q-btn'));

    // Q4 correct: set
    const options4 = screen.getAllByTestId('grammar-option-btn');
    const optionSet = options4.find(opt => opt.textContent?.trim() === 'set');
    await user.click(optionSet!);
    await user.click(screen.getByTestId('grammar-submit-q-btn'));

    // Q5 correct: distributes
    const options5 = screen.getAllByTestId('grammar-option-btn');
    const optionDistributes = options5.find(opt => opt.textContent?.trim() === 'distributes');
    await user.click(optionDistributes!);
    await user.click(screen.getByTestId('grammar-submit-q-btn'));

    // Verify results screen
    expect(screen.getByTestId('grammar-quiz-results')).toBeDefined();
    expect(screen.getByTestId('grammar-quiz-score').textContent).toContain('5 / 5');

    // Verify localStorage updated
    const stored = JSON.parse(localStorage.getItem('toeic-grammar-progress') || '{}');
    expect(stored['basic-tenses']?.maxQuizScore).toBe(5);

    // Verify detailed explanations
    expect(screen.getByTestId('grammar-review-item-tense_q1')).toBeDefined();
    expect(screen.getByText(/'had' is correct because the past perfect/)).toBeDefined();
  });

  test('T1.G.4: Verify global reset clears grammar progress', async () => {
    // Seed initial progress
    localStorage.setItem('toeic-grammar-progress', JSON.stringify({
      'basic-tenses': { theoryCompleted: true, maxQuizScore: 5 }
    }));

    render(<App />);
    const user = userEvent.setup();

    // Verify it is loaded in UI
    await user.click(screen.getByTestId('tab-grammar'));
    expect(screen.getByTestId('theory-status-basic-tenses').textContent).toContain('Theory Read: Yes');
    expect(screen.getByTestId('quiz-status-basic-tenses').textContent).toContain('Highest Score: 5/5');

    // Go to library to reset
    await user.click(screen.getByTestId('tab-library'));
    await user.click(screen.getByTestId('reset-progress-btn'));
    await user.click(screen.getByTestId('confirm-reset-btn'));

    // Verify localStorage cleared
    expect(localStorage.getItem('toeic-grammar-progress')).toBeNull();

    // Verify UI reset
    await user.click(screen.getByTestId('tab-grammar'));
    expect(screen.getByTestId('theory-status-basic-tenses').textContent).toContain('Theory Read: No');
    expect(screen.getByTestId('quiz-status-basic-tenses').textContent).toContain('Highest Score: N/A');
  });
});
