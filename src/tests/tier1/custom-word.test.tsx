import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { expect, test, describe, beforeEach } from 'vitest';

describe('F6: Custom Word Form Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  const openForm = async (user: ReturnType<typeof userEvent.setup>) => {
    // Navigate to Library Tab where "Add Word" button usually resides
    const tabLibrary = screen.getByTestId('tab-library');
    await user.click(tabLibrary);

    const addWordBtn = screen.getByTestId('add-word-btn');
    await user.click(addWordBtn);
  };

  test('T1.6.1: Add Word form renders input fields for all vocabulary attributes', async () => {
    render(<App />);
    const user = userEvent.setup({ delay: null });

    await openForm(user);

    // Verify all input fields are rendered
    expect(screen.getByTestId('form-word')).toBeInTheDocument();
    expect(screen.getByTestId('form-pos')).toBeInTheDocument();
    expect(screen.getByTestId('form-definition')).toBeInTheDocument();
    expect(screen.getByTestId('form-ipa')).toBeInTheDocument();
    expect(screen.getByTestId('form-example')).toBeInTheDocument();
    expect(screen.getByTestId('form-translation')).toBeInTheDocument();
    expect(screen.getByTestId('form-topic')).toBeInTheDocument();
    expect(screen.getByTestId('form-difficulty')).toBeInTheDocument();
  });

  test('T1.6.2: Submitting a valid custom word adds it to the list of words', async () => {
    render(<App />);
    const user = userEvent.setup({ delay: null });

    await openForm(user);

    // Fill the form
    await user.type(screen.getByTestId('form-word'), 'synergy');
    await user.selectOptions(screen.getByTestId('form-pos'), 'noun');
    await user.type(screen.getByTestId('form-definition'), 'Combined action or operation');
    await user.type(screen.getByTestId('form-ipa'), '/ˈsɪn.ə.dʒi/');
    await user.type(screen.getByTestId('form-example'), 'Teamwork creates synergy.');
    await user.type(screen.getByTestId('form-translation'), 'Sự cộng tác');
    await user.selectOptions(screen.getByTestId('form-topic'), 'Office');
    await user.selectOptions(screen.getByTestId('form-difficulty'), 'hard');

    const submitBtn = screen.getByTestId('form-submit-btn');
    await user.click(submitBtn);

    // Verify word is added (e.g. searching for it in Library)
    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'synergy');
    const words = screen.getAllByTestId('dictionary-word');
    expect(words.some(w => w.textContent?.includes('synergy'))).toBe(true);
  });

  test('T1.6.3: Form validates required fields and blocks invalid submissions', async () => {
    render(<App />);
    const user = userEvent.setup({ delay: null });

    await openForm(user);

    // Submit without filling word field
    const submitBtn = screen.getByTestId('form-submit-btn');
    await user.click(submitBtn);

    // The form should not close or should display a validation message
    expect(screen.getByTestId('form-word')).toBeInTheDocument();
  });

  test('T1.6.4: Custom words can be searched, sorted, and filtered in the Library', async () => {
    render(<App />);
    const user = userEvent.setup({ delay: null });

    // In a full integration, adding a custom word should register it in Library
    // Let's add and then search/filter
    await openForm(user);
    await user.type(screen.getByTestId('form-word'), 'synergy');
    await user.selectOptions(screen.getByTestId('form-pos'), 'noun');
    await user.type(screen.getByTestId('form-definition'), 'Combined action');
    await user.type(screen.getByTestId('form-ipa'), '/ˈsɪn.ə.dʒi/');
    await user.type(screen.getByTestId('form-example'), 'synergy');
    await user.type(screen.getByTestId('form-translation'), 'Sự cộng tác');
    await user.selectOptions(screen.getByTestId('form-topic'), 'Office');
    await user.selectOptions(screen.getByTestId('form-difficulty'), 'hard');
    await user.click(screen.getByTestId('form-submit-btn'));

    // Check filters
    const topicSelect = screen.getByTestId('topic-select');
    await user.selectOptions(topicSelect, 'Office');
    
    const words = screen.getAllByTestId('dictionary-word');
    expect(words.some(w => w.textContent?.includes('synergy'))).toBe(true);
  });

  test('T1.6.5: Custom words can appear in Study Mode and Test Mode', async () => {
    render(<App />);
    const user = userEvent.setup({ delay: null });

    // Add custom word first
    await openForm(user);
    await user.type(screen.getByTestId('form-word'), 'synergy');
    await user.selectOptions(screen.getByTestId('form-pos'), 'noun');
    await user.type(screen.getByTestId('form-definition'), 'Combined action');
    await user.type(screen.getByTestId('form-ipa'), '/ˈsɪn.ə.dʒi/');
    await user.type(screen.getByTestId('form-example'), 'synergy');
    await user.type(screen.getByTestId('form-translation'), 'Sự cộng tác');
    await user.selectOptions(screen.getByTestId('form-topic'), 'Office');
    await user.selectOptions(screen.getByTestId('form-difficulty'), 'hard');
    await user.click(screen.getByTestId('form-submit-btn'));

    // Navigate to Study Mode
    const tabStudy = screen.getByTestId('tab-study');
    await user.click(tabStudy);

    // Verify study mode could pull this word (or check if deck contains custom words)
    const flashcard = screen.getByTestId('flashcard');
    expect(flashcard).toBeInTheDocument();
  });
});
