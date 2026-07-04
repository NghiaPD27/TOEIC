# E2E Test Infra: TOEIC 650+ Vocabulary Learning App

## Test Philosophy
- Opaque-box, requirement-driven. Tests verify application behavior through the DOM interfaces, independent of internal React implementation details.
- Methodology: Category-Partition, Boundary Value Analysis, Pairwise Feature Combinations, and Real-world Workloads.

## Feature Inventory
| # | Feature | Source (requirement) | Tier 1 (Coverage) | Tier 2 (Boundary) | Tier 3 (Pairwise) | Tier 4 (Workload) |
|---|---------|---------------------|:------:|:------:|:------:|:------:|
| 1 | Vocabulary Database | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 2 | Study Mode UI | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 3 | Test Mode UI | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ | ✓ |
| 4 | Test Results & Confetti | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ | ✓ |
| 5 | Library Dictionary | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ | ✓ |
| 6 | Custom Word Form | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ | ✓ |
| 7 | Progress & Persistence | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ | ✓ |

## Test Architecture
- **Test Runner**: Vitest (v3.x) with JSDOM environment.
- **Testing Library**: React Testing Library + `@testing-library/user-event` for user interaction simulation.
- **Directory Layout**:
  - `src/tests/setup.ts` - Global RTL configurations, SpeechSynthesis mocks, LocalStorage mocks, and window.matchMedia mocks.
  - `src/tests/tier1/` - Tier 1: Feature Coverage tests (happy path).
  - `src/tests/tier2/` - Tier 2: Boundary & Corner Cases.
  - `src/tests/tier3/` - Tier 3: Cross-Feature Pairwise combinations.
  - `src/tests/tier4/` - Tier 4: Real-world user scenario workloads.
- **Invocation**:
  - Run all: `npm run test:run`
  - Run interactive: `npm run test`

## Test Cases Detailed Inventory

### Tier 1 - Feature Coverage (Happy Paths)
#### F1: Vocabulary Database
- **T1.1.1**: Default vocabulary database contains exactly 100 core words.
- **T1.1.2**: Vocabulary is graded by difficulty ('easy', 'medium', 'hard') and sorted accordingly.
- **T1.1.3**: Words are categorized into standard business topics (Office, Marketing, Finance, Personnel, Travel...).
- **T1.1.4**: Each vocabulary item contains Word, POS, IPA, Definition, Example, and translation.
- **T1.1.5**: Key business-critical TOEIC words (e.g. "agenda", "promotion") are present.

#### F2: Study Mode UI
- **T1.2.1**: Study Mode displays a card deck capped at 10 words.
- **T1.2.2**: 3D Flashcard renders with the front face (Word, POS, IPA) by default.
- **T1.2.3**: Flashcard flips to back face (Definition, Example, translation) on user click.
- **T1.2.4**: Clicking the speaker icon triggers browser SpeechSynthesis pronunciation.
- **T1.2.5**: Pronunciation rate/speed is customizable via speed controls.

#### F3: Test Mode UI
- **T1.3.1**: Test Mode generates a test containing exactly 10 questions.
- **T1.3.2**: Multiple Choice questions render option buttons and update selection state on click.
- **T1.3.3**: Spelling gap-fill questions allow typing the answer inside the sentence example field.
- **T1.3.4**: Listening TTS questions trigger audio on load/click and show multiple choices.
- **T1.3.5**: Test questions are compiled from words currently or previously studied.

#### F4: Test Results & Confetti
- **T1.4.1**: Results page renders automatically upon submission of the 10th question.
- **T1.4.2**: Results screen shows a detailed breakdown of correct vs incorrect answers.
- **T1.4.3**: Review list is displayed allowing users to see their answers alongside correct answers.
- **T1.4.4**: Clicking a word in the review list triggers SpeechSynthesis audio.
- **T1.4.5**: Complete test triggers canvas-confetti canvas firework overlay.

#### F5: Library Dictionary
- **T1.5.1**: Library lists all words from the vocabulary database.
- **T1.5.2**: Word search input filters vocabulary list by query substring.
- **T1.5.3**: Topic selector filters words by topic category.
- **T1.5.4**: Difficulty selector filters words by difficulty tier.
- **T1.5.5**: Progress status filter filters words by status ('new', 'learning', 'mastered').

#### F6: Custom Word Form
- **T1.6.1**: Add Word form renders input fields for all vocabulary attributes.
- **T1.6.2**: Submitting a valid custom word adds it to the list of words.
- **T1.6.3**: Form validates required fields and blocks invalid submissions.
- **T1.6.4**: Custom words can be searched, sorted, and filtered in the Library.
- **T1.6.5**: Custom words can appear in Study Mode and Test Mode.

#### F7: Progress & Persistence
- **T1.7.1**: LocalStorage initializes learning progress state on load.
- **T1.7.2**: Studying a word changes its status from 'new' to 'learning'.
- **T1.7.3**: Test answers update the word stats (correct/incorrect counts) in storage.
- **T1.7.4**: Consecutive day learning increments the daily study streak in storage.
- **T1.7.5**: Custom words added by the user are stored in LocalStorage and persist after page reload.

---

### Tier 2 - Boundary & Corner Cases
#### F1: Vocabulary Database
- **T2.1.1**: Database handling operates cleanly even if custom vocabulary array is null.
- **T2.1.2**: Vocabulary sorting is stable when multiple items share difficulty.
- **T2.1.3**: Words with extremely long text attributes do not overflow UI boundaries.
- **T2.1.4**: Dictionary search handles multi-byte Vietnamese accents and regex characters gracefully.
- **T2.1.5**: Topics are case-insensitive and normalized upon lookup.

