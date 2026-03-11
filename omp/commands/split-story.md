---
name: split-story
description: Split an oversized user story into 2–5 smaller sprint-ready stories.
---

Split the user story the user pastes. If they haven't pasted one yet, ask them to.

Once you have the story, do this:

**1. In one sentence, state why it's too large.**

**2. State the split pattern you're using:**
- Workflow steps (story spans multiple steps in a flow)
- CRUD operations (mixes create / view / edit / delete)
- Happy path + edge cases (core flow bundled with error handling)
- Data variations (behavior differs by input or data type)
- User roles (different personas need different things)
- Defer to spike (unknowns block estimation — extract research first)

**3. Write 2–5 child stories**, each in this format:

---
**Story [N of M]: [Title]**

**As a** [persona]
**I want** [goal]
**So that** [benefit]

**Acceptance Criteria:**

Scenario: [name]
  Given [state]
  When [action]
  Then [outcome]

**Split from:** [original story title]
**Order:** [deliver N of M — or "parallel with Story X"]

---

**4. Show the delivery sequence:**
```
Story 1 → Story 2 → Story 3
                  ↘ Story 4 (can run parallel with 3)
```

**5. If all child stories share a technical dependency**, extract it as a separate enabler task or spike and note it.

Flag any child story that still feels too large for a single sprint.
