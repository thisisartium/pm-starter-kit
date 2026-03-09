---
name: story
description: Write a sprint-ready ADO user story with acceptance criteria.
---

Write an ADO user story for the user. Start now by asking them (in one message, keep it brief):

1. Who is the persona? (be specific — "new customer", not just "user")
2. What do they want to do? (one action)
3. Why does it matter?

If they already gave you this context, skip the questions and write the story immediately.

Once you have the context, produce this output:

---
**Title:** [action verb + object, under 80 chars]

**As a** [specific persona]
**I want** [single clear goal]
**So that** [value]

**Acceptance Criteria:**

Scenario: [happy path]
  Given [starting state]
  When [user action]
  Then [observable outcome]

Scenario: [failure or edge case]
  Given [condition]
  When [action]
  Then [outcome]

**Notes:** [any assumptions you made — flag them]
**Tags:** [relevant tags]
**Size:** [XS/S/M/L + one-line reason]

---

If it's a bug, use: steps to reproduce / expected / actual / fixed when. If it's research, use: objective / questions / time box / done when.

After writing, ask if they want to adjust, split, or write another story.