#### F2: Study Mode UI
- **T2.2.1**: Study mode behaves gracefully if there are no words in the target category.
- **T2.2.2**: Flashcard can be flipped repeatedly without state corruption or stuck UI animations.
- **T2.2.3**: TTS speed control input is clamped to valid rates (e.g. 0.5x to 2.0x).
- **T2.2.4**: TTS functions fall back gracefully if no SpeechSynthesis voices are available.
- **T2.2.5**: Very long words do not break the 3D card boundaries.

#### F3: Test Mode UI
- **T2.3.1**: Test generation handles small word pools (e.g. <10 words) by selecting from new/fallback words.
- **T2.3.2**: Spelling inputs trim leading/trailing whitespace and are evaluated case-insensitively.
- **T2.3.3**: Multiple choice answers generated as distractors do not contain duplicate values.
- **T2.3.4**: Unanswered questions in the test are handled gracefully as incorrect on submission.
- **T2.3.5**: Navigating away mid-test warns the user and preserves test progress state.

#### F4: Test Results & Confetti
- **T2.4.1**: Results calculate and display correctly for 0/10 correct score.
- **T2.4.2**: Results calculate and display correctly for 10/10 correct score.
- **T2.4.3**: Confetti callback is mocked and handles missing canvas DOM context without crashing.
- **T2.4.4**: Review list handles extremely long input text wraps correctly.
- **T2.4.5**: Clicking Retake Test fully resets all test states and answers.

#### F5: Library Dictionary
- **T2.5.1**: Search returns "No results found" when a term is not matched.
- **T2.5.2**: Dictionary accepts injection characters (<script>, SQL syntax) safely as plain text.
- **T2.5.3**: Clearing filters restores the full 100+ word database view.
- **T2.5.4**: Multi-filtering (Topic + Difficulty) resulting in empty set renders empty state.
- **T2.5.5**: Dictionary handles pagination or virtual scroll boundaries correctly.

#### F6: Custom Word Form
- **T2.6.1**: Adding a duplicate word displays a validation prompt or updates description instead of duplicating keys.
- **T2.6.2**: Custom fields validate maximum string lengths.
- **T2.6.3**: Custom categories fall back to standard types if invalid inputs are bypassed.
- **T2.6.4**: Text input fields automatically trim formatting spaces.
- **T2.6.5**: Closing the modal clears all entered state values.

#### F7: Progress & Persistence
- **T2.7.1**: Streak is not incremented on multiple sessions within the same day.
- **T2.7.2**: Streak resets to 0 if inactivity exceeds 24 hours/calendar boundary.
- **T2.7.3**: Invalid/corrupted LocalStorage JSON is caught and resets to clean default states.
- **T2.7.4**: LocalStorage write failures (quota exceeded) are caught and log warnings without crashing.
- **T2.7.5**: Stored progress parses correctly when new fields are introduced (backward compatibility).

---

### Tier 3 - Cross-Feature Combinations (Pairwise)
- **T3.1**: Custom word creation (F6) immediately synchronizes with the Library (F5) search/filters and LocalStorage (F7).
- **T3.2**: Custom word creation (F6) adds the word to the learning queue, making it available in Study Mode (F2).
- **T3.3**: Studying a custom word in Study Mode (F2) changes its progress status in the Library (F5) and updates storage (F7).
- **T3.4**: Custom words are successfully integrated into Test Mode (F3) question pools, updating test results (F4).
- **T3.5**: Test performance updates learning state to 'mastered' (F7), removing it from Study queue (F2) and updating Library (F5).
- **T3.6**: Deleting/Reseting progress data in the Library (F5) resets streaks and stats (F7) and clears the study deck (F2).
- **T3.7**: Adding a custom word with the same spelling as a built-in word behaves as a modification of the built-in definition and updates persistence.

---

### Tier 4 - Real-World Application Scenarios (Workloads)
- **T4.1**: **New User Journey**: User loads app -> initialized database -> opens Library -> searches for "contract" -> opens Study Mode -> studies 10 words (flips cards, plays TTS) -> takes first Test -> gets score & confetti -> checks updated Dashboard (streak is 1).
- **T4.2**: **Customization and Mastery**: User adds custom word "incentive" -> verifies presence in Library -> starts study session -> marks "incentive" as learning -> takes a test -> answers "incentive" correctly -> checks Library status (progress is "mastered") -> verifies it is excluded from next study session deck.
- **T4.3**: **Multi-day Streak**: User studies on Day 1 (streak = 1) -> advances calendar time mock to Day 2 -> user studies (streak = 2) -> advances calendar time mock to Day 4 (missing Day 3) -> studies -> streak resets to 1.
- **T4.4**: **Test Mastery Loop**: User studies 20 words -> starts Test Mode -> fails 3 questions -> views results review -> starts new Test Mode containing the 3 failed questions -> answers all correctly -> verifies progress in Library shows correct counts.
- **T4.5**: **Data Recovery**: User adds custom vocabulary and completes studies -> refreshes browser page (reloads App) -> asserts custom words and streak/progress remain perfectly identical to pre-refresh states.

---

### Verification
All tests are verified by running `npx vitest run`. Test coverage is verified with `npx vitest run --coverage`.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Notify the caller (507f1b2f-9677-414d-a662-7cddd89615bf) when complete.
