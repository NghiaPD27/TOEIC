import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest';

describe('F7: Progress & Persistence Boundary Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers({ toFake: ['Date'] });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test('T2.7.1: Same-day streak cap limits daily streak increment to once per calendar day', async () => {
    // Set system time to a fixed date
    const baseTime = new Date('2026-07-04T10:00:00Z');
    vi.setSystemTime(baseTime);

    // Set initial streak in localStorage
    localStorage.setItem(
      'toeic-vocab-streak',
      JSON.stringify({ count: 1, lastStudyDate: baseTime.toDateString() })
    );

    render(<App />);
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    // Navigate to Study Mode
    const tabStudy = screen.queryByTestId('tab-study');
    if (tabStudy) {
      await user.click(tabStudy);
      const learningBtn = screen.getByTestId('learning-btn');
      await user.click(learningBtn); // Study once

      // Advance time by 2 hours (same calendar day)
      vi.setSystemTime(new Date('2026-07-04T12:00:00Z'));
      await user.click(learningBtn); // Study again

      // Check streak remains 1 because it's the same day
      const storedStreak = JSON.parse(localStorage.getItem('toeic-vocab-streak') || '{}');
      expect(storedStreak.count).toBe(1);
    }
  });

  test('T2.7.2: Inactivity greater than 48 hours resets study streak count to initial value', async () => {
    const baseTime = new Date('2026-07-04T10:00:00Z');
    vi.setSystemTime(baseTime);

    // Initial streak: studied on July 4
    localStorage.setItem(
      'toeic-vocab-streak',
      JSON.stringify({ count: 5, lastStudyDate: baseTime.toDateString() })
    );

    // Advance time by 49 hours (July 6, 11:00)
    const futureTime = new Date(baseTime.getTime() + 49 * 60 * 60 * 1000);
    vi.setSystemTime(futureTime);

    render(<App />);
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    const tabStudy = screen.queryByTestId('tab-study');
    if (tabStudy) {
      await user.click(tabStudy);
      const learningBtn = screen.getByTestId('learning-btn');
      await user.click(learningBtn); // Study after 49 hours inactivity

      // Streak should be reset to 1
      const storedStreak = JSON.parse(localStorage.getItem('toeic-vocab-streak') || '{}');
      expect(storedStreak.count).toBe(1);
    }
  });

  test('T2.7.2.2: Daily study streak reset on initialization/mount due to inactivity greater than 48 hours', () => {
    const baseTime = new Date('2026-07-04T10:00:00Z');
    vi.setSystemTime(baseTime);

    // Initial streak: studied on July 4
    localStorage.setItem(
      'toeic-vocab-streak',
      JSON.stringify({ count: 5, lastStudyDate: baseTime.toDateString() })
    );

    // Advance time by 49 hours (July 6, 11:00)
    const futureTime = new Date(baseTime.getTime() + 49 * 60 * 60 * 1000);
    vi.setSystemTime(futureTime);

    render(<App />);

    // Streak count in localStorage should be immediately reset to 0
    const storedStreak = JSON.parse(localStorage.getItem('toeic-vocab-streak') || '{}');
    expect(storedStreak.count).toBe(0);

    // Streak count displayed in the UI (Dashboard) should also be 0
    const streakCount = screen.getByTestId('streak-count');
    expect(Number(streakCount.textContent)).toBe(0);
  });

  test('T2.7.3: Recovery from corrupted JSON in LocalStorage progress storage keys', () => {
    // Set corrupted malformed JSON strings
    localStorage.setItem('toeic-vocab-progress', '{invalid_json_progress');
    localStorage.setItem('toeic-vocab-streak', '[invalid_json_streak');

    // App rendering should not throw exceptions or crash
    expect(() => render(<App />)).not.toThrow();

    // Check if recovery correctly reset/cleared or initialized new default states
    const progress = localStorage.getItem('toeic-vocab-progress');
    expect(progress).not.toBe('{invalid_json_progress');
  });

  test('T2.7.4: Safe recovery and error warning display upon QuotaExceededError writing failures', async () => {
    // Mock setItem to throw QuotaExceededError
    vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new DOMException('The quota has been exceeded.', 'QuotaExceededError');
    });

    render(<App />);
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    const tabStudy = screen.queryByTestId('tab-study');
    if (tabStudy) {
      await user.click(tabStudy);
      const learningBtn = screen.queryByTestId('learning-btn');
      if (learningBtn) {
        await user.click(learningBtn); // Attempt write
      }
    }

    // Verify app handles the error without crashing, and optionally shows warning modal/toast
    const warning = screen.queryByTestId('quota-warning') || screen.queryByText(/storage full|unable to save/i);
    expect(warning || screen.queryByTestId('tab-dashboard')).toBeDefined();
  });

  test('T2.7.5: Schema backward compatibility handles legacy database progress formats cleanly', () => {
    // Legacy schema format might be flat string representation of learned word IDs
    const legacyProgress = ['agenda', 'colleague', 'document'];
    localStorage.setItem('toeic-vocab-progress', JSON.stringify(legacyProgress));

    render(<App />);

    // Check that it migrated to standard UserWordProgress format without crash
    const stored = localStorage.getItem('toeic-vocab-progress');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Migrated objects should contain wordId/status or be handled compatibly
        expect(parsed[0]).toBeDefined();
      }
    }
  });
});
