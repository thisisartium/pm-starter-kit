# Skill: Acceptance Criteria

## Purpose

Provides techniques, patterns, and quality standards for writing testable, unambiguous acceptance criteria (ACs). Apply this skill whenever writing or reviewing ACs in any story type.

## Core Principle

An acceptance criterion is done when a tester can verify it without asking the author a single question.

## Formats

### Gherkin (Given/When/Then) — Preferred

Best for: behavioral flows, user interactions, system events, integration points.

```
Scenario: [Short descriptive name]
  Given [precondition — the state before the action]
  When [trigger — the user action or system event]
  Then [outcome — the observable result]
  And [additional outcome]
  But [exception or negative case]
```

**Tips:**
- `Given` describes state, not actions
- `When` is a single trigger — if you have multiple Whens, split the scenario
- `Then` describes what the user sees, hears, or experiences — observable outcomes only
- Name the scenario so a non-technical stakeholder understands what's being tested

### Checkbox / Acceptance List — Alternative

Best for: simple criteria, non-behavioral requirements, compliance or constraint checks.

```
- [ ] [Testable statement of behavior or constraint]
- [ ] [Another independently verifiable condition]
```

**Tips:**
- Each item should be independently testable
- Phrase as a positive assertion ("X happens") not a negative ("X doesn't break")
- Group related items together

## Patterns by Scenario Type

### Happy Path

The main flow — the user completes the action successfully.

```
Scenario: Successful form submission
  Given the user has filled in all required fields with valid data
  When the user clicks "Submit"
  Then the form is submitted
  And a confirmation message is displayed
  And the user receives a confirmation email
```

### Error / Failure State

What happens when something goes wrong.

```
Scenario: Required field is missing
  Given the user has left the email field blank
  When the user clicks "Submit"
  Then the form is not submitted
  And an inline error message reads "Email address is required"
  And focus moves to the email field
```

### Permissions / Access Control

Who can and cannot do a thing.

```
Scenario: Non-admin user cannot access admin settings
  Given the user is logged in with a standard user role
  When the user navigates to /admin/settings
  Then they are redirected to the home page
  And a "You don't have permission" message is displayed
```

### Data / State Variation

Behavior differs based on data or system state.

```
Scenario: Empty state — no results
  Given the user has no saved reports
  When the user navigates to the Reports page
  Then an empty state message is displayed: "You haven't created any reports yet"
  And a "Create Report" call-to-action button is shown
```

### Performance / Non-Functional

Measurable system behaviors (use sparingly — most stories don't need these).

```
- [ ] Page loads within 2 seconds on a standard broadband connection
- [ ] API responds within 500ms under normal load (< 100 concurrent users)
```

### Accessibility

Required for any UI-facing story.

```
- [ ] All form fields have associated label elements
- [ ] Error messages are announced by screen readers
- [ ] Interactive elements are keyboard navigable
- [ ] Color is not the sole means of conveying information
```

## Quality Tests — Apply to Every AC

Before finalizing ACs, run this checklist:

| Test | Question |
|---|---|
| **Testable** | Can a tester verify this without asking the author? |
| **Observable** | Does it describe what the user sees/experiences, not what the code does? |
| **Singular** | Does it test one thing? (If "and" appears in a Then, consider splitting) |
| **Unambiguous** | Is every word precise? Remove "should," "properly," "correctly," "user-friendly" |
| **Bounded** | Is the scope clear? Edge cases and exclusions stated? |
| **Agreed** | Has the team (dev, test, PM) aligned on this AC before sprint start? |

## Anti-Patterns to Avoid

| Anti-Pattern | Problem | Fix |
|---|---|---|
| "The system should work correctly" | Untestable | Define "correctly" — what specific outcome? |
| "The UI is user-friendly" | Subjective | Define what user-friendly means in this context |
| "Performance is acceptable" | Unmeasurable | Specify milliseconds, error rates, concurrent users |
| "All edge cases are handled" | Vague | List the specific edge cases |
| "The data is saved" | Incomplete | Where? When? What confirmation does the user get? |
| ACs written as implementation steps | Wrong layer | Describe behavior, not code structure |
| 10+ ACs on one story | Story is too large | Split the story |

## Coverage Checklist

For a typical user story, aim to cover:

- [ ] Primary happy path (the main success scenario)
- [ ] At least one failure or error state
- [ ] Validation rules (if input is involved)
- [ ] Permission / role boundaries (if access control is involved)
- [ ] Empty / zero / edge states (if displaying data)
- [ ] Accessibility requirements (if UI-facing)

You don't need all of these on every story — pick the ones relevant to the context.
