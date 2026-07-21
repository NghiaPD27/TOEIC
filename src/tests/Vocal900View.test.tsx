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

  test('contains Lesson 2 with 12 marketing vocabulary words', async () => {
    const user = userEvent.setup();
    const lesson2 = vocal900Lessons.find(l => l.id === 2);
    expect(lesson2).toBeDefined();
    expect(lesson2?.words).toHaveLength(12);

    render(<App />);
    const vocalTabBtn = screen.getByTestId('tab-vocal900');
    await user.click(vocalTabBtn);

    // Click on Lesson 2 in sidebar
    const lesson2Btn = screen.getByText('Lesson 2: Marketing & Sales');
    expect(lesson2Btn).toBeInTheDocument();
    await user.click(lesson2Btn);

    expect(screen.getAllByText('attract')[0]).toBeInTheDocument();
  });

  test('contains Lesson 3 with 12 warranty vocabulary words', async () => {
    const user = userEvent.setup();
    const lesson3 = vocal900Lessons.find(l => l.id === 3);
    expect(lesson3).toBeDefined();
    expect(lesson3?.words).toHaveLength(12);

    render(<App />);
    const vocalTabBtn = screen.getByTestId('tab-vocal900');
    await user.click(vocalTabBtn);

    // Click on Lesson 3 in sidebar
    const lesson3Btn = screen.getByText('Lesson 3: Warranties & Guarantees');
    expect(lesson3Btn).toBeInTheDocument();
    await user.click(lesson3Btn);

    expect(screen.getAllByText('characteristic')[0]).toBeInTheDocument();
  });

  test('contains Lesson 4 with 12 business planning vocabulary words', async () => {
    const user = userEvent.setup();
    const lesson4 = vocal900Lessons.find(l => l.id === 4);
    expect(lesson4).toBeDefined();
    expect(lesson4?.words).toHaveLength(12);

    render(<App />);
    const vocalTabBtn = screen.getByTestId('tab-vocal900');
    await user.click(vocalTabBtn);

    // Click on Lesson 4 in sidebar
    const lesson4Btn = screen.getByText('Lesson 4: Business Planning');
    expect(lesson4Btn).toBeInTheDocument();
    await user.click(lesson4Btn);

    expect(screen.getAllByText('address')[0]).toBeInTheDocument();
  });

  test('contains Lesson 5 with 12 conference vocabulary words', async () => {
    const user = userEvent.setup();
    const lesson5 = vocal900Lessons.find(l => l.id === 5);
    expect(lesson5).toBeDefined();
    expect(lesson5?.words).toHaveLength(12);

    render(<App />);
    const vocalTabBtn = screen.getByTestId('tab-vocal900');
    await user.click(vocalTabBtn);

    // Click on Lesson 5 in sidebar
    const lesson5Btn = screen.getByText('Lesson 5: Conferences & Meetings');
    expect(lesson5Btn).toBeInTheDocument();
    await user.click(lesson5Btn);

    expect(screen.getAllByText('accommodate')[0]).toBeInTheDocument();
  });

  test('contains Lesson 6 with 12 IT & Computer vocabulary words', async () => {
    const user = userEvent.setup();
    const lesson6 = vocal900Lessons.find(l => l.id === 6);
    expect(lesson6).toBeDefined();
    expect(lesson6?.words).toHaveLength(12);

    render(<App />);
    const vocalTabBtn = screen.getByTestId('tab-vocal900');
    await user.click(vocalTabBtn);

    // Click on Lesson 6 in sidebar
    const lesson6Btn = screen.getByText('Lesson 6: Computers & IT');
    expect(lesson6Btn).toBeInTheDocument();
    await user.click(lesson6Btn);

    expect(screen.getAllByText('access')[0]).toBeInTheDocument();
  });
});
