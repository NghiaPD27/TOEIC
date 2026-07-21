import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import App from '../App';
import { vocal900Lessons } from '../data/vocal900';

describe('Vocal 900 Tab & Feature Tests', () => {
  test('renders Vocal 900 tab button in header and navigates correctly', async () => {
    const user = userEvent.setup();
    render(<App />);

    const vocalTabBtn = screen.getByTestId('tab-vocal900');
    expect(vocalTabBtn).toBeInTheDocument();
    expect(vocalTabBtn).toHaveTextContent('Vocal 900');

    await user.click(vocalTabBtn);

    expect(screen.getByTestId('vocal900-view')).toBeInTheDocument();
    expect(screen.getAllByText('Lesson 1: Contracts & Agreements')[0]).toBeInTheDocument();
  });

  test('contains all 12 initial vocabulary words in Lesson 1', () => {
    const lesson1 = vocal900Lessons.find(l => l.id === 1);
    expect(lesson1).toBeDefined();
    expect(lesson1?.words).toHaveLength(12);

    const wordNames = lesson1?.words.map(w => w.word);
    expect(wordNames).toEqual([
      'abide by',
      'agreement',
      'assurance',
      'cancel',
      'determine',
      'engage',
      'establish',
      'obligate',
      'party',
      'provision',
      'resolve',
      'specify'
    ]);
  });

  test('switches between Flashcard and List View modes', async () => {
    const user = userEvent.setup();
    render(<App />);

    const vocalTabBtn = screen.getByTestId('tab-vocal900');
    await user.click(vocalTabBtn);

    // Switch to List View
    const listViewBtn = screen.getByRole('button', { name: /Danh Sách/i });
    await user.click(listViewBtn);

    expect(screen.getByPlaceholderText('Tìm kiếm từ vựng trong bài học...')).toBeInTheDocument();
    expect(screen.getByText('abide by')).toBeInTheDocument();
    expect(screen.getByText('specify')).toBeInTheDocument();
  });
});
