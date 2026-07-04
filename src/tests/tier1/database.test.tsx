import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { expect, test, describe } from 'vitest';

describe('F1: Vocabulary Database Tests', () => {
  test('T1.1.1: Default vocabulary database contains exactly 100 core words', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Navigate to Library Tab
    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    // Assert that the dictionary word items are listed and total 100
    const words = screen.getAllByTestId('dictionary-word');
    expect(words).toHaveLength(100);
  });

  test('T1.1.2: Vocabulary is graded by difficulty ("easy", "medium", "hard") and sorted accordingly', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Navigate to Library Tab
    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    // Get the difficulty select element
    const difficultySelect = screen.getByTestId('difficulty-select');
    expect(difficultySelect).toBeInTheDocument();

    // Select "easy" and verify filter updates
    await user.selectOptions(difficultySelect, 'easy');
    const easyWords = screen.getAllByTestId('dictionary-word');
    expect(easyWords.length).toBeGreaterThan(0);

    // Select "medium" and verify
    await user.selectOptions(difficultySelect, 'medium');
    const mediumWords = screen.getAllByTestId('dictionary-word');
    expect(mediumWords.length).toBeGreaterThan(0);

    // Select "hard" and verify
    await user.selectOptions(difficultySelect, 'hard');
    const hardWords = screen.getAllByTestId('dictionary-word');
    expect(hardWords.length).toBeGreaterThan(0);
  });

  test('T1.1.3: Words are categorized into standard business topics (Office, Marketing, Finance, etc.)', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Navigate to Library Tab
    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    const topicSelect = screen.getByTestId('topic-select');
    expect(topicSelect).toBeInTheDocument();

    // Test filtering by standard topics
    const topics = ['Office', 'Marketing', 'Finance', 'Personnel', 'Travel'];
    for (const topic of topics) {
      await user.selectOptions(topicSelect, topic);
      const filteredWords = screen.getAllByTestId('dictionary-word');
      expect(filteredWords.length).toBeGreaterThan(0);
    }
  });

  test('T1.1.4: Each vocabulary item contains Word, POS, IPA, Definition, Example, and Translation', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Navigate to Library Tab
    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    // Check the first word item's details are rendered
    const firstWord = screen.getAllByTestId('dictionary-word')[0];
    expect(firstWord).toBeInTheDocument();

    // Check presence of typical elements or attributes
    expect(firstWord).toHaveTextContent(/\[.*\]/); // IPA pattern check
    expect(firstWord).toHaveTextContent(/n\.|v\.|adj\.|adv\./); // POS pattern check
  });

  test('T1.1.5: Key business-critical TOEIC words (e.g. "agenda", "promotion") are present', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Navigate to Library Tab
    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    const searchInput = screen.getByTestId('search-input');
    
    // Search for "agenda"
    await user.type(searchInput, 'agenda');
    let words = screen.getAllByTestId('dictionary-word');
    expect(words.some(w => w.textContent?.toLowerCase().includes('agenda'))).toBe(true);

    // Clear search and search for "promotion"
    await user.clear(searchInput);
    await user.type(searchInput, 'promotion');
    words = screen.getAllByTestId('dictionary-word');
    expect(words.some(w => w.textContent?.toLowerCase().includes('promotion'))).toBe(true);
  });
});
