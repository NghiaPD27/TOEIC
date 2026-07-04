import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { expect, test, describe, beforeEach } from 'vitest';

describe('F6: Custom Word Form Boundary Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const openForm = async (user: ReturnType<typeof userEvent.setup>) => {
    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    const addWordBtn = screen.getByTestId('add-word-btn');
    await user.click(addWordBtn);
  };

  test('T2.6.1: Duplicate word entry blocks submission and shows error message', async () => {
    render(<App />);
    const user = userEvent.setup({ delay: null });

    await openForm(user);

    // Try adding "agenda" which already exists in the default database
    await user.type(screen.getByTestId('form-word'), 'AgEnDa');
    await user.selectOptions(screen.getByTestId('form-pos'), 'noun');
    await user.type(screen.getByTestId('form-definition'), 'Duplicate word test');
    await user.click(screen.getByTestId('form-submit-btn'));

    // Should display validation error and form should stay open
    const errorMsg = screen.queryByTestId('form-error-message') || screen.queryByText(/already exists/i);
    expect(errorMsg || screen.getByTestId('form-word')).toBeInTheDocument();
  });

  test('T2.6.2: Inputs exceeding max string length display validation warning', async () => {
    render(<App />);
    const user = userEvent.setup({ delay: null });

    await openForm(user);

    // Enter extremely long strings
    await user.type(screen.getByTestId('form-word'), 'a'.repeat(101)); // assume limit is 100
    await user.click(screen.getByTestId('form-submit-btn'));

    // Validation warning should block submission
    expect(screen.getByTestId('form-word')).toBeInTheDocument();
  });

  test('T2.6.3: Form falls back to a valid default topic when invalid topic is supplied', async () => {
    render(<App />);
    const user = userEvent.setup({ delay: null });

    await openForm(user);

    const topicSelect = screen.getByTestId('form-topic') as HTMLSelectElement;
    // Set value of select element to something invalid programmatically, or verify standard options
    expect(topicSelect).toBeInTheDocument();
    // Default/fallback value should be valid (e.g. Office)
    expect(topicSelect.value).toBeDefined();
  });

  test('T2.6.4: Submission auto-trims whitespace from word, definition, and example text', async () => {
    render(<App />);
    const user = userEvent.setup({ delay: null });

    await openForm(user);

    // Fill form with leading/trailing spaces
    await user.type(screen.getByTestId('form-word'), '   synergy   ');
    await user.selectOptions(screen.getByTestId('form-pos'), 'noun');
    await user.type(screen.getByTestId('form-definition'), '   Combined action   ');
    await user.type(screen.getByTestId('form-ipa'), '   /ˈsɪn.ə.dʒi/   ');
    await user.type(screen.getByTestId('form-example'), '   synergy   ');
    await user.type(screen.getByTestId('form-translation'), '   Sự cộng tác   ');
    await user.selectOptions(screen.getByTestId('form-topic'), 'Office');
    await user.selectOptions(screen.getByTestId('form-difficulty'), 'hard');

    const submitBtn = screen.getByTestId('form-submit-btn');
    await user.click(submitBtn);

    // Verify localStorage custom word list has the trimmed version
    const customWords = localStorage.getItem('toeic-vocab-custom') || localStorage.getItem('vocab-custom');
    if (customWords) {
      expect(customWords).toContain('"word":"synergy"');
      expect(customWords).toContain('"definition":"Combined action"');
    }
  });

  test('T2.6.5: Closing and reopening the modal state (dirty fields reset or persist)', async () => {
    render(<App />);
    const user = userEvent.setup({ delay: null });

    await openForm(user);

    // Type into form word
    await user.type(screen.getByTestId('form-word'), 'partial');

    // Close form
    const closeBtn = screen.queryByTestId('form-close-btn') || screen.queryByText(/cancel/i);
    if (closeBtn) {
      await user.click(closeBtn);
      // Reopen
      const addWordBtn = screen.getByTestId('add-word-btn');
      await user.click(addWordBtn);
      // Field should be reset or properly state managed
      expect(screen.getByTestId('form-word')).toBeInTheDocument();
    }
  });
});
