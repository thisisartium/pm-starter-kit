---
name: epic
description: Plan an epic — hypothesis, feature decomposition, story map, and phased delivery.
---

Plan an epic for the user. Start now by asking them (in one message, keep it brief):

1. What business problem does this solve?
2. Who are the target personas?
3. What's the minimum you'd need to ship to deliver real value (MVP)?
4. How will success be measured?

If they already gave you this context, skip the questions and plan the epic immediately.

Once you have the context, produce this output:

---
**Epic:** [outcome-oriented title]

**Problem Statement:** [what problem, for whom]
**Persona(s):** [who benefits]

**Hypothesis:**
We believe [capability] will achieve [outcome] for [persona]. We'll know this when [measurable signal].

**MVP Definition:** [minimum to ship real value]
**Out of Scope (Phase 1):** [what we're not doing now]

**Risks:**
- [risk 1]
- [risk 2]

**Success Metrics:** [how we measure it]

---
**Features:**

| # | Feature | Phase | Dependencies |
|---|---------|-------|--------------|
| 1 | [name — one line description] | MVP | — |
| 2 | [name — one line description] | MVP | Feature 1 |
| 3 | [name — one line description] | Phase 2 | — |

---
**Story Map:**

Feature: [Feature 1]
  - As a [persona], I want [goal] so that [benefit]
  - As a [persona], I want [goal] so that [benefit]

Feature: [Feature 2]
  - As a [persona], I want [goal] so that [benefit]
  - As a [persona], I want [goal] so that [benefit]

---
**Open Questions:**
- [ ] [question that needs answering before sprint 1]

---

After writing, offer to write full features with /feature or individual stories with /story.
