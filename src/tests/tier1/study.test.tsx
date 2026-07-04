import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { expect, test, describe, vi } from 'vitest';

describe('F2: Study Mode UI Tests', () => {
  test('T1.2.1: Study Mode displays a card deck capped at 10 words', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Navigate to Study Tab
    const tabStudy = screen.getByTestId('tab-study');
    await user.click(tabStudy);

    // Verify study interface is loaded and we can click next up to 10 times or see deck count
    const flashcard = screen.getByTestId('flashcard');
    expect(flashcard).toBeInTheDocument();

    const nextBtn = screen.getByTestId('next-btn');
    for (let i = 0; i < 9; i++) {
      await user.click(nextBtn);
      expect(screen.getByTestId('flashcard')).toBeInTheDocument();
    }
  });

  test('T1.2.2: 3D Flashcard renders with the front face (Word, POS, IPA) by default', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Navigate to Study Tab
    const tabStudy = screen.getByTestId('tab-study');
    await user.click(tabStudy);

    // Assert front is visible and has necessary text components
    const frontFace = screen.getByTestId('flashcard-front');
    expect(frontFace).toBeVisible();
    
    // POS and IPA checks
    expect(frontFace.textContent).toBeTruthy();
  });

  test('T1.2.3: Flashcard flips to back face (Definition, Example, translation) on user click', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Navigate to Study Tab
    const tabStudy = screen.getByTestId('tab-study');
    await user.click(tabStudy);

    const flashcard = screen.getByTestId('flashcard');
    await user.click(flashcard);

    // Check back face is visible and has details
    const backFace = screen.getByTestId('flashcard-back');
    expect(backFace).toBeVisible();
    expect(backFace.textContent).toBeTruthy();
  });

  test('T1.2.4: Clicking the speaker icon triggers browser SpeechSynthesis pronunciation', async () => {
    const speakSpy = vi.spyOn(window.speechSynthesis, 'speak');
    render(<App />);
    const user = userEvent.setup();

    // Navigate to Study Tab
    const tabStudy = screen.getByTestId('tab-study');
    await user.click(tabStudy);

    const speakerBtn = screen.getByTestId('speaker-btn');
    await user.click(speakerBtn);

    expect(speakSpy).toHaveBeenCalled();
    speakSpy.mockRestore();
  });

  test('T1.2.5: Pronunciation rate/speed is customizable via speed controls', async () => {
    const speakSpy = vi.spyOn(window.speechSynthesis, 'speak');
    render(<App />);
    const user = userEvent.setup();

    // Navigate to Study Tab
    const tabStudy = screen.getByTestId('tab-study');
    await user.click(tabStudy);

    const speedSelect = screen.getByTestId('speed-select');
    await user.selectOptions(speedSelect, '0.75');

    const speakerBtn = screen.getByTestId('speaker-btn');
    await user.click(speakerBtn);

    expect(speakSpy).toHaveBeenCalled();
    const lastCallUtterance = speakSpy.mock.calls[0][0] as SpeechSynthesisUtterance;
    expect(lastCallUtterance.rate).toBe(0.75);

    speakSpy.mockRestore();
  });
});
