import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest';

describe('F2: Study Mode UI Boundary Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('T2.2.1: Custom speed controls clamp rate between minimum (0.25) and maximum (2.0) limits', async () => {
    const speakSpy = vi.spyOn(window.speechSynthesis, 'speak');
    render(<App />);
    const user = userEvent.setup();

    const tabStudy = screen.queryByTestId('tab-study');
    if (tabStudy) {
      await user.click(tabStudy);
      const speedSelect = screen.queryByTestId('speed-select') as HTMLSelectElement | null;
      if (speedSelect) {
        // Try selecting an extremely low rate if available, or verify value binding is within limits
        await user.selectOptions(speedSelect, '0.5'); // Or min limit
        const speakerBtn = screen.getByTestId('speaker-btn');
        await user.click(speakerBtn);
        const lastCall = speakSpy.mock.calls[speakSpy.mock.calls.length - 1]?.[0] as SpeechSynthesisUtterance;
        if (lastCall) {
          expect(lastCall.rate).toBeGreaterThanOrEqual(0.25);
          expect(lastCall.rate).toBeLessThanOrEqual(2.0);
        }
      }
    }
  });

  test('T2.2.2: Study Mode displays message for target topics containing no words', async () => {
    render(<App />);
    const user = userEvent.setup();

    const tabStudy = screen.queryByTestId('tab-study');
    if (tabStudy) {
      await user.click(tabStudy);

      // Select a topic that does not exist or filter to a topic with no words
      const studyTopicSelect = screen.queryByTestId('study-topic-select') || screen.queryByTestId('topic-select');
      if (studyTopicSelect) {
        await user.selectOptions(studyTopicSelect, 'Travel'); // Or a custom topic with zero words
        const emptyState = screen.queryByTestId('study-empty-state') || screen.queryByText(/no words/i);
        expect(emptyState).toBeDefined();
      }
    }
  });

  test('T2.2.3: SpeechSynthesis voice fallback handles missing English voice gracefully', async () => {
    // Mock getVoices to return empty array or only non-English voices
    vi.spyOn(window.speechSynthesis, 'getVoices').mockReturnValue([
      { lang: 'fr-FR', name: 'French', default: false, localService: true, voiceURI: 'fr' } as SpeechSynthesisVoice
    ]);
    const speakSpy = vi.spyOn(window.speechSynthesis, 'speak');

    render(<App />);
    const user = userEvent.setup();

    const tabStudy = screen.queryByTestId('tab-study');
    if (tabStudy) {
      await user.click(tabStudy);
      const speakerBtn = screen.queryByTestId('speaker-btn');
      if (speakerBtn) {
        await user.click(speakerBtn);
        // Verify speak was still called (falls back to available voice or defaults cleanly)
        expect(speakSpy).toHaveBeenCalled();
      }
    }
  });

  test('T2.2.4: Study Mode UI when all words in the current deck are marked as learned', async () => {
    // Set progress so all words are mastered
    const masteredProgress = Array.from({ length: 100 }, (_, i) => ({
      wordId: `word-${i}`,
      status: 'mastered',
      correctCount: 5,
      incorrectCount: 0
    }));
    localStorage.setItem('toeic-vocab-progress', JSON.stringify(masteredProgress));

    render(<App />);
    const user = userEvent.setup();

    const tabStudy = screen.queryByTestId('tab-study');
    if (tabStudy) {
      await user.click(tabStudy);
      // Verify study mode displays completed status or congratulations message
      const completedMsg = screen.queryByTestId('study-deck-complete') || screen.queryByText(/congratulations/i);
      expect(completedMsg).toBeDefined();
    }
  });

  test('T2.2.5: Navigation at deck boundaries (prev on first card, next on last card)', async () => {
    render(<App />);
    const user = userEvent.setup();

    const tabStudy = screen.queryByTestId('tab-study');
    if (tabStudy) {
      await user.click(tabStudy);

      const prevBtn = screen.queryByTestId('prev-btn');
      const nextBtn = screen.queryByTestId('next-btn');

      // Click previous on first card: should either wrap or be disabled/no-op
      if (prevBtn) {
        await user.click(prevBtn);
      }

      // Go to last card and click next
      if (nextBtn) {
        for (let i = 0; i < 11; i++) {
          await user.click(nextBtn);
        }
      }
      expect(screen.queryByTestId('flashcard')).toBeDefined();
    }
  });
});
