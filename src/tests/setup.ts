import { vi } from 'vitest';
import '@testing-library/jest-dom';

// LocalStorage Mock
class LocalStorageMock {
  private store: Record<string, string> = {};

  clear() {
    this.store = {};
  }

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }

  get length() {
    return Object.keys(this.store).length;
  }

  key(index: number): string | null {
    return Object.keys(this.store)[index] || null;
  }
}

Object.defineProperty(window, 'localStorage', {
  value: new LocalStorageMock(),
  writable: true,
});

// SpeechSynthesis API Mock
class MockSpeechSynthesisUtterance {
  text = '';
  lang = '';
  voice = null;
  volume = 1;
  rate = 1;
  pitch = 1;
  onend: ((this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => void) | null = null;
  onstart: ((this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => void) | null = null;
  constructor(text?: string) {
    if (text) this.text = text;
  }
}

const mockSpeechSynthesis = {
  speak: vi.fn((utterance: unknown) => {
    const u = utterance as MockSpeechSynthesisUtterance;
    setTimeout(() => {
      if (typeof u.onstart === 'function') {
        (u as unknown as SpeechSynthesisUtterance).onstart?.call(
          u as unknown as SpeechSynthesisUtterance,
          {} as unknown as SpeechSynthesisEvent
        );
      }
      setTimeout(() => {
        if (typeof u.onend === 'function') {
          (u as unknown as SpeechSynthesisUtterance).onend?.call(
            u as unknown as SpeechSynthesisUtterance,
            { utterance: u } as unknown as SpeechSynthesisEvent
          );
        }
      }, 10);
    }, 0);
  }),
  cancel: vi.fn(),
  pause: vi.fn(),
  resume: vi.fn(),
  getVoices: vi.fn(() => []),
  paused: false,
  pending: false,
  speaking: false,
};

Object.defineProperty(window, 'speechSynthesis', {
  value: mockSpeechSynthesis,
  writable: true,
});

Object.defineProperty(window, 'SpeechSynthesisUtterance', {
  value: MockSpeechSynthesisUtterance,
  writable: true,
});

// canvas-confetti Mock
vi.mock('canvas-confetti', () => ({
  default: vi.fn().mockImplementation(() => Promise.resolve()),
}));

// window.matchMedia Mock
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
