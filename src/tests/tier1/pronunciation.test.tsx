import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { expect, test, describe, beforeEach, vi } from 'vitest';

describe('Pronunciation Module Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    // Mock speechSynthesis to avoid security errors or unimplemented browser warnings in test environment
    if (typeof window !== 'undefined') {
      window.speechSynthesis = {
        speak: vi.fn(),
        cancel: vi.fn(),
        paused: false,
        pending: false,
        speaking: false,
        onvoiceschanged: null,
        getVoices: vi.fn().mockReturnValue([]),
      } as unknown as SpeechSynthesis;
    }
  });

  test('T1.P.1: Navigate to Pronunciation tab via header and display table', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Click tab-pronunciation in header
    const tabPron = screen.getByTestId('tab-pronunciation');
    await user.click(tabPron);

    // Verify Pronunciation view is loaded
    expect(screen.getByTestId('pronunciation-view')).toBeDefined();
    expect(screen.getByText('Bảng Phiên Âm Quốc Tế (IPA Chart)')).toBeDefined();

    // Verify groups exist
    expect(screen.getByText('Nguyên âm đơn (Monophthongs)')).toBeDefined();
    expect(screen.getByText('Nguyên âm đôi (Diphthongs)')).toBeDefined();
    expect(screen.getByText('Phụ âm (Consonants)')).toBeDefined();

    // Verify some IPA sounds are visible on screen
    expect(screen.getByTestId('ipa-symbol-ɪ')).toBeDefined();
    expect(screen.getByTestId('ipa-symbol-i:')).toBeDefined();
    expect(screen.getByTestId('ipa-symbol-ɪə')).toBeDefined();
    expect(screen.getByTestId('ipa-symbol-p')).toBeDefined();
    expect(screen.getByTestId('ipa-symbol-b')).toBeDefined();
  });

  test('T1.P.2: Navigate to Pronunciation tab via Home Card and check interactive details', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Click home page navigation card for Pronunciation
    const homeCard = screen.getByTestId('home-nav-pronunciation');
    await user.click(homeCard);

    // Verify Pronunciation view loaded
    expect(screen.getByTestId('pronunciation-view')).toBeDefined();

    // Verify detail area placeholder is shown when no symbol is selected
    expect(screen.getByText('Chưa chọn âm nào')).toBeDefined();

    // Click on sound /i:/
    const symbolBtn = screen.getByTestId('ipa-symbol-i:');
    await user.click(symbolBtn);

    // Verify detail card appears with correct info
    expect(screen.getByTestId('ipa-detail-card')).toBeDefined();
    expect(screen.getAllByText(/\/i:\//).length).toBeGreaterThan(0);
    expect(screen.getByText(/meet/)).toBeDefined();
    expect(screen.getByText(/\/mi:t\//)).toBeDefined();
    expect(screen.getByText(/Căng khóe miệng sang hai bên/)).toBeDefined();

    // Verify SpeechSynthesis play buttons are clickable
    const playSymbolBtn = screen.getByTestId('play-ipa-symbol-btn');
    await user.click(playSymbolBtn);
    expect(window.speechSynthesis.speak).toHaveBeenCalled();

    const playExampleBtn = screen.getByTestId('play-ipa-example-btn');
    await user.click(playExampleBtn);
    expect(window.speechSynthesis.speak).toHaveBeenCalled();
  });
});
