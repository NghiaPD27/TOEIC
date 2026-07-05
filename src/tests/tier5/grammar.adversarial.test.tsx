import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest';

describe('Tier 5: Grammar Adversarial and Stress Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test('T5.G.1a: Invalid LocalStorage value (corrupt JSON syntax) in toeic-grammar-progress recovers gracefully', async () => {
    localStorage.setItem('toeic-grammar-progress', '{invalid-json');
    let renderError = null;
    try {
      render(<App />);
      const user = userEvent.setup();
      await user.click(screen.getByTestId('tab-grammar'));
    } catch (e: unknown) {
      renderError = e;
    }
    expect(renderError).toBeNull();
    expect(screen.getByTestId('grammar-topic-basic-tenses')).toBeInTheDocument();
  });

  test('T5.G.1b: Invalid LocalStorage value (null value) in toeic-grammar-progress recovers gracefully', async () => {
    localStorage.setItem('toeic-grammar-progress', 'null');
    let renderError = null;
    try {
      render(<App />);
      const user = userEvent.setup();
      await user.click(screen.getByTestId('tab-grammar'));
    } catch (e: unknown) {
      renderError = e;
    }
    // If the bug is present, this will be a TypeError: Cannot read properties of null (reading 'basic-tenses')
    expect(renderError).toBeNull();
    expect(screen.getByTestId('grammar-topic-basic-tenses')).toBeInTheDocument();
  });

  test('ADV-G.2: Rapidly switching tabs during SpeechSynthesis cancels active audio and avoids bleed', async () => {
    const speakSpy = vi.spyOn(window.speechSynthesis, 'speak');
    const cancelSpy = vi.spyOn(window.speechSynthesis, 'cancel');
    
    render(<App />);
    const user = userEvent.setup();

    // Go to Study tab
    const tabStudy = screen.getByTestId('tab-study');
    await user.click(tabStudy);

    // Flip card to reveal speak button
    const flashcard = screen.getByTestId('flashcard');
    await user.click(flashcard);

    const speakerBtn = screen.getByTestId('speaker-btn');
    await user.click(speakerBtn);

    expect(speakSpy).toHaveBeenCalled();
    expect(cancelSpy).toHaveBeenCalled(); // cancel is called before speak to stop previous

    // Rapidly switch tabs to Home
    cancelSpy.mockClear();
    const tabHome = screen.getByTestId('tab-dashboard');
    await user.click(tabHome);

    // cancel should have been called upon tab switch
    expect(cancelSpy).toHaveBeenCalled();
  });

  test('ADV-G.3: Resetting progress clears all grammar progress keys', async () => {
    // Seed grammar progress
    localStorage.setItem('toeic-grammar-progress', JSON.stringify({
      'basic-tenses': { theoryCompleted: true, maxQuizScore: 5 }
    }));

    render(<App />);
    const user = userEvent.setup();

    // Go to Library to reset progress
    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    const resetBtn = screen.getByTestId('reset-progress-btn');
    await user.click(resetBtn);

    const confirmResetBtn = screen.getByTestId('confirm-reset-btn');
    await user.click(confirmResetBtn);

    // Verify localStorage key is cleared
    expect(localStorage.getItem('toeic-grammar-progress')).toBeNull();
  });

  test('T5.G.4: Storage quota exceeded during grammar progress save throws unhandled exception', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Mock localStorage.setItem to throw QuotaExceededError
    const setItemSpy = vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new DOMException('The quota has been exceeded.', 'QuotaExceededError');
    });

    // Go to Grammar tab
    await user.click(screen.getByTestId('tab-grammar'));
    await user.click(screen.getByTestId('grammar-topic-basic-tenses'));

    // Click mark as read
    let threwError = null;
    try {
      await user.click(screen.getByTestId('mark-theory-read-btn'));
    } catch (e: unknown) {
      threwError = e;
    }

    setItemSpy.mockRestore();
    expect(threwError).toBeNull();
  });
});
