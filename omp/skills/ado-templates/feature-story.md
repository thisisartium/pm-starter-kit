# Template: Feature Story

Use this template for new functionality, enhancements, or any work that delivers user-facing value.

---

## Title [required]

`[Action verb] [object] [context/qualifier]`

Examples:
- "Filter dashboard results by date range"
- "Export project report as CSV"
- "Display error message when payment fails"

Keep titles under 80 characters. Write them so a non-technical stakeholder understands the value at a glance.

---

## Description [required]

```
As a [specific persona — not just "user"]
I want [a single, clear action or capability]
So that [the business or user value delivered]
```

**Persona guidance:** Be specific. "finance manager," "new customer," "site admin" — not "user," "customer," or "admin."

**Goal guidance:** One goal per story. If you need "and," it's probably two stories.

**Benefit guidance:** This is the "why." If you can't articulate it, the story may not be worth doing.

---

## Acceptance Criteria [required]

Write in Gherkin (Given/When/Then) or checkbox format. Be consistent within a story.

### Gherkin Format (preferred)

```
**Scenario: [name of scenario]**
  Given [starting state or precondition]
  When [user action or system event]
  Then [expected outcome]
  And [additional outcome if needed]

**Scenario: [edge case or alternate path]**
  Given ...
  When ...
  Then ...
```

### Checkbox Format (alternative)

```
- [ ] [Specific, testable behavior]
- [ ] [Another testable behavior]
- [ ] [Edge case or error condition]
```

**AC writing rules:**
- Each criterion must be independently verifiable
- Avoid "should," "properly," "correctly," "user-friendly" — these are untestable
- Cover the happy path, key edge cases, and failure states
- Do not describe implementation — describe observable behavior

---

## Out of Scope [optional]

Explicitly state what this story does NOT include, if there is a risk of scope creep or misaligned expectations.

```
This story does not include:
- [Exclusion 1]
- [Exclusion 2]
```

---

## Dependencies [optional]

```
Blocked by: [Story ID or description]
Depends on: [API, service, team, or infrastructure]
Related to: [Story ID or epic]
```

---

## Notes / Assumptions [optional]

Document decisions made, context provided by stakeholders, or assumptions used in writing the story.

> **Assumption:** [State the assumption clearly so the team can validate or challenge it]

---

## Design / Links [optional]

- Figma: [link]
- API spec: [link]
- ADO Epic: [link]
- ADO Feature: [link]

---

## Suggested Tags [optional]

Choose relevant tags to aid filtering and reporting in ADO:

`frontend` `backend` `api` `data` `ux` `auth` `integration` `reporting` `mobile` `accessibility` `performance` `compliance`

---

## Story Points / Size [optional]

| Size | Fibonacci | Signal |
|---|---|---|
| XS | 1 | Trivial change, no unknowns |
| S | 2–3 | Straightforward, low risk |
| M | 5 | Moderate complexity or some uncertainty |
| L | 8 | High complexity — consider splitting |
| XL | 13+ | Too large — split before sprinting |

**Estimate:** ___
**Rationale:** ___
