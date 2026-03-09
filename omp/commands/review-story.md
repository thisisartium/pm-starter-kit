---
name: review-story
description: Review an existing ADO user story for quality, then rewrite it.
---

Review the ADO user story the user pastes. If they haven't pasted one yet, ask them to.

Once you have the story, produce three things:

**1. Scorecard**

| Dimension | Rating | Note |
|---|---|---|
| Title (action-oriented, under 80 chars) | Pass/Warn/Fail | |
| User story format (As a / I want / So that) | Pass/Warn/Fail | |
| Persona is specific | Pass/Warn/Fail | |
| Single goal (not bundled) | Pass/Warn/Fail | |
| Acceptance criteria present | Pass/Warn/Fail | |
| ACs are testable (no vague language) | Pass/Warn/Fail | |
| Right-sized for one sprint | Pass/Warn/Fail | |
| Demo-able at sprint review | Pass/Warn/Fail | |

**2. Critique**

2–4 sentences on what's working and what's not. Be direct — say what would confuse a developer or fail in testing.

**3. Rewritten Story**

Full rewrite using the standard format:

---
**Title:** [improved title]

**As a** [specific persona]
**I want** [single clear goal]
**So that** [value]

**Acceptance Criteria:**

Scenario: [name]
  Given [state]
  When [action]
  Then [outcome]

**Notes:** [assumptions made]
**Tags:** [tags]

---

End with a bullet list of what changed and why.

If the story is too large to fix with a rewrite, say so and recommend /split-story.
