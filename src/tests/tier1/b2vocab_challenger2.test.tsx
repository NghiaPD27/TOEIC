import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { expect, test, describe } from 'vitest';
import { b2TopicVocabulary } from '../../data/destinationB2';

describe('B2 Vocabulary Challenger 2 Verification Tests', () => {
  // 1. Verify b2TopicVocabulary length and correct types
  test('Verify b2TopicVocabulary length is at least 150 and all items have correct types and non-empty values', () => {
    expect(b2TopicVocabulary.length).toBeGreaterThanOrEqual(150);

    b2TopicVocabulary.forEach((item) => {
      // Validate 'word'
      expect(typeof item.word).toBe('string');
      expect(item.word.trim().length).toBeGreaterThan(0);

      // Validate 'partOfSpeech'
      expect(typeof item.partOfSpeech).toBe('string');
      expect(item.partOfSpeech.trim().length).toBeGreaterThan(0);

      // Validate 'ipa'
      expect(typeof item.ipa).toBe('string');
      expect(item.ipa.trim().length).toBeGreaterThan(0);

      // Validate 'definition'
      expect(typeof item.definition).toBe('string');
      expect(item.definition.trim().length).toBeGreaterThan(0);

      // Validate 'example'
      expect(typeof item.example).toBe('string');
      expect(item.example.trim().length).toBeGreaterThan(0);

      // Validate 'translation'
      expect(typeof item.translation).toBe('string');
      expect(item.translation.trim().length).toBeGreaterThan(0);

      // Validate 'topic'
      expect(typeof item.topic).toBe('string');
      expect(item.topic?.trim().length).toBeGreaterThan(0);
    });
  });

  // 2. Search query case-insensitive search by word name and definition
  test('Verify search query works for both word names and definitions (case-insensitive) under B2 Topic Vocab tab', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Navigate to Library
    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    // Switch to B2 Topic Vocab sub-tab
    const b2TabBtn = screen.getByText('B2 Topic Vocab');
    await user.click(b2TabBtn);

    // Get search input for B2
    const searchInput = screen.getByPlaceholderText('Tìm từ vựng Destination B2...');

    // A. Search by word name (lowercase)
    await user.clear(searchInput);
    await user.type(searchInput, 'accommodation');

    // Should find accommodation
    expect(screen.getByText('accommodation')).toBeInTheDocument();
    // Should NOT find itinerary
    expect(screen.queryByText('itinerary')).not.toBeInTheDocument();

    // B. Search by word name (uppercase / case-insensitive check)
    await user.clear(searchInput);
    await user.type(searchInput, 'ACCOMMODATION');
    expect(screen.getByText('accommodation')).toBeInTheDocument();
    expect(screen.queryByText('itinerary')).not.toBeInTheDocument();

    // C. Search by definition (lowercase)
    await user.clear(searchInput);
    await user.type(searchInput, 'chỗ ở');
    expect(screen.getByText('accommodation')).toBeInTheDocument();
    expect(screen.queryByText('itinerary')).not.toBeInTheDocument();

    // D. Search by definition (uppercase / case-insensitive check)
    await user.clear(searchInput);
    await user.type(searchInput, 'CHỖ Ở');
    expect(screen.getByText('accommodation')).toBeInTheDocument();
    expect(screen.queryByText('itinerary')).not.toBeInTheDocument();
  });

  // 3. Tab switching resets the filters
  test('Verify that changing sub-tabs resets B2 filters, and changing main tabs resets all library filters', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Navigate to Library
    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    // Switch to B2 Topic Vocab sub-tab
    const b2TabBtn = screen.getByText('B2 Topic Vocab');
    await user.click(b2TabBtn);

    // Set filters
    const searchInput = screen.getByPlaceholderText('Tìm từ vựng Destination B2...');
    await user.type(searchInput, 'accommodation');
    expect(searchInput).toHaveValue('accommodation');

    const topicSelect = screen.getByTestId('b2-topic-select');
    await user.selectOptions(topicSelect, 'Travel');
    expect(topicSelect).toHaveValue('Travel');

    // Switch sub-tab to "B2 Phrasal Verbs"
    const phrasalsBtn = screen.getByText('B2 Phrasal Verbs');
    await user.click(phrasalsBtn);

    // Switch back to "B2 Topic Vocab" and check if filters are reset
    await user.click(b2TabBtn);
    
    // Check that search input and topic select are empty/reset
    const searchInputReset = screen.getByPlaceholderText('Tìm từ vựng Destination B2...');
    expect(searchInputReset).toHaveValue('');
    const topicSelectReset = screen.getByTestId('b2-topic-select');
    expect(topicSelectReset).toHaveValue('');

    // Check main tab change resets filters
    // Set filters again
    await user.type(searchInputReset, 'accommodation');
    await user.selectOptions(topicSelectReset, 'Travel');
    expect(searchInputReset).toHaveValue('accommodation');
    expect(topicSelectReset).toHaveValue('Travel');

    // Go to Study main tab
    const tabStudy = screen.getByTestId('tab-study');
    await user.click(tabStudy);

    // Go back to Library main tab
    await user.click(tabLibrary);

    // Filters should be reset to default (unmounted/remounted LibraryView resets useState)
    // Wait, let's verify if the default 'words' tab search input is empty
    const defaultSearchInput = screen.getByTestId('search-input');
    expect(defaultSearchInput).toHaveValue('');

    // Go to B2 Topic Vocab sub-tab and check its search input is empty too
    const b2TabBtnAfterReset = screen.getByText('B2 Topic Vocab');
    await user.click(b2TabBtnAfterReset);
    const searchInputFinal = screen.getByPlaceholderText('Tìm từ vựng Destination B2...');
    const topicSelectFinal = screen.getByTestId('b2-topic-select');
    expect(searchInputFinal).toHaveValue('');
    expect(topicSelectFinal).toHaveValue('');
  });
});
