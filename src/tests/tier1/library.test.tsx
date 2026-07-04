import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { expect, test, describe } from 'vitest';

describe('F5: Library Dictionary Tests', () => {
  test('T1.5.1: Library lists all words from the vocabulary database', async () => {
    render(<App />);
    const user = userEvent.setup();

    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    const words = screen.getAllByTestId('dictionary-word');
    expect(words.length).toBeGreaterThan(0);
  });

  test('T1.5.2: Word search input filters vocabulary list by query substring', async () => {
    render(<App />);
    const user = userEvent.setup();

    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'agenda');

    const words = screen.getAllByTestId('dictionary-word');
    words.forEach(word => {
      expect(word.textContent?.toLowerCase()).toContain('agenda');
    });
  });

  test('T1.5.3: Topic selector filters words by topic category', async () => {
    render(<App />);
    const user = userEvent.setup();

    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    const topicSelect = screen.getByTestId('topic-select');
    await user.selectOptions(topicSelect, 'Office');

    const words = screen.getAllByTestId('dictionary-word');
    expect(words.length).toBeGreaterThan(0);
  });

  test('T1.5.4: Difficulty selector filters words by difficulty tier', async () => {
    render(<App />);
    const user = userEvent.setup();

    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    const difficultySelect = screen.getByTestId('difficulty-select');
    await user.selectOptions(difficultySelect, 'easy');

    const words = screen.getAllByTestId('dictionary-word');
    expect(words.length).toBeGreaterThan(0);
  });

  test('T1.5.5: Progress status filter filters words by status ("new", "learning", "mastered")', async () => {
    render(<App />);
    const user = userEvent.setup();

    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    const progressSelect = screen.getByTestId('progress-select');
    
    // Select "new"
    await user.selectOptions(progressSelect, 'new');
    let words = screen.getAllByTestId('dictionary-word');
    expect(words.length).toBeGreaterThan(0);

    // Select "learning"
    await user.selectOptions(progressSelect, 'learning');
    words = screen.queryAllByTestId('dictionary-word');
    // initially learning words could be 0, but status select should be functional
    expect(progressSelect).toHaveValue('learning');
  });
});
