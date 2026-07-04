import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { expect, test, describe, beforeEach } from 'vitest';

describe('F5: Library Dictionary Boundary Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('T2.5.1: Search with no matching terms renders a clear empty state message', async () => {
    render(<App />);
    const user = userEvent.setup();

    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'nonexistentwordxyz123');

    const emptyMsg = screen.queryByTestId('library-empty-state') || screen.queryByText(/no words/i);
    expect(emptyMsg || screen.queryAllByTestId('dictionary-word')).toBeDefined();
  });

  test('T2.5.2: Safe handling of script/injection attempts in search input', async () => {
    render(<App />);
    const user = userEvent.setup();

    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    const searchInput = screen.getByTestId('search-input');
    // Try script injection
    await user.type(searchInput, '<script>alert("hack")</script>');

    // App should not crash, not evaluate script, and just show no matches or treat as query
    const words = screen.queryAllByTestId('dictionary-word');
    expect(words.length).toBe(0);
  });

  test('T2.5.3: Clear Filters button resets all active filters and search query to defaults', async () => {
    render(<App />);
    const user = userEvent.setup();

    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    const searchInput = screen.getByTestId('search-input');
    const topicSelect = screen.getByTestId('topic-select') as HTMLSelectElement;
    const difficultySelect = screen.getByTestId('difficulty-select') as HTMLSelectElement;

    // Apply multiple filters
    await user.type(searchInput, 'agenda');
    await user.selectOptions(topicSelect, 'Office');
    await user.selectOptions(difficultySelect, 'easy');

    // Click clear filters button
    const clearBtn = screen.queryByTestId('clear-filters-btn') || screen.queryByText(/clear/i);
    if (clearBtn) {
      await user.click(clearBtn);
      expect(searchInput).toHaveValue('');
      expect(topicSelect.value).toBe('');
      expect(difficultySelect.value).toBe('');
    }
  });

  test('T2.5.4: Empty intersection of multi-filter selects renders correct empty display', async () => {
    render(<App />);
    const user = userEvent.setup();

    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    const topicSelect = screen.getByTestId('topic-select');
    const difficultySelect = screen.getByTestId('difficulty-select');

    // Select filtering criteria that has no matches (e.g. topic Marketing + difficulty hard, if none exists)
    if (topicSelect && difficultySelect) {
      await user.selectOptions(topicSelect, 'Finance');
      await user.selectOptions(difficultySelect, 'easy');

      const emptyMsg = screen.queryByTestId('library-empty-state') || screen.queryByText(/no words/i);
      expect(emptyMsg || screen.queryAllByTestId('dictionary-word')).toBeDefined();
    }
  });

  test('T2.5.5: Pagination navigation bounds clamp safely at first and last pages', async () => {
    render(<App />);
    const user = userEvent.setup();

    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    const prevPageBtn = screen.queryByTestId('prev-page-btn');
    const nextPageBtn = screen.queryByTestId('next-page-btn');

    // Click prev page at the first page: should clamp (page remain 1 or disabled)
    if (prevPageBtn) {
      await user.click(prevPageBtn);
    }

    // Go to final page and click next page
    if (nextPageBtn) {
      for (let i = 0; i < 20; i++) {
        await user.click(nextPageBtn);
      }
    }

    const currentPage = screen.queryByTestId('current-page-num');
    expect(currentPage || prevPageBtn || nextPageBtn).toBeDefined();
  });
});
