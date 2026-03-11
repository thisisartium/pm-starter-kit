---
name: feature
description: Write a Feature work item — a PI-scoped deliverable that sits between an epic and user stories.
---

Write a Feature work item for the user. Start now by asking them (in one message, keep it brief):

1. What epic does this belong to?
2. What capability does it deliver — what can a user do when this ships?
3. Who benefits?
4. What PI or quarter is this targeting?

If they already gave you this context, skip the questions and write the feature immediately.

Once you have the context, produce this output:

---
**Feature:** [capability-first title, under 80 chars]
**Parent Epic:** [epic title or ID]
**Target PI / Quarter:** [PI or quarter]
**Persona(s):** [who benefits]

**Description:** [2–3 sentences: what capability, what problem, why now]

**Business Value:** [why is this being prioritized]

**Acceptance Criteria:**
- [ ] [observable business outcome — not an implementation step]
- [ ] [another outcome]
- [ ] [constraint or edge case that must hold]

**Story Stubs:**
- As a [persona], I want [goal] so that [benefit]
- As a [persona], I want [goal] so that [benefit]
- As a [persona], I want [goal] so that [benefit]

**Dependencies:** [other teams, systems, or features needed]
**Out of Scope:** [what this explicitly does not include]
**Assumptions:** [any gaps you filled — flag them]
**Tags:** feature [+ domain tags]
**Estimate:** [S/M/L/XL]
**Priority:** [Must Have / Should Have / Nice to Have]

---

After writing, offer to flesh out any story stub with /story or plan the parent epic with /epic.
