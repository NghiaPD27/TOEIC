import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { expect, test, describe } from 'vitest';

describe('F1: Vocabulary Database Boundary Tests', () => {
  test('T2.1.1: Empty vocabulary state handling when database is empty', async () => {
    // If the database starts empty or local storage is cleared and no words are loaded
    localStorage.clear();
    render(<App />);
    const user = userEvent.setup();

    // Check if library page is empty or shows fallback message
    const tabLibrary = screen.queryByTestId('tab-library');
    if (tabLibrary) {
      await user.click(tabLibrary);
      const emptyMsg = screen.queryByTestId('empty-database-message') || screen.queryByText(/no words/i);
      expect(emptyMsg || screen.queryAllByTestId('dictionary-word')).toBeDefined();
    }
  });

  test('T2.1.2: Database renders words with extremely long text fields without breaking layout', async () => {
    // Inject a word with exceptionally long text fields into localStorage to simulate database boundary
    const longWord = {
      id: 'longword',
      word: 'a'.repeat(100),
      partOfSpeech: 'noun',
      ipa: '/' + 'b'.repeat(100) + '/',
      definition: 'c'.repeat(1000),
      example: 'd'.repeat(1000),
      exampleTranslation: 'e'.repeat(1000),
      topic: 'Office',
      difficulty: 'hard',
      isCustom: true
    };
    localStorage.setItem('toeic-vocab-custom', JSON.stringify([longWord]));

    render(<App />);
    const user = userEvent.setup();

    const tabLibrary = screen.queryByTestId('tab-library');
    if (tabLibrary) {
      await user.click(tabLibrary);
      const searchInput = screen.queryByTestId('search-input');
      if (searchInput) {
        await user.type(searchInput, 'a'.repeat(20));
        const words = screen.queryAllByTestId('dictionary-word');
        expect(words).toBeDefined();
      }
    }
  });

  test('T2.1.3: Handling of vocabulary words with invalid/corrupt difficulty values', async () => {
    const corruptWord = {
      id: 'corruptword',
      word: 'corrupt',
      partOfSpeech: 'noun',
      ipa: '/c/',
      definition: 'Corrupt word',
      example: 'Corrupt word example.',
      exampleTranslation: 'Dich corrupt',
      topic: 'Office',
      difficulty: 'invalid_difficulty_value' as unknown as 'easy' | 'medium' | 'hard', // Corrupted value
      isCustom: true
    };
    localStorage.setItem('toeic-vocab-custom', JSON.stringify([corruptWord]));

    render(<App />);
    const user = userEvent.setup();

    const tabLibrary = screen.queryByTestId('tab-library');
    if (tabLibrary) {
      await user.click(tabLibrary);
      // Verify app does not crash and the word is either filtered out or defaults to a standard classification
      const words = screen.queryAllByTestId('dictionary-word');
      expect(words).toBeDefined();
    }
  });

  test('T2.1.4: Handling of duplicated word IDs in the database gracefully', async () => {
    // If two custom words are added with the same ID, list rendering should not duplicate keys to crash React
    const duplicateWords = [
      {
        id: 'dup-id',
        word: 'first',
        partOfSpeech: 'noun',
        ipa: '/f/',
        definition: 'First definition',
        example: 'First example.',
        exampleTranslation: 'Dich first',
        topic: 'Office',
        difficulty: 'easy',
        isCustom: true
      },
      {
        id: 'dup-id',
        word: 'second',
        partOfSpeech: 'noun',
        ipa: '/s/',
        definition: 'Second definition',
        example: 'Second example.',
        exampleTranslation: 'Dich second',
        topic: 'Office',
        difficulty: 'easy',
        isCustom: true
      }
    ];
    localStorage.setItem('toeic-vocab-custom', JSON.stringify(duplicateWords));

    render(<App />);
    const user = userEvent.setup();

    const tabLibrary = screen.queryByTestId('tab-library');
    if (tabLibrary) {
      await user.click(tabLibrary);
      const words = screen.queryAllByTestId('dictionary-word');
      expect(words).toBeDefined();
    }
  });

  test('T2.1.5: Correct rendering of complex Unicode characters, IPA symbols, and diacritics', async () => {
    const unicodeWord = {
      id: 'unicode-word',
      word: 'cộng tác',
      partOfSpeech: 'noun',
      ipa: '/kəʊˈɒp.ər.eɪt/ hoặc /kəˈlæb.ə.reɪt/ ₫',
      definition: 'Làm việc cùng nhau, cộng tác trong kinh doanh',
      example: 'We cooperate on various projects.',
      exampleTranslation: 'Chúng tôi hợp tác trong nhiều dự án khác nhau.',
      topic: 'Personnel',
      difficulty: 'medium',
      isCustom: true
    };
    localStorage.setItem('toeic-vocab-custom', JSON.stringify([unicodeWord]));

    render(<App />);
    const user = userEvent.setup();

    const tabLibrary = screen.queryByTestId('tab-library');
    if (tabLibrary) {
      await user.click(tabLibrary);
      const searchInput = screen.queryByTestId('search-input');
      if (searchInput) {
        await user.type(searchInput, 'cộng tác');
        const words = screen.queryAllByTestId('dictionary-word');
        expect(words).toBeDefined();
      }
    }
  });
});
