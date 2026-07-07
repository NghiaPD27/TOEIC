import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { expect, test, describe, vi } from 'vitest';
import { b2TopicVocabulary } from '../../data/destinationB2';
import { defaultVocabulary } from '../../data/vocabulary';

describe('B2 Topic Vocab and Additional Verification Tests', () => {
  test('T1.8.1: Length of default vocabulary list is exactly 100, and b2TopicVocabulary is at least 150', () => {
    // 4. Verify that the length of the default vocabulary list in src/data/vocabulary.ts is exactly 100
    expect(defaultVocabulary).toHaveLength(100);

    // 4. Verify that b2TopicVocabulary is at least 150
    expect(b2TopicVocabulary.length).toBeGreaterThanOrEqual(150);
  });

  test('T1.8.2: Selecting a topic in the select dropdown filters B2 words correctly', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Navigate to Library Tab
    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    // Click on B2 Topic Vocab tab
    const b2VocabTab = screen.getByText('B2 Topic Vocab');
    await user.click(b2VocabTab);

    // Locate the B2 Topic select dropdown
    const b2TopicSelect = screen.getByTestId('b2-topic-select');
    expect(b2TopicSelect).toBeInTheDocument();

    // Select "Travel" topic
    await user.selectOptions(b2TopicSelect, 'Travel');

    // Assert only Travel words are displayed
    const travelWordsFromDb = b2TopicVocabulary.filter(v => v.topic === 'Travel');
    expect(travelWordsFromDb.length).toBeGreaterThan(0);

    const displayedWordHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(displayedWordHeadings.length).toBe(travelWordsFromDb.length);

    // Verify word contents
    displayedWordHeadings.forEach((heading) => {
      const headingText = heading.textContent || '';
      const matched = travelWordsFromDb.some(v => headingText.startsWith(v.word));
      expect(matched).toBe(true);
    });

    // Select "Hobbies" topic
    await user.selectOptions(b2TopicSelect, 'Hobbies');
    const hobbiesWordsFromDb = b2TopicVocabulary.filter(v => v.topic === 'Hobbies');
    const displayedHobbiesHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(displayedHobbiesHeadings.length).toBe(hobbiesWordsFromDb.length);

    // Verify word contents
    displayedHobbiesHeadings.forEach((heading) => {
      const headingText = heading.textContent || '';
      const matched = hobbiesWordsFromDb.some(v => headingText.startsWith(v.word));
      expect(matched).toBe(true);
    });
  });

  test('T1.8.3: Search query filters words correctly within a B2 topic and globally', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Navigate to Library Tab
    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    // Click on B2 Topic Vocab tab
    const b2VocabTab = screen.getByText('B2 Topic Vocab');
    await user.click(b2VocabTab);

    const searchInput = screen.getByPlaceholderText('Tìm từ vựng Destination B2...');
    expect(searchInput).toBeInTheDocument();

    // 1. Search globally (no topic selected)
    // Find a word like "accommodation"
    await user.type(searchInput, 'accommodation');
    let displayedHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(displayedHeadings.length).toBe(1);
    expect(displayedHeadings[0].textContent).toContain('accommodation');

    // Clear search
    await user.clear(searchInput);

    // 2. Search within a topic
    // First select "Travel" topic
    const b2TopicSelect = screen.getByTestId('b2-topic-select');
    await user.selectOptions(b2TopicSelect, 'Travel');

    // Type query "itinerary" which is in Travel
    await user.type(searchInput, 'itinerary');
    displayedHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(displayedHeadings.length).toBe(1);
    expect(displayedHeadings[0].textContent).toContain('itinerary');

    // Type query not in Travel, e.g., a Hobbies word like "refresh"
    const hobbiesWords = b2TopicVocabulary.filter(v => v.topic === 'Hobbies');
    expect(hobbiesWords.length).toBeGreaterThan(0);
    const hobbyWord = hobbiesWords[0].word;

    await user.clear(searchInput);
    await user.type(searchInput, hobbyWord);

    // Since we are filtered by Travel, searching for a Hobbies word should show 0 results
    const noResultsMessage = screen.getByText('Không tìm thấy từ vựng nào.');
    expect(noResultsMessage).toBeInTheDocument();
  });

  test('T1.8.4: TTS triggers on click in B2 Topic Vocab', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Navigate to Library Tab
    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    // Click on B2 Topic Vocab tab
    const b2VocabTab = screen.getByText('B2 Topic Vocab');
    await user.click(b2VocabTab);

    // Find the first card's volume/pronunciation button
    vi.mocked(window.speechSynthesis.speak).mockClear();

    const firstWord = b2TopicVocabulary[0].word;
    const firstWordHeader = screen.getAllByRole('heading', { level: 3 })[0];
    const card = firstWordHeader.closest('div')?.parentElement;
    expect(card).toBeInTheDocument();

    const ttsButton = card?.querySelector('button');
    expect(ttsButton).toBeInTheDocument();

    if (ttsButton) {
      await user.click(ttsButton);
    }

    expect(window.speechSynthesis.speak).toHaveBeenCalledTimes(1);
    
    // Verify it spoke the correct word
    const lastCall = vi.mocked(window.speechSynthesis.speak).mock.calls[0][0] as SpeechSynthesisUtterance;
    expect(lastCall.text).toBe(firstWord);
  });
});
