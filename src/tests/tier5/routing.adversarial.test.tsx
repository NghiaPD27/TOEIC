import { render, screen, cleanup, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest';
import type { NavigateFunction } from 'react-router-dom';
import type { ReactNode } from 'react';

// Declare initialEntriesForTest on globalThis
declare global {
  var initialEntriesForTest: string[] | undefined;
}

let capturedNavigate: NavigateFunction | null = null;

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom') as typeof import('react-router-dom');
  return {
    ...actual,
    useNavigate: () => {
      const nav = actual.useNavigate();
      capturedNavigate = nav;
      return nav;
    },
    MemoryRouter: (props: { children?: ReactNode }) => {
      return actual.MemoryRouter({
        ...props,
        initialEntries: globalThis.initialEntriesForTest || ['/']
      });
    }
  };
});

describe('Tier 5: Routing Verification & Adversarial Tests', () => {
  beforeEach(() => {
    globalThis.initialEntriesForTest = undefined;
    capturedNavigate = null;
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test('T5.R1: Direct URL Entries Load Corresponding Routing Paths Correctly', async () => {
    // 1. Direct load /study
    globalThis.initialEntriesForTest = ['/study'];
    const { unmount: unmountStudy } = render(<App />);
    expect(screen.getByTestId('flashcard')).toBeInTheDocument();
    unmountStudy();

    // 2. Direct load /grammar
    globalThis.initialEntriesForTest = ['/grammar'];
    const { unmount: unmountGrammar } = render(<App />);
    expect(screen.getByText(/Grammar Topics/i)).toBeInTheDocument();
    unmountGrammar();

    // 3. Direct load /grammar/basic-tenses
    globalThis.initialEntriesForTest = ['/grammar/basic-tenses'];
    const { unmount: unmountDetail } = render(<App />);
    expect(screen.getByText(/← Back to Topics/i)).toBeInTheDocument();
    unmountDetail();
  });

  test('T5.R2: Invalid Routes / Wildcard Fallback Behavior', async () => {
    // Direct load an invalid path
    globalThis.initialEntriesForTest = ['/invalid-route-xyz'];
    const { unmount } = render(<App />);

    // Since there is a wildcard/fallback route, the main Routes element redirects to /
    // Let's verify that the dashboard contents are rendered.
    expect(screen.getByText(/Welcome back!/i)).toBeInTheDocument();
    expect(screen.getByText(/Vocabulary Training/i)).toBeInTheDocument();

    // Let's verify that the tab is highlighted as "Home" (dashboard).
    const tabDashboard = screen.getByTestId('tab-dashboard');
    expect(tabDashboard.className).toContain('bg-blue-600'); // active state class
    unmount();
  });

  test('T5.R3: Browser History Navigation (Back & Forward) Without State Corruption', async () => {
    const { unmount } = render(<App />);
    const user = userEvent.setup();

    // Verify initial route is Dashboard
    expect(screen.getByText(/Welcome back!/i)).toBeInTheDocument();

    // Navigate to Study Mode using tab click
    const tabStudy = screen.getByTestId('tab-study');
    await user.click(tabStudy);
    expect(screen.getByTestId('flashcard')).toBeInTheDocument();

    // Navigate to Library using tab click
    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();

    // Verify we captured the navigate function
    expect(capturedNavigate).not.toBeNull();

    // Simulate browser Back button (to /study)
    await act(async () => {
      capturedNavigate(-1);
    });
    expect(screen.getByTestId('flashcard')).toBeInTheDocument();

    // Simulate browser Back button again (to /)
    await act(async () => {
      capturedNavigate(-1);
    });
    expect(screen.getByText(/Welcome back!/i)).toBeInTheDocument();

    // Simulate browser Forward button (to /study)
    await act(async () => {
      capturedNavigate(1);
    });
    expect(screen.getByTestId('flashcard')).toBeInTheDocument();

    // Simulate browser Forward button (to /library)
    await act(async () => {
      capturedNavigate(1);
    });
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    unmount();
  });
});
